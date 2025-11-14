import { useLanguage } from '@/contexts/LanguageContext';
import FrontLayout from '@/layouts/front-layout';
import { Head, Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Filter, Search, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

interface Campaign {
    id: number;
    title: string;
    slug: string;
    description: string;
    image: string;
    raised: number;
    raisedFormatted: string;
    target: number;
    targetFormatted: string;
    progress: number;
    daysLeft: number;
    category: string;
    fundraiser: string;
    href: string;
}

interface Category {
    id: number;
    nama: string;
    deskripsi: string;
}

interface CampaignsIndexProps {
    campaigns: {
        data: Campaign[];
        links: any[];
        current_page: number;
        last_page: number;
    };
    categories: Category[];
    filters: {
        search: string;
        category: string;
        sort: string;
    };
}

function CampaignsContent({ campaigns, categories, filters }: CampaignsIndexProps) {
    const { t } = useLanguage();
    const [search, setSearch] = useState(filters.search);
    const [selectedCategory, setSelectedCategory] = useState(filters.category);
    const [sortBy, setSortBy] = useState(filters.sort);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/campaigns', { search, category: selectedCategory, sort: sortBy }, { preserveState: true });
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        router.get('/campaigns', { search, category, sort: sortBy }, { preserveState: true });
    };

    const handleSortChange = (sort: string) => {
        setSortBy(sort);
        router.get('/campaigns', { search, category: selectedCategory, sort }, { preserveState: true });
    };

    return (
        <>
            <Head title={t('campaigns.page.title')} />

            {/* Hero Section - Modern dark design */}
            <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
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
                        className="text-center text-white"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            {t('campaigns.page.title')}
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto">
                            {t('campaigns.page.description')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filters Section - Modern sticky bar */}
            <section className="bg-white border-b border-slate-200 sticky top-20 z-40 shadow-md">
                <div className="container mx-auto px-4 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        {/* Search */}
                        <div className="md:col-span-5">
                            <form onSubmit={handleSearch} className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder={t('campaigns.search.placeholder')}
                                    className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </form>
                        </div>

                        {/* Category Filter */}
                        <div className="md:col-span-4">
                            <div className="relative">
                                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => handleCategoryChange(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                >
                                    <option value="all">{t('campaigns.filter.allCategories')}</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.nama}>
                                            {category.nama}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Sort By */}
                        <div className="md:col-span-3">
                            <div className="relative">
                                <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <select
                                    value={sortBy}
                                    onChange={(e) => handleSortChange(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                >
                                    <option value="recent">{t('campaigns.sort.recent')}</option>
                                    <option value="popular">{t('campaigns.sort.popular')}</option>
                                    <option value="ending">{t('campaigns.sort.ending')}</option>
                                    <option value="goal">{t('campaigns.sort.goal')}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Campaigns Grid - Clean modern design */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4">
                    {campaigns.data.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="text-slate-300 text-6xl mb-4">🔍</div>
                            <h3 className="text-2xl font-bold text-slate-700 mb-2">{t('campaigns.noResults')}</h3>
                            <p className="text-slate-600">{t('campaigns.noResults.desc')}</p>
                        </div>
                    ) : (
                        <>
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    visible: { transition: { staggerChildren: 0.1 } },
                                }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                            >
                                {campaigns.data.map((campaign) => (
                                    <motion.div
                                        key={campaign.id}
                                        variants={{
                                            hidden: { opacity: 0, y: 50 },
                                            visible: { opacity: 1, y: 0 },
                                        }}
                                        whileHover={{ y: -5 }}
                                        className="group"
                                    >
                                        <Link href={campaign.href}>
                                            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                                                {/* Campaign Image */}
                                                <div className="relative overflow-hidden h-48">
                                                    <img
                                                        src={campaign.image}
                                                        alt={campaign.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                                                    
                                                    {/* Progress Badge */}
                                                    <div className="absolute top-4 right-4 bg-white rounded-lg px-3 py-1 text-sm font-bold text-blue-600 shadow-md">
                                                        {campaign.progress}%
                                                    </div>

                                                    {/* Days Left Badge */}
                                                    <div className="absolute bottom-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-lg text-sm font-medium shadow-md">
                                                        {campaign.daysLeft} {t('campaigns.daysLeft')}
                                                    </div>
                                                </div>

                                                {/* Campaign Content */}
                                                <div className="p-6 flex-1 flex flex-col">
                                                    <div className="text-sm text-blue-600 font-semibold mb-2">
                                                        {campaign.category}
                                                    </div>
                                                    
                                                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                                                        {campaign.title}
                                                    </h3>
                                                    
                                                    <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-1">
                                                        {campaign.description}
                                                    </p>

                                                    {/* Progress Bar */}
                                                    <div className="mb-4">
                                                        <div className="bg-slate-100 rounded-full h-2 overflow-hidden">
                                                            <div
                                                                className="h-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-500"
                                                                style={{ width: `${campaign.progress}%` }}
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Funding Info */}
                                                    <div className="flex justify-between items-center text-sm">
                                                        <span className="text-slate-900 font-bold">
                                                            {campaign.raisedFormatted}
                                                        </span>
                                                        <span className="text-slate-500">
                                                            {t('campaigns.of')} {campaign.targetFormatted}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Pagination - Modern design */}
                            {campaigns.last_page > 1 && (
                                <div className="mt-12 flex justify-center gap-2">
                                    {campaigns.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            preserveState
                                            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                                                link.active
                                                    ? 'bg-slate-900 text-white shadow-md'
                                                    : 'bg-white text-slate-700 hover:bg-slate-100 shadow-sm'
                                            } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </>
    );
}

export default function CampaignsIndex(props: CampaignsIndexProps) {
    return (
        <FrontLayout
            title={`Jelajahi Kampanye - Adopt the Blue`}
            description="Dukung proyek konservasi laut yang bermakna dan buat perbedaan nyata"
        >
            <CampaignsContent {...props} />
        </FrontLayout>
    );
}
