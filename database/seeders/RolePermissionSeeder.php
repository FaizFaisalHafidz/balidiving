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

            // Category Permissions
            'category.create',
            'category.read',
            'category.update',
            'category.delete',

            // Report Permissions
            'report.read',
            'report.export',
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
            'user.read',
            'user.update',
            'user.verify',
            'donation.read',
            'donation.update',
            'category.create',
            'category.read',
            'category.update',
            'category.delete',
            'report.read',
            'report.export',
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
