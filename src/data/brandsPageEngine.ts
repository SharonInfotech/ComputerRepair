import { ALL_NAGPUR_LOCATIONS } from './nagpurLocations';

export type BrandName =
  | 'Acer'
  | 'Acer Predator'
  | 'Alienware'
  | 'Apple'
  | 'Asus'
  | 'ZenBook'
  | 'VivoBook'
  | 'JioBook'
  | 'MacBook'
  | 'Asus ROG'
  | 'Compaq'
  | 'Dell'
  | 'Dell Inspiron'
  | 'Dell Latitude'
  | 'Fujitsu'
  | 'HP'
  | 'HP ProBook'
  | 'Gateway'
  | 'Chromebook'
  | 'Huawei'
  | 'Lenovo'
  | 'Lenovo Ideapad'
  | 'Lenovo ThinkPad'
  | 'Lenovo Legion'
  | 'Microsoft Surface'
  | 'Microsoft'
  | 'MSI'
  | 'MSI Gaming'
  | 'Samsung'
  | 'Sony'
  | 'Sony Vaio'
  | 'Toshiba'
  | 'Toshiba Satellite'
  | 'LG'
  | 'Gigabyte'
  | 'Razer'
  | 'Avita'
  | 'AsusBook';

export type BrandAction =
  | 'Repair'
  | 'Support'
  | 'Service'
  | 'Repair Center'
  | 'Support Center'
  | 'Service Center'
  | 'Customer Care'
  | 'Customer Service';

export interface GeneratedBrandPage {
  id: string;
  brand: BrandName;
  action: BrandAction;
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
  popularModels: string[];
  features: string[];
  description: string;
  faqList: { question: string; answer: string }[];
}

export const BRAND_LIST: BrandName[] = [
  'Acer',
  'Acer Predator',
  'Alienware',
  'Apple',
  'Asus',
  'ZenBook',
  'VivoBook',
  'JioBook',
  'MacBook',
  'Asus ROG',
  'Compaq',
  'Dell',
  'Dell Inspiron',
  'Dell Latitude',
  'Fujitsu',
  'HP',
  'HP ProBook',
  'Gateway',
  'Chromebook',
  'Huawei',
  'Lenovo',
  'Lenovo Ideapad',
  'Lenovo ThinkPad',
  'Lenovo Legion',
  'Microsoft Surface',
  'MSI',
  'MSI Gaming',
  'Samsung',
  'Sony',
  'Sony Vaio',
  'Toshiba',
  'Toshiba Satellite'
];

export const BRAND_ACTIONS: BrandAction[] = [
  'Repair',
  'Support',
  'Service',
  'Repair Center',
  'Support Center',
  'Service Center',
  'Customer Care',
  'Customer Service'
];

// Helper to get popular models for each brand
function getBrandModels(brand: BrandName): string[] {
  switch (brand) {
    case 'HP':
      return ['Pavilion 14/15', 'Victus Gaming', 'Omen 16', 'Envy x360', 'ProBook', 'EliteBook'];
    case 'Dell':
      return ['Inspiron 15/14', 'Vostro 3500', 'XPS 13/15', 'Latitude', 'G15 Gaming', 'Alienware'];
    case 'Lenovo':
      return ['IdeaPad Slim 3/5', 'ThinkPad E14/T14', 'Legion 5 Pro', 'Yoga 7i', 'V15 Laptop'];
    case 'Acer':
      return ['Aspire 3/5/7', 'Nitro 5 / Nitro 16', 'Predator Helios', 'Swift 3/5', 'TravelMate'];
    case 'Asus':
      return ['TUF Gaming F15', 'ROG Strix', 'Vivobook 14/15', 'ZenBook Duo', 'ExpertBook'];
    case 'MacBook':
    case 'Apple':
      return ['MacBook Air M1/M2/M3', 'MacBook Pro 13/14/16', 'iMac 24"', 'Mac mini', 'Mac Studio'];
    case 'MSI':
      return ['Katana GF63', 'Thin GF63', 'Modern 14/15', 'Bravo 15', 'Stealth 16', 'Raider GE78'];
    case 'Samsung':
      return ['Galaxy Book2', 'Galaxy Book3 Pro', 'Galaxy Book4 Ultra', 'Samsung ATIV Book'];
    case 'Microsoft':
      return ['Surface Pro 7/8/9', 'Surface Laptop 4/5/6', 'Surface Go 3', 'Surface Studio'];
    case 'LG':
      return ['LG Gram 14/16/17', 'LG Gram Style', 'LG UltraPC', 'LG Gram 2-in-1'];
    case 'Alienware':
      return ['Alienware m15 R7', 'Alienware m18', 'Alienware x14/x16', 'Alienware Aurora Desktop'];
    case 'Toshiba':
      return ['Dynabook Satellite', 'Portégé', 'Tecra', 'Qosmio Gaming'];
    case 'Sony':
      return ['Sony VAIO E Series', 'VAIO Fit 15', 'VAIO Flip 2-in-1', 'VAIO Z Canvas'];
    case 'Gigabyte':
      return ['Gigabyte G5 Gaming', 'AORUS 15/17', 'AERO 14/16 OLED', 'G5 KF/KF5'];
    case 'Compaq':
      return ['Compaq Presario CQ40/CQ42/CQ56', 'Compaq 15', 'Compaq Mini Netbook'];
    case 'Fujitsu':
      return ['LIFEBOOK U9311', 'LIFEBOOK E5411', 'Celsius Mobile Workstation'];
    case 'AsusBook':
      return ['AsusBook Flip 14', 'AsusBook Go 15', 'AsusBook OLED Series'];
    case 'JioBook':
      return ['JioBook 11 (2023)', 'JioBook 4G Laptop', 'JioBook NB1112SD'];
    case 'Razer':
      return ['Razer Blade 14', 'Razer Blade 15', 'Razer Blade 16/18', 'Razer Blade Stealth'];
    case 'Avita':
      return ['Avita Liber V14', 'Avita Essential 14', 'Avita Pura 14', 'Avita Admiror'];
    default:
      return ['Pro Series', 'Ultra Laptop', 'Gaming Edition', 'Business Series'];
  }
}

function getBrandPrice(brand: BrandName): string {
  if (brand === 'Apple' || brand === 'MacBook' || brand === 'Alienware' || brand === 'Razer') {
    return '₹999';
  }
  return '₹499';
}

function generateBrandFeatures(brand: BrandName, action: BrandAction, locName: string): string[] {
  return [
    `Original 100% genuine ${brand} replacement parts & accessories in ${locName}`,
    `Certified chip-level motherboard logic repair for all ${brand} laptops`,
    `Same-day screen, battery, keyboard & power DC jack replacement`,
    `Genuine Windows, MacOS & BIOS firmware flashing with data backup`,
    `Thermal heatsink cleaning, dust removal & fan noise silencing`,
    `Doorstep pickup & on-site technician service across ${locName}, Nagpur`
  ];
}

function generateBrandDescription(brand: BrandName, action: BrandAction, locName: string, pincode: string): string {
  return `Sharon Infotech is Nagpur's top multi-brand laptop and desktop hardware service facility, offering expert ${brand} ${action} solutions in ${locName} (Pincode: ${pincode}). Operating since 2013 from our main hub at Panchasheel Square, Dhantoli, our certified technicians specialize in chip-level motherboard repair, liquid spill recovery, screen replacement, and battery swap for all ${brand} series.\n\nWhether you need immediate doorstep pickup in ${locName} or in-store diagnosis, we guarantee original OEM spare parts, upfront pricing, and a 90-day written warranty on all hardware repairs. Call our official hotline at 7249430043 to schedule an instant technician visit in ${locName}, Nagpur.`;
}

function generateBrandFaqs(brand: BrandName, action: BrandAction, locName: string) {
  return [
    {
      question: `Is Sharon Infotech an authorized or certified multi-brand service provider for ${brand} in ${locName}?`,
      answer: `Sharon Infotech is a leading independent multi-brand hardware repair center providing genuine OEM replacement parts, original batteries, and 90-day warranty for ${brand} devices in ${locName}, Nagpur.`
    },
    {
      question: `How quickly can I get my ${brand} laptop repaired in ${locName}?`,
      answer: `Minor repairs like screen swap, RAM/SSD upgrade, or battery replacement take only 30 to 60 minutes. Chip-level motherboard fixes are completed within 2 to 4 hours in ${locName}.`
    },
    {
      question: `Do you provide doorstep pickup and drop for ${brand} devices in ${locName}?`,
      answer: `Yes! Our mobile service engineers provide free doorstep pickup and drop across all addresses in ${locName}, Nagpur.`
    }
  ];
}

export function generateAllBrandPages(): GeneratedBrandPage[] {
  const pages: GeneratedBrandPage[] = [];

  // 21 Brands x 8 Actions x 220 Localities = 36,960 generated pages
  BRAND_LIST.forEach((brand) => {
    BRAND_ACTIONS.forEach((action) => {
      ALL_NAGPUR_LOCATIONS.forEach((loc) => {
        const slug = `${brand.toLowerCase().replace(/[^a-z0-0]/g, '')}-${action.toLowerCase().replace(/\s+/g, '-')}-${loc.id}`;
        const title = `${brand} ${action} in ${loc.name}, Nagpur | Sharon Infotech`;
        const h1Title = `${brand} ${action} in ${loc.name}, Nagpur`;
        const metaDescription = `Looking for trusted ${brand} ${action} in ${loc.name}, Nagpur? Sharon Infotech provides certified doorstep repair, original ${brand} spare parts, 90-day warranty & free checkup. Call 7249430043.`;
        const tagline = `Certified doorstep ${brand} ${action.toLowerCase()} in ${loc.name} with original OEM spare parts & 90-day written warranty.`;
        const keywords = [
          `${brand.toLowerCase()} ${action.toLowerCase()} ${loc.name.toLowerCase()} nagpur`,
          `${brand.toLowerCase()} ${action.toLowerCase()} near me ${loc.name.toLowerCase()}`,
          `${brand.toLowerCase()} service center in ${loc.name.toLowerCase()}`,
          `best ${brand.toLowerCase()} repair center ${loc.name.toLowerCase()}`,
          `${brand.toLowerCase()} customer care number ${loc.name.toLowerCase()} nagpur`,
          `sharon infotech ${brand.toLowerCase()} ${action.toLowerCase()}`
        ];

        pages.push({
          id: slug,
          brand,
          action,
          locationName: loc.name,
          pincode: loc.pincode,
          slug,
          title,
          h1Title,
          metaDescription,
          tagline,
          keywords,
          startingPrice: getBrandPrice(brand),
          avgTime: '30 Mins to 3 Hours',
          warranty: '90 Days Written Warranty',
          popularModels: getBrandModels(brand),
          features: generateBrandFeatures(brand, action, loc.name),
          description: generateBrandDescription(brand, action, loc.name, loc.pincode),
          faqList: generateBrandFaqs(brand, action, loc.name)
        });
      });
    });
  });

  return pages;
}

let cachedBrandPages: GeneratedBrandPage[] | null = null;

export function getBrandPages(): GeneratedBrandPage[] {
  if (!cachedBrandPages) {
    cachedBrandPages = generateAllBrandPages();
  }
  return cachedBrandPages;
}

export function findBrandPageBySlug(slug: string): GeneratedBrandPage | undefined {
  const pages = getBrandPages();
  const normalized = slug.toLowerCase().trim();
  return pages.find((p) => p.slug === normalized || p.id === normalized);
}

export function filterBrandPages(params: {
  brand?: string;
  action?: string;
  locationName?: string;
  searchQuery?: string;
  limit?: number;
}): GeneratedBrandPage[] {
  const pages = getBrandPages();
  let result = pages;

  if (params.brand && params.brand !== 'All') {
    result = result.filter((p) => p.brand.toLowerCase() === params.brand!.toLowerCase());
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
      p.locationName.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q)
    );
  }

  if (params.limit && params.limit > 0) {
    return result.slice(0, params.limit);
  }

  return result;
}
