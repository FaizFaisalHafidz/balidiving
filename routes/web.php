<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\CampaignController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\DonationController;
use App\Http\Controllers\LocaleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

// Locale switcher
Route::post('/locale/switch', [LocaleController::class, 'switch'])->name('locale.switch');

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
    // Dashboard untuk admin, super-admin, dan fundraiser
    Route::middleware(['role:super-admin,admin,fundraiser'])->group(function () {
        Route::get('dashboard', [App\Http\Controllers\DashboardController::class, 'index'])
            ->name('dashboard');

        // User Management (Super Admin & Admin only)
        Route::middleware(['role:super-admin,admin'])->group(function () {
            Route::resource('admin/users', App\Http\Controllers\Admin\UserController::class)
                ->names([
                    'index' => 'admin.users.index',
                    'create' => 'admin.users.create',
                    'store' => 'admin.users.store',
                    'show' => 'admin.users.show',
                    'edit' => 'admin.users.edit',
                    'update' => 'admin.users.update',
                    'destroy' => 'admin.users.destroy',
                ]);
            
            // Email verification management
            Route::post('admin/users/{user}/verify', [App\Http\Controllers\Admin\UserController::class, 'verify'])
                ->name('admin.users.verify');
            Route::post('admin/users/{user}/unverify', [App\Http\Controllers\Admin\UserController::class, 'unverify'])
                ->name('admin.users.unverify');

            // Campaign Management
            Route::resource('admin/campaigns', App\Http\Controllers\Admin\CampaignController::class)
                ->names([
                    'index' => 'admin.campaigns.index',
                    'create' => 'admin.campaigns.create',
                    'store' => 'admin.campaigns.store',
                    'show' => 'admin.campaigns.show',
                    'edit' => 'admin.campaigns.edit',
                    'update' => 'admin.campaigns.update',
                    'destroy' => 'admin.campaigns.destroy',
                ]);
            
            // Campaign status management
            Route::post('admin/campaigns/{campaign}/publish', [App\Http\Controllers\Admin\CampaignController::class, 'publish'])
                ->name('admin.campaigns.publish');
            Route::post('admin/campaigns/{campaign}/unpublish', [App\Http\Controllers\Admin\CampaignController::class, 'unpublish'])
                ->name('admin.campaigns.unpublish');
            Route::post('admin/campaigns/{campaign}/complete', [App\Http\Controllers\Admin\CampaignController::class, 'complete'])
                ->name('admin.campaigns.complete');

            // Category Management
            Route::get('admin/categories/create', [App\Http\Controllers\Admin\CategoryController::class, 'create'])
                ->name('admin.categories.create');
            Route::post('admin/categories', [App\Http\Controllers\Admin\CategoryController::class, 'store'])
                ->name('admin.categories.store');
            Route::get('admin/categories/{category}/edit', [App\Http\Controllers\Admin\CategoryController::class, 'edit'])
                ->name('admin.categories.edit');
            Route::put('admin/categories/{category}', [App\Http\Controllers\Admin\CategoryController::class, 'update'])
                ->name('admin.categories.update');
            Route::delete('admin/categories/{category}', [App\Http\Controllers\Admin\CategoryController::class, 'destroy'])
                ->name('admin.categories.destroy');

            // Donation Management
            Route::get('admin/donations', [App\Http\Controllers\Admin\DonationManagementController::class, 'index'])
                ->name('admin.donations.index');
            Route::get('admin/donations/{donation}', [App\Http\Controllers\Admin\DonationManagementController::class, 'show'])
                ->name('admin.donations.show');
            Route::get('admin/donations/export/excel', [App\Http\Controllers\Admin\DonationManagementController::class, 'export'])
                ->name('admin.donations.export');

            // Reports & Statistics
            Route::get('admin/reports', [App\Http\Controllers\Admin\ReportsController::class, 'index'])
                ->name('admin.reports.index');
            Route::get('admin/reports/export/donations', [App\Http\Controllers\Admin\ReportsController::class, 'exportDonations'])
                ->name('admin.reports.export.donations');
            Route::get('admin/reports/export/campaigns', [App\Http\Controllers\Admin\ReportsController::class, 'exportCampaigns'])
                ->name('admin.reports.export.campaigns');
            Route::get('admin/reports/export/users', [App\Http\Controllers\Admin\ReportsController::class, 'exportUsers'])
                ->name('admin.reports.export.users');
        });
    });

    // Dashboard untuk donor (akan dibuat terpisah)
    Route::middleware(['role:donor'])->group(function () {
        Route::get('/donor/dashboard', function () {
            return Inertia::render('donor/dashboard');
        })->name('donor.dashboard');
    });
});

require __DIR__.'/settings.php';
