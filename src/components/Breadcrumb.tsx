import React from 'react';
import { Home, ChevronRight, MapPin, Wrench, Award, ShoppingBag, HelpCircle, BookOpen, Users, Phone } from 'lucide-react';

interface BreadcrumbProps {
  currentPage: string;
  currentSubPage?: string;
  onNavigatePage: (page: string, subPage?: string) => void;
}

// Category Title & Icon map
const CATEGORY_MAP: Record<string, { label: string; icon: React.ComponentType<{ className?: string }> }> = {
  services: { label: 'Services', icon: Wrench },
  brands: { label: 'Brand Repairs', icon: Award },
  products: { label: 'Spare Store', icon: ShoppingBag },
  support: { label: 'Support Center', icon: HelpCircle },
  'service-areas': { label: 'Service Areas', icon: MapPin },
  blog: { label: 'Blog & Guides', icon: BookOpen },
  about: { label: 'About Us', icon: Users },
  contact: { label: 'Contact Us', icon: Phone },
};

// Formatting helper for subpage IDs into clean human readable titles
function formatSubPageTitle(currentPage: string, subPage: string): string {
  if (!subPage) return '';

  // Special exact mappings for common slugs
  const mappings: Record<string, string> = {
    // Services
    'computer-repair': 'Desktop PC Repair',
    'laptop-repair': 'Laptop Screen & Hinge Fix',
    'printer-repair': 'Laserjet & Inkjet Service',
    'cctv-setup': 'CCTV Camera & DVR AMC',
    'data-recovery': 'SSD & Hard Disk Data Recovery',
    'chip-level': 'Motherboard Chip-Level BGA',

    // Brands
    'hp': 'HP Laptop Service Center Nagpur',
    'dell': 'Dell Laptop Repair Nagpur',
    'lenovo': 'Lenovo Laptop Service Nagpur',
    'acer': 'Acer Laptop Repair Nagpur',
    'asus': 'ASUS Laptop Repair Nagpur',
    'apple': 'Apple MacBook Service Nagpur',

    // Products
    'ssd': 'NVMe PCIe SSD Upgrades',
    'ram': 'DDR4/DDR5 RAM Upgrades',
    'screen': 'FHD/4K Replacement Screens',
    'battery': 'OEM Laptop Batteries',
    'charger': 'Original Power Adapters',
    'keyboard': 'Backlit Laptop Keyboards',

    // Support
    'hp-support': 'HP Drivers & Support Nagpur',
    'dell-support': 'Dell Support & Diagnostics',
    'lenovo-support': 'Lenovo Service Hotline',
    'acer-support': 'Acer Care Center Nagpur',
    'asus-support': 'ASUS Technical Support',

    // Areas
    'dhantoli': 'Dhantoli (440012)',
    'sitabuldi': 'Sitabuldi (440012)',
    'dharampeth': 'Dharampeth (440010)',
    'sadar': 'Sadar (440001)',
    'ramdaspeth': 'Ramdaspeth (440010)',
    'manish-nagar': 'Manish Nagar (440015)',
    'besa': 'Besa & Beltarodi (440037)',

    // Blog
    'how-to-install-windows': 'How to Install Windows 11',
    'laptop-heating-fix': 'Laptop Overheating Fix Guide',
    'printer-offline-fix': 'Fix Printer Offline Status',
    'ssd-vs-hdd-speed': 'SSD vs HDD Upgrade Guide',
    'data-recovery-tips': 'Data Loss Emergency Tips',
  };

  if (mappings[subPage]) {
    return mappings[subPage];
  }

  // Fallback: convert hyphenated slug to Capital Case
  return subPage
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  currentPage,
  currentSubPage,
  onNavigatePage,
}) => {
  if (currentPage === 'home') return null;

  const catInfo = CATEGORY_MAP[currentPage] || { label: currentPage, icon: Wrench };
  const CategoryIcon = catInfo.icon;
  const subPageTitle = currentSubPage ? formatSubPageTitle(currentPage, currentSubPage) : '';

  // Generate Schema.org JSON-LD BreadcrumbList
  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://computerrepairnagpur.com/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: catInfo.label,
      item: `https://computerrepairnagpur.com/${currentPage}`,
    },
  ];

  if (subPageTitle && currentSubPage) {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 3,
      name: subPageTitle,
      item: `https://computerrepairnagpur.com/${currentPage}/${currentSubPage}`,
    });
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems,
  };

  return (
    <div className="bg-slate-900/90 border-b border-slate-800/80 backdrop-blur-md sticky top-16 z-30 py-2.5 px-4 sm:px-6 lg:px-8">
      {/* Schema.org Breadcrumb Metadata */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-semibold text-slate-300 overflow-x-auto whitespace-nowrap scrollbar-none py-0.5">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 sm:gap-2">
          {/* Home Link */}
          <button
            onClick={() => onNavigatePage('home')}
            className="flex items-center gap-1 text-slate-400 hover:text-blue-400 transition-colors py-1 px-2 rounded-lg hover:bg-slate-800/60"
            title="Return to Sharon Infotech Homepage"
          >
            <Home className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Home</span>
          </button>

          <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />

          {/* Category Link */}
          <button
            onClick={() => onNavigatePage(currentPage)}
            className={`flex items-center gap-1.5 py-1 px-2 rounded-lg transition-colors ${
              !currentSubPage
                ? 'bg-blue-600/20 text-blue-300 font-bold border border-blue-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <CategoryIcon className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span>{catInfo.label}</span>
          </button>

          {/* SubPage Item if applicable */}
          {subPageTitle && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              <span
                className="py-1 px-2 rounded-lg bg-slate-800/80 text-emerald-300 font-bold border border-slate-700/60 truncate max-w-[200px] sm:max-w-xs md:max-w-md"
                title={subPageTitle}
              >
                {subPageTitle}
              </span>
            </>
          )}
        </nav>

        {/* Quick Back to Home CTA */}
        <button
          onClick={() => onNavigatePage('home')}
          className="hidden md:flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition bg-slate-800/40 hover:bg-slate-800 border border-slate-700/50 px-2.5 py-1 rounded-full shrink-0"
        >
          <span>← Back to All Services</span>
        </button>
      </div>
    </div>
  );
};
