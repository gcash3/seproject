// src/app/page.tsx
import { Navbar } from '@/components/navbar';
import HeroSection from '@/components/landing-page/hero-section';
import CoursesSection from '@/components/landing-page/courses-section';
import InstructorsSection from '@/components/landing-page/instructors-section';
import FeaturesSection from '@/components/landing-page/features-section';
import PricingSection from '@/components/landing-page/pricing-section';
import CtaSection from '@/components/landing-page/cta-section';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <CoursesSection />
        <InstructorsSection />
        <PricingSection />
        <CtaSection />
      </main>
    </div>
  );
}