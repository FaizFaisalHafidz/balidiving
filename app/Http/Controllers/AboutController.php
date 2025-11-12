<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Kampanye;
use App\Models\Donasi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function index()
    {
        // Check if fundraiser role exists
        $fundraiserRoleExists = \Spatie\Permission\Models\Role::where('name', 'fundraiser')->exists();
        $donorRoleExists = \Spatie\Permission\Models\Role::where('name', 'donor')->exists();
        
        // Statistics
        $stats = [
            'total_campaigns' => Kampanye::count(),
            'active_campaigns' => Kampanye::where('status', 'aktif')
                ->where('tanggal_berakhir', '>=', now()->toDateString())
                ->count(),
            'total_fundraisers' => $fundraiserRoleExists ? User::role('fundraiser')->count() : 0,
            'total_donors' => $donorRoleExists ? User::role('donor')->count() : 0,
            'total_raised' => Donasi::where('status', 'berhasil')->sum('jumlah'),
            'total_donations' => Donasi::where('status', 'berhasil')->count(),
        ];

        // Team members (fundraisers with most successful campaigns)
        $teamMembers = collect([]);
        if ($fundraiserRoleExists) {
            $teamMembers = User::role('fundraiser')
                ->with(['profilFundraiser', 'kampanye'])
                ->withCount([
                    'kampanye as successful_campaigns_count' => function ($query) {
                        $query->where('status', 'selesai');
                    }
                ])
                ->having('successful_campaigns_count', '>', 0)
                ->orderByDesc('successful_campaigns_count')
                ->limit(6)
                ->get()
                ->map(function ($user) {
                    return [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'avatar' => $user->avatar ?? null,
                        'role' => 'Fundraiser',
                        'bio' => $user->profilFundraiser->bio ?? 'Passionate about ocean conservation',
                        'successful_campaigns' => $user->successful_campaigns_count,
                        'total_raised' => $user->kampanye()
                            ->where('status', 'selesai')
                            ->sum('dana_terkumpul'),
                    ];
                });
        }

        // Mission & Vision
        $mission = [
            'title' => 'Misi Kami',
            'description' => 'Membangun platform crowdfunding terpercaya untuk mendukung kampanye konservasi laut dan lingkungan hidup. Kami berkomitmen untuk menghubungkan para donatur dengan fundraiser yang berdedikasi untuk melindungi ekosistem laut kita.',
            'points' => [
                'Menyediakan platform transparan untuk kampanye konservasi laut',
                'Memberdayakan individu dan organisasi untuk menciptakan perubahan positif',
                'Meningkatkan kesadaran tentang pentingnya pelestarian laut',
                'Memfasilitasi kolaborasi antara donatur dan fundraiser',
            ]
        ];

        $vision = [
            'title' => 'Visi Kami',
            'description' => 'Menjadi platform crowdfunding terdepan di Indonesia untuk kampanye konservasi laut, dimana setiap orang dapat berkontribusi untuk masa depan lautan yang lebih baik.',
        ];

        // Values
        $values = [
            [
                'icon' => 'Shield',
                'title' => 'Transparansi',
                'description' => 'Kami berkomitmen untuk transparansi penuh dalam setiap kampanye dan transaksi.'
            ],
            [
                'icon' => 'Heart',
                'title' => 'Kepercayaan',
                'description' => 'Membangun kepercayaan antara donatur dan fundraiser adalah prioritas utama kami.'
            ],
            [
                'icon' => 'Users',
                'title' => 'Kolaborasi',
                'description' => 'Kami percaya kekuatan kolaborasi dapat menciptakan dampak yang lebih besar.'
            ],
            [
                'icon' => 'Leaf',
                'title' => 'Keberlanjutan',
                'description' => 'Mendukung solusi jangka panjang untuk pelestarian lingkungan laut.'
            ],
            [
                'icon' => 'Award',
                'title' => 'Integritas',
                'description' => 'Beroperasi dengan standar etika tertinggi dalam semua aktivitas kami.'
            ],
            [
                'icon' => 'Zap',
                'title' => 'Inovasi',
                'description' => 'Terus berinovasi untuk memberikan pengalaman terbaik bagi pengguna kami.'
            ],
        ];

        // Timeline/History
        $timeline = [
            [
                'year' => '2024',
                'title' => 'Peluncuran Platform',
                'description' => 'Adopt the Blue diluncurkan sebagai platform crowdfunding pertama yang fokus pada konservasi laut di Indonesia.'
            ],
            [
                'year' => '2024',
                'title' => 'Kampanye Pertama',
                'description' => 'Kampanye pertama kami berhasil mengumpulkan dana untuk rehabilitasi terumbu karang.'
            ],
            [
                'year' => '2024',
                'title' => '100+ Donatur',
                'description' => 'Mencapai milestone 100 donatur aktif yang mendukung berbagai kampanye konservasi.'
            ],
            [
                'year' => '2025',
                'title' => 'Ekspansi Kategori',
                'description' => 'Menambah kategori kampanye untuk menjangkau lebih banyak isu konservasi laut.'
            ],
        ];

        return Inertia::render('about', [
            'stats' => $stats,
            'teamMembers' => $teamMembers,
            'mission' => $mission,
            'vision' => $vision,
            'values' => $values,
            'timeline' => $timeline,
        ]);
    }
}
