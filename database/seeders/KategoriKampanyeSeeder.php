<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\KategoriKampanye;

class KategoriKampanyeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'nama' => 'Konservasi Laut',
                'deskripsi' => 'Kampanye untuk melindungi dan melestarikan ekosistem laut dan kehidupan laut'
            ],
            [
                'nama' => 'Pembersihan Pantai',
                'deskripsi' => 'Kampanye pembersihan pantai dari sampah plastik dan polusi laut'
            ],
            [
                'nama' => 'Terumbu Karang',
                'deskripsi' => 'Kampanye restorasi dan perlindungan terumbu karang'
            ],
            [
                'nama' => 'Edukasi Lingkungan',
                'deskripsi' => 'Kampanye edukasi dan kesadaran lingkungan kepada masyarakat'
            ],
            [
                'nama' => 'Satwa Laut',
                'deskripsi' => 'Kampanye perlindungan satwa laut yang terancam punah'
            ],
            [
                'nama' => 'Polusi Laut',
                'deskripsi' => 'Kampanye pencegahan dan penanggulangan polusi laut'
            ],
        ];

        foreach ($categories as $category) {
            KategoriKampanye::create($category);
        }
    }
}
