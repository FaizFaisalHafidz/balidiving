<?php

namespace App\Http\Controllers;

use App\Models\Kampanye;
use App\Models\Donasi;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        // Get active campaigns (limit to 4 for homepage)
        $campaigns = Kampanye::with(['user', 'kategori'])
            ->where('status', 'aktif')
            ->where('tanggal_berakhir', '>=', now()->toDateString())
            ->orderBy('created_at', 'desc')
            ->limit(4)
            ->get()
            ->map(function ($kampanye) {
                $daysLeft = now()->startOfDay()->diffInDays($kampanye->tanggal_berakhir, false);
                $daysLeft = max(0, $daysLeft); // Ensure non-negative
                
                $progress = $kampanye->target_dana > 0 
                    ? min(100, round(($kampanye->dana_terkumpul / $kampanye->target_dana) * 100)) 
                    : 0;

                return [
                    'id' => $kampanye->id,
                    'title' => $kampanye->judul,
                    'description' => substr($kampanye->deskripsi, 0, 100) . '...',
                    'image' => $kampanye->gambar_utama,
                    'raised' => $kampanye->dana_terkumpul,
                    'target' => $kampanye->target_dana,
                    'progress' => $progress,
                    'daysLeft' => $daysLeft,
                    'href' => route('campaigns.show', $kampanye->slug),
                    'category' => $kampanye->kategori->nama,
                    'fundraiser' => $kampanye->user->name,
                ];
            });

        // Calculate statistics
        $stats = [
            'successful_projects' => Kampanye::where('status', 'selesai')->count(),
            'people_impacted' => User::whereHas('roles', function ($query) {
                $query->where('name', 'donor');
            })->count() * 100, // Approximate impact multiplier
            'total_raised' => Donasi::where('status', 'berhasil')->sum('jumlah'),
            'active_volunteers' => User::whereHas('roles', function ($query) {
                $query->where('name', 'fundraiser');
            })->count(),
        ];

        return Inertia::render('home', [
            'campaigns' => $campaigns,
            'stats' => $stats,
        ]);
    }
}
