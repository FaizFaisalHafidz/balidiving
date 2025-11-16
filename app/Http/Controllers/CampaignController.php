<?php

namespace App\Http\Controllers;

use App\Models\Kampanye;
use App\Models\KategoriKampanye;
use App\Models\Donasi;
use App\Models\Komentar;
use App\Helpers\CurrencyHelper;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CampaignController extends Controller
{
    /**
     * Display a listing of all campaigns
     */
    public function index(Request $request)
    {
        $locale = app()->getLocale();
        
        $query = Kampanye::with(['user', 'kategori'])
            ->where('status', 'aktif')
            ->where('tanggal_berakhir', '>=', now()->toDateString());

        // Filter by category if provided
        if ($request->has('category') && $request->category !== 'all') {
            $query->whereHas('kategori', function ($q) use ($request) {
                $q->where('nama', $request->category);
            });
        }

        // Search functionality
        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('judul', 'like', '%' . $request->search . '%')
                  ->orWhere('deskripsi', 'like', '%' . $request->search . '%');
            });
        }

        // Sort by
        $sortBy = $request->get('sort', 'recent');
        switch ($sortBy) {
            case 'popular':
                $query->orderBy('dana_terkumpul', 'desc');
                break;
            case 'ending':
                $query->orderBy('tanggal_berakhir', 'asc');
                break;
            case 'goal':
                $query->orderBy('target_dana', 'desc');
                break;
            default: // recent
                $query->orderBy('created_at', 'desc');
                break;
        }

        $campaigns = $query->paginate(12)->through(function ($kampanye) use ($locale) {
            $daysLeft = now()->startOfDay()->diffInDays($kampanye->tanggal_berakhir, false);
            $daysLeft = max(0, $daysLeft); // Ensure non-negative
            
            $progress = $kampanye->target_dana > 0 
                ? min(100, round(($kampanye->dana_terkumpul / $kampanye->target_dana) * 100)) 
                : 0;

            $raised = CurrencyHelper::format($kampanye->dana_terkumpul, $locale);
            $target = CurrencyHelper::format($kampanye->target_dana, $locale);

            return [
                'id' => $kampanye->id,
                'title' => $kampanye->judul,
                'slug' => $kampanye->slug,
                'description' => substr($kampanye->deskripsi, 0, 150) . '...',
                'image' => $kampanye->gambar_utama_url,
                'raised' => $raised['amount'],
                'raisedFormatted' => $raised['formatted'],
                'target' => $target['amount'],
                'targetFormatted' => $target['formatted'],
                'progress' => $progress,
                'daysLeft' => $daysLeft,
                'category' => $kampanye->kategori->nama,
                'fundraiser' => $kampanye->user->name,
                'href' => route('campaigns.show', $kampanye->slug),
            ];
        });

        // Get all categories for filter
        $categories = KategoriKampanye::all()->map(function ($kategori) {
            return [
                'id' => $kategori->id,
                'nama' => $kategori->nama,
                'deskripsi' => $kategori->deskripsi,
            ];
        });

        return Inertia::render('campaigns/index', [
            'campaigns' => $campaigns,
            'categories' => $categories,
            'filters' => [
                'search' => $request->get('search', ''),
                'category' => $request->get('category', 'all'),
                'sort' => $sortBy,
            ],
        ]);
    }

    /**
     * Display the specified campaign
     */
    public function show(string $slug)
    {
        $locale = app()->getLocale();
        
        $kampanye = Kampanye::with(['user.profilPengguna', 'kategori'])
            ->where('slug', $slug)
            ->firstOrFail();

        $daysLeft = now()->startOfDay()->diffInDays($kampanye->tanggal_berakhir, false);
        $daysLeft = max(0, $daysLeft); // Ensure non-negative
        
        $progress = $kampanye->target_dana > 0 
            ? min(100, round(($kampanye->dana_terkumpul / $kampanye->target_dana) * 100)) 
            : 0;

        // Get donations for this campaign
        $donations = Donasi::where('kampanye_id', $kampanye->id)
            ->where('status', 'berhasil')
            ->with('user')
            ->latest()
            ->limit(10)
            ->get()
            ->map(function ($donasi) use ($locale) {
                $amount = CurrencyHelper::format($donasi->jumlah, $locale);
                
                return [
                    'id' => $donasi->id,
                    'donor_name' => $donasi->nama_donatur ?? ($donasi->user ? $donasi->user->name : 'Anonymous'),
                    'amount' => $amount['amount'],
                    'amountFormatted' => $amount['formatted'],
                    'message' => $donasi->pesan_dukungan,
                    'created_at' => $donasi->created_at->diffForHumans(),
                ];
            });

        // Get comments
        $comments = Komentar::where('kampanye_id', $kampanye->id)
            ->where('status', 'terlihat')
            ->with('user')
            ->latest()
            ->limit(10)
            ->get()
            ->map(function ($komentar) {
                return [
                    'id' => $komentar->id,
                    'name' => $komentar->nama ?? ($komentar->user ? $komentar->user->name : 'Anonymous'),
                    'comment' => $komentar->komentar,
                    'created_at' => $komentar->created_at->diffForHumans(),
                ];
            });

        // Related campaigns (same category)
        $relatedCampaigns = Kampanye::with(['user', 'kategori'])
            ->where('kategori_id', $kampanye->kategori_id)
            ->where('id', '!=', $kampanye->id)
            ->where('status', 'aktif')
            ->where('tanggal_berakhir', '>=', now()->toDateString())
            ->limit(3)
            ->get()
            ->map(function ($related) use ($locale) {
                $daysLeft = now()->startOfDay()->diffInDays($related->tanggal_berakhir, false);
                $daysLeft = max(0, $daysLeft); // Ensure non-negative
                
                $progress = $related->target_dana > 0 
                    ? min(100, round(($related->dana_terkumpul / $related->target_dana) * 100)) 
                    : 0;

                $raised = CurrencyHelper::format($related->dana_terkumpul, $locale);
                $target = CurrencyHelper::format($related->target_dana, $locale);

                return [
                    'id' => $related->id,
                    'title' => $related->judul,
                    'slug' => $related->slug,
                    'image' => $related->gambar_utama_url,
                    'raised' => $raised['amount'],
                    'raisedFormatted' => $raised['formatted'],
                    'target' => $target['amount'],
                    'targetFormatted' => $target['formatted'],
                    'progress' => $progress,
                    'daysLeft' => $daysLeft,
                    'href' => route('campaigns.show', $related->slug),
                ];
            });

        $raised = CurrencyHelper::format($kampanye->dana_terkumpul, $locale);
        $target = CurrencyHelper::format($kampanye->target_dana, $locale);

        $campaign = [
            'id' => $kampanye->id,
            'title' => $kampanye->judul,
            'slug' => $kampanye->slug,
            'description' => $kampanye->deskripsi,
            'image' => $kampanye->gambar_utama_url,
            'raised' => $raised['amount'],
            'raisedFormatted' => $raised['formatted'],
            'target' => $target['amount'],
            'targetFormatted' => $target['formatted'],
            'progress' => $progress,
            'daysLeft' => $daysLeft,
            'start_date' => $kampanye->tanggal_mulai->format('d M Y'),
            'end_date' => $kampanye->tanggal_berakhir->format('d M Y'),
            'status' => $kampanye->status,
            'category' => [
                'id' => $kampanye->kategori->id,
                'name' => $kampanye->kategori->nama,
            ],
            'fundraiser' => [
                'id' => $kampanye->user->id,
                'name' => $kampanye->user->name,
                'photo' => $kampanye->user->profilPengguna->foto_profil ?? null,
            ],
            'donor_count' => $donations->count(),
        ];

        return Inertia::render('campaigns/show', [
            'campaign' => $campaign,
            'donations' => $donations,
            'comments' => $comments,
            'relatedCampaigns' => $relatedCampaigns,
        ]);
    }
}
