import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, CheckCircle2, Phone, Clock, Sparkles, Smartphone, MapPin, Wrench } from 'lucide-react';

interface FloatingWhatsAppButtonProps {
  phoneNumber?: string;
  currentPage?: string;
  currentSubPage?: string;
}

const SERVICE_OPTIONS = [
  'Laptop Repair (Dell / HP / Lenovo)',
  'MacBook & iMac Service',
  'Desktop PC Repair & Upgrade',
  'Printer Repair & Cartridge Refilling',
  'CCTV Camera Installation & AMC',
  'Data Recovery Hard Drive / SSD',
  'Accessories & Spare Parts Inquiry',
  'Free Nagpur Doorstep Pickup'
];

export const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({
  phoneNumber = '917249430043',
  currentPage,
  currentSubPage
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Laptop Repair (Dell / HP / Lenovo)');
  const [customNotes, setCustomNotes] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [pageContext, setPageContext] = useState<{ type: string; title: string; detail: string }>({
    type: 'general',
    title: 'Sharon Infotech Nagpur',
    detail: 'Nagpur IT Service Center'
  });

  // Detect mobile device & page context on mount / route change
  useEffect(() => {
    // Mobile detection check
    const checkMobile = () => {
      const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent || '' : '';
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const isMobileDevice = mobileRegex.test(userAgent) || (typeof window !== 'undefined' && window.innerWidth < 768);
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkMobile);
    }

    // Page Context Detection
    const path = typeof window !== 'undefined' ? window.location.pathname.toLowerCase() : '';
    const activePage = currentPage || (path.split('/')[1] || 'home');
    const activeSub = currentSubPage || (path.split('/')[2] || '');

    if (activePage === 'service-areas' || path.includes('/service-areas/')) {
      const area = activeSub ? activeSub.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Nagpur Localities';
      setPageContext({
        type: 'location',
        title: `Doorstep Service in ${area}`,
        detail: area
      });
    } else if (activePage === 'services' || path.includes('/services/')) {
      const srv = activeSub ? activeSub.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Computer & Laptop Repair';
      setPageContext({
        type: 'service',
        title: `${srv} Service`,
        detail: srv
      });
    } else if (activePage === 'brands' || path.includes('/brands/')) {
      const brand = activeSub ? activeSub.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Laptop Brands';
      setPageContext({
        type: 'brand',
        title: `${brand} Repair Center`,
        detail: brand
      });
    } else if (activePage === 'products' || path.includes('/products')) {
      setPageContext({
        type: 'product',
        title: 'Spare Parts & Refurbished PCs',
        detail: 'Store Products'
      });
    } else if (activePage === 'support' || path.includes('/support')) {
      setPageContext({
        type: 'support',
        title: 'Technical Support & Ticket Tracking',
        detail: 'Support Portal'
      });
    } else {
      setPageContext({
        type: 'general',
        title: 'Sharon Infotech Repair Station',
        detail: 'Nagpur Hub'
      });
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', checkMobile);
      }
    };
  }, [currentPage, currentSubPage]);

  const generateWhatsAppMessage = () => {
    let msg = `Hello Sharon Infotech Nagpur! 👋\n`;

    if (isMobile) {
      msg += `📱 [Sent from Mobile Visitor]\n`;
    }

    if (pageContext.type === 'location') {
      msg += `📍 *Location Inquiry*: I am visiting your website regarding *Doorstep Computer/Laptop Service in ${pageContext.detail}, Nagpur*.\n`;
    } else if (pageContext.type === 'service') {
      msg += `💻 *Service Inquiry*: I need urgent assistance for *${pageContext.detail}* in Nagpur.\n`;
    } else if (pageContext.type === 'brand') {
      msg += `🔧 *Brand Service*: I need repair / spare parts for my *${pageContext.detail}* device.\n`;
    } else if (pageContext.type === 'product') {
      msg += `🛒 *Store Inquiry*: I am looking for genuine spare parts / refurbished laptop prices.\n`;
    } else {
      msg += `I am looking for assistance regarding: *${selectedService}*.\n`;
    }

    if (customNotes.trim()) {
      msg += `\n*Details / Issue*: ${customNotes.trim()}\n`;
    }

    msg += `\nPlease share technician availability, pickup timing, or cost estimate. Thank you!`;
    return msg;
  };

  const handleOpenWhatsApp = (directSend = false) => {
    const text = generateWhatsAppMessage();
    const encodedText = encodeURIComponent(text);
    // On mobile devices, wa.me / api.whatsapp.com opens native WhatsApp app
    const url = `https://wa.me/${phoneNumber}?text=${encodedText}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Mobile Sticky Bottom Action Dock (Visible on Mobile Screens) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 p-2 sm:hidden flex items-center justify-around gap-2 shadow-2xl">
        <a
          href="tel:7249430043"
          className="flex-1 py-2.5 px-2 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white rounded-xl text-center text-xs font-black flex items-center justify-center gap-1.5 shadow-md min-h-[44px]"
        >
          <Phone className="w-4 h-4" />
          <span>Call: 7249430043</span>
        </a>

        <button
          onClick={() => {
            if (isMobile) {
              // On mobile, tap can directly launch pre-filled WhatsApp or open quick panel
              handleOpenWhatsApp(true);
            } else {
              setIsOpen(!isOpen);
            }
          }}
          className="flex-1 py-2.5 px-2 bg-gradient-to-r from-teal-600 via-emerald-600 to-green-600 hover:from-teal-500 hover:to-emerald-500 text-white rounded-xl text-center text-xs font-black flex items-center justify-center gap-1.5 shadow-md min-h-[44px] active:scale-95 transition"
        >
          <MessageCircle className="w-4 h-4 fill-white text-teal-700" />
          <span>1-Tap WhatsApp</span>
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold flex items-center justify-center min-h-[44px]"
          aria-label="Toggle WhatsApp options panel"
        >
          {isOpen ? <X className="w-4 h-4" /> : <Sparkles className="w-4 h-4 text-amber-400" />}
        </button>
      </div>

      {/* Desktop / Floating Chat Container */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-auto">
        {/* Expanded Chat Popup Box */}
        {isOpen && (
          <div className="mb-3 w-80 sm:w-96 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden animate-fade-in text-white backdrop-blur-md">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white text-emerald-700 font-extrabold flex items-center justify-center text-lg shadow-md border-2 border-emerald-300">
                    SI
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full animate-pulse"></span>
                </div>
                <div>
                  <h4 className="font-extrabold text-sm leading-tight flex items-center gap-1.5">
                    Sharon Infotech Support
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-200 fill-emerald-200" />
                  </h4>
                  <p className="text-[11px] text-emerald-100/90 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" /> Responds in ~2 mins
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-emerald-100 hover:bg-emerald-700/50 rounded-lg transition"
                aria-label="Close WhatsApp chat popup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3 bg-slate-900/95 max-h-[70vh] overflow-y-auto text-xs">
              
              {/* Context Badge Banner */}
              <div className="bg-slate-800/90 rounded-xl p-2.5 border border-slate-700/80 shadow-inner flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  {pageContext.type === 'location' ? (
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  ) : pageContext.type === 'mobile' || isMobile ? (
                    <Smartphone className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <Wrench className="w-4 h-4 text-teal-400 shrink-0" />
                  )}
                  <div className="truncate">
                    <span className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                      {isMobile ? 'Mobile Context Detected' : 'Page Context'}
                    </span>
                    <span className="block text-xs font-black text-amber-300 truncate">
                      {pageContext.title}
                    </span>
                  </div>
                </div>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold px-2 py-0.5 rounded-full shrink-0">
                  Auto-Filled
                </span>
              </div>

              {/* Agent welcome message */}
              <div className="bg-slate-800/60 rounded-xl p-2.5 border border-slate-800 text-slate-300 space-y-1">
                <p className="leading-relaxed font-medium">
                  👋 Namaste! Welcome to Sharon Infotech Nagpur.
                </p>
                <p className="text-slate-400 text-[11px]">
                  Your pre-filled message is automatically updated based on your current view. Tap below to send directly via WhatsApp.
                </p>
              </div>

              {/* Service selector chips */}
              <div>
                <span className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  Select Service Option:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {SERVICE_OPTIONS.map((srv) => (
                    <button
                      key={srv}
                      type="button"
                      onClick={() => setSelectedService(srv)}
                      aria-label={`Select service requirement: ${srv}`}
                      className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition border min-h-[44px] ${
                        selectedService === srv
                          ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-900/40'
                          : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      {srv}
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional Custom issue text */}
              <div>
                <label htmlFor="whatsapp-custom-notes" className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Additional Issue Details / Device Model:
                </label>
                <textarea
                  id="whatsapp-custom-notes"
                  rows={2}
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="e.g. HP Pavilion screen broken, Sitabuldi location..."
                  className="w-full bg-slate-950 border border-slate-700/80 text-slate-100 text-xs rounded-xl p-2.5 outline-none focus:border-emerald-500 transition resize-none min-h-[60px]"
                />
              </div>

              {/* Direct Phone fallback */}
              <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80">
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-emerald-400" /> Direct Helpline:
                </span>
                <a href="tel:+917249430043" className="font-mono text-emerald-400 hover:underline font-bold">
                  +91-7249430043
                </a>
              </div>

              {/* Direct WhatsApp trigger button */}
              <button
                onClick={() => handleOpenWhatsApp()}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2 group min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                <span>Start WhatsApp Chat ({isMobile ? 'Mobile 1-Tap' : 'Direct'})</span>
                <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* Main Floating Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hidden sm:flex relative group items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-2xl shadow-emerald-600/40 border border-emerald-400/40 transition-all duration-300 transform hover:scale-105 active:scale-95 min-h-[44px]"
          aria-label="Chat on WhatsApp with Sharon Infotech"
        >
          <span className="relative flex items-center justify-center">
            <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 border-2 border-emerald-700 rounded-full animate-pulse"></span>
          </span>
          <div className="text-left pr-1">
            <span className="block text-[10px] font-semibold text-emerald-100 uppercase tracking-wider leading-none">
              Need Quick Help?
            </span>
            <span className="block text-xs font-black tracking-wide leading-tight text-white mt-0.5">
              Chat on WhatsApp
            </span>
          </div>
        </button>
      </div>
    </>
  );
};

