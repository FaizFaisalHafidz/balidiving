<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if locale is in session
        $locale = Session::get('locale', config('app.locale', 'id'));
        
        // Validate locale
        if (!in_array($locale, ['en', 'id'])) {
            $locale = 'id';
        }
        
        App::setLocale($locale);
        
        return $next($request);
    }
}
