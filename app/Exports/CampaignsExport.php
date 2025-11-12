<?php

namespace App\Exports;

use App\Models\Kampanye;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class CampaignsExport implements FromCollection, WithHeadings, WithMapping, WithStyles, WithTitle
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
        return Kampanye::withSum(['donasi' => function ($query) {
                $query->where('status', 'berhasil');
            }], 'jumlah')
            ->withCount(['donasi' => function ($query) {
                $query->where('status', 'berhasil');
            }])
            ->whereBetween('created_at', [$this->startDate, $this->endDate])
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function headings(): array
    {
        return [
            'ID',
            'Judul Kampanye',
            'Slug',
            'Status',
            'Target (IDR)',
            'Terkumpul (IDR)',
            'Persentase',
            'Jumlah Donatur',
            'Tanggal Mulai',
            'Tanggal Berakhir',
            'Dibuat Pada',
        ];
    }

    public function map($campaign): array
    {
        $collectedAmount = $campaign->donasi_sum_jumlah ?? 0;
        $percentage = $campaign->target_dana > 0 
            ? round(($collectedAmount / $campaign->target_dana) * 100, 2) 
            : 0;

        return [
            $campaign->id,
            $campaign->judul,
            $campaign->slug,
            ucfirst($campaign->status),
            number_format($campaign->target_dana, 0, ',', '.'),
            number_format($collectedAmount, 0, ',', '.'),
            $percentage . '%',
            $campaign->donasi_count ?? 0,
            $campaign->tanggal_mulai ? $campaign->tanggal_mulai->format('d/m/Y') : '-',
            $campaign->tanggal_berakhir ? $campaign->tanggal_berakhir->format('d/m/Y') : '-',
            $campaign->created_at->format('d/m/Y H:i'),
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
        return 'Laporan Kampanye';
    }
}
