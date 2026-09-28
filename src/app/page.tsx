'use client';

import React, { useState } from 'react';
import { HeroSection } from '../components/HeroSection';
import { BrandPagesSection } from '../components/BrandPagesSection';
import { NagpurLocationSection } from '../components/NagpurLocationSection';
import { ShopStoreSection } from '../components/ShopStoreSection';
import { ServicesGrid } from '../components/ServicesGrid';
import { RepairComparisonGallery } from '../components/RepairComparisonGallery';
import { AiDiagnosticSection } from '../components/AiDiagnosticSection';
import { CostEstimator } from '../components/CostEstimator';
import { LiveTrackerSection } from '../components/LiveTrackerSection';
import { LocationCoverage } from '../components/LocationCoverage';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { TeamTrustSection } from '../components/TeamTrustSection';
import { ReviewsAndFaq } from '../components/ReviewsAndFaq';
import { SeoCrossLinkHub } from '../components/SeoCrossLinkHub';
import { BookingModal } from '../components/BookingModal';
import { useRouter } from 'next/navigation';
import { ServiceMode } from '../types';

export default function HomePage() {
  const router = useRouter();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingMode, setBookingMode] = useState<ServiceMode>('doorstep');
  const [prefillIssue, setPrefillIssue] = useState('');
  const [activeTrackId, setActiveTrackId] = useState('FIX-1093');

  const handleNavigatePage = (page: string, subPage?: string) => {
    let target = '/';
    if (page !== 'home') {
      target = subPage ? `/${page}/${subPage}` : `/${page}`;
    }
    router.push(target);
  };

  const handleOpenBooking = (mode: ServiceMode = 'doorstep', issue = '') => {
    setBookingMode(mode);
    setPrefillIssue(issue);
    setBookingOpen(true);
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-12">
      {/* Hero Section */}
      <HeroSection
        onOpenBooking={(mode) => handleOpenBooking(mode || 'doorstep')}
        onOpenTrackModal={() => {
          setActiveTrackId('FIX-1093');
          const el = document.getElementById('live-tracker-section');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* Brand Direct Links Bar */}
      <BrandPagesSection onNavigatePage={handleNavigatePage} />

      {/* Local Nagpur Locations */}
      <NagpurLocationSection onNavigatePage={handleNavigatePage} />

      {/* Offline Shop & Store Information */}
      <ShopStoreSection onOpenBooking={(mode) => handleOpenBooking(mode || 'instore')} />

      {/* Primary Repair Services Grid */}
      <ServicesGrid
        onNavigatePage={handleNavigatePage}
        onOpenBooking={(mode, issue) => handleOpenBooking(mode || 'doorstep', issue)}
      />

      {/* Repair Comparison & Live Work Showcase */}
      <RepairComparisonGallery onOpenBooking={() => handleOpenBooking('doorstep')} />

      {/* Gemini AI Powered Instant Diagnostic Tool */}
      <AiDiagnosticSection onOpenBooking={(issue) => handleOpenBooking('doorstep', issue)} />

      {/* Interactive Repair Cost Estimator */}
      <CostEstimator onOpenBooking={(issue) => handleOpenBooking('doorstep', issue)} />

      {/* Live Order Repair Tracking Section */}
      <div id="live-tracker-section">
        <LiveTrackerSection
          activeTrackId={activeTrackId}
          onTrackIdChange={(id) => setActiveTrackId(id)}
        />
      </div>

      {/* Nagpur Pincode & Area Coverage Map */}
      <LocationCoverage onNavigatePage={handleNavigatePage} />

      {/* Verified Customer Reviews & Case Studies */}
      <TestimonialsSection />

      {/* Certified Engineers & Trust Indicators */}
      <TeamTrustSection />

      {/* Frequently Asked Questions */}
      <ReviewsAndFaq />

      {/* Comprehensive Internal Linking Hub for SEO */}
      <SeoCrossLinkHub onNavigatePage={handleNavigatePage} />

      {/* Page Specific Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        mode={bookingMode}
        prefillIssue={prefillIssue}
        onClose={() => setBookingOpen(false)}
      />
    </div>
  );
}
