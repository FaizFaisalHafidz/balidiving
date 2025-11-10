import FrontLayout from '@/layouts/front-layout';
import { Head, Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Calendar,
    Share2,
    User,
    Users
} from 'lucide-react';
import { useState } from 'react';

interface Campaign {
    id: number;
    title: string;
    slug: string;
    description: string;
    image: string;
    raised: number;
    target: number;
    progress: number;
    daysLeft: number;
    start_date: string;
    end_date: string;
    status: string;
    category: {
        id: number;
        name: string;
    };
    fundraiser: {
        id: number;
        name: string;
        photo: string | null;
    };
    donor_count: number;
}

interface Donation {
    id: number;
    donor_name: string;
    amount: number;
    message: string | null;
    created_at: string;
}

interface Comment {
    id: number;
    name: string;
    comment: string;
    created_at: string;
}

interface RelatedCampaign {
    id: number;
    title: string;
    slug: string;
    image: string;
    raised: number;
    target: number;
    progress: number;
    daysLeft: number;
    href: string;
}

interface CampaignShowProps {
    campaign: Campaign;
    donations: Donation[];
    comments: Comment[];
    relatedCampaigns: RelatedCampaign[];
}

export default function CampaignShow({
    campaign,
    donations,
    comments,
    relatedCampaigns,
}: CampaignShowProps) {
    const [activeTab, setActiveTab] = useState<'story' | 'donations' | 'comments'>('story');

    const handleDonateClick = () => {
        // Check if authenticated - will be handled by middleware
        router.get(`/campaigns/${campaign.slug}/donate`);
    };

    return (
        <FrontLayout
            title={`${campaign.title} - Born to Give`}
            description={campaign.description.substring(0, 160)}
        >
            <Head title={campaign.title} />

            {/* Hero Image - Modern dark overlay */}
            <section className="relative h-[400px] md:h-[500px]">
                <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
                
                {/* Breadcrumb */}
                <div className="absolute top-8 left-0 right-0">
                    <div className="container mx-auto px-4">
                        <nav className="flex items-center space-x-2 text-white text-sm">
                            <Link href="/" className="hover:text-blue-300 transition-colors">
                                Home
                            </Link>
                            <span>/</span>
                            <Link href="/campaigns" className="hover:text-blue-300 transition-colors">
                                Campaigns
                            </Link>
                            <span>/</span>
                            <span className="text-blue-300">{campaign.title}</span>
                        </nav>
                    </div>
                </div>
            </section>

            {/* Main Content - Clean background */}
            <section className="py-12 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Title & Category */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="inline-block bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold mb-4">
                                    {campaign.category.name}
                                </div>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                                    {campaign.title}
                                </h1>
                                <div className="flex items-center space-x-4 text-slate-600">
                                    <div className="flex items-center space-x-2">
                                        <User className="w-5 h-5" />
                                        <span>By {campaign.fundraiser.name}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="w-5 h-5" />
                                        <span>{campaign.start_date}</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Tabs - Modern design */}
                            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                                <div className="border-b border-slate-200">
                                    <div className="flex">
                                        <button
                                            onClick={() => setActiveTab('story')}
                                            className={`flex-1 px-6 py-4 font-semibold transition-all ${
                                                activeTab === 'story'
                                                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                            }`}
                                        >
                                            Campaign Story
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('donations')}
                                            className={`flex-1 px-6 py-4 font-semibold transition-all ${
                                                activeTab === 'donations'
                                                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                            }`}
                                        >
                                            Donations ({campaign.donor_count})
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('comments')}
                                            className={`flex-1 px-6 py-4 font-semibold transition-all ${
                                                activeTab === 'comments'
                                                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                            }`}
                                        >
                                            Comments ({comments.length})
                                        </button>
                                    </div>
                                </div>

                                <div className="p-8">
                                    {/* Story Tab */}
                                    {activeTab === 'story' && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                            className="prose max-w-none"
                                        >
                                            <div className="text-slate-700 leading-relaxed whitespace-pre-line">
                                                {campaign.description}
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Donations Tab */}
                                    {activeTab === 'donations' && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-4"
                                        >
                                            {donations.length === 0 ? (
                                                <p className="text-center text-slate-500 py-8">
                                                    No donations yet. Be the first to donate!
                                                </p>
                                            ) : (
                                                donations.map((donation) => (
                                                    <div
                                                        key={donation.id}
                                                        className="border-b border-slate-100 pb-4 last:border-0"
                                                    >
                                                        <div className="flex justify-between items-start mb-2">
                                                            <div className="font-semibold text-slate-900">
                                                                {donation.donor_name}
                                                            </div>
                                                            <div className="text-blue-600 font-bold">
                                                                ${donation.amount.toLocaleString()}
                                                            </div>
                                                        </div>
                                                        {donation.message && (
                                                            <p className="text-slate-600 text-sm mb-2">
                                                                {donation.message}
                                                            </p>
                                                        )}
                                                        <div className="text-xs text-slate-500">
                                                            {donation.created_at}
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </motion.div>
                                    )}

                                    {/* Comments Tab */}
                                    {activeTab === 'comments' && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-6"
                                        >
                                            {comments.length === 0 ? (
                                                <p className="text-center text-slate-500 py-8">
                                                    No comments yet. Be the first to comment!
                                                </p>
                                            ) : (
                                                comments.map((comment) => (
                                                    <div key={comment.id} className="space-y-2">
                                                        <div className="font-semibold text-slate-900">
                                                            {comment.name}
                                                        </div>
                                                        <p className="text-slate-700">
                                                            {comment.comment}
                                                        </p>
                                                        <div className="text-xs text-slate-500">
                                                            {comment.created_at}
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Donation Card */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 space-y-6">
                                {/* Funding Card - Modern clean design */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="bg-white rounded-xl shadow-md p-8 border border-slate-100"
                                >
                                    {/* Amount Raised */}
                                    <div className="mb-6">
                                        <div className="text-4xl font-bold text-slate-900 mb-2">
                                            ${campaign.raised.toLocaleString()}
                                        </div>
                                        <div className="text-slate-600 text-lg">
                                            raised of ${campaign.target.toLocaleString()} goal
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mb-6">
                                        <div className="bg-slate-100 rounded-full h-3 overflow-hidden mb-2">
                                            <div
                                                className="h-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-500"
                                                style={{ width: `${campaign.progress}%` }}
                                            />
                                        </div>
                                        <div className="text-sm text-slate-600">
                                            {campaign.progress}% funded
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="grid grid-cols-2 gap-4 mb-8 pb-6 border-b border-slate-200">
                                        <div>
                                            <div className="flex items-center space-x-2 text-slate-600 mb-1">
                                                <Users className="w-4 h-4" />
                                                <span className="text-sm">Donors</span>
                                            </div>
                                            <div className="text-2xl font-bold text-slate-900">
                                                {campaign.donor_count}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center space-x-2 text-slate-600 mb-1">
                                                <Calendar className="w-4 h-4" />
                                                <span className="text-sm">Days Left</span>
                                            </div>
                                            <div className="text-2xl font-bold text-slate-900">
                                                {campaign.daysLeft}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Donate Button */}
                                    <button
                                        onClick={handleDonateClick}
                                        className="w-full bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white py-4 px-6 rounded-lg font-bold text-lg shadow-md hover:shadow-lg transition-all duration-300 mb-4"
                                    >
                                        Donate Now
                                    </button>

                                    {/* Share Button */}
                                    <button className="w-full border-2 border-slate-200 hover:border-blue-500 text-slate-700 hover:text-blue-600 py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2">
                                        <Share2 className="w-5 h-5" />
                                        <span>Share Campaign</span>
                                    </button>
                                </motion.div>

                                {/* Fundraiser Info */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="bg-white rounded-xl shadow-md p-6 border border-slate-100"
                                >
                                    <h3 className="text-lg font-bold text-slate-900 mb-4">
                                        Campaign Organizer
                                    </h3>
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white font-bold text-xl">
                                            {campaign.fundraiser.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-900">
                                                {campaign.fundraiser.name}
                                            </div>
                                            <div className="text-sm text-slate-600">
                                                Organizer
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Related Campaigns - Modern design */}
                    {relatedCampaigns.length > 0 && (
                        <div className="mt-16">
                            <h2 className="text-3xl font-bold text-slate-900 mb-8">
                                Related Campaigns
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {relatedCampaigns.map((related) => (
                                    <Link key={related.id} href={related.href}>
                                        <motion.div
                                            whileHover={{ y: -5 }}
                                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                                        >
                                            <div className="relative h-48">
                                                <img
                                                    src={related.image}
                                                    alt={related.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute top-4 right-4 bg-white rounded-lg px-3 py-1 text-sm font-bold text-blue-600 shadow-md">
                                                    {related.progress}%
                                                </div>
                                            </div>
                                            <div className="p-6">
                                                <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">
                                                    {related.title}
                                                </h3>
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-slate-900 font-bold">
                                                        ${related.raised.toLocaleString()}
                                                    </span>
                                                    <span className="text-slate-600">
                                                        {related.daysLeft} days left
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </FrontLayout>
    );
}
