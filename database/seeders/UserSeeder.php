<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\ProfilPengguna;
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
            'email' => 'superadmin@atb.com',
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
            'name' => 'Admin Adopt the Blue',
            'email' => 'admin@atb.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);
        $admin->assignRole('admin');
        
        ProfilPengguna::create([
            'user_id' => $admin->id,
            'nomor_telepon' => '081234567891',
            'alamat' => 'Bali, Indonesia',
        ]);

        // Create Sample Donors
        $donor1 = User::create([
            'name' => 'John Donor',
            'email' => 'donor@atb.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);
        $donor1->assignRole('donor');
        
        ProfilPengguna::create([
            'user_id' => $donor1->id,
            'nomor_telepon' => '081234567892',
            'alamat' => 'Surabaya, Indonesia',
        ]);

        $donor2 = User::create([
            'name' => 'Jane Smith',
            'email' => 'jane@atb.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);
        $donor2->assignRole('donor');
        
        ProfilPengguna::create([
            'user_id' => $donor2->id,
            'nomor_telepon' => '081234567893',
            'alamat' => 'Denpasar, Bali',
        ]);
    }
}
