import React, { useState } from 'react';
import {
  Laptop,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Phone,
  Printer,
  Wrench,
  Search
} from 'lucide-react';

interface BrandInfo {
  id: string;
  brandName: string;
  tagline: string;
  badge: string;
  popularModels: string[];
  commonFixes: string[];
  startingPrice: string;
  turnaroundTime: string;
  seoDescription: string;
}

const BRANDS_DATA: BrandInfo[] = [
  {
    id: 'dell',
    brandName: 'Dell Laptop & PC Repair Nagpur',
    tagline: 'Authorized OEM level screens, genuine batteries & DC jack replacements',
    badge: 'Dell Specialist in Nagpur',
    popularModels: ['Inspiron 15 / 14 Series', 'XPS 13 & XPS 15', 'Latitude Corporate Series', 'Alienware & G-Series Gaming'],
    commonFixes: [
      'Original FHD / 4K Display Screen Replacement',
      'Original Dell Battery Replacement (1 Year Warranty)',
      'Hinge Broken / Plastic Shell Fabrication',
      'Motherboard No Power / Charging Port Loose'
    ],
    startingPrice: '₹499',
    turnaroundTime: '45 Mins - Same Day',
    seoDescription: 'Sharon Infotech is Nagpur’s top Dell laptop repair service provider. Fast chip-level motherboard repair, hinge replacement, thermal repasting, and original battery swaps in Dharampeth, Sitabuldi, and Wardha Road.'
  },
  {
    id: 'hp',
    brandName: 'HP Laptop & Printer Service Nagpur',
    tagline: 'Expert HP Pavilion, Spectre, Envy & Laserjet printer solutions in Nagpur',
    badge: 'HP Certified Experts',
    popularModels: ['HP Pavilion 14 / 15', 'HP Spectre & Envy x360', 'HP ProBook & EliteBook', 'HP Laserjet & Ink Tank Printers'],
    commonFixes: [
      'HP Pavilion Blue Screen / Boot Loop Repair',
      'HP Laptop Keyboard & Touchpad Swap',
      'HP Laserjet Cartridge Refilling & Paper Jam Fix',
      'HP Battery Swelling & Overheating Thermal Cleanup'
    ],
    startingPrice: '₹399',
    turnaroundTime: '1 to 3 Hours',
    seoDescription: 'Looking for HP laptop repair or HP printer repair in Nagpur? Sharon Infotech provides original HP laptop display panels, genuine batteries, and HP printer laser head repair at affordable rates.'
  },
  {
    id: 'lenovo',
    brandName: 'Lenovo ThinkPad & IdeaPad Repair Nagpur',
    tagline: 'Original ThinkPad keyboards, Legion gaming cooling & motherboard chip soldering',
    badge: 'Lenovo Master Engineers',
    popularModels: ['Lenovo ThinkPad T480/T490/X1', 'Lenovo IdeaPad Slim 3 / 5', 'Lenovo Legion 5 Gaming PC', 'Lenovo Yoga Touchscreen'],
    commonFixes: [
      'Lenovo ThinkPad TrackPoint & Spill-Resistant Keyboard',
      'Lenovo IdeaPad Hinge Snap & Base Chassis Repair',
      'Legion Gaming GPU Overheating & VRM Repasting',
      'Type-C Power IC Micro-soldering'
    ],
    startingPrice: '₹499',
    turnaroundTime: 'Same Day Delivery',
    seoDescription: 'Get expert Lenovo ThinkPad and IdeaPad laptop repair in Nagpur at Sharon Infotech. Fast Lenovo motherboard repairing, RAM SSD upgrade, and display screen replacement with doorstep pickup.'
  },
  {
    id: 'apple',
    brandName: 'Apple MacBook & iMac Repair Nagpur',
    tagline: 'M1/M2/M3 MacBook flexgate display, keyboard & liquid restoration specialist',
    badge: 'MacBook Chip Specialist',
    popularModels: ['MacBook Air M1 / M2 / M3', 'MacBook Pro 13 / 14 / 16 Inch', 'iMac 24 / 27 Inch', 'Mac Mini M2/M3'],
    commonFixes: [
      'Flexgate / Stage Light Display Cable Micro-repair',
      'MacBook Liquid Damage Logic Board Ultrasonic Cleaning',
      'MacBook Battery Service Warning Replacement',
      'Type-C Port & Audio Board Swapping'
    ],
    startingPrice: '₹1,200',
    turnaroundTime: '24 Hours Express',
    seoDescription: 'Save up to 60% compared to Apple store quotes! Sharon Infotech offers specialized logic board micro-soldering, MacBook screen replacement, and liquid spill recovery in Nagpur.'
  },
  {
    id: 'asus-acer',
    brandName: 'ASUS & Acer Gaming Laptop Repair Nagpur',
    tagline: 'High-performance ROG, TUF, Nitro & Predator gaming PC diagnostic lab',
    badge: 'Gaming PC Specialists',
    popularModels: ['ASUS ROG Strix / Zephyrus', 'ASUS TUF Gaming F15/A15', 'Acer Nitro 5 & Predator Helios', 'Acer Aspire Series'],
    commonFixes: [
      'Dual Fan Dust Cleaning & Liquid Metal Repasting',
      'NVIDIA / AMD GPU Artifact Fix & VRM Repair',
      '144Hz / 240Hz Gaming Screen Replacement',
      'RGB Keyboard & Power Rail Repair'
    ],
    startingPrice: '₹599',
    turnaroundTime: 'Same Day Service',
    seoDescription: 'Sharon Infotech is Nagpur’s premier gaming laptop repair shop for ASUS ROG, TUF, Acer Nitro, and Predator laptops. Liquid metal thermal repasting and high-refresh-rate display replacements.'
  },
  {
    id: 'printers-cctv',
    brandName: 'Printer Repair & CCTV Maintenance Nagpur',
    tagline: 'HP, Canon, Epson printer cartridge refilling & Hikvision/CP Plus CCTV installation',
    badge: 'Printer & CCTV Hub',
    popularModels: ['Epson EcoTank L3150 / L3250', 'Canon PIXMA & ImageCLASS', 'HP Laserjet Pro 1008', 'Hikvision & CP Plus HD Cameras'],
    commonFixes: [
      'Epson Ink Tank Print Head Unclogging',
      'Laserjet Toner Cartridge Powder Refilling',
      'CCTV DVR/NVR Hard Disk Recording Setup',
      'Night Vision IP Camera Wiring & AMC Maintenance'
    ],
    startingPrice: '₹299',
    turnaroundTime: '1 to 2 Hours',
    seoDescription: 'Need fast printer repair in Nagpur or CCTV installation for home/office? Sharon Infotech provides ink tank head cleaning, laser printer roller fix, and complete CCTV AMC in Nagpur.'
  }
];

interface BrandPagesSectionProps {
  onOpenBooking: (mode?: 'doorstep' | 'instore', prefill?: string) => void;
}

export const BrandPagesSection: React.FC<BrandPagesSectionProps> = ({ onOpenBooking }) => {
  const [selectedBrandId, setSelectedBrandId] = useState('dell');

  const activeBrand = BRANDS_DATA.find((b) => b.id === selectedBrandId) || BRANDS_DATA[0];

  return (
    <section id="brand-pages" className="py-16 bg-slate-950 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-indigo-400 font-extrabold text-xs uppercase tracking-widest bg-indigo-950/90 px-3.5 py-1 rounded-full border border-indigo-500/30">
            Brand-Specific Repair Services in Nagpur
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight mt-3">
            Dell, HP, Lenovo, MacBook, ASUS & Printer Repairs
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base">
            Sharon Infotech stocks genuine OEM spare parts for all major brands with specialized diagnostic equipment for precise chip-level repair.
          </p>
        </div>

        {/* Brand Selector Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
          {BRANDS_DATA.map((brand) => {
            const isActive = brand.id === selectedBrandId;
            return (
              <button
                key={brand.id}
                onClick={() => setSelectedBrandId(brand.id)}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 border ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800 hover:border-slate-700'
                }`}
              >
                {brand.id === 'printers-cctv' ? (
                  <Printer className="w-4 h-4 text-amber-400" />
                ) : (
                  <Laptop className="w-4 h-4 text-blue-400" />
                )}
                <span>{brand.brandName.split(' ')[0]} {brand.brandName.split(' ')[1]}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Brand Detail Display Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="bg-blue-950 text-blue-300 font-extrabold text-xs px-3 py-1 rounded-lg border border-blue-800">
                  {activeBrand.badge}
                </span>
                <span className="bg-emerald-950 text-emerald-300 font-bold text-xs px-3 py-1 rounded-lg border border-emerald-800">
                  Turnaround: {activeBrand.turnaroundTime}
                </span>
                <span className="bg-amber-950 text-amber-300 font-bold text-xs px-3 py-1 rounded-lg border border-amber-800">
                  Starting at {activeBrand.startingPrice}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {activeBrand.brandName}
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed">
                {activeBrand.tagline}
              </p>

              {/* SEO Context paragraph */}
              <p className="text-xs text-slate-400 bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 leading-relaxed">
                {activeBrand.seoDescription}
              </p>

              {/* Common Fixes List */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-black uppercase text-blue-400 tracking-wider">
                  Common Repairs Handled Daily at Sharon Infotech:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
                  {activeBrand.commonFixes.map((fix, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{fix}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Supported Models Badges */}
              <div>
                <h4 className="text-[11px] font-bold uppercase text-slate-400 mb-2">
                  Popular Models Serviced in Nagpur:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeBrand.popularModels.map((model, idx) => (
                    <span key={idx} className="bg-slate-800 text-slate-300 text-[11px] font-semibold px-2.5 py-1 rounded-md border border-slate-700">
                      {model}
                    </span>
                  ))}
                </div>
              </div>

              {/* Call to action */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onOpenBooking('doorstep', `Brand Request: ${activeBrand.brandName}`)}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs uppercase tracking-wider transition shadow-lg flex items-center justify-center gap-2"
                >
                  Book {activeBrand.brandName.split(' ')[0]} Repair in Nagpur
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="tel:7249430043"
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-extrabold text-xs border border-slate-700 transition flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  Call Engineer: 7249430043
                </a>
              </div>

            </div>

            {/* Right Card Feature Box */}
            <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                Sharon Infotech Quality Promise
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="font-bold text-white block">100% Original OEM Parts</span>
                  <span className="text-slate-400">We source screens, batteries, and IC chips directly from verified OEM distributors.</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="font-bold text-white block">90 to 180 Days Warranty</span>
                  <span className="text-slate-400">Written warranty card issued with every repair ticket for complete peace of mind.</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="font-bold text-white block">Free Diagnosis in Nagpur</span>
                  <span className="text-slate-400">Zero inspection fee. Pay only if your device is successfully fixed!</span>
                </div>
              </div>

              <div className="pt-2 text-center text-[11px] text-slate-400">
                © Sharon Infotech • Serving Nagpur City Since 2013
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
