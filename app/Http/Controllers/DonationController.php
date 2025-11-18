<?php

namespace App\Http\Controllers;

use App\Models\Kampanye;
use App\Models\Donasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Midtrans\Config;
use Midtrans\Snap;

class DonationController extends Controller
{
    public function __construct()
    {
        // Set Midtrans configuration
        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = config('midtrans.is_sanitized');
        Config::$is3ds = config('midtrans.is_3ds');
    }

    /**
     * Show donation page for a campaign
     */
    public function create(string $slug)
    {
        // Check if user is authenticated
        if (!Auth::check()) {
            return redirect()->route('login')
                ->with('message', 'Silakan login terlebih dahulu untuk berdonasi.');
        }

        $kampanye = Kampanye::with(['user', 'kategori'])
            ->where('slug', $slug)
            ->firstOrFail();

        // Check if campaign is active and not expired
        if ($kampanye->status !== 'aktif' || $kampanye->tanggal_berakhir < now()) {
            return redirect()->route('campaigns.show', $slug)
                ->with('error', 'Kampanye ini sudah tidak menerima donasi.');
        }

        return Inertia::render('donations/create', [
            'campaign' => [
                'id' => $kampanye->id,
                'title' => $kampanye->judul,
                'slug' => $kampanye->slug,
                'image' => $kampanye->gambar_utama,
                'raised' => $kampanye->dana_terkumpul,
                'target' => $kampanye->target_dana,
                'category' => $kampanye->kategori->nama,
                'fundraiser' => [
                    'name' => $kampanye->user->name,
                    'avatar' => $kampanye->user->avatar ?? null,
                ],
            ],
            'midtransClientKey' => config('midtrans.client_key'),
            'exchangeRate' => $this->getExchangeRate(), // IDR to USD
        ]);
    }

    /**
     * Process donation and create Midtrans transaction
     */
    public function store(Request $request, string $slug)
    {
        $request->validate([
            'amount' => 'required|numeric|min:10000', // Minimum Rp 10.000
            'currency' => 'required|in:IDR,USD',
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|email',
            'phone' => 'nullable|string|max:20',
            'message' => 'nullable|string|max:1000',
            'is_anonymous' => 'boolean',
        ]);

        $kampanye = Kampanye::where('slug', $slug)->firstOrFail();

        // Check if campaign is still active
        if ($kampanye->status !== 'aktif' || $kampanye->tanggal_berakhir < now()) {
            return back()->withErrors(['message' => 'Kampanye ini sudah tidak menerima donasi.']);
        }

        // Convert amount to IDR if needed
        $amountIDR = $request->currency === 'USD' 
            ? $request->amount * $this->getExchangeRate()
            : $request->amount;

        // Get auth user data
        $user = Auth::user();
        
        // Determine name and email with fallback to user data
        // For Midtrans, we need actual name and email (not "Anonymous")
        $actualName = $request->name ?? $user->name;
        $actualEmail = $request->email ?? $user->email;
        
        // Display name (can be Anonymous)
        $displayName = $request->is_anonymous ? 'Anonymous' : $actualName;

        // Create donation record
        $donasi = Donasi::create([
            'kampanye_id' => $kampanye->id,
            'user_id' => Auth::id(),
            'order_id' => 'DONATE-' . strtoupper(Str::random(10)),
            'jumlah' => $amountIDR,
            'nama_donatur' => $displayName,
            'email_donatur' => $actualEmail,
            'no_telepon_donatur' => $request->phone,
            'pesan' => $request->message,
            'metode_pembayaran' => 'midtrans',
            'status' => 'pending',
            'is_anonim' => $request->is_anonymous ?? false,
        ]);

        // Prepare transaction details for Midtrans
        $transactionDetails = [
            'order_id' => $donasi->order_id,
            'gross_amount' => (int) $amountIDR,
        ];

        $itemDetails = [
            [
                'id' => $kampanye->id,
                'price' => (int) $amountIDR,
                'quantity' => 1,
                'name' => 'Donasi: ' . Str::limit($kampanye->judul, 50),
            ]
        ];

        // Use actual name and email for Midtrans (required fields)
        $customerDetails = [
            'first_name' => $actualName,
            'email' => $actualEmail,
            'phone' => $request->phone ?? $user->phone ?? '',
        ];

        $transaction = [
            'transaction_details' => $transactionDetails,
            'item_details' => $itemDetails,
            'customer_details' => $customerDetails,
            'enabled_payments' => [
                'credit_card', 
                'bca_va', 
                'bni_va', 
                'bri_va', 
                'permata_va',
                'other_va',
                'gopay',
                'shopeepay',
                'qris'
            ],
        ];

        try {
            // Log transaction data for debugging
            Log::info('Midtrans Transaction Request', [
                'transaction_details' => $transactionDetails,
                'customer_details' => $customerDetails,
                'item_details' => $itemDetails,
            ]);

            $snapToken = Snap::getSnapToken($transaction);
            
            // Update donation with snap token
            $donasi->update(['snap_token' => $snapToken]);

            // Return Inertia response directly with snapToken in props
            return Inertia::render('donations/create', [
                'campaign' => [
                    'id' => $kampanye->id,
                    'title' => $kampanye->judul,
                    'slug' => $kampanye->slug,
                    'image' => $kampanye->gambar_utama,
                    'raised' => $kampanye->dana_terkumpul,
                    'target' => $kampanye->target_dana,
                    'category' => $kampanye->kategori->nama,
                    'fundraiser' => [
                        'name' => $kampanye->user->name,
                        'avatar' => $kampanye->user->avatar ?? null,
                    ],
                ],
                'midtransClientKey' => config('midtrans.client_key'),
                'exchangeRate' => $this->getExchangeRate(),
                'snapToken' => [
                    'snap_token' => $snapToken,
                    'order_id' => $donasi->order_id,
                ],
            ]);
        } catch (\Exception $e) {
            // Delete failed donation
            $donasi->delete();
            
            // Log error details
            Log::error('Midtrans Snap Token Error', [
                'message' => $e->getMessage(),
                'order_id' => $donasi->order_id,
                'amount' => $amountIDR,
            ]);
            
            return back()->withErrors(['message' => 'Gagal membuat pembayaran: ' . $e->getMessage()]);
        }
    }

    /**
     * Handle Midtrans notification callback
     */
    public function notification(Request $request)
    {
        try {
            $notification = new \Midtrans\Notification();

            $orderId = $notification->order_id;
            $transactionStatus = $notification->transaction_status;
            $fraudStatus = $notification->fraud_status;

            $donasi = Donasi::where('order_id', $orderId)->firstOrFail();

            if ($transactionStatus == 'capture') {
                if ($fraudStatus == 'accept') {
                    $donasi->update(['status' => 'berhasil']);
                    $this->updateCampaignFunds($donasi);
                }
            } elseif ($transactionStatus == 'settlement') {
                $donasi->update(['status' => 'berhasil']);
                $this->updateCampaignFunds($donasi);
            } elseif ($transactionStatus == 'pending') {
                $donasi->update(['status' => 'pending']);
            } elseif ($transactionStatus == 'deny' || $transactionStatus == 'cancel' || $transactionStatus == 'expire') {
                $donasi->update(['status' => 'gagal']);
            }

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Check payment status
     */
    public function checkStatus(string $orderId)
    {
        $donasi = Donasi::where('order_id', $orderId)->firstOrFail();
        
        return response()->json([
            'status' => $donasi->status,
            'campaign_slug' => $donasi->kampanye->slug,
        ]);
    }

    /**
     * Success page after payment
     */
    public function success(Request $request)
    {
        $orderId = $request->query('order_id');
        
        if (!$orderId) {
            return redirect()->route('home');
        }

        $donasi = Donasi::with(['kampanye'])
            ->where('order_id', $orderId)
            ->firstOrFail();

        return Inertia::render('donations/success', [
            'donation' => [
                'order_id' => $donasi->order_id,
                'amount' => $donasi->jumlah,
                'status' => $donasi->status,
                'donor_name' => $donasi->nama_donatur,
                'message' => $donasi->pesan,
                'created_at' => $donasi->created_at->format('d F Y H:i'),
            ],
            'campaign' => [
                'title' => $donasi->kampanye->judul,
                'slug' => $donasi->kampanye->slug,
                'image' => $donasi->kampanye->gambar_utama,
            ],
        ]);
    }

    /**
     * Update campaign funds after successful donation
     */
    private function updateCampaignFunds(Donasi $donasi)
    {
        $kampanye = $donasi->kampanye;
        $kampanye->increment('dana_terkumpul', $donasi->jumlah);
        
        // Check if target reached and update status
        if ($kampanye->dana_terkumpul >= $kampanye->target_dana) {
            $kampanye->update(['status' => 'selesai']);
        }
    }

    /**
     * Get current IDR to USD exchange rate
     * In production, you should fetch this from a real API
     */
    private function getExchangeRate(): float
    {
        // Hardcoded for now, in production use real exchange rate API
        // e.g., exchangerate-api.com, fixer.io, etc.
        return 16669.45; // 1 USD = 16,669.45 IDR (updated: 10 Nov 2025)
    }
}
