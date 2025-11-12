<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class UsersExport implements FromCollection, WithHeadings, WithMapping, WithStyles, WithTitle
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
        return User::with('roles')
            ->withSum(['donasi' => function ($query) {
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
            'Nama',
            'Email',
            'Role',
            'Total Donasi (IDR)',
            'Jumlah Donasi',
            'Email Verified',
            'Tanggal Bergabung',
        ];
    }

    public function map($user): array
    {
        $roles = $user->roles->pluck('name')->implode(', ');
        
        return [
            $user->id,
            $user->name,
            $user->email,
            $roles ?: 'No Role',
            number_format($user->donasi_sum_jumlah ?? 0, 0, ',', '.'),
            $user->donasi_count ?? 0,
            $user->email_verified_at ? 'Ya' : 'Tidak',
            $user->created_at->format('d/m/Y H:i'),
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
        return 'Laporan Pengguna';
    }
}
