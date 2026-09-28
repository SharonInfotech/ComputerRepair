import React, { useState } from 'react';
import {
  Calculator,
  CheckCircle,
  ShieldCheck,
  Tag,
  ArrowRight,
  Info,
  Wrench,
  Truck,
  Building2
} from 'lucide-react';
import { DeviceType, ServiceMode } from '../types';

interface ServiceOption {
  id: string;
  name: string;
  description: string;
  priceMacBook: number;
  priceLaptop: number;
  priceDesktop: number;
}

const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: 'screen',
    name: 'Screen / Display Replacement',
    description: 'A+ Grade Full HD / 4K OEM IPS Display Panel with 90-day warranty',
    priceLaptop: 3200,
    priceMacBook: 7800,
    priceDesktop: 2500
  },
  {
    id: 'battery',
    name: 'Battery Replacement',
    description: 'High longevity 100% capacity OEM Battery with power IC test',
    priceLaptop: 1800,
    priceMacBook: 3800,
    priceDesktop: 800
  },
  {
    id: 'ssd',
    name: '512GB NVMe High-Speed SSD Boost',
    description: '5x faster boot time, includes OS cloning & installation',
    priceLaptop: 2400,
    priceMacBook: 3500,
    priceDesktop: 2200
  },
  {
    id: 'ram',
    name: '16GB DDR4 / DDR5 RAM Boost',
    description: 'Smooth multitasking & lag-free video editing / gaming',
    priceLaptop: 1900,
    priceMacBook: 2800,
    priceDesktop: 1700
  },
  {
    id: 'liquid',
    name: 'Liquid Damage Board Micro-Soldering',
    description: 'Ultrasonic chemical bath, short-circuit removal & IC swap',
    priceLaptop: 2200,
    priceMacBook: 4200,
    priceDesktop: 1800
  },
  {
    id: 'thermal',
    name: 'Thermal Repasting & Deep Cleaning',
    description: 'Arctic MX-4 thermal paste re-application & heatsink de-dusting',
    priceLaptop: 599,
    priceMacBook: 899,
    priceDesktop: 499
  },
  {
    id: 'hinge',
    name: 'Chassis Hinge & Body Repair',
    description: 'Steel reinforcement & acrylic bracket molding for cracked body',
    priceLaptop: 1200,
    priceMacBook: 2200,
    priceDesktop: 800
  },
  {
    id: 'os',
    name: 'Windows / macOS Reinstall & Virus Purge',
    description: 'Clean OS install, official drivers, anti-malware deep scan',
    priceLaptop: 499,
    priceMacBook: 799,
    priceDesktop: 499
  },
  {
    id: 'tally-lan',
    name: 'Tally Multi-User LAN & Quick Heal Security',
    description: 'Tally Prime multi-PC LAN sync, server backup & Quick Heal Total Security',
    priceLaptop: 599,
    priceMacBook: 899,
    priceDesktop: 599
  },
  {
    id: 'smart-home',
    name: 'Smart Home Retrofit & Biometric Door Lock',
    description: 'Touch glass switch retrofit, Wi-Fi automation & biometric lock setup',
    priceLaptop: 1299,
    priceMacBook: 1499,
    priceDesktop: 1299
  }
];

interface CostEstimatorProps {
  onBookEstimate: (summary: string, total: number) => void;
}

export const CostEstimator: React.FC<CostEstimatorProps> = ({ onBookEstimate }) => {
  const [deviceType, setDeviceType] = useState<DeviceType>('Laptop');
  const [brand, setBrand] = useState('Dell');
  const [selectedServices, setSelectedServices] = useState<string[]>(['screen']);
  const [serviceMode, setServiceMode] = useState<ServiceMode>('doorstep');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoCode, setPromoCode] = useState('');

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length === 1) return; // Keep at least 1 selected
      setSelectedServices(selectedServices.filter((s) => s !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const calculateSubtotal = () => {
    return selectedServices.reduce((acc, serviceId) => {
      const item = SERVICE_OPTIONS.find((s) => s.id === serviceId);
      if (!item) return acc;
      if (deviceType === 'MacBook') return acc + item.priceMacBook;
      if (deviceType === 'Desktop PC' || deviceType === 'Gaming Rig') return acc + item.priceDesktop;
      return acc + item.priceLaptop;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const doorstepFee = serviceMode === 'doorstep' ? 0 : 0; // Free pickup promotion
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const grandTotal = subtotal + doorstepFee - discount;

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'FIRST10' || promoCode.trim().toUpperCase() === 'TECHFIX') {
      setPromoApplied(true);
    } else {
      alert('Use promo code FIRST10 or TECHFIX for 10% off!');
    }
  };

  const handleProceedBooking = () => {
    const serviceNames = selectedServices
      .map((id) => SERVICE_OPTIONS.find((s) => s.id === id)?.name)
      .join(', ');
    const summary = `${brand} ${deviceType}: ${serviceNames}`;
    onBookEstimate(summary, grandTotal);
  };

  return (
    <section id="cost-estimator" className="py-16 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-950 text-amber-300 border border-amber-500/30 px-3.5 py-1 rounded-full text-xs font-semibold mb-3">
            <Calculator className="w-4 h-4 text-amber-400" />
            <span>100% Transparent Pricing Guarantee</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Interactive Repair Price Estimator
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            No hidden charges, no surprises. Select your device and required services for an instant transparent price quote with our 90-day warranty included.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Step Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Device & Brand */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs">1</span>
                Device & Brand Selection
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['Laptop', 'MacBook', 'Desktop PC', 'Gaming Rig'] as DeviceType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setDeviceType(type)}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition text-center ${
                      deviceType === type
                        ? 'bg-amber-500/20 text-amber-200 border-amber-400'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Brand Name
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Dell', 'HP', 'Apple', 'Lenovo', 'ASUS', 'Acer', 'MSI', 'Custom PC'].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBrand(b)}
                      className={`text-xs px-3 py-1 rounded-lg border transition ${
                        brand === b
                          ? 'bg-slate-800 text-white border-amber-400'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 2: Select Services Required */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs">2</span>
                Select Services Required
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SERVICE_OPTIONS.map((item) => {
                  const selected = selectedServices.includes(item.id);
                  let price = item.priceLaptop;
                  if (deviceType === 'MacBook') price = item.priceMacBook;
                  if (deviceType === 'Desktop PC' || deviceType === 'Gaming Rig') price = item.priceDesktop;

                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleService(item.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition flex items-start justify-between gap-3 ${
                        selected
                          ? 'bg-amber-950/40 border-amber-500/60 text-white'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm">
                          <Wrench className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>{item.name}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-tight">
                          {item.description}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-extrabold text-amber-300 block">
                          ₹{price.toLocaleString()}
                        </span>
                        {selected ? (
                          <CheckCircle className="w-4 h-4 text-amber-400 inline-block mt-1" />
                        ) : (
                          <span className="text-[10px] text-slate-500 block">Select</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Service Mode Choice */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs">3</span>
                Service Convenience Mode
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div
                  onClick={() => setServiceMode('doorstep')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition flex items-center gap-3 ${
                    serviceMode === 'doorstep'
                      ? 'bg-blue-950/60 border-blue-500 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <Truck className="w-5 h-5 text-blue-400 shrink-0" />
                  <div>
                    <p className="text-xs font-bold">Free Doorstep Pickup & Drop</p>
                    <p className="text-[10px] text-slate-400">Technician collects device from your home</p>
                  </div>
                </div>

                <div
                  onClick={() => setServiceMode('instore')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition flex items-center gap-3 ${
                    serviceMode === 'instore'
                      ? 'bg-blue-950/60 border-blue-500 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <Building2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-xs font-bold">In-Store Fast Track Visit</p>
                    <p className="text-[10px] text-slate-400">Bring device to Panchasheel Square, Dhantoli Lab</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Live Itemized Price Quote Card */}
          <div className="lg:col-span-5 bg-slate-950 border border-amber-500/40 rounded-2xl p-6 shadow-2xl space-y-6 sticky top-20">
            <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                  Price Calculation
                </p>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {brand} {deviceType} Estimate
                </h3>
              </div>
              <span className="bg-emerald-950 text-emerald-300 text-xs font-bold px-2.5 py-1 rounded border border-emerald-800">
                90-Day Warranty Included
              </span>
            </div>

            {/* Selected Items List */}
            <div className="space-y-2.5 text-xs">
              <p className="text-slate-400 font-semibold uppercase text-[10px]">
                Selected Repairs & Parts:
              </p>
              {selectedServices.map((id) => {
                const item = SERVICE_OPTIONS.find((s) => s.id === id);
                if (!item) return null;
                let price = item.priceLaptop;
                if (deviceType === 'MacBook') price = item.priceMacBook;
                if (deviceType === 'Desktop PC' || deviceType === 'Gaming Rig') price = item.priceDesktop;

                return (
                  <div key={id} className="flex items-center justify-between py-1 border-b border-slate-900 text-slate-200">
                    <span className="flex items-center gap-1.5 font-medium">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                      {item.name}
                    </span>
                    <span className="font-bold text-slate-100">₹{price.toLocaleString()}</span>
                  </div>
                );
              })}
            </div>

            {/* Promo Code Entry */}
            <form onSubmit={applyPromo} className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder="Enter Promo Code (e.g. FIRST10)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2 outline-none uppercase font-mono"
              />
              <button
                type="submit"
                className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs px-3 py-2 rounded-xl transition flex items-center gap-1"
              >
                <Tag className="w-3.5 h-3.5" />
                Apply
              </button>
            </form>

            {promoApplied && (
              <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                10% Discount Code applied successfully (-₹{discount})
              </p>
            )}

            {/* Cost Totals Box */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Doorstep Pickup & Drop Fee</span>
                <span className="text-emerald-400 font-bold">FREE (Special Offer)</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-xs text-emerald-400 font-semibold">
                  <span>10% First Booking Discount</span>
                  <span>-₹{discount.toLocaleString()}</span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                <span className="text-sm font-bold text-white">Estimated Grand Total</span>
                <span className="text-xl font-black text-amber-300">₹{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Guarantees */}
            <div className="text-[11px] text-slate-400 space-y-1">
              <p className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                No hidden charges. Price confirmed before technician starts work.
              </p>
              <p className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-blue-400" />
                If device is not repairable, zero diagnostic charge will be levied.
              </p>
            </div>

            {/* Booking Trigger Button */}
            <button
              onClick={handleProceedBooking}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <span>Book Repair At ₹{grandTotal.toLocaleString()}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
