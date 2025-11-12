import FrontLayout from '@/layouts/front-layout';
import { motion } from 'framer-motion';
import {
    Activity,
    Award,
    Heart,
    Leaf,
    Shield,
    Target,
    TrendingUp,
    Users,
    Waves,
    Zap
} from 'lucide-react';
import React from 'react';

interface Stats {
    total_campaigns: number;
    active_campaigns: number;
    total_fundraisers: number;
    total_donors: number;
    total_raised: number;
    total_donations: number;
}

interface TeamMember {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
    role: string;
    bio: string;
    successful_campaigns: number;
    total_raised: number;
}

interface Mission {
    title: string;
    description: string;
    points: string[];
}

interface Vision {
    title: string;
    description: string;
}

interface Value {
    icon: string;
    title: string;
    description: string;
}

interface TimelineItem {
    year: string;
    title: string;
    description: string;
}

interface AboutProps {
    stats: Stats;
    teamMembers: TeamMember[];
    mission: Mission;
    vision: Vision;
    values: Value[];
    timeline: TimelineItem[];
}

const iconMap: Record<string, React.ComponentType<any>> = {
    Shield,
    Heart,
    Users,
    Leaf,
    Award,
    Zap,
};

export default function About({ stats, teamMembers, mission, vision, values, timeline }: AboutProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <FrontLayout>
            {/* Hero Section - More modern and clean */}
            <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-32 overflow-hidden">
                {/* Subtle grid pattern */}
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
                        className="max-w-4xl mx-auto text-center"
                    >
                        <div className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-sm px-6 py-2 rounded-full mb-8 border border-blue-500/30">
                            <Waves className="h-5 w-5 text-blue-400" />
                            <span className="font-medium text-blue-200">Tentang Kami</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                            Bersama Melindungi
                            <span className="block text-blue-400">
                                Lautan Kita
                            </span>
                        </h1>
                        
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            Platform crowdfunding terpercaya untuk kampanye konservasi laut dan lingkungan hidup di Indonesia
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section - More modern cards */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-xl shadow-md p-6 text-center border border-slate-200 hover:shadow-lg transition-shadow"
                        >
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                                <Target className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="text-3xl font-bold text-slate-900 mb-1">{stats.total_campaigns}</div>
                            <div className="text-sm text-slate-600">Total Kampanye</div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-xl shadow-md p-6 text-center border border-slate-200 hover:shadow-lg transition-shadow"
                        >
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                                <Activity className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="text-3xl font-bold text-slate-900 mb-1">{stats.active_campaigns}</div>
                            <div className="text-sm text-slate-600">Kampanye Aktif</div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-xl shadow-md p-6 text-center border border-slate-200 hover:shadow-lg transition-shadow"
                        >
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
                                <Users className="h-6 w-6 text-purple-600" />
                            </div>
                            <div className="text-3xl font-bold text-slate-900 mb-1">{stats.total_donors}</div>
                            <div className="text-sm text-slate-600">Total Donatur</div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-xl shadow-md p-6 text-center border border-slate-200 hover:shadow-lg transition-shadow"
                        >
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-100 rounded-lg mb-4">
                                <TrendingUp className="h-6 w-6 text-teal-600" />
                            </div>
                            <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
                                {formatCurrency(stats.total_raised)}
                            </div>
                            <div className="text-sm text-slate-600">Dana Terkumpul</div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision - Cleaner layout */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Mission */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-2 text-blue-600 font-semibold mb-4 text-sm uppercase tracking-wide">
                                <div className="h-0.5 w-12 bg-blue-600 rounded"></div>
                                {mission.title}
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">
                                {mission.description}
                            </h2>
                            <ul className="space-y-4">
                                {mission.points.map((point, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-start gap-3"
                                    >
                                        <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mt-0.5">
                                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                                        </div>
                                        <span className="text-slate-600 leading-relaxed">{point}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Vision */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-8 flex flex-col justify-center text-white"
                        >
                            <div className="inline-flex items-center gap-2 text-blue-400 font-semibold mb-4 text-sm uppercase tracking-wide">
                                <div className="h-0.5 w-12 bg-blue-400 rounded"></div>
                                {vision.title}
                            </div>
                            <h2 className="text-3xl font-bold mb-6">
                                {vision.description}
                            </h2>
                            <div className="flex items-center gap-4 pt-6 border-t border-slate-700">
                                <div className="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Waves className="h-7 w-7 text-white" />
                                </div>
                                <div>
                                    <div className="font-semibold text-white">Adopt the Blue</div>
                                    <div className="text-sm text-slate-400">Ocean Conservation Platform</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values - More modern cards */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mb-16"
                    >
                        <div className="inline-flex items-center gap-2 text-blue-600 font-semibold mb-4 text-sm uppercase tracking-wide">
                            <div className="h-0.5 w-12 bg-blue-600 rounded"></div>
                            Nilai-Nilai Kami
                        </div>
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">
                            Prinsip yang Kami Pegang
                        </h2>
                        <p className="text-slate-600 text-lg">
                            Nilai-nilai fundamental yang membimbing setiap keputusan dan tindakan kami
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {values.map((value, index) => {
                            const IconComponent = iconMap[value.icon];
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-slate-200 group"
                                >
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                                        {IconComponent && <IconComponent className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors" />}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{value.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{value.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Timeline - Cleaner design */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mb-16"
                    >
                        <div className="inline-flex items-center gap-2 text-blue-600 font-semibold mb-4 text-sm uppercase tracking-wide">
                            <div className="h-0.5 w-12 bg-blue-600 rounded"></div>
                            Perjalanan Kami
                        </div>
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">
                            Tonggak Penting
                        </h2>
                        <p className="text-slate-600 text-lg">
                            Dari awal hingga sekarang, ini adalah perjalanan kami dalam melindungi lautan
                        </p>
                    </motion.div>

                    <div className="max-w-4xl mx-auto">
                        {timeline.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative pl-8 pb-12 border-l border-slate-200 last:pb-0"
                            >
                                <div className="absolute left-0 top-0 -translate-x-1/2 w-3 h-3 bg-blue-600 rounded-full border-4 border-white shadow-md"></div>
                                <div className="bg-slate-50 rounded-lg p-6 ml-6 border border-slate-200">
                                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mb-3 uppercase tracking-wide">
                                        {item.year}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section - More modern */}
            {teamMembers.length > 0 && (
                <section className="py-20 bg-slate-50">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="max-w-3xl mb-16"
                        >
                            <div className="inline-flex items-center gap-2 text-blue-600 font-semibold mb-4 text-sm uppercase tracking-wide">
                                <div className="h-0.5 w-12 bg-blue-600 rounded"></div>
                                Tim Kami
                            </div>
                            <h2 className="text-4xl font-bold text-slate-900 mb-4">
                                Fundraiser Terbaik
                            </h2>
                            <p className="text-slate-600 text-lg">
                                Para fundraiser yang telah berhasil menyelesaikan kampanye dan membuat dampak nyata
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {teamMembers.map((member, index) => (
                                <motion.div
                                    key={member.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-slate-200"
                                >
                                    <div className="relative h-56 bg-gradient-to-br from-slate-800 to-slate-900">
                                        {member.avatar ? (
                                            <img 
                                                src={member.avatar} 
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Users className="h-20 w-20 text-white/30" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                                        <div className="text-sm text-blue-600 font-medium mb-3">{member.role}</div>
                                        <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed">{member.bio}</p>
                                        
                                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                            <div>
                                                <div className="text-2xl font-bold text-slate-900">{member.successful_campaigns}</div>
                                                <div className="text-xs text-slate-500">Kampanye Selesai</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lg font-bold text-blue-600">
                                                    {formatCurrency(member.total_raised)}
                                                </div>
                                                <div className="text-xs text-slate-500">Dana Terkumpul</div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section - Modern dark design */}
            <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
                {/* Gradient orbs */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <h2 className="text-4xl font-bold mb-6">
                            Bergabunglah dengan Kami
                        </h2>
                        <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                            Mulai membuat perbedaan hari ini. Baik sebagai donatur atau fundraiser, setiap kontribusi Anda berarti.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.a
                                href="/campaigns"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors shadow-lg"
                            >
                                <Heart className="h-5 w-5" />
                                Lihat Kampanye
                            </motion.a>
                            <motion.a
                                href="/register"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors border border-slate-600"
                            >
                                <Users className="h-5 w-5" />
                                Daftar Sekarang
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </FrontLayout>
    );
}
