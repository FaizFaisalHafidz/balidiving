<?php

namespace App\Http\Controllers\Admin;

use App\Exports\CampaignsExport;
use App\Exports\DonationsExport;
use App\Exports\UsersExport;
use App\Http\Controllers\Controller;
use App\Models\Kampanye;
use App\Models\Donasi;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class ReportsController extends Controller
{
    public function index(Request $request)
    {
        // Filter berdasarkan tanggal
        $startDate = $request->input('start_date', now()->subDays(30)->format('Y-m-d'));
        $endDate = $request->input('end_date', now()->format('Y-m-d'));

        // === STATISTIK UMUM ===
        $totalDonations = Donasi::where('status', 'berhasil')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->sum('jumlah');

        $totalDonationsCount = Donasi::where('status', 'berhasil')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->count();

        $totalCampaigns = Kampanye::whereBetween('created_at', [$startDate, $endDate])->count();
        
        $totalUsers = User::whereBetween('created_at', [$startDate, $endDate])->count();

        $activeCampaigns = Kampanye::where('status', 'aktif')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->count();

        $completedCampaigns = Kampanye::where('status', 'selesai')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->count();

        // === DONATION TRENDS (Last 30 Days) ===
        $donationTrends = Donasi::where('status', 'berhasil')
            ->whereBetween('created_at', [$startDate, $endDate])
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

        // === TOP CAMPAIGNS (By Total Donations) ===
        $topCampaigns = Kampanye::withSum(['donasi' => function ($query) use ($startDate, $endDate) {
                $query->where('status', 'berhasil')
                    ->whereBetween('created_at', [$startDate, $endDate]);
            }], 'jumlah')
            ->withCount(['donasi' => function ($query) use ($startDate, $endDate) {
                $query->where('status', 'berhasil')
                    ->whereBetween('created_at', [$startDate, $endDate]);
            }])
            ->orderByDesc('donasi_sum_jumlah')
            ->limit(10)
            ->get()
            ->map(function ($campaign) {
                return [
                    'id' => $campaign->id,
                    'title' => $campaign->judul,
                    'slug' => $campaign->slug,
                    'total_donations' => (float) ($campaign->donasi_sum_jumlah ?? 0),
                    'donations_count' => (int) ($campaign->donasi_count ?? 0),
                    'goal_amount' => (float) $campaign->target_dana,
                    'progress_percentage' => $campaign->target_dana > 0 
                        ? round((($campaign->donasi_sum_jumlah ?? 0) / $campaign->target_dana) * 100, 2)
                        : 0,
                ];
            });

        // === TOP DONORS ===
        $topDonors = Donasi::where('status', 'berhasil')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->where('is_anonim', false)
            ->whereNotNull('user_id')
            ->selectRaw('user_id, SUM(jumlah) as total_donated, COUNT(*) as donations_count')
            ->groupBy('user_id')
            ->orderByDesc('total_donated')
            ->limit(10)
            ->with('user:id,name,email')
            ->get()
            ->map(function ($donation) {
                return [
                    'user_id' => $donation->user_id,
                    'user_name' => $donation->user->name ?? 'Unknown',
                    'user_email' => $donation->user->email ?? 'N/A',
                    'total_donated' => (float) $donation->total_donated,
                    'donations_count' => (int) $donation->donations_count,
                ];
            });

        // === DONATION STATUS BREAKDOWN ===
        $donationsByStatus = Donasi::whereBetween('created_at', [$startDate, $endDate])
            ->selectRaw('status, COUNT(*) as count, SUM(jumlah) as total')
            ->groupBy('status')
            ->get()
            ->map(function ($item) {
                return [
                    'status' => $item->status,
                    'count' => (int) $item->count,
                    'total' => (float) $item->total,
                ];
            });

        // === CAMPAIGN STATUS BREAKDOWN ===
        $campaignsByStatus = Kampanye::whereBetween('created_at', [$startDate, $endDate])
            ->selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->get()
            ->map(function ($item) {
                return [
                    'status' => $item->status,
                    'count' => (int) $item->count,
                ];
            });

        // === USER GROWTH ===
        $userGrowth = User::whereBetween('created_at', [$startDate, $endDate])
            ->selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get()
            ->map(function ($item) {
                return [
                    'date' => $item->date,
                    'count' => (int) $item->count,
                ];
            });

        // === AVERAGE DONATION ===
        $averageDonation = Donasi::where('status', 'berhasil')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->avg('jumlah');

        return Inertia::render('admin/reports/index', [
            'filters' => [
                'start_date' => $startDate,
                'end_date' => $endDate,
            ],
            'statistics' => [
                'total_donations' => (float) $totalDonations,
                'total_donations_count' => $totalDonationsCount,
                'total_campaigns' => $totalCampaigns,
                'total_users' => $totalUsers,
                'active_campaigns' => $activeCampaigns,
                'completed_campaigns' => $completedCampaigns,
                'average_donation' => (float) ($averageDonation ?? 0),
            ],
            'donationTrends' => $donationTrends,
            'topCampaigns' => $topCampaigns,
            'topDonors' => $topDonors,
            'donationsByStatus' => $donationsByStatus,
            'campaignsByStatus' => $campaignsByStatus,
            'userGrowth' => $userGrowth,
        ]);
    }

    public function exportDonations(Request $request)
    {
        $startDate = $request->input('start_date', now()->subDays(30)->format('Y-m-d'));
        $endDate = $request->input('end_date', now()->format('Y-m-d'));

        $fileName = 'donations_report_' . $startDate . '_to_' . $endDate . '.xlsx';

        // Build filters array
        $filters = [
            'date_from' => $startDate,
            'date_to' => $endDate,
        ];

        return Excel::download(new DonationsExport($filters), $fileName);
    }

    public function exportCampaigns(Request $request)
    {
        $startDate = $request->input('start_date', now()->subDays(30)->format('Y-m-d'));
        $endDate = $request->input('end_date', now()->format('Y-m-d'));

        $fileName = 'campaigns_report_' . $startDate . '_to_' . $endDate . '.xlsx';

        return Excel::download(new CampaignsExport($startDate, $endDate), $fileName);
    }

    public function exportUsers(Request $request)
    {
        $startDate = $request->input('start_date', now()->subDays(30)->format('Y-m-d'));
        $endDate = $request->input('end_date', now()->format('Y-m-d'));

        $fileName = 'users_report_' . $startDate . '_to_' . $endDate . '.xlsx';

        return Excel::download(new UsersExport($startDate, $endDate), $fileName);
    }
}
