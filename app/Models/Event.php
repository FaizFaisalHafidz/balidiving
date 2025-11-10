<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Cviebrock\EloquentSluggable\Sluggable;

class Event extends Model
{
    use HasFactory, Sluggable;

    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'description',
        'image',
        'location',
        'location_url',
        'start_date',
        'end_date',
        'max_participants',
        'registered_participants',
        'status',
        'is_featured',
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'is_featured' => 'boolean',
    ];

    /**
     * Return the sluggable configuration array for this model.
     */
    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'title'
            ]
        ];
    }

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    /**
     * Get the user that created the event
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Check if event is full
     */
    public function isFull(): bool
    {
        if (!$this->max_participants) {
            return false;
        }
        return $this->registered_participants >= $this->max_participants;
    }

    /**
     * Get available slots
     */
    public function availableSlots(): ?int
    {
        if (!$this->max_participants) {
            return null;
        }
        return max(0, $this->max_participants - $this->registered_participants);
    }

    /**
     * Check if event is upcoming
     */
    public function isUpcoming(): bool
    {
        return $this->status === 'upcoming' && $this->start_date->isFuture();
    }

    /**
     * Check if event is ongoing
     */
    public function isOngoing(): bool
    {
        return $this->status === 'ongoing' || 
               ($this->start_date->isPast() && $this->end_date->isFuture());
    }

    /**
     * Check if event is completed
     */
    public function isCompleted(): bool
    {
        return $this->status === 'completed' || $this->end_date->isPast();
    }
}