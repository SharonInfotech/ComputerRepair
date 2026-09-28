import React from 'react';
import {
  Award,
  ChevronRight,
  ShieldCheck,
  Users,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  Building2,
  Sparkles,
  ArrowRight,
  Navigation,
  ExternalLink
} from 'lucide-react';

interface AboutUsPageProps {
  onNavigateHome: () => void;
  onOpenBooking: (mode?: 'doorstep' | 'instore') => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({
  onNavigateHome,
  onOpenBooking
}) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Breadcrumb Header */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <button onClick={onNavigateHome} className="hover:text-blue-400 transition">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-blue-400 font-extrabold">About Sharon Infotech</span>
        </div>

        {/* Page Hero Banner */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 p-8 sm:p-12 rounded-3xl border border-blue-800/40 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              Established 2013 • Nagpur's #1 Computer Repair Laboratory
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              12+ Years of Trusted IT Service in Nagpur
            </h1>
            <p className="text-xs sm:text-base text-slate-300 leading-relaxed font-medium">
              Sharon Infotech is Nagpur's premier computer repair, laptop service, printer refilling, CCTV security installation, and corporate IT AMC provider. Founded in 2013, we have successfully resolved over 38,000+ hardware and software issues across Sitabuldi, Dharampeth, Sadar, Ramdaspeth, Dhantoli, Manish Nagar, and all Nagpur pin codes.
            </p>
          </div>
        </div>

        {/* Detailed About Us Sections with IDs */}
        <div className="space-y-8">
          {/* Who We Are */}
          <div id="who-we-are" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <span className="text-xs font-black uppercase text-blue-400 bg-blue-950 px-3 py-1 rounded-full border border-blue-800">
              Who We Are
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Nagpur's Premier ISO-Certified IT Service Lab</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Sharon Infotech is a leading technology solutions firm established in 2013 in Dhantoli, Nagpur. Operated by a team of certified hardware engineers and BGA chip micro-soldering experts, we specialize in high-precision computer repair, laptop component servicing, printer ink refilling, optical fiber network setups, and enterprise security camera installation.
            </p>
          </div>

          {/* What We Do */}
          <div id="what-we-do" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <span className="text-xs font-black uppercase text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
              What We Do
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Comprehensive 360° IT Support & Component Repair</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs text-slate-300">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <h3 className="font-bold text-white text-sm text-blue-400">Motherboard & Chip-Level BGA</h3>
                <p>Advanced dark-room micro soldering, power IC replacement, short circuit removal, and GPU reballing for all laptop brands.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <h3 className="font-bold text-white text-sm text-emerald-400">Doorstep & In-Store Repairs</h3>
                <p>Same-day field engineer visits across all 1000+ Nagpur locations for screen swaps, SSD upgrades, and Windows OS setups.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <h3 className="font-bold text-white text-sm text-amber-400">Printer & CCTV Security AMC</h3>
                <p>LaserJet toner refilling, printer drum replacements, Hikvision HD IP CCTV camera setups, and corporate IT Maintenance Contracts.</p>
              </div>
            </div>
          </div>

          {/* Our Mission */}
          <div id="our-mission" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <span className="text-xs font-black uppercase text-amber-400 bg-amber-950 px-3 py-1 rounded-full border border-amber-800">
              Our Mission
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Affordable, Transparent & Speedy IT Repairs for Every Citizen</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Our mission is to eliminate laptop repair fraud, inflated spare costs, and long waiting periods in Nagpur. We promise transparent diagnostic checks, fair flat-rate pricing, 100% genuine replacement components, and a mandatory written 90-day warranty card on every job.
            </p>
          </div>

          {/* Our Team */}
          <div id="our-team" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <span className="text-xs font-black uppercase text-cyan-400 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
              Our Team
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Certified Hardware Engineers & Field Technicians</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Led by Senior Systems Director Prabhu and a core team of 15+ certified hardware specialists, network engineers, and logistics riders. Our lab technicians hold certifications from Microsoft, CompTIA A+, and Apple ACiT, equipped with professional BGA rework stations and clean-room data recovery equipment.
            </p>
          </div>

          {/* Working Area */}
          <div id="working-area" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <span className="text-xs font-black uppercase text-rose-400 bg-rose-950 px-3 py-1 rounded-full border border-rose-800">
              Working Area
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Serving All 1000+ Localities Across Nagpur Region</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Our service coverage spans 100% of Nagpur district, including Sitabuldi, Dhantoli, Dharampeth, Sadar, Ramdaspeth, Manish Nagar, Besa, Beltarodi, Nandanvan, Kamptee, Hingna MIDC, Butibori, Wardha Road, Koradi, Jaripatka, and Trimurti Nagar.
            </p>
          </div>

          {/* Working Scope */}
          <div id="working-scope" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <span className="text-xs font-black uppercase text-indigo-400 bg-indigo-950 px-3 py-1 rounded-full border border-indigo-800">
              Working Scope
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Residential, Commercial & Government Contract Scope</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              From individual home users needing urgent laptop screen fixes to corporate offices, schools, hospitals, coaching institutes, and MIDC industrial plants requiring 24/7 IT infrastructure management, network cabling, and server maintenance.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-1 shadow-lg">
            <span className="text-3xl sm:text-4xl font-black text-blue-400">38,000+</span>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Repairs Completed</p>
          </div>
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-1 shadow-lg">
            <span className="text-3xl sm:text-4xl font-black text-emerald-400">12+ Years</span>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Nagpur Excellence</p>
          </div>
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-1 shadow-lg">
            <span className="text-3xl sm:text-4xl font-black text-amber-400">4.9 ★</span>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Google Customer Rating</p>
          </div>
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-1 shadow-lg">
            <span className="text-3xl sm:text-4xl font-black text-cyan-400">100%</span>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Genuine Spare Parts</p>
          </div>
        </div>

        {/* Why Choose Sharon Infotech Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-8 shadow-xl">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-blue-400 bg-blue-950 px-3 py-1 rounded-full border border-blue-800">
              Our Core Pillars
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Why Nagpur Prefers Sharon Infotech</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-black">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-white">Written Warranty Guarantee</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every repair, screen replacement, and motherboard fix comes with a 90-day stamped written warranty card for peace of mind.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-black">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-white">Same-Day Doorstep Pickup</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our mobile field riders reach your home or office in Sitabuldi, Dharampeth, Sadar, or Manish Nagar within 30 minutes.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center font-black">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-white">Transparent Price Quotation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                No hidden costs! Free diagnostic check and cost approval before we proceed with any component replacement.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 border border-blue-700/50 rounded-3xl p-8 text-center space-y-4">
          <h3 className="text-2xl font-black text-white">Need Quick Computer Repair or In-Store Consultation?</h3>
          <p className="text-xs text-slate-300 max-w-xl mx-auto">
            Call our senior technical head at +91-7249430043, email prabhu@computerrepairnagpur.com, or visit our office at Office No 1, Second Floor, Tilak, Panchasheel Square, near Panchasheel Theatre, Dhantoli, Nagpur.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onOpenBooking('doorstep')}
              className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-lg"
            >
              <Phone className="w-4 h-4" />
              <span>Book Doorstep Service</span>
            </button>

            <a
              href="https://maps.app.goo.gl/wwuRxErEFDjFEqTL6"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-lg min-h-[44px]"
            >
              <Navigation className="w-4 h-4 text-white" />
              <span>Google Maps Location</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            <a
              href="https://wa.me/917249430043?text=Hi%20Sharon%20Infotech,%20I%20want%20to%20know%20more%20about%20your%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs uppercase tracking-wider transition flex items-center gap-2 border border-slate-700"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>

        {/* PAGE-SPECIFIC FAQ ACCORDION SECTION */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-black uppercase text-amber-400 tracking-wider">
                Frequently Asked Questions
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                About Sharon Infotech Nagpur FAQ
              </h2>
            </div>
            <a
              href="tel:7249430043"
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-400 bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-800/80 hover:bg-emerald-900 transition"
            >
              <Phone className="w-3.5 h-3.5" />
              Call Helpline: 7249430043
            </a>
          </div>

          <div className="space-y-3">
            <details className="group rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-4 text-xs font-bold text-white hover:bg-slate-900">
                <span>1. How long has Sharon Infotech been serving Nagpur for computer and laptop repairs?</span>
                <span className="shrink-0 rounded-full bg-slate-900 p-1 text-slate-400 group-open:-rotate-180 transition">
                  <ChevronRight className="w-4 h-4 rotate-90" />
                </span>
              </summary>
              <div className="p-4 pt-0 text-xs text-slate-300 leading-relaxed border-t border-slate-900 bg-slate-900/40 space-y-2">
                <p>Sharon Infotech was established in 2013 and has completed over 12+ years of continuous service in Nagpur. We have successfully repaired over 38,000+ laptops, desktop computers, printers, and CCTV installations.</p>
                <p className="text-amber-400 font-extrabold">Have questions? Call us directly at 7249430043.</p>
              </div>
            </details>

            <details className="group rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-4 text-xs font-bold text-white hover:bg-slate-900">
                <span>2. Where is Sharon Infotech located in Nagpur and how can I visit?</span>
                <span className="shrink-0 rounded-full bg-slate-900 p-1 text-slate-400 group-open:-rotate-180 transition">
                  <ChevronRight className="w-4 h-4 rotate-90" />
                </span>
              </summary>
              <div className="p-4 pt-0 text-xs text-slate-300 leading-relaxed border-t border-slate-900 bg-slate-900/40 space-y-2">
                <p>Our main service centre is located at Office No 1, Second Floor, Tilak, Panchasheel Square, near Panchasheel Theatre, Dhantoli, Nagpur, Maharashtra 440012. You can walk in during working hours or call 7249430043 to request doorstep service.</p>
              </div>
            </details>

            <details className="group rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-4 text-xs font-bold text-white hover:bg-slate-900">
                <span>3. Do you provide a written warranty on repairs and spare parts?</span>
                <span className="shrink-0 rounded-full bg-slate-900 p-1 text-slate-400 group-open:-rotate-180 transition">
                  <ChevronRight className="w-4 h-4 rotate-90" />
                </span>
              </summary>
              <div className="p-4 pt-0 text-xs text-slate-300 leading-relaxed border-t border-slate-900 bg-slate-900/40 space-y-2">
                <p>Yes, absolutely. All hardware repairs and replacement spare parts (screens, batteries, SSDs, RAM, motherboards) come with a stamped written warranty ranging from 90 days up to 3 years depending on the component manufacturer.</p>
              </div>
            </details>

            <details className="group rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-4 text-xs font-bold text-white hover:bg-slate-900">
                <span>4. What makes Sharon Infotech better than unauthorized local repair shops?</span>
                <span className="shrink-0 rounded-full bg-slate-900 p-1 text-slate-400 group-open:-rotate-180 transition">
                  <ChevronRight className="w-4 h-4 rotate-90" />
                </span>
              </summary>
              <div className="p-4 pt-0 text-xs text-slate-300 leading-relaxed border-t border-slate-900 bg-slate-900/40 space-y-2">
                <p>We use 100% genuine OEM components, offer transparent upfront pricing before starting work, provide 30-minute doorstep pickup across 220+ Nagpur locations, and back every job with certified diagnostic engineers.</p>
                <p className="text-emerald-400 font-extrabold">For instant assistance, call or WhatsApp 7249430043.</p>
              </div>
            </details>
          </div>
        </div>

      </div>
    </div>
  );
};
