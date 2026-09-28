'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ContactPage } from '../../components/pages/ContactPage';
import { BookingModal } from '../../components/BookingModal';
import { ServiceMode } from '../../types';

export default function ContactMainPage() {
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
      <ContactPage
        onNavigateHome={() => router.push('/')}
        onOpenBooking={(mode, prefill) => handleOpenBooking(mode || 'doorstep', prefill)}
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
