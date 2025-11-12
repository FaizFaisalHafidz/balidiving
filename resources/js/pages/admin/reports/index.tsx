import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { Download, Heart, Target, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

// @ts-ignore
const route = window.route;

interface Statistics {
    total_donations: number;
    total_donations_count: number;
    total_campaigns: number;
    total_users: number;
    active_campaigns: number;
    completed_campaigns: number;
    average_donation: number;
}

interface DonationTrend {
    date: string;
    total: number;
    count: number;
}

interface TopCampaign {
    id: number;
    title: string;
    slug: string;
    total_donations: number;
    donations_count: number;
    goal_amount: number;
    progress_percentage: number;
}

interface TopDonor {
    user_id: number;
    user_name: string;
    user_email: string;
    total_donated: number;
    donations_count: number;
}

interface StatusBreakdown {
    status: string;
    count: number;
    total?: number;
}

interface UserGrowth {
    date: string;
    count: number;
}

interface ReportsProps {
    filters: {
        start_date: string;
        end_date: string;
    };
    statistics: Statistics;
    donationTrends: DonationTrend[];
    topCampaigns: TopCampaign[];
    topDonors: TopDonor[];
    donationsByStatus: StatusBreakdown[];
    campaignsByStatus: StatusBreakdown[];
    userGrowth: UserGrowth[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function ReportsIndex({ 
    filters, 
    statistics, 
    donationTrends, 
    topCampaigns, 
    topDonors,
    donationsByStatus,
    campaignsByStatus,
    userGrowth
}: ReportsProps) {
    const [startDate, setStartDate] = useState<string>(filters.start_date);
    const [endDate, setEndDate] = useState<string>(filters.end_date);

    const handleFilterChange = () => {
        router.get(route('admin.reports.index'), {
            start_date: startDate,
            end_date: endDate,
        }, {
            preserveState: true,
        });
    };

    const handleExport = (type: 'donations' | 'campaigns' | 'users') => {
        const params = new URLSearchParams({
            start_date: startDate,
            end_date: endDate,
        });

        window.location.href = route(`admin.reports.export.${type}`) + '?' + params.toString();
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <AppLayout>
            <Head title="Laporan & Statistik" />

            <div className="space-y-6 p-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Laporan & Statistik</h1>
                    <p className="text-muted-foreground">
                        Analisis komprehensif donasi, kampanye, dan pertumbuhan pengguna
                    </p>
                </div>

                {/* Date Filter */}
                <Card>
                    <CardHeader>
                        <CardTitle>Filter Periode</CardTitle>
                        <CardDescription>Pilih rentang tanggal untuk melihat laporan</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap items-end gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="start-date">Tanggal Mulai</Label>
                                <Input
                                    id="start-date"
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-[240px]"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="end-date">Tanggal Akhir</Label>
                                <Input
                                    id="end-date"
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-[240px]"
                                />
                            </div>

                            <Button onClick={handleFilterChange}>
                                Terapkan Filter
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Statistics Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Donasi</CardTitle>
                            <Heart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(statistics.total_donations)}</div>
                            <p className="text-xs text-muted-foreground">
                                {statistics.total_donations_count} transaksi berhasil
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Rata-rata Donasi</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(statistics.average_donation)}</div>
                            <p className="text-xs text-muted-foreground">Per transaksi</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Kampanye</CardTitle>
                            <Target className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{statistics.total_campaigns}</div>
                            <p className="text-xs text-muted-foreground">
                                {statistics.active_campaigns} aktif, {statistics.completed_campaigns} selesai
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pengguna Baru</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{statistics.total_users}</div>
                            <p className="text-xs text-muted-foreground">Dalam periode ini</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Export Buttons */}
                <Card>
                    <CardHeader>
                        <CardTitle>Export Laporan</CardTitle>
                        <CardDescription>Download laporan dalam format Excel</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-3">
                            <Button 
                                onClick={() => handleExport('donations')}
                                variant="outline"
                            >
                                <Download className="mr-2 h-4 w-4" />
                                Export Donasi
                            </Button>
                            <Button 
                                onClick={() => handleExport('campaigns')}
                                variant="outline"
                            >
                                <Download className="mr-2 h-4 w-4" />
                                Export Kampanye
                            </Button>
                            <Button 
                                onClick={() => handleExport('users')}
                                variant="outline"
                            >
                                <Download className="mr-2 h-4 w-4" />
                                Export Pengguna
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Charts Grid */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Donation Trends Chart */}
                    <Card className="col-span-2">
                        <CardHeader>
                            <CardTitle>Tren Donasi</CardTitle>
                            <CardDescription>Total donasi per hari dalam periode yang dipilih</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={donationTrends}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                                    <Tooltip 
                                        formatter={(value: number) => formatCurrency(value)}
                                        labelFormatter={(label) => `Tanggal: ${label}`}
                                    />
                                    <Legend />
                                    <Area 
                                        type="monotone" 
                                        dataKey="total" 
                                        stroke="#8884d8" 
                                        fill="#8884d8" 
                                        name="Total Donasi"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Top Campaigns */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Top 10 Kampanye</CardTitle>
                            <CardDescription>Kampanye dengan donasi terbanyak</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={topCampaigns.slice(0, 5)} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                                    <YAxis type="category" dataKey="title" width={150} />
                                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                                    <Bar dataKey="total_donations" fill="#00C49F" name="Total Donasi" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Donation Status */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Status Donasi</CardTitle>
                            <CardDescription>Breakdown berdasarkan status</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={donationsByStatus}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={(entry: any) => `${entry.status}: ${(entry.percent * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="count"
                                        nameKey="status"
                                    >
                                        {donationsByStatus.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* User Growth */}
                    <Card className="col-span-2">
                        <CardHeader>
                            <CardTitle>Pertumbuhan Pengguna</CardTitle>
                            <CardDescription>Pengguna baru yang bergabung per hari</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={userGrowth}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip labelFormatter={(label) => `Tanggal: ${label}`} />
                                    <Legend />
                                    <Line 
                                        type="monotone" 
                                        dataKey="count" 
                                        stroke="#FF8042" 
                                        name="Pengguna Baru"
                                        strokeWidth={2}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* Top Donors Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Top Donatur</CardTitle>
                        <CardDescription>Donatur dengan total donasi terbesar</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs uppercase bg-muted">
                                    <tr>
                                        <th className="px-6 py-3">Nama</th>
                                        <th className="px-6 py-3">Email</th>
                                        <th className="px-6 py-3">Total Donasi</th>
                                        <th className="px-6 py-3">Jumlah Transaksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topDonors.map((donor) => (
                                        <tr key={donor.user_id} className="border-b">
                                            <td className="px-6 py-4 font-medium">{donor.user_name}</td>
                                            <td className="px-6 py-4">{donor.user_email}</td>
                                            <td className="px-6 py-4">{formatCurrency(donor.total_donated)}</td>
                                            <td className="px-6 py-4">{donor.donations_count}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
