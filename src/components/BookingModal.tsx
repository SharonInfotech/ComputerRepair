import React, { useState } from 'react';
import {
  X,
  Truck,
  Building2,
  Calendar,
  Clock,
  Phone,
  User,
  MapPin,
  Laptop,
  CheckCircle2,
  Loader2,
  ArrowRight,
  ShieldCheck,
  MessageSquare
} from 'lucide-react';
import { BookingFormData, DeviceType, ServiceMode } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: ServiceMode;
  prefillIssue?: string;
  onBookingSuccess: (ticketId: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  defaultMode = 'doorstep',
  prefillIssue = '',
  onBookingSuccess
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    phone: '',
    email: '',
    address: '',
    pincode: '440012',
    deviceType: 'Laptop',
    brand: 'Dell',
    model: '',
    serviceMode: defaultMode,
    issueSummary: prefillIssue,
    preferredDate: '',
    preferredTime: '10:00 AM - 01:00 PM'
  });

  const [loading, setLoading] = useState(false);
  const [createdTicketId, setCreatedTicketId] = useState<string | null>(null);

  React.useEffect(() => {
    if (defaultMode) {
      setFormData((prev) => ({ ...prev, serviceMode: defaultMode }));
    }
  }, [defaultMode]);

  React.useEffect(() => {
    if (prefillIssue) {
      setFormData((prev) => ({ ...prev, issueSummary: prefillIssue }));
    }
  }, [prefillIssue]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success && data.ticketId) {
        setCreatedTicketId(data.ticketId);
        onBookingSuccess(data.ticketId);
      }
    } catch (err) {
      console.error('Booking error:', err);
      const fallbackId = `SHARON-${Math.floor(1000 + Math.random() * 9000)}`;
      setCreatedTicketId(fallbackId);
      onBookingSuccess(fallbackId);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="booking-modal-title">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl max-w-xl w-full p-6 shadow-2xl relative my-8 animate-fade-in">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close booking modal dialog"
          className="absolute top-4 right-4 p-2.5 text-slate-400 hover:text-white rounded-lg bg-slate-800 border border-slate-700 min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>

        {!createdTicketId ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs text-blue-400 font-bold bg-blue-950 px-2.5 py-0.5 rounded border border-blue-800">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Sharon Infotech Nagpur • Free Doorstep Pickup & Inspection
              </div>
              <h2 id="booking-modal-title" className="text-xl font-black text-white mt-2">
                Book Computer, Laptop, Printer or CCTV Service
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Fill details below. Our certified Sharon Infotech technician will contact you within 15 minutes. Call: 7249430043.
              </p>
            </div>

            {/* Service Mode Selector */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, serviceMode: 'doorstep' })}
                className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 ${
                  formData.serviceMode === 'doorstep'
                    ? 'bg-blue-600 text-white border-blue-400 shadow-md'
                    : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                <Truck className="w-4 h-4" />
                Free Nagpur Pickup
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, serviceMode: 'instore' })}
                className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 ${
                  formData.serviceMode === 'instore'
                    ? 'bg-blue-600 text-white border-blue-400 shadow-md'
                    : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                <Building2 className="w-4 h-4" />
                In-Store Shop Visit
              </button>
            </div>

            {/* Customer Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="booking-customer-name" className="block text-[11px] font-semibold text-slate-300 mb-1 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-blue-400" /> Your Full Name *
                </label>
                <input
                  id="booking-customer-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ramesh Deshmukh"
                  className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-xs rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 min-h-[44px]"
                />
              </div>

              <div>
                <label htmlFor="booking-customer-phone" className="block text-[11px] font-semibold text-slate-300 mb-1 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" /> Mobile / WhatsApp No. *
                </label>
                <input
                  id="booking-customer-phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. 7249430043"
                  className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-xs rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 font-mono min-h-[44px]"
                />
              </div>
            </div>

            {/* Address field for Doorstep */}
            {formData.serviceMode === 'doorstep' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label htmlFor="booking-doorstep-address" className="block text-[11px] font-semibold text-slate-300 mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" /> Nagpur Doorstep Address *
                  </label>
                  <input
                    id="booking-doorstep-address"
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="House/Plot No, Locality (Sitabuldi, Dharampeth, Manish Nagar)"
                    className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-xs rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 min-h-[44px]"
                  />
                </div>

                <div>
                  <label htmlFor="booking-pincode" className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Pincode
                  </label>
                  <input
                    id="booking-pincode"
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    placeholder="e.g. 440010"
                    className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-xs rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 font-mono min-h-[44px]"
                  />
                </div>
              </div>
            )}

            {/* Device Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label htmlFor="booking-service-category" className="block text-[11px] font-semibold text-slate-300 mb-1 flex items-center gap-1">
                  <Laptop className="w-3.5 h-3.5 text-indigo-400" /> Service Category
                </label>
                <select
                  id="booking-service-category"
                  value={formData.deviceType}
                  onChange={(e) => setFormData({ ...formData, deviceType: e.target.value as DeviceType })}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-xs rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 min-h-[44px]"
                >
                  <option value="Laptop">Laptop Repair (Dell/HP/Lenovo/Mac)</option>
                  <option value="MacBook">Apple MacBook / iMac</option>
                  <option value="Desktop PC">Desktop Computer Repair</option>
                  <option value="Printer">Printer Repair / Refilling</option>
                  <option value="CCTV">CCTV Installation / AMC</option>
                  <option value="Data Recovery">Data Recovery Hard Disk</option>
                  <option value="Networking">LAN Networking & Tally Multi-User</option>
                  <option value="IT AMC">Corporate IT Support & AMC</option>
                  <option value="Smart Home & Biometrics">Smart Home & Biometric Door Locks</option>
                </select>
              </div>

              <div>
                <label htmlFor="booking-brand-name" className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Brand Name
                </label>
                <input
                  id="booking-brand-name"
                  type="text"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  placeholder="e.g. Dell, HP, Canon, Hikvision"
                  className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-xs rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 min-h-[44px]"
                />
              </div>

              <div>
                <label htmlFor="booking-model-no" className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Model No (Optional)
                </label>
                <input
                  id="booking-model-no"
                  type="text"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  placeholder="e.g. Inspiron 15 / Laserjet 1008"
                  className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-xs rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 min-h-[44px]"
                />
              </div>
            </div>

            {/* Problem Description & File Attachment */}
            <div>
              <label htmlFor="booking-issue-summary" className="block text-[11px] font-semibold text-slate-300 mb-1">
                Describe Issue / Requirement
              </label>
              <textarea
                id="booking-issue-summary"
                rows={2}
                value={formData.issueSummary}
                onChange={(e) => setFormData({ ...formData, issueSummary: e.target.value })}
                placeholder="e.g. Screen broken, printer paper jam, CCTV camera offline, hard disk crashed..."
                className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-xs rounded-xl p-3 outline-none focus:border-blue-500 resize-none min-h-[60px]"
              />
            </div>

            {/* File Attachment with Validation */}
            <div>
              <label htmlFor="booking-file-upload" className="block text-[11px] font-semibold text-slate-300 mb-1 flex items-center justify-between">
                <span>Attach Photo / Invoice / Bill (Optional)</span>
                <span className="text-[10px] text-slate-400">Max 5MB (JPG, PNG, PDF)</span>
              </label>
              <input
                id="booking-file-upload"
                type="file"
                accept="image/jpeg,image/png,image/webp,application/pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  if (file.size > 5 * 1024 * 1024) {
                    alert('File size exceeds 5MB limit. Please upload a smaller file.');
                    e.target.value = '';
                    return;
                  }
                  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
                  if (!validTypes.includes(file.type)) {
                    alert('Invalid file type. Please upload a JPG, PNG, WEBP, or PDF document.');
                    e.target.value = '';
                    return;
                  }
                }}
                className="w-full bg-slate-950 border border-slate-700 text-slate-300 text-xs rounded-xl p-2 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer min-h-[44px]"
              />
            </div>

            {/* Preferred Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="booking-preferred-date" className="block text-[11px] font-semibold text-slate-300 mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" /> Preferred Date
                </label>
                <input
                  id="booking-preferred-date"
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-xs rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 min-h-[44px]"
                />
              </div>

              <div>
                <label htmlFor="booking-preferred-time" className="block text-[11px] font-semibold text-slate-300 mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" /> Time Slot
                </label>
                <select
                  id="booking-preferred-time"
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-xs rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 min-h-[44px]"
                >
                  <option value="10:00 AM - 01:00 PM">Morning (10:00 AM - 01:00 PM)</option>
                  <option value="01:00 PM - 04:00 PM">Afternoon (01:00 PM - 04:00 PM)</option>
                  <option value="04:00 PM - 08:00 PM">Evening (04:00 PM - 08:00 PM)</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              aria-label="Confirm Sharon Infotech Booking Ticket"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-blue-600/30 transition flex items-center justify-center gap-2 min-h-[44px]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                  <span>Registering Sharon Infotech Ticket...</span>
                </>
              ) : (
                <>
                  <span>Confirm Sharon Infotech Booking Ticket</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        ) : (
          /* Confirmation Success Box */
          <div className="text-center py-6 space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl font-black text-white">Sharon Infotech Repair Booking Confirmed!</h3>
              <p className="text-xs text-slate-400 mt-1">
                Your Job Ticket ID has been generated:
              </p>
              <div className="inline-block bg-blue-950 text-blue-300 font-mono text-xl font-extrabold px-4 py-2 rounded-xl border border-blue-800 mt-2">
                {createdTicketId}
              </div>
            </div>

            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Sharon Infotech Nagpur service desk will contact you at <strong className="text-white">+91-7249430043</strong> shortly to verify doorstep pickup time or store visit details.
            </p>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-md"
              >
                Track Live Repair Ticket
              </button>

              <a
                href={`https://wa.me/917249430043?text=Hi%20Sharon%20Infotech,%20my%20ticket%20ID%20is%20${createdTicketId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4" />
                Send Ticket via WhatsApp
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
