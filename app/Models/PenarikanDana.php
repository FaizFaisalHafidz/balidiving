<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PenarikanDana extends Model
{
    protected $table = 'penarikan_dana';

    protected $fillable = [
        'user_id',
        'kampanye_id',
        'jumlah_diminta',
        'nama_bank',
        'nomor_rekening',
        'nama_pemilik_rekening',
        'status',
        'catatan',
    ];

    protected $casts = [
        'jumlah_diminta' => 'decimal:2',
    ];

    /**
     * Get the user that requested the withdrawal
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the campaign for this withdrawal
     */
    public function kampanye(): BelongsTo
    {
        return $this->belongsTo(Kampanye::class, 'kampanye_id');
    }

    /**
     * Check if withdrawal is pending
     */
    public function isPending(): bool
    {
        return $this->status === 'pending';
    }

    /**
     * Check if withdrawal is approved
     */
    public function isApproved(): bool
    {
        return in_array($this->status, ['disetujui', 'selesai']);
    }

    /**
     * Check if withdrawal is completed
     */
    public function isCompleted(): bool
    {
        return $this->status === 'selesai';
    }
}