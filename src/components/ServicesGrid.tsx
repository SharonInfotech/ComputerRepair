import React, { useState } from 'react';
import {
  Monitor,
  Cpu,
  Printer,
  Camera,
  HardDrive,
  Network,
  ShieldCheck,
  Zap,
  Clock,
  CheckCircle,
  ArrowRight,
  Phone,
  Wrench,
  Settings,
  Download,
  Filter,
  Sparkles
} from 'lucide-react';

interface ServicesGridProps {
  onSelectService: (serviceTitle: string) => void;
}

export type ServiceCategory = 'All' | 'Repair' | 'Maintenance' | 'Installation' | 'Data Recovery';

interface ServiceItem {
  id: string;
  category: 'Repair' | 'Maintenance' | 'Installation' | 'Data Recovery';
  categoryLabel: string;
  icon: React.ElementType;
  title: string;
  description: string;
  time: string;
  startingPrice: number;
  warranty: number;
  features: string[];
}

const SHARON_SERVICES: ServiceItem[] = [
  {
    id: 'laptop-repair',
    category: 'Repair',
    categoryLabel: 'Laptop Repair',
    icon: Cpu,
    title: 'Laptop Chip-Level & Motherboard Repair',
    description: 'Specialized motherboard micro-soldering for dead laptops, power IC failure, liquid damage, display flex cable, and bios re-flashing.',
    time: '45 Mins - Same Day',
    startingPrice: 499,
    warranty: 90,
    features: ['Dell, HP, Lenovo, MacBook Specialists', 'Microscope Soldering Station', 'Original OEM Component Swaps']
  },
  {
    id: 'desktop-computer',
    category: 'Repair',
    categoryLabel: 'Desktop Repair',
    icon: Monitor,
    title: 'Computer & Desktop PC Repair Service',
    description: 'Fix no-display tower PCs, blue screen errors, power supply SMPS failure, RAM/SSD upgrades, and custom gaming PC building.',
    time: '1 to 3 Hours',
    startingPrice: 399,
    warranty: 90,
    features: ['Free Diagnostic Voltage Check', 'Windows OS & Driver Setup', 'Dust Cleaning & Thermal Paste']
  },
  {
    id: 'printer-repair',
    category: 'Repair',
    categoryLabel: 'Printer Service',
    icon: Printer,
    title: 'Printer Repair & Toner Refilling',
    description: 'Laserjet and Inkjet printer servicing for HP, Canon, Epson, and Brother. Ink tank head unclogging, roller fix, and cartridge refilling.',
    time: '1 to 2 Hours',
    startingPrice: 299,
    warranty: 60,
    features: ['High Yield Toner Refilling', 'Original Thermal Print Heads', 'Paper Jam & Sensor Fixing']
  },
  {
    id: 'cctv-installation',
    category: 'Installation',
    categoryLabel: 'CCTV Setup',
    icon: Camera,
    title: 'CCTV Camera Installation & DVR Setup',
    description: 'HD IP / Dome / Bullet CCTV camera installation for homes, shops, and offices in Nagpur. Hikvision & CP Plus DVR setup & mobile live viewing.',
    time: 'Same Day Site Visit',
    startingPrice: 999,
    warranty: 365,
    features: ['Night Vision HD Recording', 'Remote Mobile Phone Access', 'Annual Maintenance Contracts (AMC)']
  },
  {
    id: 'data-recovery',
    category: 'Data Recovery',
    categoryLabel: 'Data Recovery',
    icon: HardDrive,
    title: 'Data Recovery & Hard Drive Backup',
    description: 'Recover deleted, formatted, or corrupted photos, documents, and videos from crashed hard drives, external SSDs, and USB flash drives.',
    time: '24 to 48 Hours',
    startingPrice: 1200,
    warranty: 100,
    features: ['Clean Room Recovery Protocols', 'HDD Head Crash Recovery', '100% Data Confidentiality Guaranteed']
  },
  {
    id: 'computer-networking',
    category: 'Installation',
    categoryLabel: 'Network Setup',
    icon: Network,
    title: 'Computer Networking & Wi-Fi Setup',
    description: 'Office LAN cabling, server rack setup, dual-band Wi-Fi router installation, firewall security, and multi-PC file sharing.',
    time: 'Same Day Setup',
    startingPrice: 799,
    warranty: 180,
    features: ['Cat6 High-Speed Cabling', 'Zero Dead Zone Wi-Fi Coverage', 'Router & Switch Configuration']
  },
  {
    id: 'it-support-amc',
    category: 'Maintenance',
    categoryLabel: 'AMC Support',
    icon: ShieldCheck,
    title: 'IT Support & Corporate AMC Maintenance',
    description: 'Annual Maintenance Contracts (AMC) for schools, colleges, clinics, and offices in Nagpur. Unlimited technician support calls and monthly tune-ups.',
    time: 'On-Demand Support',
    startingPrice: 1499,
    warranty: 365,
    features: ['Preventative Monthly Audits', 'Emergency 30-Min On-Site Visit', 'Dedicated IT Engineer Assigned']
  },
  {
    id: 'ssd-ram-speed',
    category: 'Maintenance',
    categoryLabel: 'Performance Upgrade',
    icon: Zap,
    title: 'NVMe SSD & RAM Speed Maintenance',
    description: 'Upgrade your laptop or desktop with 512GB / 1TB NVMe SSDs and 8GB/16GB DDR4/DDR5 RAM. Deep thermal paste maintenance & OS tuning.',
    time: '30 Minutes Express',
    startingPrice: 1450,
    warranty: 365,
    features: ['Zero Data Loss OS Cloning', 'Genuine Samsung/Crucial SSDs', 'Instant Multitasking Acceleration']
  },
  {
    id: 'smart-home-biometrics',
    category: 'Installation',
    categoryLabel: 'Smart Automation',
    icon: Settings,
    title: 'Smart Home Retrofit & Biometric Door Locks',
    description: 'Modernize homes and offices in Nagpur with Touch Glass Switches, Wi-Fi smart home retrofit modules, and biometric fingerprint/face door locks.',
    time: 'Same Day Installation',
    startingPrice: 1299,
    warranty: 365,
    features: ['Touch Glass Switches & App Control', 'Biometric Door Locks & Attendance', 'Zero Rewiring Retrofit Setup']
  },
  {
    id: 'tally-lan-software',
    category: 'Maintenance',
    categoryLabel: 'Enterprise Software',
    icon: ShieldCheck,
    title: 'Tally Multi-User LAN, Windows 11 & Quick Heal',
    description: 'Complete Tally Prime Multi-User LAN synchronization (2–10+ PCs), automated server backup, genuine Windows 11 / Office 365 & Quick Heal Total Security.',
    time: '1 to 2 Hours',
    startingPrice: 599,
    warranty: 365,
    features: ['Tally Prime Multi-User LAN Sync', 'Windows 11 Pro & MS Office 365', 'Quick Heal Total Security Antivirus']
  }
];

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onSelectService }) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('All');

  const categoriesList: { name: ServiceCategory; label: string; icon: React.ElementType }[] = [
    { name: 'All', label: 'All Services', icon: Filter },
    { name: 'Repair', label: 'Hardware Repair', icon: Wrench },
    { name: 'Maintenance', label: 'Maintenance & AMC', icon: Settings },
    { name: 'Installation', label: 'Installation & Setup', icon: Camera },
    { name: 'Data Recovery', label: 'Data Recovery', icon: Download }
  ];

  const filteredServices = SHARON_SERVICES.filter((s) => {
    if (activeCategory === 'All') return true;
    return s.category === activeCategory;
  });

  return (
    <section id="services" className="py-16 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-blue-400 font-extrabold text-xs uppercase tracking-widest bg-blue-950/80 px-3.5 py-1 rounded-full border border-blue-500/30 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            Sharon Infotech Complete IT Services in Nagpur
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-3">
            Computer, Laptop, Printer, CCTV & Networking Solutions
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Categorized IT solutions for fast diagnosis and doorstep pickup across Nagpur. Select a category below to filter.
          </p>
        </div>

        {/* Dynamic Category Filter Bar */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categoriesList.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.name;
            const count = cat.name === 'All' 
              ? SHARON_SERVICES.length 
              : SHARON_SERVICES.filter((s) => s.category === cat.name).length;

            return (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                aria-label={`Filter services by category: ${cat.label}`}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black transition flex items-center gap-2 shrink-0 min-h-[44px] ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-2 ring-blue-400 scale-105'
                    : 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-700'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-blue-400'}`} />
                <span>{cat.label}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                    isSelected ? 'bg-blue-800 text-blue-100' : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.id}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-5 hover:border-blue-500/50 transition duration-300 flex flex-col justify-between group shadow-lg"
              >
                <div className="space-y-4">
                  
                  {/* Top Bar with Category Badge & Turnaround Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition transform">
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className="text-[10px] font-extrabold uppercase text-blue-400 bg-blue-950/80 border border-blue-800/40 px-2.5 py-0.5 rounded-md">
                      {service.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Turnaround Time Pill */}
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-300 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>Time: {service.time}</span>
                  </div>

                  {/* Feature Bullets */}
                  <ul className="space-y-1.5 pt-2 border-t border-slate-900 text-xs text-slate-300">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                </div>

                {/* Card Footer */}
                <div className="pt-5 mt-5 border-t border-slate-900 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Starting From</span>
                    <span className="text-base font-black text-amber-300">₹{service.startingPrice.toLocaleString()}</span>
                  </div>

                  <button
                    onClick={() => onSelectService(service.title)}
                    aria-label={`Book service: ${service.title}`}
                    className="px-3.5 py-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white text-xs font-bold border border-blue-500/30 transition flex items-center gap-1 min-h-[44px]"
                  >
                    <span>Book Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-12 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-7 h-7 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Sharon Infotech Warranty & Data Security Assurance</h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Every repair, screen, battery, printer head, or CCTV installation comes with official written warranty cards and 100% data confidentiality.
              </p>
            </div>
          </div>

          <a
            href="tel:7249430043"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider shrink-0 shadow-lg transition flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            Call Nagpur Helpline: 7249430043
          </a>
        </div>

      </div>
    </section>
  );
};

