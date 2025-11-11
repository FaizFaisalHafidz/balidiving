import { columns, type User } from '@/components/data-table/columns';
import { DataTable } from '@/components/data-table/data-table';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

interface Props {
    users: {
        data: User[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        search?: string;
        role?: string;
        status?: string;
        sort_by?: string;
        sort_order?: string;
    };
    roles: { id: number; name: string }[];
}

export default function Index({ users, filters, roles }: Props) {
    const { flash } = usePage().props as any;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return (
        <AppLayout>
            <Head title="Manajemen Pengguna" />

            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white">
                            Manajemen Pengguna
                        </h1>
                        <p className="text-slate-400 mt-1">
                            Kelola semua pengguna yang terdaftar di sistem
                        </p>
                    </div>
                    <Button
                        asChild
                        className="bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 shadow-md"
                    >
                        <Link href="/admin/users/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Pengguna
                        </Link>
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                        <div className="text-slate-500 text-sm font-medium">
                            Total Pengguna
                        </div>
                        <div className="text-slate-900 text-3xl font-bold mt-2">
                            {users.total}
                        </div>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                        <div className="text-slate-500 text-sm font-medium">Verified</div>
                        <div className="text-green-600 text-3xl font-bold mt-2">
                            {users.data.filter((u) => u.email_verified_at).length}
                        </div>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                        <div className="text-slate-500 text-sm font-medium">Unverified</div>
                        <div className="text-slate-700 text-3xl font-bold mt-2">
                            {users.data.filter((u) => !u.email_verified_at).length}
                        </div>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                        <div className="text-slate-500 text-sm font-medium">Halaman</div>
                        <div className="text-slate-900 text-3xl font-bold mt-2">
                            {users.current_page} / {users.last_page}
                        </div>
                    </div>
                </div>

                {/* Data Table */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-md">
                    <DataTable
                        columns={columns}
                        data={users.data}
                        searchPlaceholder="Cari nama atau email..."
                        filters={filters}
                        roles={roles}
                    />

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200">
                        <div className="text-sm text-slate-600">
                            Showing {(users.current_page - 1) * users.per_page + 1} to{' '}
                            {Math.min(users.current_page * users.per_page, users.total)} of{' '}
                            {users.total} results
                        </div>
                        <div className="flex items-center gap-2">
                            {users.current_page > 1 && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    asChild
                                    className="bg-slate-900 hover:bg-slate-800 text-white border-slate-700"
                                >
                                    <Link
                                        href={`/admin/users?page=${users.current_page - 1}${filters.search ? `&search=${filters.search}` : ''}${filters.role !== 'all' ? `&role=${filters.role}` : ''}${filters.status !== 'all' ? `&status=${filters.status}` : ''}`}
                                    >
                                        Previous
                                    </Link>
                                </Button>
                            )}
                            
                            <span className="text-sm text-slate-600">
                                Page {users.current_page} of {users.last_page}
                            </span>
                            
                            {users.current_page < users.last_page && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    asChild
                                    className="bg-slate-900 hover:bg-slate-800 text-white border-slate-700"
                                >
                                    <Link
                                        href={`/admin/users?page=${users.current_page + 1}${filters.search ? `&search=${filters.search}` : ''}${filters.role !== 'all' ? `&role=${filters.role}` : ''}${filters.status !== 'all' ? `&status=${filters.status}` : ''}`}
                                    >
                                        Next
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
