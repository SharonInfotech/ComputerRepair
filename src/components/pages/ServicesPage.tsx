import React, { useState, useEffect, useMemo } from 'react';
import {
  Laptop,
  Monitor,
  Printer,
  Camera,
  HardDrive,
  Network,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronRight,
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
  Tag
} from 'lucide-react';
import {
  SERVICE_CATEGORIES,
  SERVICE_ACTIONS,
  ServiceCategory,
  ServiceAction,
  getServicePages,
  findServicePageBySlug,
  filterServicePages,
  GeneratedServicePage
} from '../../data/servicesPageEngine';
import { ALL_NAGPUR_LOCATIONS } from '../../data/nagpurLocations';

interface ServicesPageProps {
  initialSubPage?: string;
  onOpenBooking: (mode?: 'doorstep' | 'instore', prefill?: string) => void;
  onNavigateHome: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  initialSubPage = 'laptop-repair-center-dhantoli',
  onOpenBooking,
  onNavigateHome
}) => {
  // State for search and filters
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedAction, setSelectedAction] = useState<string>('All');
  const [selectedLocality, setSelectedLocality] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Active page slug
  const [activeSlug, setActiveSlug] = useState<string>(initialSubPage);

  // Synchronize initial page slug
  useEffect(() => {
    if (initialSubPage) {
      setActiveSlug(initialSubPage);
    }
  }, [initialSubPage]);

  // Retrieve active service page or default to first matching
  const activePage: GeneratedServicePage = useMemo(() => {
    const found = findServicePageBySlug(activeSlug);
    if (found) return found;

    // Fallback: search by category/action or pick first
    const fallbackList = filterServicePages({
      category: selectedCategory !== 'All' ? selectedCategory : undefined,
      action: selectedAction !== 'All' ? selectedAction : undefined,
      locationName: selectedLocality !== 'All' ? selectedLocality : undefined,
      limit: 1
    });

    return fallbackList[0] || getServicePages()[0];
  }, [activeSlug, selectedCategory, selectedAction, selectedLocality]);

  // Filtered pages for matrix grid (limited to 24 for high speed)
  const filteredGridPages = useMemo(() => {
    return filterServicePages({
      category: selectedCategory !== 'All' ? selectedCategory : undefined,
      action: selectedAction !== 'All' ? selectedAction : undefined,
      locationName: selectedLocality !== 'All' ? selectedLocality : undefined,
      searchQuery: searchQuery,
      limit: 24
    });
  }, [selectedCategory, selectedAction, selectedLocality, searchQuery]);

  // Get total matching count
  const totalMatchingCount = useMemo(() => {
    return filterServicePages({
      category: selectedCategory !== 'All' ? selectedCategory : undefined,
      action: selectedAction !== 'All' ? selectedAction : undefined,
      locationName: selectedLocality !== 'All' ? selectedLocality : undefined,
      searchQuery: searchQuery
    }).length;
  }, [selectedCategory, selectedAction, selectedLocality, searchQuery]);

  // Category Icon Mapper
  const getCategoryIcon = (cat: ServiceCategory) => {
    switch (cat) {
      case 'Computer':
        return Monitor;
      case 'Laptop':
        return Laptop;
      case 'Printer':
        return Printer;
      case 'CCTV':
        return Camera;
      case 'Data Recovery':
        return HardDrive;
      case 'Networking':
        return Network;
      case 'IT AMC':
        return ShieldCheck;
      default:
        return Wrench;
    }
  };

  const ActiveIcon = getCategoryIcon(activePage.category);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      {/* Schema Microdata JSON-LD for Search Indexing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            'name': activePage.h1Title,
            'serviceType': `${activePage.category} ${activePage.action} Service`,
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
            'url': `https://computerrepairnagpur.com/services/${activePage.slug}`
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
          <span className="text-slate-200 font-bold">Services Directory</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-blue-400 font-extrabold">{activePage.category} {activePage.action}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-amber-400 font-bold">{activePage.locationName}</span>
        </nav>

        {/* Hero Section Banner */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 p-6 sm:p-10 rounded-3xl border border-blue-800/40 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                <Wrench className="w-3.5 h-3.5 text-blue-400" />
                1,000+ Certified Service Hubs • Sharon Infotech Nagpur
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
                href={`https://wa.me/917249430043?text=Hi%20Sharon%20Infotech,%20I%20am%20in%20${encodeURIComponent(activePage.locationName)}%20and%20need%20${encodeURIComponent(activePage.category + ' ' + activePage.action)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider transition flex items-center gap-2 min-h-[44px]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Query</span>
              </a>

              <button
                onClick={() => onOpenBooking('doorstep', `Request from ${activePage.h1Title}`)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 font-extrabold text-xs uppercase tracking-wider transition flex items-center gap-2 min-h-[44px]"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Book Free Doorstep Service</span>
              </button>
            </div>
          </div>
        </div>

        {/* 1,000+ Services Filter & Search Console */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-base font-black text-white flex items-center gap-2">
                <Search className="w-4 h-4 text-blue-400" />
                Search 9,000+ Computer, Laptop, Printer, CCTV, Data, Networking & IT AMC Services in Nagpur
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Showing <strong className="text-emerald-400">{totalMatchingCount}</strong> verified service pages matching your filters
              </p>
            </div>

            {/* Keyword Search Input */}
            <div className="relative w-full md:w-80">
              <label htmlFor="service-search-input" className="sr-only">Search services</label>
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                id="service-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Besa, Dharampeth, Networking, AMC..."
                className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-xs rounded-xl pl-10 pr-4 py-3 outline-none focus:border-blue-500 font-medium min-h-[44px]"
              />
            </div>
          </div>

          {/* Filter Dropdowns Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            
            {/* Category Filter */}
            <div>
              <label htmlFor="filter-service-category" className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                1. Device / Service Category
              </label>
              <select
                id="filter-service-category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-950 text-blue-300 font-bold text-xs rounded-xl p-3 border border-slate-800 focus:outline-none focus:border-blue-500 min-h-[44px]"
              >
                <option value="All">All 7 Service Categories</option>
                {SERVICE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Action Suffix Filter */}
            <div>
              <label htmlFor="filter-service-action" className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                2. Role / Service Type
              </label>
              <select
                id="filter-service-action"
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value)}
                className="w-full bg-slate-950 text-amber-300 font-bold text-xs rounded-xl p-3 border border-slate-800 focus:outline-none focus:border-amber-500 min-h-[44px]"
              >
                <option value="All">All 6 Roles (Repair, Support, Center...)</option>
                {SERVICE_ACTIONS.map((act) => (
                  <option key={act} value={act}>{act}</option>
                ))}
              </select>
            </div>

            {/* Nagpur Locality Filter */}
            <div>
              <label htmlFor="filter-service-locality" className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                3. Nagpur Locality (220+)
              </label>
              <select
                id="filter-service-locality"
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

        {/* Main Selected Page Display Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Left Content */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xl">
            
            {/* Header Title Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center shrink-0">
                  <ActiveIcon className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-widest bg-blue-950 px-2.5 py-0.5 rounded-md border border-blue-800">
                      {activePage.category} • {activePage.action}
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
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Doorstep Pickup</span>
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  Free Pickup in {activePage.locationName}
                </span>
              </div>
            </div>

            {/* Features Checklist */}
            <div className="space-y-4">
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Key Services & Features in {activePage.locationName}:
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

            {/* Full SEO Narrative Description */}
            <div className="space-y-3 bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80">
              <h3 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-blue-400" />
                About Sharon Infotech {activePage.category} {activePage.action} ({activePage.locationName}, Nagpur)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line font-medium">
                {activePage.description}
              </p>
            </div>

            {/* Embedded Google Map Component */}
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
                Frequently Asked Questions ({activePage.locationName}):
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

            {/* CTA Buttons Bottom */}
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
            
            {/* Quick Contact Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Phone className="w-4 h-4" />
                <span>Emergency Help Center</span>
              </div>
              <h3 className="text-lg font-black text-white">
                Need Fast On-Site Repair in {activePage.locationName}?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Our technicians carry specialized micro-soldering tools, screens, batteries, and toner cartridges to resolve issues on the spot.
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

            {/* Keyword Tags Badge Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-xl">
              <h3 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-amber-400" />
                Search Keywords:
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
                  <Building2 className="w-4 h-4 text-blue-400" />
                  Explore Directory ({filteredGridPages.length})
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
                          ? 'bg-blue-600 text-white border-blue-400 shadow-md scale-[1.02]'
                          : 'bg-slate-950/80 text-slate-300 border-slate-800/80 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      <div className="min-w-0">
                        <span className="block text-xs font-bold truncate">
                          {pg.category} {pg.action}
                        </span>
                        <span className={`block text-[10px] ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
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
