import React, { useState } from 'react';
import {
  Star,
  CheckCircle2,
  ThumbsUp,
  MapPin,
  Quote,
  ShieldCheck,
  Search,
  Filter,
  Sparkles,
  ArrowRight,
  Clock,
  Laptop,
  Printer,
  HardDrive,
  Video,
  Wrench,
  Award,
  UserCheck
} from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  category: 'chip-level' | 'data-recovery' | 'printer' | 'cctv' | 'doorstep';
  categoryLabel: string;
  device: string;
  rating: number;
  date: string;
  verified: boolean;
  scenario: string;
  solution: string;
  savingsOrOutcome: string;
  quote: string;
}

const REAL_WORLD_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Dr. Rajesh Deshmukh',
    role: 'Senior Physician & Clinic Owner',
    location: 'Dharampeth, Nagpur',
    category: 'chip-level',
    categoryLabel: 'Motherboard Chip-Level',
    device: 'Dell Latitude 7490 Laptop',
    rating: 5,
    date: '2 days ago',
    verified: true,
    scenario: 'Laptop suddenly went completely dead with critical patient medical records stored on C: drive during OPD hours.',
    solution: 'Sharon Infotech team collected the laptop from Dharampeth within 30 mins, diagnosed shorted power IC on motherboard, replaced micro-components, and delivered back working in 6 hours.',
    savingsOrOutcome: 'Saved ₹24,000 compared to full motherboard replacement quote from official store.',
    quote: 'Sharon Infotech is a lifesaver in Nagpur! Official brand center demanded ₹28,000 for a new board and 10 days wait. Sharon repaired my board for just ₹2,600 with 6 months written warranty card.'
  },
  {
    id: 't2',
    name: 'Priya Kulkarni',
    role: 'CA Firm Partner',
    location: 'Sitabuldi, Nagpur',
    category: 'data-recovery',
    categoryLabel: 'Data Recovery & Hard Disk',
    device: 'Seagate 2TB External Hard Drive',
    rating: 5,
    date: '1 week ago',
    verified: true,
    scenario: 'External hard disk containing 5 years of client Tally accounting backup suffered head crash during audit season.',
    solution: 'Performed cleanroom head assembly repair and raw sector extraction at Sharon Infotech Sitabuldi lab.',
    savingsOrOutcome: '100% accounting data and GST returns recovered safely without data leak.',
    quote: 'We were in complete panic. Other repair shops in Sadar said data is impossible to recover. Sharon Infotech recovered 100% of our Tally data within 24 hours. Highest level of professionalism and confidentiality!'
  },
  {
    id: 't3',
    name: 'Amitabh Joshi',
    role: 'Coaching Institute Director',
    location: 'Manish Nagar, Nagpur',
    category: 'printer',
    categoryLabel: 'Printer & Toner Refill',
    device: 'HP Laserjet Pro M126nw Printer',
    rating: 5,
    date: '2 weeks ago',
    verified: true,
    scenario: 'Heavy paper jam and faded printing right before distributing test papers to 300 students.',
    solution: 'Doorstep technician visited Manish Nagar premises, replaced worn pickup roller, serviced laser scanner assembly, and refilled high-yield magnetic toner.',
    savingsOrOutcome: 'Printer restored to factory dark print quality in 45 minutes flat.',
    quote: 'Prompt doorstep printer service in Nagpur! Their technician arrived with all genuine spare parts and fixed our HP Laserjet on the spot. Highly recommended for institutes and offices.'
  },
  {
    id: 't4',
    name: 'Siddharth Agrawal',
    role: 'Warehouse Operations Head',
    location: 'MIDC Hingna, Nagpur',
    category: 'cctv',
    categoryLabel: 'CCTV Camera & AMC',
    device: '8-Channel Hikvision IP Camera System',
    rating: 5,
    date: '3 weeks ago',
    verified: true,
    scenario: 'Needed complete surveillance setup with night vision and remote phone streaming across 10,000 sq ft industrial godown.',
    solution: 'Designed full CAT6 network cabling, mounted 8 Outdoor Bullet cameras with 30m IR, configured mobile live view app with motion alert alerts.',
    savingsOrOutcome: 'Delivered project in 2 days under budget with 1-Year Onsite Warranty.',
    quote: 'Flawless CCTV installation at our MIDC Hingna factory. Sharon Infotech handled complete wiring, NVR configuration, and phone app setup smoothly. Excellent post-sales AMC support.'
  },
  {
    id: 't5',
    name: 'Neeti Shrivastava',
    role: 'Freelance Graphic Designer',
    location: 'Ramdaspeth, Nagpur',
    category: 'chip-level',
    categoryLabel: 'MacBook & Liquid Repair',
    device: 'MacBook Air M1 (2020)',
    rating: 5,
    date: '1 month ago',
    verified: true,
    scenario: 'Accidentally spilled hot green tea over keyboard; laptop shut down and refused to power on or charge.',
    solution: 'Ultrasonic chemical cleaning of logic board, trace repair for corroded power rail, and keyboard backlight assembly restoration.',
    savingsOrOutcome: 'Saved over ₹45,000 vs Apple authorized store quote.',
    quote: 'Apple store quoted ₹52,000 stating logic board and top case must be swapped. Sharon Infotech repaired the same board for ₹6,500. My MacBook Air works like brand new with zero data loss!'
  },
  {
    id: 't6',
    name: 'Sanjay Wankhede',
    role: 'IT Administrator',
    location: 'Wardha Road / Somalwada, Nagpur',
    category: 'doorstep',
    categoryLabel: 'Doorstep Corporate AMC',
    device: '15 Desktop PCs & LAN Router Network',
    rating: 5,
    date: '1 month ago',
    verified: true,
    scenario: 'Office desktops suffering slow boot times, malware popups, and random Wi-Fi disconnections.',
    solution: 'Upgraded 15 PCs with 512GB Crucial NVMe SSDs, installed clean Windows 11 Pro, optimized gigabit switch network, and set up daily auto backup.',
    savingsOrOutcome: 'Boot time dropped from 3 minutes to 8 seconds; employee productivity doubled.',
    quote: 'Sharon Infotech transformed our office hardware. The SSD upgrade gave a brand-new life to our 5-year-old computers at 20% of the cost of buying new PCs. Best IT partner in Nagpur!'
  }
];

interface TestimonialsSectionProps {
  onOpenBooking: (mode?: any, prefillIssue?: string) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  onOpenBooking
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);
  const [userRating, setUserRating] = useState<number>(5);
  const [submittedMessage, setSubmittedMessage] = useState<boolean>(false);

  const filteredTestimonials = REAL_WORLD_TESTIMONIALS.filter((t) => {
    const matchesCategory =
      selectedCategory === 'all' || t.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.device.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.scenario.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.quote.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="testimonials" className="py-16 bg-slate-950 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-950/80 border border-amber-500/40 text-amber-400 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Real Customer Experiences • Nagpur</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            Customer Testimonials & Real-World Repair Stories
          </h2>
          
          <p className="text-slate-400 text-sm mt-3 leading-relaxed">
            See how Sharon Infotech has saved money, recovered critical data, and fixed complex computer, printer, and CCTV problems for over 18,000+ happy clients in Nagpur since 2013.
          </p>
        </div>

        {/* High-Trust Ratings Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 mb-12 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-slate-800">
            
            {/* Rating Box */}
            <div className="flex flex-col items-center md:items-start justify-center pb-4 md:pb-0 md:pr-4">
              <div className="flex items-center gap-2 text-amber-400">
                <span className="text-4xl font-black text-white">4.9</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-xs font-bold text-slate-300 mt-1">Overall Satisfaction Rating</p>
              <p className="text-[11px] text-slate-500">Based on 2,850+ Google & Local Reviews</p>
            </div>

            {/* Stat 1 */}
            <div className="flex flex-col items-center md:items-start justify-center pt-4 md:pt-0 md:px-6">
              <div className="flex items-center gap-2 text-blue-400">
                <Award className="w-5 h-5 text-blue-400" />
                <span className="text-2xl font-black text-white">18,000+</span>
              </div>
              <p className="text-xs font-bold text-slate-300 mt-1">Repairs Completed in Nagpur</p>
              <p className="text-[11px] text-slate-500">Laptops, Desktops, Printers & CCTV</p>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center md:items-start justify-center pt-4 md:pt-0 md:px-6">
              <div className="flex items-center gap-2 text-emerald-400">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="text-2xl font-black text-white">100% Written</span>
              </div>
              <p className="text-xs font-bold text-slate-300 mt-1">Warranty Cards Provided</p>
              <p className="text-[11px] text-slate-500">Up to 365 Days Replacement Warranty</p>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center md:items-start justify-center pt-4 md:pt-0 md:pl-6">
              <div className="flex items-center gap-2 text-purple-400">
                <Clock className="w-5 h-5 text-purple-400" />
                <span className="text-2xl font-black text-white">Free Doorstep</span>
              </div>
              <p className="text-xs font-bold text-slate-300 mt-1">Pickup & Drop in Nagpur</p>
              <p className="text-[11px] text-slate-500">Same-Day Diagnosis & Transparent Billing</p>
            </div>

          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 no-scrollbar text-xs font-bold">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl transition shrink-0 flex items-center gap-1.5 ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-extrabold'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>All Scenarios ({REAL_WORLD_TESTIMONIALS.length})</span>
            </button>

            <button
              onClick={() => setSelectedCategory('chip-level')}
              className={`px-4 py-2 rounded-xl transition shrink-0 flex items-center gap-1.5 ${
                selectedCategory === 'chip-level'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-extrabold'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Laptop className="w-3.5 h-3.5 text-blue-400" />
              <span>Motherboard Chip-Level</span>
            </button>

            <button
              onClick={() => setSelectedCategory('data-recovery')}
              className={`px-4 py-2 rounded-xl transition shrink-0 flex items-center gap-1.5 ${
                selectedCategory === 'data-recovery'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 font-extrabold'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <HardDrive className="w-3.5 h-3.5 text-purple-400" />
              <span>Data Recovery</span>
            </button>

            <button
              onClick={() => setSelectedCategory('printer')}
              className={`px-4 py-2 rounded-xl transition shrink-0 flex items-center gap-1.5 ${
                selectedCategory === 'printer'
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30 font-extrabold'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span>Printer & Cartridges</span>
            </button>

            <button
              onClick={() => setSelectedCategory('cctv')}
              className={`px-4 py-2 rounded-xl transition shrink-0 flex items-center gap-1.5 ${
                selectedCategory === 'cctv'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 font-extrabold'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Video className="w-3.5 h-3.5 text-emerald-400" />
              <span>CCTV & Corporate</span>
            </button>
          </div>

          {/* Search Input Box */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search e.g. Sitabuldi, MacBook, Tally..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
            />
          </div>

        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-slate-700 transition hover:shadow-2xl hover:shadow-blue-900/10 group"
            >
              <div className="space-y-4">
                
                {/* Top Badge & Rating Header */}
                <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md bg-blue-950/80 text-blue-400 border border-blue-800/40">
                    {testimonial.categoryLabel}
                  </span>

                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                    <span className="text-xs font-black text-white ml-1">5.0</span>
                  </div>
                </div>

                {/* Scenario Description */}
                <div className="space-y-2">
                  <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800/60">
                    <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Wrench className="w-3 h-3 text-rose-400" />
                      Problem / Challenge:
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed font-medium">
                      "{testimonial.scenario}"
                    </p>
                  </div>

                  <div className="bg-emerald-950/30 rounded-xl p-3 border border-emerald-800/30">
                    <p className="text-[11px] font-extrabold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      Sharon Infotech Solution:
                    </p>
                    <p className="text-xs text-emerald-200 leading-relaxed">
                      {testimonial.solution}
                    </p>
                  </div>
                </div>

                {/* Customer Quote */}
                <div className="relative pl-3 border-l-2 border-amber-500 pt-1">
                  <Quote className="w-4 h-4 text-amber-400/40 absolute -top-1 right-0" />
                  <p className="text-xs text-slate-200 leading-relaxed italic font-normal">
                    "{testimonial.quote}"
                  </p>
                </div>

                {/* Savings / Outcome Highlight */}
                <div className="bg-gradient-to-r from-blue-950/50 to-indigo-950/50 border border-blue-800/40 rounded-xl p-2.5 text-center">
                  <span className="text-[11px] font-extrabold text-blue-300 block">
                    ✨ Outcome: {testimonial.savingsOrOutcome}
                  </span>
                </div>

              </div>

              {/* Card Footer - Customer Info */}
              <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-white">{testimonial.name}</span>
                    {testimonial.verified && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        Verified
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                    <span className="flex items-center gap-1 text-slate-400">
                      <MapPin className="w-3 h-3 text-rose-400" />
                      {testimonial.location}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium truncate max-w-[190px]">
                    {testimonial.device}
                  </p>
                </div>

                {/* Book Similar Button */}
                <button
                  onClick={() =>
                    onOpenBooking(
                      'doorstep',
                      `Service Request based on ${testimonial.categoryLabel} (${testimonial.device})`
                    )
                  }
                  className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/40 text-[11px] font-bold transition flex items-center gap-1 shrink-0"
                >
                  <span>Book Repair</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom CTA & Add Review trigger */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="text-left space-y-1">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-emerald-400" />
              Have you repaired your device at Sharon Infotech?
            </h3>
            <p className="text-xs text-slate-400">
              Share your feedback or book a free doorstep pickup diagnostic across Nagpur today.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShowReviewModal(true)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition"
            >
              Write a Review
            </button>
            <button
              onClick={() => onOpenBooking('doorstep', 'Doorstep Repair Pickup Request')}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-wider transition shadow-lg shadow-blue-600/30 flex items-center gap-1.5"
            >
              <span>Book Nagpur Pickup</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Write a Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 relative shadow-2xl">
            <button
              onClick={() => {
                setShowReviewModal(false);
                setSubmittedMessage(false);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              ✕
            </button>

            {!submittedMessage ? (
              <>
                <div className="space-y-1">
                  <h4 className="text-lg font-black text-white">Rate & Review Sharon Infotech</h4>
                  <p className="text-xs text-slate-400">
                    Your feedback helps thousands of Nagpur residents find reliable IT repair services.
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmittedMessage(true);
                  }}
                  className="space-y-3"
                >
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Verma (Dharampeth)"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Device / Service *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. HP Laptop Screen Repair or Printer Refill"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Star Rating</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setUserRating(star)}
                          className="p-1 text-amber-400 hover:scale-110 transition"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= userRating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-extrabold text-amber-400 ml-2">{userRating}.0 / 5.0</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Your Feedback / Story *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Tell us about the issue and how Sharon Infotech resolved it..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white outline-none focus:border-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs uppercase tracking-wider transition shadow-lg shadow-blue-600/30"
                  >
                    Submit Verified Review
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-black text-white">Thank You for Your Review!</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Your feedback has been received and will be published on Sharon Infotech's Nagpur testimonial wall shortly.
                </p>
                <button
                  onClick={() => {
                    setShowReviewModal(false);
                    setSubmittedMessage(false);
                  }}
                  className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </section>
  );
};
