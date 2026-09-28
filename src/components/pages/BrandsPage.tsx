import React, { useState, useEffect, useMemo } from 'react';
import {
  Laptop,
  Monitor,
  ChevronRight,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Phone,
  MessageSquare,
  Wrench,
  Sparkles,
  ArrowRight,
  Search,
  MapPin,
  Navigation,
  ExternalLink,
  HelpCircle,
  Building2,
  Tag,
  Award
} from 'lucide-react';
import {
  BRAND_LIST,
  BRAND_ACTIONS,
  BrandName,
  BrandAction,
  getBrandPages,
  findBrandPageBySlug,
  filterBrandPages,
  GeneratedBrandPage
} from '../../data/brandsPageEngine';
import { ALL_NAGPUR_LOCATIONS } from '../../data/nagpurLocations';

interface BrandsPageProps {
  initialSubPage?: string;
  onOpenBooking: (mode?: 'doorstep' | 'instore', prefill?: string) => void;
  onNavigateHome: () => void;
}

export const BrandsPage: React.FC<BrandsPageProps> = ({
  initialSubPage = 'hp-service-center-dhantoli',
  onOpenBooking,
  onNavigateHome
}) => {
  // Filter States
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [selectedAction, setSelectedAction] = useState<string>('All');
  const [selectedLocality, setSelectedLocality] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active page slug
  const [activeSlug, setActiveSlug] = useState<string>(initialSubPage);

  // Sync initial subpage
  useEffect(() => {
    if (initialSubPage) {
      setActiveSlug(initialSubPage);
    }
  }, [initialSubPage]);

  // Retrieve active brand page object or default
  const activePage: GeneratedBrandPage = useMemo(() => {
    const found = findBrandPageBySlug(activeSlug);
    if (found) return found;

    // Fallback search
    const fallbackList = filterBrandPages({
      brand: selectedBrand !== 'All' ? selectedBrand : undefined,
      action: selectedAction !== 'All' ? selectedAction : undefined,
      locationName: selectedLocality !== 'All' ? selectedLocality : undefined,
      limit: 1
    });

    return fallbackList[0] || getBrandPages()[0];
  }, [activeSlug, selectedBrand, selectedAction, selectedLocality]);

  // Filtered pages for grid/sidebar (24 per view for high speed)
  const filteredGridPages = useMemo(() => {
    return filterBrandPages({
      brand: selectedBrand !== 'All' ? selectedBrand : undefined,
      action: selectedAction !== 'All' ? selectedAction : undefined,
      locationName: selectedLocality !== 'All' ? selectedLocality : undefined,
      searchQuery: searchQuery,
      limit: 24
    });
  }, [selectedBrand, selectedAction, selectedLocality, searchQuery]);

  // Total count matching filters
  const totalMatchingCount = useMemo(() => {
    return filterBrandPages({
      brand: selectedBrand !== 'All' ? selectedBrand : undefined,
      action: selectedAction !== 'All' ? selectedAction : undefined,
      locationName: selectedLocality !== 'All' ? selectedLocality : undefined,
      searchQuery: searchQuery
    }).length;
  }, [selectedBrand, selectedAction, selectedLocality, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      {/* Schema Microdata JSON-LD for Search Engine Indexing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            'name': `${activePage.brand} ${activePage.action} in ${activePage.locationName || 'Nagpur'}`,
            'serviceType': `${activePage.brand} Repair Service`,
            'description': activePage.metaDescription || activePage.h1Title,
            'provider': {
              '@type': ['LocalBusiness', 'ComputerStore'],
              '@id': 'https://computerrepairnagpur.com/#localbusiness',
              'name': 'Sharon Infotech',
              'image': 'https://computerrepairnagpur.com/pwa-512x512.png',
              'telephone': '+91-7249430043',
              'priceRange': '₹₹',
              'hasMap': 'https://maps.app.goo.gl/wwuRxErEFDjFEqTL6',
              'parentOrganization': {
                '@type': 'Organization',
                '@id': 'https://sharoninfotech.com/#organization',
                'name': 'Sharon Infotech',
                'url': 'https://sharoninfotech.com'
              },
              'address': {
                '@type': 'PostalAddress',
                'streetAddress': 'Office No 1, Second Floor, Tilak, Panchasheel Square, near Panchasheel Theatre, Opposite Patrakar Bhawan, Dhantoli',
                'addressLocality': 'Nagpur',
                'addressRegion': 'Maharashtra',
                'postalCode': '440012',
                'addressCountry': 'IN'
              }
            },
            'areaServed': {
              '@type': 'City',
              'name': 'Nagpur'
            },
            'url': `https://computerrepairnagpur.com/brands/${activePage.slug}`
          })
        }}
      />

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Breadcrumb Header */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 flex-wrap">
          <button onClick={onNavigateHome} className="hover:text-blue-400 transition min-h-[32px] flex items-center">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-slate-200 font-bold">Brand Hub</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-blue-400 font-extrabold">{activePage.brand}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-amber-400 font-bold">{activePage.action}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-emerald-400 font-bold">{activePage.locationName}</span>
        </nav>

        {/* Hero Section Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 p-6 sm:p-10 rounded-3xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                <Award className="w-3.5 h-3.5 text-indigo-400" />
                Multi-Brand Laptop Laboratory • Sharon Infotech
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Pincode {activePage.pincode}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              {activePage.h1Title}
            </h1>

            <p className="text-xs sm:text-base text-slate-300 leading-relaxed font-medium max-w-3xl">
              {activePage.tagline}
            </p>

            {/* Quick Action Pills */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="tel:7249430043"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs uppercase tracking-wider transition shadow-lg shadow-blue-600/30 flex items-center gap-2 min-h-[44px]"
              >
                <Phone className="w-4 h-4" />
                <span>Call Hotline: 7249430043</span>
              </a>

              <a
                href={`https://wa.me/917249430043?text=Hi%20Sharon%20Infotech,%20I%20need%20${encodeURIComponent(activePage.brand + ' ' + activePage.action)}%20in%20${encodeURIComponent(activePage.locationName)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider transition flex items-center gap-2 min-h-[44px]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Query</span>
              </a>

              <button
                onClick={() => onOpenBooking('doorstep', `Requesting ${activePage.h1Title}`)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 font-extrabold text-xs uppercase tracking-wider transition flex items-center gap-2 min-h-[44px]"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Book Free Doorstep Service</span>
              </button>
            </div>
          </div>
        </div>

        {/* 1,000+ Brand Pages Filter Console */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-base font-black text-white flex items-center gap-2">
                <Search className="w-4 h-4 text-indigo-400" />
                Search 1,000+ Brand Repair, Support & Customer Care Hubs
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Showing <strong className="text-emerald-400">{totalMatchingCount}</strong> verified brand service pages matching your search
              </p>
            </div>

            {/* Keyword Search Input */}
            <div className="relative w-full md:w-80">
              <label htmlFor="brand-search-input" className="sr-only">Search brand hubs</label>
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                id="brand-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search HP, Dell, MacBook, Customer Care..."
                className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-xs rounded-xl pl-10 pr-4 py-3 outline-none focus:border-indigo-500 font-medium min-h-[44px]"
              />
            </div>
          </div>

          {/* Filter Dropdowns Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            
            {/* Brand Name Filter */}
            <div>
              <label htmlFor="filter-brand-name" className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                1. Select Brand (21+)
              </label>
              <select
                id="filter-brand-name"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-slate-950 text-indigo-300 font-bold text-xs rounded-xl p-3 border border-slate-800 focus:outline-none focus:border-indigo-500 min-h-[44px]"
              >
                <option value="All">All 21 Brands (HP, Dell, Lenovo...)</option>
                {BRAND_LIST.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Action Suffix Filter */}
            <div>
              <label htmlFor="filter-brand-action" className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                2. Role / Service Type
              </label>
              <select
                id="filter-brand-action"
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value)}
                className="w-full bg-slate-950 text-amber-300 font-bold text-xs rounded-xl p-3 border border-slate-800 focus:outline-none focus:border-amber-500 min-h-[44px]"
              >
                <option value="All">All 8 Service Roles (Repair, Care, Center...)</option>
                {BRAND_ACTIONS.map((act) => (
                  <option key={act} value={act}>{act}</option>
                ))}
              </select>
            </div>

            {/* Locality Filter */}
            <div>
              <label htmlFor="filter-brand-locality" className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                3. Nagpur Locality (220+)
              </label>
              <select
                id="filter-brand-locality"
                value={selectedLocality}
                onChange={(e) => setSelectedLocality(e.target.value)}
                className="w-full bg-slate-950 text-emerald-300 font-bold text-xs rounded-xl p-3 border border-slate-800 focus:outline-none focus:border-emerald-500 min-h-[44px]"
              >
                <option value="All">All 220+ Nagpur Localities</option>
                {ALL_NAGPUR_LOCATIONS.map((loc) => (
                  <option key={loc.id} value={loc.name}>{loc.name} (Pincode {loc.pincode})</option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Active Page View Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Left Display */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xl">
            
            {/* Header Title Box */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center shrink-0">
                  <Laptop className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-widest bg-indigo-950 px-2.5 py-0.5 rounded-md border border-indigo-800">
                      {activePage.brand} • {activePage.action}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-400" />
                      {activePage.locationName}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                    {activePage.h1Title}
                  </h2>
                </div>
              </div>

              <div className="bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800 text-right">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Starting Price</span>
                <span className="text-xl font-black text-emerald-400">{activePage.startingPrice}</span>
              </div>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Turnaround Time</span>
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400" />
                  {activePage.avgTime}
                </span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Warranty Coverage</span>
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  {activePage.warranty}
                </span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Spare Parts</span>
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  100% Original OEM {activePage.brand}
                </span>
              </div>
            </div>

            {/* Popular Supported Models */}
            <div className="space-y-3 bg-slate-950/70 p-5 rounded-2xl border border-slate-800">
              <h3 className="text-xs font-extrabold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-amber-400" />
                Popular Supported {activePage.brand} Series & Models in {activePage.locationName}:
              </h3>
              <div className="flex flex-wrap gap-2">
                {activePage.popularModels.map((model, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-bold">
                    {model}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Features List */}
            <div className="space-y-4">
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                Key Services Provided for {activePage.brand} in {activePage.locationName}:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activePage.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-200 font-semibold">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Description */}
            <div className="space-y-3 bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80">
              <h3 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-blue-400" />
                About Sharon Infotech {activePage.brand} {activePage.action} ({activePage.locationName}, Nagpur)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line font-medium">
                {activePage.description}
              </p>
            </div>

            {/* Google Map Section */}
            <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400 animate-bounce" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Sharon Infotech Dhantoli HQ Map</h4>
                    <p className="text-[10px] text-slate-400">Panchasheel Square, near Panchasheel Theatre, Nagpur 440012</p>
                  </div>
                </div>

                <a
                  href="https://maps.app.goo.gl/wwuRxErEFDjFEqTL6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-[11px] rounded-xl transition flex items-center gap-1 min-h-[36px]"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="rounded-xl overflow-hidden border border-slate-800 h-64 relative">
                <iframe
                  title={`Sharon Infotech Google Location Map for ${activePage.h1Title}`}
                  src="https://maps.google.com/maps?q=Sharon%20Infotech%2C%20Panchasheel%20Square%2C%20Dhantoli%2C%20Nagpur&t=&z=17&ie=UTF8&iwloc=B&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>

            {/* FAQs Accordion Cards */}
            <div className="space-y-4">
              <h3 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-400" />
                Frequently Asked Questions ({activePage.brand} - {activePage.locationName}):
              </h3>
              <div className="space-y-3">
                {activePage.faqList.map((faq, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5">
                    <p className="text-xs font-bold text-amber-300 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-950 text-amber-400 text-[10px] flex items-center justify-center font-black">Q</span>
                      {faq.question}
                    </p>
                    <p className="text-xs text-slate-300 pl-7 leading-relaxed font-medium">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => onOpenBooking('doorstep', `Requesting ${activePage.h1Title}`)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-blue-600/30 transition flex items-center justify-center gap-2 min-h-[44px]"
              >
                <Phone className="w-4 h-4" />
                <span>Book Doorstep Service Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/917249430043?text=Hi%20Sharon%20Infotech,%20I%20am%20interested%20in%20${encodeURIComponent(activePage.h1Title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 min-h-[44px]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Query</span>
              </a>
            </div>

          </div>

          {/* Right Sidebar - Directory Matrix Explorer */}
          <div className="space-y-6">
            
            {/* Call Center Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Phone className="w-4 h-4" />
                <span>Immediate Brand Support</span>
              </div>
              <h3 className="text-lg font-black text-white">
                {activePage.brand} Laptop Issue in {activePage.locationName}?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Our technicians carry original {activePage.brand} screens, batteries, keyboards, and chargers for immediate on-site replacement.
              </p>

              <div className="space-y-2 pt-2">
                <a
                  href="tel:7249430043"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 min-h-[44px]"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call 7249430043</span>
                </a>

                <a
                  href="https://maps.app.goo.gl/wwuRxErEFDjFEqTL6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-extrabold text-xs transition flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <Navigation className="w-4 h-4 text-emerald-400" />
                  <span>Get Driving Directions</span>
                </a>
              </div>
            </div>

            {/* Keyword Tags */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-xl">
              <h3 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-amber-400" />
                Brand Search Keywords:
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {activePage.keywords.map((kw, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-slate-950 text-slate-300 border border-slate-800 rounded-lg text-[10px] font-semibold">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Matching Pages Directory Explorer */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-indigo-400" />
                  Explore Brand Pages ({filteredGridPages.length})
                </h3>
              </div>

              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {filteredGridPages.map((pg) => {
                  const isSelected = pg.slug === activePage.slug;
                  return (
                    <button
                      key={pg.slug}
                      onClick={() => setActiveSlug(pg.slug)}
                      className={`w-full text-left p-3 rounded-2xl border transition flex items-center justify-between gap-2 min-h-[44px] ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-400 shadow-md scale-[1.02]'
                          : 'bg-slate-950/80 text-slate-300 border-slate-800/80 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      <div className="min-w-0">
                        <span className="block text-xs font-bold truncate">
                          {pg.brand} {pg.action}
                        </span>
                        <span className={`block text-[10px] ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>
                          {pg.locationName} (Pincode {pg.pincode})
                        </span>
                      </div>
                      <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
