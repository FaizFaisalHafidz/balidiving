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
    protected $startDate;
    protected $endDate;

    public function __construct($startDate, $endDate)
    {
        $this->startDate = $startDate;
        $this->endDate = $endDate;
    }

    public function collection()
    {
        return Donasi::with(['user', 'kampanye'])
            ->whereBetween('created_at', [$this->startDate, $this->endDate])
            ->orderBy('created_at', 'desc')
            ->get();
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
