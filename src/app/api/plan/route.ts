// API Route: /api/plan
// Generates trip plans based on user requirements

import { NextResponse } from 'next/server';
import { TripRequest, TripPlan } from '@/types';
import { generateTripPlan } from '@/lib/tripPlanner';

export async function POST(request: Request) {
  try {
    const tripRequest: TripRequest = await request.json();

    // Validate required fields
    if (!tripRequest.startCity && !tripRequest.startDate) {
      return NextResponse.json(
        { error: 'Missing required fields: startCity or startDate' },
        { status: 400 }
      );
    }

    // Generate trip plans
    const itineraries = generateTripPlan(tripRequest);

    const tripPlan: TripPlan = {
      request: tripRequest,
      itineraries,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(tripPlan);
  } catch (error) {
    console.error('Error generating trip plan:', error);
    return NextResponse.json(
      { error: 'Failed to generate trip plan: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

// GET endpoint for testing
export async function GET() {
  return NextResponse.json({
    message: 'Trip planning API is running',
    endpoints: {
      POST: '/api/plan - Generate a trip plan',
    },
  });
}
