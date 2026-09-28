import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: NextRequest) {
  try {
    const { issueDescription, deviceType, brand } = await req.json();

    if (!issueDescription) {
      return NextResponse.json(
        { error: 'Issue description is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Fallback response if API key is not configured
      return NextResponse.json({
        diagnosis: `Diagnostic result for ${brand || ''} ${deviceType || 'device'}: ${issueDescription}.`,
        estimatedCost: '₹1,200 - ₹3,500',
        estimatedTime: '2 - 4 hours',
        urgency: 'Medium',
        recommendedAction: 'Schedule a doorstep engineer inspection with Sharon Infotech Nagpur.',
        isFallback: true
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const prompt = `You are a chief hardware engineer at Sharon Infotech Computer & Laptop Repair Center in Nagpur, India.
A customer has reported the following computer/laptop issue:
- Device: ${brand || 'Unknown Brand'} ${deviceType || 'Laptop/PC'}
- Issue: "${issueDescription}"

Analyze this issue and return a concise, highly professional diagnostic summary in valid JSON format only with these keys:
- "diagnosis": A 2-sentence explanation of the probable root cause (hardware/software/chip level).
- "estimatedCost": Realistic repair cost estimate in Indian Rupees (e.g. "₹800 - ₹2,200").
- "estimatedTime": Estimated repair turnaround time (e.g. "1 - 3 Hours (Doorstep)" or "Same Day Lab Repair").
- "urgency": "High", "Medium", or "Low".
- "recommendedAction": Clear recommended next step for the customer in Nagpur.

Return ONLY the raw JSON object, no markdown formatting.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text || '';
    const cleanJsonText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const data = JSON.parse(cleanJsonText);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Gemini diagnostic error:', error);
    return NextResponse.json({
      diagnosis: 'Potential hardware or component circuit fault detected.',
      estimatedCost: '₹1,500 - ₹3,800',
      estimatedTime: '2 - 5 Hours',
      urgency: 'High',
      recommendedAction: 'Book Sharon Infotech doorstep engineer visit in Nagpur.',
      isFallback: true
    });
  }
}
