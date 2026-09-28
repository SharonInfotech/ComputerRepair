import React, { useState } from 'react';
import { FAQAccordion } from '../FAQAccordion';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronRight,
  MessageSquare,
  Send,
  Building2,
  CheckCircle2,
  ShieldCheck,
  User,
  ExternalLink,
  Navigation
} from 'lucide-react';
import { OfficeLocationMap } from '../OfficeLocationMap';

interface ContactPageProps {
  onNavigateHome: () => void;
  onOpenBooking?: (mode?: 'doorstep' | 'instore', prefill?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigateHome, onOpenBooking }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    locality: 'Sitabuldi',
    serviceNeeded: 'Laptop Repair',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Breadcrumb Header */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <button onClick={onNavigateHome} className="hover:text-blue-400 transition">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-emerald-400 font-extrabold">Contact Us</span>
        </div>

        {/* Page Hero Title */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-950 p-6 sm:p-8 rounded-3xl border border-emerald-800/40 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              Sharon Infotech Service Center • Nagpur
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              Contact Sharon Infotech Nagpur
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Reach out for laptop repair, computer service, printer refilling, CCTV quotation, or doorstep pickup inquiry across Nagpur city.
            </p>
          </div>
        </div>

        {/* Contact Info & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left 2 Cols: Contact Form */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div>
              <h2 className="text-xl font-extrabold text-white">Send Us a Direct Message</h2>
              <p className="text-xs text-slate-400 mt-1">
                Fill out the quick contact form below. Our support desk will call you back within 15 minutes.
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-full-name" className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-blue-400" /> Your Full Name *
                    </label>
                    <input
                      id="contact-full-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rajesh Sharma"
                      className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-xs rounded-xl px-3 py-3 outline-none focus:border-blue-500 min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-emerald-400" /> Mobile / WhatsApp No. *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 7249430043"
                      className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-xs rounded-xl px-3 py-3 outline-none focus:border-blue-500 font-mono min-h-[44px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-locality" className="block text-xs font-bold text-slate-300 mb-1">
                      Nagpur Area / Locality
                    </label>
                    <select
                      id="contact-locality"
                      value={formData.locality}
                      onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-xs rounded-xl px-3 py-3 outline-none focus:border-blue-500 min-h-[44px]"
                    >
                      <option value="Dhantoli">Dhantoli / Congress Nagar</option>
                      <option value="Ramdaspeth">Ramdaspeth / Central Bazaar</option>
                      <option value="Manish Nagar">Manish Nagar / Beltarodi</option>
                      <option value="Sadar">Sadar / Civil Lines</option>
                      <option value="Sitabuldi">Sitabuldi / Variety Square</option>
                      <option value="Dharampeth">Dharampeth / Laxmi Nagar</option>
                      <option value="Pratap Nagar">Pratap Nagar / Khamla</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-service-needed" className="block text-xs font-bold text-slate-300 mb-1">
                      Required Service
                    </label>
                    <select
                      id="contact-service-needed"
                      value={formData.serviceNeeded}
                      onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-xs rounded-xl px-3 py-3 outline-none focus:border-blue-500 min-h-[44px]"
                    >
                      <option value="Laptop Repair">Laptop Repair (Dell / HP / Lenovo / Mac)</option>
                      <option value="Desktop PC Repair">Desktop PC Repair & Upgrades</option>
                      <option value="Printer Repair">Printer Repair & Cartridge Refill</option>
                      <option value="CCTV Installation">CCTV Camera Installation & AMC</option>
                      <option value="Data Recovery">Data Recovery Hard Disk</option>
                      <option value="Spare Parts">Spare Parts & Accessories</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-bold text-slate-300 mb-1">
                    Describe your query or issue details:
                  </label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="e.g. Laptop screen broken, printer paper jam, CCTV quote request..."
                    className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-xs rounded-xl p-3 outline-none focus:border-blue-500 resize-none min-h-[80px]"
                  />
                </div>

                <button
                  type="submit"
                  aria-label="Submit Inquiry to Sharon Infotech"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry to Sharon Infotech</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center mx-auto shadow-xl">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">Thank You, {formData.name}!</h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto">
                    Your contact message has been recorded. Sharon Infotech support team will call you at <strong className="text-white">{formData.phone}</strong> shortly.
                  </p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>

          {/* Right Col: Address & Contact Details Card */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl text-xs">
              <h3 className="text-sm font-black uppercase text-white tracking-wider flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-400" />
                Sharon Infotech Store Location
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Main Office / Store Address:</span>
                    <p className="text-slate-300 text-[11px] leading-relaxed mt-0.5">
                      Office No 1, Second Floor, Tilak, Panchasheel Square, near Panchasheel Theatre, Opposite Patrakar Bhawan, Dhantoli, Nagpur, Maharashtra 440012
                    </p>
                    <a
                      href="https://maps.app.goo.gl/wwuRxErEFDjFEqTL6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-extrabold text-[11px] mt-2 underline"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Phone / WhatsApp Support:</span>
                    <a href="tel:+917249430043" className="text-emerald-400 font-mono font-bold text-sm hover:underline block mt-0.5">
                      +91-7249430043
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Email Address:</span>
                    <a href="mailto:prabhu@computerrepairnagpur.com" className="text-purple-300 font-mono text-[11px] hover:underline block mt-0.5">
                      prabhu@computerrepairnagpur.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Working Hours:</span>
                    <p className="text-slate-300 text-[11px] mt-0.5">
                      Monday - Sunday: 9:30 AM - 8:30 PM (Open All 7 Days)
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <a
                  href="https://maps.app.goo.gl/wwuRxErEFDjFEqTL6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 min-h-[44px]"
                >
                  <Navigation className="w-4 h-4 text-white" />
                  <span>Get Directions on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>

                <a
                  href="https://wa.me/917249430043?text=Hi%20Sharon%20Infotech,%20I%20am%20looking%20for%20shop%20location%20and%20support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold transition flex items-center justify-center gap-1.5 border border-slate-700"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  WhatsApp Direct Chat
                </a>
              </div>
            </div>

            {/* Quick Guarantee Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-2 text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" /> Free Doorstep Inspection
              </span>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                If you choose not to proceed with the repair after inspection, there are zero diagnostic fees.
              </p>
            </div>
          </div>

        </div>

        {/* Office Location Map Component */}
        <OfficeLocationMap />

        {/* CONTACT PAGE SPECIFIC FAQ SECTION */}
        <FAQAccordion
          title="Frequently Asked Contact & Location Questions"
          subtitle="Store hours, Dhantoli location details, landmark directions, and doorstep callouts in Nagpur."
          faqs={[
            {
              question: "What are the shop working hours and location of Sharon Infotech in Dhantoli, Nagpur?",
              answer: "We are open 7 days a week from 9:30 AM to 8:30 PM. Our address is Office No 1, Second Floor, Tilak, Panchasheel Square, near Panchasheel Theatre, Dhantoli, Nagpur. Call 7249430043 for landmark directions."
            },
            {
              question: "Can I request an emergency computer technician callout at my office or home?",
              answer: "Yes, we offer priority express dispatch for urgent laptop and server crashes. Call 7249430043 for instant emergency technician assignment across Nagpur city."
            },
            {
              question: "What is the fastest way to book a doorstep laptop repair in Nagpur?",
              answer: "Calling or sending a WhatsApp message to 7249430043 is the fastest way. Our customer service executive will confirm your location, laptop model, problem description, and dispatch an engineer within 30 minutes."
            }
          ]}
          phone="7249430043"
          ctaTitle="Call Sharon Infotech Nagpur at 7249430043"
          ctaSubtitle="Visit our Dhantoli store or request 30-minute doorstep service at your home or office."
          onBookClick={onOpenBooking ? () => onOpenBooking('doorstep', 'Contact Page Doorstep Booking') : undefined}
        />

      </div>
    </div>
  );
};
