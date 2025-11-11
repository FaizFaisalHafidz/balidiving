<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Kampanye;
use App\Models\User;
use App\Models\KategoriKampanye;
use Carbon\Carbon;

class KampanyeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get admin user (Bali Diving is the campaign creator)
        $admin = User::whereHas('roles', function ($query) {
            $query->whereIn('name', ['super-admin', 'admin']);
        })->first();

        if (!$admin) {
            $this->command->error('Admin user not found. Please run UserSeeder first.');
            return;
        }

        // Get categories
        $konservasiLaut = KategoriKampanye::where('nama', 'Konservasi Laut')->first();
        $terumbuKarang = KategoriKampanye::where('nama', 'Terumbu Karang')->first();
        
        if (!$konservasiLaut || !$terumbuKarang) {
            $this->command->error('Categories not found. Please run KategoriKampanyeSeeder first.');
            return;
        }

        $campaigns = [
            [
                'user_id' => $admin->id,
                'kategori_id' => $terumbuKarang->id,
                'judul' => 'Coral Restoration Project',
                'deskripsi' => 'Help restore coral reefs in endangered marine areas. Coral reefs are among the most diverse ecosystems on Earth, providing homes to 25% of all marine species. This project aims to restore 1000 square meters of damaged coral reefs using advanced marine biology techniques and community involvement.',
                'target_dana' => 50000000.00, // Rp 50 juta
                'dana_terkumpul' => 0.00,
                'tanggal_mulai' => Carbon::now()->subDays(20),
                'tanggal_berakhir' => Carbon::now()->addDays(40),
                'gambar_utama' => '/images/coral-1.jpeg',
                'status' => 'aktif',
            ],
            [
                'user_id' => $admin->id,
                'kategori_id' => $terumbuKarang->id,
                'judul' => 'Help Relocate the Coral',
                'deskripsi' => 'Support coral relocation efforts to safer waters. Due to rising ocean temperatures and pollution, many coral colonies need to be moved to healthier environments. This campaign will fund the equipment, marine biologists, and boat operations needed for safe coral transplantation.',
                'target_dana' => 75000000.00, // Rp 75 juta
                'dana_terkumpul' => 0.00,
                'tanggal_mulai' => Carbon::now()->subDays(5),
                'tanggal_berakhir' => Carbon::now()->addDays(55),
                'gambar_utama' => '/images/coral-2.jpeg',
                'status' => 'aktif',
            ],
            [
                'user_id' => $admin->id,
                'kategori_id' => $konservasiLaut->id,
                'judul' => 'Save Coral Reefs',
                'deskripsi' => 'Protect existing coral reef ecosystems from further damage. Coral reefs are dying at an alarming rate. This project focuses on establishing marine protected areas, educating local communities, and implementing sustainable fishing practices to preserve our remaining coral reefs.',
                'target_dana' => 30000000.00, // Rp 30 juta
                'dana_terkumpul' => 0.00,
                'tanggal_mulai' => Carbon::now()->subDays(35),
                'tanggal_berakhir' => Carbon::now()->addDays(95),
                'gambar_utama' => '/images/sdm-1-.jpg',
                'status' => 'aktif',
            ],
            [
                'user_id' => $admin->id,
                'kategori_id' => $terumbuKarang->id,
                'judul' => 'Help Rebuild Coral Reefs',
                'deskripsi' => 'Rebuild damaged coral reef systems using innovative techniques. This large-scale project will create artificial reef structures, transplant healthy coral fragments, and monitor the recovery progress over 3 years. Your donation will directly contribute to ocean ecosystem restoration.',
                'target_dana' => 100000000.00, // Rp 100 juta
                'dana_terkumpul' => 0.00,
                'tanggal_mulai' => Carbon::now()->subDays(30),
                'tanggal_berakhir' => Carbon::now()->addDays(100),
                'gambar_utama' => '/images/sdm-2.jpg',
                'status' => 'aktif',
            ],
            [
                'user_id' => $admin->id,
                'kategori_id' => KategoriKampanye::where('nama', 'Pembersihan Pantai')->first()->id ?? $konservasiLaut->id,
                'judul' => 'Beach Cleanup Initiative',
                'deskripsi' => 'Join our monthly beach cleanup campaign to remove plastic waste and debris from our coastal areas. Every piece of trash removed means a safer environment for marine life and cleaner beaches for our communities.',
                'target_dana' => 20000000.00, // Rp 20 juta
                'dana_terkumpul' => 0.00,
                'tanggal_mulai' => Carbon::now()->subDays(10),
                'tanggal_berakhir' => Carbon::now()->addDays(80),
                'gambar_utama' => '/images/coral-1.jpeg',
                'status' => 'aktif',
            ],
            [
                'user_id' => $admin->id,
                'kategori_id' => KategoriKampanye::where('nama', 'Satwa Laut')->first()->id ?? $konservasiLaut->id,
                'judul' => 'Sea Turtle Conservation',
                'deskripsi' => 'Protect endangered sea turtle nesting sites and hatchlings. This program includes beach patrols during nesting season, hatchery protection, and education programs for local communities about the importance of sea turtle conservation.',
                'target_dana' => 40000000.00, // Rp 40 juta
                'dana_terkumpul' => 0.00,
                'tanggal_mulai' => Carbon::now()->subDays(15),
                'tanggal_berakhir' => Carbon::now()->addDays(75),
                'gambar_utama' => '/images/coral-2.jpeg',
                'status' => 'aktif',
            ],
        ];

        foreach ($campaigns as $campaign) {
            Kampanye::create($campaign);
        }

        $this->command->info('✓ Sample campaigns created successfully!');
    }
}
