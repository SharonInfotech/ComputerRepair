import { onLCP, onINP, onCLS, onFCP, onTTFB, Metric } from 'web-vitals';

/**
 * Monitors and measures Google Core Web Vitals (LCP, INP, CLS, FCP, TTFB)
 * for Google Search Console & CrUX (Chrome User Experience Report) optimization.
 */
export function initWebVitals(onPerfEntry?: (metric: Metric) => void) {
  const handler = onPerfEntry || ((metric: Metric) => {
    // Report to Google Analytics / GTM if available
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_category: 'Web Vitals',
        event_label: metric.id,
        non_interaction: true,
      });
    }

    // Send to /api/vitals endpoint
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      const body = JSON.stringify({
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        id: metric.id
      });
      navigator.sendBeacon('/api/vitals', new Blob([body], { type: 'application/json' }));
    }

    if (import.meta.env?.DEV) {
      console.log(`[Core Web Vital] ${metric.name}: ${metric.value.toFixed(2)} (${metric.rating})`);
    }
  });

  try {
    onLCP(handler);
    onINP(handler);
    onCLS(handler);
    onFCP(handler);
    onTTFB(handler);
  } catch (err) {
    console.debug('[Web Vitals] Observer initialization error:', err);
  }
}
