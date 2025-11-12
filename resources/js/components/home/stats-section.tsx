import { useLanguage } from '@/contexts/LanguageContext';
import { CurrencyDollarIcon, HandRaisedIcon, HeartIcon, UsersIcon } from '@heroicons/react/24/outline';
import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  icon: any;
  description: string;
}

interface StatsSectionProps {
  stats: {
    successful_projects: number;
    people_impacted: number;
    total_raised: number;
    total_raised_formatted: string;
    active_volunteers: number;
  };
}

export default function StatsSection({ stats }: StatsSectionProps) {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const statItems: StatItem[] = [
    {
      label: t('stats.successfulProjects'),
      value: stats.successful_projects,
      icon: HeartIcon,
      description: t('stats.successfulProjects.desc')
    },
    {
      label: t('stats.peopleImpacted'),
      value: stats.people_impacted,
      icon: UsersIcon,
      description: t('stats.peopleImpacted.desc')
    },
    {
      label: t('stats.totalRaised'),
      value: stats.total_raised,
      icon: CurrencyDollarIcon,
      description: t('stats.totalRaised.desc')
    },
    {
      label: t('stats.activeVolunteers'),
      value: stats.active_volunteers,
      icon: HandRaisedIcon,
      description: t('stats.activeVolunteers.desc')
    },
  ];

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  function CountUpAnimation({ targetValue, isCurrency }: { targetValue: number; isCurrency?: boolean }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isInView) return;

      const duration = 2500; // 2.5 seconds
      const steps = 60;
      const stepTime = duration / steps;
      const increment = targetValue / steps;

      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= targetValue) {
          setCount(targetValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, stepTime);

      return () => clearInterval(timer);
    }, [isInView, targetValue]);

    // For currency, show formatted string from backend on completion
    if (isCurrency && count === targetValue) {
      return <span>{stats.total_raised_formatted}</span>;
    }

    return <span>{formatNumber(count)}</span>;
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section ref={ref} className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Minimal Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-cyan-400 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {statItems.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="text-center group"
            >
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300">
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-4xl font-bold text-white">
                    <CountUpAnimation 
                      targetValue={stat.value} 
                      isCurrency={index === 2} // Total raised is at index 2
                    />
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-slate-300 mb-2 group-hover:text-white transition-colors">
                  {stat.label}
                </h3>
                
                <p className="text-sm text-slate-400 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            <span className="text-white font-semibold">
              {t('stats.bottomText.highlight')}
            </span>{" "}
            {t('stats.bottomText.description')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}