import FrontLayout from '@/layouts/front-layout';
import { Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Calendar,
    CheckCircle,
    Clock,
    MapPin,
    Search,
    Users,
    XCircle
} from 'lucide-react';
import React, { useState } from 'react';

interface Event {
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
        avatar: string | null;
    };
}

interface EventsIndexProps {
    events: {
        data: Event[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        search: string;
        status: string;
        sort: string;
        order: string;
    };
}

export default function EventsIndex({ events, filters }: EventsIndexProps) {
    const [search, setSearch] = useState(filters.search);
    const [status, setStatus] = useState(filters.status);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/events', { search, status }, { preserveState: true });
    };

    const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus);
        router.get('/events', { search, status: newStatus }, { preserveState: true });
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    const getStatusBadge = (status: Event['status']) => {
        const badges = {
            upcoming: {
                bg: 'bg-blue-50',
                text: 'text-blue-700',
                border: 'border-blue-200',
                icon: <Clock className="h-4 w-4" />,
                label: 'Mendatang'
            },
            ongoing: {
                bg: 'bg-emerald-50',
                text: 'text-emerald-700',
                border: 'border-emerald-200',
                icon: <CheckCircle className="h-4 w-4" />,
                label: 'Berlangsung'
            },
            completed: {
                bg: 'bg-slate-50',
                text: 'text-slate-600',
                border: 'border-slate-200',
                icon: <CheckCircle className="h-4 w-4" />,
                label: 'Selesai'
            },
            cancelled: {
                bg: 'bg-red-50',
                text: 'text-red-700',
                border: 'border-red-200',
                icon: <XCircle className="h-4 w-4" />,
                label: 'Dibatalkan'
            }
        };

        const badge = badges[status];
        return (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${badge.bg} ${badge.text} ${badge.border}`}>
                {badge.icon}
                {badge.label}
            </span>
        );
    };    return (
        <FrontLayout>
            {/* Hero Section - Modern dark design */}
            <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24">
                {/* Subtle pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                    }} />
                </div>

                {/* Gradient orbs */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl"
                    >
                        <div className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-blue-500/30">
                            <Calendar className="h-5 w-5 text-blue-400" />
                            <span className="font-medium text-blue-200">Event Konservasi Laut</span>
                        </div>

                        <h1 className="text-5xl font-bold mb-6">
                            Ikuti Event Kami
                        </h1>
                        <p className="text-xl text-slate-300 leading-relaxed">
                            Bergabunglah dengan berbagai kegiatan konservasi laut dan jadilah bagian dari perubahan positif
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filter & Search Section */}
                        {/* Filter & Search Section - Sticky with modern styling */}
            <section className="sticky top-20 z-40 bg-white shadow-md border-b border-slate-200">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                        {/* Search */}
                        <div className="w-full lg:w-96">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Cari event..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="flex flex-wrap gap-2">
                            {['all', 'upcoming', 'ongoing', 'completed'].map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => {
                                        setStatus(filter === 'all' ? '' : filter);
                                        router.get('/events', { search, status: filter === 'all' ? '' : filter }, { preserveState: true });
                                    }}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all ${(filter === 'all' && !status) || status === filter
                                        ? 'bg-slate-900 text-white shadow-md'
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                        }`}
                                >
                                    {filter === 'all' && 'Semua'}
                                    {filter === 'upcoming' && 'Mendatang'}
                                    {filter === 'ongoing' && 'Berlangsung'}
                                    {filter === 'completed' && 'Selesai'}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Events Grid - Modern clean design */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4">
                    {events.data.length === 0 ? (
                        <div className="text-center py-20">
                            <Calendar className="h-20 w-20 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Tidak Ada Event</h3>
                            <p className="text-slate-600">Tidak ada event yang sesuai dengan filter Anda</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {events.data.map((event, index) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link href={`/events/${event.slug}`}>
                                        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group h-full flex flex-col">
                                            {/* Image */}
                                            <div className="relative h-56 overflow-hidden">
                                                {event.image ? (
                                                    <img
                                                        src={event.image}
                                                        alt={event.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                                                        <Calendar className="h-20 w-20 text-white/30" />
                                                    </div>
                                                )}

                                                {/* Featured badge */}
                                                {event.is_featured && (
                                                    <div className="absolute top-4 right-4 bg-amber-400 text-amber-900 px-3 py-1 rounded-lg text-xs font-semibold shadow-md">
                                                        Featured
                                                    </div>
                                                )}

                                                {/* Status badge */}
                                                <div className="absolute top-4 left-4">
                                                    {getStatusBadge(event.status)}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-6 flex-1 flex flex-col">
                                                <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                                    {event.title}
                                                </h3>

                                                <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-1">
                                                    {event.description}
                                                </p>

                                                {/* Date & Time */}
                                                <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                                                    <Clock className="h-4 w-4 text-blue-600" />
                                                    <span>{formatDate(event.start_date)}</span>
                                                </div>

                                                {/* Location */}
                                                <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
                                                    <MapPin className="h-4 w-4 text-blue-600" />
                                                    <span className="line-clamp-1">{event.location}</span>
                                                </div>

                                                {/* Participants */}
                                                {event.max_participants && (
                                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                                        <div className="flex items-center gap-2">
                                                            <Users className="h-4 w-4 text-slate-400" />
                                                            <span className="text-sm text-slate-600">
                                                                {event.registered_participants}/{event.max_participants} Peserta
                                                            </span>
                                                        </div>
                                                        {event.is_full ? (
                                                            <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">Penuh</span>
                                                        ) : (
                                                            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                                                                {event.available_slots} slot tersisa
                                                            </span>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Organizer */}
                                                <div className="flex items-center gap-3 pt-4 mt-4 border-t border-slate-100">
                                                    <div className="w-8 h-8 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full flex items-center justify-center">
                                                        {event.organizer.avatar ? (
                                                            <img 
                                                                src={event.organizer.avatar} 
                                                                alt={event.organizer.name}
                                                                className="w-full h-full rounded-full object-cover"
                                                            />
                                                        ) : (
                                                            <span className="text-white text-xs font-semibold">
                                                                {event.organizer.name.charAt(0)}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="text-xs text-slate-500">Penyelenggara</div>
                                                        <div className="text-sm font-medium text-slate-900">
                                                            {event.organizer.name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Pagination - Modern design */}
                    {events.last_page > 1 && (
                        <div className="flex justify-center gap-2 mt-12">
                            {Array.from({ length: events.last_page }, (_, i) => i + 1).map((page) => (
                                <Link
                                    key={page}
                                    href={`/events?page=${page}`}
                                    preserveState
                                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                        page === events.current_page
                                            ? 'bg-slate-900 text-white shadow-md'
                                            : 'bg-white text-slate-700 hover:bg-slate-100 shadow-sm'
                                    }`}
                                >
                                    {page}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </FrontLayout>
    );
}
