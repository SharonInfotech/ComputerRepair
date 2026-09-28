import React, { useState } from 'react';
import {
  ShieldCheck,
  Truck,
  Sparkles,
  Award,
  CheckCircle2,
  ArrowRight,
  Phone,
  Clock,
  RotateCcw,
  MapPin,
  Printer,
  Camera,
  HardDrive,
  Network,
  Wrench,
  Check
} from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: (mode?: 'doorstep' | 'instore') => void;
  onNavigateSection: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onNavigateSection
}) => {
  const [selectedDevice, setSelectedDevice] = useState('Laptop');
  const [selectedIssue, setSelectedIssue] = useState('Screen / Display Broken');

  const handleQuickBook = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBooking('doorstep');
  };

  return (
    <section id="hero" className="relative bg-slate-900 text-white overflow-hidden pt-8 pb-16 lg:py-20 border-b border-slate-800">
      {/* Subtle background glow effect */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Value Proposition & Hero Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-950/90 border border-blue-500/40 text-blue-300 px-3.5 py-1.5 rounded-full text-xs font-extrabold shadow-inner flex-wrap justify-center sm:justify-start">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Sharon Infotech • Nagpur's Most Trusted IT Center</span>
              <span className="bg-amber-500/20 text-amber-300 text-[10px] px-2.5 py-0.5 rounded-full font-black border border-amber-500/30">
                Since 2013 (12+ Years)
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Local Computer, Laptop, Printer & CCTV <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                Repair Service in Nagpur
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Facing laptop slowdown, printer error, liquid damage, or need CCTV installation in Nagpur? <strong className="text-white font-bold">Sharon Infotech</strong> provides certified chip-level repairs, data recovery, and IT networking with <strong className="text-emerald-400 font-bold">Free Doorstep Pickup across Nagpur City</strong>.
            </p>

            {/* Core Services Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 text-xs font-bold text-slate-200">
              <div className="flex items-center gap-2 bg-slate-800/90 p-2.5 rounded-xl border border-slate-700">
                <Wrench className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Laptop & PC Repair</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/90 p-2.5 rounded-xl border border-slate-700">
                <Printer className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Printer Service</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/90 p-2.5 rounded-xl border border-slate-700">
                <Camera className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>CCTV Installation</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/90 p-2.5 rounded-xl border border-slate-700">
                <HardDrive className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Data Recovery</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/90 p-2.5 rounded-xl border border-slate-700">
                <Network className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>LAN & Networking</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/90 p-2.5 rounded-xl border border-slate-700">
                <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>IT Support & AMC</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <button
                onClick={() => onOpenBooking('doorstep')}
                aria-label="Book Free Nagpur Pickup"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-base shadow-xl shadow-blue-600/30 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2 min-h-[44px]"
              >
                <Truck className="w-5 h-5 text-blue-200" />
                Book Free Nagpur Pickup
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:7249430043"
                aria-label="Call Sharon Infotech at 7249430043"
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm transition shadow-lg flex items-center justify-center gap-2 min-h-[44px]"
              >
                <Phone className="w-4 h-4" />
                Call: 7249430043
              </a>
            </div>

            {/* Hotline banner */}
            <div className="pt-2 text-xs text-slate-400 flex items-center justify-center lg:justify-start gap-2 flex-wrap">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>Serving All Areas in Nagpur: Sitabuldi, Dharampeth, Sadar, Manish Nagar, Wardha Rd & More</span>
            </div>

          </div>

          {/* Right Column: Quick Request Widget */}
          <div className="lg:col-span-5 space-y-6">

            {/* Quick Instant Request Widget */}
            <div className="bg-slate-800/90 backdrop-blur border border-slate-700 rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  Quick Repair Estimate & Nagpur Slot
                </h3>
                <span className="text-[11px] text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  Call: 7249430043
                </span>
              </div>

              <form onSubmit={handleQuickBook} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="hero-service-type" className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Service Type
                    </label>
                    <select
                      id="hero-service-type"
                      value={selectedDevice}
                      onChange={(e) => setSelectedDevice(e.target.value)}
                      className="w-full bg-slate-900 text-slate-100 text-xs rounded-xl border border-slate-700 px-3 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none min-h-[44px]"
                    >
                      <option value="Laptop">Laptop Repair (Dell/HP/Lenovo/Mac)</option>
                      <option value="Desktop PC">Desktop Computer Repair</option>
                      <option value="Printer">Printer Service (HP/Canon/Epson)</option>
                      <option value="CCTV">CCTV Installation & Repair</option>
                      <option value="Data Recovery">Hard Drive / Data Recovery</option>
                      <option value="Networking">LAN, Wi-Fi & Tally Multi-User</option>
                      <option value="IT AMC">Corporate IT Support & AMC</option>
                      <option value="Smart Home & Biometrics">Smart Home & Biometric Locks</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="hero-primary-issue" className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Primary Issue
                    </label>
                    <select
                      id="hero-primary-issue"
                      value={selectedIssue}
                      onChange={(e) => setSelectedIssue(e.target.value)}
                      className="w-full bg-slate-900 text-slate-100 text-xs rounded-xl border border-slate-700 px-3 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none min-h-[44px]"
                    >
                      <option value="Screen / Display Broken">Screen / Display Fault</option>
                      <option value="Printer Paper Jam / Cartridge">Printer Ink/Toner Issue</option>
                      <option value="CCTV Camera Offline">CCTV No Signal / Offline</option>
                      <option value="Hard Drive Crashed">HDD / SSD Data Lost</option>
                      <option value="Liquid Spill Damage">Water Spill / Power Dead</option>
                      <option value="Slow Speed / Need SSD Upgrade">Slow Speed / RAM Upgrade</option>
                      <option value="Tally Multi-User LAN / Office Network">Tally Multi-User LAN / Wi-Fi Setup</option>
                      <option value="Smart Home / Biometric Lock Setup">Smart Home / Biometric Door Lock</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  aria-label="Get Instant Nagpur Free Quote and Pickup Slot"
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center gap-1.5 min-h-[44px]"
                >
                  Get Instant Nagpur Free Quote & Pickup Slot
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

          </div>

        </div>

        {/* Brand repair ticker */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-center">
          <p className="text-xs uppercase font-extrabold text-slate-400 tracking-wider mb-4">
            Sharon Infotech Servicing All Top Hardware Brands in Nagpur
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-slate-300 font-bold text-xs sm:text-sm">
            <span className="hover:text-blue-400 transition">Dell Laptops</span>
            <span className="hover:text-blue-400 transition">HP Printers & Laptops</span>
            <span className="hover:text-blue-400 transition">Lenovo ThinkPad</span>
            <span className="hover:text-blue-400 transition">Apple MacBook & iMac</span>
            <span className="hover:text-blue-400 transition">Canon & Epson Printers</span>
            <span className="hover:text-blue-400 transition">Hikvision & CP Plus CCTV</span>
            <span className="hover:text-blue-400 transition">ASUS & Acer Gaming</span>
          </div>
        </div>

      </div>
    </section>
  );
};
