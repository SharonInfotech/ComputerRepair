import React, { useState, useMemo, useEffect } from 'react';
import { FAQAccordion } from '../FAQAccordion';
import {
  MapPin,
  ChevronRight,
  Truck,
  Clock,
  Phone,
  MessageSquare,
  CheckCircle2,
  ShieldCheck,
  Building2,
  ArrowRight,
  Search,
  Filter,
  Navigation,
  ExternalLink,
  Mail,
  Laptop,
  Monitor,
  Printer,
  Camera,
  HardDrive,
  Wrench,
  Globe
} from 'lucide-react';
import { ALL_NAGPUR_LOCATIONS, LocationInfo } from '../../data/nagpurLocations';

export const NAGPUR_AREAS = ALL_NAGPUR_LOCATIONS;

interface ServiceAreasPageProps {
  initialSubPage?: string;
  onNavigateHome: () => void;
  onNavigatePage?: (page: string, subPage?: string) => void;
  onOpenBooking: (mode?: 'doorstep' | 'instore', prefill?: string) => void;
}

const CATEGORIES = [
  'All 220+ Localities',
  'Popular Urban',
  'Central & West',
  'South & East',
  'North & Koradi Belt',
  'MIDC & Industrial',
  'Regional & Outskirts'
];

const ALPHABETS = ['ALL', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

type ServiceTypeFilter =
  | 'all'
  | 'computer-at-home-nearme'
  | 'laptop-at-home-nearme'
  | 'computer-nearme-homeservice'
  | 'laptop-nearme-homeservice'
  | 'laptop-athome'
  | 'reliable-computer-nearme'
  | 'reliable-laptop-nearme'
  | 'any-laptop-shop-nearme'
  | 'any-computer-shop-nearme'
  | 'laptop-nearme'
  | 'computer-nearme'
  | 'laptop'
  | 'computer';

const INTENT_TAB_CONFIG: Array<{ id: ServiceTypeFilter; label: (loc: string) => string; getTitle: (loc: string) => string }> = [
  {
    id: 'all',
    label: (loc) => `All Services (${loc})`,
    getTitle: (loc) => `Laptop & Computer Repair in ${loc}, Nagpur`
  },
  {
    id: 'computer-at-home-nearme',
    label: (loc) => `Computer Repair At Home Near Me`,
    getTitle: (loc) => `Computer Repair At Home Near Me in ${loc}, Nagpur`
  },
  {
    id: 'laptop-at-home-nearme',
    label: (loc) => `Laptop Repair At Home Near Me`,
    getTitle: (loc) => `Laptop Repair At Home Near Me in ${loc}, Nagpur`
  },
  {
    id: 'computer-nearme-homeservice',
    label: (loc) => `Computer Repair Near Me Home Service`,
    getTitle: (loc) => `Computer Repair Near Me Home Service in ${loc}, Nagpur`
  },
  {
    id: 'laptop-nearme-homeservice',
    label: (loc) => `Laptop Repair Near Me Home Service`,
    getTitle: (loc) => `Laptop Repair Near Me Home Service in ${loc}, Nagpur`
  },
  {
    id: 'laptop-athome',
    label: (loc) => `Laptop Repair At Home`,
    getTitle: (loc) => `Doorstep Laptop Repair At Home in ${loc}, Nagpur`
  },
  {
    id: 'reliable-computer-nearme',
    label: (loc) => `Reliable Computer Repair Near Me`,
    getTitle: (loc) => `Reliable Computer Repair Near Me in ${loc}, Nagpur`
  },
  {
    id: 'reliable-laptop-nearme',
    label: (loc) => `Reliable Laptop Repair Near Me`,
    getTitle: (loc) => `Reliable Laptop Repair Near Me in ${loc}, Nagpur`
  },
  {
    id: 'any-laptop-shop-nearme',
    label: (loc) => `Any Laptop Repair Shop Near Me`,
    getTitle: (loc) => `Any Laptop Repair Shop Near Me in ${loc}, Nagpur`
  },
  {
    id: 'any-computer-shop-nearme',
    label: (loc) => `Any Computer Repair Shop Near Me`,
    getTitle: (loc) => `Any Computer Repair Shop Near Me in ${loc}, Nagpur`
  },
  {
    id: 'laptop-nearme',
    label: (loc) => `Laptop Repair Near Me`,
    getTitle: (loc) => `Laptop Repair Near Me in ${loc}, Nagpur`
  },
  {
    id: 'computer-nearme',
    label: (loc) => `Computer Repair Near Me`,
    getTitle: (loc) => `Computer Repair Near Me in ${loc}, Nagpur`
  },
  {
    id: 'laptop',
    label: (loc) => `Laptop Repair in ${loc}`,
    getTitle: (loc) => `Laptop Repair in ${loc}, Nagpur`
  },
  {
    id: 'computer',
    label: (loc) => `Computer & PC Repair in ${loc}`,
    getTitle: (loc) => `Computer & PC Repair in ${loc}, Nagpur`
  }
];

export const ServiceAreasPage: React.FC<ServiceAreasPageProps> = ({
  initialSubPage = 'dhantoli',
  onNavigateHome,
  onNavigatePage,
  onOpenBooking
}) => {
  const [activeAreaId, setActiveAreaId] = useState<string>(() => {
    const match = ALL_NAGPUR_LOCATIONS.find(a => a.id === initialSubPage || a.id.includes(initialSubPage) || initialSubPage.includes(a.id));
    return match ? match.id : ALL_NAGPUR_LOCATIONS[0].id;
  });

  const [serviceType, setServiceType] = useState<ServiceTypeFilter>('all');

  useEffect(() => {
    if (initialSubPage) {
      const match = ALL_NAGPUR_LOCATIONS.find(a => a.id === initialSubPage || a.id.includes(initialSubPage) || initialSubPage.includes(a.id));
      if (match) {
        setActiveAreaId(match.id);
      }
    }
  }, [initialSubPage]);

  const [areaSearch, setAreaSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All 220+ Localities');
  const [selectedLetter, setSelectedLetter] = useState<string>('ALL');

  const activeArea = useMemo(() => {
    return ALL_NAGPUR_LOCATIONS.find((a) => a.id === activeAreaId) || ALL_NAGPUR_LOCATIONS[0];
  }, [activeAreaId]);

  const filteredAreas = useMemo(() => {
    return ALL_NAGPUR_LOCATIONS.filter((item) => {
      const query = areaSearch.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.areaName.toLowerCase().includes(query) ||
        item.pincode.includes(query) ||
        item.category.toLowerCase().includes(query);

      const matchesCategory =
        selectedCategory === 'All 220+ Localities' || item.category === selectedCategory;

      const matchesLetter =
        selectedLetter === 'ALL' || item.name.toUpperCase().startsWith(selectedLetter);

      return matchesSearch && matchesCategory && matchesLetter;
    });
  }, [areaSearch, selectedCategory, selectedLetter]);

  // Page title dynamic based on serviceType focus
  const currentIntentConfig = INTENT_TAB_CONFIG.find((tab) => tab.id === serviceType) || INTENT_TAB_CONFIG[0];
  const dynamicTitle = currentIntentConfig.getTitle(activeArea.name);

  const showLaptopBreakdown =
    serviceType === 'all' ||
    serviceType.includes('laptop') ||
    serviceType.includes('computer');

  const showComputerBreakdown =
    serviceType === 'all' ||
    serviceType.includes('computer') ||
    serviceType.includes('laptop');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Breadcrumb Header */}
        <div className="flex items-center gap-2 text-xs text-slate-400 flex-wrap">
          <button onClick={onNavigateHome} className="hover:text-blue-400 transition">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <button
            onClick={() => {
              setSelectedCategory('All 220+ Localities');
              setSelectedLetter('ALL');
              setAreaSearch('');
            }}
            className="hover:text-blue-400 transition"
          >
            Nagpur Service Areas
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-emerald-400 font-extrabold">{activeArea.name}</span>
        </div>

        {/* Hero Title with Service Type Switcher */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 p-6 sm:p-8 rounded-3xl border border-emerald-800/40 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                Nagpur Service Location • {activeArea.pincode}
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                ETA: {activeArea.pickupTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              {dynamicTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Sharon Infotech provides certified doorstep laptop repair, desktop PC fixing, printer service, CCTV setup, and emergency data recovery across <strong className="text-emerald-400">{activeArea.name}</strong> and all surrounding neighborhoods in Nagpur.
            </p>

            {/* Service Focus Toggle Tabs */}
            <div className="pt-3 space-y-2">
              <div className="flex items-center gap-2">
                <Wrench className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs font-extrabold uppercase text-amber-400 tracking-wider">
                  High-Intent Search Phrase & Sub-Page Views for {activeArea.name}:
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
                {INTENT_TAB_CONFIG.map((tab) => {
                  const isActive = serviceType === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setServiceType(tab.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                        isActive
                          ? 'bg-emerald-600 text-white border-emerald-400 shadow-md font-extrabold scale-[1.02]'
                          : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <span>{tab.label(activeArea.name)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Filter Controls: Category Tabs & Search */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search input */}
            <div className="relative flex-1">
              <label htmlFor="service-area-search" className="sr-only">
                Search Nagpur service localities
              </label>
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                id="service-area-search"
                type="text"
                value={areaSearch}
                onChange={(e) => setAreaSearch(e.target.value)}
                placeholder="Search any locality e.g. Besa, Beltarodi, Koradi, Ramtek, Mihan..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-400 outline-none focus:border-emerald-500 transition min-h-[44px]"
              />
              {areaSearch && (
                <button
                  onClick={() => setAreaSearch('')}
                  aria-label="Clear area search"
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-white bg-slate-800 px-2 py-1 rounded min-h-[44px] flex items-center"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0 font-bold">
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>Found <strong className="text-white">{filteredAreas.length}</strong> Localities</span>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isCatActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  aria-label={`Filter localities by category: ${cat}`}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition border min-h-[44px] ${
                    isCatActive
                      ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* A-Z Index Bar */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none border-t border-slate-800 pt-3">
            <span className="text-[10px] uppercase font-bold text-slate-500 mr-1 shrink-0 flex items-center gap-1">
              <Filter className="w-3 h-3 text-slate-400" /> A-Z Filter:
            </span>
            {ALPHABETS.map((letter) => {
              const isSelected = selectedLetter === letter;
              return (
                <button
                  key={letter}
                  onClick={() => setSelectedLetter(letter)}
                  aria-label={`Filter localities starting with letter ${letter}`}
                  className={`w-11 h-11 rounded-md text-[11px] font-mono font-bold flex items-center justify-center shrink-0 transition ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-sm font-extrabold'
                      : 'bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Area Detail View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Selected Area Detail Card */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-black text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-800">
                    Pincode: {activeArea.pincode}
                  </span>
                  <span className="text-[10px] font-bold text-blue-300 bg-blue-950 px-2.5 py-0.5 rounded border border-blue-800">
                    {activeArea.category}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
                  {dynamicTitle}
                </h2>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  {activeArea.landmark}
                </p>
              </div>

              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-right">
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Pickup ETA</span>
                <span className="text-xs font-black text-amber-300 flex items-center justify-end gap-1 mt-0.5">
                  <Clock className="w-3.5 h-3.5" /> {activeArea.pickupTime}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              {activeArea.description}
            </p>

            {/* Laptop Repair Specific Breakdown */}
            {showLaptopBreakdown && (
              <div className="bg-slate-950 p-5 rounded-2xl border border-blue-900/40 space-y-3">
                <h3 className="text-xs font-extrabold text-blue-300 uppercase tracking-wider flex items-center gap-2">
                  <Laptop className="w-4 h-4 text-blue-400" />
                  Laptop Repair Services Available in {activeArea.name}:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-300">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Display Screen & IPS Panel Replacement</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Battery Replacement & Charger Fixing</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Motherboard Chip-Level Repair & IC Fix</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Body Hinge Repair & Fabrication</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Liquid Damage & Corrosion Cleanup</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Keyboard, Touchpad & Fan Service</span>
                  </div>
                </div>
              </div>
            )}

            {/* Computer & Desktop Repair Specific Breakdown */}
            {showComputerBreakdown && (
              <div className="bg-slate-950 p-5 rounded-2xl border border-purple-900/40 space-y-3">
                <h3 className="text-xs font-extrabold text-purple-300 uppercase tracking-wider flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-purple-400" />
                  Computer & Desktop PC Repair Services in {activeArea.name}:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-300">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>Desktop Power Supply (SMPS/PSU) Replacement</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>Custom Gaming & Workstation PC Assembly</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>NVMe SSD Speed Upgrade & OS Installation</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>CPU Overheating Thermal Paste & Cooler Upgrade</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>RAM Upgrade & Dual-Channel Memory Setup</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>Virus Removal, Malware Clean & Windows Fix</span>
                  </div>
                </div>
              </div>
            )}

            {/* General Services Overview */}
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Popular Repair Services Highlights in {activeArea.name}:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeArea.popularServices.map((srv, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{srv}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* High-Intent Search Queries Covered for activeArea */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-emerald-900/30 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Search className="w-4 h-4 text-emerald-400" />
                  Local Search Query Views Covered for {activeArea.name}, Nagpur:
                </h3>
                <span className="text-[10px] text-slate-400 font-mono">14 High-Intent Query Views</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Click any specific search term below to switch page intent or book instant doorstep service for {activeArea.name}:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {INTENT_TAB_CONFIG.filter((tab) => tab.id !== 'all').map((tab) => {
                  const queryText = tab.getTitle(activeArea.name);
                  const isCurrentTab = serviceType === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setServiceType(tab.id)}
                      className={`p-2.5 rounded-xl text-left font-bold transition flex items-center justify-between gap-2 border ${
                        isCurrentTab
                          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/80 shadow-md ring-1 ring-emerald-500'
                          : 'bg-slate-900 text-slate-300 border-slate-800/90 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Wrench className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate text-[11px]">{queryText}</span>
                      </div>
                      <span className="text-[10px] uppercase font-mono text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded shrink-0">
                        View
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Doorstep Service Workflow */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                Doorstep Pickup & Repair Process in {activeArea.name}, Nagpur:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="space-y-1">
                  <span className="w-6 h-6 rounded-full bg-emerald-950 text-emerald-400 font-bold flex items-center justify-center text-xs border border-emerald-800">1</span>
                  <p className="font-bold text-white">Call or Request Pickup</p>
                  <p className="text-slate-400 text-[11px]">Share your address in {activeArea.name}</p>
                </div>
                <div className="space-y-1">
                  <span className="w-6 h-6 rounded-full bg-blue-950 text-blue-400 font-bold flex items-center justify-center text-xs border border-blue-800">2</span>
                  <p className="font-bold text-white">Rider Visit & Receipt</p>
                  <p className="text-slate-400 text-[11px]">Rider inspects & provides digital receipt</p>
                </div>
                <div className="space-y-1">
                  <span className="w-6 h-6 rounded-full bg-amber-950 text-amber-400 font-bold flex items-center justify-center text-xs border border-amber-800">3</span>
                  <p className="font-bold text-white">Repaired & Delivered</p>
                  <p className="text-slate-400 text-[11px]">Repaired, tested & delivered to your doorstep</p>
                </div>
              </div>
            </div>

            {/* Store Address & Contact Box */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <p className="font-extrabold text-white text-xs flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-blue-400" />
                Sharon Infotech Central Repair Hub (Servicing {activeArea.name}):
              </p>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Office No 1, Second Floor, Tilak, Panchasheel Square, near Panchasheel Theatre, Opposite Patrakar Bhawan, Dhantoli, Nagpur, Maharashtra 440012
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-1 font-mono text-[11px]">
                <a href="tel:+917249430043" className="text-emerald-400 font-bold hover:underline flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" /> +91-7249430043
                </a>
                <a href="mailto:prabhu@computerrepairnagpur.com" className="text-purple-300 font-bold hover:underline flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" /> prabhu@computerrepairnagpur.com
                </a>
              </div>
            </div>

            {/* DYNAMIC LOCALITY FAQ ACCORDION */}
            <FAQAccordion
              title={`Doorstep Repair FAQ for ${activeArea.name}, Nagpur (Pincode ${activeArea.pincode})`}
              subtitle={`Frequently Asked Questions for ${dynamicTitle} in ${activeArea.name}`}
              faqs={[
                {
                  question: `How fast can a technician visit my location in ${activeArea.name}, Nagpur for doorstep laptop or computer repair?`,
                  answer: `Our field engineers cover ${activeArea.name} (Pincode ${activeArea.pincode}) and surrounding areas. Upon receiving your call at 7249430043, a certified technician is assigned to reach your home or office in ${activeArea.name} within 30 to 45 minutes.`
                },
                {
                  question: `What types of computer and laptop repair services are available in ${activeArea.name}?`,
                  answer: `We provide complete on-site repair in ${activeArea.name}, including screen replacement, battery installation, motherboard IC repair, NVMe SSD speed upgrades, RAM installation, Windows OS formatting, liquid spill restoration, and desktop SMPS power supply replacement. Call 7249430043 for instant diagnosis.`
                },
                {
                  question: `What are the visiting and inspection charges for doorstep service in ${activeArea.name}?`,
                  answer: `Doorstep diagnostic visiting fee for ${activeArea.name} starts at just ₹199. If you proceed with the repair work or component replacement, the inspection charge is waived! Call 7249430043 to confirm availability.`
                },
                {
                  question: `Do replacement spare parts installed in ${activeArea.name} come with a written warranty?`,
                  answer: `Yes, absolutely! All hardware replacement parts (screens, batteries, keyboards, SSDs, RAM, motherboards) installed at your location in ${activeArea.name} come with an official stamped written warranty ranging from 90 days up to 3 years. Call 7249430043 for warranty support.`
                }
              ]}
              phone="7249430043"
              ctaTitle={`Need Technician in ${activeArea.name}, Nagpur?`}
              ctaSubtitle={`Call 7249430043 or book online for 30-minute doorstep service in ${activeArea.name}.`}
              onBookClick={() => onOpenBooking('doorstep', `Doorstep service request for ${activeArea.name}, Nagpur`)}
            />

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => onOpenBooking('doorstep', `Doorstep ${serviceType.includes('laptop') ? 'Laptop' : serviceType.includes('computer') ? 'Computer' : 'Laptop & Computer'} Repair Request for ${activeArea.name}, Nagpur`)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-emerald-600/30 transition flex items-center justify-center gap-2"
              >
                <Truck className="w-4 h-4" />
                <span>Book Doorstep Service in {activeArea.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/917249430043?text=Hi%20Sharon%20Infotech,%20I%20need%20${encodeURIComponent(dynamicTitle)}%20doorstep%20service%20in%20${encodeURIComponent(activeArea.name)},%20Nagpur`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Location</span>
              </a>

              <a
                href="https://maps.app.goo.gl/wwuRxErEFDjFEqTL6"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-extrabold text-xs transition flex items-center justify-center gap-1.5 border border-slate-700 min-h-[44px]"
              >
                <Navigation className="w-4 h-4 text-emerald-400" />
                <span>Directions</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Right Sidebar List of All Matching Locations */}
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  Select Location ({filteredAreas.length})
                </h3>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  220+ Localities
                </span>
              </div>

              <div className="space-y-1.5 max-h-[620px] overflow-y-auto pr-1 scrollbar-thin">
                {filteredAreas.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400">
                    No location found matching "{areaSearch}". Try searching "Besa", "Beltarodi", "Koradi", "Ramtek", or clear filters.
                  </div>
                ) : (
                  filteredAreas.map((area) => {
                    const isCur = area.id === activeAreaId;
                    return (
                      <button
                        key={area.id}
                        onClick={() => {
                          setActiveAreaId(area.id);
                          window.scrollTo({ top: 350, behavior: 'smooth' });
                        }}
                        className={`w-full text-left p-3 rounded-xl text-xs transition flex items-center justify-between ${
                          isCur
                            ? 'bg-emerald-600 text-white font-black shadow-lg scale-[1.02]'
                            : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800/80 font-bold'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <MapPin className={`w-3.5 h-3.5 shrink-0 ${isCur ? 'text-white' : 'text-emerald-400'}`} />
                          <span className="truncate">{area.name}</span>
                        </div>
                        <span className={`text-[10px] font-mono shrink-0 ml-1 ${isCur ? 'text-emerald-100' : 'text-slate-500'}`}>
                          {area.pincode}
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Directory Grid of All 220+ Computer & Laptop Repair Locations in Nagpur */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg sm:text-2xl font-black text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-400" />
                All 220+ Laptop & Computer Repair Pages in Nagpur
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Click any locality below to open its dedicated Laptop & Computer Repair page & book express doorstep service.
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedCategory('All 220+ Localities');
                setSelectedLetter('ALL');
                setAreaSearch('');
              }}
              className="text-xs font-bold text-blue-400 hover:underline self-start sm:self-auto"
            >
              Reset All Filters
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
            {ALL_NAGPUR_LOCATIONS.map((loc) => {
              const isSelected = loc.id === activeAreaId;
              return (
                <button
                  key={loc.id}
                  onClick={() => {
                    setActiveAreaId(loc.id);
                    window.scrollTo({ top: 380, behavior: 'smooth' });
                  }}
                  className={`p-2.5 rounded-xl text-left text-xs font-bold transition flex items-center justify-between gap-1 border ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-400 shadow-md font-extrabold'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-emerald-400'
                  }`}
                >
                  <span className="truncate">{loc.name}</span>
                  <ChevronRight className="w-3 h-3 shrink-0 opacity-60" />
                </button>
              );
            })}
          </div>
        </div>

        {/* SERVICE AREAS PAGE SPECIFIC FAQ SECTION */}
        <FAQAccordion
          title="Nagpur Doorstep Service Coverage FAQ"
          subtitle="Frequently asked questions about 30-minute technician visits across all 220+ Nagpur localities and pincodes."
          faqs={[
            {
              question: "Which areas in Nagpur are covered for 30-minute doorstep laptop & computer repair?",
              answer: "Sharon Infotech covers all 220+ Nagpur urban and suburban localities including Sitabuldi, Dharampeth, Sadar, Dhantoli, Besa, Manish Nagar, Wardha Road, Mankapur, Trimurti Nagar, Nandanvan, Mahal, and MIDC Hingna. Call 7249430043 for instant technician dispatch."
            },
            {
              question: "Is there any extra visiting or pickup charge for doorstep repair in Nagpur?",
              answer: "Visiting charges start at just ₹199 across Nagpur pin codes. If you proceed with the repair work, inspection charges are waived! Call 7249430043 to confirm visiting availability in your colony."
            },
            {
              question: "Can I get immediate home laptop screen or battery replacement in my area today?",
              answer: "Yes! Our mobile engineers carry genuine replacement screens and batteries for top laptop models. Call 7249430043 to book same-day service in your locality."
            }
          ]}
          phone="7249430043"
          ctaTitle="Need Doorstep Tech Service in Your Area?"
          ctaSubtitle="Call 7249430043 for instant computer and laptop repair dispatch across all 220+ Nagpur localities."
          onBookClick={() => onOpenBooking('doorstep', 'General doorstep repair request')}
        />

      </div>
    </div>
  );
};

