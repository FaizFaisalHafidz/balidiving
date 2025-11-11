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
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowUpDown, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';

export type Category = {
    id: number;
    nama: string;
    deskripsi: string | null;
    kampanye_count: number;
    created_at: string;
};

export const columns: ColumnDef<Category>[] = [
    {
        accessorKey: 'nama',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="hover:bg-slate-100 text-slate-700 font-semibold"
                >
                    Nama Kategori
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const category = row.original;
            return (
                <div className="flex flex-col">
                    <span className="font-medium text-slate-900">{category.nama}</span>
                    {category.deskripsi && (
                        <span className="text-sm text-slate-500 line-clamp-1">{category.deskripsi}</span>
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: 'kampanye_count',
        header: 'Jumlah Kampanye',
        cell: ({ row }) => {
            const count = row.original.kampanye_count;
            return (
                <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-300">
                    {count} Kampanye
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
                    Tanggal Dibuat
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
            const category = row.original;

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
                        <DropdownMenuItem
                            className="hover:bg-slate-100 cursor-pointer"
                            asChild
                        >
                            <a href={`/admin/categories/${category.id}/edit`}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                            </a>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-slate-200" />
                        <DropdownMenuItem
                            className="hover:bg-red-50 text-red-600 cursor-pointer"
                            onClick={() => {
                                if (category.kampanye_count > 0) {
                                    alert('Tidak dapat menghapus kategori yang masih memiliki kampanye');
                                    return;
                                }
                                if (confirm(`Apakah Anda yakin ingin menghapus kategori "${category.nama}"?`)) {
                                    // Use Inertia router
                                    const { router } = require('@inertiajs/react');
                                    router.delete(`/admin/categories/${category.id}`, {
                                        preserveScroll: true,
                                    });
                                }
                            }}
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            {category.kampanye_count > 0 ? 'Tidak dapat dihapus' : 'Hapus'}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
