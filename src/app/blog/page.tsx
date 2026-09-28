'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BlogPage } from '../../components/pages/BlogPage';
import { BookingModal } from '../../components/BookingModal';
import { ServiceMode } from '../../types';

export default function BlogMainPage() {
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
      <BlogPage
        initialSubPage=""
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
