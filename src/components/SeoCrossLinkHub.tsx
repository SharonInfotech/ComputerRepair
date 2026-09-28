import React, { useState } from 'react';
import {
  Link2,
  Wrench,
  Laptop,
  MapPin,
  BookOpen,
  ShoppingBag,
  Phone,
  ChevronRight,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface SeoCrossLinkHubProps {
  onNavigatePage: (page: string, subPage?: string) => void;
  className?: string;
}

export const SeoCrossLinkHub: React.FC<SeoCrossLinkHubProps> = ({
  onNavigatePage,
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState<'services' | 'brands' | 'localities' | 'guides' | 'products'>('services');

  // 1. Repair Services Cross-Links
  const serviceLinks = [
    { name: 'Laptop Screen Replacement Nagpur', page: 'services', sub: 'laptop-repair' },
    { name: 'Laptop Battery Replacement Nagpur', page: 'services', sub: 'laptop-repair' },
    { name: 'NVMe SSD Speed Upgrade Nagpur', page: 'services', sub: 'laptop-repair' },
    { name: 'Motherboard IC Chip Repair Nagpur', page: 'services', sub: 'computer-repair' },
    { name: 'Water Damage Laptop Repair Nagpur', page: 'services', sub: 'laptop-repair' },
    { name: 'Desktop PC Power Supply SMPS Repair', page: 'services', sub: 'computer-repair' },
    { name: 'Printer Toner Cartridge Refilling Nagpur', page: 'services', sub: 'printer-repair' },
    { name: 'Laserjet Printer Drum & Roller Repair', page: 'services', sub: 'printer-repair' },
    { name: 'IP & HD CCTV Camera Installation Nagpur', page: 'services', sub: 'cctv-installation' },
    { name: 'CCTV DVR & NVR Hard Disk Storage Setup', page: 'services', sub: 'cctv-installation' },
    { name: 'Hard Disk & SSD Data Recovery Nagpur', page: 'services', sub: 'data-recovery' },
    { name: 'Formatted Drive Data Extraction Service', page: 'services', sub: 'data-recovery' },
    { name: 'Office LAN Cabling & Router Wi-Fi Setup', page: 'services', sub: 'networking-amc' },
    { name: 'Corporate Computer AMC Services Nagpur', page: 'services', sub: 'networking-amc' },
  ];

  // 2. Brand Repair Center Cross-Links
  const brandLinks = [
    { name: 'Dell Laptop Repair Center Nagpur', page: 'brands', sub: 'dell' },
    { name: 'HP Laptop Repair & Battery Swap Nagpur', page: 'brands', sub: 'hp' },
    { name: 'Lenovo ThinkPad & IdeaPad Repair Nagpur', page: 'brands', sub: 'lenovo' },
    { name: 'Apple MacBook Pro & Air Repair Center', page: 'brands', sub: 'apple' },
    { name: 'ASUS ROG & VivoBook Repair Nagpur', page: 'brands', sub: 'asus' },
    { name: 'Acer Aspire & Predator Laptop Repair', page: 'brands', sub: 'acer' },
    { name: 'MSI Gaming Laptop Repair Service Nagpur', page: 'brands', sub: 'msi' },
    { name: 'Samsung & Toshiba Laptop Repair Nagpur', page: 'brands', sub: 'samsung' },
  ];

  // 3. Service Areas (Localities) Cross-Links
  const localityLinks = [
    { name: 'Computer Repair in Besa Nagpur', page: 'service-areas', sub: 'besa' },
    { name: 'Laptop Repair in Dharampeth Nagpur', page: 'service-areas', sub: 'dharampeth' },
    { name: 'Doorstep Tech Service in Sitabuldi', page: 'service-areas', sub: 'sitabuldi' },
    { name: 'Computer Store in Sadar Nagpur', page: 'service-areas', sub: 'sadar' },
    { name: 'Laptop Service in Dhantoli Nagpur', page: 'service-areas', sub: 'dhantoli' },
    { name: 'Doorstep Repair in Manish Nagar', page: 'service-areas', sub: 'manish-nagar' },
    { name: 'Laptop Service in Wardha Road Nagpur', page: 'service-areas', sub: 'wardha-road' },
    { name: 'Computer Technician in Hingna MIDC', page: 'service-areas', sub: 'hingna' },
    { name: 'Laptop Screen Repair in Nandanvan', page: 'service-areas', sub: 'nandanvan' },
    { name: 'Computer Repair in Mankapur Nagpur', page: 'service-areas', sub: 'new-mankapur' },
    { name: 'Laptop Service in Koradi Road Nagpur', page: 'service-areas', sub: 'koradi-road' },
    { name: 'Doorstep Service in Trimurti Nagar', page: 'service-areas', sub: 'trimurti-nagar' },
    { name: 'Computer Service in Pratap Nagar', page: 'service-areas', sub: 'pratap-nagar' },
    { name: 'Laptop Repair in Somalwada Nagpur', page: 'service-areas', sub: 'somalwada' },
  ];

  // 4. Tech Guides & Blog Cross-Links
  const guideLinks = [
    { name: 'How to Upgrade Laptop HDD to NVMe SSD in Nagpur', page: 'blog', sub: 'hardware-tips-replacement' },
    { name: 'Fix Slow Laptop Performance & Thermal Throttling', page: 'blog', sub: 'software-fixes' },
    { name: 'Laptop Screen Replacement Cost & Guide Nagpur', page: 'blog', sub: 'hardware-tips-replacement' },
    { name: 'Motherboard Short Circuit Diagnostic Guide', page: 'blog', sub: 'hardware-tips-replacement' },
    { name: 'Laserjet Printer Toner Refilling Tips Nagpur', page: 'blog', sub: 'hardware-tips-replacement' },
    { name: 'CCTV Camera Night Vision & DVR Setup Guide', page: 'blog', sub: 'technology-news' },
    { name: 'Windows 11 Driver Installation & OS Formatting', page: 'blog', sub: 'software-fixes' },
    { name: 'Crashed Hard Disk Data Recovery Procedures', page: 'blog', sub: 'technology-news' },
  ];

  // 5. Products & Accessories Cross-Links
  const productLinks = [
    { name: 'Refurbished Laptops with Warranty Nagpur', page: 'products', sub: 'laptops' },
    { name: 'Genuine Dell & HP Laptop Chargers', page: 'products', sub: 'accessories' },
    { name: '512GB & 1TB NVMe PCIe M.2 SSDs Nagpur', page: 'products', sub: 'components' },
    { name: '8GB & 16GB DDR4 / DDR5 Laptop RAM Modules', page: 'products', sub: 'components' },
    { name: 'Original Full-HD Laptop LED Display Panels', page: 'products', sub: 'components' },
    { name: 'Wireless Keyboard & Ergonomic Mouse Sets', page: 'products', sub: 'accessories' },
    { name: 'Desktop SMPS Power Supply & Cabinets', page: 'products', sub: 'components' },
    { name: 'Hikvision & CP Plus CCTV Camera Kits', page: 'products', sub: 'accessories' },
  ];

  return (
    <div className={`bg-slate-900/90 border border-slate-800/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl ${className}`}>
      {/* SEO Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <span className="text-[11px] font-black uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Quick Navigation & Service Index • Sharon Infotech Nagpur
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Quick Navigation & Service Index Nagpur
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl">
            Explore our comprehensive index of doorstep computer repair, brand laptop service centers, locality landing pages, hardware guides, and original computer parts in Nagpur.
          </p>
        </div>

        <a
          href="tel:7249430043"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition shrink-0 shadow-md"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call for Service: 7249430043</span>
        </a>
      </div>

      {/* Cross-Link Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800/80 pb-3">
        <button
          onClick={() => setActiveTab('services')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeTab === 'services'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
              : 'bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
          }`}
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>Services ({serviceLinks.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('brands')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeTab === 'brands'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
              : 'bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
          }`}
        >
          <Laptop className="w-3.5 h-3.5" />
          <span>Brand Repairs ({brandLinks.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('localities')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeTab === 'localities'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
              : 'bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>Service Areas ({localityLinks.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('guides')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeTab === 'guides'
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
              : 'bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Tech Guides ({guideLinks.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeTab === 'products'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
              : 'bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Products ({productLinks.length})</span>
        </button>
      </div>

      {/* Grid of Active Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {activeTab === 'services' &&
          serviceLinks.map((link, idx) => (
            <button
              key={idx}
              onClick={() => onNavigatePage(link.page, link.sub)}
              className="group text-left p-3.5 rounded-2xl bg-slate-950/80 hover:bg-blue-950/50 border border-slate-800/80 hover:border-blue-500/50 transition flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 group-hover:scale-110 transition" />
                <span className="text-xs font-bold text-slate-200 group-hover:text-blue-300 truncate">
                  {link.name}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 shrink-0 transition" />
            </button>
          ))}

        {activeTab === 'brands' &&
          brandLinks.map((link, idx) => (
            <button
              key={idx}
              onClick={() => onNavigatePage(link.page, link.sub)}
              className="group text-left p-3.5 rounded-2xl bg-slate-950/80 hover:bg-purple-950/50 border border-slate-800/80 hover:border-purple-500/50 transition flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Laptop className="w-4 h-4 text-purple-400 shrink-0 group-hover:scale-110 transition" />
                <span className="text-xs font-bold text-slate-200 group-hover:text-purple-300 truncate">
                  {link.name}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-purple-400 shrink-0 transition" />
            </button>
          ))}

        {activeTab === 'localities' &&
          localityLinks.map((link, idx) => (
            <button
              key={idx}
              onClick={() => onNavigatePage(link.page, link.sub)}
              className="group text-left p-3.5 rounded-2xl bg-slate-950/80 hover:bg-emerald-950/50 border border-slate-800/80 hover:border-emerald-500/50 transition flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 group-hover:scale-110 transition" />
                <span className="text-xs font-bold text-slate-200 group-hover:text-emerald-300 truncate">
                  {link.name}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 shrink-0 transition" />
            </button>
          ))}

        {activeTab === 'guides' &&
          guideLinks.map((link, idx) => (
            <button
              key={idx}
              onClick={() => onNavigatePage(link.page, link.sub)}
              className="group text-left p-3.5 rounded-2xl bg-slate-950/80 hover:bg-amber-950/50 border border-slate-800/80 hover:border-amber-500/50 transition flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <BookOpen className="w-4 h-4 text-amber-400 shrink-0 group-hover:scale-110 transition" />
                <span className="text-xs font-bold text-slate-200 group-hover:text-amber-300 truncate">
                  {link.name}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400 shrink-0 transition" />
            </button>
          ))}

        {activeTab === 'products' &&
          productLinks.map((link, idx) => (
            <button
              key={idx}
              onClick={() => onNavigatePage(link.page, link.sub)}
              className="group text-left p-3.5 rounded-2xl bg-slate-950/80 hover:bg-cyan-950/50 border border-slate-800/80 hover:border-cyan-500/50 transition flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <ShoppingBag className="w-4 h-4 text-cyan-400 shrink-0 group-hover:scale-110 transition" />
                <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 truncate">
                  {link.name}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 shrink-0 transition" />
            </button>
          ))}
      </div>

      {/* SEO Callout footer note */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 border-t border-slate-800/60">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>All repair requests include free doorstep diagnosis across Nagpur • Official Warranty Provided</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-amber-400 font-bold">Helpline: 7249430043</span>
          <span>•</span>
          <button
            onClick={() => onNavigatePage('service-areas')}
            className="text-blue-400 font-extrabold hover:underline flex items-center gap-1"
          >
            <span>View All 220+ Localities</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
