import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About & Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {/* Logo */}
            <div className="mb-4">
              <img 
                src="/images/logo-atb.jpeg" 
                alt="Adopt the Blue" 
                className="h-12 w-auto rounded-full"
              />
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('footer.about.description')}
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  Jl. Bypass Ngurah Rai No.46E, Sanur Kauh, Denpasar Selatan, Bali 80025
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <a href="tel:+62361270791" className="text-gray-400 hover:text-blue-400 transition-colors">
                  +62 361 2707 91
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <a href="mailto:info@borntogive.com" className="text-gray-400 hover:text-blue-400 transition-colors">
                  info@borntogive.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Campaigns & Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="font-sui text-lg font-semibold text-white mb-4">{t('footer.campaigns')}</h4>
            <div className="space-y-3">
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-gray-300">{t('footer.categories')}</h5>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/campaigns?category=education" className="text-gray-400 hover:text-blue-400 transition-colors">
                      {t('footer.category.education')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/campaigns?category=health" className="text-gray-400 hover:text-blue-400 transition-colors">
                      {t('footer.category.health')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/campaigns?category=environment" className="text-gray-400 hover:text-blue-400 transition-colors">
                      {t('footer.category.environment')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/campaigns?category=disaster" className="text-gray-400 hover:text-blue-400 transition-colors">
                      {t('footer.category.disaster')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/campaigns" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                      {t('footer.viewAllCampaigns')} →
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Get Involved */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="font-sui text-lg font-semibold text-white mb-4">{t('footer.getInvolved')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/campaigns/create" className="text-gray-400 hover:text-blue-400 transition-colors">
                  {t('footer.startCampaign')}
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="text-gray-400 hover:text-blue-400 transition-colors">
                  {t('footer.volunteer')}
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-400 hover:text-blue-400 transition-colors">
                  {t('footer.events')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-blue-400 transition-colors">
                  {t('footer.about')}
                </Link>
              </li>
            </ul>

            <div className="pt-4">
              <h5 className="text-sm font-medium text-gray-300 mb-2">{t('footer.resources')}</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/blog" className="text-gray-400 hover:text-blue-400 transition-colors">
                    {t('footer.blog')}
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-400 hover:text-blue-400 transition-colors">
                    {t('footer.faq')}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-blue-400 transition-colors">
                    {t('footer.contact')}
                  </Link>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Newsletter & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="font-sui text-lg font-semibold text-white mb-4">{t('footer.followJourney')}</h4>
            
            <p className="text-gray-400 text-sm">
              {t('footer.stayUpdated')}
            </p>

            {/* Newsletter Form */}
            <form className="space-y-3">
              <input
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm transition-colors"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition-colors"
              >
                {t('footer.subscribe')}
              </button>
            </form>

            {/* Social Media Links */}
            <div>
              <h5 className="text-sm font-medium text-gray-300 mb-3">{t('footer.followUs')}</h5>
              <div className="flex gap-3">
                <a 
                  href="https://www.instagram.com/borntogive" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors group"
                >
                  <Instagram className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                </a>
                <a 
                  href="https://www.facebook.com/borntogive" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors group"
                >
                  <Facebook className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                </a>
                <a 
                  href="https://www.youtube.com/@borntogive" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors group"
                >
                  <Youtube className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Footer with Partner Logos */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Left: Copyright & Company Info */}
            <div className="text-gray-400 text-sm text-center lg:text-left">
              <div className="font-sui font-medium text-white mb-1">{t('footer.copyright')}</div>
              <div className="text-gray-500">{t('footer.padi')}</div>
              <div className="text-gray-500">{t('footer.company')}</div>
            </div>

            {/* Center: Partner Logos */}
            <div className="flex items-center gap-6 flex-wrap justify-center">
              <img 
                src="https://balidiving.com/images/logos/padi-logo.svg" 
                alt="PADI 5 Star" 
                className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
              />
              <img 
                src="https://balidiving.com/images/logos/dan.svg" 
                alt="DAN Partner" 
                className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
              />
              <img 
                src="https://balidiving.com/images/logos/ta.svg" 
                alt="TripAdvisor" 
                className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
              />
              <img 
                src="https://balidiving.com/images/logos/google-rating.svg" 
                alt="Google Rating" 
                className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
              />
              <img 
                src="https://balidiving.com/images/logos/gyg.svg" 
                alt="GetYourGuide" 
                className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
              />
            </div>

            {/* Right: Legal Links */}
            <div className="flex flex-wrap justify-center lg:justify-end gap-4 text-sm">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-blue-400 transition-colors">
                {t('footer.privacy')}
              </Link>
              <Link href="/terms-of-service" className="text-gray-400 hover:text-blue-400 transition-colors">
                {t('footer.terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}