import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { router } from '@inertiajs/react';
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    searchKey?: string;
    searchPlaceholder?: string;
    filters?: {
        search?: string;
        role?: string;
        status?: string;
    };
    roles?: { id: number; name: string }[];
}

export function DataTable<TData, TValue>({
    columns,
    data,
    searchKey = 'name',
    searchPlaceholder = 'Cari...',
    filters,
    roles = [],
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [searchValue, setSearchValue] = useState(filters?.search || '');
    const [roleFilter, setRoleFilter] = useState(filters?.role || 'all');
    const [statusFilter, setStatusFilter] = useState(filters?.status || 'all');

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    });

    const handleSearch = (value: string) => {
        setSearchValue(value);
        router.get(
            '/admin/users',
            {
                search: value,
                role: roleFilter,
                status: statusFilter,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleRoleFilter = (value: string) => {
        setRoleFilter(value);
        router.get(
            '/admin/users',
            {
                search: searchValue,
                role: value,
                status: statusFilter,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleStatusFilter = (value: string) => {
        setStatusFilter(value);
        router.get(
            '/admin/users',
            {
                search: searchValue,
                role: roleFilter,
                status: value,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <Input
                    placeholder={searchPlaceholder}
                    value={searchValue}
                    onChange={(event) => handleSearch(event.target.value)}
                    className="max-w-sm bg-white border-slate-300 text-slate-900 placeholder:text-slate-400"
                />
                <Select value={roleFilter} onValueChange={handleRoleFilter}>
                    <SelectTrigger className="w-[180px] bg-white border-slate-300 text-slate-900">
                        <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-200">
                        <SelectItem value="all" className="text-slate-900 hover:bg-slate-100">
                            Semua Role
                        </SelectItem>
                        {roles.map((role) => (
                            <SelectItem
                                key={role.id}
                                value={role.name}
                                className="text-slate-900 hover:bg-slate-100"
                            >
                                {role.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={handleStatusFilter}>
                    <SelectTrigger className="w-[180px] bg-white border-slate-300 text-slate-900">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-200">
                        <SelectItem value="all" className="text-slate-900 hover:bg-slate-100">
                            Semua Status
                        </SelectItem>
                        <SelectItem value="verified" className="text-slate-900 hover:bg-slate-100">
                            Verified
                        </SelectItem>
                        <SelectItem value="unverified" className="text-slate-900 hover:bg-slate-100">
                            Unverified
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className="border-slate-200 hover:bg-slate-50"
                            >
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="text-slate-700 font-semibold">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef.header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && 'selected'}
                                    className="border-slate-200 hover:bg-slate-50"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="text-slate-900">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center text-slate-500"
                                >
                                    Tidak ada data.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
