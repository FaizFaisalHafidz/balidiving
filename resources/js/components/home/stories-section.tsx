import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface Story {
  id: number;
  title: string;
  description: string;
  image: string;
  href: string;
}

export default function StoriesSection() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const stories: Story[] = [
    {
      id: 1,
      title: 'PADI Aware Foundation',
      description: 'By supporting our initiatives, you contribute to vital ocean conservation efforts, including coral reef restoration, marine debris removal, and protecting endangered species.',
      image: '/images/IMG-20251001-WA0004.jpg',
      href: '/stories/padi-aware-foundation',
    },
    {
      id: 2,
      title: 'Everyday Ocean Protection',
      description: 'Discover how everyday actions by ocean lovers around the world are making a significant impact in marine conservation efforts and protecting our blue planet.',
      image: '/images/event2.jpg',
      href: '/stories/everyday-ocean-protection',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % stories.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + stories.length) % stories.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-white via-slate-50/30 to-cyan-50/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-100/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-100/15 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 tracking-wide">
            <span className="text-slate-800">
              {t('stories.header.title1')}
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-700">
              {t('stories.header.title2')}
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t('stories.header.subtitle')}
          </p>
        </motion.div>

        {/* Stories Slider */}
        <div className="relative max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20"
            >
              {/* Image Section */}
              <motion.div
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative h-64 lg:h-[500px] overflow-hidden"
              >
                <img
                  src={stories[currentSlide].image}
                  alt={stories[currentSlide].title}
                  className="w-full h-full object-cover"
                />
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-transparent to-teal-600/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Floating Elements */}
                <motion.div
                  className="absolute top-8 right-8 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full"
                  animate={{ 
                    y: [0, -10, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <motion.div
                  className="absolute bottom-8 left-8 w-16 h-16 bg-gradient-to-br from-teal-400/30 to-blue-400/30 backdrop-blur-sm rounded-2xl"
                  animate={{ 
                    y: [0, 8, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
              </motion.div>

              {/* Content Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="p-8 lg:p-16 flex items-center relative"
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100/50 to-transparent rounded-bl-3xl" />
                
                <div className="relative z-10">
                  <motion.blockquote
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mb-10"
                  >
                    <h3 className="text-2xl lg:text-3xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-teal-700 bg-clip-text text-transparent">
                      {stories[currentSlide].title}
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                      {stories[currentSlide].description}
                    </p>
                  </motion.blockquote>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        href={stories[currentSlide].href}
                        className="inline-flex items-center bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group relative overflow-hidden"
                      >
                        {/* Shine effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                          initial={{ x: -100 }}
                          whileHover={{ x: 100 }}
                          transition={{ duration: 0.6 }}
                        />
                        <span className="relative z-10">{t('stories.readMore')}</span>
                        <motion.svg
                          className="ml-3 w-5 h-5 relative z-10"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </motion.svg>
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center mt-12 space-x-6">
            <motion.button
              onClick={prevSlide}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="p-4 bg-white/80 backdrop-blur-sm shadow-xl rounded-full hover:bg-white transition-all duration-300 border border-white/20 group"
              disabled={stories.length <= 1}
            >
              <ChevronLeftIcon className="h-6 w-6 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
            </motion.button>
            
            <motion.button
              onClick={nextSlide}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="p-4 bg-white/80 backdrop-blur-sm shadow-xl rounded-full hover:bg-white transition-all duration-300 border border-white/20 group"
              disabled={stories.length <= 1}
            >
              <ChevronRightIcon className="h-6 w-6 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
            </motion.button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-3">
            {stories.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.8 }}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-gradient-to-r from-blue-600 to-teal-600 shadow-lg' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}