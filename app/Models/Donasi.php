<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Donasi extends Model
{
    protected $table = 'donasi';

    protected $fillable = [
        'user_id',
        'kampanye_id',
        'order_id',
        'snap_token',
        'jumlah',
        'metode_pembayaran',
        'id_transaksi',
        'status',
        'nama_donatur',
        'email_donatur',
        'no_telepon_donatur',
        'pesan',
        'pesan_dukungan',
        'is_anonim',
    ];

    protected $casts = [
        'jumlah' => 'decimal:2',
    ];

    /**
     * Get the user that made the donation
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the campaign that received the donation
     */
    public function kampanye(): BelongsTo
    {
        return $this->belongsTo(Kampanye::class, 'kampanye_id');
    }

    /**
     * Check if donation is successful
     */
    public function isSuccessful(): bool
    {
        return $this->status === 'berhasil';
    }

    /**
     * Get donor name (from user or manual input)
     */
    public function getDonorNameAttribute(): string
    {
        return $this->nama_donatur ?: $this->user?->name ?: 'Anonymous';
    }
}