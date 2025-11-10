import FrontLayout from '@/layouts/front-layout';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    AlertCircle,
    Calendar,
    CheckCircle,
    Clock,
    ExternalLink,
    Mail,
    MapPin,
    Share2,
    User,
    Users,
    XCircle
} from 'lucide-react';

interface EventShowProps {
    event: {
        id: number;
        title: string;
        slug: string;
        description: string;
        image: string | null;
        location: string;
        location_url: string | null;
        start_date: string;
        end_date: string;
        max_participants: number | null;
        registered_participants: number;
        available_slots: number | null;
        is_full: boolean;
        status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
        is_featured: boolean;
        organizer: {
            id: number;
            name: string;
            email: string;
            avatar: string | null;
        };
        is_upcoming: boolean;
        is_ongoing: boolean;
        is_completed: boolean;
    };
}

export default function EventShow({ event }: EventShowProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    const getStatusBadge = () => {
        const badges = {
            upcoming: { color: 'bg-blue-100 text-blue-700', icon: AlertCircle, label: 'Akan Datang' },
            ongoing: { color: 'bg-green-100 text-green-700', icon: CheckCircle, label: 'Berlangsung' },
            completed: { color: 'bg-gray-100 text-gray-700', icon: CheckCircle, label: 'Selesai' },
            cancelled: { color: 'bg-red-100 text-red-700', icon: XCircle, label: 'Dibatalkan' },
        };
        
        const badge = badges[event.status];
        const Icon = badge.icon;
        
        return (
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${badge.color}`}>
                <Icon className="h-4 w-4" />
                {badge.label}
            </span>
        );
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: event.title,
                text: `Ikuti event: ${event.title}`,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link berhasil disalin!');
        }
    };

    return (
        <FrontLayout>
            {/* Hero Image */}
            <section className="relative h-[500px] overflow-hidden">
                {event.image ? (
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-500 flex items-center justify-center">
                        <Calendar className="h-32 w-32 text-white/30" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                
                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="container mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                {getStatusBadge()}
                                {event.is_featured && (
                                    <span className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold">
                                        Featured Event
                                    </span>
                                )}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                {event.title}
                            </h1>
                            <div className="flex items-center gap-6 text-white/90">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-5 w-5" />
                                    <span>{formatDate(event.start_date)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5" />
                                    <span>{event.location}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-2xl shadow-lg p-8"
                            >
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Detail Event</h2>
                                <div className="prose prose-blue max-w-none">
                                    {event.description.split('\n').map((paragraph, index) => (
                                        <p key={index} className="text-gray-700 mb-4 whitespace-pre-wrap">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Event Details */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white rounded-2xl shadow-lg p-8 mt-8"
                            >
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Informasi Event</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                            <Calendar className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900 mb-1">Tanggal Mulai</div>
                                            <div className="text-gray-600">{formatDate(event.start_date)}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                            <Calendar className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900 mb-1">Tanggal Selesai</div>
                                            <div className="text-gray-600">{formatDate(event.end_date)}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                            <MapPin className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900 mb-1">Lokasi</div>
                                            <div className="text-gray-600">{event.location}</div>
                                            {event.location_url && (
                                                <a
                                                    href={event.location_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm mt-1"
                                                >
                                                    <ExternalLink className="h-4 w-4" />
                                                    Lihat di Maps
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {event.max_participants && (
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                                <Users className="h-6 w-6 text-blue-600" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900 mb-1">Kapasitas</div>
                                                <div className="text-gray-600">
                                                    {event.registered_participants} / {event.max_participants} Peserta
                                                </div>
                                                {event.is_full ? (
                                                    <span className="text-sm text-red-600 font-medium">Event Penuh</span>
                                                ) : (
                                                    <span className="text-sm text-green-600 font-medium">
                                                        {event.available_slots} slot tersisa
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            {/* Registration Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-2xl shadow-lg p-6 sticky top-24"
                            >
                                {/* Organizer Info */}
                                <div className="pb-6 border-b border-gray-200 mb-6">
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Penyelenggara</h3>
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
                                            {event.organizer.avatar ? (
                                                <img 
                                                    src={event.organizer.avatar} 
                                                    alt={event.organizer.name}
                                                    className="w-full h-full rounded-full object-cover"
                                                />
                                            ) : (
                                                <User className="h-6 w-6 text-white" />
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900">{event.organizer.name}</div>
                                            <div className="text-sm text-gray-500 flex items-center gap-1">
                                                <Mail className="h-3 w-3" />
                                                {event.organizer.email}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-3">
                                    {event.is_upcoming && !event.is_full && (
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg"
                                        >
                                            Daftar Sekarang
                                        </motion.button>
                                    )}

                                    {event.is_full && (
                                        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl text-center font-medium">
                                            Event Sudah Penuh
                                        </div>
                                    )}

                                    {event.is_completed && (
                                        <div className="bg-gray-50 border border-gray-200 text-gray-700 px-6 py-4 rounded-xl text-center font-medium">
                                            Event Telah Selesai
                                        </div>
                                    )}

                                    <button
                                        onClick={handleShare}
                                        className="w-full bg-gray-100 text-gray-700 px-6 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Share2 className="h-5 w-5" />
                                        Bagikan Event
                                    </button>

                                    <Link
                                        href="/events"
                                        className="block text-center w-full text-gray-600 px-6 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                                    >
                                        Lihat Event Lainnya
                                    </Link>
                                </div>

                                {/* Stats */}
                                {event.max_participants && (
                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-600">Progress Pendaftaran</span>
                                            <span className="text-sm font-semibold text-gray-900">
                                                {Math.round((event.registered_participants / event.max_participants) * 100)}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div
                                                className="bg-gradient-to-r from-blue-600 to-cyan-600 h-3 rounded-full transition-all"
                                                style={{ 
                                                    width: `${Math.min((event.registered_participants / event.max_participants) * 100, 100)}%` 
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </FrontLayout>
    );
}
