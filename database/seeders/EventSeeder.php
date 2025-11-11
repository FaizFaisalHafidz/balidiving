<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get admin user (Bali Diving organizes events)
        $organizer = User::whereHas('roles', function ($query) {
            $query->whereIn('name', ['super-admin', 'admin']);
        })->first();

        if (!$organizer) {
            $this->command->warn('No admin user found. Please run UserSeeder first.');
            return;
        }

        $events = [
            [
                'title' => 'Beach Cleanup Day - Pantai Kuta',
                'description' => "Mari bergabung dalam aksi bersih-bersih pantai untuk melindungi ekosistem laut kita! 🌊\n\nKegiatan:\n- Pembersihan sampah plastik di sepanjang pantai\n- Edukasi tentang dampak sampah terhadap kehidupan laut\n- Workshop daur ulang sampah plastik\n- Menanam mangrove\n\nYang perlu dibawa:\n- Sarung tangan\n- Topi/payung\n- Air minum\n- Semangat untuk lingkungan!\n\nMakanan dan minuman akan disediakan untuk semua peserta.",
                'image' => 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&h=600&fit=crop',
                'location' => 'Pantai Kuta, Bali',
                'location_url' => 'https://maps.google.com/?q=Pantai+Kuta+Bali',
                'start_date' => Carbon::now()->addDays(7)->setTime(8, 0),
                'end_date' => Carbon::now()->addDays(7)->setTime(12, 0),
                'max_participants' => 100,
                'registered_participants' => 67,
                'status' => 'upcoming',
                'is_featured' => true,
            ],
            [
                'title' => 'Coral Reef Conservation Workshop',
                'description' => "Workshop intensif tentang konservasi terumbu karang dan teknik rehabilitasi.\n\nMateri Workshop:\n- Pentingnya terumbu karang bagi ekosistem laut\n- Ancaman terhadap terumbu karang\n- Teknik transplantasi karang\n- Monitoring kesehatan terumbu karang\n- Praktik langsung di laut (untuk peserta bersertifikat diving)\n\nInstruktur:\n- Dr. Marine Biologist dari Institut Oseanografi\n- Praktisi konservasi laut berpengalaman\n\nSertifikat akan diberikan untuk semua peserta.",
                'image' => 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
                'location' => 'Pusat Konservasi Laut, Jakarta',
                'location_url' => 'https://maps.google.com/?q=Jakarta',
                'start_date' => Carbon::now()->addDays(14)->setTime(9, 0),
                'end_date' => Carbon::now()->addDays(14)->setTime(16, 0),
                'max_participants' => 50,
                'registered_participants' => 32,
                'status' => 'upcoming',
                'is_featured' => true,
            ],
            [
                'title' => 'Ocean Conservation Seminar',
                'description' => "Seminar nasional tentang pentingnya konservasi laut dan masa depan ekosistem laut Indonesia.\n\nAgenda:\n- Keynote speech dari ahli kelautan internasional\n- Panel diskusi dengan para pemangku kepentingan\n- Presentasi hasil penelitian terkini\n- Networking session\n- Exhibition teknologi konservasi laut\n\nPembicara:\n- Prof. Dr. Ahli Kelautan dari berbagai universitas terkemuka\n- Praktisi konservasi dari NGO internasional\n- Perwakilan Kementerian Kelautan dan Perikanan\n\nGratis untuk pelajar dan mahasiswa!",
                'image' => 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
                'location' => 'Auditorium Universitas Indonesia, Depok',
                'location_url' => 'https://maps.google.com/?q=UI+Depok',
                'start_date' => Carbon::now()->addDays(21)->setTime(8, 0),
                'end_date' => Carbon::now()->addDays(21)->setTime(17, 0),
                'max_participants' => 500,
                'registered_participants' => 234,
                'status' => 'upcoming',
                'is_featured' => true,
            ],
            [
                'title' => 'Underwater Photography Competition',
                'description' => "Kompetisi fotografi bawah laut untuk meningkatkan awareness tentang keindahan dan pentingnya ekosistem laut.\n\nKategori Lomba:\n- Marine Life Photography\n- Coral Reef Beauty\n- Conservation Message\n- Underwater Landscape\n\nHadiah Total: Rp 50.000.000!\n\nJuara 1: Rp 15.000.000 + Peralatan diving\nJuara 2: Rp 10.000.000 + Underwater camera\nJuara 3: Rp 5.000.000 + Diving package\n\nPeserta:\n- Fotografer profesional dan amatir\n- Wajib memiliki sertifikat diving\n- Foto diambil di perairan Indonesia\n\nPendaftaran online melalui website kami.",
                'image' => 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&h=600&fit=crop',
                'location' => 'Online Registration - Various Diving Spots',
                'location_url' => null,
                'start_date' => Carbon::now()->addDays(30)->setTime(0, 0),
                'end_date' => Carbon::now()->addDays(90)->setTime(23, 59),
                'max_participants' => null, // Unlimited
                'registered_participants' => 145,
                'status' => 'upcoming',
                'is_featured' => false,
            ],
            [
                'title' => 'Marine Life Education for Kids',
                'description' => "Program edukasi interaktif tentang kehidupan laut untuk anak-anak usia 6-12 tahun.\n\nKegiatan:\n- Mengenal berbagai jenis ikan dan hewan laut\n- Menggambar dan mewarnai hewan laut\n- Menonton film dokumenter kehidupan laut\n- Kunjungan ke akuarium\n- Games dan kuis berhadiah\n- Craft membuat kerajinan dari barang bekas\n\nFasilitas:\n- Lunch box\n- Goodie bag\n- Sertifikat\n- Dokumentasi\n\nOrang tua dapat mendampingi tanpa biaya tambahan.",
                'image' => 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
                'location' => 'Jakarta Aquarium, Neo Soho Mall',
                'location_url' => 'https://maps.google.com/?q=Jakarta+Aquarium',
                'start_date' => Carbon::now()->addDays(28)->setTime(10, 0),
                'end_date' => Carbon::now()->addDays(28)->setTime(14, 0),
                'max_participants' => 80,
                'registered_participants' => 45,
                'status' => 'upcoming',
                'is_featured' => false,
            ],
            [
                'title' => 'Mangrove Planting Campaign',
                'description' => "Aksi tanam mangrove massal untuk melindungi garis pantai dan ekosistem pesisir.\n\nTarget:\n- Menanam 5.000 bibit mangrove\n- Membuat area konservasi mangrove seluas 2 hektar\n- Edukasi masyarakat lokal tentang pentingnya mangrove\n\nBenefits Mangrove:\n- Mencegah abrasi pantai\n- Habitat berbagai jenis ikan dan kepiting\n- Menyerap karbon lebih baik dari hutan tropis\n- Melindungi dari tsunami dan badai\n\nKerja sama dengan:\n- Pemerintah Daerah\n- Komunitas nelayan lokal\n- NGO konservasi\n\nSetiap peserta akan mendapat sertifikat dan 1 pohon mangrove dengan nama masing-masing!",
                'image' => 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop',
                'location' => 'Pantai Indah Kapuk, Jakarta Utara',
                'location_url' => 'https://maps.google.com/?q=PIK+Jakarta',
                'start_date' => Carbon::now()->addDays(35)->setTime(7, 0),
                'end_date' => Carbon::now()->addDays(35)->setTime(11, 0),
                'max_participants' => 200,
                'registered_participants' => 89,
                'status' => 'upcoming',
                'is_featured' => true,
            ],
        ];

        foreach ($events as $eventData) {
            Event::create(array_merge($eventData, [
                'user_id' => $organizer->id,
            ]));
        }

        $this->command->info('Events seeded successfully!');
    }
}
