<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    /**
     * Get the user's profile
     */
    public function profilPengguna(): HasOne
    {
        return $this->hasOne(ProfilPengguna::class);
    }

    /**
     * Get the user's fundraiser profile
     */
    public function profilFundraiser(): HasOne
    {
        return $this->hasOne(ProfilFundraiser::class);
    }

    /**
     * Get the user's campaigns
     */
    public function kampanye(): HasMany
    {
        return $this->hasMany(Kampanye::class);
    }

    /**
     * Get the user's donations
     */
    public function donasi(): HasMany
    {
        return $this->hasMany(Donasi::class);
    }

    /**
     * Get the user's withdrawal requests
     */
    public function penarikanDana(): HasMany
    {
        return $this->hasMany(PenarikanDana::class);
    }

    /**
     * Get the user's comments
     */
    public function komentar(): HasMany
    {
        return $this->hasMany(Komentar::class);
    }

    /**
     * Get the user's events
     */
    public function events(): HasMany
    {
        return $this->hasMany(Event::class);
    }

    /**
     * Check if user is verified fundraiser
     */
    public function isVerifiedFundraiser(): bool
    {
        return $this->profilFundraiser && $this->profilFundraiser->isVerified();
    }

    /**
     * Check if user has specific role
     */
    public function isAdmin(): bool
    {
        return $this->hasRole(['super-admin', 'admin']);
    }

    /**
     * Check if user is fundraiser
     */
    public function isFundraiser(): bool
    {
        return $this->hasRole('fundraiser');
    }

    /**
     * Check if user is donor
     */
    public function isDonor(): bool
    {
        return $this->hasRole('donor');
    }
}
