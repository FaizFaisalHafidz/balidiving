import FrontLayout from '@/layouts/front-layout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Award, FileText, Heart, TrendingUp } from 'lucide-react';

export default function DonorDashboard() {
    return (
        <FrontLayout>
            <Head title="Donor Dashboard" />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl font-bold mb-4">Welcome to Your Dashboard</h1>
                        <p className="text-slate-300 text-lg">Track your donations and make a difference in ocean conservation</p>
                    </motion.div>
                </div>
            </section>

            {/* Quick Stats */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-xl shadow-md p-6"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <Heart className="h-10 w-10 text-red-500" />
                                <span className="text-3xl font-bold text-slate-900">0</span>
                            </div>
                            <h3 className="text-sm font-medium text-slate-600">Total Donations</h3>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-xl shadow-md p-6"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <TrendingUp className="h-10 w-10 text-blue-500" />
                                <span className="text-3xl font-bold text-slate-900">Rp 0</span>
                            </div>
                            <h3 className="text-sm font-medium text-slate-600">Total Donated</h3>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-xl shadow-md p-6"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <FileText className="h-10 w-10 text-emerald-500" />
                                <span className="text-3xl font-bold text-slate-900">0</span>
                            </div>
                            <h3 className="text-sm font-medium text-slate-600">Campaigns Supported</h3>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white rounded-xl shadow-md p-6"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <Award className="h-10 w-10 text-amber-500" />
                                <span className="text-3xl font-bold text-slate-900">0</span>
                            </div>
                            <h3 className="text-sm font-medium text-slate-600">Certificates</h3>
                        </motion.div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-white rounded-xl shadow-md p-8"
                        >
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">Recent Donations</h2>
                            <div className="text-center py-12">
                                <Heart className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                                <p className="text-slate-600 mb-6">You haven't made any donations yet</p>
                                <Link
                                    href="/campaigns"
                                    className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors"
                                >
                                    Explore Campaigns
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="bg-white rounded-xl shadow-md p-8"
                        >
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">Your Impact</h2>
                            <div className="text-center py-12">
                                <TrendingUp className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                                <p className="text-slate-600 mb-2">Start making a difference today!</p>
                                <p className="text-sm text-slate-500">Your contributions help protect marine life</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </FrontLayout>
    );
}
