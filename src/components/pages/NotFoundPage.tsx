import React, { useState } from 'react';
import {
  AlertCircle,
  Home,
  Search,
  Phone,
  Wrench,
  MapPin,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface NotFoundPageProps {
  onNavigateHome: () => void;
  onNavigatePage: (page: string, subPage?: string) => void;
  onOpenBooking?: (mode?: 'doorstep' | 'instore', prefill?: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  onNavigateHome,
  onNavigatePage,
  onOpenBooking
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    // Route to blog or services search
    onNavigatePage('blog', 'all');
  };

  return (
    <div className="min-h-[75vh] bg-slate-950 text-slate-100 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full text-center space-y-8 bg-slate-900/80 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        
        {/* Glow Accent Backdrop */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* 404 Badge & Heading */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black bg-rose-950/80 text-rose-400 border border-rose-800/80 uppercase tracking-widest shadow-md">
            <AlertCircle className="w-4 h-4 text-rose-400" />
            <span>404 - Page Not Found • Error</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
            Oops! Page Available Nahi Hai
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Aap jo URL access karne ki koshish kar rahe hain wo change ho gaya hai ya abhi update ho raha hai. Niche diye gaye links se direct navigate karein:
          </p>
        </div>

        {/* Quick Search Input */}
        <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto relative">
          <label htmlFor="notfound-search" className="sr-only">Search Services & Articles</label>
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
          <input
            id="notfound-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search laptop repair, SSD upgrade, Besa locality..."
            className="w-full bg-slate-950 border border-slate-700 text-white text-xs rounded-2xl pl-11 pr-24 py-3.5 outline-none focus:border-blue-500 font-medium"
          />
          <button
            type="submit"
            aria-label="Submit search query"
            className="absolute right-2 top-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition"
          >
            Search
          </button>
        </form>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
          <button
            onClick={onNavigateHome}
            aria-label="Go to Home Page"
            className="p-4 rounded-2xl bg-slate-950 hover:bg-blue-950/60 border border-slate-800 hover:border-blue-500/50 transition flex flex-col items-center justify-center gap-2 group min-h-[72px]"
          >
            <Home className="w-5 h-5 text-blue-400 group-hover:scale-110 transition" />
            <span className="text-xs font-bold text-white">Home Page</span>
          </button>

          <button
            onClick={() => onNavigatePage('services', 'laptop-repair')}
            aria-label="Go to Services Page"
            className="p-4 rounded-2xl bg-slate-950 hover:bg-amber-950/60 border border-slate-800 hover:border-amber-500/50 transition flex flex-col items-center justify-center gap-2 group min-h-[72px]"
          >
            <Wrench className="w-5 h-5 text-amber-400 group-hover:scale-110 transition" />
            <span className="text-xs font-bold text-white">Laptop & PC Services</span>
          </button>

          <button
            onClick={() => onNavigatePage('service-areas', 'sitabuldi')}
            aria-label="Go to Nagpur Service Areas"
            className="p-4 rounded-2xl bg-slate-950 hover:bg-emerald-950/60 border border-slate-800 hover:border-emerald-500/50 transition flex flex-col items-center justify-center gap-2 group min-h-[72px]"
          >
            <MapPin className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition" />
            <span className="text-xs font-bold text-white">Nagpur Areas (220+)</span>
          </button>

          <button
            onClick={() => onNavigatePage('blog', 'all')}
            aria-label="Go to Blog Guides"
            className="p-4 rounded-2xl bg-slate-950 hover:bg-purple-950/60 border border-slate-800 hover:border-purple-500/50 transition flex flex-col items-center justify-center gap-2 group min-h-[72px]"
          >
            <BookOpen className="w-5 h-5 text-purple-400 group-hover:scale-110 transition" />
            <span className="text-xs font-bold text-white">Repair Blog & Guides</span>
          </button>
        </div>

        {/* Primary Call To Action */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-center gap-4">
          {onOpenBooking && (
            <button
              onClick={() => onOpenBooking('doorstep', 'Doorstep Repair Request from 404 Page')}
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider transition shadow-lg shadow-emerald-600/30 flex items-center gap-2 min-h-[44px]"
            >
              <span>Book Free Doorstep Service Nagpur</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <a
            href="tel:7249430043"
            className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs uppercase tracking-wider transition border border-slate-700 flex items-center gap-2 min-h-[44px]"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>Call Hotline: 7249430043</span>
          </a>
        </div>

        {/* Footer info note */}
        <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5 pt-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Sharon Infotech • Dhantoli HQ Nagpur • Emergency Helpline: 7249430043</span>
        </p>

      </div>
    </div>
  );
};
