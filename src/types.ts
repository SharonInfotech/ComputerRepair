export type DeviceType =
  | 'Laptop'
  | 'Desktop PC'
  | 'MacBook'
  | 'All-in-One PC'
  | 'Gaming Rig'
  | 'IMac'
  | 'Printer'
  | 'CCTV'
  | 'Data Recovery'
  | 'Networking'
  | 'IT AMC'
  | 'Smart Home & Biometrics';

export type ServiceMode = 'doorstep' | 'instore';

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface MapsGroundingPlace {
  title: string;
  uri: string;
  reviewSnippets?: string[];
}

export interface DiagnosticResult {
  probableCause: string;
  severity: 'Low' | 'Medium' | 'Critical';
  repairUrgency: string;
  estimatedPartsNeeded: string[];
  estimatedPriceRange: {
    min: number;
    max: number;
    currency: string;
  };
  estimatedTimeHours?: string;
  diagnosticSteps: string[];
  preventativeTips: string[];
  expertAdvice?: string;
  aiGenerated?: boolean;
  searchSources?: GroundingSource[];
}

export interface TicketLog {
  timestamp: string;
  text: string;
}

export interface RepairTicket {
  ticketId: string;
  customerName: string;
  phone?: string;
  email?: string;
  address?: string;
  device: string;
  issue: string;
  status: string;
  statusStage: number; // 1 to 5
  technician: string;
  receivedDate: string;
  estimatedCompletion: string;
  estimatedCost: string;
  serviceType: string;
  logs: TicketLog[];
}

export interface ServiceCategory {
  id: string;
  title: string;
  iconName: string;
  description: string;
  avgTime: string;
  startingPrice: number;
  popularFor: string[];
  warrantyDays: number;
}

export interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  pincode: string;
  deviceType: DeviceType;
  brand: string;
  model: string;
  serviceMode: ServiceMode;
  issueSummary: string;
  preferredDate: string;
  preferredTime: string;
}
