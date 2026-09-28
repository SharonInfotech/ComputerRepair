import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { ClientShell } from './ClientShell';

export const metadata: Metadata = {
  title: 'Sharon Infotech - #1 Local Computer, Laptop & Printer Repair Service in Nagpur (Since 2013)',
  description: 'Official website for Sharon Infotech - Nagpur\'s premier computer, laptop chip-level repair, printer service, CCTV installation, data recovery, and IT support center since 2013. Store: Office No 1, 2nd Floor, Tilak, Panchasheel Square, Dhantoli, Nagpur 440012.',
  keywords: 'Sharon Infotech Nagpur, Computer Repair Nagpur, Laptop Repair Nagpur, Computer Repair Dhantoli Nagpur, Printer Repair Nagpur, MacBook Repair Nagpur',
  metadataBase: new URL('https://computerrepairnagpur.com'),
  alternates: {
    canonical: 'https://computerrepairnagpur.com',
  },
  openGraph: {
    title: 'Sharon Infotech - Computer & Laptop Repair Nagpur (Dhantoli HQ)',
    description: 'Official website for Sharon Infotech - Nagpur\'s premier computer, laptop, printer repair, CCTV installation, networking, data recovery, and IT support service provider since 2013. Store: Panchasheel Square, Dhantoli, Nagpur 440012.',
    url: 'https://computerrepairnagpur.com',
    siteName: 'Sharon Infotech Nagpur',
    locale: 'en_IN',
    type: 'website',
  },
  other: {
    'geo.region': 'IN-MH',
    'geo.placename': 'Dhantoli, Nagpur, Maharashtra 440012',
    'geo.position': '21.1378;79.0789',
    'ICBM': '21.1378, 79.0789',
    'google-maps-url': 'https://maps.app.goo.gl/wwuRxErEFDjFEqTL6',
    'business:contact_data:street_address': 'Office No 1, Second Floor, Tilak, Panchasheel Square, near Panchasheel Theatre, Opposite Patrakar Bhawan, Dhantoli',
    'business:contact_data:locality': 'Nagpur',
    'business:contact_data:region': 'Maharashtra',
    'business:contact_data:postal_code': '440012',
    'business:contact_data:country_name': 'India',
    'business:contact_data:phone_number': '+91-7249430043',
    'business:contact_data:website': 'https://sharoninfotech.com',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="antialiased bg-slate-950 text-slate-100">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
