import { ALL_NAGPUR_LOCATIONS } from './nagpurLocations';

export type ServiceCategory =
  | 'Computer'
  | 'Laptop'
  | 'Printer'
  | 'CCTV'
  | 'Data Recovery'
  | 'Networking'
  | 'IT AMC';
export type ServiceAction = 'Repair' | 'Support' | 'Service' | 'Repair Center' | 'Support Center' | 'Service Center';

export interface GeneratedServicePage {
  id: string;
  category: ServiceCategory;
  action: ServiceAction;
  locationName: string;
  pincode: string;
  slug: string;
  title: string;
  h1Title: string;
  metaDescription: string;
  tagline: string;
  keywords: string[];
  startingPrice: string;
  avgTime: string;
  warranty: string;
  features: string[];
  description: string;
  faqList: { question: string; answer: string }[];
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  'Computer',
  'Laptop',
  'Printer',
  'CCTV',
  'Data Recovery',
  'Networking',
  'IT AMC'
];

export const SERVICE_ACTIONS: ServiceAction[] = [
  'Repair',
  'Support',
  'Service',
  'Repair Center',
  'Support Center',
  'Service Center'
];

// Helper to format category for headlines
function getCategoryHeadline(cat: ServiceCategory): string {
  switch (cat) {
    case 'Computer':
      return 'Desktop Computer & Workstation';
    case 'Laptop':
      return 'Laptop & Notebook Component';
    case 'Printer':
      return 'LaserJet, InkTank & All-in-One Printer';
    case 'CCTV':
      return 'HD IP CCTV Camera, Biometric & Security DVR';
    case 'Data Recovery':
      return 'Hard Drive, SSD & Pen Drive Data Recovery';
    case 'Networking':
      return 'LAN Cabling, Wi-Fi Mesh & Tally Multi-User Network';
    case 'IT AMC':
      return 'Corporate IT AMC, Smart Office & Biometric Automation';
  }
}

// Category-specific price
function getCategoryStartingPrice(cat: ServiceCategory): string {
  switch (cat) {
    case 'Printer':
      return '₹299';
    case 'Computer':
    case 'Laptop':
      return '₹499';
    case 'Networking':
      return '₹799';
    case 'CCTV':
      return '₹1,299';
    case 'IT AMC':
      return '₹1,499';
    case 'Data Recovery':
      return '₹1,999';
  }
}

// Category-specific avg repair time
function getCategoryAvgTime(cat: ServiceCategory): string {
  switch (cat) {
    case 'Printer':
      return '30 Mins to 2 Hours';
    case 'Computer':
      return '1 to 3 Hours';
    case 'Laptop':
    case 'Networking':
      return '2 to 4 Hours';
    case 'CCTV':
    case 'IT AMC':
      return 'Same Day On-Site Visit';
    case 'Data Recovery':
      return '24 to 48 Hours';
  }
}

// Category-specific features generator
function generateFeatures(cat: ServiceCategory, action: ServiceAction, locName: string): string[] {
  switch (cat) {
    case 'Computer':
      return [
        `Desktop CPU power SMPS supply replacement & testing in ${locName}`,
        `Motherboard IC chip-level micro-soldering & capacitor repair`,
        `High-speed DDR4 / DDR5 RAM & M.2 NVMe SSD speed upgrades`,
        `Genuine Windows 11 / 10, Office 365 & Quick Heal Total Security setup`,
        `Thermal paste application, dust cleaning & cooling fan fixes`,
        `Free doorstep pick-and-drop service across ${locName}, Nagpur`
      ];
    case 'Laptop':
      return [
        `Original Full HD / IPS laptop screen replacement in ${locName}`,
        `Motherboard short-circuit repair & liquid spill recovery`,
        `Laptop body fabrication, broken hinge welding & touchpad fixes`,
        `Genuine battery swap with 1-year written replacement warranty`,
        `Keyboard replacement for Dell, HP, Lenovo, Asus, Acer & MacBook`,
        `Same-day doorstep engineer visit available in ${locName}`
      ];
    case 'Printer':
      return [
        `Instant HP, Canon & Brother LaserJet toner cartridge refilling`,
        `Epson InkTank printhead thermal cleaning & nozzle unclogging`,
        `Paper pickup roller, Teflon sleeve & sensor replacement in ${locName}`,
        `Printer motherboard logic card & power board repair`,
        `Wireless Wi-Fi & LAN network printer setup for home & office`,
        `On-site doorstep printer checkup in ${locName}, Nagpur`
      ];
    case 'CCTV':
      return [
        `Hikvision, CP PLUS & Dahua HD CCTV camera installation in ${locName}`,
        `4MP / 5MP Night Vision IP Camera wiring & DVR/NVR configuration`,
        `Remote online live video viewing setup on Android & iPhone`,
        `Hard disk installation for continuous 24/7 recording`,
        `Biometric attendance, smart door locks & touch glass switch retrofit`,
        `Annual Maintenance Contracts (AMC) for shops & homes in ${locName}`
      ];
    case 'Data Recovery':
      return [
        `Dead & clicking hard drive mechanical head cleanroom recovery`,
        `Formatted partition & deleted file extraction for ${locName} clients`,
        `SSD controller firmware corruption & non-detectable drive repair`,
        `Water damaged, burnt, or dropped external hard disk recovery`,
        `Pen drive, SD card & ransomware corrupted file restoration`,
        `100% data privacy guarantee with strict NDA security protocol`
      ];
    case 'Networking':
      return [
        `Structured Cat6 Gigabit LAN cabling & server rack setup in ${locName}`,
        `Tally Prime Multi-User LAN synchronization & automated server backup`,
        `Enterprise Dual-Band Wi-Fi 6 mesh router & access point installation`,
        `Hardware firewall security, VPN & Quick Heal endpoint protection`,
        `Multi-PC file sharing & network printer configuration for offices`,
        `Same-day network troubleshooting engineer visit in ${locName}, Nagpur`
      ];
    case 'IT AMC':
      return [
        `Comprehensive Corporate IT Annual Maintenance Contracts (AMC) in ${locName}`,
        `Smart Home & Office Retrofit with Touch Glass Switches & Wi-Fi automation`,
        `Biometric fingerprint/face attendance & smart digital door lock setup`,
        `Preventative monthly PC, laptop, printer & server health audits`,
        `Genuine Windows 11 Pro, MS Office 365 & Quick Heal Total Security licensing`,
        `Priority 30-minute emergency on-site engineer response across ${locName}`
      ];
  }
}

// Category & Action Description generator
function generateDescription(cat: ServiceCategory, action: ServiceAction, locName: string, pincode: string): string {
  const catHeadline = getCategoryHeadline(cat);
  return `Sharon Infotech is Nagpur's top-rated ${cat} ${action} providing expert doorstep diagnostic and hardware repair solutions in ${locName} (Pincode: ${pincode}). Serving Nagpur since 2013 from our main hub at Panchasheel Square, Dhantoli, our certified technicians offer original spare parts, transparent upfront pricing, and a 90-day warranty on all ${catHeadline} fixes.\n\nWhether you need emergency on-site assistance in ${locName} or free pick-and-drop service for your ${cat}, our engineering team resolves complex issues within 2 to 4 hours. Call our official helpline at 7249430043 or book online for instant doorstep appointment in ${locName}, Nagpur.`;
}

// Generate FAQ list
function generateFaqs(cat: ServiceCategory, action: ServiceAction, locName: string) {
  return [
    {
      question: `How fast can Sharon Infotech technician reach my location in ${locName}?`,
      answer: `Our dedicated doorstep pickup engineers reach any home, office, or shop in ${locName}, Nagpur within 30 to 45 minutes of booking.`
    },
    {
      question: `What is the warranty provided on ${cat} ${action} in ${locName}?`,
      answer: `Sharon Infotech provides a 90-day written warranty on hardware repairs and up to 1-year warranty on original spare parts replacements in ${locName}.`
    },
    {
      question: `Can I get a cost estimate before starting the repair?`,
      answer: `Yes! We offer 100% free inspection and upfront transparent estimates before starting any work. No hidden charges.`
    }
  ];
}

// Generate 1000+ pages systematically
export function generateAllServicePages(): GeneratedServicePage[] {
  const pages: GeneratedServicePage[] = [];

  // 1. Generate base 30 combination templates across 220 locations in Nagpur = 6,600 combinations
  // We will map all locations cleanly to ensure over 1,000+ distinct pages exist in memory
  SERVICE_CATEGORIES.forEach((cat) => {
    SERVICE_ACTIONS.forEach((action) => {
      ALL_NAGPUR_LOCATIONS.forEach((loc) => {
        const termSlug = `${cat.toLowerCase().replace(/\s+/g, '-')}-${action.toLowerCase().replace(/\s+/g, '-')}-${loc.id}`;
        const title = `${cat} ${action} in ${loc.name}, Nagpur | Sharon Infotech`;
        const h1Title = `${cat} ${action} in ${loc.name}, Nagpur`;
        const metaDescription = `Looking for trusted ${cat} ${action} in ${loc.name}, Nagpur? Sharon Infotech provides certified doorstep pickup, original parts, 90-day warranty & free inspection. Call 7249430043.`;
        const tagline = `Certified doorstep ${cat.toLowerCase()} ${action.toLowerCase()} in ${loc.name} with original parts & 90-day written warranty.`;
        const keywords = [
          `${cat.toLowerCase()} ${action.toLowerCase()} ${loc.name.toLowerCase()} nagpur`,
          `${cat.toLowerCase()} ${action.toLowerCase()} near me ${loc.name.toLowerCase()}`,
          `best ${cat.toLowerCase()} ${action.toLowerCase()} ${loc.name.toLowerCase()}`,
          `sharon infotech ${cat.toLowerCase()} ${action.toLowerCase()}`,
          `${cat.toLowerCase()} service center in ${loc.name.toLowerCase()}`,
          `${loc.name.toLowerCase()} nagpur ${cat.toLowerCase()} repair`
        ];

        pages.push({
          id: termSlug,
          category: cat,
          action: action,
          locationName: loc.name,
          pincode: loc.pincode,
          slug: termSlug,
          title,
          h1Title,
          metaDescription,
          tagline,
          keywords,
          startingPrice: getCategoryStartingPrice(cat),
          avgTime: getCategoryAvgTime(cat),
          warranty: '90 Days Written Warranty',
          features: generateFeatures(cat, action, loc.name),
          description: generateDescription(cat, action, loc.name, loc.pincode),
          faqList: generateFaqs(cat, action, loc.name)
        });
      });
    });
  });

  return pages;
}

// Lazy cached instance of 1000+ pages
let cachedPages: GeneratedServicePage[] | null = null;

export function getServicePages(): GeneratedServicePage[] {
  if (!cachedPages) {
    cachedPages = generateAllServicePages();
  }
  return cachedPages;
}

// Search & Lookup helpers
const CORE_SLUG_ALIASES: Record<string, string> = {
  'computer-repair': 'computer-repair-center-dhantoli',
  'desktop-computer': 'computer-repair-center-dhantoli',
  'gaming-pc-build': 'computer-service-center-dhantoli',
  'custom-gaming-pc': 'computer-service-center-dhantoli',
  'power-smps-repair': 'computer-repair-dhantoli',
  'laptop-repair': 'laptop-repair-center-dhantoli',
  'motherboard-repair': 'laptop-repair-dhantoli',
  'motherboard-chip-repair': 'laptop-repair-dhantoli',
  'bga-chip-reballing': 'laptop-repair-dhantoli',
  'macbook-logic-board': 'laptop-service-center-dhantoli',
  'screen-replacement': 'laptop-service-dhantoli',
  'battery-replacement': 'laptop-support-dhantoli',
  'hinge-repair': 'laptop-repair-center-dhantoli',
  'keyboard-replacement': 'laptop-support-center-dhantoli',
  'ssd-upgrade': 'laptop-service-dhantoli',
  'ram-upgrade': 'computer-service-dhantoli',
  'thermal-paste-cleaning': 'laptop-service-dhantoli',
  'virus-removal': 'computer-support-dhantoli',
  'windows-os-installation': 'computer-support-center-dhantoli',
  'printer-repair': 'printer-repair-center-dhantoli',
  'toner-refilling': 'printer-service-dhantoli',
  'epson-head-cleaning': 'printer-repair-dhantoli',
  'cctv-installation': 'cctv-service-center-dhantoli',
  'data-recovery': 'data-recovery-service-center-dhantoli',
  'hard-drive-recovery': 'data-recovery-repair-center-dhantoli',
  'networking-amc': 'networking-service-center-dhantoli',
  'computer-networking': 'networking-service-center-dhantoli',
  'lan-networking': 'networking-service-dhantoli',
  'tally-multi-user-lan': 'networking-support-center-dhantoli',
  'it-support-amc': 'it-amc-service-center-dhantoli',
  'smart-home-automation': 'it-amc-support-center-dhantoli',
  'biometric-automation': 'it-amc-service-dhantoli'
};

export function findServicePageBySlug(slug: string): GeneratedServicePage | undefined {
  const pages = getServicePages();
  const normalized = slug.toLowerCase().trim();
  const targetSlug = CORE_SLUG_ALIASES[normalized] || normalized;
  return pages.find((p) => p.slug === targetSlug || p.id === targetSlug);
}

// Filter pages by category, action, locality or keyword
export function filterServicePages(params: {
  category?: string;
  action?: string;
  locationName?: string;
  searchQuery?: string;
  limit?: number;
}): GeneratedServicePage[] {
  const pages = getServicePages();
  let result = pages;

  if (params.category && params.category !== 'All') {
    result = result.filter((p) => p.category.toLowerCase() === params.category!.toLowerCase());
  }

  if (params.action && params.action !== 'All') {
    result = result.filter((p) => p.action.toLowerCase() === params.action!.toLowerCase());
  }

  if (params.locationName && params.locationName !== 'All') {
    result = result.filter((p) => p.locationName.toLowerCase().includes(params.locationName!.toLowerCase()));
  }

  if (params.searchQuery && params.searchQuery.trim()) {
    const q = params.searchQuery.toLowerCase().trim();
    result = result.filter((p) =>
      p.title.toLowerCase().includes(q) ||
      p.h1Title.toLowerCase().includes(q) ||
      p.keywords.some((k) => k.toLowerCase().includes(q)) ||
      p.locationName.toLowerCase().includes(q)
    );
  }

  if (params.limit && params.limit > 0) {
    return result.slice(0, params.limit);
  }

  return result;
}
