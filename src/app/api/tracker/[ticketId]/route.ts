import { NextRequest, NextResponse } from 'next/server';

const repairTickets: Record<string, any> = {
  'FIX-1093': {
    ticketId: 'FIX-1093',
    customerName: 'Aarav Sharma (Dharampeth, Nagpur)',
    device: 'Apple MacBook Air M1 (2020)',
    issue: 'Liquid spill on keyboard, trackpad non-responsive',
    status: 'In Repair',
    statusStage: 3,
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
      { timestamp: '2026-07-24 09:30 AM', text: 'Initial motherboard voltage testing underway.' }
    ]
  }
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ ticketId: string }> }
) {
  const resolvedParams = await params;
  const id = (resolvedParams.ticketId || '').toUpperCase();
  const ticket = repairTickets[id];

  if (!ticket) {
    return NextResponse.json(
      { error: `Ticket #${id} not found in Sharon Infotech database.` },
      { status: 404 }
    );
  }

  return NextResponse.json(ticket);
}
