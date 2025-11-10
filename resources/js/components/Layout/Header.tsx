import { useLanguage } from '@/contexts/LanguageContext';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.events'), href: '/events' },
    { name: t('nav.campaigns'), href: '/campaigns' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'id' : 'en');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <Link href="/" className="flex items-center gap-2">
              <img
                src="https://balidiving.com/images/bali-diving-logo.svg"
                alt="Bali Diving Logo"
                className="h-10 w-auto"
              />
              <span className="font-sui text-xl font-bold text-gray-800 hidden sm:block">
                Bali Diving
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 px-2 py-2 text-sm font-medium transition-colors duration-200"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Language Toggle & CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden lg:flex items-center gap-3"
          >
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 hover:border-blue-500 rounded-full text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              <Globe className="h-4 w-4" />
              <span className="uppercase font-semibold">{language}</span>
            </button>

            <Link
              href="/donate"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-1.5 rounded-full text-sm font-medium transition-colors duration-200"
            >
              {t('nav.donate')}
            </Link>
          </motion.div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Language Toggle Mobile */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded-full text-xs font-semibold text-gray-700"
            >
              <Globe className="h-3.5 w-3.5" />
              <span className="uppercase">{language}</span>
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 p-2"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-gray-200"
            >
              <div className="py-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/donate"
                  className="block mx-4 mt-3 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-center text-sm font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.donate')}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}