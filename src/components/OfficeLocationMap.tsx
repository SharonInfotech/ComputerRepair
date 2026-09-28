import React from 'react';
import {
  MapPin,
  Navigation,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  ShieldCheck,
  ExternalLink,
  Building2,
  CheckCircle2
} from 'lucide-react';

export const OfficeLocationMap: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            Official Google Maps Verified Location • Single Direct Store
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-2 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-blue-400" />
            Sharon Infotech Dhantoli Repair Store & HQ Map
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Office No 1, 2nd Floor, Tilak, Panchasheel Square, near Panchasheel Theatre, Opposite Patrakar Bhawan, Dhantoli, Nagpur 440012
          </p>
        </div>

        <a
          href="https://maps.app.goo.gl/wwuRxErEFDjFEqTL6"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs uppercase tracking-wider transition shadow-lg shadow-blue-600/20 shrink-0 min-h-[44px]"
        >
          <Navigation className="w-4 h-4" />
          <span>Open in Google Maps</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Grid: Interactive Google Map + Store Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Map Embed Container (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 min-h-[320px] relative shadow-inner">
          <iframe
            title="Sharon Infotech Dhantoli Nagpur Office Location Map"
            src="https://maps.google.com/maps?q=Sharon%20Infotech%2C%20Panchasheel%20Square%2C%20Dhantoli%2C%20Nagpur&t=&z=17&ie=UTF8&iwloc=B&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: '340px' }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full filter brightness-90 contrast-105"
          ></iframe>
        </div>

        {/* Store Detail Information Box (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
          
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <span className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Store Address Details
              </span>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                Pincode: 440012
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <p className="font-extrabold text-white text-xs">
                Sharon Infotech Repair Center & Head Office
              </p>
              <p className="text-slate-300 leading-relaxed font-medium text-[11px] bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                Office No 1, Second Floor, Tilak, Panchasheel Square, near Panchasheel Theatre, Opposite Patrakar Bhawan, Dhantoli, Nagpur, Maharashtra 440012
              </p>
            </div>

            {/* Operating Hours & Contact */}
            <div className="space-y-2 text-xs pt-1">
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Mon – Sat: <strong className="text-white">09:30 AM – 08:30 PM</strong> (Sun Closed)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Phone: <a href="tel:+917249430043" className="text-emerald-400 font-bold hover:underline">+91-7249430043</a></span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Email: <a href="mailto:prabhu@computerrepairnagpur.com" className="text-purple-300 font-bold hover:underline">prabhu@computerrepairnagpur.com</a></span>
              </div>
            </div>

            {/* Local Features */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 pt-2 border-t border-slate-800/80">
              <div className="flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Free Parking Space</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>1-Hour Screen Swap</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Free Diagnostic Test</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>GST Tax Invoice</span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
            <a
              href="tel:+917249430043"
              className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs text-center transition flex items-center justify-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Store</span>
            </a>

            <a
              href="https://wa.me/917249430043?text=Hi%20Sharon%20Infotech,%20I%20want%20to%20visit%20your%20Dhantoli%20Nagpur%20store."
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs text-center transition flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
          </div>

        </div>

      </div>

    </div>
  );
};
