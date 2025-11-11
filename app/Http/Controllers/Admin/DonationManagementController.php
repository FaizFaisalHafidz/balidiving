<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Donasi;
use App\Models\Kampanye;
use App\Exports\DonationsExport;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class DonationManagementController extends Controller
{
    public function index(Request $request)
    {
        $query = Donasi::with(['user', 'kampanye'])
            ->orderBy('created_at', 'desc');

        // Search
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->whereHas('user', function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%");
                })
                ->orWhereHas('kampanye', function ($query) use ($search) {
                    $query->where('judul', 'like', "%{$search}%");
                })
                ->orWhere('order_id', 'like', "%{$search}%")
                ->orWhere('id_transaksi', 'like', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->has('status') && $request->status && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Filter by campaign
        if ($request->has('campaign_id') && $request->campaign_id && $request->campaign_id !== 'all') {
            $query->where('kampanye_id', $request->campaign_id);
        }

        // Filter by date range
        if ($request->has('date_from') && $request->date_from) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }

        if ($request->has('date_to') && $request->date_to) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        // Sort
        if ($request->has('sort_by') && $request->sort_by) {
            $sortBy = $request->sort_by;
            $sortOrder = $request->get('sort_order', 'desc');
            $query->orderBy($sortBy, $sortOrder);
        }

        $donations = $query->paginate(10)->withQueryString();

        // Get statistics
        $stats = [
            'total_donations' => Donasi::where('status', 'berhasil')->count(),
            'total_amount' => Donasi::where('status', 'berhasil')->sum('jumlah'),
            'total_donors' => Donasi::where('status', 'berhasil')->distinct('user_id')->count('user_id'),
            'pending_donations' => Donasi::where('status', 'pending')->count(),
        ];

        // Get campaigns for filter
        $campaigns = Kampanye::select('id', 'judul')->orderBy('judul')->get();

        return Inertia::render('admin/donations/index', [
            'donations' => $donations,
            'stats' => $stats,
            'campaigns' => $campaigns,
            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
                'campaign_id' => $request->campaign_id,
                'date_from' => $request->date_from,
                'date_to' => $request->date_to,
            ],
        ]);
    }

    public function show($id)
    {
        $donation = Donasi::with(['user', 'kampanye', 'kampanye.kategori'])
            ->findOrFail($id);

        return Inertia::render('admin/donations/show', [
            'donation' => $donation,
        ]);
    }

    public function export(Request $request)
    {
        $filters = [
            'search' => $request->search,
            'status' => $request->status,
            'campaign_id' => $request->campaign_id,
            'date_from' => $request->date_from,
            'date_to' => $request->date_to,
        ];

        $filename = 'donations_' . now()->format('Y-m-d_His') . '.xlsx';

        return Excel::download(new DonationsExport($filters), $filename);
    }
}
