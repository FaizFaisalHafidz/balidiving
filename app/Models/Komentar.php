<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Komentar extends Model
{
    protected $table = 'komentar';

    protected $fillable = [
        'kampanye_id',
        'user_id',
        'nama',
        'komentar',
        'status',
    ];

    protected $casts = [
        'status' => 'string',
    ];

    /**
     * Get the campaign for this comment
     */
    public function kampanye(): BelongsTo
    {
        return $this->belongsTo(Kampanye::class, 'kampanye_id');
    }

    /**
     * Get the user who made the comment (optional for anonymous users)
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Check if comment is visible (approved)
     */
    public function isVisible(): bool
    {
        return $this->status === 'terlihat';
    }

    /**
     * Check if comment is hidden
     */
    public function isHidden(): bool
    {
        return $this->status === 'tersembunyi';
    }

    /**
     * Get the display name for the commenter
     */
    public function getDisplayNameAttribute(): string
    {
        // Use provided name if available, otherwise use user's name
        return $this->nama ?? ($this->user ? $this->user->name : 'Anonymous');
    }
}