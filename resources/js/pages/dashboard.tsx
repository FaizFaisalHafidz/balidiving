import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    AlertCircle,
    Clock,
    DollarSign,
    Heart,
    Target,
    Users
} from 'lucide-react';
import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

// @ts-ignore
const route = window.route;

interface Stats {
    total_donations: number;
    total_donations_count: number;
    total_campaigns: number;
    total_users: number;
    active_campaigns: number;
    pending_donations: number;
    today_donations: number;
    today_donations_count: number;
}

interface ChartData {
    date: string;
    total: number;
    count: number;
}

interface Campaign {
    id: number;
    judul: string;
    slug: string;
    gambar_utama?: string;
    total_donasi: number;
    jumlah_donatur: number;
    target_dana: number;
    persentase: number;
}

interface Donation {
    id: number;
    jumlah: number;
    status: string;
    nama_donatur: string;
    kampanye: {
        judul: string;
        slug: string;
    };
    created_at: string;
}

interface CampaignNeedAttention {
    id: number;
    judul: string;
    slug: string;
    tanggal_berakhir: string;
    hari_tersisa: number;
}

interface DashboardProps {
    stats: Stats;
    charts: {
        last_7_days: ChartData[];
    };
    topCampaigns: Campaign[];
    recentDonations: Donation[];
    campaignsNeedAttention: CampaignNeedAttention[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({ 
    stats, 
    charts, 
    topCampaigns, 
    recentDonations,
    campaignsNeedAttention 
}: DashboardProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-col gap-6 p-6">
                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Donasi</CardTitle>
                            <Heart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(stats.total_donations)}</div>
                            <p className="text-xs text-muted-foreground">
                                {stats.total_donations_count} transaksi berhasil
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Donasi Hari Ini</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(stats.today_donations)}</div>
                            <p className="text-xs text-muted-foreground">
                                {stats.today_donations_count} transaksi
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Kampanye</CardTitle>
                            <Target className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_campaigns}</div>
                            <p className="text-xs text-muted-foreground">
                                {stats.active_campaigns} kampanye aktif
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Pengguna</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_users}</div>
                            <p className="text-xs text-muted-foreground">
                                {stats.pending_donations} donasi pending
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Chart - Donasi 7 Hari Terakhir */}
                <Card>
                    <CardHeader>
                        <CardTitle>Tren Donasi 7 Hari Terakhir</CardTitle>
                        <CardDescription>Total donasi yang berhasil per hari</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={charts.last_7_days}>
                                <XAxis 
                                    dataKey="date" 
                                    stroke="#888888"
                                    fontSize={12}
                                />
                                <YAxis 
                                    stroke="#888888"
                                    fontSize={12}
                                    tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                                />
                                <Tooltip 
                                    formatter={(value: number) => formatCurrency(value)}
                                    labelFormatter={(label) => `Tanggal: ${label}`}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="total" 
                                    stroke="#8884d8" 
                                    fill="#8884d8" 
                                    fillOpacity={0.3}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Top Campaigns */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Top 5 Kampanye Terpopuler</CardTitle>
                            <CardDescription>Kampanye dengan donasi terbanyak</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {topCampaigns.map((campaign) => (
                                    <div key={campaign.id} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Link 
                                                href={`/campaigns/${campaign.slug}`}
                                                className="font-medium hover:underline text-sm"
                                            >
                                                {campaign.judul}
                                            </Link>
                                            <Badge variant="outline">
                                                {campaign.persentase.toFixed(0)}%
                                            </Badge>
                                        </div>
                                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                                            <span>{formatCurrency(campaign.total_donasi)}</span>
                                            <span>{campaign.jumlah_donatur} donatur</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-blue-600 h-2 rounded-full" 
                                                style={{ width: `${Math.min(campaign.persentase, 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Donations */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Donasi Terbaru</CardTitle>
                            <CardDescription>10 transaksi donasi terakhir</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {recentDonations.map((donation) => (
                                    <div key={donation.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">
                                                {donation.nama_donatur}
                                            </p>
                                            <p className="text-xs text-muted-foreground truncate">
                                                {donation.kampanye.judul}
                                            </p>
                                        </div>
                                        <div className="text-right ml-4">
                                            <p className="text-sm font-bold">
                                                {formatCurrency(donation.jumlah)}
                                            </p>
                                            <Badge 
                                                variant={donation.status === 'berhasil' ? 'default' : 'secondary'}
                                                className="text-xs"
                                            >
                                                {donation.status}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Campaigns Need Attention */}
                {campaignsNeedAttention.length > 0 && (
                    <Card className="border-orange-200">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <AlertCircle className="h-5 w-5 text-orange-500" />
                                Kampanye Butuh Perhatian
                            </CardTitle>
                            <CardDescription>Kampanye yang akan berakhir dalam 7 hari</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {campaignsNeedAttention.map((campaign) => (
                                    <div key={campaign.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                                        <div className="flex-1">
                                            <Link 
                                                href={`/admin/campaigns/${campaign.id}/edit`}
                                                className="font-medium hover:underline"
                                            >
                                                {campaign.judul}
                                            </Link>
                                        </div>
                                        <div className="flex items-center gap-2 text-orange-700">
                                            <Clock className="h-4 w-4" />
                                            <span className="text-sm font-medium">
                                                {campaign.hari_tersisa} hari lagi
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
