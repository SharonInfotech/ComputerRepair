import React, { useState, useEffect } from 'react';
import { ShieldCheck, Wrench, X, Phone, Clock, ArrowRight, CheckCircle2, Sparkles, Gift } from 'lucide-react';

interface ExitIntentModalProps {
  onClaimFreeDiagnostic: (prefillIssue?: string) => void;
}

export const ExitIntentModal: React.FC<ExitIntentModalProps> = ({ onClaimFreeDiagnostic }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    // Check if user has already seen or closed exit intent modal in this session
    const alreadyShown = sessionStorage.getItem('sharon_exit_intent_dismissed');
    if (alreadyShown) {
      setHasTriggered(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse moves near or above the top viewport boundary (e.g. closing tab or changing URL)
      if (e.clientY <= 15 && !hasTriggered) {
        setIsOpen(true);
        setHasTriggered(true);
        sessionStorage.setItem('sharon_exit_intent_dismissed', 'true');
      }
    };

    // Mobile fallback: trigger on visibilitychange (e.g. switching tabs) after 20 seconds on page
    let mobileTimer: NodeJS.Timeout;
    const handleVisibilityChange = () => {
      if (document.hidden && !hasTriggered) {
        // Prepare to show when user returns
        mobileTimer = setTimeout(() => {
          if (!hasTriggered) {
            setIsOpen(true);
            setHasTriggered(true);
            sessionStorage.setItem('sharon_exit_intent_dismissed', 'true');
          }
        }, 500);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (mobileTimer) clearTimeout(mobileTimer);
    };
  }, [hasTriggered]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('sharon_exit_intent_dismissed', 'true');
  };

  const handleClaim = () => {
    setIsOpen(false);
    onClaimFreeDiagnostic('Free Diagnostic Checkup Voucher (Exit Special)');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 to-slate-950 border border-blue-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-blue-500/20 text-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 rounded-full transition border border-slate-700/60"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-4">
          <Gift className="w-4 h-4 text-amber-400 animate-bounce" />
          <span>Exclusive Visitor Offer • Nagpur Only</span>
        </div>

        {/* Main Content */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-2">
          Wait! Don't Leave Without Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">FREE Diagnostic Checkup</span>
        </h2>
        <p className="text-slate-300 text-sm mb-6 leading-relaxed">
          Is your laptop or PC running slow, overheating, or dead? Get a complete hardware & software checkup worth <span className="line-through text-slate-500">₹499</span> at <strong className="text-emerald-400 font-extrabold">₹0 FREE</strong> in Nagpur today!
        </p>

        {/* Benefits List */}
        <div className="space-y-2.5 mb-6 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
          <div className="flex items-start gap-2.5 text-xs text-slate-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Zero Inspection Fee:</strong> Know the exact problem before paying anything.</span>
          </div>
          <div className="flex items-start gap-2.5 text-xs text-slate-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Free Doorstep Pickup:</strong> Dhantoli, Sitabuldi, Dharampeth & 220+ Nagpur localities.</span>
          </div>
          <div className="flex items-start gap-2.5 text-xs text-slate-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>90-Day Repair Warranty:</strong> Certified technician repair with genuine parts.</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleClaim}
            className="w-full sm:w-auto flex-1 py-3.5 px-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Claim Free Diagnostic Voucher</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="tel:+917249430043"
            className="w-full sm:w-auto py-3.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-sm rounded-xl border border-slate-700 transition flex items-center justify-center gap-2 shrink-0"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>Call Engineer</span>
          </a>
        </div>

        {/* Trust Footer */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-blue-400" /> 2-Hour Express Service
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% No-Fix No-Fee
          </span>
        </div>
      </div>
    </div>
  );
};
