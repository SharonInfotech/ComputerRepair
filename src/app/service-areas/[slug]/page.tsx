'use client';

import React, { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { ServiceAreasPage } from '../../../components/pages/ServiceAreasPage';
import { BookingModal } from '../../../components/BookingModal';
import { ServiceMode } from '../../../types';

export default function ServiceAreaSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingMode, setBookingMode] = useState<ServiceMode>('doorstep');
  const [prefillIssue, setPrefillIssue] = useState('');

  const handleOpenBooking = (mode: ServiceMode = 'doorstep', issue = '') => {
    setBookingMode(mode);
    setPrefillIssue(issue);
    setBookingOpen(true);
  };

  const handleNavigatePage = (page: string, subPage?: string) => {
    let target = '/';
    if (page !== 'home') {
      target = subPage ? `/${page}/${subPage}` : `/${page}`;
    }
    router.push(target);
  };

  return (
    <div>
      <ServiceAreasPage
        initialSubPage={resolvedParams.slug}
        onOpenBooking={(mode, prefill) => handleOpenBooking(mode || 'doorstep', prefill)}
        onNavigateHome={() => router.push('/')}
        onNavigatePage={handleNavigatePage}
      />
      <BookingModal
        isOpen={bookingOpen}
        mode={bookingMode}
        prefillIssue={prefillIssue}
        onClose={() => setBookingOpen(false)}
      />
    </div>
  );
}
