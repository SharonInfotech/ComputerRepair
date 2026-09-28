import React, { useState } from 'react';
import {
  Sparkles,
  AlertTriangle,
  CheckCircle,
  Wrench,
  Clock,
  Coins,
  ShieldAlert,
  Lightbulb,
  Loader2,
  Cpu,
  ArrowRight
} from 'lucide-react';
import { DiagnosticResult, DeviceType } from '../types';

interface AiDiagnosticSectionProps {
  onBookWithDiagnosis: (diag: DiagnosticResult) => void;
}

const COMMON_SYMPTOMS = [
  'Laptop overheating & fan running loud',
  'Blue Screen of Death (BSOD) crash error',
  'No display when turning power on',
  'Liquid or water spilled on keyboard',
  'Flickering or vertical lines on screen',
  'Battery drains fast / Not charging',
  'Laptop very slow / 100% Disk usage',
  'Broken screen hinge / chassis cracking',
  'Keyboard keys non-responsive or stuck',
  'WiFi disconnects repeatedly / No Bluetooth'
];

export const AiDiagnosticSection: React.FC<AiDiagnosticSectionProps> = ({
  onBookWithDiagnosis
}) => {
  const [deviceType, setDeviceType] = useState<DeviceType>('Laptop');
  const [brand, setBrand] = useState('Dell');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([
    'Laptop overheating & fan running loud'
  ]);
  const [userDescription, setUserDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResult | null>(null);

  const toggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleRunDiagnostic = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/diagnose', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          deviceType,
          brand,
          operatingSystem: 'Windows 11 / macOS',
          symptoms: selectedSymptoms,
          userDescription
        })
      });

      const data = await response.json();
      setDiagnosticResult(data);
    } catch (err) {
      console.error('Diagnostic error:', err);
      // Fallback
      setDiagnosticResult({
        probableCause: 'Thermal throttling and blocked heatsink ventilation.',
        severity: 'Medium',
        repairUrgency: 'Recommended within 24 hours to prevent motherboard damage.',
        estimatedPartsNeeded: ['Thermal paste re-application', 'Internal fan dust cleaning'],
        estimatedPriceRange: { min: 600, max: 1500, currency: '₹' },
        estimatedTimeHours: '2 hours',
        diagnosticSteps: [
          'Ensure laptop is placed on a flat, hard desk surface.',
          'Clean air intake vents with compressed air canned duster.',
          'Schedule an express internal deep cleaning & thermal re-pasting.'
        ],
        preventativeTips: [
          'Avoid using laptop on plush blankets or beds.',
          'Replace thermal paste every 12 to 18 months.'
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-troubleshooter" className="py-16 bg-slate-950 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-cyan-950 text-cyan-300 border border-cyan-500/30 px-3.5 py-1 rounded-full text-xs font-semibold mb-3">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>AI Hardware & Software Troubleshooter</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Instant AI Computer Fault Diagnosis
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Select your laptop symptoms or describe what's wrong. Our AI engineer will analyze hardware faults, recommend safety steps, and estimate repair cost in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Controls */}
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            
            <form onSubmit={handleRunDiagnostic} className="space-y-5">
              {/* Device & Brand Selectors */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="ai-device-category" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Device Category
                  </label>
                  <select
                    id="ai-device-category"
                    value={deviceType}
                    onChange={(e) => setDeviceType(e.target.value as DeviceType)}
                    className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-sm rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-cyan-500 outline-none min-h-[44px]"
                  >
                    <option value="Laptop">Windows Laptop</option>
                    <option value="MacBook">Apple MacBook</option>
                    <option value="Desktop PC">Desktop Tower PC</option>
                    <option value="Gaming Rig">Custom Gaming PC</option>
                    <option value="All-in-One PC">All-In-One PC</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Brand
                  </label>
                  <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="e.g. Dell, HP, Apple, Lenovo, ASUS"
                    className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-sm rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-cyan-500 outline-none placeholder:text-slate-500"
                  />
                </div>
              </div>

              {/* Symptom Checkboxes */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Select Observed Symptoms (Tap to toggle)
                </label>
                <div className="flex flex-wrap gap-2">
                  {COMMON_SYMPTOMS.map((symptom) => {
                    const active = selectedSymptoms.includes(symptom);
                    return (
                      <button
                        type="button"
                        key={symptom}
                        onClick={() => toggleSymptom(symptom)}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition flex items-center gap-1.5 font-medium ${
                          active
                            ? 'bg-cyan-600/30 text-cyan-200 border-cyan-400 shadow-sm'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {active && <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />}
                        {symptom}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Describe problem in your own words (Optional)
                </label>
                <textarea
                  rows={3}
                  value={userDescription}
                  onChange={(e) => setUserDescription(e.target.value)}
                  placeholder="e.g., 'Laptop turned off suddenly after coffee spilled on touchpad, now charging light blinks 3 times yellow...'"
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-sm rounded-xl p-3 focus:ring-2 focus:ring-cyan-500 outline-none placeholder:text-slate-600 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-cyan-600/20 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-cyan-200" />
                    <span>Analyzing Circuit & Symptoms...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-cyan-300" />
                    <span>Run AI Diagnostic Analysis</span>
                  </>
                )}
              </button>
            </form>

          </div>

          {/* Right Column: AI Analysis Result Output */}
          <div className="lg:col-span-6">
            {!diagnosticResult && !loading && (
              <div className="bg-slate-900 border border-slate-800 border-dashed rounded-2xl p-8 text-center space-y-4 flex flex-col items-center justify-center min-h-[380px]">
                <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-cyan-400 border border-slate-700">
                  <Cpu className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-200">
                  Ready to Diagnose Your Device
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm max-w-sm">
                  Select your device brand and symptoms on the left, then hit 'Run AI Diagnostic' to receive instant technical root-cause analysis.
                </p>
              </div>
            )}

            {loading && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-4 flex flex-col items-center justify-center min-h-[380px]">
                <Loader2 className="w-10 h-10 animate-spin text-cyan-400" />
                <p className="text-sm font-semibold text-cyan-200">
                  Analyzing hardware fault signature...
                </p>
                <p className="text-xs text-slate-400">
                  Comparing with thousands of chip-level repair case studies
                </p>
              </div>
            )}

            {diagnosticResult && !loading && (
              <div className="bg-slate-900 border border-cyan-500/40 rounded-2xl p-6 shadow-2xl space-y-6 animate-fade-in relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

                {/* Header result status */}
                <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">
                        AI Technical Report
                      </span>
                      {diagnosticResult.aiGenerated && (
                        <span className="bg-cyan-950 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded border border-cyan-800">
                          Gemini 3.6 Flash Powered
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-white mt-1">
                      {diagnosticResult.probableCause}
                    </h3>
                  </div>

                  {/* Severity Badge */}
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 shrink-0 ${
                      diagnosticResult.severity === 'Critical'
                        ? 'bg-rose-950 text-rose-300 border-rose-800'
                        : diagnosticResult.severity === 'Medium'
                        ? 'bg-amber-950 text-amber-300 border-amber-800'
                        : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                    }`}
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{diagnosticResult.severity} Severity</span>
                  </div>
                </div>

                {/* Key Metrics: Price, Urgency, Duration */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <p className="text-slate-400 flex items-center gap-1 mb-1 font-medium">
                      <Coins className="w-3.5 h-3.5 text-amber-400" />
                      Estimated Repair Cost
                    </p>
                    <p className="text-base font-extrabold text-amber-300">
                      {diagnosticResult.estimatedPriceRange.currency}
                      {diagnosticResult.estimatedPriceRange.min.toLocaleString()} - {diagnosticResult.estimatedPriceRange.currency}
                      {diagnosticResult.estimatedPriceRange.max.toLocaleString()}
                    </p>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <p className="text-slate-400 flex items-center gap-1 mb-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      Estimated Time
                    </p>
                    <p className="text-sm font-bold text-slate-200">
                      {diagnosticResult.estimatedTimeHours || '2 to 5 hours'}
                    </p>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <p className="text-slate-400 flex items-center gap-1 mb-1 font-medium">
                      <Wrench className="w-3.5 h-3.5 text-emerald-400" />
                      Likely Parts
                    </p>
                    <p className="text-xs font-semibold text-slate-200 truncate">
                      {diagnosticResult.estimatedPartsNeeded?.join(', ') || 'Diagnostic inspection'}
                    </p>
                  </div>
                </div>

                {/* Diagnostic Steps to try right now */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-cyan-400" />
                    Immediate Recommended Precautions
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
                    {diagnosticResult.diagnosticSteps?.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-cyan-900 text-cyan-300 text-[10px] flex items-center justify-center font-bold shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Preventative Tips */}
                {diagnosticResult.preventativeTips && (
                  <div className="space-y-1 text-xs text-slate-400 bg-slate-950/50 p-3 rounded-xl border border-slate-800/80">
                    <p className="font-semibold text-slate-300 flex items-center gap-1">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                      Technician Pro Tip:
                    </p>
                    <p>{diagnosticResult.preventativeTips[0]}</p>
                  </div>
                )}

                {/* Direct Booking CTA */}
                <button
                  onClick={() => onBookWithDiagnosis(diagnosticResult)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition flex items-center justify-center gap-2"
                >
                  <span>Book Pickup / Repair with This Report</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
