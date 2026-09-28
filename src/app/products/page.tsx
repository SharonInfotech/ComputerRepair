'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ProductsPage } from '../../components/pages/ProductsPage';

export default function ProductsMainPage() {
  const router = useRouter();

  return (
    <ProductsPage
      initialSubPage=""
      onNavigateHome={() => router.push('/')}
    />
  );
}
