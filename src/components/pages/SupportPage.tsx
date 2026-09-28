import React, { useState, useEffect } from 'react';
import { FAQAccordion } from '../FAQAccordion';
import {
  HelpCircle,
  ChevronRight,
  ShieldCheck,
  Phone,
  MessageSquare,
  FileText,
  Clock,
  CheckCircle2,
  ExternalLink,
  Laptop
} from 'lucide-react';

interface SupportPageProps {
  initialSubPage?: string;
  onNavigateHome: () => void;
  onOpenBooking: (mode?: 'doorstep' | 'instore', prefill?: string) => void;
}

export const SUPPORT_CENTERS = [
  {
    id: 'hp-support',
    brand: 'HP',
    fullName: 'HP Laptop & Printer Official Drivers & Support Desk Nagpur',
    helpline: '+91 7249430043',
    officialUrl: 'https://support.hp.com',
    warrantyCheck: 'https://support.hp.com/us-en/checkwarranty',
    driverDownload: 'https://support.hp.com/us-en/drivers',
    servicesProvided: [
      'Official HP Laptop drivers for Windows 10/11 64-bit',
      'HP Pavilion, Victus & Envy BIOS / Firmware update',
      'Out-of-warranty HP laptop component repair',
      'HP Printer LaserJet driver setup & Wi-Fi configuration'
    ],
    faqs: [
      { q: 'How to check my HP Laptop warranty status?', a: 'Visit support.hp.com, enter your 10-character serial number printed at the bottom of your laptop.' },
      { q: 'What if my HP Laptop is out of warranty?', a: 'Sharon Infotech provides certified out-of-warranty HP laptop repair at 40-50% lower cost than company centers in Nagpur.' }
    ]
  },
  {
    id: 'hp-probook-support',
    brand: 'HP ProBook',
    fullName: 'HP ProBook & EliteBook Business Laptop Support Desk',
    helpline: '+91 7249430043',
    officialUrl: 'https://support.hp.com',
    warrantyCheck: 'https://support.hp.com/us-en/checkwarranty',
    driverDownload: 'https://support.hp.com/us-en/drivers',
    servicesProvided: [
      'HP ProBook enterprise security & BIOS password reset',
      'HP EliteBook fingerprint driver & Sure Start fix',
      'RAM & NVMe SSD upgrade for HP ProBook 440/450 G8/G9/G10',
      'Doorstep ProBook repair across Nagpur'
    ],
    faqs: [
      { q: 'Can I upgrade RAM on HP ProBook 450 G8?', a: 'Yes, HP ProBook series has 2 SODIMM slots supporting up to 64GB DDR4/DDR5 RAM.' }
    ]
  },
  {
    id: 'dell-support',
    brand: 'Dell',
    fullName: 'Dell Laptop Official Drivers & Support Desk Nagpur',
    helpline: '+91 7249430043',
    officialUrl: 'https://www.dell.com/support',
    warrantyCheck: 'https://www.dell.com/support/home/en-in?app=warranty',
    driverDownload: 'https://www.dell.com/support/home/en-in?app=drivers',
    servicesProvided: [
      'Dell Service Tag identification & driver downloads',
      'Dell SupportAssist setup & BIOS update',
      'Out-of-warranty Dell Inspiron, Vostro & Latitude hardware fix',
      'Dell Alienware thermal repasting & performance tuning'
    ],
    faqs: [
      { q: 'Where is my Dell Service Tag located?', a: 'Look at the bottom sticker of your Dell laptop for a 7-character alphanumeric code e.g. "8X9Y1Z2".' }
    ]
  },
  {
    id: 'dell-inspiron-support',
    brand: 'Dell Inspiron',
    fullName: 'Dell Inspiron Series Support & Driver Download Center',
    helpline: '+91 7249430043',
    officialUrl: 'https://www.dell.com/support',
    warrantyCheck: 'https://www.dell.com/support/home/en-in?app=warranty',
    driverDownload: 'https://www.dell.com/support/home/en-in?app=drivers',
    servicesProvided: [
      'Dell Inspiron 3000/5000/7000 audio & display driver downloads',
      'Dell Inspiron hinge repair & body replacement',
      'Inspiron keyboard & battery replacement in Nagpur'
    ],
    faqs: [
      { q: 'Why is my Dell Inspiron plugged in not charging?', a: 'It can be a worn-out DC jack, adapter communication pin fault, or degraded battery.' }
    ]
  },
  {
    id: 'dell-latitude-support',
    brand: 'Dell Latitude',
    fullName: 'Dell Latitude Corporate Workstation Support Desk',
    helpline: '+91 7249430043',
    officialUrl: 'https://www.dell.com/support',
    warrantyCheck: 'https://www.dell.com/support/home/en-in?app=warranty',
    driverDownload: 'https://www.dell.com/support/home/en-in?app=drivers',
    servicesProvided: [
      'Dell Latitude Command | Update utility driver setup',
      'Dell Latitude motherboard chip-level repair',
      'Latitude dock station & USB-C Thunderbolt troubleshooting'
    ],
    faqs: [
      { q: 'Do you provide on-site repair for Dell Latitude laptops in Nagpur MIDC?', a: 'Yes, we provide doorstep corporate IT support across Hingna and Butibori MIDC.' }
    ]
  },
  {
    id: 'alienware-support',
    brand: 'Alienware',
    fullName: 'Dell Alienware Gaming Laptop Support & Thermal Lab',
    helpline: '+91 7249430043',
    officialUrl: 'https://www.dell.com/support/home/en-in/products/alienware',
    warrantyCheck: 'https://www.dell.com/support/home/en-in?app=warranty',
    driverDownload: 'https://www.dell.com/support/home/en-in?app=drivers',
    servicesProvided: [
      'Alienware Command Center FX lighting & fan speed setup',
      'Liquid metal / Honeywell PTM7950 thermal paste application',
      'Alienware m15/m18 GPU BGA chip reballing'
    ],
    faqs: [
      { q: 'My Alienware laptop is overheating above 95°C, can you fix it?', a: 'Yes, we perform deep radiator fan de-dusting and high-performance thermal pad replacement.' }
    ]
  },
  {
    id: 'lenovo-support',
    brand: 'Lenovo',
    fullName: 'Lenovo Laptop Support Desk & Driver Download Center',
    helpline: '+91 7249430043',
    officialUrl: 'https://pcsupport.lenovo.com',
    warrantyCheck: 'https://pcsupport.lenovo.com/warrantylookup',
    driverDownload: 'https://pcsupport.lenovo.com/drivers',
    servicesProvided: [
      'Lenovo Vantage driver updates & battery calibration',
      'Lenovo ThinkPad & IdeaPad display flex cable repair',
      'Lenovo motherboard repair & liquid damage rescue'
    ],
    faqs: [
      { q: 'How do I download official Lenovo drivers?', a: 'Visit pcsupport.lenovo.com and enter your laptop serial number (S/N).' }
    ]
  },
  {
    id: 'lenovo-ideapad-support',
    brand: 'Lenovo Ideapad',
    fullName: 'Lenovo IdeaPad Slim 3/5 Support & Service Center',
    helpline: '+91 7249430043',
    officialUrl: 'https://pcsupport.lenovo.com',
    warrantyCheck: 'https://pcsupport.lenovo.com/warrantylookup',
    driverDownload: 'https://pcsupport.lenovo.com/drivers',
    servicesProvided: [
      'Lenovo IdeaPad audio, Wi-Fi & touchpad driver downloads',
      'IdeaPad hinge welding & palmrest replacement',
      'IdeaPad SSD speed boost & RAM expansion'
    ],
    faqs: [
      { q: 'Can Lenovo IdeaPad 3 be upgraded with SSD?', a: 'Yes, we can add an NVMe M.2 SSD alongside your existing hard disk.' }
    ]
  },
  {
    id: 'lenovo-thinkpad-support',
    brand: 'Lenovo ThinkPad',
    fullName: 'Lenovo ThinkPad Business Support Desk Nagpur',
    helpline: '+91 7249430043',
    officialUrl: 'https://pcsupport.lenovo.com',
    warrantyCheck: 'https://pcsupport.lenovo.com/warrantylookup',
    driverDownload: 'https://pcsupport.lenovo.com/drivers',
    servicesProvided: [
      'ThinkPad TrackPoint & keyboard replacement',
      'ThinkPad BIOS lock clearance & Thunderbolt port fix',
      'Original ThinkPad Type-C charger supply'
    ],
    faqs: [
      { q: 'Why is my ThinkPad not turning on?', a: 'Try pressing the emergency reset hole at the bottom using a paperclip or contact Sharon Infotech.' }
    ]
  },
  {
    id: 'lenovo-legion-support',
    brand: 'Lenovo Legion',
    fullName: 'Lenovo Legion Gaming Support & Hardware Tuning',
    helpline: '+91 7249430043',
    officialUrl: 'https://pcsupport.lenovo.com',
    warrantyCheck: 'https://pcsupport.lenovo.com/warrantylookup',
    driverDownload: 'https://pcsupport.lenovo.com/drivers',
    servicesProvided: [
      'Lenovo Legion Vantage Performance Mode drivers',
      'Legion 5/5 Pro dual-fan heatsink cleaning',
      '165Hz/240Hz gaming screen replacement'
    ],
    faqs: [
      { q: 'How often should Lenovo Legion fans be cleaned?', a: 'Every 6 to 8 months in dusty climates like Nagpur.' }
    ]
  },
  {
    id: 'acer-support',
    brand: 'Acer',
    fullName: 'Acer Official Support & Care Desk Nagpur',
    helpline: '+91 7249430043',
    officialUrl: 'https://www.acer.com/in-en/support',
    warrantyCheck: 'https://www.acer.com/in-en/support/warranty',
    driverDownload: 'https://www.acer.com/in-en/support/drivers',
    servicesProvided: [
      'Acer Care Center driver installation & diagnostics',
      'Acer Aspire screen replacement & keyboard fix',
      'Acer motherboard power IC repair'
    ],
    faqs: [
      { q: 'Where do I find my Acer SNID number?', a: 'Check the white label at the bottom of your Acer laptop for an 11-digit SNID.' }
    ]
  },
  {
    id: 'acer-predator-support',
    brand: 'Acer Predator',
    fullName: 'Acer Predator Helios & Triton Gaming Support Desk',
    helpline: '+91 7249430043',
    officialUrl: 'https://www.acer.com/in-en/support',
    warrantyCheck: 'https://www.acer.com/in-en/support/warranty',
    driverDownload: 'https://www.acer.com/in-en/support/drivers',
    servicesProvided: [
      'PredatorSense RGB & GPU overclocking driver setup',
      'AeroBlade 3D fan replacement & liquid metal repasting',
      'NVIDIA RTX GPU short circuit motherboard repair'
    ],
    faqs: [
      { q: 'Can Sharon Infotech replace broken Acer Predator fan blades?', a: 'Yes, we stock genuine metal replacement fans for Acer Predator series.' }
    ]
  },
  {
    id: 'asus-support',
    brand: 'Asus',
    fullName: 'ASUS Official Support Desk Nagpur',
    helpline: '+91 7249430043',
    officialUrl: 'https://www.asus.com/in/support',
    warrantyCheck: 'https://www.asus.com/in/support/warranty-status/',
    driverDownload: 'https://www.asus.com/in/support/download-center/',
    servicesProvided: [
      'MyASUS utility setup & driver updates',
      'ASUS TUF Gaming & Vivobook repair',
      'ASUS OLED display repair & hinge reinforcement'
    ],
    faqs: [
      { q: 'How do I download ASUS Wi-Fi drivers?', a: 'Visit asus.com/in/support/download-center, enter your model name e.g. "X515EA".' }
    ]
  },
  {
    id: 'zenbook-support',
    brand: 'ZenBook',
    fullName: 'ASUS ZenBook Premium Ultrabook Support Desk',
    helpline: '+91 7249430043',
    officialUrl: 'https://www.asus.com/in/support',
    warrantyCheck: 'https://www.asus.com/in/support/warranty-status/',
    driverDownload: 'https://www.asus.com/in/support/download-center/',
    servicesProvided: [
      'ASUS ZenBook ScreenPad touchpad driver download',
      'ZenBook ErgoLift hinge repair & ultra-thin body service',
      'ZenBook battery & Type-C PD charging repair'
    ],
    faqs: [
      { q: 'Is ZenBook RAM upgradeable?', a: 'Most ZenBook models have soldered LPDDR4X/DDR5 RAM, but SSD is 100% upgradeable.' }
    ]
  },
  {
    id: 'vivobook-support',
    brand: 'VivoBook',
    fullName: 'ASUS Vivobook Series Support Desk Nagpur',
    helpline: '+91 7249430043',
    officialUrl: 'https://www.asus.com/in/support',
    warrantyCheck: 'https://www.asus.com/in/support/warranty-status/',
    driverDownload: 'https://www.asus.com/in/support/download-center/',
    servicesProvided: [
      'ASUS Vivobook 14/15/16 camera, audio & Wi-Fi drivers',
      'Vivobook battery replacement with 1-year warranty',
      'Vivobook keyboard keys fix & backlight repair'
    ],
    faqs: [
      { q: 'How long does ASUS Vivobook battery replacement take?', a: 'Only 30 minutes at our Dhantoli, Nagpur store.' }
    ]
  },
  {
    id: 'asus-rog-support',
    brand: 'Asus ROG',
    fullName: 'ASUS ROG Strix & Zephyrus Gaming Support Center',
    helpline: '+91 7249430043',
    officialUrl: 'https://rog.asus.com/in/support/',
    warrantyCheck: 'https://www.asus.com/in/support/warranty-status/',
    driverDownload: 'https://rog.asus.com/in/support/',
    servicesProvided: [
      'Armoury Crate & Aura Sync driver troubleshooting',
      'ROG Strix liquid metal re-application & cleaning',
      'QHD 240Hz IPS panel replacement'
    ],
    faqs: [
      { q: 'Why is Armoury Crate not detecting my ROG laptop fans?', a: 'We reinstall official ASUS System Control Interface drivers to resolve software conflicts.' }
    ]
  },
  {
    id: 'apple-support',
    brand: 'Apple',
    fullName: 'Apple Mac & MacBook Service Support Desk Nagpur',
    helpline: '+91 7249430043',
    officialUrl: 'https://support.apple.com/en-in',
    warrantyCheck: 'https://checkcoverage.apple.com/in/en/',
    driverDownload: 'https://support.apple.com/downloads',
    servicesProvided: [
      'Apple macOS installation (Sonoma, Sequoia, Ventura)',
      'MacBook M1/M2/M3 logic board chip-level repair',
      'MacBook Retina screen replacement & battery swap'
    ],
    faqs: [
      { q: 'How to check my Apple MacBook warranty coverage?', a: 'Go to checkcoverage.apple.com and type your 12-character Apple serial number.' }
    ]
  },
  {
    id: 'macbook-support',
    brand: 'MacBook',
    fullName: 'Apple MacBook Air & MacBook Pro Support Desk',
    helpline: '+91 7249430043',
    officialUrl: 'https://support.apple.com/mac',
    warrantyCheck: 'https://checkcoverage.apple.com/in/en/',
    driverDownload: 'https://support.apple.com/downloads/macOS',
    servicesProvided: [
      'MacBook Air M1/M2 battery service required warning fix',
      'MacBook Pro Type-C MagSafe port replacement',
      'MacBook liquid spill corrosion repair in clean-room'
    ],
    faqs: [
      { q: 'Can Sharon Infotech fix MacBook Pro Flexgate stage light issue?', a: 'Yes, we perform precision display flex cable micro-soldering.' }
    ]
  },
  {
    id: 'msi-support',
    brand: 'MSI',
    fullName: 'MSI Gaming & Creator Support Desk Nagpur',
    helpline: '+91 7249430043',
    officialUrl: 'https://in.msi.com/support',
    warrantyCheck: 'https://in.msi.com/page/warranty',
    driverDownload: 'https://in.msi.com/support/download',
    servicesProvided: [
      'MSI Center & Dragon Center driver setup',
      'MSI Katana / Thin GF63 hinge broken casing welding',
      'MSI RTX 3050/4060 GPU motherboard repair'
    ],
    faqs: [
      { q: 'Why do MSI laptop hinges break easily?', a: 'Tight factory hinges exert stress on plastic anchors. We reinforce them with metal rivets.' }
    ]
  },
  {
    id: 'msi-gaming-support',
    brand: 'MSI Gaming',
    fullName: 'MSI Gaming Laptop High Performance Support Desk',
    helpline: '+91 7249430043',
    officialUrl: 'https://in.msi.com/support',
    warrantyCheck: 'https://in.msi.com/page/warranty',
    driverDownload: 'https://in.msi.com/support/download',
    servicesProvided: [
      'MSI Cooler Boost 5 fan replacement',
      'MSI gaming BIOS update & EC firmware flashing',
      'M.2 NVMe Gen4 SSD expansion & RAID setup'
    ],
    faqs: [
      { q: 'How to fix MSI laptop fan noise?', a: 'We replace noisy bearing fans with brand new original MSI thermal modules.' }
    ]
  },
  {
    id: 'samsung-support',
    brand: 'Samsung',
    fullName: 'Samsung Galaxy Book & Laptop Support Desk',
    helpline: '+91 7249430043',
    officialUrl: 'https://www.samsung.com/in/support/',
    warrantyCheck: 'https://www.samsung.com/in/support/your-service/warranty-check',
    driverDownload: 'https://www.samsung.com/in/support/download-center/',
    servicesProvided: [
      'Samsung Galaxy Book2/Book3 driver updates',
      'Samsung AMOLED display repair & body replacement',
      'Samsung original 65W Type-C charger supply'
    ],
    faqs: [
      { q: 'Can Samsung Galaxy Book SSD be upgraded?', a: 'Yes, Galaxy Book series has an additional M.2 NVMe slot.' }
    ]
  },
  {
    id: 'sony-support',
    brand: 'Sony',
    fullName: 'Sony VAIO Laptop Technical Support Desk',
    helpline: '+91 7249430043',
    officialUrl: 'https://www.sony.co.in/electronics/support',
    warrantyCheck: 'https://www.sony.co.in/electronics/support',
    driverDownload: 'https://www.sony.co.in/electronics/support/laptop-pc',
    servicesProvided: [
      'Sony VAIO official Windows 10/11 hotkey drivers',
      'Sony VAIO screen, keyboard & battery replacement',
      'Legacy Sony VAIO SSD speed upgrade'
    ],
    faqs: [
      { q: 'Are spare parts available for older Sony VAIO laptops in Nagpur?', a: 'Yes! Sharon Infotech carries imported batteries, adapters, keyboards, and screens for Sony VAIO.' }
    ]
  },
  {
    id: 'sony-vaio-support',
    brand: 'Sony Vaio',
    fullName: 'Sony VAIO E/Fit/Flip Series Support Desk',
    helpline: '+91 7249430043',
    officialUrl: 'https://www.sony.co.in/electronics/support',
    warrantyCheck: 'https://www.sony.co.in/electronics/support',
    driverDownload: 'https://www.sony.co.in/electronics/support/laptop-pc',
    servicesProvided: [
      'VAIO Care diagnostic tool recovery',
      'Sony VAIO BIOS battery & CMOS replacement',
      'Sony VAIO overheating cleanup & thermal repasting'
    ],
    faqs: [
      { q: 'My Sony VAIO laptop is slow, can an SSD make it fast?', a: 'Yes, installing an SSD speeds up Sony VAIO boot time from 2 minutes to under 12 seconds.' }
    ]
  },
  {
    id: 'toshiba-support',
    brand: 'Toshiba',
    fullName: 'Toshiba Satellite & Dynabook Support Desk',
    helpline: '+91 7249430043',
    officialUrl: 'https://support.dynabook.com',
    warrantyCheck: 'https://support.dynabook.com/warranty',
    driverDownload: 'https://support.dynabook.com/drivers',
    servicesProvided: [
      'Toshiba Satellite BIOS & Wi-Fi driver installation',
      'Toshiba Satellite power socket & motherboard fix',
      'Toshiba laptop battery & charger supply in Nagpur'
    ],
    faqs: [
      { q: 'How to recover Toshiba laptop operating system?', a: 'We offer full OS reinstall with data preservation for Toshiba Dynabook.' }
    ]
  },
  {
    id: 'toshiba-satellite-support',
    brand: 'Toshiba Satellite',
    fullName: 'Toshiba Satellite Laptop Support Desk Nagpur',
    helpline: '+91 7249430043',
    officialUrl: 'https://support.dynabook.com',
    warrantyCheck: 'https://support.dynabook.com/warranty',
    driverDownload: 'https://support.dynabook.com/drivers',
    servicesProvided: [
      'Toshiba Satellite C50/L50 screen replacement',
      'Toshiba Satellite keyboard replacement',
      'Toshiba Satellite CPU fan cleaning'
    ],
    faqs: [
      { q: 'Do you offer doorstep repair for Toshiba Satellite in Sitabuldi?', a: 'Yes, free doorstep pickup available across Nagpur.' }
    ]
  },
  {
    id: 'compaq-support',
    brand: 'Compaq',
    fullName: 'Compaq Presario Laptop Drivers & Support Desk',
    helpline: '+91 7249430043',
    officialUrl: 'https://support.hp.com',
    warrantyCheck: 'https://support.hp.com',
    driverDownload: 'https://support.hp.com/us-en/drivers',
    servicesProvided: [
      'Compaq Presario audio & LAN drivers for Windows 10',
      'Compaq laptop power supply & battery repair',
      'Compaq hard drive to SSD upgrade service'
    ],
    faqs: [
      { q: 'Can a Compaq Presario run Windows 10 smoothly?', a: 'Yes, with an SSD and 4GB/8GB RAM upgrade.' }
    ]
  },
  {
    id: 'fujitsu-support',
    brand: 'Fujitsu',
    fullName: 'Fujitsu Lifebook Laptop Technical Support Desk',
    helpline: '+91 7249430043',
    officialUrl: 'https://support.ts.fujitsu.com/',
    warrantyCheck: 'https://support.ts.fujitsu.com/IndexWarranty.asp',
    driverDownload: 'https://support.ts.fujitsu.com/IndexDownload.asp',
    servicesProvided: [
      'Fujitsu Lifebook official drivers & DeskUpdate utility',
      'Fujitsu laptop motherboard repair',
      'Fujitsu battery & charger replacement'
    ],
    faqs: [
      { q: 'Where are Fujitsu laptop drivers downloaded?', a: 'Visit support.ts.fujitsu.com and input your 10-digit Ident number.' }
    ]
  },
  {
    id: 'microsoft-surface-support',
    brand: 'Microsoft Surface',
    fullName: 'Microsoft Surface Pro & Laptop Support Desk',
    helpline: '+91 7249430043',
    officialUrl: 'https://support.microsoft.com/surface',
    warrantyCheck: 'https://account.microsoft.com/devices',
    driverDownload: 'https://www.microsoft.com/en-us/download/details.aspx?id=56261',
    servicesProvided: [
      'Microsoft Surface Pro touchscreen & battery replacement',
      'Surface UEFI BIOS & Windows recovery image restore',
      'Surface Type Cover port & charging port repair'
    ],
    faqs: [
      { q: 'Can Microsoft Surface Pro screen be replaced in Nagpur?', a: 'Yes, Sharon Infotech performs precision screen disassembly and replacement.' }
    ]
  },
  {
    id: 'jiobook-support',
    brand: 'JioBook',
    fullName: 'JioBook ARM Laptop Support & OS Restore Desk',
    helpline: '+91 7249430043',
    officialUrl: 'https://www.jio.com/jcms/jiobook/',
    warrantyCheck: 'https://www.jio.com/help/home',
    driverDownload: 'https://www.jio.com/help/home',
    servicesProvided: [
      'JioOS system restore & app troubleshooting',
      'JioBook display panel & charging port fix',
      'JioBook keyboard & battery replacement'
    ],
    faqs: [
      { q: 'My JioBook screen is cracked, can it be fixed?', a: 'Yes, we replace 11.6-inch HD JioBook display panels.' }
    ]
  },
  {
    id: 'chromebook-support',
    brand: 'Chromebook',
    fullName: 'Google Chromebook ChromeOS Support Desk',
    helpline: '+91 7249430043',
    officialUrl: 'https://support.google.com/chromebook/',
    warrantyCheck: 'https://support.google.com/chromebook/',
    driverDownload: 'https://support.google.com/chromebook/answer/1080595',
    servicesProvided: [
      'ChromeOS recovery tool USB creation',
      'HP / Dell / Acer Chromebook screen & keyboard fix',
      'Chromebook battery & Type-C port replacement'
    ],
    faqs: [
      { q: 'How to fix ChromeOS missing or damaged screen error?', a: 'We reinstall ChromeOS firmware using official recovery media.' }
    ]
  },
  {
    id: 'huawei-support',
    brand: 'Huawei',
    fullName: 'Huawei MateBook Laptop Support Desk',
    helpline: '+91 7249430043',
    officialUrl: 'https://consumer.huawei.com/en/support/',
    warrantyCheck: 'https://consumer.huawei.com/en/support/warranty-query/',
    driverDownload: 'https://consumer.huawei.com/en/support/driver-list/',
    servicesProvided: [
      'Huawei PC Manager setup & driver downloads',
      'Huawei MateBook screen & pop-up camera fix',
      'MateBook battery replacement in Nagpur'
    ],
    faqs: [
      { q: 'Can Huawei MateBook battery be replaced?', a: 'Yes, we stock original lithium polymer battery modules.' }
    ]
  },
  {
    id: 'gateway-support',
    brand: 'Gateway',
    fullName: 'Gateway Laptop Official Support Desk',
    helpline: '+91 7249430043',
    officialUrl: 'https://www.gateway.com/gw/en/US/content/drivers-downloads',
    warrantyCheck: 'https://www.gateway.com/gw/en/US/content/drivers-downloads',
    driverDownload: 'https://www.gateway.com/gw/en/US/content/drivers-downloads',
    servicesProvided: [
      'Gateway Ultra Slim laptop driver downloads',
      'Gateway screen, battery & power connector fix',
      'Gateway SSD speed boost in Nagpur'
    ],
    faqs: [
      { q: 'Are Gateway laptop chargers available in Nagpur?', a: 'Yes, we stock universal and original Gateway power adapters.' }
    ]
  }
];

export const SupportPage: React.FC<SupportPageProps> = ({
  initialSubPage = 'hp-support',
  onNavigateHome,
  onOpenBooking
}) => {
  const [activeSuppId, setActiveSuppId] = useState<string>(initialSubPage);

  useEffect(() => {
    if (initialSubPage) {
      setActiveSuppId(initialSubPage);
    }
  }, [initialSubPage]);

  const activeSupport = SUPPORT_CENTERS.find((s) => s.id === activeSuppId) || SUPPORT_CENTERS[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Breadcrumb Header */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <button onClick={onNavigateHome} className="hover:text-blue-400 transition">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-slate-200 font-bold">Support Center</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-cyan-400 font-extrabold">{activeSupport.brand}</span>
        </div>

        {/* Page Hero Title */}
        <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-blue-950 p-6 sm:p-8 rounded-3xl border border-cyan-800/40 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
              Sharon Infotech Technical Support Portal • Nagpur
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              HP, Dell, Lenovo, Acer & ASUS Support Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Find official driver links, warranty lookup portals, error diagnostic guides, and request expert repair assistance in Nagpur.
            </p>
          </div>
        </div>

        {/* Sub-Pages Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-800">
          {SUPPORT_CENTERS.map((sup) => {
            const isSelected = sup.id === activeSuppId;
            return (
              <button
                key={sup.id}
                onClick={() => setActiveSuppId(sup.id)}
                aria-label={`Switch support view to ${sup.brand}`}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-extrabold whitespace-nowrap transition border min-h-[44px] ${
                  isSelected
                    ? 'bg-cyan-600 text-white border-cyan-400 shadow-lg scale-105'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                <span>{sup.brand}</span>
              </button>
            );
          })}
        </div>

        {/* Support Detail Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-5">
              <div>
                <span className="text-[10px] uppercase font-black text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded border border-cyan-800">
                  {activeSupport.brand} Technical Portal
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                  {activeSupport.fullName}
                </h2>
              </div>
              <a
                href={`tel:${activeSupport.helpline}`}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md"
              >
                <Phone className="w-3.5 h-3.5" /> Direct Call: 7249430043
              </a>
            </div>

            {/* Quick Link Buttons for Drivers & Warranty */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={activeSupport.warrantyCheck}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 transition flex items-center justify-between text-xs font-bold text-slate-200 group"
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <div>
                    <span className="block text-white">Check {activeSupport.brand} Warranty</span>
                    <span className="text-[10px] text-slate-400">Official Portal Lookup</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-amber-400" />
              </a>

              <a
                href={activeSupport.driverDownload}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 transition flex items-center justify-between text-xs font-bold text-slate-200 group"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  <div>
                    <span className="block text-white">Download {activeSupport.brand} Drivers</span>
                    <span className="text-[10px] text-slate-400">BIOS & Chipset Software</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400" />
              </a>
            </div>

            {/* Services provided */}
            <div className="space-y-3">
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
                Services Provided by Sharon Infotech for {activeSupport.brand}:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeSupport.servicesProvided.map((srv, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{srv}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
                Frequently Asked Support Questions:
              </h3>
              <div className="space-y-3">
                {activeSupport.faqs.map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                    <p className="font-bold text-xs text-cyan-300">Q: {faq.q}</p>
                    <p className="text-xs text-slate-300 leading-relaxed">A: {faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => onOpenBooking('doorstep', `${activeSupport.brand} Technical Support Ticket`)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-cyan-600/30 transition flex items-center justify-center gap-2"
              >
                <Laptop className="w-4 h-4" />
                <span>Book Support & Repair Ticket</span>
              </button>

              <a
                href={`https://wa.me/917249430043?text=Hi%20Sharon%20Infotech,%20I%20need%20technical%20support%20for%20my%20${encodeURIComponent(activeSupport.brand)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Support Desk</span>
              </a>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3">
              <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                Select Brand Support Sub-Page
              </h3>
              <div className="space-y-1.5">
                {SUPPORT_CENTERS.map((sup) => {
                  const isCur = sup.id === activeSuppId;
                  return (
                    <button
                      key={sup.id}
                      onClick={() => setActiveSuppId(sup.id)}
                      className={`w-full text-left p-3 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                        isCur
                          ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/40'
                          : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800/80'
                      }`}
                    >
                      <span>{sup.brand}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-cyan-950/60 border border-slate-800 rounded-3xl p-5 space-y-3 text-xs">
              <h4 className="font-extrabold text-white text-sm flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Customer Support Desk
              </h4>
              <p className="text-slate-300 leading-relaxed">
                Sharon Infotech Nagpur helpline is active 7 days a week from 9:30 AM to 9:00 PM for all technical inquiries, driver guidance, and service bookings.
              </p>
              <a
                href="tel:7249430043"
                className="block text-center py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black rounded-xl transition"
              >
                Call Support: 7249430043
              </a>
            </div>
          </div>

        </div>

        {/* PAGE-SPECIFIC SUPPORT FAQ SECTION */}
        <FAQAccordion
          title="Frequently Asked Support Questions - Sharon Infotech Nagpur"
          subtitle="Ticket tracking, job sheet status, driver support, remote AnyDesk help, and warranty assistance."
          faqs={[
            {
              question: "How do I raise a doorstep laptop repair or maintenance service ticket in Nagpur?",
              answer: "You can call our Nagpur support desk directly at 7249430043 or send a WhatsApp message describing your laptop model and issue. A service ticket is logged immediately and a technician is assigned."
            },
            {
              question: "How can I track my laptop repair status at Sharon Infotech Dhantoli lab?",
              answer: "Simply call 7249430043 or message us with your Job Sheet / Ticket Number. Our desktop support engineers will share live video/photo diagnosis updates on WhatsApp."
            },
            {
              question: "What if I need assistance with driver downloads or BIOS flashing?",
              answer: "Our remote software desk can assist you over AnyDesk or TeamViewer to install official graphics drivers, chipset updates, and printer software. Call 7249430043 for remote desk support."
            }
          ]}
          phone="7249430043"
          ctaTitle="Call Sharon Infotech Support Desk at 7249430043"
          ctaSubtitle="Instant helpline for all laptop brands, drivers, warranty claims & doorstep bookings in Nagpur."
          onBookClick={() => onOpenBooking('doorstep', 'Support Page Doorstep Ticket')}
        />

      </div>
    </div>
  );
};
