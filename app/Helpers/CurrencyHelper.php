<?php

namespace App\Helpers;

class CurrencyHelper
{
    /**
     * Format amount in IDR (Rupiah only - no USD conversion)
     */
    public static function format(float $amount, string $locale = 'id'): array
    {
        return [
            'amount' => $amount,
            'formatted' => 'Rp ' . number_format($amount, 0, ',', '.'),
            'currency' => 'IDR',
            'symbol' => 'Rp',
        ];
    }
    
    /**
     * Amount is always stored in IDR
     */
    public static function toDatabase(float $amount, string $fromLocale = 'id'): float
    {
        return $amount;
    }
}
