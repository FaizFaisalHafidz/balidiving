import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Donation } from "@/types/donation";
import { Link } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

export const columns: ColumnDef<Donation>[] = [
	{
		accessorKey: 'order_id',
		header: 'Order ID',
		cell: ({ row }) => (
			<span className="font-mono text-xs">{row.original.order_id ?? row.original.id_transaksi ?? '-'}</span>
		),
	},
	{
		accessorKey: 'user.name',
		header: 'Donatur',
		cell: ({ row }) => {
			const isAnonim = row.original.is_anonim;
			const userName = row.original.nama_donatur || row.original.user?.name || 'Guest';

			return (
				<div className="flex items-center gap-2">
					<span className="font-medium">{isAnonim ? 'Anonim' : userName}</span>
					{isAnonim && (
						<Badge variant="secondary" className="text-xs">
							Anonim
						</Badge>
					)}
				</div>
			);
		},
	},
	{
		accessorKey: 'kampanye.judul',
		header: 'Kampanye',
		cell: ({ row }) => <span className="text-slate-600">{row.original.kampanye?.judul || '-'}</span>,
	},
	{
		accessorKey: 'jumlah',
		header: 'Jumlah Donasi',
		cell: ({ row }) => (
			<span className="font-semibold text-slate-900">Rp {(row.original.jumlah || 0).toLocaleString('id-ID')}</span>
		),
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => {
			const status = row.original.status;
			const variants: Record<string, { label: string; className: string }> = {
				berhasil: { label: 'Berhasil', className: 'bg-green-50 text-green-700 border-green-200' },
				pending: { label: 'Pending', className: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
				gagal: { label: 'Gagal', className: 'bg-red-50 text-red-700 border-red-200' },
			};

			const variant = variants[status] || variants.pending;

			return (
				<Badge variant="outline" className={variant.className}>
					{variant.label}
				</Badge>
			);
		},
	},
	{
		accessorKey: 'metode_pembayaran',
		header: 'Metode',
		cell: ({ row }) => <span className="text-xs text-slate-600">{row.original.metode_pembayaran || '-'}</span>,
	},
	{
		accessorKey: 'created_at',
		header: 'Tanggal',
		cell: ({ row }) => {
			const date = new Date(row.original.created_at);
			return (
				<span className="text-sm text-slate-600">
					{date.toLocaleDateString('id-ID', {
						day: 'numeric',
						month: 'short',
						year: 'numeric',
						hour: '2-digit',
						minute: '2-digit',
					})}
				</span>
			);
		},
	},
	{
		id: 'actions',
		header: 'Aksi',
		cell: ({ row }) => (
			<Link href={`/admin/donations/${row.original.id}`}>
				<Button variant="ghost" size="sm">
					<Eye className="h-4 w-4" />
				</Button>
			</Link>
		),
	},
];
