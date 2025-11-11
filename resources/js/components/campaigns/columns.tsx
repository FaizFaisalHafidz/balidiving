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
import {
    ArrowUpDown,
    CheckCircle,
    Eye,
    MoreHorizontal,
    Pencil,
    PlayCircle,
    StopCircle,
    Trash2,
    XCircle,
} from 'lucide-react';

export type Campaign = {
    id: number;
    judul: string;
    slug: string;
    target_dana: number;
    dana_terkumpul: number;
    status: 'draft' | 'aktif' | 'selesai';
    tanggal_mulai: string;
    tanggal_berakhir: string;
    kategori: {
        id: number;
        nama: string;
    };
    user: {
        id: number;
        name: string;
    };
    percentage: number;
    created_at: string;
};

export const columns: ColumnDef<Campaign>[] = [
    {
        accessorKey: 'judul',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="hover:bg-slate-100 text-slate-700 font-semibold"
                >
                    Judul Kampanye
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const campaign = row.original;
            const percentage = campaign.percentage || 0;
            return (
                <div className="flex flex-col">
                    <span className="font-medium text-slate-900">{campaign.judul}</span>
                    <span className="text-sm text-slate-500">{campaign.kategori.nama}</span>
                    <div className="mt-1">
                        <div className="w-32 bg-slate-200 rounded-full h-1.5">
                            <div
                                className="bg-blue-600 h-1.5 rounded-full"
                                style={{ width: `${Math.min(percentage, 100)}%` }}
                            />
                        </div>
                        <span className="text-xs text-slate-600">{percentage.toFixed(1)}% tercapai</span>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: 'target_dana',
        header: 'Target & Terkumpul',
        cell: ({ row }) => {
            const campaign = row.original;
            return (
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-900">
                        Target: Rp {campaign.target_dana.toLocaleString('id-ID')}
                    </span>
                    <span className="text-sm text-green-600">
                        Terkumpul: Rp {campaign.dana_terkumpul.toLocaleString('id-ID')}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.original.status;
            const statusConfig = {
                draft: {
                    label: 'Draft',
                    className: 'bg-slate-100 text-slate-700 border-slate-300',
                    icon: <XCircle className="mr-1 h-3 w-3" />,
                },
                aktif: {
                    label: 'Aktif',
                    className: 'bg-green-100 text-green-700 border-green-300',
                    icon: <CheckCircle className="mr-1 h-3 w-3" />,
                },
                selesai: {
                    label: 'Selesai',
                    className: 'bg-blue-100 text-blue-700 border-blue-300',
                    icon: <StopCircle className="mr-1 h-3 w-3" />,
                },
            };

            const config = statusConfig[status] || statusConfig.draft;

            return (
                <Badge variant="outline" className={config.className}>
                    {config.icon}
                    {config.label}
                </Badge>
            );
        },
    },
    {
        accessorKey: 'tanggal_berakhir',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="hover:bg-slate-100 text-slate-700 font-semibold"
                >
                    Berakhir
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <span className="text-slate-700">
                    {format(new Date(row.original.tanggal_berakhir), 'dd MMM yyyy')}
                </span>
            );
        },
    },
    {
        id: 'actions',
        header: 'Aksi',
        cell: ({ row }) => {
            const campaign = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-100">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white border-slate-200">
                        <DropdownMenuLabel className="text-slate-700">Aksi</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-slate-200" />
                        <DropdownMenuItem asChild className="hover:bg-slate-100">
                            <Link
                                href={`/admin/campaigns/${campaign.id}`}
                                className="flex items-center cursor-pointer"
                            >
                                <Eye className="mr-2 h-4 w-4" />
                                Lihat Detail
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="hover:bg-slate-100">
                            <Link
                                href={`/admin/campaigns/${campaign.id}/edit`}
                                className="flex items-center cursor-pointer"
                            >
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-slate-200" />
                        {campaign.status === 'draft' && (
                            <DropdownMenuItem
                                className="hover:bg-slate-100 cursor-pointer"
                                onSelect={() => {
                                    router.post(
                                        `/admin/campaigns/${campaign.id}/publish`,
                                        {},
                                        {
                                            preserveScroll: true,
                                            onSuccess: () => {
                                                router.reload();
                                            },
                                        }
                                    );
                                }}
                            >
                                <PlayCircle className="mr-2 h-4 w-4 text-green-600" />
                                Publikasikan
                            </DropdownMenuItem>
                        )}
                        {campaign.status === 'aktif' && (
                            <>
                                <DropdownMenuItem
                                    className="hover:bg-slate-100 cursor-pointer"
                                    onSelect={() => {
                                        router.post(
                                            `/admin/campaigns/${campaign.id}/unpublish`,
                                            {},
                                            {
                                                preserveScroll: true,
                                                onSuccess: () => {
                                                    router.reload();
                                                },
                                            }
                                        );
                                    }}
                                >
                                    <XCircle className="mr-2 h-4 w-4 text-orange-600" />
                                    Unpublish
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="hover:bg-slate-100 cursor-pointer"
                                    onSelect={() => {
                                        router.post(
                                            `/admin/campaigns/${campaign.id}/complete`,
                                            {},
                                            {
                                                preserveScroll: true,
                                                onSuccess: () => {
                                                    router.reload();
                                                },
                                            }
                                        );
                                    }}
                                >
                                    <CheckCircle className="mr-2 h-4 w-4 text-blue-600" />
                                    Tandai Selesai
                                </DropdownMenuItem>
                            </>
                        )}
                        <DropdownMenuSeparator className="bg-slate-200" />
                        <DropdownMenuItem
                            className="hover:bg-red-50 text-red-600 cursor-pointer"
                            onSelect={() => {
                                if (
                                    confirm(
                                        'Apakah Anda yakin ingin menghapus kampanye ini? Data donasi akan tetap tersimpan.'
                                    )
                                ) {
                                    router.delete(`/admin/campaigns/${campaign.id}`, {
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
