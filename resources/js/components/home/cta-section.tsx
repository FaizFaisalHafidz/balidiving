import { useLanguage } from '@/contexts/LanguageContext';
import { PlayIcon } from '@heroicons/react/24/solid';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function CTASection() {
  const { t } = useLanguage();
  
  return (
    <>
      {/* Video CTA Section */}
      <section 
        className="py-32 relative overflow-hidden text-center text-white"
        style={{
          backgroundImage: 'url(/images/parallax6.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">
              {t('cta.video.title1')}
              <br />
              <span className="text-blue-400">{t('cta.video.title2')}</span>
            </h2>
            
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <button className="group relative">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white border-opacity-30 group-hover:bg-opacity-30 transition-all duration-300">
                  <PlayIcon className="h-8 w-8 text-white ml-1" />
                </div>
                <div className="absolute inset-0 rounded-full bg-white bg-opacity-10 scale-110 group-hover:scale-125 transition-transform duration-300" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="bg-blue-600 py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="text-white">
              <h4 className="text-xl font-semibold mb-2">
                {t('cta.bottom.title')}
              </h4>
              <p className="text-blue-100">
                {t('cta.bottom.subtitle')}
              </p>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/volunteer"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-full font-medium transition-all duration-300 whitespace-nowrap"
              >
                {t('cta.bottom.button')}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}