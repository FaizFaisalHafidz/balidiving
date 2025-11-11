<?php

namespace App\Exports;

use App\Models\Donasi;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class DonationsExport implements FromQuery, WithHeadings, WithMapping, WithStyles
{
    use Exportable;

    protected $filters;

    public function __construct($filters = [])
    {
        $this->filters = $filters;
    }

    public function query()
    {
        $query = Donasi::with(['user', 'kampanye'])
            ->orderBy('created_at', 'desc');

        // Apply filters
        if (!empty($this->filters['search'])) {
            $search = $this->filters['search'];
            $query->where(function ($q) use ($search) {
                $q->whereHas('user', function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%");
                })
                ->orWhereHas('kampanye', function ($query) use ($search) {
                    $query->where('judul', 'like', "%{$search}%");
                })
                ->orWhere('order_id', 'like', "%{$search}%")
                ->orWhere('id_transaksi', 'like', "%{$search}%");
            });
        }

        if (!empty($this->filters['status']) && $this->filters['status'] !== 'all') {
            $query->where('status', $this->filters['status']);
        }

        if (!empty($this->filters['campaign_id']) && $this->filters['campaign_id'] !== 'all') {
            $query->where('kampanye_id', $this->filters['campaign_id']);
        }

        if (!empty($this->filters['date_from'])) {
            $query->whereDate('created_at', '>=', $this->filters['date_from']);
        }

        if (!empty($this->filters['date_to'])) {
            $query->whereDate('created_at', '<=', $this->filters['date_to']);
        }

        return $query;
    }

    public function headings(): array
    {
        return [
            'Order ID',
            'ID Transaksi',
            'Donatur',
            'Email',
            'Kampanye',
            'Jumlah Donasi',
            'Status',
            'Metode Pembayaran',
            'Pesan',
            'Anonim',
            'Tanggal Donasi',
        ];
    }

    public function map($donation): array
    {
        return [
            $donation->order_id ?? '-',
            $donation->id_transaksi ?? '-',
            $donation->is_anonim ? 'Anonim' : ($donation->nama_donatur ?? $donation->user?->name ?? 'Guest'),
            $donation->email_donatur ?? $donation->user?->email ?? '-',
            $donation->kampanye?->judul ?? '-',
            'Rp ' . number_format($donation->jumlah, 0, ',', '.'),
            $this->getStatusLabel($donation->status),
            $donation->metode_pembayaran ?? '-',
            $donation->pesan ?? $donation->pesan_dukungan ?? '-',
            $donation->is_anonim ? 'Ya' : 'Tidak',
            $donation->created_at->format('d/m/Y H:i'),
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            1 => ['font' => ['bold' => true]],
        ];
    }

    private function getStatusLabel($status)
    {
        return match($status) {
            'pending' => 'Pending',
            'berhasil' => 'Berhasil',
            'gagal' => 'Gagal',
            default => ucfirst($status),
        };
    }
}
