import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { ArrowLeft, Calendar, CheckCircle, DollarSign, Heart, Mail, XCircle } from 'lucide-react';

interface Props {
    user: {
        id: number;
        name: string;
        email: string;
        email_verified_at: string | null;
        created_at: string;
        roles: { name: string }[];
        donasi: {
            id: number;
            jumlah: number;
            status: string;
            created_at: string;
            kampanye: {
                judul: string;
                slug: string;
            };
        }[];
    };
    stats: {
        total_donations: number;
        total_amount: number;
        campaigns_supported: number;
    };
}

export default function Show({ user, stats }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <AppLayout>
            <Head title={user.name} />

            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="icon"
                        asChild
                        className="bg-slate-900 hover:bg-slate-800 text-white border-slate-700 shadow-md"
                    >
                        <Link href="/admin/users">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                        <p className="text-slate-400 mt-1">Detail informasi pengguna</p>
                    </div>
                    <Button
                        asChild
                        className="bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 shadow-md"
                    >
                        <Link href={`/admin/users/${user.id}/edit`}>Edit Pengguna</Link>
                    </Button>
                </div>

                {/* User Info Card */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <div className="text-slate-500 text-sm mb-1">Email</div>
                                <div className="flex items-center gap-2 text-slate-900">
                                    <Mail className="h-4 w-4 text-slate-400" />
                                    {user.email}
                                </div>
                            </div>
                            <div>
                                <div className="text-slate-500 text-sm mb-1">Status Email</div>
                                <Badge
                                    variant={user.email_verified_at ? 'default' : 'secondary'}
                                    className={
                                        user.email_verified_at
                                            ? 'bg-green-100 text-green-700 border-green-300'
                                            : 'bg-slate-100 text-slate-600 border-slate-300'
                                    }
                                >
                                    {user.email_verified_at ? (
                                        <CheckCircle className="mr-1 h-3 w-3" />
                                    ) : (
                                        <XCircle className="mr-1 h-3 w-3" />
                                    )}
                                    {user.email_verified_at ? 'Verified' : 'Unverified'}
                                </Badge>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <div className="text-slate-500 text-sm mb-1">Role</div>
                                <div className="flex flex-wrap gap-2">
                                    {user.roles.map((role) => (
                                        <Badge
                                            key={role.name}
                                            variant="outline"
                                            className="bg-slate-100 text-slate-700 border-slate-300"
                                        >
                                            {role.name}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div className="text-slate-500 text-sm mb-1">Tanggal Daftar</div>
                                <div className="flex items-center gap-2 text-slate-900">
                                    <Calendar className="h-4 w-4 text-slate-400" />
                                    {format(new Date(user.created_at), 'dd MMMM yyyy')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-3">
                            <div className="bg-slate-100 p-3 rounded-lg">
                                <DollarSign className="h-6 w-6 text-slate-600" />
                            </div>
                            <div>
                                <div className="text-slate-500 text-sm">Total Donasi</div>
                                <div className="text-slate-900 text-2xl font-bold">
                                    {stats.total_donations}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-3">
                            <div className="bg-green-100 p-3 rounded-lg">
                                <DollarSign className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <div className="text-slate-500 text-sm">Total Amount</div>
                                <div className="text-slate-900 text-xl font-bold">
                                    {formatCurrency(stats.total_amount)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-3">
                            <div className="bg-slate-100 p-3 rounded-lg">
                                <Heart className="h-6 w-6 text-slate-600" />
                            </div>
                            <div>
                                <div className="text-slate-500 text-sm">Kampanye Didukung</div>
                                <div className="text-slate-900 text-2xl font-bold">
                                    {stats.campaigns_supported}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Donations */}
                {user.donasi && user.donasi.length > 0 && (
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-md">
                        <h2 className="text-xl font-bold text-slate-900 mb-4">
                            Donasi Terbaru (10 terakhir)
                        </h2>
                        <div className="space-y-3">
                            {user.donasi.map((donation) => (
                                <div
                                    key={donation.id}
                                    className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200"
                                >
                                    <div className="flex-1">
                                        <Link
                                            href={`/campaigns/${donation.kampanye.slug}`}
                                            className="text-slate-900 font-medium hover:text-slate-700 transition-colors"
                                        >
                                            {donation.kampanye.judul}
                                        </Link>
                                        <div className="text-sm text-slate-500 mt-1">
                                            {format(new Date(donation.created_at), 'dd MMM yyyy, HH:mm')}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-slate-900 font-bold">
                                            {formatCurrency(donation.jumlah)}
                                        </div>
                                        <Badge
                                            variant={
                                                donation.status === 'berhasil'
                                                    ? 'default'
                                                    : 'secondary'
                                            }
                                            className={
                                                donation.status === 'berhasil'
                                                    ? 'bg-green-100 text-green-700 border-green-300'
                                                    : 'bg-slate-100 text-slate-600 border-slate-300'
                                            }
                                        >
                                            {donation.status}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {(!user.donasi || user.donasi.length === 0) && (
                    <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-md">
                        <Heart className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">
                            Belum Ada Donasi
                        </h3>
                        <p className="text-slate-500">
                            Pengguna ini belum melakukan donasi apapun
                        </p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
