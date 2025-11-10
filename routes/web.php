<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\CampaignController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\DonationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', [HomeController::class, 'index'])->name('home');

// Campaign routes (public)
Route::get('/campaigns', [CampaignController::class, 'index'])->name('campaigns.index');
Route::get('/campaigns/{slug}', [CampaignController::class, 'show'])->name('campaigns.show');

// About route (public)
Route::get('/about', [AboutController::class, 'index'])->name('about');

// Event routes (public)
Route::get('/events', [EventController::class, 'index'])->name('events.index');
Route::get('/events/{slug}', [EventController::class, 'show'])->name('events.show');

// Donation routes
Route::middleware(['auth'])->group(function () {
    Route::get('/campaigns/{slug}/donate', [DonationController::class, 'create'])->name('donations.create');
    Route::post('/campaigns/{slug}/donate', [DonationController::class, 'store'])->name('donations.store');
    Route::get('/donations/success', [DonationController::class, 'success'])->name('donations.success');
});

// Midtrans notification callback (no auth required)
Route::post('/donations/notification', [DonationController::class, 'notification'])->name('donations.notification');
Route::get('/donations/check-status/{orderId}', [DonationController::class, 'checkStatus'])->name('donations.check-status');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
