<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProfilFundraiser extends Model
{
    protected $table = 'profil_fundraiser';

    protected $fillable = [
        'user_id',
        'nomor_rekening',
        'nama_bank',
        'nama_pemilik_rekening',
        'status_verifikasi',
    ];

    protected $casts = [
        'status_verifikasi' => 'string',
    ];

    /**
     * Get the user that owns the fundraiser profile
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Check if fundraiser is verified
     */
    public function isVerified(): bool
    {
        return $this->status_verifikasi === 'terverifikasi';
    }
}