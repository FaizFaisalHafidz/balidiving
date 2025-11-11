<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RedirectToDashboard
{
    /**
     * Handle an incoming request.
     * Redirect user to appropriate dashboard based on their role
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check()) {
            $user = Auth::user();
            $userRoles = $user->roles->pluck('name')->toArray();

            // Redirect donor to donor dashboard
            if (in_array('donor', $userRoles) && !in_array('admin', $userRoles) && !in_array('super-admin', $userRoles) && !in_array('fundraiser', $userRoles)) {
                return redirect()->route('donor.dashboard');
            }

            // Redirect admin/super-admin/fundraiser to admin dashboard
            if (in_array('super-admin', $userRoles) || in_array('admin', $userRoles) || in_array('fundraiser', $userRoles)) {
                return redirect()->route('dashboard');
            }
        }

        return $next($request);
    }
}

