import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Donation } from "@/types/donation";
import { router } from "@inertiajs/react";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Calendar, Download, Search } from "lucide-react";
import { useState } from "react";
import { columns } from "./columns";

interface Campaign {
  id: number;
  judul: string;
}

interface DonationDataTableProps {
  data: Donation[];
  campaigns: Campaign[];
  filters: {
    search?: string;
    status?: string;
    campaign_id?: number;
    date_from?: string;
    date_to?: string;
  };
}

export function DonationDataTable({
  data,
  campaigns,
  filters,
}: DonationDataTableProps) {
  const [search, setSearch] = useState(filters.search || "");
  const [status, setStatus] = useState(filters.status || "");
  const [campaignId, setCampaignId] = useState(filters.campaign_id?.toString() || "");
  const [dateFrom, setDateFrom] = useState(filters.date_from || "");
  const [dateTo, setDateTo] = useState(filters.date_to || "");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleFilter = () => {
    router.get(
      "/admin/donations",
      {
        search: search || undefined,
        status: status || undefined,
        campaign_id: campaignId || undefined,
        date_from: dateFrom || undefined,
        date_to: dateTo || undefined,
      },
      {
        preserveState: true,
        preserveScroll: true,
      }
    );
  };

  const handleReset = () => {
    setSearch("");
    setStatus("");
    setCampaignId("");
    setDateFrom("");
    setDateTo("");
    router.get("/admin/donations", {}, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleExport = () => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (status) params.append("status", status);
    if (campaignId) params.append("campaign_id", campaignId);
    if (dateFrom) params.append("date_from", dateFrom);
    if (dateTo) params.append("date_to", dateTo);

    window.location.href = `/admin/donations/export/excel?${params.toString()}`;
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Cari kode transaksi, donatur, atau kampanye..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleFilter()}
            className="pl-9 bg-white border-slate-200"
          />
        </div>

        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="bg-white border-slate-200">
            <SelectValue placeholder="Semua Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="paid">Berhasil</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Gagal</SelectItem>
            <SelectItem value="expired">Kadaluarsa</SelectItem>
            <SelectItem value="cancelled">Dibatalkan</SelectItem>
          </SelectContent>
        </Select>

        <Select value={campaignId} onValueChange={setCampaignId}>
          <SelectTrigger className="bg-white border-slate-200">
            <SelectValue placeholder="Semua Kampanye" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Kampanye</SelectItem>
            {campaigns?.map((campaign) => (
              <SelectItem key={campaign.id} value={campaign.id.toString()}>
                {campaign.judul}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Button
            onClick={handleFilter}
            className="flex-1 bg-slate-900 hover:bg-slate-800"
          >
            Filter
          </Button>
          <Button onClick={handleReset} variant="outline">
            Reset
          </Button>
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-slate-500" />
          <Input
            type="date"
            placeholder="Dari Tanggal"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="bg-white border-slate-200"
          />
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-slate-500" />
          <Input
            type="date"
            placeholder="Sampai Tanggal"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="bg-white border-slate-200"
          />
        </div>
        <Button
          onClick={handleExport}
          variant="outline"
          className="border-green-600 text-green-600 hover:bg-green-50"
        >
          <Download className="h-4 w-4 mr-2" />
          Export Excel
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-md border border-slate-200 bg-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-slate-50">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-slate-900 font-semibold">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-slate-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                  Tidak ada data donasi.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
