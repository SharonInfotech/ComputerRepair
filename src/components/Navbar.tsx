import React, { useState } from 'react';
import { ALL_NAGPUR_LOCATIONS } from '../data/nagpurLocations';
import {
  Award,
  MapPin,
  ExternalLink,
  Phone,
  MessageSquare,
  Search,
  Menu,
  X,
  Laptop,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  currentSubPage: string;
  onNavigatePage: (page: string, subPage?: string) => void;
  onOpenBooking: (mode?: 'doorstep' | 'instore') => void;
  onOpenTrackModal: () => void;
  onOpenSearchModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  currentSubPage,
  onNavigatePage,
  onOpenBooking,
  onOpenTrackModal,
  onOpenSearchModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileSection, setExpandedMobileSection] = useState<string | null>('services');
  const [navAreaQuery, setNavAreaQuery] = useState('');

  const toggleMobileSection = (section: string) => {
    setExpandedMobileSection((prev) => (prev === section ? null : section));
  };

  const filteredNavLocations = ALL_NAGPUR_LOCATIONS.filter((loc) =>
    loc.name.toLowerCase().includes(navAreaQuery.toLowerCase()) ||
    loc.pincode.includes(navAreaQuery)
  );

  const handlePageSelect = (page: string, subPage?: string) => {
    onNavigatePage(page, subPage);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  const handleAboutUsSubSection = (sectionId: string) => {
    onNavigatePage('about');
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  // Full list of 32 repair brand & series requested by user
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

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white shadow-2xl border-b border-slate-800">
      {/* Top Banner Announcement Bar (Preserved as instructed) */}
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Open Today in Nagpur (9:30 AM - 8:30 PM)
            </span>
            <span className="hidden md:inline text-slate-700">|</span>
            <span className="flex items-center gap-1 text-slate-200 font-medium">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              Serving Nagpur City Since 2013 (12+ Years Trust)
            </span>
            <span className="hidden lg:inline text-slate-700">|</span>
            <a
              href="https://maps.app.goo.gl/wwuRxErEFDjFEqTL6"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1 text-slate-300 hover:text-emerald-400 transition"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>Nagpur Store (Google Maps)</span>
              <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:7249430043"
              className="flex items-center gap-1.5 text-white font-black text-xs hover:text-blue-300 transition"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Call: +91-7249430043</span>
            </a>

            <a
              href="https://wa.me/917249430043?text=Hi%20Sharon%20Infotech,%20I%20need%20computer/laptop/printer/CCTV%20service%20in%20Nagpur"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded-md font-bold transition text-[11px] shadow-sm"
            >
              <MessageSquare className="w-3 h-3" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div
          onClick={() => handlePageSelect('home')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-700 flex items-center justify-center text-white shadow-xl shadow-blue-600/30 group-hover:scale-105 transition transform border border-blue-400/30">
            <Laptop className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-white group-hover:text-blue-300 transition">
                Sharon Infotech
              </span>
              <span className="bg-amber-500/20 text-amber-300 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border border-amber-500/30 hidden sm:inline-block">
                Nagpur #1
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium leading-none">
              Computer, Laptop, Printer, CCTV & IT Support
            </p>
          </div>
        </div>

        {/* 9 MAIN NAVIGATION TABS */}
        <nav className="hidden md:flex items-center gap-1 xl:gap-1.5 text-[11px] xl:text-xs font-bold text-slate-300 overflow-x-auto scrollbar-none py-1">
          
          {/* TAB 1: Home */}
          <button
            onClick={() => handlePageSelect('home')}
            className={`px-2.5 py-1.5 rounded-xl transition flex items-center shrink-0 border ${
              currentPage === 'home'
                ? 'bg-blue-600 text-white border-blue-500 shadow-md font-black ring-1 ring-blue-400/50'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span>Home</span>
          </button>

          {/* TAB 2: Services (Dropdown) */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('services')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => handlePageSelect('services')}
              className={`px-2 py-1.5 rounded-xl transition flex items-center gap-1 shrink-0 border ${
                currentPage === 'services'
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md font-black ring-1 ring-blue-400/50'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>Services</span>
              <ChevronDown className="w-3 h-3 opacity-80 shrink-0" />
            </button>

            {activeDropdown === 'services' && (
              <div className="absolute top-full left-0 w-64 bg-slate-900 border border-slate-700 rounded-2xl p-2 shadow-2xl space-y-1 animate-fade-in z-50">
                <button
                  onClick={() => handlePageSelect('services', 'computer-repair')}
                  className="w-full text-left p-2 rounded-xl text-xs font-bold hover:bg-slate-800 hover:text-blue-400"
                >
                  Computer Repair
                </button>
                <button
                  onClick={() => handlePageSelect('services', 'laptop-repair')}
                  className="w-full text-left p-2 rounded-xl text-xs font-bold hover:bg-slate-800 hover:text-blue-400"
                >
                  Laptop Repair
                </button>
                <button
                  onClick={() => handlePageSelect('services', 'printer-repair')}
                  className="w-full text-left p-2 rounded-xl text-xs font-bold hover:bg-slate-800 hover:text-blue-400"
                >
                  Printer Repair & Refill
                </button>
                <button
                  onClick={() => handlePageSelect('services', 'cctv-installation')}
                  className="w-full text-left p-2 rounded-xl text-xs font-bold hover:bg-slate-800 hover:text-blue-400"
                >
                  CCTV Camera & AMC
                </button>
                <button
                  onClick={() => handlePageSelect('services', 'data-recovery')}
                  className="w-full text-left p-2 rounded-xl text-xs font-bold hover:bg-slate-800 hover:text-blue-400"
                >
                  Data Recovery
                </button>
                <button
                  onClick={() => handlePageSelect('services', 'networking-amc')}
                  className="w-full text-left p-2 rounded-xl text-xs font-bold hover:bg-slate-800 hover:text-blue-400"
                >
                  LAN Networking & AMC
                </button>
                <div className="border-t border-slate-800 pt-1 mt-1">
                  <button
                    onClick={() => handlePageSelect('services', 'motherboard-chip-repair')}
                    className="w-full text-left p-1.5 px-2 rounded-lg text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-blue-400"
                  >
                    Motherboard Chip-Level Repair
                  </button>
                  <button
                    onClick={() => handlePageSelect('services', 'gaming-pc-build')}
                    className="w-full text-left p-1.5 px-2 rounded-lg text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-blue-400"
                  >
                    Gaming PC Custom Build
                  </button>
                  <button
                    onClick={() => handlePageSelect('services', 'tally-multi-user-lan')}
                    className="w-full text-left p-1.5 px-2 rounded-lg text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-blue-400"
                  >
                    Tally Multi-User LAN & Quick Heal
                  </button>
                  <button
                    onClick={() => handlePageSelect('services', 'smart-home-automation')}
                    className="w-full text-left p-1.5 px-2 rounded-lg text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-blue-400"
                  >
                    Smart Home & Biometric Locks
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* TAB 3: Repairs (Dropdown) - 32 Brands & Series */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('repairs')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => handlePageSelect('brands')}
              className={`px-2 py-1.5 rounded-xl transition flex items-center gap-1 shrink-0 border ${
                currentPage === 'brands'
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md font-black ring-1 ring-blue-400/50'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>Repairs</span>
              <ChevronDown className="w-3 h-3 opacity-80 shrink-0" />
            </button>

            {activeDropdown === 'repairs' && (
              <div className="absolute top-full left-0 w-80 bg-slate-900 border border-slate-700 rounded-2xl p-3 shadow-2xl space-y-2 animate-fade-in z-50">
                <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                  <span className="text-[10px] uppercase font-black text-indigo-400 tracking-wider">
                    Computer & Laptop Brand Repairs
                  </span>
                  <button
                    onClick={() => handlePageSelect('brands')}
                    className="text-[10px] text-slate-400 hover:text-white underline font-bold"
                  >
                    View All
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-1 max-h-80 overflow-y-auto pr-1 scrollbar-thin">
                  {REPAIR_BRANDS_LIST.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => handlePageSelect('brands', b.id)}
                      className="text-left p-1.5 rounded-lg text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-indigo-300 truncate"
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* TAB 4: Product (Dropdown) */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('product')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => handlePageSelect('products')}
              className={`px-2 py-1.5 rounded-xl transition flex items-center gap-1 shrink-0 border ${
                currentPage === 'products'
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md font-black ring-1 ring-blue-400/50'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>Product</span>
              <ChevronDown className="w-3 h-3 opacity-80 shrink-0" />
            </button>

            {activeDropdown === 'product' && (
              <div className="absolute top-full left-0 w-64 bg-slate-900 border border-slate-700 rounded-2xl p-2 shadow-2xl space-y-1 animate-fade-in z-50">
                <button
                  onClick={() => handlePageSelect('products', 'ssd')}
                  className="w-full text-left p-2 rounded-xl text-xs font-bold hover:bg-slate-800 hover:text-amber-400"
                >
                  SSD Drives
                </button>
                <button
                  onClick={() => handlePageSelect('products', 'ram')}
                  className="w-full text-left p-2 rounded-xl text-xs font-bold hover:bg-slate-800 hover:text-amber-400"
                >
                  RAM Modules
                </button>
                <button
                  onClick={() => handlePageSelect('products', 'mouse-keyboard')}
                  className="w-full text-left p-2 rounded-xl text-xs font-bold hover:bg-slate-800 hover:text-amber-400"
                >
                  Mouse & Keyboards
                </button>
                <button
                  onClick={() => handlePageSelect('products', 'pen-drive')}
                  className="w-full text-left p-2 rounded-xl text-xs font-bold hover:bg-slate-800 hover:text-amber-400"
                >
                  Pen Drives & OTG
                </button>
                <button
                  onClick={() => handlePageSelect('products', 'hard-disk')}
                  className="w-full text-left p-2 rounded-xl text-xs font-bold hover:bg-slate-800 hover:text-amber-400"
                >
                  Hard Disks
                </button>
                <button
                  onClick={() => handlePageSelect('products', 'chargers')}
                  className="w-full text-left p-2 rounded-xl text-xs font-bold hover:bg-slate-800 hover:text-amber-400"
                >
                  Laptop Chargers & Adapters
                </button>
                <button
                  onClick={() => handlePageSelect('products', 'batteries')}
                  className="w-full text-left p-2 rounded-xl text-xs font-bold hover:bg-slate-800 hover:text-amber-400"
                >
                  OEM Replacement Batteries
                </button>
                <button
                  onClick={() => handlePageSelect('products', 'display-screens')}
                  className="w-full text-left p-2 rounded-xl text-xs font-bold hover:bg-slate-800 hover:text-amber-400"
                >
                  Laptop Display Screens
                </button>
                <button
                  onClick={() => handlePageSelect('products', 'cooling-pads')}
                  className="w-full text-left p-2 rounded-xl text-xs font-bold hover:bg-slate-800 hover:text-amber-400"
                >
                  Thermal Paste & Coolers
                </button>
              </div>
            )}
          </div>

          {/* TAB 5: Service Areas (Dropdown + Live Area Search) */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('service-areas')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => handlePageSelect('service-areas')}
              className={`px-2 py-1.5 rounded-xl transition flex items-center gap-1 shrink-0 border ${
                currentPage === 'service-areas'
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md font-black ring-1 ring-blue-400/50'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>Service Areas</span>
              <ChevronDown className="w-3 h-3 opacity-80 shrink-0" />
            </button>

            {activeDropdown === 'service-areas' && (
              <div className="absolute top-full left-0 w-80 bg-slate-900 border border-slate-700 rounded-2xl p-3 shadow-2xl space-y-2 animate-fade-in z-50">
                <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                  <span className="text-[10px] uppercase font-black text-rose-400 tracking-wider">
                    Nagpur Doorstep Areas (1000+)
                  </span>
                  <button
                    onClick={() => handlePageSelect('service-areas')}
                    className="text-[10px] text-slate-400 hover:text-white underline font-bold"
                  >
                    View All
                  </button>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={navAreaQuery}
                    onChange={(e) => setNavAreaQuery(e.target.value)}
                    placeholder="Search area (e.g. Besa, Manish Nagar)..."
                    className="w-full bg-slate-950 text-white text-xs px-2.5 py-2 rounded-lg border border-slate-800 focus:outline-none focus:border-rose-500 placeholder-slate-500"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-2.5 pointer-events-none" />
                </div>

                <div className="grid grid-cols-2 gap-1 max-h-64 overflow-y-auto pr-1 scrollbar-thin">
                  {filteredNavLocations.slice(0, 36).map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => handlePageSelect('service-areas', loc.id)}
                      className="text-left p-1.5 rounded-lg text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-rose-400 truncate"
                    >
                      {loc.name}
                    </button>
                  ))}
                  {filteredNavLocations.length === 0 && (
                    <p className="col-span-2 text-[11px] text-slate-500 text-center py-2">
                      No matching Nagpur location
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* TAB 6: Support Center (Dropdown) */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('support')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => handlePageSelect('support')}
              className={`px-2 py-1.5 rounded-xl transition flex items-center gap-1 shrink-0 border ${
                currentPage === 'support'
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md font-black ring-1 ring-blue-400/50'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>Support Center</span>
              <ChevronDown className="w-3 h-3 opacity-80 shrink-0" />
            </button>

            {activeDropdown === 'support' && (
              <div className="absolute top-full left-0 w-72 bg-slate-900 border border-slate-700 rounded-2xl p-3 shadow-2xl space-y-2 animate-fade-in z-50">
                <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                  <span className="text-[10px] uppercase font-black text-cyan-400 tracking-wider">
                    Official Driver & Support Desks
                  </span>
                  <button
                    onClick={() => handlePageSelect('support')}
                    className="text-[10px] text-slate-400 hover:text-white underline font-bold"
                  >
                    View All
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-1 max-h-72 overflow-y-auto pr-1 scrollbar-thin">
                  {REPAIR_BRANDS_LIST.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => handlePageSelect('support', `${b.id}-support`)}
                      className="text-left p-1.5 rounded-lg text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-cyan-300 truncate"
                    >
                      {b.name} Support
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* TAB 7: Blogs (Dropdown) */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('blogs')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => handlePageSelect('blog')}
              className={`px-2 py-1.5 rounded-xl transition flex items-center gap-1 shrink-0 border ${
                currentPage === 'blog'
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md font-black ring-1 ring-blue-400/50'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>Blogs</span>
              <ChevronDown className="w-3 h-3 opacity-80 shrink-0" />
            </button>

            {activeDropdown === 'blogs' && (
              <div className="absolute top-full left-0 w-60 bg-slate-900 border border-slate-700 rounded-2xl p-2 shadow-2xl space-y-1 animate-fade-in z-50">
                <button
                  onClick={() => handlePageSelect('blog', 'hardware-tips-replacement')}
                  className="w-full text-left p-2 rounded-xl text-xs font-bold hover:bg-slate-800 hover:text-cyan-400"
                >
                  Hardware Tips
                </button>
                <button
                  onClick={() => handlePageSelect('blog', 'software-fixes')}
                  className="w-full text-left p-2 rounded-xl text-xs font-bold hover:bg-slate-800 hover:text-cyan-400"
                >
                  Software Fixes
                </button>
                <button
                  onClick={() => handlePageSelect('blog', 'technology-news')}
                  className="w-full text-left p-2 rounded-xl text-xs font-bold hover:bg-slate-800 hover:text-cyan-400"
                >
                  Technology News
                </button>
              </div>
            )}
          </div>

          {/* TAB 8: About Us (Dropdown) */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('about')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => handlePageSelect('about')}
              className={`px-2 py-1.5 rounded-xl transition flex items-center gap-1 shrink-0 border ${
                currentPage === 'about'
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md font-black ring-1 ring-blue-400/50'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>About Us</span>
              <ChevronDown className="w-3 h-3 opacity-80 shrink-0" />
            </button>

            {activeDropdown === 'about' && (
              <div className="absolute top-full left-0 w-56 bg-slate-900 border border-slate-700 rounded-2xl p-2 shadow-2xl space-y-1 animate-fade-in z-50">
                <button
                  onClick={() => handleAboutUsSubSection('who-we-are')}
                  className="w-full text-left p-2 rounded-xl text-xs font-bold hover:bg-slate-800 hover:text-teal-300"
                >
                  Who We Are?
                </button>
                <button
                  onClick={() => handleAboutUsSubSection('what-we-do')}
                  className="w-full text-left p-2 rounded-xl text-xs font-bold hover:bg-slate-800 hover:text-teal-300"
                >
                  What Do We Do?
                </button>
                <button
                  onClick={() => handleAboutUsSubSection('our-mission')}
                  className="w-full text-left p-2 rounded-xl text-xs font-bold hover:bg-slate-800 hover:text-teal-300"
                >
                  Our Mission
                </button>
                <button
                  onClick={() => handleAboutUsSubSection('our-team')}
                  className="w-full text-left p-2 rounded-xl text-xs font-bold hover:bg-slate-800 hover:text-teal-300"
                >
                  Our Team
                </button>
                <button
                  onClick={() => handleAboutUsSubSection('working-area')}
                  className="w-full text-left p-2 rounded-xl text-xs font-bold hover:bg-slate-800 hover:text-teal-300"
                >
                  Working Area
                </button>
                <button
                  onClick={() => handleAboutUsSubSection('working-scope')}
                  className="w-full text-left p-2 rounded-xl text-xs font-bold hover:bg-slate-800 hover:text-teal-300"
                >
                  Working Scope
                </button>
              </div>
            )}
          </div>

          {/* TAB 9: Contact */}
          <button
            onClick={() => handlePageSelect('contact')}
            className={`px-2.5 py-1.5 rounded-xl transition flex items-center shrink-0 border ${
              currentPage === 'contact'
                ? 'bg-blue-600 text-white border-blue-500 shadow-md font-black ring-1 ring-blue-400/50'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span>Contact</span>
          </button>
        </nav>

        {/* Action Buttons (Search & Book Repair CTA) */}
        <div className="flex items-center gap-2 shrink-0">
          {onOpenSearchModal && (
            <button
              onClick={onOpenSearchModal}
              className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
              title="Search entire website (⌘K)"
            >
              <Search className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden lg:inline">Search</span>
              <kbd className="hidden sm:inline-block bg-slate-800 text-slate-400 px-1 py-0.2 text-[9px] font-mono rounded border border-slate-700">⌘K</kbd>
            </button>
          )}

          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => onOpenBooking('doorstep')}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-extrabold shadow-lg shadow-blue-600/30 transition transform hover:-translate-y-0.5 flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Book Repair</span>
            </button>
          </div>
        </div>

        {/* Mobile menu toggle */}

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation-menu"
          className="md:hidden p-2.5 text-slate-300 hover:text-white rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center min-w-[44px] min-h-[44px]"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-navigation-menu" className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 max-h-[85vh] overflow-y-auto">
          {/* Mobile Quick Search Bar */}
          {onOpenSearchModal && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearchModal();
              }}
              className="w-full text-left px-4 py-3 rounded-xl min-h-[44px] flex items-center justify-between text-xs font-bold bg-slate-950 text-slate-300 border border-slate-800 hover:border-blue-500/50 shadow-inner transition"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-blue-400" />
                <span>Search services, brands, locations, articles...</span>
              </div>
              <span className="text-[10px] bg-blue-600/20 text-blue-300 px-2 py-0.5 rounded font-mono border border-blue-500/30">Google Engine</span>
            </button>
          )}

          <div className="flex flex-col gap-2 pt-1">
            
            {/* Mobile Home */}
            <button
              onClick={() => handlePageSelect('home')}
              className={`w-full text-left px-4 py-3 rounded-xl min-h-[44px] flex items-center justify-between text-xs sm:text-sm font-bold border transition ${
                currentPage === 'home'
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                  : 'bg-slate-800/90 text-slate-200 border-slate-700/80 hover:bg-slate-800'
              }`}
            >
              <span>Home</span>
              <span className="text-[10px] text-blue-300 font-semibold">Primary</span>
            </button>

            {/* Mobile Services Accordion */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden">
              <button
                onClick={() => toggleMobileSection('services')}
                className="w-full text-left px-4 py-3 min-h-[44px] flex items-center justify-between text-xs sm:text-sm font-bold text-slate-200 hover:bg-slate-800/80 transition"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span>Services</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-blue-400 font-bold bg-blue-950/80 px-2 py-0.5 rounded-full border border-blue-800/60">
                    8 Repairs
                  </span>
                  {expandedMobileSection === 'services' ? (
                    <ChevronDown className="w-4 h-4 text-blue-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </button>

              {expandedMobileSection === 'services' && (
                <div className="px-3 pb-3 pt-1 border-t border-slate-800/80 bg-slate-900/90 space-y-1">
                  <button
                    onClick={() => handlePageSelect('services')}
                    className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg text-xs font-black text-blue-300 hover:bg-slate-800 flex items-center justify-between border border-blue-900/40 bg-blue-950/20"
                  >
                    <span>View All Services Overview</span>
                    <span>→</span>
                  </button>
                  <div className="pl-2 border-l-2 border-blue-500/40 space-y-1 mt-1">
                    <button onClick={() => handlePageSelect('services', 'computer-repair')} className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-between">
                      <span>↳ Computer Repair</span>
                    </button>
                    <button onClick={() => handlePageSelect('services', 'laptop-repair')} className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-between">
                      <span>↳ Laptop Repair</span>
                    </button>
                    <button onClick={() => handlePageSelect('services', 'printer-repair')} className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-between">
                      <span>↳ Printer Repair & Refill</span>
                    </button>
                    <button onClick={() => handlePageSelect('services', 'cctv-installation')} className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-between">
                      <span>↳ CCTV Camera & AMC</span>
                    </button>
                    <button onClick={() => handlePageSelect('services', 'data-recovery')} className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-between">
                      <span>↳ Data Recovery</span>
                    </button>
                    <button onClick={() => handlePageSelect('services', 'networking-amc')} className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-between">
                      <span>↳ LAN Networking & AMC</span>
                    </button>
                    <button onClick={() => handlePageSelect('services', 'motherboard-chip-repair')} className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-between">
                      <span>↳ Motherboard Chip-Level Repair</span>
                    </button>
                    <button onClick={() => handlePageSelect('services', 'gaming-pc-build')} className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-between">
                      <span>↳ Gaming PC Custom Build</span>
                    </button>
                    <button onClick={() => handlePageSelect('services', 'tally-multi-user-lan')} className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-between">
                      <span>↳ Tally Multi-User LAN & Quick Heal</span>
                    </button>
                    <button onClick={() => handlePageSelect('services', 'smart-home-automation')} className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-between">
                      <span>↳ Smart Home & Biometric Locks</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Repairs (Brands) Accordion */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden">
              <button
                onClick={() => toggleMobileSection('repairs')}
                className="w-full text-left px-4 py-3 min-h-[44px] flex items-center justify-between text-xs sm:text-sm font-bold text-slate-200 hover:bg-slate-800/80 transition"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                  <span>Repairs (Brands)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-indigo-400 font-bold bg-indigo-950/80 px-2 py-0.5 rounded-full border border-indigo-800/60">
                    32 Brands
                  </span>
                  {expandedMobileSection === 'repairs' ? (
                    <ChevronDown className="w-4 h-4 text-indigo-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </button>

              {expandedMobileSection === 'repairs' && (
                <div className="px-3 pb-3 pt-1 border-t border-slate-800/80 bg-slate-900/90 space-y-2">
                  <button
                    onClick={() => handlePageSelect('brands')}
                    className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg text-xs font-black text-indigo-300 hover:bg-slate-800 flex items-center justify-between border border-indigo-900/40 bg-indigo-950/20"
                  >
                    <span>View All Brand Repairs Directory</span>
                    <span>→</span>
                  </button>
                  <div className="pl-2 border-l-2 border-indigo-500/40 grid grid-cols-2 gap-1.5 max-h-56 overflow-y-auto pr-1 pt-1">
                    {REPAIR_BRANDS_LIST.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => handlePageSelect('brands', b.id)}
                        className="text-left px-2.5 py-2 min-h-[40px] rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 truncate flex items-center gap-1"
                      >
                        <span className="text-indigo-400 text-[10px]">↳</span>
                        <span className="truncate">{b.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Product Accordion */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden">
              <button
                onClick={() => toggleMobileSection('product')}
                className="w-full text-left px-4 py-3 min-h-[44px] flex items-center justify-between text-xs sm:text-sm font-bold text-slate-200 hover:bg-slate-800/80 transition"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span>Product</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-amber-400 font-bold bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-800/60">
                    Spares & Parts
                  </span>
                  {expandedMobileSection === 'product' ? (
                    <ChevronDown className="w-4 h-4 text-amber-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </button>

              {expandedMobileSection === 'product' && (
                <div className="px-3 pb-3 pt-1 border-t border-slate-800/80 bg-slate-900/90 space-y-1">
                  <button
                    onClick={() => handlePageSelect('products')}
                    className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg text-xs font-black text-amber-300 hover:bg-slate-800 flex items-center justify-between border border-amber-900/40 bg-amber-950/20"
                  >
                    <span>View All Products & Accessories</span>
                    <span>→</span>
                  </button>
                  <div className="pl-2 border-l-2 border-amber-500/40 space-y-1 mt-1">
                    <button onClick={() => handlePageSelect('products', 'ssd')} className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-between">
                      <span>↳ SSD Drives</span>
                    </button>
                    <button onClick={() => handlePageSelect('products', 'ram')} className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-between">
                      <span>↳ RAM Modules</span>
                    </button>
                    <button onClick={() => handlePageSelect('products', 'mouse-keyboard')} className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-between">
                      <span>↳ Mouse & Keyboards</span>
                    </button>
                    <button onClick={() => handlePageSelect('products', 'pen-drive')} className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-between">
                      <span>↳ Pen Drives & OTG</span>
                    </button>
                    <button onClick={() => handlePageSelect('products', 'hard-disk')} className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-between">
                      <span>↳ Hard Disks</span>
                    </button>
                    <button onClick={() => handlePageSelect('products', 'chargers')} className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-between">
                      <span>↳ Laptop Chargers & Adapters</span>
                    </button>
                    <button onClick={() => handlePageSelect('products', 'batteries')} className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-between">
                      <span>↳ OEM Replacement Batteries</span>
                    </button>
                    <button onClick={() => handlePageSelect('products', 'display-screens')} className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-between">
                      <span>↳ Laptop Display Screens</span>
                    </button>
                    <button onClick={() => handlePageSelect('products', 'cooling-pads')} className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-between">
                      <span>↳ Thermal Paste & Cooling Stands</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Service Areas Accordion */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden">
              <button
                onClick={() => toggleMobileSection('service-areas')}
                className="w-full text-left px-4 py-3 min-h-[44px] flex items-center justify-between text-xs sm:text-sm font-bold text-slate-200 hover:bg-slate-800/80 transition"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  <span>Service Areas</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-rose-400 font-bold bg-rose-950/80 px-2 py-0.5 rounded-full border border-rose-800/60">
                    1000+ Nagpur
                  </span>
                  {expandedMobileSection === 'service-areas' ? (
                    <ChevronDown className="w-4 h-4 text-rose-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </button>

              {expandedMobileSection === 'service-areas' && (
                <div className="px-3 pb-3 pt-1 border-t border-slate-800/80 bg-slate-900/90 space-y-2">
                  <button
                    onClick={() => handlePageSelect('service-areas')}
                    className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg text-xs font-black text-rose-300 hover:bg-slate-800 flex items-center justify-between border border-rose-900/40 bg-rose-950/20"
                  >
                    <span>View All Nagpur Doorstep Coverage</span>
                    <span>→</span>
                  </button>
                  <div className="pl-2 border-l-2 border-rose-500/40 grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1 pt-1">
                    <button onClick={() => handlePageSelect('service-areas', 'dhantoli')} className="text-left px-2.5 py-2 min-h-[40px] rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-1">
                      <span className="text-rose-400 text-[10px]">↳</span>
                      <span>Dhantoli</span>
                    </button>
                    <button onClick={() => handlePageSelect('service-areas', 'ramdaspeth')} className="text-left px-2.5 py-2 min-h-[40px] rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-1">
                      <span className="text-rose-400 text-[10px]">↳</span>
                      <span>Ramdaspeth</span>
                    </button>
                    <button onClick={() => handlePageSelect('service-areas', 'manish-nagar')} className="text-left px-2.5 py-2 min-h-[40px] rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-1">
                      <span className="text-rose-400 text-[10px]">↳</span>
                      <span>Manish Nagar</span>
                    </button>
                    <button onClick={() => handlePageSelect('service-areas', 'sitabuldi')} className="text-left px-2.5 py-2 min-h-[40px] rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-1">
                      <span className="text-rose-400 text-[10px]">↳</span>
                      <span>Sitabuldi</span>
                    </button>
                    <button onClick={() => handlePageSelect('service-areas', 'dharampeth')} className="text-left px-2.5 py-2 min-h-[40px] rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-1">
                      <span className="text-rose-400 text-[10px]">↳</span>
                      <span>Dharampeth</span>
                    </button>
                    <button onClick={() => handlePageSelect('service-areas', 'sadar')} className="text-left px-2.5 py-2 min-h-[40px] rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-1">
                      <span className="text-rose-400 text-[10px]">↳</span>
                      <span>Sadar</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Blogs Accordion */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden">
              <button
                onClick={() => toggleMobileSection('blogs')}
                className="w-full text-left px-4 py-3 min-h-[44px] flex items-center justify-between text-xs sm:text-sm font-bold text-slate-200 hover:bg-slate-800/80 transition"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                  <span>Blogs</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-cyan-400 font-bold bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-800/60">
                    Articles
                  </span>
                  {expandedMobileSection === 'blogs' ? (
                    <ChevronDown className="w-4 h-4 text-cyan-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </button>

              {expandedMobileSection === 'blogs' && (
                <div className="px-3 pb-3 pt-1 border-t border-slate-800/80 bg-slate-900/90 space-y-1">
                  <button
                    onClick={() => handlePageSelect('blog')}
                    className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg text-xs font-black text-cyan-300 hover:bg-slate-800 flex items-center justify-between border border-cyan-900/40 bg-cyan-950/20"
                  >
                    <span>View All Blog Articles</span>
                    <span>→</span>
                  </button>
                  <div className="pl-2 border-l-2 border-cyan-500/40 space-y-1 mt-1">
                    <button onClick={() => handlePageSelect('blog', 'hardware-tips-replacement')} className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-between">
                      <span>↳ Hardware Repair Tips</span>
                    </button>
                    <button onClick={() => handlePageSelect('blog', 'software-fixes')} className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-between">
                      <span>↳ Software Fixes & Guides</span>
                    </button>
                    <button onClick={() => handlePageSelect('blog', 'technology-news')} className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-between">
                      <span>↳ Technology & IT News</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Support Center Accordion */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden">
              <button
                onClick={() => toggleMobileSection('support')}
                className="w-full text-left px-4 py-3 min-h-[44px] flex items-center justify-between text-xs sm:text-sm font-bold text-slate-200 hover:bg-slate-800/80 transition"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                  <span>Support Center</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-purple-400 font-bold bg-purple-950/80 px-2 py-0.5 rounded-full border border-purple-800/60">
                    Drivers & Help
                  </span>
                  {expandedMobileSection === 'support' ? (
                    <ChevronDown className="w-4 h-4 text-purple-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </button>

              {expandedMobileSection === 'support' && (
                <div className="px-3 pb-3 pt-1 border-t border-slate-800/80 bg-slate-900/90 space-y-2">
                  <button
                    onClick={() => handlePageSelect('support')}
                    className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg text-xs font-black text-purple-300 hover:bg-slate-800 flex items-center justify-between border border-purple-900/40 bg-purple-950/20"
                  >
                    <span>View All Support Portals</span>
                    <span>→</span>
                  </button>
                  <div className="pl-2 border-l-2 border-purple-500/40 grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1 pt-1">
                    {REPAIR_BRANDS_LIST.slice(0, 12).map((b) => (
                      <button
                        key={b.id}
                        onClick={() => handlePageSelect('support', `${b.id}-support`)}
                        className="text-left px-2.5 py-2 min-h-[40px] rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 truncate flex items-center gap-1"
                      >
                        <span className="text-purple-400 text-[10px]">↳</span>
                        <span className="truncate">{b.name} Support</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile About Us Accordion */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden">
              <button
                onClick={() => toggleMobileSection('about')}
                className="w-full text-left px-4 py-3 min-h-[44px] flex items-center justify-between text-xs sm:text-sm font-bold text-slate-200 hover:bg-slate-800/80 transition"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                  <span>About Us</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-teal-400 font-bold bg-teal-950/80 px-2 py-0.5 rounded-full border border-teal-800/60">
                    6 Sections
                  </span>
                  {expandedMobileSection === 'about' ? (
                    <ChevronDown className="w-4 h-4 text-teal-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </button>

              {expandedMobileSection === 'about' && (
                <div className="px-3 pb-3 pt-1 border-t border-slate-800/80 bg-slate-900/90 space-y-1">
                  <button
                    onClick={() => handlePageSelect('about')}
                    className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg text-xs font-black text-teal-300 hover:bg-slate-800 flex items-center justify-between border border-teal-900/40 bg-teal-950/20"
                  >
                    <span>View Full About Us Page</span>
                    <span>→</span>
                  </button>
                  <div className="pl-2 border-l-2 border-teal-500/40 space-y-1 mt-1">
                    <button onClick={() => handleAboutUsSubSection('who-we-are')} className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-between">
                      <span>↳ Who We Are?</span>
                    </button>
                    <button onClick={() => handleAboutUsSubSection('what-we-do')} className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-between">
                      <span>↳ What Do We Do?</span>
                    </button>
                    <button onClick={() => handleAboutUsSubSection('our-mission')} className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-between">
                      <span>↳ Our Mission</span>
                    </button>
                    <button onClick={() => handleAboutUsSubSection('our-team')} className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-between">
                      <span>↳ Our Team</span>
                    </button>
                    <button onClick={() => handleAboutUsSubSection('working-area')} className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-between">
                      <span>↳ Working Area</span>
                    </button>
                    <button onClick={() => handleAboutUsSubSection('working-scope')} className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-between">
                      <span>↳ Working Scope</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Contact */}
            <button
              onClick={() => handlePageSelect('contact')}
              className={`w-full text-left px-4 py-3 rounded-xl min-h-[44px] flex items-center justify-between text-xs sm:text-sm font-bold border transition ${
                currentPage === 'contact'
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                  : 'bg-slate-800/90 text-slate-200 border-slate-700/80 hover:bg-slate-800'
              }`}
            >
              <span>Contact Us</span>
              <span className="text-[10px] text-blue-300 font-semibold">Nagpur Lab</span>
            </button>
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrackModal();
              }}
              className="w-full py-3 min-h-[44px] rounded-xl bg-slate-800 text-slate-200 text-xs font-bold border border-slate-700 flex items-center justify-center gap-2 hover:bg-slate-750"
            >
              <Search className="w-4 h-4 text-blue-400" />
              <span>Track Live Repair Ticket</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking('doorstep');
              }}
              className="w-full py-3 min-h-[44px] rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-extrabold shadow-md flex items-center justify-center gap-2 hover:from-blue-500 hover:to-indigo-500"
            >
              <Phone className="w-4 h-4" />
              <span>Book Doorstep Pickup in Nagpur</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
