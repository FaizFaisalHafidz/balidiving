import FrontLayout from '@/layouts/front-layout';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { CheckCircle, Heart, Home, Share2 } from 'lucide-react';

interface DonationSuccessProps {
    donation: {
        order_id: string;
        amount: number;
        status: string;
        donor_name: string;
        message: string | null;
        created_at: string;
    };
    campaign: {
        title: string;
        slug: string;
        image: string | null;
    };
}

export default function DonationSuccess({ donation, campaign }: DonationSuccessProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const handleShare = () => {
        const text = `Saya baru saja berdonasi untuk kampanye "${campaign.title}" di Adopt the Blue! Mari bergabung mendukung konservasi laut! 🌊`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Donasi Berhasil',
                text: text,
                url: window.location.origin + `/campaigns/${campaign.slug}`,
            });
        } else {
            navigator.clipboard.writeText(text + ' ' + window.location.origin + `/campaigns/${campaign.slug}`);
            alert('Link berhasil disalin!');
        }
    };

    const getStatusBadge = () => {
        const badges: Record<string, { color: string; text: string }> = {
            pending: { color: 'bg-amber-50 text-amber-700 border border-amber-200', text: 'Menunggu Pembayaran' },
            berhasil: { color: 'bg-emerald-50 text-emerald-700 border border-emerald-200', text: 'Pembayaran Berhasil' },
            gagal: { color: 'bg-red-50 text-red-700 border border-red-200', text: 'Pembayaran Gagal' },
        };

        const badge = badges[donation.status] || badges.pending;

        return (
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold ${badge.color}`}>
                {badge.text}
            </span>
        );
    };

    return (
        <FrontLayout>
            <section className="min-h-screen bg-slate-50 py-16">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-2xl mx-auto"
                    >
                        {/* Success Card */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            {/* Header - Modern dark design */}
                            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                    className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-4"
                                >
                                    <CheckCircle className="h-12 w-12 text-emerald-400" />
                                </motion.div>

                                <h1 className="text-3xl font-bold mb-2">
                                    {donation.status === 'berhasil' ? 'Terima Kasih!' : 'Donasi Anda Sedang Diproses'}
                                </h1>
                                <p className="text-slate-300 text-lg">
                                    {donation.status === 'berhasil' 
                                        ? 'Donasi Anda berhasil dan sangat berarti untuk konservasi laut'
                                        : 'Kami sedang menunggu konfirmasi pembayaran Anda'
                                    }
                                </p>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                {/* Status Badge */}
                                <div className="flex justify-center mb-8">
                                    {getStatusBadge()}
                                </div>

                                {/* Donation Details */}
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between py-4 border-b border-slate-100">
                                        <span className="text-slate-600">ID Transaksi</span>
                                        <span className="font-semibold text-slate-900">{donation.order_id}</span>
                                    </div>

                                    <div className="flex justify-between py-4 border-b border-slate-100">
                                        <span className="text-slate-600">Jumlah Donasi</span>
                                        <span className="font-bold text-2xl text-blue-600">
                                            {formatCurrency(donation.amount)}
                                        </span>
                                    </div>

                                    <div className="flex justify-between py-4 border-b border-slate-100">
                                        <span className="text-slate-600">Nama Donatur</span>
                                        <span className="font-semibold text-slate-900">{donation.donor_name}</span>
                                    </div>

                                    <div className="flex justify-between py-4 border-b border-slate-100">
                                        <span className="text-slate-600">Tanggal</span>
                                        <span className="font-semibold text-slate-900">{donation.created_at}</span>
                                    </div>

                                    {donation.message && (
                                        <div className="py-4">
                                            <div className="text-slate-600 mb-2">Pesan Dukungan</div>
                                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                                <p className="text-slate-900 italic">"{donation.message}"</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Campaign Info */}
                                <div className="bg-slate-50 rounded-lg p-6 mb-8 border border-slate-200">
                                    <div className="text-sm text-slate-600 mb-3">Untuk Kampanye</div>
                                    <div className="flex items-center gap-4">
                                        {campaign.image && (
                                            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                                <img
                                                    src={campaign.image}
                                                    alt={campaign.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                        <div>
                                            <h3 className="font-bold text-slate-900 mb-1">{campaign.title}</h3>
                                            <Link
                                                href={`/campaigns/${campaign.slug}`}
                                                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                            >
                                                Lihat Kampanye →
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Info Message */}
                                {donation.status === 'pending' && (
                                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
                                        <p className="text-amber-800 text-sm">
                                            <strong>Catatan:</strong> Silakan selesaikan pembayaran Anda. 
                                            Kami akan mengirimkan konfirmasi ke email Anda setelah pembayaran berhasil.
                                        </p>
                                    </div>
                                )}

                                {donation.status === 'berhasil' && (
                                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-8">
                                        <div className="flex items-start gap-3">
                                            <Heart className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                            <div className="text-sm text-emerald-800">
                                                <p className="font-semibold mb-1">Donasi Anda Sangat Berarti!</p>
                                                <p>Konfirmasi pembayaran telah dikirim ke email Anda. Dana akan segera digunakan untuk mendukung kampanye konservasi laut.</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="space-y-3">
                                    <button
                                        onClick={handleShare}
                                        className="w-full bg-gradient-to-r from-slate-900 to-slate-800 text-white px-6 py-4 rounded-lg font-semibold hover:from-slate-800 hover:to-slate-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-3"
                                    >
                                        <Share2 className="h-5 w-5" />
                                        Bagikan Donasi Anda
                                    </button>

                                    <Link
                                        href={`/campaigns/${campaign.slug}`}
                                        className="block w-full bg-slate-100 text-slate-700 px-6 py-4 rounded-lg font-semibold hover:bg-slate-200 transition-colors text-center"
                                    >
                                        Kembali ke Kampanye
                                    </Link>

                                    <Link
                                        href="/"
                                        className="flex w-full text-slate-600 px-6 py-4 rounded-lg font-semibold hover:bg-slate-50 transition-colors text-center items-center justify-center gap-2"
                                    >
                                        <Home className="h-5 w-5" />
                                        Kembali ke Beranda
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Additional Message */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-center mt-8 text-slate-600"
                        >
                            <p>Butuh bantuan? Hubungi kami di <a href="mailto:support@balidiving.com" className="text-blue-600 hover:underline">support@balidiving.com</a></p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </FrontLayout>
    );
}
