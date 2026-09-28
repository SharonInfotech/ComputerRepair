import React, { useState } from 'react';
import { ALL_NAGPUR_LOCATIONS } from '../data/nagpurLocations';
import {
  Laptop,
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Globe,
  Heart,
  Mail,
  Navigation,
  ExternalLink,
  Search,
  Wrench,
  Cpu,
  HardDrive,
  Printer,
  Shield,
  CheckCircle2,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onNavigatePage: (page: string, subPage?: string) => void;
  onOpenSitemap?: () => void;
  onOpenSeoAudit?: () => void;
  onOpenSearchModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onNavigatePage,
  onOpenSitemap,
  onOpenSeoAudit,
  onOpenSearchModal,
}) => {
  const [footerAreaQuery, setFooterAreaQuery] = useState('');

  const filteredFooterLocations = ALL_NAGPUR_LOCATIONS.filter((loc) =>
    loc.name.toLowerCase().includes(footerAreaQuery.toLowerCase()) ||
    loc.pincode.includes(footerAreaQuery)
  );

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Top Feature Highlights Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 mb-10 rounded-2xl bg-slate-900/60 border border-slate-800 text-slate-300">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white text-xs">12+ Years Trust</p>
              <p className="text-[11px] text-slate-400">Serving Nagpur Since 2013</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white text-xs">Free Doorstep Pickup</p>
              <p className="text-[11px] text-slate-400">Across Nagpur City</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white text-xs">Chip-Level Repair</p>
              <p className="text-[11px] text-slate-400">Micro-Soldering Experts</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white text-xs">Original Parts</p>
              <p className="text-[11px] text-slate-400">Tested & Guaranteed</p>
            </div>
          </div>
        </div>

        {/* Multi-Column Links Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Col 1: Brand Profile */}
          <div className="space-y-4 lg:col-span-1">
            <div
              onClick={() => onNavigatePage('home')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-600 group-hover:bg-blue-500 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-600/30 transition">
                <Laptop className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-black text-white tracking-tight block group-hover:text-blue-400 transition">
                  Sharon Infotech
                </span>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                  Nagpur • Est. 2013
                </span>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs">
              Nagpur’s premier computer repair, laptop chip-level repair, printer service & cartridge refilling, CCTV installation, and data recovery center.
            </p>

            <button
              onClick={onOpenBooking}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs transition shadow-md shadow-blue-900/30 flex items-center justify-center gap-2 min-h-[44px]"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Book Doorstep Repair</span>
            </button>
          </div>

          {/* Col 2: Services & Repairs */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5" />
              <span>Services & Repair</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigatePage('services', 'computer-repair')} className="hover:text-blue-400 transition text-left flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-blue-400" />
                  <span>Desktop PC & Custom Assembly</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('services', 'laptop-repair')} className="hover:text-blue-400 transition text-left flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-blue-400" />
                  <span>Laptop Chip-Level & Motherboard</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('services', 'laptop-repair')} className="hover:text-blue-400 transition text-left flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-blue-400" />
                  <span>Display Screen & Hinge Repair</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('services', 'printer-repair')} className="hover:text-amber-400 transition text-left flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-amber-400" />
                  <span>Printer Repair & Cartridge Refill</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('services', 'cctv-installation')} className="hover:text-emerald-400 transition text-left flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400" />
                  <span>CCTV Camera Setup & AMC</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('services', 'data-recovery')} className="hover:text-purple-400 transition text-left flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-purple-400" />
                  <span>Hard Disk & SSD Data Recovery</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('services', 'networking-amc')} className="hover:text-cyan-400 transition text-left flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-cyan-400" />
                  <span>LAN Networking & Office Wi-Fi</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('services', 'tally-multi-user-lan')} className="hover:text-cyan-400 transition text-left flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-cyan-400" />
                  <span>Tally Multi-User LAN & Quick Heal</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('services', 'smart-home-automation')} className="hover:text-emerald-400 transition text-left flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400" />
                  <span>Smart Home & Biometric Locks</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Brand Laptop Repairs */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Laptop className="w-3.5 h-3.5" />
              <span>Brand Repairs</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigatePage('brands', 'hp')} className="hover:text-emerald-300 transition text-left flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400" />
                  <span>HP Laptop Repair Nagpur</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('brands', 'dell')} className="hover:text-emerald-300 transition text-left flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400" />
                  <span>Dell Inspiron & Vostro Service</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('brands', 'lenovo')} className="hover:text-emerald-300 transition text-left flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400" />
                  <span>Lenovo & ThinkPad Repair</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('brands', 'apple')} className="hover:text-emerald-300 transition text-left flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400" />
                  <span>Apple MacBook Pro & Air Repair</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('brands', 'acer')} className="hover:text-emerald-300 transition text-left flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400" />
                  <span>Acer Nitro & Aspire Service</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('brands', 'asus')} className="hover:text-emerald-300 transition text-left flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400" />
                  <span>ASUS ROG & VivoBook Repair</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('brands', 'msi')} className="hover:text-emerald-300 transition text-left flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400" />
                  <span>MSI Gaming Laptop Repair</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Hardware & Products */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5" />
              <span>Products & Parts</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigatePage('products')} className="hover:text-purple-300 transition text-left flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-purple-400" />
                  <span>High-Speed NVMe & SATA SSDs</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('products')} className="hover:text-purple-300 transition text-left flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-purple-400" />
                  <span>DDR4 / DDR5 Laptop RAM</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('products')} className="hover:text-purple-300 transition text-left flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-purple-400" />
                  <span>Original Laptop Chargers</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('products')} className="hover:text-purple-300 transition text-left flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-purple-400" />
                  <span>OEM Replacement Batteries</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('products')} className="hover:text-purple-300 transition text-left flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-purple-400" />
                  <span>Full HD Laptop LCD Screens</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('products')} className="hover:text-purple-300 transition text-left flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-purple-400" />
                  <span>Replacement Keyboards & Body</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Main Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              <span>Main Pages</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigatePage('home')} className="hover:text-amber-300 transition text-left flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-amber-400" />
                  <span>Home Page</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('services')} className="hover:text-amber-300 transition text-left flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-amber-400" />
                  <span>Services Overview</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('brands')} className="hover:text-amber-300 transition text-left flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-amber-400" />
                  <span>Brand Support Pages</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('support')} className="hover:text-amber-300 transition text-left flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-amber-400" />
                  <span>Support & Live Status</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('service-areas')} className="hover:text-amber-300 transition text-left flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-amber-400" />
                  <span>Nagpur Service Areas</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('blog')} className="hover:text-amber-300 transition text-left font-bold text-amber-400 flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 text-amber-500" />
                  <span>Nagpur Blog & Tech Guides</span>
                </button>
                <div className="pl-3 border-l border-slate-800 space-y-1 my-1 text-[11px] text-slate-400">
                  <button onClick={() => onNavigatePage('blog', 'hardware-tips-replacement')} className="block hover:text-amber-300 text-left">
                    • Hardware Replacement Tips
                  </button>
                  <button onClick={() => onNavigatePage('blog', 'software-fixes')} className="block hover:text-amber-300 text-left">
                    • Software & Windows Fixes
                  </button>
                  <button onClick={() => onNavigatePage('blog', 'technology-news')} className="block hover:text-amber-300 text-left">
                    • Technology & Repair News
                  </button>
                </div>
              </li>
              <li>
                <button onClick={() => onNavigatePage('about')} className="hover:text-amber-300 transition text-left flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-amber-400" />
                  <span>About Us (12+ Years Trust)</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigatePage('contact')} className="hover:text-amber-300 transition text-left flex items-center gap-1 group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-amber-400" />
                  <span>Contact Us & Map Location</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Contact Information Banner */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
            
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white text-xs">Office Address</p>
                <p className="text-[11px] text-slate-300 leading-snug">
                  Office No 1, 2nd Floor, Tilak, Panchasheel Sq., Opp. Patrakar Bhawan, Dhantoli, Nagpur 440012
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white text-xs">Call / WhatsApp</p>
                <a href="tel:7249430043" className="text-emerald-400 font-extrabold text-sm hover:underline block">
                  +91-7249430043
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white text-xs">Working Hours</p>
                <p className="text-[11px] text-slate-300">Mon - Sun: 9:30 AM - 8:30 PM (7 Days)</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://maps.app.goo.gl/wwuRxErEFDjFEqTL6"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold transition shadow-md text-xs flex items-center justify-center gap-1.5 min-h-[44px]"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Google Maps Directions</span>
                <ExternalLink className="w-3 h-3 opacity-80" />
              </a>
            </div>

          </div>
        </div>

        {/* SEO Cross-linking Section for 220+ Nagpur Service Areas */}
        <div className="pt-8 pb-6 border-t border-slate-900 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                Nagpur Service Area Locality Pages (220+ Dedicated Pages)
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Click any Nagpur area below to view dedicated doorstep computer & laptop repair pages for your locality.
              </p>
            </div>

            {/* Area Search in Footer */}
            <div className="relative w-full sm:w-64">
              <label htmlFor="footer-area-search" className="sr-only">
                Find your Nagpur area
              </label>
              <input
                id="footer-area-search"
                type="text"
                value={footerAreaQuery}
                onChange={(e) => setFooterAreaQuery(e.target.value)}
                placeholder="Find your area (e.g., Besa, Beltarodi)..."
                className="w-full bg-slate-900 text-white text-xs px-3 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 placeholder-slate-400 min-h-[44px]"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
            </div>
          </div>

          {/* Quick Location Pills */}
          <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
            {(footerAreaQuery ? filteredFooterLocations : ALL_NAGPUR_LOCATIONS.slice(0, 75)).map((loc) => (
              <button
                key={loc.id}
                onClick={() => onNavigatePage('service-areas', loc.id)}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-emerald-950/80 hover:text-emerald-400 border border-slate-800/80 hover:border-emerald-500/50 text-[11px] text-slate-300 transition"
              >
                {loc.name}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] text-slate-500">
              Showing {footerAreaQuery ? filteredFooterLocations.length : 75} of {ALL_NAGPUR_LOCATIONS.length} Nagpur localities
            </span>
            <button
              onClick={() => onNavigatePage('service-areas')}
              className="text-[11px] font-bold text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>Explore All {ALL_NAGPUR_LOCATIONS.length} Locality Pages</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            © 2013 - {new Date().getFullYear()} <a href="https://sharoninfotech.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 underline">Sharon Infotech</a> Nagpur. All Rights Reserved. Contact: +91-7249430043 | Local Portal: https://computerrepairnagpur.com
          </p>
          <div className="flex items-center gap-3">
            {onOpenSearchModal && (
              <button
                onClick={onOpenSearchModal}
                className="text-slate-400 hover:text-amber-300 transition flex items-center gap-1 font-bold bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800"
              >
                <Search className="w-3 h-3 text-amber-400" />
                <span>Google Search Engine</span>
              </button>
            )}
            <div className="flex items-center gap-1">
              <span>Nagpur's Trusted Computer & Laptop Service Center</span>
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500 ml-1" />
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

