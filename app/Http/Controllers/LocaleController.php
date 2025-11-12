<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class LocaleController extends Controller
{
    /**
     * Switch the application locale
     */
    public function switch(Request $request)
    {
        $locale = $request->input('locale', 'id');
        
        // Validate locale
        if (!in_array($locale, ['en', 'id'])) {
            $locale = 'id';
        }
        
        // Store in session
        Session::put('locale', $locale);
        
        return back()->with('locale', $locale);
    }
}
