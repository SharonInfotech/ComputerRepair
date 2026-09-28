import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, Clock, ArrowRight, ShieldAlert, Cpu, Wrench, Eye } from 'lucide-react';

interface RepairCase {
  id: string;
  title: string;
  device: string;
  location: string;
  problem: string;
  solution: string;
  timeTaken: string;
  costSaved: string;
  beforeLabel: string;
  afterLabel: string;
  beforeDetails: string[];
  afterDetails: string[];
  imageUrlBefore: string;
  imageUrlAfter: string;
}

const REPAIR_CASES: RepairCase[] = [
  {
    id: 'macbook-liquid-damage',
    title: 'Apple MacBook Air M2 Liquid Damage Chip Repair',
    device: 'MacBook Air M2 (A2681)',
    location: 'Dharampeth, Nagpur',
    problem: 'Tea spill caused dead logic board, power IC short circuit, and no display backlight.',
    solution: 'Microscope chip-level capacitor replacement, ultrasonic PCB cleaning, and backlight IC reflow.',
    timeTaken: '24 Hours',
    costSaved: '₹32,000 Saved vs Official Board Swap',
    beforeLabel: 'Before: Dead Board & Shorted Capacitors',
    afterLabel: 'After: 100% Functioning & Original Display',
    beforeDetails: ['Power IC Shorted', 'Corrosion on Power Rail', 'No Power LED'],
    afterDetails: ['Ultrasonic Cleaned Board', 'Replaced Power Management IC', '100% Original Performance Saved'],
    imageUrlBefore: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=80',
    imageUrlAfter: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'dell-inspiron-hinge-screen',
    title: 'Dell Inspiron 15 Broken Hinge & Touch Display Swap',
    device: 'Dell Inspiron 15 5000 Series',
    location: 'Manish Nagar, Nagpur',
    problem: 'Laptop body cracked at hinge corner, display panel flickering and hanging loose.',
    solution: 'Custom brass nut hinge fabrication, brand-new 100% OEM FHD IPS display screen swap.',
    timeTaken: '2 Hours Doorstep Service',
    costSaved: '₹6,500 Saved with Hinge Fabrication',
    beforeLabel: 'Before: Broken Plastic Frame & Hanging Screen',
    afterLabel: 'After: Factory-Finish Reinforced Casing',
    beforeDetails: ['Broken C-Cover Hinge Mount', 'Screen Cable Pinched', 'Casing Unclosable'],
    afterDetails: ['Reinforced Brass Mounting', 'Brand New 1080p FHD Screen', 'Smooth 180° Hinge Movement'],
    imageUrlBefore: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80',
    imageUrlAfter: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'gaming-pc-thermal-overheating',
    title: 'Custom Gaming PC Deep Cleaning & Thermal Repaste',
    device: 'Core i7 13th Gen + RTX 3080 Tower',
    location: 'Ramdaspeth, Nagpur',
    problem: 'PC thermal throttling at 98°C during gaming, noisy fans, sudden shutdown.',
    solution: 'Complete air dust pressure blow, Noctua NT-H2 thermal paste repaste, cable management.',
    timeTaken: '45 Minutes',
    costSaved: 'Prevented GPU Processor Burnout',
    beforeLabel: 'Before: Clogged Heatsink & 98°C Heat Spike',
    afterLabel: 'After: Cool 62°C Peak Gaming Temp',
    beforeDetails: ['98°C Thermal Throttling', 'Dust Clogged Radiator', 'Dried Up Thermal Compound'],
    afterDetails: ['62°C Full Load Temperature', 'Noctua High Performance Repaste', 'Silent Fan Operation'],
    imageUrlBefore: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80',
    imageUrlAfter: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80'
  }
];

export const RepairComparisonGallery: React.FC<{
  onOpenBooking: (mode?: 'doorstep' | 'lab', prefillNotes?: string) => void;
}> = ({ onOpenBooking }) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('macbook-liquid-damage');
  const [viewState, setViewState] = useState<'after' | 'before'>('after');

  const activeCase = REPAIR_CASES.find((c) => c.id === selectedCaseId) || REPAIR_CASES[0];

  return (
    <section className="py-16 bg-slate-950 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-emerald-400 font-extrabold text-xs uppercase tracking-widest bg-emerald-950/80 px-3.5 py-1 rounded-full border border-emerald-500/30 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Sharon Infotech Real Work Proof in Nagpur
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-3">
            Before & After Repair Gallery
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base">
            See real repair transformations done by our senior engineers in Nagpur—from dead motherboards to crushed laptop screens and liquid damage recovery.
          </p>
        </div>

        {/* Case Selector Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {REPAIR_CASES.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedCaseId(item.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition shrink-0 min-h-[44px] flex items-center gap-2 border ${
                selectedCaseId === item.id
                  ? 'bg-emerald-600 text-white border-emerald-400 shadow-lg shadow-emerald-900/40 ring-2 ring-emerald-400/50'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              <Wrench className="w-3.5 h-3.5 text-emerald-300" />
              <span>{item.device}</span>
            </button>
          ))}
        </div>

        {/* Active Case Display Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Interactive Image Comparison */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border-2 border-slate-700 bg-slate-950 shadow-inner group">
              <img
                src={viewState === 'after' ? activeCase.imageUrlAfter : activeCase.imageUrlBefore}
                alt={viewState === 'after' ? activeCase.afterLabel : activeCase.beforeLabel}
                className="w-full h-64 sm:h-80 object-cover transition duration-500 transform group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Status Badge Over Image */}
              <div className="absolute top-4 left-4 z-10">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-lg flex items-center gap-1.5 ${
                    viewState === 'after'
                      ? 'bg-emerald-500 text-slate-950 border border-emerald-300'
                      : 'bg-rose-600 text-white border border-rose-400'
                  }`}
                >
                  {viewState === 'after' ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" /> REPAIRED & VERIFIED
                    </>
                  ) : (
                    <>
                      <ShieldAlert className="w-3.5 h-3.5" /> ORIGINAL DAMAGE STATE
                    </>
                  )}
                </span>
              </div>

              {/* Toggle Controls */}
              <div className="absolute bottom-4 left-4 right-4 z-10 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-xl border border-slate-700/80 flex items-center gap-1">
                <button
                  onClick={() => setViewState('before')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition min-h-[40px] flex items-center justify-center gap-1 ${
                    viewState === 'before'
                      ? 'bg-rose-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Before</span>
                </button>
                <button
                  onClick={() => setViewState('after')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition min-h-[40px] flex items-center justify-center gap-1 ${
                    viewState === 'after'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>View After Repair</span>
                </button>
              </div>
            </div>

            {/* Cost Saving Callout */}
            <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-between">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Customer Savings:
              </span>
              <span className="text-white font-extrabold bg-emerald-800/80 px-2.5 py-0.5 rounded-md">
                {activeCase.costSaved}
              </span>
            </div>
          </div>

          {/* Right Column: Case Story & Details */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-1">
                <Cpu className="w-4 h-4" />
                <span>{activeCase.location} • Turnaround: {activeCase.timeTaken}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                {activeCase.title}
              </h3>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-rose-400 font-bold uppercase text-[10px] tracking-wider block">Initial Issue Reported:</span>
                <p className="text-slate-300 leading-relaxed">{activeCase.problem}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-emerald-400 font-bold uppercase text-[10px] tracking-wider block">Sharon Infotech Repair Solution:</span>
                <p className="text-slate-300 leading-relaxed">{activeCase.solution}</p>
              </div>
            </div>

            {/* Checklist items based on toggle */}
            <div className="pt-2">
              <span className="text-[11px] font-extrabold uppercase text-slate-400 block mb-2">
                {viewState === 'after' ? 'Verification Checks Completed:' : 'Diagnosed Failure Points:'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {(viewState === 'after' ? activeCase.afterDetails : activeCase.beforeDetails).map((detail, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-850">
                    <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${viewState === 'after' ? 'text-emerald-400' : 'text-rose-400'}`} />
                    <span className="text-slate-200 font-semibold">{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Trigger */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Got a similar issue?</span>
                <span className="text-xs text-slate-200 font-semibold">Free Diagnosis at your doorstep in Nagpur</span>
              </div>

              <button
                onClick={() => onOpenBooking('doorstep', `Repair request for ${activeCase.device} - ${activeCase.problem}`)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2 min-h-[44px]"
              >
                <span>Book This Repair Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
