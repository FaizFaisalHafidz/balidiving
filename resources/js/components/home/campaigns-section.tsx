import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

interface Campaign {
  id: number;
  title: string;
  description: string;
  image: string;
  raised: number;
  raisedFormatted: string;
  target: number;
  targetFormatted: string;
  progress: number;
  daysLeft: number;
  href: string;
  category?: string;
  fundraiser?: string;
}

interface CampaignsSectionProps {
  campaigns: Campaign[];
}

export default function CampaignsSection({ campaigns }: CampaignsSectionProps) {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99] as [number, number, number, number],
      },
    },
  };

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Minimal Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/40 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tl from-slate-200/40 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header - More compact and modern */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900">
              {t('campaigns.header.title1')} <span className="text-blue-600">{t('campaigns.header.title2')}</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              {t('campaigns.header.description')}
            </p>
          </motion.div>
        </div>

        {/* Campaigns Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {campaigns.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group h-full"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-slate-200 h-full flex flex-col">
                {/* Campaign Image */}
                <div className="relative overflow-hidden h-48">
                  <motion.img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                  
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  
                  {/* Clean progress badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                    <span className="text-sm font-bold text-slate-900">{campaign.progress}%</span>
                  </div>

                  {/* Days Left Badge */}
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                      {campaign.daysLeft} {t('campaigns.daysLeft')}
                    </span>
                  </div>
                </div>

                {/* Campaign Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    <Link href={campaign.href}>{campaign.title}</Link>
                  </h3>
                  
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed flex-1">
                    {campaign.description}
                  </p>

                  {/* Progress Bar - More minimal */}
                  <div className="mb-4">
                    <div className="bg-slate-100 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="h-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${campaign.progress}%` }}
                        transition={{ duration: 1.5, delay: 0.3 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>

                  {/* Funding Info */}
                  <div className="flex justify-between items-baseline mb-6 text-sm">
                    <div>
                      <span className="text-slate-900 font-bold text-xl">
                        {campaign.raisedFormatted}
                      </span>
                      <span className="text-slate-500 text-xs ml-1">raised</span>
                    </div>
                    <span className="text-slate-500">
                      {t('campaigns.of')} {campaign.targetFormatted}
                    </span>
                  </div>

                  {/* Donate Button - More professional */}
                  <Link
                    href={`${campaign.href}/donate`}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 text-center block group-hover:bg-blue-600"
                  >
                    {t('campaigns.donateNow')}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button - More modern */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/campaigns"
            className="inline-flex items-center bg-slate-900 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            {t('campaigns.viewAll')}
            <motion.svg 
              className="ml-3 w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}