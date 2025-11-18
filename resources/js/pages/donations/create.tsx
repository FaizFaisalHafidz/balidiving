import FrontLayout from '@/layouts/front-layout';
import { Link, router, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    CreditCard,
    DollarSign,
    Globe,
    Heart,
    Mail,
    MessageSquare,
    Phone,
    Shield,
    User
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface DonationCreateProps {
    campaign: {
        id: number;
        title: string;
        slug: string;
        image: string | null;
        raised: number;
        target: number;
        category: string;
        fundraiser: {
            name: string;
            avatar: string | null;
        };
    };
    midtransClientKey: string;
    exchangeRate: number;
}

declare global {
    interface Window {
        snap: any;
    }
}

export default function DonationCreate({ campaign, midtransClientKey, exchangeRate }: DonationCreateProps) {
    const { props } = usePage<any>();
    const authUser = props.auth?.user;
    
    const [amount, setAmount] = useState('');
    const [name, setName] = useState(authUser?.name || '');
    const [email, setEmail] = useState(authUser?.email || '');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');

    // Check for snap token from flash session
    useEffect(() => {
        console.log('Props received:', props);
        console.log('Snap available:', window.snap);
        
        if (props.snapToken) {
            const data = props.snapToken;
            console.log('Snap token data:', data);
            
            if (data.snap_token) {
                setIsProcessing(true);
                
                // Wait for snap to be loaded
                let attempts = 0;
                const maxAttempts = 100; // 10 seconds max
                
                const checkSnap = setInterval(() => {
                    attempts++;
                    console.log(`Checking for snap... attempt ${attempts}`);
                    
                    if (window.snap) {
                        clearInterval(checkSnap);
                        console.log('Snap found! Opening payment with token:', data.snap_token);
                        
                        try {
                            // Open Midtrans Snap
                            window.snap.pay(data.snap_token, {
                                onSuccess: function(result: any) {
                                    console.log('Payment success:', result);
                                    router.visit(`/donations/success?order_id=${data.order_id}`);
                                },
                                onPending: function(result: any) {
                                    console.log('Payment pending:', result);
                                    router.visit(`/donations/success?order_id=${data.order_id}`);
                                },
                                onError: function(result: any) {
                                    console.error('Payment error:', result);
                                    console.error('Error details:', JSON.stringify(result));
                                    setError('Pembayaran gagal: ' + (result.status_message || 'Silakan coba lagi.'));
                                    setIsProcessing(false);
                                },
                                onClose: function() {
                                    console.log('Payment popup closed');
                                    setIsProcessing(false);
                                }
                            });
                        } catch (error) {
                            console.error('Error calling snap.pay:', error);
                            setError('Gagal membuka payment gateway: ' + error);
                            setIsProcessing(false);
                        }
                    } else if (attempts >= maxAttempts) {
                        clearInterval(checkSnap);
                        console.error('Snap not loaded after 10 seconds');
                        setError('Gagal memuat payment gateway. Silakan refresh halaman.');
                        setIsProcessing(false);
                    }
                }, 100);
            }
        }

        if (props.errors && props.errors.message) {
            setError(props.errors.message);
        }
    }, [props]);

    const quickAmounts = [50000, 100000, 250000, 500000, 1000000];

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value);
    };

    const handleQuickAmount = (value: number) => {
        setAmount(value.toString());
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const numAmount = parseFloat(amount);
        
        // Validation
        if (!numAmount || numAmount < 10000) {
            setError('Minimum donasi adalah Rp 10.000');
            return;
        }

        if (!name || !email) {
            setError('Nama dan email harus diisi');
            return;
        }

        setIsProcessing(true);

        // Use Inertia router to submit
        router.post(`/campaigns/${campaign.slug}/donate`, {
            amount: numAmount,
            currency: 'IDR',
            name: isAnonymous ? 'Anonymous' : name,
            email,
            phone,
            message,
            is_anonymous: isAnonymous,
        }, {
            preserveScroll: true,
            onError: (errors: any) => {
                setError(errors.message || 'Terjadi kesalahan. Silakan coba lagi.');
                setIsProcessing(false);
            }
        });
    };

    return (
        <FrontLayout>
            {/* Hero Section - Modern dark design */}
            <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <Link 
                        href={`/campaigns/${campaign.slug}`}
                        className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        Kembali ke Kampanye
                    </Link>

                    <div className="flex items-center gap-3">
                        <Heart className="h-8 w-8 text-blue-400" />
                        <h1 className="text-3xl md:text-4xl font-bold">Donasi untuk Kampanye</h1>
                    </div>
                </div>
            </section>

            {/* Main Content - Clean background */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Donation Form */}
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-xl shadow-md p-8"
                            >
                                <h2 className="text-2xl font-bold text-slate-900 mb-6">Isi Detail Donasi</h2>

                                {error && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Currency Label - IDR Only */}
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="block text-sm font-semibold text-slate-700">
                                                Mata Uang
                                            </label>
                                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-200">
                                                <Globe className="h-4 w-4" />
                                                Rupiah (IDR)
                                            </div>
                                        </div>
                                    </div>

                                    {/* Amount */}
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Jumlah Donasi *
                                        </label>
                                        
                                        {/* Quick Amounts */}
                                        <div className="grid grid-cols-5 gap-2 mb-4">
                                            {quickAmounts.map((value) => (
                                                <button
                                                    key={value}
                                                    type="button"
                                                    onClick={() => handleQuickAmount(value)}
                                                    className={`px-4 py-3 rounded-lg font-semibold transition-all text-sm ${
                                                        amount === value.toString()
                                                            ? 'bg-slate-900 text-white shadow-md'
                                                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                                    }`}
                                                >
                                                    {formatCurrency(value)}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="relative">
                                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                            <input
                                                type="number"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                placeholder="Masukkan jumlah dalam Rupiah"
                                                className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                required
                                                min={10000}
                                            />
                                        </div>
                                        <div className="mt-2 text-sm text-slate-600">
                                            Minimum donasi Rp 10.000
                                        </div>
                                    </div>

                                    {/* Anonymous Donation */}
                                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                                        <input
                                            type="checkbox"
                                            id="anonymous"
                                            checked={isAnonymous}
                                            onChange={(e) => setIsAnonymous(e.target.checked)}
                                            className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                                        />
                                        <label htmlFor="anonymous" className="text-sm font-medium text-slate-700 cursor-pointer">
                                            Donasi sebagai Anonymous (nama tidak ditampilkan)
                                        </label>
                                    </div>

                                    {/* Donor Information - Only show if not logged in AND not anonymous */}
                                    {!authUser && !isAnonymous && (
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-semibold text-slate-900">Informasi Donatur</h3>

                                            {/* Name */}
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                                    Nama Lengkap *
                                                </label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                                    <input
                                                        type="text"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        placeholder="Masukkan nama lengkap"
                                                        className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            {/* Email */}
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                                    Email *
                                                </label>
                                                <div className="relative">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                                    <input
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="email@example.com"
                                                        className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Phone - Only show if not anonymous */}
                                    {!isAnonymous && (
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                No. Telepon (Opsional)
                                            </label>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                                <input
                                                    type="tel"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    placeholder="08xxxxxxxxxx"
                                                    className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Message - Only show if not anonymous */}
                                    {!isAnonymous && (
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                Pesan Dukungan (Opsional)
                                            </label>
                                            <div className="relative">
                                                <MessageSquare className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                                                <textarea
                                                    value={message}
                                                    onChange={(e) => setMessage(e.target.value)}
                                                    placeholder="Tulis pesan dukungan untuk kampanye ini..."
                                                    rows={4}
                                                    maxLength={1000}
                                                    className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                                />
                                            </div>
                                            <div className="text-xs text-slate-500 mt-1">
                                                {message.length}/1000 karakter
                                            </div>
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <div className="pt-6 border-t border-slate-200">
                                        <button
                                            type="submit"
                                            disabled={isProcessing}
                                            className="w-full bg-gradient-to-r from-slate-900 to-slate-800 text-white px-8 py-4 rounded-lg font-semibold hover:from-slate-800 hover:to-slate-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                        >
                                            {isProcessing ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                    Memproses...
                                                </>
                                            ) : (
                                                <>
                                                    <CreditCard className="h-5 w-5" />
                                                    Lanjut ke Pembayaran
                                                </>
                                            )}
                                        </button>

                                        <div className="flex items-center justify-center gap-2 mt-4 text-sm text-slate-600">
                                            <Shield className="h-4 w-4 text-emerald-600" />
                                            Pembayaran aman dengan Midtrans
                                        </div>
                                    </div>
                                </form>
                            </motion.div>
                        </div>

                        {/* Campaign Info Sidebar */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-xl shadow-md p-6 sticky top-24"
                            >
                                <h3 className="text-lg font-semibold text-slate-900 mb-4">Kampanye yang Didukung</h3>

                                {/* Campaign Image */}
                                <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                                    {campaign.image ? (
                                        <img
                                            src={campaign.image}
                                            alt={campaign.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900" />
                                    )}
                                </div>

                                <h4 className="font-bold text-slate-900 mb-2 line-clamp-2">{campaign.title}</h4>
                                
                                <div className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium mb-4 border border-blue-200">
                                    {campaign.category}
                                </div>

                                {/* Progress */}
                                <div className="mb-4">
                                    <div className="flex items-center justify-between text-sm mb-2">
                                        <span className="font-semibold text-slate-900">
                                            {formatCurrency(campaign.raised)}
                                        </span>
                                        <span className="text-slate-600">
                                            dari {formatCurrency(campaign.target)}
                                        </span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-blue-600 to-blue-500 h-2 rounded-full"
                                            style={{
                                                width: `${Math.min((campaign.raised / campaign.target) * 100, 100)}%`
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Fundraiser */}
                                <div className="pt-4 border-t border-slate-200">
                                    <div className="text-xs text-slate-500 mb-2">Penggalang Dana</div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full flex items-center justify-center">
                                            {campaign.fundraiser.avatar ? (
                                                <img 
                                                    src={campaign.fundraiser.avatar} 
                                                    alt={campaign.fundraiser.name}
                                                    className="w-full h-full rounded-full object-cover"
                                                />
                                            ) : (
                                                <User className="h-5 w-5 text-white" />
                                            )}
                                        </div>
                                        <div className="font-medium text-slate-900">{campaign.fundraiser.name}</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </FrontLayout>
    );
}
