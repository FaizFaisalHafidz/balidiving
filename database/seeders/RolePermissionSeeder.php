<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            // Campaign Permissions
            'campaign.create',
            'campaign.read',
            'campaign.update',
            'campaign.delete',
            'campaign.approve',
            'campaign.reject',

            // User Management Permissions
            'user.create',
            'user.read',
            'user.update',
            'user.delete',
            'user.verify',

            // Donation Permissions
            'donation.create',
            'donation.read',
            'donation.update',

            // Withdrawal Permissions
            'withdrawal.create',
            'withdrawal.read',
            'withdrawal.approve',
            'withdrawal.reject',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Create roles and assign permissions

        // Super Admin - All permissions
        $superAdmin = Role::create(['name' => 'super-admin']);
        $superAdmin->givePermissionTo(Permission::all());

        // Admin - Most permissions except super admin functions
        $admin = Role::create(['name' => 'admin']);
        $admin->givePermissionTo([
            'campaign.create',
            'campaign.read',
            'campaign.update',
            'campaign.delete',
            'campaign.approve',
            'campaign.reject',
            'user.read',
            'user.update',
            'user.verify',
            'donation.read',
            'donation.update',
            'withdrawal.read',
            'withdrawal.approve',
            'withdrawal.reject',
        ]);

        // Fundraiser - Campaign and own profile management
        $fundraiser = Role::create(['name' => 'fundraiser']);
        $fundraiser->givePermissionTo([
            'campaign.create',
            'campaign.read',
            'campaign.update', // own campaigns only
            'withdrawal.create',
            'withdrawal.read', // own withdrawals only
        ]);

        // Donor - Basic read permissions and donation
        $donor = Role::create(['name' => 'donor']);
        $donor->givePermissionTo([
            'campaign.read',
            'donation.create',
            'donation.read', // own donations only
        ]);
    }
}
