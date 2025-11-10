# Sistem Donasi dengan Midtrans Snap

## Overview
Sistem donasi terintegrasi dengan Midtrans Snap Payment Gateway yang mendukung:
- Multi currency (IDR & USD)
- Real-time currency conversion
- Multiple payment methods (Credit Card, Bank Transfer, E-wallet)
- Secure payment processing
- Anonymous donation option

## Setup

### 1. Install Midtrans SDK
```bash
composer require midtrans/midtrans-php
```

### 2. Environment Variables
Tambahkan ke `.env`:
```env
MIDTRANS_SERVER_KEY=SB-Mid-server-y0YY6CdSFFthyWO_UQPiIqUb
MIDTRANS_CLIENT_KEY=SB-Mid-client-pZG6dKnrMUtDWmJN
MIDTRANS_IS_PRODUCTION=false
MIDTRANS_IS_SANITIZED=true
MIDTRANS_IS_3DS=true
```

### 3. Run Migration
```bash
php artisan migrate
```

## Features

### Currency Toggle
- Switch between IDR (Rupiah) and USD (Dollar)
- Real-time conversion display
- Exchange rate: 1 USD = Rp 15,800 (configurable)

### Payment Flow
1. User clicks "Donate Now" on campaign page
2. Redirected to donation form (`/campaigns/{slug}/donate`)
3. Fill donation details:
   - Amount (with quick select buttons)
   - Personal information
   - Optional message
   - Anonymous option
4. Submit form → Midtrans Snap popup opens
5. Complete payment through Midtrans
6. Redirected to success page

### Payment Methods Supported
- Credit/Debit Card (Visa, Mastercard, JCB, Amex)
- Bank Transfer (BCA, BNI, BRI, Permata, Other Banks)
- E-Wallet (GoPay, ShopeePay)
- QRIS

## Routes

### Public Routes
- `GET /campaigns/{slug}/donate` - Donation form (requires auth)
- `POST /campaigns/{slug}/donate` - Process donation (requires auth)
- `GET /donations/success` - Success page (requires auth)

### Webhook
- `POST /donations/notification` - Midtrans notification callback (no auth)

## Files Created

### Controllers
- `app/Http/Controllers/DonationController.php`

### Models
- Updated: `app/Models/Donasi.php`

### Views
- `resources/js/pages/donations/create.tsx` - Donation form
- `resources/js/pages/donations/success.tsx` - Success page

### Config
- `config/midtrans.php` - Midtrans configuration

### Database
- Migration: `2025_11_10_094437_add_midtrans_fields_to_donasi_table.php`
  - Added: order_id, snap_token, no_telepon_donatur, pesan, is_anonim

## Testing

### Test Credentials (Sandbox)
Credit Card:
- Card Number: 4811 1111 1111 1114
- CVV: 123
- Exp: 01/25

GoPay:
- Will show QR code or deeplink

Bank Transfer:
- Will show virtual account number

### Test Flow
1. Login as donor
2. Browse campaign and click "Donate Now"
3. Fill form with test amount (min Rp 10,000 or $1)
4. Click "Lanjut ke Pembayaran"
5. Choose payment method in Midtrans popup
6. Complete test payment
7. Check success page

## Webhook Setup for Production

For production, you need to configure webhook URL in Midtrans Dashboard:
1. Go to Settings → Configuration
2. Set Payment Notification URL: `https://yourdomain.com/donations/notification`
3. Enable HTTP(S) notification

## Currency Conversion

Current implementation uses hardcoded exchange rate (1 USD = Rp 15,800).

For production, integrate with real exchange rate API:
```php
private function getExchangeRate(): float
{
    // Example with exchangerate-api.com
    $response = Http::get('https://api.exchangerate-api.com/v4/latest/USD');
    return $response->json()['rates']['IDR'];
}
```

## Security

- ✅ CSRF protection
- ✅ Authentication required for donation
- ✅ Server-side validation
- ✅ Midtrans 3DS enabled
- ✅ Transaction verification via notification handler

## Troubleshooting

### Midtrans Snap not loading
- Check if script is loaded: View source → search for "snap.js"
- Verify CLIENT_KEY in .env

### Payment not updating status
- Check webhook is accessible (use ngrok for local testing)
- Verify SERVER_KEY in .env
- Check Laravel logs: `storage/logs/laravel.log`

### Currency conversion not working
- Verify exchange rate is set correctly
- Check JavaScript console for errors

## Next Steps

1. ✅ Implement donor dashboard to view donation history
2. ⏳ Add email notifications for successful donations
3. ⏳ Add receipt/invoice generation
4. ⏳ Integrate real-time exchange rate API
5. ⏳ Add recurring donation feature
