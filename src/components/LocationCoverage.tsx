import React, { useState } from 'react';
import {
  MapPin,
  CheckCircle2,
  Clock,
  Phone,
  Truck,
  Navigation,
  ShieldCheck,
  Search,
  Globe,
  Mail,
  ExternalLink
} from 'lucide-react';

interface LocationCoverageProps {
  onNavigatePage?: (page: string, subPage?: string) => void;
  onOpenBooking?: (mode?: 'doorstep' | 'instore', prefill?: string) => void;
}

export const LocationCoverage: React.FC<LocationCoverageProps> = ({
  onNavigatePage,
  onOpenBooking
}) => {
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<{
    checked: boolean;
    available: boolean;
    message: string;
  } | null>(null);

  const checkPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.trim().length < 5) {
      setPincodeStatus({
        checked: true,
        available: false,
        message: 'Please enter a valid 6-digit Nagpur pincode (e.g. 440010, 440012, 440015).'
      });
      return;
    }

    // Pincodes starting with 44 or general Nagpur codes
    setPincodeStatus({
      checked: true,
      available: true,
      message: `Excellent! Free Doorstep Pickup & On-Site Repair Service is available at Nagpur Pincode ${pincode.trim()} by Sharon Infotech!`
    });
  };

  return (
    <section id="location-coverage" className="py-16 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-emerald-400 font-extrabold text-xs uppercase tracking-widest bg-emerald-950/80 px-3.5 py-1 rounded-full border border-emerald-500/30">
            Sharon Infotech Nagpur Location & Coverage
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-3">
            Visit Sharon Infotech Store or Book Nagpur Pickup
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base">
            Search "Sharon Infotech" on Google Maps or visit our flagship center in Nagpur City. Serving Dharampeth, Sitabuldi, Sadar, Manish Nagar, Wardha Road & all areas since 2013.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Pincode Checker & Shop Info */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Pincode Doorstep Checker Box */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <Truck className="w-4 h-4" />
                Nagpur Doorstep Pincode Checker
              </div>

              <p className="text-xs text-slate-300">
                Check if Sharon Infotech doorstep laptop pickup and repair technician visit is active at your area:
              </p>

              <form onSubmit={checkPincode} className="flex gap-2">
                <div className="relative flex-1">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
                  <label htmlFor="pincode-checker-input" className="sr-only">
                    Enter 6-Digit Nagpur Pincode
                  </label>
                  <input
                    id="pincode-checker-input"
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter 6-Digit Pincode e.g. 440010"
                    className="w-full bg-slate-900 border border-slate-700 text-white text-xs rounded-xl pl-9 pr-3 py-2.5 outline-none font-mono focus:border-emerald-500 min-h-[44px]"
                  />
                </div>
                <button
                  type="submit"
                  aria-label="Check doorstep pickup availability for pincode"
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition flex items-center gap-1 shrink-0 min-h-[44px]"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Check</span>
                </button>
              </form>

              {pincodeStatus && (
                <div
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-start gap-2 ${
                    pincodeStatus.available
                      ? 'bg-emerald-950/80 border-emerald-800 text-emerald-200'
                      : 'bg-rose-950/80 border-rose-800 text-rose-200'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{pincodeStatus.message}</span>
                </div>
              )}

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                {onNavigatePage && (
                  <button
                    onClick={() => onNavigatePage('service-areas')}
                    className="flex-1 py-2 px-3 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white font-bold text-xs border border-blue-500/30 transition flex items-center justify-center gap-1.5"
                  >
                    <Globe className="w-3.5 h-3.5 text-blue-400" />
                    <span>Explore 220+ Nagpur Areas</span>
                  </button>
                )}
                {onOpenBooking && (
                  <button
                    onClick={() => onOpenBooking('doorstep', 'Doorstep Repair Request via Pincode Checker')}
                    className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center justify-center gap-1.5"
                  >
                    <Truck className="w-3.5 h-3.5 text-white" />
                    <span>Book Doorstep Pickup</span>
                  </button>
                )}
              </div>
            </div>

            {/* Shop Details Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-400" />
                Sharon Infotech Main Store Location
              </h3>

              <div className="space-y-3 text-xs text-slate-300 border-t border-slate-900 pt-3">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Sharon Infotech Main Office / Store Address</p>
                    <p className="text-slate-400">Office No 1, Second Floor, Tilak, Panchasheel Square, near Panchasheel Theatre, Opposite Patrakar Bhawan, Dhantoli, Nagpur, Maharashtra 440012</p>
                    <a
                      href="https://maps.app.goo.gl/wwuRxErEFDjFEqTL6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-extrabold text-[11px] mt-1 underline"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Open on Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="font-bold text-white">Opening Hours: </span>
                    <span className="text-slate-300">Mon - Sun: 9:30 AM - 8:30 PM (7 Days)</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-bold text-white">Direct Phone / WhatsApp: </span>
                    <a href="tel:7249430043" className="text-emerald-400 font-extrabold hover:underline">
                      +91-7249430043
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                  <div>
                    <span className="font-bold text-white">Email Address: </span>
                    <a href="mailto:prabhu@computerrepairnagpur.com" className="text-purple-300 font-mono font-bold hover:underline">
                      prabhu@computerrepairnagpur.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div>
                    <span className="font-bold text-white">Official Website: </span>
                    <a href="https://computerrepairnagpur.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 font-bold hover:underline">
                      https://computerrepairnagpur.com
                    </a>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="https://maps.app.goo.gl/wwuRxErEFDjFEqTL6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 min-h-[44px]"
                  >
                    <Navigation className="w-4 h-4 text-white" />
                    <span>Get Directions on Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Google Maps Embed Frame for Sharon Infotech Nagpur */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-3 shadow-xl overflow-hidden h-[420px] relative flex flex-col">
            <div className="absolute top-5 left-5 z-10 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-3.5 py-2 rounded-xl flex items-center gap-2 shadow-xl">
              <MapPin className="w-4 h-4 text-emerald-400 animate-bounce" />
              <div>
                <p className="text-xs font-black text-white">Sharon Infotech Repair Center</p>
                <p className="text-[10px] text-slate-300">Dhantoli, Panchasheel Square, Nagpur</p>
              </div>
              <a
                href="https://maps.app.goo.gl/wwuRxErEFDjFEqTL6"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-[10px] rounded-lg transition flex items-center gap-1 min-h-[32px]"
              >
                <span>Navigate</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
            <iframe
              title="Sharon Infotech Location Nagpur"
              src="https://maps.google.com/maps?q=Sharon%20Infotech%2C%20Panchasheel%20Square%2C%20Dhantoli%2C%20Nagpur&t=&z=17&ie=UTF8&iwloc=B&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '0.75rem' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>

      </div>
    </section>
  );
};
