import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { Breadcrumb } from './components/Breadcrumb';
import { DiagnosticResult, ServiceMode } from './types';

// Lazy loading below-the-fold home page components & modals for 98+ Mobile PageSpeed
const BrandPagesSection = lazy(() => import('./components/BrandPagesSection').then(m => ({ default: m.BrandPagesSection })));
const NagpurLocationSection = lazy(() => import('./components/NagpurLocationSection').then(m => ({ default: m.NagpurLocationSection })));
const ShopStoreSection = lazy(() => import('./components/ShopStoreSection').then(m => ({ default: m.ShopStoreSection })));
const ServicesGrid = lazy(() => import('./components/ServicesGrid').then(m => ({ default: m.ServicesGrid })));
const RepairComparisonGallery = lazy(() => import('./components/RepairComparisonGallery').then(m => ({ default: m.RepairComparisonGallery })));
const AiDiagnosticSection = lazy(() => import('./components/AiDiagnosticSection').then(m => ({ default: m.AiDiagnosticSection })));
const CostEstimator = lazy(() => import('./components/CostEstimator').then(m => ({ default: m.CostEstimator })));
const LiveTrackerSection = lazy(() => import('./components/LiveTrackerSection').then(m => ({ default: m.LiveTrackerSection })));
const LocationCoverage = lazy(() => import('./components/LocationCoverage').then(m => ({ default: m.LocationCoverage })));
const TestimonialsSection = lazy(() => import('./components/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })));
const TeamTrustSection = lazy(() => import('./components/TeamTrustSection').then(m => ({ default: m.TeamTrustSection })));
const ReviewsAndFaq = lazy(() => import('./components/ReviewsAndFaq').then(m => ({ default: m.ReviewsAndFaq })));
const SeoCrossLinkHub = lazy(() => import('./components/SeoCrossLinkHub').then(m => ({ default: m.SeoCrossLinkHub })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));

const SitemapModal = lazy(() => import('./components/SitemapModal').then(m => ({ default: m.SitemapModal })));
const SeoAuditModal = lazy(() => import('./components/SeoAuditModal').then(m => ({ default: m.SeoAuditModal })));
const BookingModal = lazy(() => import('./components/BookingModal').then(m => ({ default: m.BookingModal })));
const ExitIntentModal = lazy(() => import('./components/ExitIntentModal').then(m => ({ default: m.ExitIntentModal })));
const FloatingWhatsAppButton = lazy(() => import('./components/FloatingWhatsAppButton').then(m => ({ default: m.FloatingWhatsAppButton })));
const SiteSearchModal = lazy(() => import('./components/SiteSearchModal').then(m => ({ default: m.SiteSearchModal })));

// React Lazy Loading for Sub-Page Components to optimize initial bundle size & load speed
const ServicesPage = lazy(() => import('./components/pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const BrandsPage = lazy(() => import('./components/pages/BrandsPage').then(m => ({ default: m.BrandsPage })));
const ProductsPage = lazy(() => import('./components/pages/ProductsPage').then(m => ({ default: m.ProductsPage })));
const SupportPage = lazy(() => import('./components/pages/SupportPage').then(m => ({ default: m.SupportPage })));
const ServiceAreasPage = lazy(() => import('./components/pages/ServiceAreasPage').then(m => ({ default: m.ServiceAreasPage })));
const BlogPage = lazy(() => import('./components/pages/BlogPage').then(m => ({ default: m.BlogPage })));
const AboutUsPage = lazy(() => import('./components/pages/AboutUsPage').then(m => ({ default: m.AboutUsPage })));
const ContactPage = lazy(() => import('./components/pages/ContactPage').then(m => ({ default: m.ContactPage })));
const NotFoundPage = lazy(() => import('./components/pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

// Loading Fallback Component for Suspense
const PageFallback = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-slate-950 text-slate-300">
    <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-3"></div>
    <p className="text-xs font-semibold text-slate-400 animate-pulse">Loading Sharon Infotech Page...</p>
  </div>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [currentSubPage, setCurrentSubPage] = useState<string>('');
  
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [sitemapModalOpen, setSitemapModalOpen] = useState(false);
  const [seoAuditModalOpen, setSeoAuditModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingMode, setBookingMode] = useState<ServiceMode>('doorstep');
  const [prefillIssue, setPrefillIssue] = useState('');
  const [activeTrackId, setActiveTrackId] = useState('FIX-1093');

  // Keyboard shortcut (⌘K / Ctrl+K) for opening Site Search Modal anywhere
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Initial URL pathname routing on load & popstate event listener for back/forward browser buttons
  useEffect(() => {
    const syncRouteFromUrl = () => {
      // Check for Sitelinks Searchbox URL parameter (?q=term or ?s=term or ?search=term)
      const urlParams = new URLSearchParams(window.location.search);
      const q = urlParams.get('q') || urlParams.get('s') || urlParams.get('search');
      if (q) {
        setSearchQuery(q);
        setSearchModalOpen(true);
      }

      const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
      if (!path) {
        setCurrentPage('home');
        setCurrentSubPage('');
        return;
      }

      const validPages = ['services', 'brands', 'products', 'support', 'service-areas', 'blog', 'about', 'contact', '404'];
      const parts = path.split('/');
      const mainRoute = parts[0]?.toLowerCase();
      const subRoute = parts[1] || '';

      if (validPages.includes(mainRoute)) {
        setCurrentPage(mainRoute);
        setCurrentSubPage(subRoute);
      } else {
        setCurrentPage('404');
        setCurrentSubPage('');
        if (window.location.pathname !== '/404') {
          window.history.replaceState({ page: '404' }, '', '/404');
        }
      }
    };

    syncRouteFromUrl();

    window.addEventListener('popstate', syncRouteFromUrl);
    return () => {
      window.removeEventListener('popstate', syncRouteFromUrl);
    };
  }, []);

  // Dynamic Canonical Link, OpenGraph URL, SEO Title, Description & Keywords Management
  useEffect(() => {
    let canonicalPath = '';
    let pageTitle = 'Sharon Infotech - #1 Local Computer, Laptop & Printer Repair Service in Nagpur (Since 2013)';
    let pageMetaDesc = "Official website for Sharon Infotech - Nagpur's premier computer, laptop chip-level repair, printer service, CCTV installation, data recovery, and IT support center since 2013. Store: Office No 1, 2nd Floor, Tilak, Panchasheel Square, Dhantoli, Nagpur 440012.";
    let pageMetaKeywords = 'Sharon Infotech Nagpur, Computer Repair Nagpur, Laptop Repair Nagpur, Printer Repair Nagpur, Computer Repair Dhantoli Nagpur, Panchasheel Square Nagpur';

    if (currentPage === 'home') {
      canonicalPath = '/';
      pageTitle = 'Sharon Infotech - #1 Local Computer, Laptop & Printer Repair Service in Nagpur (Since 2013)';
      pageMetaDesc = "Official website for Sharon Infotech - Nagpur's premier computer, laptop chip-level repair, printer service, CCTV installation, data recovery, and IT support center since 2013. Store: Office No 1, 2nd Floor, Tilak, Panchasheel Square, Dhantoli, Nagpur 440012.";
      pageMetaKeywords = 'Sharon Infotech Nagpur, Computer Repair Nagpur, Laptop Repair Nagpur, Printer Repair Nagpur, Computer Repair Dhantoli Nagpur, Panchasheel Square Nagpur';
    } else {
      const sub = currentSubPage ? `/${currentSubPage}` : '';
      canonicalPath = `/${currentPage}${sub}`;

      if (currentPage === 'service-areas') {
        const areaName = currentSubPage ? currentSubPage.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()) : 'Nagpur';
        pageTitle = `Doorstep Laptop & Computer Repair in ${areaName} | Sharon Infotech Dhantoli HQ`;
        pageMetaDesc = `Free 30-min doorstep laptop & computer pickup in ${areaName}, Nagpur dispatched from Sharon Infotech's single main store at Office No 1, 2nd Floor, Tilak, Panchasheel Square, Dhantoli, Nagpur 440012. Call +91-7249430043.`;
        pageMetaKeywords = `Doorstep Laptop Repair ${areaName}, Computer Repair Pickup ${areaName}, Sharon Infotech Dhantoli Store`;
      } else if (currentPage === 'services') {
        const serviceName = currentSubPage ? currentSubPage.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()) : 'All Services';
        pageTitle = `${serviceName} Service in Nagpur | Sharon Infotech Dhantoli Store`;
        pageMetaDesc = `Best ${serviceName} in Nagpur by Sharon Infotech (Office No 1, 2nd Floor, Tilak, Panchasheel Square, Dhantoli, Nagpur 440012). Certified engineers, original spare parts & free doorstep pickup.`;
        pageMetaKeywords = `${serviceName} Nagpur, Computer Repair Service Dhantoli Nagpur, Sharon Infotech Services`;
      } else if (currentPage === 'brands') {
        const brandName = currentSubPage ? currentSubPage.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()) : 'All Brands';
        pageTitle = `${brandName} Laptop & PC Repair in Nagpur | Sharon Infotech Dhantoli`;
        pageMetaDesc = `Quality ${brandName} laptop & computer repair at Sharon Infotech, Panchasheel Square, Dhantoli, Nagpur 440012. Original screens, batteries, keyboards & logic board repair with warranty.`;
        pageMetaKeywords = `${brandName} Laptop Repair Nagpur, ${brandName} Repair Dhantoli Nagpur, Sharon Infotech`;
      } else if (currentPage === 'products') {
        pageTitle = `Buy Laptop Spare Parts & Refurbished PCs in Nagpur | Sharon Infotech Dhantoli`;
        pageMetaDesc = `Genuine laptop spare parts, SSDs, RAM, screens, batteries, chargers & refurbished laptops at Sharon Infotech, Office No 1, 2nd Floor, Tilak, Panchasheel Square, Dhantoli, Nagpur 440012.`;
        pageMetaKeywords = `Laptop Spare Parts Nagpur, Refurbished Laptops Dhantoli Nagpur, SSD Upgrade Nagpur`;
      } else if (currentPage === 'about') {
        pageTitle = `About Sharon Infotech - Computer & Laptop Repair HQ in Dhantoli, Nagpur`;
        pageMetaDesc = `Sharon Infotech (https://sharoninfotech.com) is Nagpur's premier IT service center operating since 2013 from Panchasheel Square, Dhantoli, Nagpur 440012. Over 12,000+ happy customers.`;
        pageMetaKeywords = `About Sharon Infotech, Best Computer Repair Shop Dhantoli Nagpur, Sharon Infotech HQ`;
      } else if (currentPage === 'contact') {
        pageTitle = `Contact Sharon Infotech Dhantoli Nagpur (440012) | Phone: +91-7249430043`;
        pageMetaDesc = `Visit Sharon Infotech at Office No 1, 2nd Floor, Tilak, Panchasheel Square, near Panchasheel Theatre, Opposite Patrakar Bhawan, Dhantoli, Nagpur 440012. Google Maps: https://maps.app.goo.gl/wwuRxErEFDjFEqTL6 | Call +91-7249430043.`;
        pageMetaKeywords = `Contact Sharon Infotech, Sharon Infotech Dhantoli Address, Panchasheel Square Nagpur Computer Shop`;
      } else if (currentPage === 'support') {
        pageTitle = `Support & Track Repair Ticket | Sharon Infotech Dhantoli Nagpur`;
        pageMetaDesc = `Sharon Infotech customer support portal (Dhantoli HQ, Nagpur 440012). Track live laptop repair status with ticket ID, request warranty claims or book doorstep pickup.`;
        pageMetaKeywords = `Track Repair Ticket Nagpur, Sharon Infotech Support, Laptop Repair Warranty Claim Nagpur`;
      } else if (currentPage === 'blog') {
        pageTitle = `Computer & Laptop Repair Knowledge Blog | Tech Guides | Sharon Infotech`;
        pageMetaDesc = `Read expert computer repair tips, laptop hardware troubleshooting guides, and motherboard chip-level repair insights from Sharon Infotech (Dhantoli, Nagpur 440012).`;
        pageMetaKeywords = `Computer Repair Tips, Laptop Troubleshooting Guide, Motherboard Repair Tutorial, IT Blog Nagpur`;
      } else if (currentPage === '404') {
        pageTitle = `404 Page Not Found | Sharon Infotech Computer Repair Nagpur`;
        pageMetaDesc = `The requested page could not be found. Return to Sharon Infotech home page (Dhantoli, Nagpur 440012) for doorstep laptop repair & computer service.`;
        pageMetaKeywords = `Sharon Infotech, Computer Repair Nagpur`;
      } else {
        const formattedPage = currentPage.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
        const formattedSub = currentSubPage ? currentSubPage.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()) : '';
        pageTitle = `${formattedPage}${formattedSub ? ' - ' + formattedSub : ''} | Sharon Infotech Dhantoli Nagpur`;
      }
    }

    const fullCanonicalUrl = `https://computerrepairnagpur.com${canonicalPath}`;
    document.title = pageTitle;

    // Helper to set or update meta tag
    const setMeta = (selector: string, attrName: string, attrVal: string, content: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Synchronize meta description & keywords
    setMeta('meta[name="description"]', 'name', 'description', pageMetaDesc);
    setMeta('meta[name="keywords"]', 'name', 'keywords', pageMetaKeywords);

    // Enforce Single Authorised Store Geo-Targeting Meta Tags across all routes
    setMeta('meta[name="geo.region"]', 'name', 'geo.region', 'IN-MH');
    setMeta('meta[name="geo.placename"]', 'name', 'geo.placename', 'Dhantoli, Nagpur, Maharashtra 440012');
    setMeta('meta[name="geo.position"]', 'name', 'geo.position', '21.1378;79.0789');
    setMeta('meta[name="ICBM"]', 'name', 'ICBM', '21.1378, 79.0789');
    setMeta('meta[name="google-maps-url"]', 'name', 'google-maps-url', 'https://maps.app.goo.gl/wwuRxErEFDjFEqTL6');

    // Synchronize OpenGraph & Twitter cards
    setMeta('meta[property="og:title"]', 'property', 'og:title', pageTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', pageMetaDesc);
    setMeta('meta[property="og:url"]', 'property', 'og:url', fullCanonicalUrl);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', pageTitle);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', pageMetaDesc);

    // Synchronize canonical link element
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', fullCanonicalUrl);
  }, [currentPage, currentSubPage]);

  const handleNavigatePage = (page: string, subPage: string = '') => {
    setCurrentPage(page);
    setCurrentSubPage(subPage);

    // Update browser URL address bar dynamically via pushState
    const targetPath = page === 'home' ? '/' : `/${page}${subPage ? '/' + subPage : ''}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ page, subPage }, '', targetPath);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (mode: ServiceMode = 'doorstep', issue: string = '') => {
    setBookingMode(mode);
    setPrefillIssue(issue);
    setBookingModalOpen(true);
  };

  const handleNavigateSection = (sectionId: string) => {
    if (currentPage !== 'home') {
      handleNavigatePage('home');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookWithDiagnosis = (diag: DiagnosticResult) => {
    const summary = `AI Diagnosis (${diag.severity} Severity): ${diag.probableCause}. Est. Price: ${diag.estimatedPriceRange.currency}${diag.estimatedPriceRange.min}-${diag.estimatedPriceRange.max}`;
    handleOpenBooking('doorstep', summary);
  };

  const handleBookEstimate = (summary: string, total: number) => {
    const fullSummary = `${summary}. Quoted Total: ₹${total}`;
    handleOpenBooking('doorstep', fullSummary);
  };

  const handleSelectService = (serviceTitle: string) => {
    handleOpenBooking('doorstep', `Required Service: ${serviceTitle}`);
  };

  const handleBookingSuccess = (ticketId: string) => {
    setActiveTrackId(ticketId);
    setBookingModalOpen(false);
    handleNavigatePage('home');
    setTimeout(() => {
      const element = document.getElementById('track-repair');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500 selection:text-white">
        {/* Navigation Header */}
      <Navbar
        currentPage={currentPage}
        currentSubPage={currentSubPage}
        onNavigatePage={handleNavigatePage}
        onOpenBooking={(mode) => handleOpenBooking(mode || 'doorstep')}
        onOpenSearchModal={() => setSearchModalOpen(true)}
        onOpenTrackModal={() => {
          handleNavigatePage('home');
          setTimeout(() => {
            const el = document.getElementById('track-repair');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
      />

      {/* Breadcrumb Navigation Trail for Sub-pages */}
      <Breadcrumb
        currentPage={currentPage}
        currentSubPage={currentSubPage}
        onNavigatePage={handleNavigatePage}
      />

      {/* Dynamic Page Views */}
      <main>
        <Suspense fallback={<PageFallback />}>
          {currentPage === 'home' && (
            <>
              <HeroSection
                onOpenBooking={(mode) => handleOpenBooking(mode || 'doorstep')}
                onNavigateSection={handleNavigateSection}
              />

              <BrandPagesSection
                onOpenBooking={(mode, prefill) => handleOpenBooking(mode || 'doorstep', prefill)}
              />

              <NagpurLocationSection
                onOpenBooking={(mode, prefill) => handleOpenBooking(mode || 'doorstep', prefill)}
                onNavigatePage={handleNavigatePage}
              />

              <ShopStoreSection />

              <ServicesGrid
                onSelectService={handleSelectService}
              />

              <RepairComparisonGallery
                onOpenBooking={(mode, prefill) => handleOpenBooking(mode || 'doorstep', prefill)}
              />

              <AiDiagnosticSection
                onBookWithDiagnosis={handleBookWithDiagnosis}
              />

              <CostEstimator
                onBookEstimate={handleBookEstimate}
              />

              <LiveTrackerSection
                initialTicketId={activeTrackId}
                onOpenBooking={() => handleOpenBooking('doorstep')}
              />

              <LocationCoverage
                onNavigatePage={handleNavigatePage}
                onOpenBooking={(mode, prefill) => handleOpenBooking(mode || 'doorstep', prefill)}
              />

              <TestimonialsSection
                onOpenBooking={(mode, prefill) => handleOpenBooking(mode || 'doorstep', prefill)}
              />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <TeamTrustSection
                  onOpenBooking={(mode, prefill) => handleOpenBooking(mode || 'doorstep', prefill)}
                />
              </div>

              <ReviewsAndFaq />
            </>
          )}

          {currentPage === 'services' && (
            <ServicesPage
              initialSubPage={currentSubPage || 'computer-repair'}
              onOpenBooking={(mode, prefill) => handleOpenBooking(mode || 'doorstep', prefill)}
              onNavigateHome={() => handleNavigatePage('home')}
            />
          )}

          {currentPage === 'brands' && (
            <BrandsPage
              initialSubPage={currentSubPage || 'hp'}
              onOpenBooking={(mode, prefill) => handleOpenBooking(mode || 'doorstep', prefill)}
              onNavigateHome={() => handleNavigatePage('home')}
            />
          )}

          {currentPage === 'products' && (
            <ProductsPage
              initialSubPage={currentSubPage || 'ssd'}
              onNavigateHome={() => handleNavigatePage('home')}
            />
          )}

          {currentPage === 'support' && (
            <SupportPage
              initialSubPage={currentSubPage || 'hp-support'}
              onNavigateHome={() => handleNavigatePage('home')}
              onOpenBooking={(mode, prefill) => handleOpenBooking(mode || 'doorstep', prefill)}
            />
          )}

          {currentPage === 'service-areas' && (
            <ServiceAreasPage
              initialSubPage={currentSubPage || 'dhantoli'}
              onNavigateHome={() => handleNavigatePage('home')}
              onNavigatePage={handleNavigatePage}
              onOpenBooking={(mode, prefill) => handleOpenBooking(mode || 'doorstep', prefill)}
            />
          )}

          {currentPage === 'blog' && (
            <BlogPage
              initialSubPage={currentSubPage || 'how-to-install-windows'}
              onNavigateHome={() => handleNavigatePage('home')}
              onOpenBooking={(mode, prefill) => handleOpenBooking(mode || 'doorstep', prefill)}
            />
          )}

          {currentPage === 'about' && (
            <AboutUsPage
              onNavigateHome={() => handleNavigatePage('home')}
              onOpenBooking={(mode) => handleOpenBooking(mode || 'doorstep')}
            />
          )}

          {currentPage === 'contact' && (
            <ContactPage
              onNavigateHome={() => handleNavigatePage('home')}
            />
          )}

          {(!['home', 'services', 'brands', 'products', 'support', 'service-areas', 'blog', 'about', 'contact'].includes(currentPage)) && (
            <NotFoundPage
              onNavigateHome={() => handleNavigatePage('home')}
              onNavigatePage={handleNavigatePage}
              onOpenBooking={(mode, prefill) => handleOpenBooking(mode || 'doorstep', prefill)}
            />
          )}
        </Suspense>
      </main>

      {/* Quick Navigation, Footer & Modals Lazy Loaded */}
      <Suspense fallback={null}>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SeoCrossLinkHub onNavigatePage={handleNavigatePage} />
        </section>

        <Footer
          onOpenBooking={() => handleOpenBooking('doorstep')}
          onNavigatePage={handleNavigatePage}
          onOpenSitemap={() => setSitemapModalOpen(true)}
          onOpenSeoAudit={() => setSeoAuditModalOpen(true)}
          onOpenSearchModal={() => setSearchModalOpen(true)}
        />

        <BookingModal
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
          defaultMode={bookingMode}
          prefillIssue={prefillIssue}
          onBookingSuccess={handleBookingSuccess}
        />

        <SitemapModal
          isOpen={sitemapModalOpen}
          onClose={() => setSitemapModalOpen(false)}
          onNavigatePage={handleNavigatePage}
        />

        <SeoAuditModal
          isOpen={seoAuditModalOpen}
          onClose={() => setSeoAuditModalOpen(false)}
          onOpenSitemap={() => setSitemapModalOpen(true)}
        />

        <SiteSearchModal
          isOpen={searchModalOpen}
          initialQuery={searchQuery}
          onClose={() => setSearchModalOpen(false)}
          onNavigatePage={handleNavigatePage}
        />

        <FloatingWhatsAppButton currentPage={currentPage} currentSubPage={currentSubPage} />

        <ExitIntentModal
          onClaimFreeDiagnostic={(issue) => handleOpenBooking('doorstep', issue || 'Free Diagnostic Voucher')}
        />
      </Suspense>
    </div>
  );
}
