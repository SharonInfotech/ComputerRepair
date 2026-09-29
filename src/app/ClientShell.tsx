'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Breadcrumb } from '../components/Breadcrumb';
import { SitemapModal } from '../components/SitemapModal';
import { SeoAuditModal } from '../components/SeoAuditModal';
import { BookingModal } from '../components/BookingModal';
import { ExitIntentModal } from '../components/ExitIntentModal';
import { FloatingWhatsAppButton } from '../components/FloatingWhatsAppButton';
import { SiteSearchModal } from '../components/SiteSearchModal';
import { ServiceMode } from '../types';

interface ClientShellProps {
  children: React.ReactNode;
}

export function ClientShell({ children }: ClientShellProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [sitemapModalOpen, setSitemapModalOpen] = useState(false);
  const [seoAuditModalOpen, setSeoAuditModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [bookingMode, setBookingMode] = useState<ServiceMode>('doorstep');
  const [prefillIssue, setPrefillIssue] = useState('');
  const [activeTrackId, setActiveTrackId] = useState('FIX-1093');

  // Derive currentPage and currentSubPage from pathname
  const pathParts = pathname.replace(/^\/+|\/+$/g, '').split('/');
  const currentPage = pathParts[0] || 'home';
  const currentSubPage = pathParts[1] || '';

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
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white flex flex-col">
      {/* Top Header Navbar */}
      <Navbar
        currentPage={currentPage}
        currentSubPage={currentSubPage}
        onNavigatePage={handleNavigatePage}
        onOpenBooking={(mode) => handleOpenBooking(mode || 'doorstep')}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenTrackModal={() => {
          setActiveTrackId('FIX-1093');
          const el = document.getElementById('live-tracker-section');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            router.push('/#live-tracker-section');
          }
        }}
      />

      {/* Global Breadcrumb Navigation */}
      <Breadcrumb
        currentPage={currentPage}
        currentSubPage={currentSubPage}
        onNavigatePage={handleNavigatePage}
      />

      {/* Main Page Content */}
      <main className="flex-grow">{children}</main>

      {/* Global Footer */}
      <Footer
        onNavigatePage={handleNavigatePage}
        onOpenSitemap={() => setSitemapModalOpen(true)}
        onOpenSeoAudit={() => setSeoAuditModalOpen(true)}
        onOpenBooking={(mode) => handleOpenBooking(mode || 'doorstep')}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {/* Global Interactive Modals */}
      <SiteSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onNavigatePage={handleNavigatePage}
      />

      <SitemapModal
        isOpen={sitemapModalOpen}
        onClose={() => setSitemapModalOpen(false)}
        onNavigatePage={handleNavigatePage}
      />

      <SeoAuditModal
        isOpen={seoAuditModalOpen}
        onClose={() => setSeoAuditModalOpen(false)}
        onOpenSitemap={() => {
          setSeoAuditModalOpen(false);
          setSitemapModalOpen(true);
        }}
      />

      <BookingModal
        isOpen={bookingModalOpen}
        mode={bookingMode}
        prefillIssue={prefillIssue}
        onClose={() => setBookingModalOpen(false)}
      />

      <ExitIntentModal
        onOpenBooking={(issue) => handleOpenBooking('doorstep', issue)}
      />

      {/* Floating Call-to-Action Buttons */}
      <FloatingWhatsAppButton
        onOpenBooking={(mode) => handleOpenBooking(mode || 'doorstep')}
      />
    </div>
  );
}
