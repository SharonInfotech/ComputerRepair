import express from 'express';
import path from 'path';
import compression from 'compression';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// Handle paths safely across both CommonJS and ESM environments
const currentDir = typeof __dirname !== 'undefined' ? __dirname : process.cwd();

const app = express();
const PORT = 3000;

// Enable GZIP Compression for Express API & Static Files
app.use(compression());

app.use(express.json());

// Enable CORS & Security Headers for all requests
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-XSS-Protection', '1; mode=block');
  res.header('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Static image asset routes - handles both /src/assets/images/... and /assets/...
app.use('/src/assets/images', express.static(path.join(process.cwd(), 'src', 'assets', 'images')));
app.use('/src/assets', express.static(path.join(process.cwd(), 'src', 'assets')));
app.use('/assets', express.static(path.join(process.cwd(), 'public', 'assets')));
app.use('/assets', express.static(path.join(process.cwd(), 'src', 'assets', 'images')));
app.use(express.static(path.join(process.cwd(), 'public')));

// Initialize Gemini Client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// In-memory stored tickets for Sharon Infotech Nagpur
const repairTickets: Record<string, any> = {
  'FIX-1093': {
    ticketId: 'FIX-1093',
    customerName: 'Aarav Sharma (Dharampeth, Nagpur)',
    device: 'Apple MacBook Air M1 (2020)',
    issue: 'Liquid spill on keyboard, trackpad non-responsive',
    status: 'In Repair',
    statusStage: 3, // 1: Received, 2: Diagnosing, 3: In Repair, 4: Quality Testing, 5: Ready for Pickup
    technician: 'Senior Engineer (Sharon Infotech Nagpur)',
    receivedDate: '2026-07-22 10:30 AM',
    estimatedCompletion: '2026-07-24 05:00 PM',
    estimatedCost: '₹3,400 - ₹4,200',
    serviceType: 'Free Nagpur Doorstep Pickup',
    logs: [
      { timestamp: '2026-07-22 10:30 AM', text: 'Device picked up from Dharampeth, Nagpur by Sharon Infotech rider.' },
      { timestamp: '2026-07-22 02:15 PM', text: 'Ultrasonic board cleaning completed. No trace corrosion found.' },
      { timestamp: '2026-07-23 11:00 AM', text: 'Replacement OEM Keyboard and Flex cable installed.' },
      { timestamp: '2026-07-23 04:30 PM', text: 'Currently undergoing 12-point thermal stress test.' }
    ]
  },
  'FIX-4402': {
    ticketId: 'FIX-4402',
    customerName: 'Priya Patel (Sitabuldi, Nagpur)',
    device: 'Dell XPS 15 9500',
    issue: 'Screen flicker & NVMe SSD upgrade to 1TB',
    status: 'Ready for Pickup',
    statusStage: 5,
    technician: 'Sharon Infotech Repair Lab',
    receivedDate: '2026-07-21 03:00 PM',
    estimatedCompletion: '2026-07-23 02:00 PM',
    estimatedCost: '₹5,800',
    serviceType: 'Nagpur Doorstep Delivery',
    logs: [
      { timestamp: '2026-07-21 03:00 PM', text: 'Laptop picked up from Sitabuldi, Nagpur.' },
      { timestamp: '2026-07-21 06:00 PM', text: 'Display EDP flex cable tightened & original Samsung 1TB NVMe cloned.' },
      { timestamp: '2026-07-22 01:00 PM', text: 'Full diagnostic pass. Cleaning & thermal re-pasting done.' },
      { timestamp: '2026-07-23 10:00 AM', text: 'Packed & ready for doorstep delivery.' }
    ]
  },
  'FIX-8812': {
    ticketId: 'FIX-8812',
    customerName: 'Sanjay Kumar (Manish Nagar, Nagpur)',
    device: 'HP Laserjet & Desktop PC',
    issue: 'Printer paper jam & Windows Blue screen error',
    status: 'Diagnosing',
    statusStage: 2,
    technician: 'Sharon Infotech On-Site Engineer',
    receivedDate: '2026-07-23 05:45 PM',
    estimatedCompletion: '2026-07-25 06:00 PM',
    estimatedCost: '₹1,200 - ₹2,500',
    serviceType: 'In-Store Shop Service',
    logs: [
      { timestamp: '2026-07-23 05:45 PM', text: 'Device received at Sharon Infotech Nagpur center.' },
      { timestamp: '2026-07-24 09:30 AM', text: 'Printer roller clean & RAM diagnostics underway.' }
    ]
  }
};

// API Routes
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', business: 'Sharon Infotech Nagpur', timestamp: new Date().toISOString() });
});

// Sitemap.xml & Connected Sub-Sitemaps Endpoint with caching
app.get(/^\/sitemap(-[a-z0-9-]+)?\.xml$/, (req, res) => {
  const fileName = req.path.replace(/^\//, '');
  const filePath = path.join(process.cwd(), 'public', fileName);
  res.header('Content-Type', 'application/xml; charset=utf-8');
  res.header('Cache-Control', 'public, max-age=3600, s-maxage=86400');
  res.sendFile(filePath);
});

// Robots.txt Endpoint with caching
app.get('/robots.txt', (_req, res) => {
  res.header('Content-Type', 'text/plain');
  res.header('Cache-Control', 'public, max-age=86400, s-maxage=604800');
  res.sendFile(path.join(process.cwd(), 'public', 'robots.txt'));
});

// LLMs.txt Discoverability Endpoint with caching
app.get('/llms.txt', (_req, res) => {
  res.header('Content-Type', 'text/plain; charset=utf-8');
  res.header('Cache-Control', 'public, max-age=86400, s-maxage=604800');
  res.sendFile(path.join(process.cwd(), 'public', 'llms.txt'));
});

// Security.txt Endpoints
const serveSecurityTxt = (_req: express.Request, res: express.Response) => {
  res.header('Content-Type', 'text/plain; charset=utf-8');
  res.header('Cache-Control', 'public, max-age=86400');
  res.sendFile(path.join(process.cwd(), 'public', 'security.txt'));
};
app.get('/security.txt', serveSecurityTxt);
app.get('/.well-known/security.txt', serveSecurityTxt);

// Web Vitals Logging Endpoint
app.post('/api/vitals', (req, res) => {
  const { name, value, rating, id } = req.body;
  if (name) {
    console.log(`[Web Vitals Audit] ${name}: ${value} (${rating}) - ID: ${id}`);
  }
  res.status(200).json({ status: 'recorded' });
});

// AI Diagnostic Endpoint with Google Search Grounding
app.post('/api/diagnose', async (req, res) => {
  try {
    const { deviceType, brand, operatingSystem, symptoms, userDescription } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        probableCause: `Hardware/Software issue detected on ${brand || ''} ${deviceType || 'Laptop'}`,
        severity: symptoms?.some((s: string) => s.toLowerCase().includes('liquid') || s.toLowerCase().includes('power') || s.toLowerCase().includes('blue screen')) ? 'Critical' : 'Medium',
        repairUrgency: 'Recommended within 24-48 hours at Sharon Infotech Dhantoli HQ, Nagpur.',
        estimatedPartsNeeded: ['Thermal paste repasting', 'Component voltage check', 'OS Driver / Firmware setup'],
        estimatedPriceRange: { min: 499, max: 2200, currency: '₹' },
        estimatedTimeHours: '2 to 5 hours',
        diagnosticSteps: [
          'Disconnect power adapter immediately if liquid or power issue is involved.',
          'Hold power button for 30 seconds for embedded controller reset.',
          'Boot in Safe Mode to check software vs hardware fault.',
          'Contact Sharon Infotech Dhantoli HQ at 7249430043 for free doorstep pickup in Nagpur.'
        ],
        preventativeTips: [
          'Maintain ventilation clearance under laptop vents in Nagpur heat.',
          'Never place laptops directly on soft beds or blankets.',
          'Keep backups on external hard drives or cloud storage.'
        ],
        expertAdvice: 'Sharon Infotech engineers offer free diagnosis at our Panchasheel Square, Dhantoli store before taking up any repair work.',
        aiGenerated: false,
        searchSources: [
          { title: 'Sharon Infotech Official Main Portal', uri: 'https://sharoninfotech.com' },
          { title: 'Sharon Infotech Verified Google Maps Store (Dhantoli HQ)', uri: 'https://maps.app.goo.gl/wwuRxErEFDjFEqTL6' }
        ]
      });
    }

    const prompt = `
You are a senior hardware diagnostic engineer at "Sharon Infotech" (Parent Organization: https://sharoninfotech.com) - Nagpur's #1 computer, laptop, printer, CCTV & networking service center located exclusively at Office No 1, Second Floor, Tilak, Panchasheel Square, near Panchasheel Theatre, Opposite Patrakar Bhawan, Dhantoli, Nagpur 440012 (Google Maps: https://maps.app.goo.gl/wwuRxErEFDjFEqTL6, contact: +91-7249430043).
Use Google Search grounding to check current OEM spare part price ranges in India and known hardware/driver issues for the following customer device, and provide a structured JSON response tailored for a customer in Nagpur.

Device Details:
- Device Type: ${deviceType || 'Laptop'}
- Brand/Model: ${brand || 'Generic'}
- OS: ${operatingSystem || 'Windows 11'}
- Selected Symptoms: ${Array.isArray(symptoms) ? symptoms.join(', ') : symptoms || 'None selected'}
- Customer Description: "${userDescription || 'Computer having hardware or performance issues.'}"

Respond strictly in valid JSON format matching this schema:
{
  "probableCause": "Detailed concise technical analysis of what component or software bug is causing this issue",
  "severity": "Low" | "Medium" | "Critical",
  "repairUrgency": "Recommended timeline (e.g. Immediate / Within 24 hours / Optional upgrade)",
  "estimatedPartsNeeded": ["List of likely components e.g. NVMe SSD, Display flex, PWM IC, Battery, Thermal Paste"],
  "estimatedPriceRange": { "min": number_in_inr, "max": number_in_inr, "currency": "₹" },
  "estimatedTimeHours": "e.g. 2-4 hours or same day",
  "diagnosticSteps": ["Step 1 customer can safely try", "Step 2", "Step 3"],
  "preventativeTips": ["Tip 1 to avoid future failure", "Tip 2"],
  "expertAdvice": "Warm friendly advice from Sharon Infotech technician at Dhantoli HQ, Nagpur"
}
`;

    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: 'application/json'
        }
      });
    } catch {
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: 'application/json'
        }
      });
    }

    const resultText = response.text || '{}';
    const cleanedJson = resultText.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
    const parsedData = JSON.parse(cleanedJson);

    // Extract Google Search Grounding URLs
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const searchSources: Array<{ title: string; uri: string }> = [];
    for (const chunk of chunks as any[]) {
      if (chunk?.web?.uri) {
        searchSources.push({
          title: chunk.web.title || chunk.web.uri,
          uri: chunk.web.uri
        });
      }
    }

    res.json({
      ...parsedData,
      aiGenerated: true,
      searchSources: searchSources.length > 0 ? searchSources : [
        { title: 'Sharon Infotech Official Main Website', uri: 'https://sharoninfotech.com' },
        { title: 'Sharon Infotech Dhantoli HQ Google Maps', uri: 'https://maps.app.goo.gl/wwuRxErEFDjFEqTL6' }
      ]
    });
  } catch (error: any) {
    console.error('Error in /api/diagnose:', error);
    res.status(200).json({
      probableCause: 'Common hardware or power delivery malfunction detected.',
      severity: 'Medium',
      repairUrgency: 'Contact Sharon Infotech Dhantoli HQ (+91 7249430043) for physical inspection.',
      estimatedPartsNeeded: ['Internal diagnostic & thermal re-application'],
      estimatedPriceRange: { min: 499, max: 2000, currency: '₹' },
      estimatedTimeHours: '3-6 hours',
      diagnosticSteps: [
        'Perform soft reset',
        'Check power adapter LED',
        'Call Sharon Infotech at 7249430043 for free doorstep pickup in Nagpur'
      ],
      preventativeTips: ['Always shut down cleanly before closing laptop lid'],
      aiGenerated: false,
      searchSources: [
        { title: 'Sharon Infotech Official Main Website', uri: 'https://sharoninfotech.com' },
        { title: 'Sharon Infotech Verified Google Maps Store', uri: 'https://maps.app.goo.gl/wwuRxErEFDjFEqTL6' }
      ]
    });
  }
});

// Google Maps Grounding Endpoint for Single Authorised Store (Dhantoli HQ, Nagpur 440012)
app.post('/api/maps-grounding', async (req, res) => {
  const { query, latitude, longitude } = req.body || {};
  const userLat = typeof latitude === 'number' ? latitude : 21.1378;
  const userLng = typeof longitude === 'number' ? longitude : 79.0789;
  const userQuery = query || 'Directions and nearby landmarks for Sharon Infotech, Panchasheel Square, Dhantoli, Nagpur 440012';

  const defaultPlaces = [
    {
      title: 'Sharon Infotech - Official Dhantoli HQ Store (Google Maps)',
      uri: 'https://maps.app.goo.gl/wwuRxErEFDjFEqTL6',
      reviewSnippets: [
        'Single official repair lab at Office No 1, 2nd Floor, Tilak, Panchasheel Square, near Panchasheel Theatre, Opposite Patrakar Bhawan, Dhantoli, Nagpur 440012.'
      ]
    }
  ];

  try {
    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        answer: `**Sharon Infotech** operates from a **single official physical store & chip-level repair lab** in Nagpur:\n\n- **Store Address:** Office No 1, Second Floor, Tilak, Panchasheel Square, near Panchasheel Theatre, Opposite Patrakar Bhawan, Dhantoli, Nagpur, Maharashtra 440012\n- **Official Google Maps Link:** https://maps.app.goo.gl/wwuRxErEFDjFEqTL6\n- **Key Landmarks:** Located right at Panchasheel Square, opposite Patrakar Bhawan & next to Panchasheel Cinema (5 mins walk from Sitabuldi / Rahate Colony Metro Station).\n- **Doorstep Pickup:** Free 30-minute pickup & delivery across all 220+ Nagpur localities (Phone: +91-7249430043).`,
        places: defaultPlaces,
        grounded: false
      });
    }

    const mapsPrompt = `
You are the official location & route assistant for "Sharon Infotech" (Parent Organization: https://sharoninfotech.com, Local Portal: https://computerrepairnagpur.com).
CRITICAL POLICY RULE: Sharon Infotech has ONLY ONE physical store and repair lab in Nagpur located at:
"Office No 1, Second Floor, Tilak, Panchasheel Square, near Panchasheel Theatre, Opposite Patrakar Bhawan, Dhantoli, Nagpur, Maharashtra 440012"
Authorised Google Maps URL: https://maps.app.goo.gl/wwuRxErEFDjFEqTL6
Phone: +91-7249430043.
Never invent or mention any secondary branch address. All other Nagpur localities are served via 30-minute free doorstep pickup dispatched from our Dhantoli HQ.

Customer Question / Starting Area in Nagpur: "${userQuery}"
Provide helpful, accurate directions, nearby landmarks around Panchasheel Square / Dhantoli, estimated travel time, and doorstep pickup availability in concise Markdown.
`;

    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: mapsPrompt,
        config: {
          tools: [{ googleMaps: {} }],
          toolConfig: {
            retrievalConfig: {
              latLng: {
                latitude: userLat,
                longitude: userLng
              }
            }
          }
        }
      });
    } catch {
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: mapsPrompt,
        config: {
          tools: [{ googleMaps: {} }],
          toolConfig: {
            retrievalConfig: {
              latLng: {
                latitude: userLat,
                longitude: userLng
              }
            }
          }
        }
      });
    }

    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const extractedPlaces: Array<{ title: string; uri: string; reviewSnippets?: string[] }> = [
      ...defaultPlaces
    ];

    for (const chunk of chunks as any[]) {
      if (chunk?.maps?.uri) {
        const snippets: string[] = [];
        const rawSnippets = chunk.maps?.placeAnswerSources?.reviewSnippets;
        if (Array.isArray(rawSnippets)) {
          for (const s of rawSnippets) {
            const text = typeof s === 'string' ? s : s?.text || s?.reviewText || '';
            if (text) snippets.push(text);
          }
        }
        extractedPlaces.push({
          title: chunk.maps.title || 'Google Maps Place Link',
          uri: chunk.maps.uri,
          reviewSnippets: snippets.length > 0 ? snippets : undefined
        });
      }
    }

    res.json({
      answer: response.text || 'Visit our single official store at Office No 1, 2nd Floor, Tilak, Panchasheel Square, Dhantoli, Nagpur 440012.',
      places: extractedPlaces,
      grounded: true
    });
  } catch (error) {
    console.error('Error in /api/maps-grounding:', error);
    res.status(200).json({
      answer: `**Sharon Infotech Single Official Store (Dhantoli HQ):**\n- **Address:** Office No 1, Second Floor, Tilak, Panchasheel Square, near Panchasheel Theatre, Opposite Patrakar Bhawan, Dhantoli, Nagpur, Maharashtra 440012\n- **Landmarks:** Opposite Patrakar Bhawan, near Panchasheel Cinema, 400m from Sitabuldi Metro Station.\n- **Official Google Maps Link:** https://maps.app.goo.gl/wwuRxErEFDjFEqTL6\n- **Free Doorstep Service:** Available in 30 mins across Nagpur (+91-7249430043).`,
      places: defaultPlaces,
      grounded: false
    });
  }
});

// Track repair status endpoint (handles both /api/track/:ticketId and /api/track?ticketId=...)
const handleTrackingRequest = (req: express.Request, res: express.Response) => {
  const ticketIdParam = req.params.ticketId || (req.query.ticketId as string) || (req.query.id as string) || 'FIX-1093';
  const ticketId = ticketIdParam.toUpperCase().trim();
  const ticket = repairTickets[ticketId];

  if (ticket) {
    return res.json({ found: true, ticket });
  }

  // Generate realistic dummy status
  const randomStage = Math.floor(Math.random() * 4) + 1;
  const stages = ['Received & Logged in Nagpur Lab', 'Under Diagnostic by Senior Engineer', 'Component Sourced / Micro-soldering In Progress', 'Quality Stress Testing Passed'];
  
  res.json({
    found: true,
    ticket: {
      ticketId: ticketId,
      customerName: 'Valued Customer (Nagpur)',
      device: 'Computer / Laptop / Printer Request',
      issue: 'Sharon Infotech Repair Inspection',
      status: stages[randomStage - 1],
      statusStage: randomStage,
      technician: 'Sharon Infotech Nagpur Certified Engineer',
      receivedDate: new Date(Date.now() - 86400000).toLocaleString(),
      estimatedCompletion: new Date(Date.now() + 86400000).toLocaleString(),
      estimatedCost: '₹499 - ₹2,500',
      serviceType: 'Sharon Infotech Nagpur Service',
      logs: [
        { timestamp: new Date(Date.now() - 86400000).toLocaleTimeString(), text: 'Ticket registered at Sharon Infotech Nagpur center.' },
        { timestamp: new Date(Date.now() - 43200000).toLocaleTimeString(), text: 'Primary voltage diagnostic & testing underway.' }
      ]
    }
  });
};

app.get('/api/track/:ticketId', handleTrackingRequest);
app.get('/api/track', handleTrackingRequest);

// Book repair request
app.post('/api/book', (req, res) => {
  const { name, phone, email, address, deviceType, brand, model, serviceMode, issueSummary, preferredDate, preferredTime } = req.body;

  if (!name || !phone || !deviceType) {
    return res.status(400).json({ error: 'Name, phone number, and device type are required.' });
  }

  const newId = `SHARON-${Math.floor(1000 + Math.random() * 9000)}`;
  const newTicket = {
    ticketId: newId,
    customerName: name,
    phone,
    email: email || 'N/A',
    address: address || 'Sharon Infotech Store Visit, Nagpur',
    device: `${brand || 'Generic'} ${model || ''} (${deviceType})`,
    issue: issueSummary || 'General Computer / Laptop / Printer Service',
    status: 'Booking Confirmed with Sharon Infotech',
    statusStage: 1,
    technician: 'Sharon Infotech Nagpur Service Desk (Contact 7249430043)',
    receivedDate: `${preferredDate || 'Today'} ${preferredTime || 'ASAP'}`,
    estimatedCompletion: 'Within 24 Hours of device receipt',
    estimatedCost: 'Confirmed after free inspection',
    serviceType: serviceMode === 'doorstep' ? 'Free Doorstep Pickup in Nagpur' : 'Store Visit Sharon Infotech',
    logs: [
      { timestamp: new Date().toLocaleString(), text: 'Repair ticket created. Sharon Infotech Nagpur desk notified.' }
    ]
  };

  repairTickets[newId] = newTicket;

  res.json({
    success: true,
    ticketId: newId,
    message: 'Repair booking successfully recorded at Sharon Infotech Nagpur!',
    ticket: newTicket
  });
});

// Serve frontend assets
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
