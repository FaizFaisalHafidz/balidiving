<?php

namespace App\Exports;

use App\Models\Donasi;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class DonationsExport implements FromCollection, WithHeadings, WithMapping, WithStyles, WithTitle
{
    protected $filters;

    public function __construct($filters)
    {
        $this->filters = $filters;
    }

    public function collection()
    {
        $query = Donasi::with(['user', 'kampanye']);

        // Apply filters
        if (!empty($this->filters['date_from'])) {
            $query->whereDate('created_at', '>=', $this->filters['date_from']);
        }

        if (!empty($this->filters['date_to'])) {
            $query->whereDate('created_at', '<=', $this->filters['date_to']);
        }

        if (!empty($this->filters['status']) && $this->filters['status'] !== 'all') {
            $query->where('status', $this->filters['status']);
        }

        if (!empty($this->filters['campaign_id'])) {
            $query->where('kampanye_id', $this->filters['campaign_id']);
        }

        if (!empty($this->filters['search'])) {
            $query->where(function ($q) {
                $q->where('nama_donatur', 'like', '%' . $this->filters['search'] . '%')
                  ->orWhere('email_donatur', 'like', '%' . $this->filters['search'] . '%')
                  ->orWhere('order_id', 'like', '%' . $this->filters['search'] . '%');
            });
        }

        return $query->orderBy('created_at', 'desc')->get();
    }

    public function headings(): array
    {
        return [
            'ID',
            'Order ID',
            'Nama Donatur',
            'Email',
            'Kampanye',
            'Jumlah (IDR)',
            'Status',
            'Anonymous',
            'Metode Pembayaran',
            'Pesan',
            'Tanggal Donasi',
        ];
    }

    public function map($donation): array
    {
        return [
            $donation->id,
            $donation->order_id ?? '-',
            $donation->is_anonim ? 'Anonymous' : ($donation->nama_donatur ?? $donation->user->name ?? 'N/A'),
            $donation->is_anonim ? 'Anonymous' : ($donation->email_donatur ?? $donation->user->email ?? 'N/A'),
            $donation->kampanye->judul ?? 'N/A',
            number_format($donation->jumlah, 0, ',', '.'),
            ucfirst($donation->status),
            $donation->is_anonim ? 'Ya' : 'Tidak',
            $donation->metode_pembayaran ?? 'N/A',
            $donation->pesan ?? $donation->pesan_dukungan ?? '-',
            $donation->created_at->format('d/m/Y H:i'),
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            1 => ['font' => ['bold' => true]],
        ];
    }

    public function title(): string
    {
        return 'Laporan Donasi';
    }
}
