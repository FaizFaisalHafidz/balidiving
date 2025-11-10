import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/footer';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Head } from '@inertiajs/react';
import React from 'react';

interface FrontLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function FrontLayout({ 
  children, 
  title = 'Bali Diving', 
  description = 'Marine Conservation Crowdfunding Platform' 
}: FrontLayoutProps) {
  return (
    <LanguageProvider>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="min-h-screen bg-white">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}