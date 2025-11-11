<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string  ...$roles
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $user = Auth::user();
        $userRoles = $user->roles->pluck('name')->toArray();

        // Cek apakah user memiliki salah satu role yang diizinkan
        $hasRole = false;
        foreach ($roles as $role) {
            if (in_array($role, $userRoles)) {
                $hasRole = true;
                break;
            }
        }

        if (!$hasRole) {
            // Jika donor mencoba akses dashboard admin, redirect ke donor dashboard
            if (in_array('donor', $userRoles)) {
                return redirect()->route('donor.dashboard')->with('error', 'You do not have permission to access this page.');
            }

            // Untuk user lain tanpa role yang sesuai
            abort(403, 'Unauthorized action.');
        }

        return $next($request);
    }
}


