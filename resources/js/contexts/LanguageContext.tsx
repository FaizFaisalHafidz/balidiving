import { router, usePage } from '@inertiajs/react';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type Language = 'en' | 'id';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  formatCurrency: (amount: number) => string;
  getCurrencySymbol: () => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.events': 'Events',
    'nav.campaigns': 'Campaigns',
    'nav.donate': 'Donate Now',
    'hero.title.line1': 'Support Marine Conservation',
    'hero.title.line2': 'with Adopt the Blue',
    'hero.subtitle': 'Join our crowdfunding platform to protect ocean life and support community diving projects',
    'hero.search.placeholder': 'Search for campaigns, ocean projects, conservation...',
    'hero.search.button': 'Search',
    'hero.button.campaigns': 'View Campaigns',
    'hero.button.learn': 'Learn More',
    'footer.about.description': "Adopt the Blue is a crowdfunding platform supporting marine conservation and community projects. Together we protect ocean life for future generations.",
    'footer.campaigns': 'Campaigns',
    'footer.categories': 'Categories',
    'footer.category.education': 'Education',
    'footer.category.health': 'Healthcare',
    'footer.category.environment': 'Environment',
    'footer.category.disaster': 'Disaster Relief',
    'footer.viewAll': 'View All Campaigns →',
    'footer.getInvolved': 'Get Involved',
    'footer.startCampaign': 'Start a Campaign',
    'footer.volunteer': 'Become a Volunteer',
    'footer.events': 'Upcoming Events',
    'footer.about': 'About Us',
    'footer.resources': 'Resources',
    'footer.blog': 'Blog & Stories',
    'footer.faq': 'FAQ',
    'footer.contact': 'Contact Us',
    'footer.followJourney': 'Follow Our Journey',
    'footer.stayUpdated': 'Stay updated with our latest campaigns and impact stories.',
    'footer.emailPlaceholder': 'Your email address',
    'footer.subscribe': 'Subscribe',
    'footer.followUs': 'Follow Us',
    'footer.copyright': 'Adopt the Blue. All Rights Reserved.',
    'footer.padi': 'Marine Conservation Platform',
    'footer.company': 'Adopt the Blue Initiative',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'featured.donate.subtitle': 'View our causes',
    'featured.donate.title': 'Donate now',
    'featured.volunteer.subtitle': 'Become a volunteer',
    'featured.volunteer.title': 'Join us now',
    'featured.events.subtitle': 'View our events',
    'featured.events.title': 'Get involved',
    'featured.getStarted': 'Get started',
    'campaigns.header.title1': 'Join a Global',
    'campaigns.header.title2': 'Movement',
    'campaigns.header.description': 'Together, we can create lasting change for our blue planet by uniting one billion Torchbearers—divers, advocates, and everyday explorers—committed to protecting and restoring the underwater world. Be part of the solution and help rebalance the relationship between humanity and nature.',
    'campaigns.daysLeft': 'days left',
    'campaigns.of': 'of',
    'campaigns.donateNow': 'Donate Now',
    'campaigns.viewAll': 'View All Campaigns',
    'stats.successfulProjects': 'Successful Projects',
    'stats.successfulProjects.desc': 'Lives changed through successful campaigns',
    'stats.peopleImpacted': 'People Impacted',
    'stats.peopleImpacted.desc': 'Individuals reached by our global community',
    'stats.totalRaised': 'Total Amount Raised',
    'stats.totalRaised.desc': 'Funds raised for meaningful causes',
    'stats.activeVolunteers': 'Active Volunteers',
    'stats.activeVolunteers.desc': 'Dedicated volunteers making a difference',
    'stats.bottomText.highlight': "Together we're making a difference",
    'stats.bottomText.description': '- Join thousands of compassionate individuals creating positive change around the world',
    'cta.video.title1': 'Making someone smile is the most',
    'cta.video.title2': 'beautiful thing in this world',
    'cta.bottom.title': "Let's start doing your bit for the world",
    'cta.bottom.subtitle': 'Join us as a Volunteer and make a difference today',
    'cta.bottom.button': 'Become a volunteer',
    'stories.header.title1': 'The PADI Blueprint',
    'stories.header.title2': 'for Ocean Action',
    'stories.header.subtitle': 'A Global Plan for Ocean Protection - Discover inspiring stories of change and impact',
    'stories.readMore': 'Read Full Story',
    'events.title': 'Upcoming Events',
    'events.subtitle': 'Join us in our mission to make the world a better place',
    'events.viewAll': 'View All Events',
    'events.learnMore': 'Learn More',
    'partners.title': 'Our Trusted Partners',
    'partners.subtitle': 'Working together with leading organizations to create meaningful impact',
    'common.address': 'Jl. Bypass Ngurah Rai No.46E, South Denpasar, Bali 80025',
    'campaigns.page.title': 'Explore Campaigns',
    'campaigns.page.description': 'Support meaningful ocean conservation projects and make a real difference',
    'campaigns.search.placeholder': 'Search campaigns...',
    'campaigns.filter.allCategories': 'All Categories',
    'campaigns.sort.recent': 'Most Recent',
    'campaigns.sort.popular': 'Most Popular',
    'campaigns.sort.ending': 'Ending Soon',
    'campaigns.sort.goal': 'Highest Goal',
    'campaigns.noResults': 'No campaigns found',
    'campaigns.noResults.desc': 'Try adjusting your search or filters',
    'campaigns.raised': 'raised',
    'auth.login.title': 'Welcome Back',
    'auth.login.description': 'Sign in to continue contributing to save our oceans',
    'auth.login.email': 'Email Address',
    'auth.login.password': 'Password',
    'auth.login.forgotPassword': 'Forgot password?',
    'auth.login.remember': 'Remember me',
    'auth.login.button': 'Sign In',
    'auth.login.noAccount': "Don't have an account?",
    'auth.login.registerNow': 'Register now',
    'auth.register.title': 'Join Us',
    'auth.register.description': 'Register now and start contributing to a better ocean',
    'auth.register.name': 'Full Name',
    'auth.register.name.placeholder': 'Your full name',
    'auth.register.email': 'Email Address',
    'auth.register.email.placeholder': 'email@example.com',
    'auth.register.password': 'Password',
    'auth.register.password.placeholder': 'Minimum 8 characters',
    'auth.register.passwordConfirm': 'Confirm Password',
    'auth.register.passwordConfirm.placeholder': 'Repeat password',
    'auth.register.button': 'Create Account',
    'auth.register.hasAccount': 'Already have an account?',
    'auth.register.loginHere': 'Sign in here',
    'about.hero.badge': 'About Us',
    'about.hero.title1': 'Together Protecting',
    'about.hero.title2': 'Our Oceans',
    'about.hero.description': 'Trusted crowdfunding platform for marine conservation and environmental campaigns in Indonesia',
    'about.stats.totalCampaigns': 'Total Campaigns',
    'about.stats.activeCampaigns': 'Active Campaigns',
    'about.stats.totalDonors': 'Total Donors',
    'about.stats.fundsRaised': 'Funds Raised',
    'about.cta.title': 'Join Us',
    'about.cta.description': 'Start making a difference today. Whether as a donor or fundraiser, every contribution matters.',
    'about.cta.viewCampaigns': 'View Campaigns',
    'about.cta.registerNow': 'Register Now',
  },
  id: {
    'nav.home': 'Beranda',
    'nav.about': 'Tentang',
    'nav.events': 'Acara',
    'nav.campaigns': 'Kampanye',
    'nav.donate': 'Donasi Sekarang',
    'hero.title.line1': 'Dukung Konservasi Laut',
    'hero.title.line2': 'dengan Adopt the Blue',
    'hero.subtitle': 'Bergabunglah dengan platform crowdfunding kami untuk melindungi kehidupan laut dan mendukung proyek komunitas diving',
    'hero.search.placeholder': 'Cari kampanye, proyek laut, konservasi...',
    'hero.search.button': 'Cari',
    'hero.button.campaigns': 'Lihat Kampanye',
    'hero.button.learn': 'Pelajari Lebih Lanjut',
    'footer.about.description': "Adopt the Blue adalah platform crowdfunding untuk mendukung konservasi laut dan proyek komunitas. Bersama-sama kita melindungi kehidupan laut untuk generasi mendatang.",
    'footer.campaigns': 'Kampanye',
    'footer.categories': 'Kategori',
    'footer.category.education': 'Edukasi',
    'footer.category.health': 'Kesehatan',
    'footer.category.environment': 'Lingkungan',
    'footer.category.disaster': 'Bantuan Bencana',
    'footer.viewAll': 'Lihat Semua Kampanye →',
    'footer.getInvolved': 'Mari Terlibat',
    'footer.startCampaign': 'Mulai Kampanye',
    'footer.volunteer': 'Jadi Relawan',
    'footer.events': 'Acara Mendatang',
    'footer.about': 'Tentang Kami',
    'footer.resources': 'Sumber Daya',
    'footer.blog': 'Blog & Cerita',
    'footer.faq': 'FAQ',
    'footer.contact': 'Hubungi Kami',
    'footer.followJourney': 'Ikuti Perjalanan Kami',
    'footer.stayUpdated': 'Dapatkan update kampanye terbaru dan cerita dampak kami.',
    'footer.emailPlaceholder': 'Alamat email Anda',
    'footer.subscribe': 'Berlangganan',
    'footer.followUs': 'Ikuti Kami',
    'footer.copyright': 'Adopt the Blue. Seluruh Hak Cipta Dilindungi.',
    'footer.padi': 'Platform Konservasi Laut',
    'footer.company': 'Adopt the Blue Initiative',
    'footer.privacy': 'Kebijakan Privasi',
    'footer.terms': 'Syarat Layanan',
    'featured.donate.subtitle': 'Lihat kampanye kami',
    'featured.donate.title': 'Donasi sekarang',
    'featured.volunteer.subtitle': 'Jadi relawan',
    'featured.volunteer.title': 'Bergabung sekarang',
    'featured.events.subtitle': 'Lihat acara kami',
    'featured.events.title': 'Mari terlibat',
    'featured.getStarted': 'Mulai sekarang',
    'campaigns.header.title1': 'Bergabung dengan Gerakan',
    'campaigns.header.title2': 'Global',
    'campaigns.header.description': 'Bersama-sama, kita dapat menciptakan perubahan berkelanjutan untuk planet biru kita dengan menyatukan satu miliar Pembawa Obor—penyelam, pendukung, dan penjelajah sehari-hari—yang berkomitmen untuk melindungi dan memulihkan dunia bawah laut. Jadilah bagian dari solusi dan bantu menyeimbangkan kembali hubungan antara manusia dan alam.',
    'campaigns.daysLeft': 'hari lagi',
    'campaigns.of': 'dari',
    'campaigns.donateNow': 'Donasi Sekarang',
    'campaigns.viewAll': 'Lihat Semua Kampanye',
    'stats.successfulProjects': 'Proyek Berhasil',
    'stats.successfulProjects.desc': 'Kehidupan yang berubah melalui kampanye yang berhasil',
    'stats.peopleImpacted': 'Orang Terbantu',
    'stats.peopleImpacted.desc': 'Individu yang dijangkau oleh komunitas global kami',
    'stats.totalRaised': 'Total Dana Terkumpul',
    'stats.totalRaised.desc': 'Dana yang terkumpul untuk tujuan yang bermakna',
    'stats.activeVolunteers': 'Relawan Aktif',
    'stats.activeVolunteers.desc': 'Relawan yang berdedikasi membuat perbedaan',
    'stats.bottomText.highlight': "Bersama kita membuat perbedaan",
    'stats.bottomText.description': '- Bergabunglah dengan ribuan individu penuh kasih yang menciptakan perubahan positif di seluruh dunia',
    'cta.video.title1': 'Membuat seseorang tersenyum adalah hal',
    'cta.video.title2': 'terindah di dunia ini',
    'cta.bottom.title': "Mari mulai melakukan bagian Anda untuk dunia",
    'cta.bottom.subtitle': 'Bergabunglah dengan kami sebagai Relawan dan buat perbedaan hari ini',
    'cta.bottom.button': 'Jadi relawan',
    'stories.header.title1': 'Blueprint PADI',
    'stories.header.title2': 'untuk Aksi Laut',
    'stories.header.subtitle': 'Rencana Global untuk Perlindungan Laut - Temukan cerita inspiratif tentang perubahan dan dampak',
    'stories.readMore': 'Baca Selengkapnya',
    'events.title': 'Acara Mendatang',
    'events.subtitle': 'Bergabunglah dengan kami dalam misi membuat dunia menjadi tempat yang lebih baik',
    'events.viewAll': 'Lihat Semua Acara',
    'events.learnMore': 'Pelajari Lebih Lanjut',
    'partners.title': 'Mitra Terpercaya Kami',
    'partners.subtitle': 'Bekerja sama dengan organisasi terkemuka untuk menciptakan dampak yang bermakna',
    'common.address': 'Jl. Bypass Ngurah Rai No.46E, Sanur Kauh, Denpasar Selatan, Bali 80025',
    'campaigns.page.title': 'Jelajahi Kampanye',
    'campaigns.page.description': 'Dukung proyek konservasi laut yang bermakna dan buat perbedaan nyata',
    'campaigns.search.placeholder': 'Cari kampanye...',
    'campaigns.filter.allCategories': 'Semua Kategori',
    'campaigns.sort.recent': 'Terbaru',
    'campaigns.sort.popular': 'Terpopuler',
    'campaigns.sort.ending': 'Segera Berakhir',
    'campaigns.sort.goal': 'Target Tertinggi',
    'campaigns.noResults': 'Tidak ada kampanye ditemukan',
    'campaigns.noResults.desc': 'Coba sesuaikan pencarian atau filter Anda',
    'campaigns.raised': 'terkumpul',
    'auth.login.title': 'Selamat Datang Kembali',
    'auth.login.description': 'Masuk untuk melanjutkan berkontribusi menyelamatkan laut kita',
    'auth.login.email': 'Alamat Email',
    'auth.login.password': 'Kata Sandi',
    'auth.login.forgotPassword': 'Lupa kata sandi?',
    'auth.login.remember': 'Ingat saya',
    'auth.login.button': 'Masuk',
    'auth.login.noAccount': 'Belum punya akun?',
    'auth.login.registerNow': 'Daftar sekarang',
    'auth.register.title': 'Bergabung Bersama Kami',
    'auth.register.description': 'Daftar sekarang dan mulai berkontribusi untuk laut yang lebih baik',
    'auth.register.name': 'Nama Lengkap',
    'auth.register.name.placeholder': 'Nama lengkap Anda',
    'auth.register.email': 'Alamat Email',
    'auth.register.email.placeholder': 'email@example.com',
    'auth.register.password': 'Kata Sandi',
    'auth.register.password.placeholder': 'Minimal 8 karakter',
    'auth.register.passwordConfirm': 'Konfirmasi Kata Sandi',
    'auth.register.passwordConfirm.placeholder': 'Ulangi kata sandi',
    'auth.register.button': 'Buat Akun',
    'auth.register.hasAccount': 'Sudah punya akun?',
    'auth.register.loginHere': 'Masuk di sini',
    'about.hero.badge': 'Tentang Kami',
    'about.hero.title1': 'Bersama Melindungi',
    'about.hero.title2': 'Lautan Kita',
    'about.hero.description': 'Platform crowdfunding terpercaya untuk kampanye konservasi laut dan lingkungan hidup di Indonesia',
    'about.stats.totalCampaigns': 'Total Kampanye',
    'about.stats.activeCampaigns': 'Kampanye Aktif',
    'about.stats.totalDonors': 'Total Donatur',
    'about.stats.fundsRaised': 'Dana Terkumpul',
    'about.cta.title': 'Bergabunglah dengan Kami',
    'about.cta.description': 'Mulai membuat perbedaan hari ini. Baik sebagai donatur atau fundraiser, setiap kontribusi Anda berarti.',
    'about.cta.viewCampaigns': 'Lihat Kampanye',
    'about.cta.registerNow': 'Daftar Sekarang',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { locale: backendLocale } = usePage().props as any;
  const [language, setLanguageState] = useState<Language>(backendLocale || 'id');

  useEffect(() => {
    if (backendLocale && backendLocale !== language) {
      setLanguageState(backendLocale);
    }
  }, [backendLocale]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    // Send to backend to update session without reloading
    router.post('/locale/switch', { locale: lang }, {
      preserveState: true,
      preserveScroll: true,
      only: [], // Don't reload any props, just update session
    });
  };

  const t = (key: string): string => {
    return (translations[language] as any)[key] || key;
  };

  const formatCurrency = (amount: number): string => {
    return `Rp ${amount.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const getCurrencySymbol = (): string => {
    return 'Rp';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, formatCurrency, getCurrencySymbol }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
