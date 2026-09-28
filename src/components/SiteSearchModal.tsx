import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Laptop, Wrench, MapPin, ShoppingBag, ExternalLink, Sparkles, HelpCircle, CornerDownLeft } from 'lucide-react';
import { ALL_NAGPUR_LOCATIONS } from '../data/nagpurLocations';

const REPAIR_BRANDS_LIST = [
  { id: 'acer', name: 'Acer' },
  { id: 'acer-predator', name: 'Acer Predator' },
  { id: 'alienware', name: 'Alienware' },
  { id: 'apple', name: 'Apple' },
  { id: 'asus', name: 'Asus' },
  { id: 'zenbook', name: 'ZenBook' },
  { id: 'vivobook', name: 'VivoBook' },
  { id: 'jiobook', name: 'JioBook' },
  { id: 'macbook', name: 'MacBook' },
  { id: 'asus-rog', name: 'Asus ROG' },
  { id: 'compaq', name: 'Compaq' },
  { id: 'dell', name: 'Dell' },
  { id: 'dell-inspiron', name: 'Dell Inspiron' },
  { id: 'dell-latitude', name: 'Dell Latitude' },
  { id: 'fujitsu', name: 'Fujitsu' },
  { id: 'hp', name: 'HP' },
  { id: 'hp-probook', name: 'HP ProBook' },
  { id: 'gateway', name: 'Gateway' },
  { id: 'chromebook', name: 'Chromebook' },
  { id: 'huawei', name: 'Huawei' },
  { id: 'lenovo', name: 'Lenovo' },
  { id: 'lenovo-ideapad', name: 'Lenovo Ideapad' },
  { id: 'lenovo-thinkpad', name: 'Lenovo ThinkPad' },
  { id: 'lenovo-legion', name: 'Lenovo Legion' },
  { id: 'microsoft-surface', name: 'Microsoft Surface' },
  { id: 'msi', name: 'MSI' },
  { id: 'msi-gaming', name: 'MSI Gaming' },
  { id: 'samsung', name: 'Samsung' },
  { id: 'sony', name: 'Sony' },
  { id: 'sony-vaio', name: 'Sony Vaio' },
  { id: 'toshiba', name: 'Toshiba' },
  { id: 'toshiba-satellite', name: 'Toshiba Satellite' }
];

interface SiteSearchModalProps {
  isOpen: boolean;
  initialQuery?: string;
  onClose: () => void;
  onNavigatePage: (page: string, subPage?: string) => void;
}

interface SearchResultItem {
  id: string;
  type: 'service' | 'brand' | 'product' | 'location' | 'blog' | 'support';
  title: string;
  category: string;
  description: string;
  page: string;
  subPage?: string;
  badge?: string;
}

const STATIC_SERVICES: SearchResultItem[] = [
  { id: 'srv-comp', type: 'service', title: 'Desktop Computer Repair & Maintenance', category: 'Services', description: 'Doorstep PC formatting, hardware troubleshooting & power supply fixes in Nagpur', page: 'services', subPage: 'computer-repair', badge: 'Popular' },
  { id: 'srv-lap', type: 'service', title: 'Laptop Screen, Battery & Hinge Repair', category: 'Services', description: 'Original Dell, HP, Lenovo laptop screens, battery replacement & hinge welding', page: 'services', subPage: 'laptop-repair', badge: 'Express' },
  { id: 'srv-chip', type: 'service', title: 'Laptop Motherboard Chip-Level Repair', category: 'Services', description: 'BGA IC replacement, no power fix, short circuit repair & liquid damage repair', page: 'services', subPage: 'motherboard-chip-repair', badge: 'Specialist' },
  { id: 'srv-data', type: 'service', title: 'Clean-Room Data Recovery Service', category: 'Services', description: 'Hard disk, SSD, pendrive & memory card corrupted partition data recovery in Nagpur', page: 'services', subPage: 'data-recovery', badge: 'Safe' },
  { id: 'srv-print', type: 'service', title: 'Laserjet Printer Repair & Toner Refilling', category: 'Services', description: 'HP, Canon, Brother printer drum replacement, paper jam fix & toner cartridge refill', page: 'services', subPage: 'printer-repair', badge: 'Same Day' },
  { id: 'srv-cctv', type: 'service', title: 'CCTV Camera Installation & DVR AMC', category: 'Services', description: 'Hikvision, CP Plus 4K IP CCTV camera wiring, mobile view setup & AMC services', page: 'services', subPage: 'cctv-installation', badge: 'Security' },
  { id: 'srv-net', type: 'service', title: 'LAN Networking & Office IT AMC', category: 'Services', description: 'Router configuration, CAT6 cable layout, server rack setup & IT support AMC', page: 'services', subPage: 'networking-amc', badge: 'Corporate' },
  { id: 'srv-game', type: 'service', title: 'Custom Gaming PC Building & Liquid Cooling', category: 'Services', description: 'NVIDIA RTX 4070/4090 gaming PC assembly, ARGB cabling & overclocking in Nagpur', page: 'services', subPage: 'gaming-pc-build', badge: 'Custom' },
];

const STATIC_PRODUCTS: SearchResultItem[] = [
  { id: 'prod-ssd', type: 'product', title: 'NVMe M.2 512GB & 1TB High-Speed SSDs', category: 'Products', description: 'Kingston, Crucial, WD Green NVMe SSDs with 3-year warranty for 10x laptop speed boost', page: 'products', subPage: 'ssds', badge: 'In Stock' },
  { id: 'prod-ram', type: 'product', title: 'DDR4 & DDR5 Laptop RAM 8GB / 16GB / 32GB', category: 'Products', description: 'Original Crucial & Corsair SODIMM RAM modules for Dell, HP, Lenovo & Asus laptops', page: 'products', subPage: 'ram', badge: 'In Stock' },
  { id: 'prod-disp', type: 'product', title: 'FHD IPS & OLED Laptop Replacement Displays', category: 'Products', description: '14.0", 15.6", 16.0" 60Hz & 144Hz IPS LED screens for gaming & office laptops', page: 'products', subPage: 'displays', badge: 'Original' },
  { id: 'prod-ref', type: 'product', title: 'Refurbished Dell & HP Business Laptops', category: 'Products', description: 'Intel Core i5 / i7 refurbished laptops with 1-year store warranty starting ₹14,999', page: 'products', subPage: 'refurbished-laptops', badge: 'Best Seller' },
];

const STATIC_BLOGS: SearchResultItem[] = [
  { id: 'blog-ssd', type: 'blog', title: 'How SSD Upgrade Solves Slow Laptop Booting in 15 Mins', category: 'Blog', description: 'Detailed guide on cloning Windows 11/10 to NVMe SSD without losing data', page: 'blog', subPage: 'hardware-tips-replacement', badge: 'Guide' },
  { id: 'blog-heat', type: 'blog', title: 'Overheating Laptop Fan Noise & Thermal Repasting Fix', category: 'Blog', description: 'Why laptop heats up during gaming/editing & when to change CPU thermal paste', page: 'blog', subPage: 'hardware-tips-replacement', badge: 'Tips' },
  { id: 'blog-virus', type: 'blog', title: 'Removing Malware, Ransomware & Popups in Windows 11', category: 'Blog', description: 'Step-by-step virus cleaning guide & official antivirus installation in Nagpur', page: 'blog', subPage: 'software-fixes', badge: 'Security' },
];

export const SiteSearchModal: React.FC<SiteSearchModalProps> = ({
  isOpen,
  initialQuery = '',
  onClose,
  onNavigatePage
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<'all' | 'services' | 'brands' | 'locations' | 'products' | 'google'>('all');
  const [cseLoaded, setCseLoaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const cseContainerRef = useRef<HTMLDivElement>(null);

  // Focus input & set initial query when opened
  useEffect(() => {
    if (isOpen) {
      if (initialQuery) {
        setQuery(initialQuery);
      }
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen, initialQuery]);

  // Load Google Programmable Search Engine script dynamically when 'google' tab is selected or opened
  useEffect(() => {
    if ((isOpen && activeTab === 'google') && !cseLoaded) {
      const cxId = import.meta.env.VITE_GOOGLE_CSE_ID || 'c1f77d34b4e31464b'; // Fallback CSE ID
      if (!document.getElementById('google-cse-script')) {
        const script = document.createElement('script');
        script.id = 'google-cse-script';
        script.src = `https://cse.google.com/cse.js?cx=${cxId}`;
        script.async = true;
        script.onload = () => setCseLoaded(true);
        document.body.appendChild(script);
      } else {
        setCseLoaded(true);
      }
    }
  }, [isOpen, activeTab, cseLoaded]);

  if (!isOpen) return null;

  // Build combined results list
  const searchLower = query.trim().toLowerCase();

  const brandResults: SearchResultItem[] = REPAIR_BRANDS_LIST.map((b) => ({
    id: `brand-${b.id}`,
    type: 'brand',
    title: `${b.name} Laptop & Desktop Service Center`,
    category: 'Brands',
    description: `Official component repair, screen replacement & motherboard servicing for ${b.name} devices in Nagpur`,
    page: 'brands',
    subPage: b.id,
    badge: 'Brand'
  }));

  const locationResults: SearchResultItem[] = ALL_NAGPUR_LOCATIONS.map((loc) => ({
    id: `loc-${loc.id}`,
    type: 'location',
    title: `Doorstep Computer Repair in ${loc.name}, Nagpur (${loc.pincode})`,
    category: 'Location',
    description: `Free doorstep technician visit in ${loc.name} area within 30-45 minutes. Landmark: ${loc.landmark || 'Nagpur Zone'}`,
    page: 'service-areas',
    subPage: loc.id,
    badge: '30 Min Visit'
  }));

  const allItems: SearchResultItem[] = [
    ...STATIC_SERVICES,
    ...brandResults,
    ...STATIC_PRODUCTS,
    ...STATIC_BLOGS,
    ...locationResults
  ];

  const filteredResults = searchLower
    ? allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower) ||
          item.category.toLowerCase().includes(searchLower) ||
          (item.subPage && item.subPage.toLowerCase().includes(searchLower))
      )
    : allItems.slice(0, 12); // Show top default picks when query is empty

  const displayedResults = filteredResults.filter((item) => {
    if (activeTab === 'services') return item.type === 'service';
    if (activeTab === 'brands') return item.type === 'brand';
    if (activeTab === 'locations') return item.type === 'location';
    if (activeTab === 'products') return item.type === 'product';
    return true;
  });

  const handleSelectResult = (item: SearchResultItem) => {
    onNavigatePage(item.page, item.subPage);
    onClose();
  };

  const handleGoogleExternalSearch = () => {
    const q = query.trim() || 'laptop repair nagpur';
    const googleUrl = `https://www.google.com/search?q=site:computerrepairnagpur.com+${encodeURIComponent(q)}`;
    window.open(googleUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-12 sm:pt-20 px-3 bg-slate-950/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-slate-900 border border-slate-700/90 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-slate-950/90">
          <Search className="w-5 h-5 text-blue-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search laptop repair, Besa locality, Dell screen, SSD price..."
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm sm:text-base font-semibold outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition flex items-center gap-1 shrink-0"
          >
            <span className="hidden sm:inline">Esc</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Category Tabs */}
        <div className="px-4 py-2 border-b border-slate-800/80 bg-slate-900 flex items-center gap-2 overflow-x-auto text-xs scrollbar-none shrink-0">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            All Index ({allItems.length})
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'services'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Wrench className="w-3.5 h-3.5 text-blue-400" /> Services
          </button>
          <button
            onClick={() => setActiveTab('locations')}
            className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'locations'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-rose-400" /> Nagpur Localities (1000+)
          </button>
          <button
            onClick={() => setActiveTab('brands')}
            className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'brands'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Laptop className="w-3.5 h-3.5 text-indigo-400" /> Brands
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'products'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" /> Spare Parts
          </button>
          <button
            onClick={() => setActiveTab('google')}
            className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'google'
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> Google Engine
          </button>
        </div>

        {/* Content Results Body */}
        <div className="p-4 overflow-y-auto space-y-2 flex-1 scrollbar-thin">
          {activeTab === 'google' ? (
            <div className="space-y-4 py-2">
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-center space-y-3">
                <div className="flex items-center justify-center gap-2 text-amber-400 font-extrabold text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>Google Programmable Search Engine</span>
                </div>
                <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
                  Deep-indexing computerrepairnagpur.com pages, service blogs & locality pages via official Google Search API crawler.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                  <button
                    onClick={handleGoogleExternalSearch}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 transition"
                  >
                    <span>Search "{query || 'laptop repair'}" on Google</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* GCSE Container */}
              <div ref={cseContainerRef} className="gcse-search-container min-h-[150px]">
                <div className="gcse-search" data-gss="1"></div>
              </div>
            </div>
          ) : (
            <>
              {displayedResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {displayedResults.slice(0, 24).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelectResult(item)}
                      className="text-left p-3 rounded-2xl bg-slate-950/70 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/50 transition group flex flex-col justify-between gap-1.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-xs sm:text-sm text-slate-100 group-hover:text-blue-300 transition line-clamp-1">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="pt-1 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-500 font-semibold">
                        <span className="uppercase tracking-wider text-slate-400">{item.category}</span>
                        <span className="text-blue-400 group-hover:translate-x-0.5 transition flex items-center gap-0.5">
                          View Page <CornerDownLeft className="w-3 h-3" />
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 space-y-3">
                  <HelpCircle className="w-10 h-10 text-slate-600 mx-auto" />
                  <p className="text-sm text-slate-300 font-bold">
                    No exact match found for "{query}"
                  </p>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Try searching for terms like "Besa", "Dell screen", "SSD upgrade", "Data recovery", or "MacBook repair".
                  </p>
                  <button
                    onClick={handleGoogleExternalSearch}
                    className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold border border-slate-700"
                  >
                    <span>Search on Google Search Engine</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Shortcut Helper */}
        <div className="p-3 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <span className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-300">⌘K / Ctrl+K</span>
            <span>Shortcut to search anytime</span>
          </div>
          <button
            onClick={handleGoogleExternalSearch}
            className="text-amber-400 hover:underline font-bold flex items-center gap-1"
          >
            <span>Google Custom Index</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
