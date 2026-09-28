import { ALL_NAGPUR_LOCATIONS } from './nagpurLocations';

export type BlogCategory = 'Hardware Tips replacement' | 'Software Fixes' | 'Technology News';

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface GeneratedBlogPost {
  id: string;
  title: string;
  actionKeyword: string;
  componentKeyword: string;
  locality: string;
  readTime: string;
  author: string;
  category: BlogCategory;
  summary: string;
  steps: {
    stepNum: number;
    heading: string;
    content: string;
  }[];
  proTip: string;
  phone: string;
  faqs: BlogFAQ[];
}

export const ACTION_TITLES = [
  'how to replace',
  'how to repair',
  'how to install',
  'how to fix'
] as const;

export const COMPONENT_CATEGORIES = [
  'ssd',
  'solid state drive',
  'hdd',
  'hard disk',
  'Ram',
  'motherboard',
  'battery',
  'cmos',
  'speaker',
  'charging point',
  'charging socket',
  'screen',
  'keyboard',
  'laptop body'
] as const;

export const PHONE_NUMBER = '7249430043';

// Capitalization helper
function capitalizeWords(str: string): string {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

// Generate step-by-step content dynamically per component & action
function generateSteps(action: string, component: string, locality: string) {
  const compUpper = component.toUpperCase();
  const compCap = capitalizeWords(component);

  if (action === 'how to replace') {
    return [
      {
        stepNum: 1,
        heading: `Initial Inspection & Safety Disconnection in ${locality}, Nagpur`,
        content: `Power off your computer or laptop in ${locality}, Nagpur. Remove external power cords, disconnect the internal battery, and ground yourself against ESD before touching the ${component}.`
      },
      {
        stepNum: 2,
        heading: `Unmounting Old ${compCap} Hardware`,
        content: `Carefully unscrew the laptop backplate or PC chassis panel in ${locality}, locate the damaged ${component}, disconnect ribbon/power cables, and safely release mounting brackets.`
      },
      {
        stepNum: 3,
        heading: `Installing Original 100% OEM Replacement ${compCap}`,
        content: `Insert the brand new genuine ${component} into the designated slot or socket. Ensure firm latching, reconnect all cables, and apply recommended thermal pads or insulation if applicable.`
      },
      {
        stepNum: 4,
        heading: `Power-On Testing & Calibration in ${locality}, Nagpur`,
        content: `Reattach the back cover, power on the system, enter BIOS/Diagnostics to verify hardware recognition, and call 7249430043 if you need immediate doorstep technician verification in ${locality}, Nagpur.`
      }
    ];
  } else if (action === 'how to repair') {
    return [
      {
        stepNum: 1,
        heading: `Fault Diagnosis & Multimeter Checks in ${locality}, Nagpur`,
        content: `Test power rails, continuity, and voltage signals around the ${component} circuit for your PC or laptop in ${locality}, Nagpur to isolate short circuits or broken solder joints.`
      },
      {
        stepNum: 2,
        heading: `Micro-Soldering & Component Level Rework`,
        content: `Use precision hot-air station, flux, and BGA soldering tools to repair damaged copper traces, clean oxidized pads, or resolder loose pins on the ${component}.`
      },
      {
        stepNum: 3,
        heading: `Ultrasonic Cleaning & Reassembly`,
        content: `Clean circuit boards using 99% Isopropyl Alcohol to remove flux residue, reassemble internal brackets, and secure internal shielding in ${locality}, Nagpur.`
      },
      {
        stepNum: 4,
        heading: `Stress Testing & On-Site Verification`,
        content: `Run continuous load tests for 30 minutes to ensure thermal stability and flawless functionality of your ${component}. Contact Sharon Infotech at 7249430043 for instant doorstep assistance.`
      }
    ];
  } else if (action === 'how to install') {
    return [
      {
        stepNum: 1,
        heading: `Pre-Installation Compatibility Check in ${locality}, Nagpur`,
        content: `Verify system bus compatibility, voltage requirements, and physical dimensions for adding a new ${component} to your laptop or desktop in ${locality}, Nagpur.`
      },
      {
        stepNum: 2,
        heading: `Physical Hardware Fitting & Cable Management`,
        content: `Mount the ${component} firmly in the expansion bay or M.2/DIMM slot, route internal cables neatly to prevent thermal airflow obstruction.`
      },
      {
        stepNum: 3,
        heading: `Driver Installation & Firmware Updates`,
        content: `Boot into Windows or macOS, install official OEM drivers, update device firmware to latest stable version, and configure optimal performance settings.`
      },
      {
        stepNum: 4,
        heading: `Benchmarking & Home Delivery Sign-off`,
        content: `Execute synthetic benchmarks to confirm 100% operational speed. Call Sharon Infotech at 7249430043 to schedule doorstep installation anywhere in ${locality}, Nagpur.`
      }
    ];
  } else {
    // how to fix
    return [
      {
        stepNum: 1,
        heading: `Troubleshooting Symptoms & Error Codes in ${locality}, Nagpur`,
        content: `Identify beep codes, blue screen errors, or mechanical glitches associated with the ${component} on your computer in ${locality}, Nagpur.`
      },
      {
        stepNum: 2,
        heading: `Software & Firmware Quick Fixes`,
        content: `Roll back or reinstall corrupted device drivers, clear CMOS settings, and perform Windows hardware diagnostic scans to resolve non-physical bugs.`
      },
      {
        stepNum: 3,
        heading: `Physical Connector Cleaning & Reseating`,
        content: `Open chassis, disconnect the ${component}, clean golden contact pins with an eraser or alcohol swab, and firmly re-seat into its motherboard socket.`
      },
      {
        stepNum: 4,
        heading: `Final Verification & On-Call Doorstep Support`,
        content: `Reboot system and verify error resolution. If hardware damage persists, call 7249430043 for Sharon Infotech's 30-minute doorstep repair technician in ${locality}, Nagpur.`
      }
    ];
  }
}

// Generate FAQs per post
function generateFaqs(action: string, component: string, locality: string): BlogFAQ[] {
  const titleText = `${action} ${component} in ${locality} in Nagpur`;
  const compCap = capitalizeWords(component);

  return [
    {
      question: `How long does it take to ${action} ${component} in ${locality}, Nagpur?`,
      answer: `Our certified Sharon Infotech technician can complete ${action} for ${component} in ${locality}, Nagpur within 30 to 45 minutes right at your doorstep or home office. Call 7249430043 to schedule instant service.`
    },
    {
      question: `What is the cost for ${action} ${component} in ${locality} in Nagpur?`,
      answer: `Visiting charges start at just ₹199 in ${locality}, Nagpur. Genuine ${component} replacement parts come with official manufacturer warranty. Call or WhatsApp 7249430043 for an exact cost quote.`
    },
    {
      question: `Do you provide doorstep pickup and home service in ${locality}, Nagpur?`,
      answer: `Yes! We offer 100% doorstep pick-and-drop and home computer repair across all locations in ${locality} and surrounding Nagpur areas. Contact 7249430043 anytime.`
    },
    {
      question: `Is warranty provided after ${action} ${component} in Nagpur?`,
      answer: `Absolutely. All hardware replacements (${component}) carry a 3-month to 3-year warranty backed by Sharon Infotech Nagpur. Call 7249430043 for warranty claims or support.`
    }
  ];
}

// Map component to broader category
function mapComponentToCategory(action: string, component: string): BlogCategory {
  if (action === 'how to install' || action === 'how to replace') {
    return 'Hardware Tips replacement';
  } else if (component === 'ssd' || component === 'hdd' || component === 'Ram' || component === 'motherboard') {
    return 'Hardware Tips replacement';
  } else if (action === 'how to fix') {
    return 'Software Fixes';
  } else {
    return 'Hardware Tips replacement';
  }
}

// Master list of top localities to combine for 1000+ posts
// We take all 220 localities from ALL_NAGPUR_LOCATIONS!
// 4 actions x 14 components x 20 localities = 1,120 pre-rendered posts!
// Plus dynamic query lookup support for all 220 localities!

const FEATURED_LOCALITIES = ALL_NAGPUR_LOCATIONS.slice(0, 25).map(l => l.name);

// Generate initial 1120+ structured blog posts
export const GENERATED_BLOG_POSTS: GeneratedBlogPost[] = [];

let postCount = 0;
for (const locObj of ALL_NAGPUR_LOCATIONS.slice(0, 22)) { // 22 localities x 56 = 1,232 posts
  const locality = locObj.name;
  for (const action of ACTION_TITLES) {
    for (const component of COMPONENT_CATEGORIES) {
      postCount++;
      const rawTitle = `${action} ${component} in ${locality} in Nagpur`;
      // Normalize Title with Proper Capitalization
      const formattedTitle = `${capitalizeWords(action)} ${component.toUpperCase() === 'SSD' || component.toUpperCase() === 'HDD' || component.toUpperCase() === 'RAM' || component.toUpperCase() === 'CMOS' ? component.toUpperCase() : capitalizeWords(component)} in ${locality} in Nagpur`;
      const id = `${action.replace(/\s+/g, '-')}-${component.replace(/\s+/g, '-')}-in-${locality.toLowerCase().replace(/[^a-z0-0]+/g, '-')}-in-nagpur`;

      const category = mapComponentToCategory(action, component);
      const phone = PHONE_NUMBER;

      GENERATED_BLOG_POSTS.push({
        id,
        title: formattedTitle,
        actionKeyword: action,
        componentKeyword: component,
        locality,
        readTime: '5 Min Read',
        author: 'Sharon Infotech Nagpur Hardware Lab',
        category,
        summary: `Complete doorstep technical guide on ${action} ${component} in ${locality}, Nagpur. Learn step-by-step DIY steps, cost estimates, safety tips, or book a 30-minute home repair technician in Nagpur by calling ${phone}.`,
        steps: generateSteps(action, component, locality),
        proTip: `For instant doorstep ${action} of ${component} in ${locality}, Nagpur, call 7249430043. Sharon Infotech offers same-day diagnosis and genuine spare parts guarantee.`,
        phone,
        faqs: generateFaqs(action, component, locality)
      });
    }
  }
}

// Helper function to dynamically generate a blog post on demand for ANY locality and ANY combination
export function getOrCreateBlogPost(idOrQuery: string): GeneratedBlogPost | null {
  // Try finding in pre-generated array
  const existing = GENERATED_BLOG_POSTS.find(p => p.id === idOrQuery || p.title.toLowerCase() === idOrQuery.toLowerCase());
  if (existing) return existing;

  // Try parsing from slug format: how-to-action-component-in-locality-in-nagpur
  const lower = idOrQuery.toLowerCase();
  
  // Match action
  const matchedAction = ACTION_TITLES.find(a => lower.includes(a.replace(/\s+/g, '-')) || lower.includes(a));
  const matchedComponent = COMPONENT_CATEGORIES.find(c => lower.includes(c.replace(/\s+/g, '-')) || lower.includes(c.toLowerCase()));
  const matchedLocalityObj = ALL_NAGPUR_LOCATIONS.find(l => lower.includes(l.id) || lower.includes(l.name.toLowerCase()));

  if (matchedAction && matchedComponent) {
    const locName = matchedLocalityObj ? matchedLocalityObj.name : 'Nagpur City';
    const formattedTitle = `${capitalizeWords(matchedAction)} ${matchedComponent.toUpperCase()} in ${locName} in Nagpur`;
    const id = `${matchedAction.replace(/\s+/g, '-')}-${matchedComponent.replace(/\s+/g, '-')}-in-${locName.toLowerCase().replace(/[^a-z0-0]+/g, '-')}-in-nagpur`;

    return {
      id,
      title: formattedTitle,
      actionKeyword: matchedAction,
      componentKeyword: matchedComponent,
      locality: locName,
      readTime: '5 Min Read',
      author: 'Sharon Infotech Technical Team',
      category: mapComponentToCategory(matchedAction, matchedComponent),
      summary: `Detailed guide on ${matchedAction} ${matchedComponent} in ${locName} in Nagpur. Get doorstep computer service within 30 minutes in Nagpur by calling 7249430043.`,
      steps: generateSteps(matchedAction, matchedComponent, locName),
      proTip: `Call 7249430043 for certified doorstep ${matchedAction} of ${matchedComponent} anywhere in ${locName}, Nagpur.`,
      phone: PHONE_NUMBER,
      faqs: generateFaqs(matchedAction, matchedComponent, locName)
    };
  }

  return null;
}
