import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  ChevronRight,
  HardDrive,
  Cpu,
  MousePointer,
  Usb,
  ShieldCheck,
  Phone,
  MessageSquare,
  CheckCircle2,
  Truck,
  Plus,
  Minus,
  ShoppingCart
} from 'lucide-react';

interface ProductsPageProps {
  initialSubPage?: string;
  onNavigateHome: () => void;
}

export const PRODUCTS_CATALOG = [
  {
    id: 'ssd',
    categoryName: 'SSD (Solid State Drives)',
    icon: HardDrive,
    tagline: 'Supercharge your laptop & desktop speed by 10x with high-performance NVMe M.2 & SATA SSDs.',
    items: [
      { name: 'Crucial P3 512GB NVMe PCIe M.2 SSD', price: 2850, originalPrice: 4200, warranty: '3 Years', specs: 'Up to 3500 MB/s speed' },
      { name: 'Samsung 980 EVO 1TB NVMe PCIe 4.0 SSD', price: 5400, originalPrice: 7900, warranty: '5 Years', specs: 'Up to 7000 MB/s ultra speed' },
      { name: 'Kingston A400 240GB 2.5 inch SATA SSD', price: 1650, originalPrice: 2400, warranty: '3 Years', specs: 'Best for older laptop speed boost' },
      { name: 'WD Blue SN570 1TB NVMe M.2 SSD', price: 4900, originalPrice: 6800, warranty: '5 Years', specs: 'Reliable high performance' }
    ]
  },
  {
    id: 'ram',
    categoryName: 'RAM (Desktop & Laptop Memory)',
    icon: Cpu,
    tagline: 'Multi-tasking lag removal with high-speed DDR4 & DDR5 RAM modules.',
    items: [
      { name: 'Crucial 8GB DDR4 3200MHz Laptop RAM', price: 1550, originalPrice: 2200, warranty: '3 Years', specs: 'SODIMM for HP, Dell, Lenovo' },
      { name: 'Corsair Vengeance 16GB DDR4 3200MHz Desktop RAM', price: 2950, originalPrice: 4500, warranty: '10 Years', specs: 'Heatsink gaming memory' },
      { name: 'Kingston Fury Beast 16GB DDR5 5600MHz RAM', price: 4600, originalPrice: 6500, warranty: '10 Years', specs: 'Next-gen DDR5 high frequency' },
      { name: 'ADATA 8GB DDR4 2666MHz Desktop RAM', price: 1350, originalPrice: 1900, warranty: '3 Years', specs: 'Budget office desktop RAM' }
    ]
  },
  {
    id: 'mouse-keyboard',
    categoryName: 'Mouse & Keyboards',
    icon: MousePointer,
    tagline: 'Ergonomic wireless mice, mechanical gaming keyboards & USB combos.',
    items: [
      { name: 'Logitech MK215 Wireless Keyboard & Mouse Combo', price: 1290, originalPrice: 1695, warranty: '3 Years', specs: '2.4GHz wireless long battery' },
      { name: 'Dell KM3322W Wireless Keyboard & Mouse', price: 1150, originalPrice: 1499, warranty: '3 Years', specs: 'Quiet typing & precise tracking' },
      { name: 'Logitech B100 Optical USB Wired Mouse', price: 290, originalPrice: 399, warranty: '1 Year', specs: 'Durable daily office mouse' },
      { name: 'Razer DeathAdder Essential Gaming Mouse', price: 1299, originalPrice: 2499, warranty: '2 Years', specs: '6400 DPI optical sensor' }
    ]
  },
  {
    id: 'pen-drive',
    categoryName: 'Pen Drive & Flash Drives',
    icon: Usb,
    tagline: 'High-speed USB 3.2 Type-C & Type-A dual flash drives for mobile & PC.',
    items: [
      { name: 'SanDisk Ultra Dual Drive 64GB Type-C Pen Drive', price: 690, originalPrice: 990, warranty: '5 Years', specs: 'Transfer files between Phone & PC' },
      { name: 'SanDisk Blade 32GB USB 2.0 Flash Drive', price: 340, originalPrice: 500, warranty: '5 Years', specs: 'Compact pocket storage' },
      { name: 'SanDisk Ultra Flair 128GB USB 3.0 Metal Pen Drive', price: 1150, originalPrice: 1800, warranty: '5 Years', specs: '150MB/s high-speed metal casing' },
      { name: 'HP v236w 64GB Metal USB Flash Drive', price: 580, originalPrice: 850, warranty: '2 Years', specs: 'Sturdy key ring hole design' }
    ]
  },
  {
    id: 'hard-disk',
    categoryName: 'Hard Disk & External Storage',
    icon: HardDrive,
    tagline: 'High-capacity external backup hard drives & internal surveillance HDDs.',
    items: [
      { name: 'Seagate Expansion 1TB External Portable Hard Drive', price: 4200, originalPrice: 5500, warranty: '3 Years', specs: 'USB 3.0 drag-and-drop backup' },
      { name: 'WD My Passport 2TB External Hard Drive', price: 6100, originalPrice: 8200, warranty: '3 Years', specs: 'Password protection & hardware encryption' },
      { name: 'Seagate SkyHawk 2TB CCTV Surveillance HDD', price: 4600, originalPrice: 6200, warranty: '3 Years', specs: '24/7 continuous DVR recording' },
      { name: 'WD Blue 1TB 3.5-inch Desktop Internal HDD', price: 3400, originalPrice: 4500, warranty: '2 Years', specs: '7200 RPM reliable desktop storage' }
    ]
  },
  {
    id: 'chargers',
    categoryName: 'Laptop Chargers & Power Adapters',
    icon: Usb,
    tagline: 'Genuine replacement chargers for HP, Dell, Lenovo, Acer, ASUS & Type-C PD MacBooks.',
    items: [
      { name: 'Original HP 65W Blue Pin Smart Adapter', price: 1250, originalPrice: 1950, warranty: '1 Year', specs: '19.5V 3.33A for Pavilion & ProBook' },
      { name: 'Original Dell 65W 4.5mm Small Pin Charger', price: 1350, originalPrice: 2100, warranty: '1 Year', specs: '19.5V 3.34A for Inspiron & Vostro' },
      { name: 'Universal 65W Type-C USB-PD Laptop Charger', price: 1650, originalPrice: 2400, warranty: '1 Year', specs: 'Fast charging for Lenovo, Mac & ASUS' },
      { name: 'Lenovo 65W Yellow Square Pin Adapter', price: 1150, originalPrice: 1800, warranty: '1 Year', specs: '20V 3.25A for ThinkPad & IdeaPad' }
    ]
  },
  {
    id: 'batteries',
    categoryName: 'OEM Laptop Replacement Batteries',
    icon: Cpu,
    tagline: 'Long-life A+ grade battery cells with 100% surge safety & 1-year replacement warranty.',
    items: [
      { name: 'HP HT03XL / TF03XL Original Battery', price: 2100, originalPrice: 3200, warranty: '1 Year', specs: 'For HP Pavilion 14/15 240 G7' },
      { name: 'Dell WDX0R 42Wh Original Laptop Battery', price: 2350, originalPrice: 3500, warranty: '1 Year', specs: 'For Dell Inspiron 5368 5567 5570' },
      { name: 'Lenovo L15M3PB0 / L15L3PB0 Battery', price: 2200, originalPrice: 3100, warranty: '1 Year', specs: 'For Lenovo IdeaPad 320 330 520' },
      { name: 'MacBook Air A1466 A1405 Original Battery', price: 3400, originalPrice: 4900, warranty: '1 Year', specs: '7200mAh high endurance battery' }
    ]
  },
  {
    id: 'display-screens',
    categoryName: 'Laptop Replacement Screens & Hinges',
    icon: HardDrive,
    tagline: 'A+ Grade Full HD, IPS & 144Hz high refresh rate screens with same-day installation.',
    items: [
      { name: '15.6-inch FHD 1920x1080 IPS Slim Screen', price: 3800, originalPrice: 5500, warranty: '1 Year', specs: '30-pin EDP slim bezel non-touch' },
      { name: '14.0-inch FHD IPS Anti-Glare Laptop Display', price: 3600, originalPrice: 5200, warranty: '1 Year', specs: 'Ultra thin 30-pin EDP connector' },
      { name: '15.6-inch 144Hz Gaming Laptop Screen', price: 5400, originalPrice: 7800, warranty: '1 Year', specs: '40-pin EDP for Nitro, TUF & Victus' },
      { name: 'Custom Alloy Laptop Hinge Assembly Pair', price: 850, originalPrice: 1400, warranty: '6 Months', specs: 'Heavy duty reinforced steel hinges' }
    ]
  },
  {
    id: 'cooling-pads',
    categoryName: 'Thermal Paste & Laptop Cooling Pads',
    icon: Cpu,
    tagline: 'Arctic MX-4 thermal grease & dual-fan RGB laptop cooling stands.',
    items: [
      { name: 'Arctic MX-4 High Performance Thermal Paste (4g)', price: 650, originalPrice: 950, warranty: 'Genuine', specs: '8.5 W/mK high thermal conductivity' },
      { name: 'EvoFox Frost Dual RGB Gaming Cooling Pad', price: 1190, originalPrice: 1800, warranty: '1 Year', specs: '140mm dual silent LED fans' },
      { name: 'Noctua NT-H1 Premium Thermal Compound (3.5g)', price: 890, originalPrice: 1200, warranty: 'Genuine', specs: 'Pro gaming & workstation grade' }
    ]
  }
];

export const ProductsPage: React.FC<ProductsPageProps> = ({
  initialSubPage = 'ssd',
  onNavigateHome
}) => {
  const [activeCatId, setActiveCatId] = useState<string>(initialSubPage);
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    if (initialSubPage) {
      setActiveCatId(initialSubPage);
    }
  }, [initialSubPage]);

  const activeCategory = PRODUCTS_CATALOG.find((c) => c.id === activeCatId) || PRODUCTS_CATALOG[0];

  const handleAddToCart = (itemName: string, price: number) => {
    setCartCount((prev) => prev + 1);
    const message = `Hi Sharon Infotech Nagpur! I want to order / buy: *${itemName}* (Price: ₹${price}). Please confirm stock & doorstep delivery in Nagpur.`;
    const url = `https://wa.me/917249430043?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
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
          <span className="text-slate-200 font-bold">Products & Spare Parts</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-amber-400 font-extrabold">{activeCategory.categoryName}</span>
        </div>

        {/* Page Hero Title */}
        <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-slate-950 p-6 sm:p-8 rounded-3xl border border-amber-800/40 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
              Sharon Infotech Hardware Store • Nagpur
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              SSDs, RAMs, Keyboards, Pen Drives & Hard Disks
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              100% genuine branded computer accessories with manufacturer GST bill & warranty. Same-day doorstep delivery or store pickup in Nagpur.
            </p>
          </div>
        </div>

        {/* Sub-Pages Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-800">
          {PRODUCTS_CATALOG.map((cat) => {
            const Icon = cat.icon;
            const isSelected = cat.id === activeCatId;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCatId(cat.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-extrabold whitespace-nowrap transition border ${
                  isSelected
                    ? 'bg-amber-600 text-white border-amber-400 shadow-lg scale-105'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-amber-400'}`} />
                <span>{cat.categoryName.split('(')[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Description Banner */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-black text-white">{activeCategory.categoryName}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{activeCategory.tagline}</p>
          </div>
          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-emerald-400 font-bold shrink-0">
            <Truck className="w-4 h-4" /> Free Fitting Available at Sharon Infotech Shop
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {activeCategory.items.map((prod, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-amber-500/50 transition group shadow-lg"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                    {prod.warranty} Warranty
                  </span>
                  <span className="text-[10px] text-slate-500 line-through font-mono">
                    ₹{prod.originalPrice}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-white group-hover:text-amber-300 transition leading-snug">
                  {prod.name}
                </h3>

                <p className="text-[11px] text-slate-400 font-medium">
                  {prod.specs}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-slate-500 block font-semibold">Nagpur Price</span>
                  <span className="text-lg font-black text-white font-mono">
                    ₹{prod.price}
                  </span>
                </div>

                <button
                  onClick={() => handleAddToCart(prod.name, prod.price)}
                  className="px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-black text-xs transition flex items-center gap-1.5 shadow-md"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  Order
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Spare Parts Inquiry Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-blue-800/40 rounded-3xl p-6 sm:p-8 text-center space-y-4">
          <h3 className="text-xl font-black text-white">Need a Specific Part or Bulk Wholesale Order in Nagpur?</h3>
          <p className="text-xs text-slate-300 max-w-2xl mx-auto">
            We stock 10,000+ computer items including Laptop Chargers, Laptop Batteries, Displays, Wi-Fi Cards, Thermal Pastes, Gaming Cabinets, and CCTV Accessories.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href="tel:+917249430043"
              className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs uppercase tracking-wider transition flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Call Shop: 7249430043
            </a>
            <a
              href="https://wa.me/917249430043?text=Hi%20Sharon%20Infotech,%20I%20am%20looking%20for%20spare%20parts%20price%20inquiry"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider transition flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp Spare Inquiry
            </a>
          </div>
        </div>

        {/* PRODUCTS PAGE SPECIFIC FAQ SECTION */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-black uppercase text-amber-400 tracking-wider">
                Products & Spares FAQ
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                Frequently Asked Questions - Computer Parts & Accessories
              </h2>
            </div>
            <a
              href="tel:7249430043"
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-400 bg-emerald-950/80 px-3.5 py-2 rounded-xl border border-emerald-800/80 hover:bg-emerald-900 transition"
            >
              <Phone className="w-3.5 h-3.5" />
              Order Helpline: 7249430043
            </a>
          </div>

          <div className="space-y-3">
            <details className="group rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-4 text-xs font-bold text-white hover:bg-slate-900">
                <span>1. Are SSDs, RAMs, and computer accessories sold by Sharon Infotech 100% brand new with warranty?</span>
                <span className="shrink-0 rounded-full bg-slate-900 p-1 text-slate-400 group-open:-rotate-180 transition">
                  <ChevronRight className="w-4 h-4 rotate-90" />
                </span>
              </summary>
              <div className="p-4 pt-0 text-xs text-slate-300 leading-relaxed border-t border-slate-900 bg-slate-900/40 space-y-2">
                <p>Yes, all SSDs (Crucial, Samsung, WD, Kingston), RAMs (DDR4, DDR5), mouse/keyboard combos, and external hard drives are 100% genuine with official manufacturer GST invoices and written warranty. Call 7249430043 for instant stock availability.</p>
              </div>
            </details>

            <details className="group rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-4 text-xs font-bold text-white hover:bg-slate-900">
                <span>2. Do you provide home delivery and installation for SSDs and RAMs in Nagpur?</span>
                <span className="shrink-0 rounded-full bg-slate-900 p-1 text-slate-400 group-open:-rotate-180 transition">
                  <ChevronRight className="w-4 h-4 rotate-90" />
                </span>
              </summary>
              <div className="p-4 pt-0 text-xs text-slate-300 leading-relaxed border-t border-slate-900 bg-slate-900/40 space-y-2">
                <p>Yes! When you buy an SSD or RAM from Sharon Infotech, our technician can visit your home/office in Nagpur, install the hardware, transfer your Windows operating system, and configure your PC speed in under 30 minutes. Contact 7249430043.</p>
              </div>
            </details>

            <details className="group rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-4 text-xs font-bold text-white hover:bg-slate-900">
                <span>3. Do you sell certified refurbished laptops in Nagpur with warranty?</span>
                <span className="shrink-0 rounded-full bg-slate-900 p-1 text-slate-400 group-open:-rotate-180 transition">
                  <ChevronRight className="w-4 h-4 rotate-90" />
                </span>
              </summary>
              <div className="p-4 pt-0 text-xs text-slate-300 leading-relaxed border-t border-slate-900 bg-slate-900/40 space-y-2">
                <p>Yes, we offer business-grade refurbished Dell Inspiron/Latitude, HP EliteBook/ProBook, and Lenovo ThinkPads starting at just ₹12,500 with a 6-month store warranty and brand new battery. Call 7249430043 to see current available models.</p>
              </div>
            </details>
          </div>
        </div>

        {/* CALL TO ACTION BLOCK */}
        <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-emerald-950 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
              Looking for Genuine Computer Spares & Accessories in Nagpur?
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Call 7249430043 for Express Doorstep Delivery
            </h3>
            <p className="text-xs text-slate-300">
              Get original SSDs, RAMs, Chargers & Displays delivered to your doorstep.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
            <a
              href="tel:7249430043"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition"
            >
              <Phone className="w-4 h-4" />
              <span>Call 7249430043</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
