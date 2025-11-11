import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowUpDown, CheckCircle, Eye, MoreHorizontal, Pencil, Trash2, XCircle } from 'lucide-react';

export type User = {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    roles: { name: string }[];
    created_at: string;
};

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="hover:bg-slate-100 text-slate-700 font-semibold"
                >
                    Nama
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const user = row.original;
            return (
                <div className="flex flex-col">
                    <span className="font-medium text-slate-900">{user.name}</span>
                    <span className="text-sm text-slate-500">{user.email}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'roles',
        header: 'Role',
        cell: ({ row }) => {
            const roles = row.original.roles;
            return (
                <div className="flex flex-wrap gap-1">
                    {roles.map((role) => (
                        <Badge
                            key={role.name}
                            variant="outline"
                            className="bg-slate-100 text-slate-700 border-slate-300"
                        >
                            {role.name}
                        </Badge>
                    ))}
                </div>
            );
        },
    },
    {
        accessorKey: 'email_verified_at',
        header: 'Status',
        cell: ({ row }) => {
            const verified = row.original.email_verified_at;
            return (
                <Badge
                    variant={verified ? 'default' : 'secondary'}
                    className={
                        verified
                            ? 'bg-green-100 text-green-700 border-green-300'
                            : 'bg-slate-100 text-slate-600 border-slate-300'
                    }
                >
                    {verified ? (
                        <CheckCircle className="mr-1 h-3 w-3" />
                    ) : (
                        <XCircle className="mr-1 h-3 w-3" />
                    )}
                    {verified ? 'Verified' : 'Unverified'}
                </Badge>
            );
        },
    },
    {
        accessorKey: 'created_at',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="hover:bg-slate-100 text-slate-700 font-semibold"
                >
                    Tanggal Daftar
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <span className="text-slate-700">
                    {format(new Date(row.original.created_at), 'dd MMM yyyy')}
                </span>
            );
        },
    },
    {
        id: 'actions',
        header: 'Aksi',
        cell: ({ row }) => {
            const user = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-100">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white border-slate-200">
                        <DropdownMenuLabel className="text-slate-700">Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-slate-200" />
                        <DropdownMenuItem asChild className="hover:bg-slate-100">
                            <Link
                                href={`/admin/users/${user.id}`}
                                className="flex items-center cursor-pointer"
                            >
                                <Eye className="mr-2 h-4 w-4" />
                                Lihat Detail
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="hover:bg-slate-100">
                            <Link
                                href={`/admin/users/${user.id}/edit`}
                                className="flex items-center cursor-pointer"
                            >
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                            </Link>
                        </DropdownMenuItem>
                        {!user.email_verified_at ? (
                            <DropdownMenuItem
                                className="hover:bg-slate-100 cursor-pointer"
                                onSelect={() => {
                                    router.post(`/admin/users/${user.id}/verify`, {}, {
                                        preserveScroll: true,
                                        onSuccess: () => {
                                            router.reload();
                                        }
                                    });
                                }}
                            >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Verifikasi Email
                            </DropdownMenuItem>
                        ) : (
                            <DropdownMenuItem
                                className="hover:bg-slate-100 cursor-pointer"
                                onSelect={() => {
                                    router.post(`/admin/users/${user.id}/unverify`, {}, {
                                        preserveScroll: true,
                                        onSuccess: () => {
                                            router.reload();
                                        }
                                    });
                                }}
                            >
                                <XCircle className="mr-2 h-4 w-4" />
                                Unverify Email
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator className="bg-slate-200" />
                        <DropdownMenuItem
                            className="hover:bg-red-50 text-red-600 cursor-pointer"
                            onSelect={() => {
                                if (confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
                                    router.delete(`/admin/users/${user.id}`, {
                                        preserveScroll: true,
                                    });
                                }
                            }}
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Hapus
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
