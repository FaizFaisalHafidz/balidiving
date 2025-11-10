<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProfilPengguna extends Model
{
    protected $table = 'profil_pengguna';

    protected $fillable = [
        'user_id',
        'nomor_telepon',
        'alamat',
        'foto_profil',
    ];

    /**
     * Get the user that owns the profile
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
