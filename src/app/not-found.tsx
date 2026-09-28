'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { NotFoundPage } from '../components/pages/NotFoundPage';

export default function GlobalNotFound() {
  const router = useRouter();

  const handleNavigatePage = (page: string, subPage?: string) => {
    let target = '/';
    if (page !== 'home') {
      target = subPage ? `/${page}/${subPage}` : `/${page}`;
    }
    router.push(target);
  };

  return (
    <NotFoundPage
      onNavigateHome={() => router.push('/')}
      onNavigatePage={handleNavigatePage}
    />
  );
}
