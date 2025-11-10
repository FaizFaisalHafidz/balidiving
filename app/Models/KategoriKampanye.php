<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class KategoriKampanye extends Model
{
    protected $table = 'kategori_kampanye';

    protected $fillable = [
        'nama',
        'deskripsi',
    ];

    /**
     * Get the campaigns for this category
     */
    public function kampanye(): HasMany
    {
        return $this->hasMany(Kampanye::class, 'kategori_id');
    }

    /**
     * Get active campaigns for this category
     */
    public function activeKampanye(): HasMany
    {
        return $this->kampanye()->where('status', 'aktif');
    }
}