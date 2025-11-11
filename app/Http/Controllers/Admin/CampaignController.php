<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kampanye;
use App\Models\KategoriKampanye;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CampaignController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Kampanye::with(['kategori', 'user']);

        // Search
        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('judul', 'like', '%' . $request->search . '%')
                    ->orWhere('deskripsi', 'like', '%' . $request->search . '%');
            });
        }

        // Filter by category
        if ($request->has('category') && $request->category !== 'all') {
            $query->where('kategori_id', $request->category);
        }

        // Filter by status
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Sort
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        $campaigns = $query->paginate(10)->withQueryString();
        
        // Add percentage to each campaign
        $campaigns->getCollection()->transform(function ($campaign) {
            $campaign->percentage = $campaign->target_dana > 0 
                ? round(($campaign->dana_terkumpul / $campaign->target_dana) * 100, 1) 
                : 0;
            return $campaign;
        });

        // Get campaign stats
        $totalRaised = Kampanye::sum('dana_terkumpul');
        $totalTarget = Kampanye::sum('target_dana');
        $targetReached = $totalTarget > 0 ? round(($totalRaised / $totalTarget) * 100, 2) : 0;

        $stats = [
            'total_campaigns' => Kampanye::count(),
            'active_campaigns' => Kampanye::where('status', 'aktif')->count(),
            'total_raised' => $totalRaised,
            'target_reached' => $targetReached,
        ];

        // Get category stats
        $categoryStats = [
            'total_categories' => KategoriKampanye::count(),
            'total_campaigns' => Kampanye::count(),
        ];

        // Get categories with campaign count
        $categories = KategoriKampanye::withCount('kampanye')->get();

        return Inertia::render('admin/campaigns/index', [
            'campaigns' => $campaigns,
            'categories' => $categories,
            'stats' => $stats,
            'categoryStats' => $categoryStats,
            'filters' => [
                'search' => $request->search,
                'category' => $request->category ?? 'all',
                'status' => $request->status ?? 'all',
                'sort_by' => $sortBy,
                'sort_order' => $sortOrder,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/campaigns/create', [
            'categories' => KategoriKampanye::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'kategori_id' => 'required|exists:kategori_kampanye,id',
            'target_dana' => 'required|numeric|min:0',
            'tanggal_mulai' => 'required|date',
            'tanggal_berakhir' => 'required|date|after:tanggal_mulai',
            'gambar_utama' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
            'status' => 'required|in:draft,aktif,selesai',
        ]);

        // Handle image upload
        if ($request->hasFile('gambar_utama')) {
            $image = $request->file('gambar_utama');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $imagePath = $image->storeAs('campaigns', $imageName, 'public');
            $validated['gambar_utama'] = $imagePath;
        }

        $validated['user_id'] = auth()->id();
        $validated['dana_terkumpul'] = 0;

        Kampanye::create($validated);

        return redirect()->route('admin.campaigns.index')
            ->with('success', 'Kampanye berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Kampanye $campaign)
    {
        $campaign->load([
            'kategori',
            'user',
            'donasi' => function ($query) {
                $query->where('status', 'berhasil')
                    ->with('user')
                    ->latest()
                    ->limit(10);
            }
        ]);

        $stats = [
            'total_donations' => $campaign->donasi()->where('status', 'berhasil')->count(),
            'total_donors' => $campaign->donasi()->where('status', 'berhasil')->distinct('user_id')->count(),
            'average_donation' => $campaign->donasi()->where('status', 'berhasil')->avg('amount') ?? 0,
            'percentage' => $campaign->percentage,
        ];

        return Inertia::render('admin/campaigns/show', [
            'campaign' => $campaign,
            'stats' => $stats,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Kampanye $campaign)
    {
        $campaign->load('kategori');

        return Inertia::render('admin/campaigns/edit', [
            'campaign' => $campaign,
            'categories' => KategoriKampanye::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Kampanye $campaign)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'kategori_id' => 'required|exists:kategori_kampanye,id',
            'target_dana' => 'required|numeric|min:0',
            'tanggal_mulai' => 'required|date',
            'tanggal_berakhir' => 'required|date|after:tanggal_mulai',
            'gambar_utama' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'status' => 'required|in:draft,aktif,selesai',
        ]);

        // Handle image upload
        if ($request->hasFile('gambar_utama')) {
            // Delete old image
            if ($campaign->gambar_utama && Storage::disk('public')->exists($campaign->gambar_utama)) {
                Storage::disk('public')->delete($campaign->gambar_utama);
            }

            $image = $request->file('gambar_utama');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $imagePath = $image->storeAs('campaigns', $imageName, 'public');
            $validated['gambar_utama'] = $imagePath;
        }

        $campaign->update($validated);

        return redirect()->route('admin.campaigns.index')
            ->with('success', 'Kampanye berhasil diupdate.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kampanye $campaign)
    {
        // Delete image
        if ($campaign->gambar_utama && Storage::disk('public')->exists($campaign->gambar_utama)) {
            Storage::disk('public')->delete($campaign->gambar_utama);
        }

        $campaign->delete();

        return redirect()->route('admin.campaigns.index')
            ->with('success', 'Kampanye berhasil dihapus.');
    }

    /**
     * Publish campaign
     */
    public function publish(Kampanye $campaign)
    {
        $campaign->update(['status' => 'aktif']);

        return back()->with('success', 'Kampanye berhasil dipublikasikan.');
    }

    /**
     * Unpublish campaign
     */
    public function unpublish(Kampanye $campaign)
    {
        $campaign->update(['status' => 'draft']);

        return back()->with('success', 'Kampanye berhasil di-unpublish.');
    }

    /**
     * Complete campaign
     */
    public function complete(Kampanye $campaign)
    {
        $campaign->update(['status' => 'selesai']);

        return back()->with('success', 'Kampanye ditandai selesai.');
    }
}
