<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\ProfilPengguna;
use App\Models\ProfilFundraiser;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Super Admin
        $superAdmin = User::create([
            'name' => 'Super Admin',
            'email' => 'superadmin@borntogive.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);
        $superAdmin->assignRole('super-admin');
        
        ProfilPengguna::create([
            'user_id' => $superAdmin->id,
            'nomor_telepon' => '081234567890',
            'alamat' => 'Jakarta, Indonesia',
        ]);

        // Create Admin
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@borntogive.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);
        $admin->assignRole('admin');
        
        ProfilPengguna::create([
            'user_id' => $admin->id,
            'nomor_telepon' => '081234567891',
            'alamat' => 'Bandung, Indonesia',
        ]);

        // Create Sample Verified Fundraiser
        $fundraiser = User::create([
            'name' => 'Ocean Guardian',
            'email' => 'fundraiser@borntogive.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);
        $fundraiser->assignRole('fundraiser');
        
        ProfilPengguna::create([
            'user_id' => $fundraiser->id,
            'nomor_telepon' => '081234567892',
            'alamat' => 'Bali, Indonesia',
        ]);

        ProfilFundraiser::create([
            'user_id' => $fundraiser->id,
            'nomor_rekening' => '1234567890',
            'nama_bank' => 'BCA',
            'nama_pemilik_rekening' => 'Ocean Guardian',
            'status_verifikasi' => 'terverifikasi',
        ]);

        // Create Sample Donor
        $donor = User::create([
            'name' => 'John Donor',
            'email' => 'donor@borntogive.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);
        $donor->assignRole('donor');
        
        ProfilPengguna::create([
            'user_id' => $donor->id,
            'nomor_telepon' => '081234567893',
            'alamat' => 'Surabaya, Indonesia',
        ]);
    }
}
