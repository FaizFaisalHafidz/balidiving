<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = User::with('roles');

        // Search
        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                    ->orWhere('email', 'like', '%' . $request->search . '%');
            });
        }

        // Filter by role
        if ($request->has('role') && $request->role !== 'all') {
            $query->whereHas('roles', function ($q) use ($request) {
                $q->where('name', $request->role);
            });
        }

        // Filter by status
        if ($request->has('status') && $request->status !== 'all') {
            if ($request->status === 'verified') {
                $query->whereNotNull('email_verified_at');
            } else {
                $query->whereNull('email_verified_at');
            }
        }

        // Sort
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        $users = $query->paginate(10)->withQueryString();

        return Inertia::render('admin/users/index', [
            'users' => $users,
            'filters' => [
                'search' => $request->search,
                'role' => $request->role ?? 'all',
                'status' => $request->status ?? 'all',
                'sort_by' => $sortBy,
                'sort_order' => $sortOrder,
            ],
            'roles' => Role::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/users/create', [
            'roles' => Role::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Password::defaults()],
            'roles' => 'required|array|min:1',
            'roles.*' => 'exists:roles,name',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'email_verified_at' => now(), // Auto verify for admin-created users
        ]);

        // Assign roles using Spatie
        $user->assignRole($validated['roles']);

        return redirect()->route('admin.users.index')
            ->with('success', 'User created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $user->load(['roles', 'donasi' => function ($query) {
            $query->with('kampanye')->latest()->limit(10);
        }]);

        return Inertia::render('admin/users/show', [
            'user' => $user,
            'stats' => [
                'total_donations' => $user->donasi()->count(),
                'total_amount' => $user->donasi()->where('status', 'berhasil')->sum('jumlah'),
                'campaigns_supported' => $user->donasi()->where('status', 'berhasil')->distinct('kampanye_id')->count(),
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $user->load('roles');

        return Inertia::render('admin/users/edit', [
            'user' => $user,
            'roles' => Role::all(),
            'userRoles' => $user->roles->pluck('name')->toArray(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => ['nullable', 'confirmed', Password::defaults()],
            'roles' => 'required|array|min:1',
            'roles.*' => 'exists:roles,name',
        ]);

        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);

        if ($validated['password']) {
            $user->update([
                'password' => Hash::make($validated['password']),
            ]);
        }

        // Sync roles using Spatie
        $user->syncRoles($validated['roles']);

        return redirect()->route('admin.users.index')
            ->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        // Prevent deleting yourself
        if ($user->id === Auth::id()) {
            return back()->with('error', 'You cannot delete your own account.');
        }

        $user->delete();

        return redirect()->route('admin.users.index')
            ->with('success', 'User deleted successfully.');
    }

    /**
     * Verify user email
     */
    public function verify(User $user)
    {
        \Log::info('Verify method called', [
            'user_id' => $user->id,
            'user_email' => $user->email,
            'current_verified_at' => $user->email_verified_at,
        ]);

        if ($user->email_verified_at) {
            \Log::warning('User already verified', ['user_id' => $user->id]);
            return back()->with('error', 'User email is already verified.');
        }

        $user->update([
            'email_verified_at' => now(),
        ]);

        // Refresh model to get updated data
        $user->refresh();

        \Log::info('User verified successfully', [
            'user_id' => $user->id,
            'new_verified_at' => $user->email_verified_at,
        ]);

        return back()->with('success', 'User email verified successfully.');
    }

    /**
     * Unverify user email
     */
    public function unverify(User $user)
    {
        \Log::info('Unverify method called', [
            'user_id' => $user->id,
            'user_email' => $user->email,
            'current_verified_at' => $user->email_verified_at,
        ]);

        if (!$user->email_verified_at) {
            \Log::warning('User already unverified', ['user_id' => $user->id]);
            return back()->with('error', 'User email is already unverified.');
        }

        $user->update([
            'email_verified_at' => null,
        ]);

        // Refresh model to get updated data
        $user->refresh();

        \Log::info('User unverified successfully', [
            'user_id' => $user->id,
            'new_verified_at' => $user->email_verified_at,
        ]);

        return back()->with('success', 'User email unverified successfully.');
    }
}


