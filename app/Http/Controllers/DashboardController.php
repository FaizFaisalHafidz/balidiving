<?php

namespace App\Http\Controllers;

use App\Models\Kampanye;
use App\Models\Donasi;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $roles = $user->roles->pluck('name')->toArray();

        // Dashboard untuk Admin & Super Admin
        if (in_array('super-admin', $roles) || in_array('admin', $roles)) {
            return $this->adminDashboard();
        }

        // Dashboard untuk Donor
        if (in_array('donor', $roles)) {
            return $this->donorDashboard();
        }

        // Default dashboard
        return Inertia::render('dashboard', [
            'stats' => [],
        ]);
    }

    private function adminDashboard()
    {
        // === STATISTIK UMUM ===
        $totalDonations = Donasi::where('status', 'berhasil')->sum('jumlah');
        $totalDonationsCount = Donasi::where('status', 'berhasil')->count();
        $totalCampaigns = Kampanye::count();
        $totalUsers = User::count();
        $activeCampaigns = Kampanye::where('status', 'aktif')->count();
        $pendingDonations = Donasi::where('status', 'pending')->count();

        // === DONASI HARI INI ===
        $todayDonations = Donasi::where('status', 'berhasil')
            ->whereDate('created_at', today())
            ->sum('jumlah');
        $todayDonationsCount = Donasi::where('status', 'berhasil')
            ->whereDate('created_at', today())
            ->count();

        // === DONASI 7 HARI TERAKHIR ===
        $last7DaysDonations = Donasi::where('status', 'berhasil')
            ->where('created_at', '>=', now()->subDays(7))
            ->selectRaw('DATE(created_at) as date, SUM(jumlah) as total, COUNT(*) as count')
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get()
            ->map(function ($item) {
                return [
                    'date' => $item->date,
                    'total' => (float) $item->total,
                    'count' => (int) $item->count,
                ];
            });

        // === TOP 5 KAMPANYE TERPOPULER ===
        $topCampaigns = Kampanye::withSum(['donasi' => function ($query) {
                $query->where('status', 'berhasil');
            }], 'jumlah')
            ->withCount(['donasi' => function ($query) {
                $query->where('status', 'berhasil');
            }])
            ->orderByDesc('donasi_sum_jumlah')
            ->limit(5)
            ->get()
            ->map(function ($campaign) {
                return [
                    'id' => $campaign->id,
                    'judul' => $campaign->judul,
                    'slug' => $campaign->slug,
                    'gambar_utama' => $campaign->gambar_utama,
                    'total_donasi' => (float) ($campaign->donasi_sum_jumlah ?? 0),
                    'jumlah_donatur' => (int) ($campaign->donasi_count ?? 0),
                    'target_dana' => (float) $campaign->target_dana,
                    'persentase' => $campaign->target_dana > 0 
                        ? round((($campaign->donasi_sum_jumlah ?? 0) / $campaign->target_dana) * 100, 2)
                        : 0,
                ];
            });

        // === DONASI TERBARU ===
        $recentDonations = Donasi::with(['kampanye', 'user'])
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($donation) {
                return [
                    'id' => $donation->id,
                    'jumlah' => (float) $donation->jumlah,
                    'status' => $donation->status,
                    'nama_donatur' => $donation->is_anonim 
                        ? 'Anonymous' 
                        : ($donation->nama_donatur ?? $donation->user?->name ?? 'Guest'),
                    'kampanye' => [
                        'judul' => $donation->kampanye?->judul ?? 'N/A',
                        'slug' => $donation->kampanye?->slug ?? '',
                    ],
                    'created_at' => $donation->created_at->toISOString(),
                ];
            });

        // === KAMPANYE YANG BUTUH PERHATIAN ===
        $campaignsNeedAttention = Kampanye::where('status', 'aktif')
            ->where('tanggal_berakhir', '<=', now()->addDays(7))
            ->orderBy('tanggal_berakhir', 'asc')
            ->limit(5)
            ->get()
            ->map(function ($campaign) {
                return [
                    'id' => $campaign->id,
                    'judul' => $campaign->judul,
                    'slug' => $campaign->slug,
                    'tanggal_berakhir' => $campaign->tanggal_berakhir?->toISOString(),
                    'hari_tersisa' => $campaign->tanggal_berakhir 
                        ? now()->diffInDays($campaign->tanggal_berakhir) 
                        : 0,
                ];
            });

        return Inertia::render('dashboard', [
            'stats' => [
                'total_donations' => (float) $totalDonations,
                'total_donations_count' => $totalDonationsCount,
                'total_campaigns' => $totalCampaigns,
                'total_users' => $totalUsers,
                'active_campaigns' => $activeCampaigns,
                'pending_donations' => $pendingDonations,
                'today_donations' => (float) $todayDonations,
                'today_donations_count' => $todayDonationsCount,
            ],
            'charts' => [
                'last_7_days' => $last7DaysDonations,
            ],
            'topCampaigns' => $topCampaigns,
            'recentDonations' => $recentDonations,
            'campaignsNeedAttention' => $campaignsNeedAttention,
        ]);
    }

    private function donorDashboard()
    {
        $user = Auth::user();

        // Statistik donor
        $totalDonated = Donasi::where('user_id', $user->id)
            ->where('status', 'berhasil')
            ->sum('jumlah');

        $donationsCount = Donasi::where('user_id', $user->id)
            ->where('status', 'berhasil')
            ->count();

        $campaignsSupported = Donasi::where('user_id', $user->id)
            ->where('status', 'berhasil')
            ->distinct('kampanye_id')
            ->count();

        // Donasi terbaru user
        $recentDonations = Donasi::where('user_id', $user->id)
            ->with('kampanye')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($donation) {
                return [
                    'id' => $donation->id,
                    'jumlah' => (float) $donation->jumlah,
                    'status' => $donation->status,
                    'kampanye' => [
                        'judul' => $donation->kampanye?->judul ?? 'N/A',
                        'slug' => $donation->kampanye?->slug ?? '',
                    ],
                    'created_at' => $donation->created_at->toISOString(),
                ];
            });

        return Inertia::render('donor/dashboard', [
            'stats' => [
                'total_donated' => (float) $totalDonated,
                'donations_count' => $donationsCount,
                'campaigns_supported' => $campaignsSupported,
            ],
            'recentDonations' => $recentDonations,
        ]);
    }
}
