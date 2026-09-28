import { ALL_NAGPUR_LOCATIONS } from '../data/nagpurLocations';
import { GENERATED_BLOG_POSTS } from '../data/blogEngine';

export interface SitemapUrlEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  category: 'core' | 'services' | 'brands' | 'service-areas' | 'blog' | 'products' | 'support';
  title: string;
}

const DOMAIN = 'https://computerrepairnagpur.com';
const TODAY = new Date().toISOString().split('T')[0];

export const CORE_SUPPORT_SLUGS = [
  { slug: 'hp-support', title: 'HP Laptop & Printer Official Drivers & Support Desk Nagpur' },
  { slug: 'hp-probook-support', title: 'HP ProBook & EliteBook Business Laptop Support Desk' },
  { slug: 'dell-support', title: 'Dell Laptop Official Drivers & Support Desk Nagpur' },
  { slug: 'dell-inspiron-support', title: 'Dell Inspiron Series Support & Driver Download Center' },
  { slug: 'dell-latitude-support', title: 'Dell Latitude Corporate Workstation Support Desk' },
  { slug: 'lenovo-support', title: 'Lenovo ThinkPad & IdeaPad Support & Drivers Nagpur' },
  { slug: 'apple-support', title: 'Apple MacBook & iMac Support & Diagnostics Nagpur' },
  { slug: 'asus-support', title: 'ASUS ROG, TUF & VivoBook Support Center Nagpur' },
  { slug: 'acer-support', title: 'Acer Aspire, Nitro & Predator Support Desk Nagpur' },
  { slug: 'msi-support', title: 'MSI Gaming Laptop & Motherboard Support Desk' },
  { slug: 'samsung-support', title: 'Samsung Galaxy Book & Monitor Support Nagpur' },
  { slug: 'epson-support', title: 'Epson EcoTank & InkTank Printer Support Desk' },
  { slug: 'canon-support', title: 'Canon PIXMA & imageCLASS Printer Support Nagpur' },
  { slug: 'brother-support', title: 'Brother Laser & InkTank Printer Support Nagpur' }
];

export const CORE_SERVICE_SLUGS = [
  { slug: 'computer-repair', title: 'Desktop Computer Repair & Custom PC Build' },
  { slug: 'laptop-repair', title: 'Laptop Chip-Level Motherboard & Screen Repair' },
  { slug: 'printer-repair', title: 'Printer Repair & Cartridge Toner Refill' },
  { slug: 'cctv-installation', title: 'CCTV Camera Security Installation & AMC' },
  { slug: 'data-recovery', title: 'Hard Disk & SSD Cleanroom Data Recovery' },
  { slug: 'networking-amc', title: 'Office LAN Networking & Corporate IT AMC' },
  { slug: 'motherboard-repair', title: 'Chip-Level Motherboard BGA Repair' },
  { slug: 'screen-replacement', title: 'Laptop LED & OLED Display Screen Replacement' },
  { slug: 'battery-replacement', title: 'OEM Laptop Battery Replacement' },
  { slug: 'hinge-repair', title: 'Laptop Hinge Repair & Body Fabrication' },
  { slug: 'keyboard-replacement', title: 'Laptop Backlit Keyboard Replacement' },
  { slug: 'ssd-upgrade', title: 'NVMe M.2 SSD Speed Upgrade' },
  { slug: 'ram-upgrade', title: 'DDR4 & DDR5 RAM Upgrade' },
  { slug: 'thermal-paste-cleaning', title: 'Deep Dust Cleaning & Thermal Paste Service' },
  { slug: 'virus-removal', title: 'Malware & Ransomware Virus Cleaning' },
  { slug: 'windows-os-installation', title: 'Genuine Windows 11 OS Setup & Driver Installation' },
  { slug: 'power-smps-repair', title: 'Desktop SMPS Power Supply Diagnostic' },
  { slug: 'bga-chip-reballing', title: 'BGA GPU & Southbridge Chip Reballing' },
  { slug: 'macbook-logic-board', title: 'Apple MacBook M1/M2/M3 Logic Board Repair' },
  { slug: 'toner-refilling', title: 'LaserJet Eco Toner Cartridge Refill' },
  { slug: 'epson-head-cleaning', title: 'Epson InkTank Head Cleaning & Unclogging' },
  { slug: 'hard-drive-recovery', title: 'Mechanical Hard Drive Head Crash Recovery' },
  { slug: 'custom-gaming-pc', title: 'Custom Gaming PC Assembly & Liquid Cooling' },
  { slug: 'lan-networking', title: 'Office Cat6 LAN Cabling & Dual-Band Wi-Fi Setup' },
  { slug: 'it-support-amc', title: 'Corporate IT Support & Annual Maintenance Contracts (AMC)' },
  { slug: 'tally-multi-user-lan', title: 'Tally Prime Multi-User LAN, Windows 11 & Quick Heal Setup' },
  { slug: 'smart-home-automation', title: 'Smart Home Retrofit, Biometric Door Locks & Touch Glass Switches' }
];

export const CORE_BRAND_SLUGS = [
  { slug: 'dell', title: 'Dell Laptop & PC Repair Center Nagpur' },
  { slug: 'dell-inspiron', title: 'Dell Inspiron Laptop Repair' },
  { slug: 'dell-latitude', title: 'Dell Latitude Enterprise Service' },
  { slug: 'dell-vostro', title: 'Dell Vostro Business Laptop Repair' },
  { slug: 'dell-xps', title: 'Dell XPS Premium Ultrabook Service' },
  { slug: 'alienware', title: 'Alienware High-End Gaming Laptop Service' },
  { slug: 'hp', title: 'HP Laptop & Laserjet Printer Service Center' },
  { slug: 'hp-pavilion', title: 'HP Pavilion Laptop Repair' },
  { slug: 'hp-probook', title: 'HP ProBook Business Laptop Repair' },
  { slug: 'hp-elitebook', title: 'HP EliteBook Corporate Repair' },
  { slug: 'hp-omen', title: 'HP OMEN Gaming Laptop Repair' },
  { slug: 'hp-victus', title: 'HP Victus Gaming Service' },
  { slug: 'lenovo', title: 'Lenovo ThinkPad & IdeaPad Repair Nagpur' },
  { slug: 'lenovo-thinkpad', title: 'Lenovo ThinkPad Motherboard Repair' },
  { slug: 'lenovo-ideapad', title: 'Lenovo IdeaPad Screen & Battery Service' },
  { slug: 'lenovo-legion', title: 'Lenovo Legion Gaming Laptop Repair' },
  { slug: 'lenovo-yoga', title: 'Lenovo Yoga 360 Hinge & Touchscreen Fix' },
  { slug: 'apple', title: 'Apple MacBook Logic Board & Display Service' },
  { slug: 'macbook', title: 'Apple MacBook Air & Pro Repair Center' },
  { slug: 'macbook-air', title: 'MacBook Air M1/M2/M3 Screen & Logic Board Fix' },
  { slug: 'macbook-pro', title: 'MacBook Pro Retina Display & Battery Repair' },
  { slug: 'imac', title: 'Apple iMac All-in-One Desktop Repair' },
  { slug: 'asus', title: 'ASUS ROG & ZenBook Repair Shop Nagpur' },
  { slug: 'asus-rog', title: 'ASUS ROG Republic of Gamers Service' },
  { slug: 'asus-tuf', title: 'ASUS TUF Gaming Laptop Repair' },
  { slug: 'zenbook', title: 'ASUS ZenBook Ultrabook Service' },
  { slug: 'vivobook', title: 'ASUS VivoBook Laptop Service' },
  { slug: 'acer', title: 'Acer Predator & Aspire Repair Center' },
  { slug: 'acer-predator', title: 'Acer Predator Gaming Laptop Repair' },
  { slug: 'acer-nitro', title: 'Acer Nitro 5 Gaming Laptop Repair' },
  { slug: 'acer-aspire', title: 'Acer Aspire Laptop Repair' },
  { slug: 'acer-swift', title: 'Acer Swift Thin & Light Laptop Repair' },
  { slug: 'msi', title: 'MSI Gaming Laptop Service Center' },
  { slug: 'msi-gaming', title: 'MSI Gaming Series Motherboard & Fan Repair' },
  { slug: 'samsung', title: 'Samsung Monitor & Laptop Repair Nagpur' },
  { slug: 'sony', title: 'Sony Electronics & VAIO Service' },
  { slug: 'sony-vaio', title: 'Sony VAIO Motherboard & Display Repair' },
  { slug: 'toshiba', title: 'Toshiba Satellite Laptop Repair' },
  { slug: 'toshiba-satellite', title: 'Toshiba Satellite Laptop Service' },
  { slug: 'compaq', title: 'Compaq Presario Laptop Repair' },
  { slug: 'fujitsu', title: 'Fujitsu Lifebook Laptop Service' },
  { slug: 'gateway', title: 'Gateway Laptop & PC Repair' },
  { slug: 'chromebook', title: 'Google Chromebook OS & Hardware Repair' },
  { slug: 'huawei', title: 'Huawei MateBook Laptop Service' },
  { slug: 'microsoft-surface', title: 'Microsoft Surface Pro Screen & Battery Service' },
  { slug: 'jiobook', title: 'JioBook Laptop Service & Software Setup' },
  { slug: 'lg', title: 'LG Gram & Monitor Repair Nagpur' },
  { slug: 'gigabyte', title: 'Gigabyte AORUS Gaming Laptop Service' },
  { slug: 'razer', title: 'Razer Blade Gaming Laptop Repair' },
  { slug: 'avita', title: 'Avita Liber Laptop Service' }
];

export const CORE_PRODUCT_SLUGS = [
  { slug: 'ssd', title: 'NVMe M.2 & SATA SSD Sale & Upgrade' },
  { slug: 'ram', title: 'DDR4 & DDR5 RAM Upgrade for Laptops' },
  { slug: 'mouse-keyboard', title: 'Ergonomic Wireless Mice & Mechanical Keyboards' },
  { slug: 'pen-drive', title: 'High-Speed USB 3.2 Type-C & Flash Drives' },
  { slug: 'screen', title: 'Original Laptop LED/OLED Displays' },
  { slug: 'battery', title: 'Original Brand Laptop Batteries' },
  { slug: 'batteries', title: 'OEM Laptop Replacement Batteries' },
  { slug: 'keyboard', title: 'Backlit Laptop Keyboards & Topcases' },
  { slug: 'charger', title: 'OEM Laptop Power Adapter Chargers' },
  { slug: 'chargers', title: 'Laptop Chargers & Power Adapters' },
  { slug: 'motherboard', title: 'Tested Laptop & Desktop Motherboards' },
  { slug: 'hinge', title: 'Laptop Hinge Sets & Side Brackets' },
  { slug: 'cooling-fan', title: 'CPU & GPU Cooling Fans & Heatsinks' },
  { slug: 'hard-disk', title: '1TB / 2TB Surveillance & Backup Hard Drives' },
  { slug: 'smps', title: '450W to 850W Gold Rated Desktop SMPS' },
  { slug: 'laptops', title: 'Refurbished & Business Laptops in Nagpur' },
  { slug: 'components', title: 'Desktop & Laptop Hardware Components' },
  { slug: 'accessories', title: 'Computer Peripherals & IT Accessories' }
];

export function getAllSitemapEntries(): SitemapUrlEntry[] {
  const entries: SitemapUrlEntry[] = [
    // Core Navigation Pages
    { url: `${DOMAIN}/`, lastmod: TODAY, changefreq: 'daily', priority: 1.0, category: 'core', title: 'Home - Sharon Infotech Computer Repair Nagpur (Dhantoli HQ)' },
    { url: `${DOMAIN}/services`, lastmod: TODAY, changefreq: 'daily', priority: 0.95, category: 'core', title: 'Computer & Laptop Repair Services Index' },
    { url: `${DOMAIN}/brands`, lastmod: TODAY, changefreq: 'daily', priority: 0.90, category: 'core', title: 'Multi-Brand Laptop Repair Centers' },
    { url: `${DOMAIN}/service-areas`, lastmod: TODAY, changefreq: 'daily', priority: 0.95, category: 'core', title: '220+ Nagpur Doorstep Service Areas Index' },
    { url: `${DOMAIN}/products`, lastmod: TODAY, changefreq: 'weekly', priority: 0.85, category: 'core', title: 'Original Spare Parts & Laptop Store (Dhantoli)' },
    { url: `${DOMAIN}/blog`, lastmod: TODAY, changefreq: 'daily', priority: 0.90, category: 'core', title: 'Laptop & Tech Hardware Repair Blog' },
    { url: `${DOMAIN}/support`, lastmod: TODAY, changefreq: 'weekly', priority: 0.80, category: 'core', title: 'Customer Support & Warranty Portal' },
    { url: `${DOMAIN}/about`, lastmod: TODAY, changefreq: 'monthly', priority: 0.75, category: 'core', title: 'About Sharon Infotech Nagpur (Since 2013)' },
    { url: `${DOMAIN}/contact`, lastmod: TODAY, changefreq: 'weekly', priority: 0.85, category: 'core', title: 'Contact Us & Panchasheel Square Dhantoli Store Map' }
  ];

  // Services Sub-Pages
  CORE_SERVICE_SLUGS.forEach((srv) => {
    entries.push({
      url: `${DOMAIN}/services/${srv.slug}`,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: 0.85,
      category: 'services',
      title: srv.title
    });
  });

  // Brands Sub-Pages
  CORE_BRAND_SLUGS.forEach((brd) => {
    entries.push({
      url: `${DOMAIN}/brands/${brd.slug}`,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: 0.85,
      category: 'brands',
      title: brd.title
    });
  });

  // Products Sub-Pages
  CORE_PRODUCT_SLUGS.forEach((prd) => {
    entries.push({
      url: `${DOMAIN}/products/${prd.slug}`,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: 0.80,
      category: 'products',
      title: prd.title
    });
  });

  // Support Sub-Pages
  CORE_SUPPORT_SLUGS.forEach((sup) => {
    entries.push({
      url: `${DOMAIN}/support/${sup.slug}`,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: 0.80,
      category: 'support',
      title: sup.title
    });
  });

  // 220+ Service Areas
  ALL_NAGPUR_LOCATIONS.forEach((loc) => {
    entries.push({
      url: `${DOMAIN}/service-areas/${loc.id}`,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: 0.85,
      category: 'service-areas',
      title: `Computer & Laptop Repair in ${loc.name}, Nagpur (Pincode: ${loc.pincode})`
    });
  });

  // 1,000+ Blog Posts
  GENERATED_BLOG_POSTS.forEach((post) => {
    entries.push({
      url: `${DOMAIN}/blog/${post.id}`,
      lastmod: TODAY,
      changefreq: 'weekly',
      priority: 0.75,
      category: 'blog',
      title: post.title
    });
  });

  return entries;
}

export function generateSitemapXml(): string {
  const entries = getAllSitemapEntries();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n`;
  xml += `        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n`;
  xml += `        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n\n`;

  entries.forEach((entry) => {
    xml += `  <url>\n`;
    xml += `    <loc>${entry.url}</loc>\n`;
    xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
    xml += `    <priority>${entry.priority.toFixed(2)}</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>\n`;
  return xml;
}

export function downloadSitemapFile(): void {
  const xml = generateSitemapXml();
  const blob = new Blob([xml], { type: 'application/xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'sitemap.xml';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
