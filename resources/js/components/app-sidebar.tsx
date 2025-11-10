import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { PageProps, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    BadgeCheck,
    BookOpen,
    FileText,
    FolderHeart,
    HandHeart,
    Heart,
    LayoutDashboard,
    MessageSquare,
    Settings,
    TrendingUp,
    Users,
    Wallet,
} from 'lucide-react';
import AppLogo from './app-logo';

interface CustomProps extends PageProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            email_verified_at: string | null;
            created_at: string;
            updated_at: string;
            roles: { name: string }[];
        };
    };
}

export function AppSidebar() {
    const { auth } = usePage<CustomProps>().props;
    const roles = auth.user?.roles?.map((role) => role.name) || [];

    // Menu dasar untuk semua pengguna yang login
    const dashboardMenu: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutDashboard,
        },
    ];

    // Menu untuk Super Admin (Full Access ke seluruh sistem)
    const superAdminMenu: NavItem[] = [
        {
            title: 'Manajemen Pengguna',
            href: '/admin/users',
            icon: Users,
        },
        {
            title: 'Verifikasi Fundraiser',
            href: '/admin/fundraiser-verification',
            icon: BadgeCheck,
        },
        {
            title: 'Kelola Kampanye',
            href: '/admin/campaigns',
            icon: FolderHeart,
        },
        {
            title: 'Approval Kampanye',
            href: '/admin/campaign-approvals',
            icon: FileText,
        },
        {
            title: 'Kelola Kategori',
            href: '/admin/categories',
            icon: BookOpen,
        },
        {
            title: 'Semua Donasi',
            href: '/admin/donations',
            icon: HandHeart,
        },
        {
            title: 'Penarikan Dana',
            href: '/admin/withdrawals',
            icon: Wallet,
        },
        {
            title: 'Moderasi Komentar',
            href: '/admin/comments',
            icon: MessageSquare,
        },
        {
            title: 'Laporan & Statistik',
            href: '/admin/reports',
            icon: TrendingUp,
        },
        {
            title: 'Pengaturan Sistem',
            href: '/admin/settings',
            icon: Settings,
        },
    ];

    // Menu untuk Admin (Kepala Admin - Sebagian besar akses)
    const adminMenu: NavItem[] = [
        {
            title: 'Manajemen Pengguna',
            href: '/admin/users',
            icon: Users,
        },
        {
            title: 'Verifikasi Fundraiser',
            href: '/admin/fundraiser-verification',
            icon: BadgeCheck,
        },
        {
            title: 'Kelola Kampanye',
            href: '/admin/campaigns',
            icon: FolderHeart,
        },
        {
            title: 'Approval Kampanye',
            href: '/admin/campaign-approvals',
            icon: FileText,
        },
        {
            title: 'Kelola Kategori',
            href: '/admin/categories',
            icon: BookOpen,
        },
        {
            title: 'Semua Donasi',
            href: '/admin/donations',
            icon: HandHeart,
        },
        {
            title: 'Penarikan Dana',
            href: '/admin/withdrawals',
            icon: Wallet,
        },
        {
            title: 'Moderasi Komentar',
            href: '/admin/comments',
            icon: MessageSquare,
        },
        {
            title: 'Laporan & Statistik',
            href: '/admin/reports',
            icon: TrendingUp,
        },
    ];

    // Menu untuk Fundraiser (Penggalang Dana)
    const fundraiserMenu: NavItem[] = [
        {
            title: 'Kampanye Saya',
            href: '/fundraiser/campaigns',
            icon: FolderHeart,
        },
        {
            title: 'Buat Kampanye Baru',
            href: '/fundraiser/campaigns/create',
            icon: FileText,
        },
        {
            title: 'Donasi Masuk',
            href: '/fundraiser/donations',
            icon: HandHeart,
        },
        {
            title: 'Penarikan Dana',
            href: '/fundraiser/withdrawals',
            icon: Wallet,
        },
        {
            title: 'Komentar & Dukungan',
            href: '/fundraiser/comments',
            icon: MessageSquare,
        },
        {
            title: 'Statistik Kampanye',
            href: '/fundraiser/statistics',
            icon: TrendingUp,
        },
        {
            title: 'Profil Fundraiser',
            href: '/fundraiser/profile',
            icon: BadgeCheck,
        },
    ];

    // Menu untuk Donor (Donatur)
    const donorMenu: NavItem[] = [
        {
            title: 'Jelajah Kampanye',
            href: '/campaigns',
            icon: FolderHeart,
        },
        {
            title: 'Riwayat Donasi',
            href: '/donor/donations',
            icon: HandHeart,
        },
        {
            title: 'Kampanye Favorit',
            href: '/donor/favorites',
            icon: Heart,
        },
        {
            title: 'Sertifikat Donasi',
            href: '/donor/certificates',
            icon: FileText,
        },
        {
            title: 'Profil Saya',
            href: '/donor/profile',
            icon: Users,
        },
    ];

    // Menentukan menu yang akan ditampilkan berdasarkan role
    let mainNavItems = [...dashboardMenu];

    if (roles.includes('super-admin')) {
        mainNavItems = [...mainNavItems, ...superAdminMenu];
    } else if (roles.includes('admin')) {
        mainNavItems = [...mainNavItems, ...adminMenu];
    } else if (roles.includes('fundraiser')) {
        mainNavItems = [...mainNavItems, ...fundraiserMenu];
    } else if (roles.includes('donor')) {
        mainNavItems = [...mainNavItems, ...donorMenu];
    }

    // Menu footer untuk semua user
    const footerNavItems: NavItem[] = [
        {
            title: 'Tentang Born to Give',
            href: '/about',
            icon: BookOpen,
        },
        {
            title: 'Panduan Pengguna',
            href: '/help',
            icon: FileText,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
