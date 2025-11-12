import { useLanguage } from '@/contexts/LanguageContext';
import { CalendarDaysIcon, HandRaisedIcon, HeartIcon } from '@heroicons/react/24/outline';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function FeaturedLinks() {
  const { t } = useLanguage();
  
  const links = [
    {
      href: '/campaigns',
      icon: HeartIcon,
      subtitle: t('featured.donate.subtitle'),
      title: t('featured.donate.title'),
      color: 'from-slate-700 to-slate-900',
      hoverColor: 'hover:from-slate-800 hover:to-black',
      iconBg: 'bg-blue-500',
      iconHover: 'group-hover:bg-blue-600',
    },
    {
      href: '#',
      icon: HandRaisedIcon,
      subtitle: t('featured.volunteer.subtitle'),
      title: t('featured.volunteer.title'),
      color: 'from-slate-700 to-slate-900',
      hoverColor: 'hover:from-slate-800 hover:to-black',
      iconBg: 'bg-teal-500',
      iconHover: 'group-hover:bg-teal-600',
    },
    {
      href: '#',
      icon: CalendarDaysIcon,
      subtitle: t('featured.events.subtitle'),
      title: t('featured.events.title'),
      color: 'from-slate-700 to-slate-900',
      hoverColor: 'hover:from-slate-800 hover:to-black',
      iconBg: 'bg-cyan-500',
      iconHover: 'group-hover:bg-cyan-600',
    },
  ];

  return (
    <section className="py-0 -mt-20 relative z-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {links.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <Link
                href={link.href}
                className={`bg-gradient-to-br ${link.color} ${link.hoverColor} text-white p-8 block transition-all duration-300 shadow-2xl hover:shadow-3xl rounded-2xl relative overflow-hidden border border-slate-600/20`}
              >
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <p className="text-sm text-slate-300 mb-2 font-medium tracking-wide uppercase">
                        {link.subtitle}
                      </p>
                      <h3 className="text-2xl font-bold text-white transition-colors">
                        {link.title}
                      </h3>
                    </div>
                    
                    <motion.div 
                      className={`${link.iconBg} ${link.iconHover} p-4 rounded-xl transition-all duration-300 shadow-lg`}
                      whileHover={{ rotate: 5, scale: 1.05 }}
                    >
                      <link.icon className="h-7 w-7 text-white" />
                    </motion.div>
                  </div>
                  
                  {/* Animated Arrow */}
                  <motion.div
                    className="flex items-center text-slate-300 group-hover:text-white transition-colors duration-300 mt-4"
                    initial={{ x: 0 }}
                  >
                    <span className="text-sm font-semibold mr-2">{t('featured.getStarted')}</span>
                    <motion.svg 
                      className="w-5 h-5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </motion.svg>
                  </motion.div>
                </div>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 ${link.iconBg} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}