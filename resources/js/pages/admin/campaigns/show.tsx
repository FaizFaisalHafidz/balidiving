import { Campaign } from '@/components/campaigns/columns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';
import {
    ArrowLeft,
    Calendar,
    Edit,
    HandHeart,
    TrendingUp,
    Users
} from 'lucide-react';

interface Donation {
    id: number;
    user: {
        name: string;
        email: string;
    };
    amount: number;
    metode_pembayaran: string;
    status: string;
    created_at: string;
}

interface ShowCampaignPageProps {
    auth: {
        user: any;
    };
    campaign: Campaign & {
        deskripsi: string;
        gambar_utama: string;
        tanggal_mulai: string;
        tanggal_berakhir: string;
        kategori: {
            nama: string;
        };
        user: {
            name: string;
        };
        percentage: number;
        days_remaining: number;
    };
    stats: {
        total_donations: number;
        total_donors: number;
        average_donation: number;
        recent_donations: Donation[];
    };
}

export default function Show({ auth, campaign, stats }: ShowCampaignPageProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'aktif':
                return 'bg-green-100 text-green-700 border-green-300';
            case 'nonaktif':
                return 'bg-slate-100 text-slate-600 border-slate-300';
            case 'selesai':
                return 'bg-blue-100 text-blue-700 border-blue-300';
            default:
                return 'bg-slate-100 text-slate-600 border-slate-300';
        }
    };

    return (
        <AppLayout>
            <Head title={campaign.judul} />

            <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" asChild className="border-slate-200">
                            <Link href="/admin/campaigns">
                                <ArrowLeft className="w-4 h-4" />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">
                                Detail Kampanye
                            </h1>
                            <p className="text-slate-600 mt-1">
                                Informasi lengkap tentang kampanye
                            </p>
                        </div>
                    </div>
                    <Button asChild className="bg-slate-900 hover:bg-slate-800">
                        <Link href={`/admin/campaigns/${campaign.id}/edit`}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Kampanye
                        </Link>
                    </Button>
                </div>

                {/* Campaign Image & Info */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        {campaign.gambar_utama && (
                            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                                <img
                                    src={`/storage/${campaign.gambar_utama}`}
                                    alt={campaign.judul}
                                    className="w-full h-[400px] object-cover"
                                />
                            </div>
                        )}

                        <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
                            <div className="flex items-start justify-between">
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-bold text-slate-900">
                                        {campaign.judul}
                                    </h2>
                                    <div className="flex items-center gap-2">
                                        <Badge
                                            variant="outline"
                                            className="bg-slate-100 text-slate-700 border-slate-300"
                                        >
                                            {campaign.kategori.nama}
                                        </Badge>
                                        <Badge variant="outline" className={getStatusColor(campaign.status)}>
                                            {campaign.status.charAt(0).toUpperCase() +
                                                campaign.status.slice(1)}
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            <div className="prose max-w-none text-slate-700">
                                <p className="whitespace-pre-wrap">{campaign.deskripsi}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Progress Card */}
                        <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
                            <div>
                                <p className="text-sm font-medium text-slate-600 mb-2">
                                    Progress Dana
                                </p>
                                <div className="space-y-2">
                                    <Progress value={campaign.percentage || 0} className="h-3" />
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-600">
                                            {(campaign.percentage || 0).toFixed(1)}%
                                        </span>
                                        <span className="font-medium text-slate-900">
                                            ${campaign.target_dana.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-200 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-600">Dana Terkumpul</span>
                                    <span className="text-lg font-bold text-green-600">
                                        ${campaign.dana_terkumpul.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-600">Target Dana</span>
                                    <span className="text-lg font-bold text-slate-900">
                                        ${campaign.target_dana.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white rounded-lg border border-slate-200 p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <HandHeart className="w-4 h-4 text-slate-600" />
                                    <p className="text-xs font-medium text-slate-600">
                                        Total Donasi
                                    </p>
                                </div>
                                <p className="text-2xl font-bold text-slate-900">
                                    {stats.total_donations}
                                </p>
                            </div>

                            <div className="bg-white rounded-lg border border-slate-200 p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Users className="w-4 h-4 text-slate-600" />
                                    <p className="text-xs font-medium text-slate-600">
                                        Total Donatur
                                    </p>
                                </div>
                                <p className="text-2xl font-bold text-slate-900">
                                    {stats.total_donors}
                                </p>
                            </div>

                            <div className="bg-white rounded-lg border border-slate-200 p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <TrendingUp className="w-4 h-4 text-slate-600" />
                                    <p className="text-xs font-medium text-slate-600">
                                        Rata-rata
                                    </p>
                                </div>
                                <p className="text-2xl font-bold text-slate-900">
                                    ${(stats.average_donation || 0).toFixed(0)}
                                </p>
                            </div>

                            <div className="bg-white rounded-lg border border-slate-200 p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Calendar className="w-4 h-4 text-slate-600" />
                                    <p className="text-xs font-medium text-slate-600">
                                        Hari Tersisa
                                    </p>
                                </div>
                                <p className="text-2xl font-bold text-slate-900">
                                    {campaign.days_remaining}
                                </p>
                            </div>
                        </div>

                        {/* Campaign Info */}
                        <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-3">
                            <h3 className="font-semibold text-slate-900 mb-4">
                                Informasi Kampanye
                            </h3>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <p className="text-slate-600">Dibuat oleh</p>
                                    <p className="font-medium text-slate-900">
                                        {campaign.user.name}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-slate-600">Tanggal Mulai</p>
                                    <p className="font-medium text-slate-900">
                                        {format(new Date(campaign.tanggal_mulai), 'dd MMM yyyy')}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-slate-600">Tanggal Berakhir</p>
                                    <p className="font-medium text-slate-900">
                                        {format(new Date(campaign.tanggal_berakhir), 'dd MMM yyyy')}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-slate-600">Dibuat pada</p>
                                    <p className="font-medium text-slate-900">
                                        {format(new Date(campaign.created_at), 'dd MMM yyyy HH:mm')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Donations */}
                <div className="bg-white rounded-lg border border-slate-200 p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Donasi Terbaru</h3>
                    {stats.recent_donations && stats.recent_donations.length > 0 ? (
                        <div className="space-y-4">
                            {stats.recent_donations.map((donation) => (
                                <div
                                    key={donation.id}
                                    className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                                            <Users className="w-5 h-5 text-slate-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-900">
                                                {donation.user.name}
                                            </p>
                                            <p className="text-sm text-slate-500">
                                                {format(new Date(donation.created_at), 'dd MMM yyyy HH:mm')}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-green-600">
                                            ${donation.amount.toLocaleString()}
                                        </p>
                                        <Badge
                                            variant="outline"
                                            className="text-xs bg-green-100 text-green-700 border-green-300"
                                        >
                                            {donation.status}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <HandHeart className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                            <p className="text-slate-600">Belum ada donasi untuk kampanye ini</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
