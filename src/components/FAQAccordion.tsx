import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, PhoneCall, MessageSquare, Phone, Sparkles } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQAccordionProps {
  title: string;
  subtitle?: string;
  faqs: FAQItem[];
  phone?: string;
  ctaTitle?: string;
  ctaSubtitle?: string;
  className?: string;
  onBookClick?: () => void;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  title,
  subtitle,
  faqs,
  phone = '7249430043',
  ctaTitle = 'Need Doorstep Computer or Laptop Repair?',
  ctaSubtitle = 'Get certified technician visit at your doorstep anywhere in Nagpur within 30 minutes.',
  className = '',
  onBookClick
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setExpandedIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* FAQ Header & Accordion Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              Frequently Asked Questions
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs text-slate-400 leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          <a
            href={`tel:${phone}`}
            aria-label={`Call FAQ Desk at ${phone}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold text-emerald-400 bg-emerald-950/90 border border-emerald-800/80 hover:bg-emerald-900 transition shrink-0 self-start sm:self-auto min-h-[44px]"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>Call FAQ Desk: {phone}</span>
          </a>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = expandedIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition overflow-hidden ${
                  isOpen
                    ? 'bg-slate-950/90 border-amber-500/60 shadow-lg'
                    : 'bg-slate-950/60 border-slate-800/90 hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => toggleIndex(idx)}
                  aria-expanded={isOpen}
                  aria-label={`Toggle answer for: ${faq.question}`}
                  className="w-full text-left p-4 text-xs sm:text-sm font-bold text-white flex items-center justify-between gap-3 hover:bg-slate-900/60 transition min-h-[44px]"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-mono font-black flex items-center justify-center shrink-0">
                      Q{idx + 1}
                    </span>
                    <span className="leading-snug">{faq.question}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-300 border-t border-slate-900/80 space-y-3 bg-slate-900/30">
                    <p className="leading-relaxed">{faq.answer}</p>
                    <div className="pt-1 flex flex-wrap items-center gap-3 border-t border-slate-800/60 text-[11px]">
                      <a
                        href={`tel:${phone}`}
                        className="font-extrabold text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        <PhoneCall className="w-3 h-3" />
                        <span>Call {phone} for immediate assistance</span>
                      </a>
                      <a
                        href={`https://wa.me/91${phone}?text=${encodeURIComponent(`Hi Sharon Infotech, regarding: ${faq.question}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-slate-400 hover:text-emerald-300 flex items-center gap-1"
                      >
                        <MessageSquare className="w-3 h-3 text-emerald-400" />
                        <span>WhatsApp Quick Help</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Call To Action (CTA) Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/80 to-emerald-950 border-2 border-amber-500/60 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="space-y-1.5 max-w-2xl">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-emerald-500 text-slate-950 font-black text-[10px] uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            30-Minute Doorstep Tech Callout in Nagpur
          </span>
          <h3 className="text-lg sm:text-2xl font-black text-white">
            {ctaTitle}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {ctaSubtitle} Contact Sharon Infotech at <strong className="text-emerald-400 font-mono">{phone}</strong> for free diagnostic phone advice or doorstep technician booking.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto shrink-0">
          <a
            href={`tel:${phone}`}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 transition"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call {phone}</span>
          </a>

          <a
            href={`https://wa.me/91${phone}?text=Hi%20Sharon%20Infotech,%20I%20need%20doorstep%20laptop/computer%20service`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-emerald-400 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-emerald-500/40 transition"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp {phone}</span>
          </a>

          {onBookClick && (
            <button
              onClick={onBookClick}
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition"
            >
              Book Online
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
