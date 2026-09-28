import React from 'react';
import {
  ShieldCheck,
  Award,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  Phone,
  Lock,
  Cpu,
  BadgeCheck,
  Building2,
  Star,
  FileText
} from 'lucide-react';

interface TeamTrustSectionProps {
  onOpenBooking?: (mode?: 'doorstep' | 'instore', prefill?: string) => void;
}

export const TeamTrustSection: React.FC<TeamTrustSectionProps> = ({ onOpenBooking }) => {
  const teamMembers = [
    {
      name: 'Prabhu',
      role: 'Founder & Senior Director',
      experience: '13+ Years Exp',
      specialty: 'Multi-Brand Diagnostics & Master BGA Logic Repair',
      bio: 'Pioneered computer repair in Dhantoli, Nagpur in 2013. Specialist in complex motherboard circuit tracing & Apple Mac chip repair.',
      badge: 'Certified Master Engineer'
    },
    {
      name: 'Amit Sharma',
      role: 'Lead Chip-Level Hardware Specialist',
      experience: '10+ Years Exp',
      specialty: 'BGA Micro-Soldering & Liquid Damage Recovery',
      bio: 'Expert in replacing shorted IC chips, MOSFETs, and power controller ICs for Dell, HP, Lenovo, ASUS, and Acer gaming laptops.',
      badge: 'Motherboard Specialist'
    },
    {
      name: 'Rohan Deshmukh',
      role: 'Display & Apple MacBook Master',
      experience: '8+ Years Exp',
      specialty: 'Retina Display, Hinge Welding & Battery Swap',
      bio: 'Trained in precision screen panel bonding, MacBook Pro M1/M2/M3 flex cable repairs, and original battery replacements.',
      badge: 'Display & Apple Specialist'
    },
    {
      name: 'Sanjay Verma',
      role: 'CCTV & Network Enterprise Architect',
      experience: '11+ Years Exp',
      specialty: 'IP CCTV, Router Rack Setup & Corporate AMC',
      bio: 'Architected security networks & server cabling for over 150+ schools, corporate offices, and hospitals in Nagpur.',
      badge: 'Network Architect'
    }
  ];

  const trustPillars = [
    {
      icon: <Award className="w-6 h-6 text-amber-400" />,
      title: '12+ Years Nagpur Legacy',
      description: 'Established in 2013 at Panchasheel Square, Dhantoli. Over 38,000+ satisfied customers across Nagpur.'
    },
    {
      icon: <BadgeCheck className="w-6 h-6 text-emerald-400" />,
      title: '90-Day Written Warranty',
      description: 'Every hardware replacement and motherboard repair includes an official stamped written warranty certificate.'
    },
    {
      icon: <Cpu className="w-6 h-6 text-blue-400" />,
      title: '100% Genuine OEM Spare Parts',
      description: 'We source original displays, batteries, keyboards, and SSDs directly from authorized brand suppliers.'
    },
    {
      icon: <Lock className="w-6 h-6 text-purple-400" />,
      title: 'Strict Data Privacy NDA',
      description: 'Zero data loss guarantee. Your personal files, photos, and confidential business documents are 100% protected.'
    }
  ];

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-10 shadow-2xl relative overflow-hidden my-8">
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 relative z-10">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-950 text-blue-400 border border-blue-800">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Certified Technical Team & Trust Guarantee • Sharon Infotech
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Nagpur's Most Trusted Computer Hardware Engineers
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
          Behind Sharon Infotech's 4.9/5 star rating are certified engineers operating ESD-safe workstations at our Dhantoli, Nagpur laboratory. We combine 12+ years of local experience with genuine parts and upfront transparent quotes.
        </p>
      </div>

      {/* Trust Pillars 4 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {trustPillars.map((pillar, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition space-y-3 shadow-md"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center border border-slate-800">
              {pillar.icon}
            </div>
            <h3 className="font-extrabold text-sm text-white">{pillar.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{pillar.description}</p>
          </div>
        ))}
      </div>

      {/* Team Profiles Grid */}
      <div className="space-y-6 relative z-10 pt-4 border-t border-slate-800/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-amber-400">
              Meet Our Senior Specialists
            </span>
            <h3 className="text-xl font-black text-white mt-0.5">
              Certified Hardware & Network Technicians
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>4.9/5 Rating (542+ Google Reviews)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 transition flex flex-col justify-between space-y-4 group shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 font-black text-sm flex items-center justify-center border border-blue-500/30">
                    {member.name.charAt(0)}
                  </div>
                  <span className="text-[10px] font-black text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    {member.experience}
                  </span>
                </div>

                <div>
                  <h4 className="font-black text-sm text-white group-hover:text-blue-400 transition">
                    {member.name}
                  </h4>
                  <p className="text-[11px] font-extrabold text-blue-400 mt-0.5">{member.role}</p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                    Core Specialization:
                  </span>
                  <p className="text-xs font-bold text-slate-200">{member.specialty}</p>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed font-normal">{member.bio}</p>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  {member.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Guarantee Certificate Card & Action */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-950 to-emerald-950 p-6 sm:p-8 rounded-2xl border border-emerald-800/50 flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10 shadow-xl">
        <div className="space-y-2 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-black text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
            <FileText className="w-3.5 h-3.5" />
            Official Sharon Infotech Guarantee Certificate
          </div>
          <h3 className="text-lg sm:text-xl font-black text-white">
            Free Diagnostic Check & Upfront Fixed Quotation
          </h3>
          <p className="text-xs text-slate-300 max-w-xl">
            No surprise fees! Our senior technicians inspect your laptop or PC in 15 minutes and provide an exact fixed repair quote before starting any work.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          {onOpenBooking && (
            <button
              onClick={() => onOpenBooking('doorstep', 'Doorstep Technician Booking via Team Trust Section')}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-lg flex items-center gap-2 min-h-[44px]"
            >
              <Phone className="w-4 h-4" />
              <span>Call for Service: 7249430043</span>
            </button>
          )}

          <a
            href="tel:7249430043"
            className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider transition border border-slate-700 flex items-center gap-2 min-h-[44px]"
          >
            <Building2 className="w-4 h-4 text-blue-400" />
            <span>Visit Dhantoli Store</span>
          </a>
        </div>
      </div>
    </section>
  );
};
