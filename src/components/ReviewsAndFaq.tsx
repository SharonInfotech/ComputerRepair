import React, { useState } from 'react';
import {
  Star,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Search,
  CheckCircle2,
  Lock,
  ThumbsUp,
  MapPin,
  Phone
} from 'lucide-react';

const SHARON_REVIEWS = [
  {
    id: 1,
    name: 'Manoj Sharma (Dharampeth, Nagpur)',
    device: 'Dell Inspiron (Motherboard Chip Repair)',
    rating: 5,
    date: '3 days ago',
    comment: 'Sharon Infotech is the best computer repair shop in Nagpur! My Dell laptop was completely dead. Official store told me to replace the whole motherboard for ₹28,000. Sharon Infotech repaired the IC on motherboard for ₹2,400 with 3 months warranty!'
  },
  {
    id: 2,
    name: 'Pooja Kulkarni (Sitabuldi, Nagpur)',
    device: 'HP Laserjet Printer & Toner Refill',
    rating: 5,
    date: '1 week ago',
    comment: 'Quick and reliable printer repair service in Nagpur. Sent technician to our coaching class near Sitabuldi within 40 minutes. Fixed paper jam and refilled cartridge instantly.'
  },
  {
    id: 3,
    name: 'Sanket Agrawal (Manish Nagar, Nagpur)',
    device: 'MacBook Air M1 Liquid Damage & CCTV Setup',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Extremely professional team at Sharon Infotech. They saved my MacBook Air after liquid spill and also installed 4 Hikvision CCTV cameras at my store in Manish Nagar with mobile live view.'
  }
];

const SHARON_FAQS = [
  {
    category: 'Warranty & Charges',
    q: 'What is the repair warranty offered by Sharon Infotech?',
    a: 'All replaced hardware components—including laptop LCD display screens, OEM batteries, keyboards, NVMe SSDs, RAM, and motherboard chip-level micro-soldering—come with 90 Days to 365 Days (1 Year) Written Warranty Cards from Sharon Infotech Nagpur. If any part fails within the warranty period, we provide instant free replacement without hassle.'
  },
  {
    category: 'Pick-up & Delivery',
    q: 'Do you provide doorstep pick-up and drop across Nagpur?',
    a: 'Yes! Sharon Infotech offers 100% Free Doorstep Pickup & Delivery in Nagpur. Our certified service executive collects your device directly from your home or office in Dharampeth, Sitabuldi, Sadar, Manish Nagar, Wardha Road, Pratap Nagar, Hingna MIDC, Nandanvan, or Kamptee, provides a formal job receipt, and returns it after repair.'
  },
  {
    category: 'Payments & Invoicing',
    q: 'What payment methods do you accept and do you provide GST bills?',
    a: 'We accept all major payment methods including UPI (Google Pay, PhonePe, Paytm, BHIM), Credit/Debit Cards, Net Banking, Cash, and Cheque. For business, corporate, and GST-registered clients in Nagpur, we issue 100% Tax GST Invoices so you can claim input tax credit.'
  },
  {
    category: 'Warranty & Charges',
    q: 'How long does device diagnosis take and is there an estimate fee?',
    a: 'Initial diagnosis is completely FREE at Sharon Infotech. Standard diagnostic results for laptops, desktops, and printers are provided within 30 to 60 minutes. Once diagnosed, we share a transparent cost estimate with you before proceeding. You pay ONLY if you approve the repair!'
  },
  {
    category: 'Data & Security',
    q: 'Is my personal & business data safe during repair?',
    a: '100% Confidential and Safe. Sharon Infotech adheres to strict data privacy protocols. We do NOT access, copy, or browse your personal files, photos, or documents during motherboard, screen, or keyboard repair. For data recovery services, we sign a Non-Disclosure Agreement (NDA) upon request.'
  },
  {
    category: 'Pick-up & Delivery',
    q: 'What brands of laptops, desktops, and printers do you service?',
    a: 'We provide specialized repair services for HP, Dell, Lenovo, Apple MacBook (Air & Pro), ASUS, Acer, MSI, Canon, Epson, Brother, Hikvision, and CP Plus. We stock genuine OEM spare parts for all major models.'
  },
  {
    category: 'Payments & Invoicing',
    q: 'Do you offer Corporate AMC (Annual Maintenance Contracts) for offices in Nagpur?',
    a: 'Yes! We manage computer networks, printers, and CCTV surveillance systems for over 50+ schools, coaching institutes, hospitals, and corporate offices across Nagpur under flexible Quarterly & Annual Maintenance Contracts (AMC) with dedicated priority support.'
  }
];

export const ReviewsAndFaq: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [faqSearch, setFaqSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Warranty & Charges', 'Pick-up & Delivery', 'Payments & Invoicing', 'Data & Security'];

  const filteredFaqs = SHARON_FAQS.filter((f) => {
    const matchesCategory = activeCategory === 'All' || f.category === activeCategory;
    const matchesSearch =
      faqSearch === '' ||
      f.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
      f.a.toLowerCase().includes(faqSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="reviews-faq" className="py-16 bg-slate-950 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Customer Reviews Section */}
        <div className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-amber-400 font-extrabold text-xs uppercase tracking-widest bg-amber-950/80 px-3.5 py-1 rounded-full border border-amber-500/30">
              Nagpur Customer Reviews
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight mt-3">
              Trusted by 18,000+ Customers in Nagpur Since 2013
            </h2>
            <div className="flex items-center justify-center gap-2 mt-2 text-amber-400 font-bold text-sm">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-white">4.9 / 5.0 Rating</span>
              <span className="text-slate-400 text-xs">(Sharon Infotech Google Reviews)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SHARON_REVIEWS.map((review) => (
              <div
                key={review.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-500">{review.date}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    "{review.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white flex items-center gap-1">
                      {review.name}
                      <CheckCircle2 className="w-3 h-3 text-blue-400" />
                    </p>
                    <p className="text-[10px] text-slate-400 truncate max-w-[200px]">
                      {review.device}
                    </p>
                  </div>
                  <ThumbsUp className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-indigo-400 font-extrabold text-xs uppercase tracking-widest bg-indigo-950/80 px-3.5 py-1 rounded-full border border-indigo-500/30">
              Sharon Infotech Help Center
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-3">
              Frequently Asked Questions (Nagpur Services)
            </h2>
            <p className="text-xs text-slate-400 mt-2">
              Everything you need to know about warranty, doorstep pickup, payment options & GST invoicing.
            </p>
          </div>

          {/* Category Filter Pills & Search */}
          <div className="max-w-3xl mx-auto mb-8 space-y-4">
            
            {/* Category Pills */}
            <div className="flex items-center justify-center gap-2 flex-wrap text-xs font-bold">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setOpenFaq(0);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl transition ${
                    activeCategory === cat
                      ? 'bg-blue-600 text-white font-extrabold shadow-md shadow-blue-600/30'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input Box */}
            <div className="relative max-w-md mx-auto">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                placeholder="Search queries e.g., warranty, pickup, GST, payment..."
                className="w-full bg-slate-900 border border-slate-800 text-white text-xs rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-indigo-500 transition"
              />
            </div>
          </div>

          {/* FAQ Accordions */}
          <div className="max-w-3xl mx-auto space-y-3">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => {
                const isOpen = openFaq === index;

                return (
                  <div
                    key={index}
                    className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                      isOpen
                        ? 'bg-slate-900/90 border-blue-500/50 shadow-lg shadow-blue-950/30'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-slate-100 hover:text-white flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-950 text-blue-400 border border-slate-800 shrink-0 hidden sm:inline-block">
                          {faq.category}
                        </span>
                        <span className="text-slate-100 font-extrabold leading-snug">
                          {faq.q}
                        </span>
                      </div>
                      
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition ${
                          isOpen ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-2 text-xs text-slate-300 border-t border-slate-800/80 leading-relaxed bg-slate-950/60 space-y-3">
                        <p>{faq.a}</p>
                        
                        <div className="pt-2 flex items-center justify-between text-[11px] font-bold text-slate-400 border-t border-slate-900">
                          <span className="flex items-center gap-1 text-emerald-400">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Official Sharon Infotech Policy
                          </span>
                          <a
                            href="tel:+917249430043"
                            className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300"
                          >
                            <Phone className="w-3 h-3" />
                            <span>Ask Helpline (+91 7249430043)</span>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 bg-slate-900/50 border border-slate-800 rounded-2xl">
                <p className="text-xs text-slate-400">No matching questions found for "{faqSearch}".</p>
                <button
                  onClick={() => {
                    setFaqSearch('');
                    setActiveCategory('All');
                  }}
                  className="mt-2 text-xs text-blue-400 font-bold underline"
                >
                  Reset FAQ filters
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
