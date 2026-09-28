import React, { useState } from 'react';
import {
  MapPin,
  Truck,
  Phone,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Navigation,
  Search,
  ArrowRight,
  ExternalLink,
  Mail
} from 'lucide-react';
import { ALL_NAGPUR_LOCATIONS } from '../data/nagpurLocations';
import { OfficeLocationMap } from './OfficeLocationMap';

const NAGPUR_AREAS = ALL_NAGPUR_LOCATIONS;

interface NagpurLocationSectionProps {
  onOpenBooking: (mode?: 'doorstep' | 'instore', prefill?: string) => void;
  onNavigatePage?: (page: string, subPage?: string) => void;
}

export const NagpurLocationSection: React.FC<NagpurLocationSectionProps> = ({ onOpenBooking, onNavigatePage }) => {
  const [selectedAreaId, setSelectedAreaId] = useState('sitabuldi');
  const [searchQuery, setSearchQuery] = useState('');

  const activeArea = NAGPUR_AREAS.find((a) => a.id === selectedAreaId) || NAGPUR_AREAS[0];

  const filteredAreas = NAGPUR_AREAS.filter(
    (a) =>
      a.areaName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.pincode.includes(searchQuery) ||
      a.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="nagpur-locations" className="py-16 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-emerald-400 font-extrabold text-xs uppercase tracking-widest bg-emerald-950/90 px-3.5 py-1 rounded-full border border-emerald-500/30">
            Nagpur City Doorstep Service Coverage
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight mt-3">
            Computer & Laptop Repair Service Across All Nagpur Areas
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base">
            Sharon Infotech offers 100% Free Pickup & Drop doorstep repair service across all major localities in Nagpur. Contact +91 7249430043.
          </p>
        </div>

        {/* Search Locality Input */}
        <div className="max-w-md mx-auto mb-8 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your area in Nagpur (e.g. Sitabuldi, Dharampeth, 440010)..."
            className="w-full bg-slate-950 border border-slate-700 text-white text-xs rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-emerald-500 font-medium"
          />
        </div>

        {/* Location Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-8">
          {filteredAreas.map((area) => {
            const isActive = area.id === selectedAreaId;
            return (
              <button
                key={area.id}
                onClick={() => setSelectedAreaId(area.id)}
                className={`p-3 rounded-2xl text-left border transition flex flex-col justify-between ${
                  isActive
                    ? 'bg-emerald-950/80 text-white border-emerald-500 shadow-xl shadow-emerald-900/20'
                    : 'bg-slate-950 text-slate-400 hover:text-white border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/90 px-2 py-0.5 rounded border border-emerald-800">
                    Pincode: {area.pincode}
                  </span>
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="mt-2">
                  <h4 className="text-xs font-bold text-white line-clamp-1">
                    {area.areaName.split(',')[0]}
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    Pickup: {area.pickupTime}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Area Detail Box */}
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-emerald-950 text-emerald-300 font-bold text-xs px-3 py-1 rounded-lg border border-emerald-800 flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-emerald-400" />
                  Free Pickup Available in {activeArea.pincode}
                </span>
                <span className="bg-blue-950 text-blue-300 font-bold text-xs px-3 py-1 rounded-lg border border-blue-800">
                  ETA: {activeArea.pickupTime}
                </span>
              </div>

              <h3 className="text-2xl font-black text-white">
                Sharon Infotech Repair Hub for {activeArea.areaName}
              </h3>

              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                <span>{activeArea.landmark}</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                {activeArea.description}
              </p>

              <div>
                <h4 className="text-xs font-extrabold uppercase text-emerald-400 mb-2">
                  Top Requested Services in {activeArea.areaName.split(' ')[0]}:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeArea.popularServices.map((svc, idx) => (
                    <span key={idx} className="bg-slate-900 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-800 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      {svc}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onOpenBooking('doorstep', `Doorstep Request in Nagpur Area: ${activeArea.areaName}`)}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider transition shadow-lg flex items-center justify-center gap-2"
                >
                  Book Doorstep Technician in {activeArea.areaName.split(' ')[0]}
                  <ArrowRight className="w-4 h-4" />
                </button>

                {onNavigatePage && (
                  <button
                    onClick={() => onNavigatePage('service-areas', activeArea.id)}
                    className="px-5 py-3 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white font-extrabold text-xs border border-blue-500/30 transition flex items-center justify-center gap-2"
                  >
                    <Navigation className="w-4 h-4 text-blue-400" />
                    <span>View {activeArea.areaName.split(' ')[0]} Sub-Page</span>
                  </button>
                )}

                <a
                  href="tel:7249430043"
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs border border-slate-700 transition flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  Call: 7249430043
                </a>
              </div>

            </div>

            {/* Right Card Google Business Location Info */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  Google Maps Official Business Profile
                </span>
                <span className="text-[10px] text-amber-400 font-bold bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                  4.9 ★ Rating
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Sharon Infotech is verified on Google Maps. Click below to view live directions, customer reviews, or share store location with friends.
              </p>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
                <p className="font-bold text-white">Sharon Infotech Repair Center</p>
                <p className="text-slate-400 text-[11px]">Office No 1, Second Floor, Tilak, Panchasheel Square, near Panchasheel Theatre, Opposite Patrakar Bhawan, Dhantoli, Nagpur, Maharashtra 440012</p>
                <p className="text-emerald-400 font-bold">Call / WhatsApp: +91-7249430043</p>
                <p className="text-purple-300 font-mono text-[11px]">Email: prabhu@computerrepairnagpur.com</p>
                <p className="text-slate-400 text-[11px]">Website: https://computerrepairnagpur.com</p>
              </div>

              <a
                href="https://maps.app.goo.gl/wwuRxErEFDjFEqTL6"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 min-h-[44px]"
              >
                <Navigation className="w-4 h-4 text-white" />
                <span>Open Google Maps Directions</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <div className="pt-1 text-center text-[10px] text-slate-500">
                Verified Google Business Profile • 100% Free Doorstep Pickup in Nagpur
              </div>
            </div>

          </div>
        </div>

        {/* Embedded Interactive Google Location Map */}
        <div className="mt-10">
          <OfficeLocationMap />
        </div>

      </div>
    </section>
  );
};
