<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\KategoriKampanye;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = KategoriKampanye::withCount('kampanye');

        // Search
        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('nama', 'like', '%' . $request->search . '%')
                    ->orWhere('deskripsi', 'like', '%' . $request->search . '%');
            });
        }

        // Sort
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        $categories = $query->paginate(10)->withQueryString();

        return response()->json([
            'categories' => $categories,
            'stats' => [
                'total' => KategoriKampanye::count(),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/categories/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255|unique:kategori_kampanye,nama',
            'deskripsi' => 'nullable|string',
        ]);

        KategoriKampanye::create($validated);

        return redirect()->route('admin.campaigns.index')
            ->with('success', 'Kategori berhasil dibuat.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(KategoriKampanye $category)
    {
        return Inertia::render('admin/categories/edit', [
            'category' => $category,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, KategoriKampanye $category)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255|unique:kategori_kampanye,nama,' . $category->id,
            'deskripsi' => 'nullable|string',
        ]);

        $category->update($validated);

        return redirect()->route('admin.campaigns.index')
            ->with('success', 'Kategori berhasil diupdate.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(KategoriKampanye $category)
    {
        // Check if category has campaigns
        if ($category->kampanye()->count() > 0) {
            return back()->with('error', 'Kategori tidak dapat dihapus karena masih memiliki kampanye.');
        }

        $category->delete();

        return back()->with('success', 'Kategori berhasil dihapus.');
    }
}
