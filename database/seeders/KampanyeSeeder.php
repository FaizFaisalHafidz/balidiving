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
        // Get fundraiser user
        $fundraiser = User::whereHas('roles', function ($query) {
            $query->where('name', 'fundraiser');
        })->first();

        if (!$fundraiser) {
            $this->command->error('Fundraiser user not found. Please run UserSeeder first.');
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
                'user_id' => $fundraiser->id,
                'kategori_id' => $terumbuKarang->id,
                'judul' => 'Coral Restoration Project',
                'deskripsi' => 'Help restore coral reefs in endangered marine areas. Coral reefs are among the most diverse ecosystems on Earth, providing homes to 25% of all marine species. This project aims to restore 1000 square meters of damaged coral reefs using advanced marine biology techniques and community involvement.',
                'target_dana' => 30000.00,
                'dana_terkumpul' => 26400.00,
                'tanggal_mulai' => Carbon::now()->subDays(20),
                'tanggal_berakhir' => Carbon::now()->addDays(10),
                'gambar_utama' => '/images/coral-1.jpeg',
                'status' => 'aktif',
            ],
            [
                'user_id' => $fundraiser->id,
                'kategori_id' => $terumbuKarang->id,
                'judul' => 'Help Relocate the Coral',
                'deskripsi' => 'Support coral relocation efforts to safer waters. Due to rising ocean temperatures and pollution, many coral colonies need to be moved to healthier environments. This campaign will fund the equipment, marine biologists, and boat operations needed for safe coral transplantation.',
                'target_dana' => 40000.00,
                'dana_terkumpul' => 21840.00,
                'tanggal_mulai' => Carbon::now()->subDays(5),
                'tanggal_berakhir' => Carbon::now()->addDays(25),
                'gambar_utama' => '/images/coral-2.jpeg',
                'status' => 'aktif',
            ],
            [
                'user_id' => $fundraiser->id,
                'kategori_id' => $konservasiLaut->id,
                'judul' => 'Save Coral Reefs',
                'deskripsi' => 'Protect existing coral reef ecosystems from further damage. Coral reefs are dying at an alarming rate. This project focuses on establishing marine protected areas, educating local communities, and implementing sustainable fishing practices to preserve our remaining coral reefs.',
                'target_dana' => 20000.00,
                'dana_terkumpul' => 15000.00,
                'tanggal_mulai' => Carbon::now()->subDays(35),
                'tanggal_berakhir' => Carbon::now()->addDays(65),
                'gambar_utama' => '/images/sdm-1-.jpg',
                'status' => 'aktif',
            ],
            [
                'user_id' => $fundraiser->id,
                'kategori_id' => $terumbuKarang->id,
                'judul' => 'Help Rebuild Coral Reefs',
                'deskripsi' => 'Rebuild damaged coral reef systems using innovative techniques. This large-scale project will create artificial reef structures, transplant healthy coral fragments, and monitor the recovery progress over 3 years. Your donation will directly contribute to ocean ecosystem restoration.',
                'target_dana' => 200000.00,
                'dana_terkumpul' => 176000.00,
                'tanggal_mulai' => Carbon::now()->subDays(30),
                'tanggal_berakhir' => Carbon::now()->addDays(70),
                'gambar_utama' => '/images/sdm-2.jpg',
                'status' => 'aktif',
            ],
            [
                'user_id' => $fundraiser->id,
                'kategori_id' => KategoriKampanye::where('nama', 'Pembersihan Pantai')->first()->id ?? $konservasiLaut->id,
                'judul' => 'Beach Cleanup Initiative',
                'deskripsi' => 'Join our monthly beach cleanup campaign to remove plastic waste and debris from our coastal areas. Every piece of trash removed means a safer environment for marine life and cleaner beaches for our communities.',
                'target_dana' => 15000.00,
                'dana_terkumpul' => 8500.00,
                'tanggal_mulai' => Carbon::now()->subDays(10),
                'tanggal_berakhir' => Carbon::now()->addDays(50),
                'gambar_utama' => '/images/coral-1.jpeg',
                'status' => 'aktif',
            ],
            [
                'user_id' => $fundraiser->id,
                'kategori_id' => KategoriKampanye::where('nama', 'Satwa Laut')->first()->id ?? $konservasiLaut->id,
                'judul' => 'Sea Turtle Conservation',
                'deskripsi' => 'Protect endangered sea turtle nesting sites and hatchlings. This program includes beach patrols during nesting season, hatchery protection, and education programs for local communities about the importance of sea turtle conservation.',
                'target_dana' => 25000.00,
                'dana_terkumpul' => 12800.00,
                'tanggal_mulai' => Carbon::now()->subDays(15),
                'tanggal_berakhir' => Carbon::now()->addDays(45),
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
