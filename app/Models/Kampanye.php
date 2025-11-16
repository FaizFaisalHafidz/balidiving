<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Cviebrock\EloquentSluggable\Sluggable;

class Kampanye extends Model
{
    use Sluggable;
    
    protected $table = 'kampanye';

    protected $fillable = [
        'user_id',
        'kategori_id',
        'judul',
        'slug',
        'deskripsi',
        'target_dana',
        'dana_terkumpul',
        'tanggal_mulai',
        'tanggal_berakhir',
        'gambar_utama',
        'status',
    ];

    protected $casts = [
        'target_dana' => 'decimal:2',
        'dana_terkumpul' => 'decimal:2',
        'tanggal_mulai' => 'date',
        'tanggal_berakhir' => 'date',
    ];

    /**
     * Get the campaign image URL
     */
    public function getGambarUtamaUrlAttribute(): string
    {
        if (!$this->gambar_utama) {
            return asset('images/default-campaign.jpg');
        }

        // Jika sudah berupa URL lengkap, return as is
        if (filter_var($this->gambar_utama, FILTER_VALIDATE_URL)) {
            return $this->gambar_utama;
        }

        // Jika path dimulai dengan 'campaigns/', gunakan storage
        if (str_starts_with($this->gambar_utama, 'campaigns/')) {
            return asset('storage/' . $this->gambar_utama);
        }

        // Fallback: tambahkan storage/campaigns/
        return asset('storage/campaigns/' . $this->gambar_utama);
    }

    /**
     * Return the sluggable configuration array for this model.
     */
    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'judul'
            ]
        ];
    }

    /**
     * Get the user that owns the campaign
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the category of the campaign
     */
    public function kategori(): BelongsTo
    {
        return $this->belongsTo(KategoriKampanye::class, 'kategori_id');
    }

    /**
     * Get the donations for this campaign
     */
    public function donasi(): HasMany
    {
        return $this->hasMany(Donasi::class, 'kampanye_id');
    }

    /**
     * Get successful donations only
     */
    public function successfulDonasi(): HasMany
    {
        return $this->donasi()->where('status', 'berhasil');
    }

    /**
     * Get the withdrawals for this campaign
     */
    public function penarikanDana(): HasMany
    {
        return $this->hasMany(PenarikanDana::class, 'kampanye_id');
    }

    /**
     * Get the comments for this campaign
     */
    public function komentar(): HasMany
    {
        return $this->hasMany(Komentar::class, 'kampanye_id');
    }

    /**
     * Calculate percentage of target reached
     */
    public function getPercentageAttribute(): float
    {
        if ($this->target_dana == 0) return 0;
        return min(100, ($this->dana_terkumpul / $this->target_dana) * 100);
    }

    /**
     * Check if campaign is active
     */
    public function isActive(): bool
    {
        return $this->status === 'aktif' 
            && $this->tanggal_berakhir >= now()->toDate();
    }

    /**
     * Check if campaign target is reached
     */
    public function isTargetReached(): bool
    {
        return $this->dana_terkumpul >= $this->target_dana;
    }

    /**
     * Get days remaining
     */
    public function getDaysRemainingAttribute(): int
    {
        if ($this->tanggal_berakhir < now()->toDate()) {
            return 0;
        }
        return now()->diffInDays($this->tanggal_berakhir);
    }
}