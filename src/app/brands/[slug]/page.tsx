'use client';

import React, { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { BrandsPage } from '../../../components/pages/BrandsPage';
import { BookingModal } from '../../../components/BookingModal';
import { ServiceMode } from '../../../types';

export default function BrandSlugPage({ params }: { params: Promise<{ slug: string }> }) {
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

  return (
    <div>
      <BrandsPage
        initialSubPage={resolvedParams.slug}
        onOpenBooking={(mode, prefill) => handleOpenBooking(mode || 'doorstep', prefill)}
        onNavigateHome={() => router.push('/')}
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
