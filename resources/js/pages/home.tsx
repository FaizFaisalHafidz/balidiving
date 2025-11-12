import CampaignsSection from '@/components/home/campaigns-section';
import CTASection from '@/components/home/cta-section';
import FeaturedLinks from '@/components/home/featured-links';
import HeroSection from '@/components/home/hero-section';
import PartnersSection from '@/components/home/partners-section';
import StatsSection from '@/components/home/stats-section';
import StoriesSection from '@/components/home/stories-section';
import UpcomingEvents from '@/components/home/upcoming-events';
import FrontLayout from '@/layouts/front-layout';

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
  category: string;
  fundraiser: string;
}

interface Stats {
  successful_projects: number;
  people_impacted: number;
  total_raised: number;
  total_raised_formatted: string;
  active_volunteers: number;
}

interface Event {
  id: number;
  title: string;
  description: string;
  day: string;
  month: string;
  year: string;
  day_name: string;
  start_time: string;
  location?: string;
  slug: string;
  available_slots: number;
}

interface HomeProps {
  campaigns: Campaign[];
  stats: Stats;
  events: Event[];
}

export default function Home({ campaigns, stats, events }: HomeProps) {
  return (
    <FrontLayout 
      title="Adopt the Blue - Marine Conservation Crowdfunding"
      description="Support ocean conservation and diving community projects through Adopt the Blue's crowdfunding platform. Join us in protecting marine life."
    >
      <HeroSection />
      <FeaturedLinks />
      <CampaignsSection campaigns={campaigns} />
      <StatsSection stats={stats} />
      <UpcomingEvents events={events} />
      <StoriesSection />
      <PartnersSection />
      <CTASection />
    </FrontLayout>
  );
}