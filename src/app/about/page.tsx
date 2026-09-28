'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AboutUsPage } from '../../components/pages/AboutUsPage';
import { BookingModal } from '../../components/BookingModal';
import { ServiceMode } from '../../types';

export default function AboutPage() {
  const router = useRouter();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingMode, setBookingMode] = useState<ServiceMode>('doorstep');

  const handleOpenBooking = (mode: ServiceMode = 'doorstep') => {
    setBookingMode(mode);
    setBookingOpen(true);
  };

  return (
    <div>
      <AboutUsPage
        onNavigateHome={() => router.push('/')}
        onOpenBooking={(mode) => handleOpenBooking(mode || 'doorstep')}
      />
      <BookingModal
        isOpen={bookingOpen}
        mode={bookingMode}
        onClose={() => setBookingOpen(false)}
      />
    </div>
  );
}
