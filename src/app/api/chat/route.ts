// API Route: /api/chat
// Handles conversational input and extracts trip details
// In a real app, this would use an AI model like GPT

import { NextResponse } from 'next/server';
import { ConversationExtraction, TripRequest } from '@/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, conversationHistory } = body;

    // Mock AI extraction - in real app, would use OpenAI/Anthropic API
    const extraction = extractTripDetails(message);

    return NextResponse.json(extraction);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}

/**
 * Mock AI function that extracts trip details from natural language
 * In a real app, this would call GPT-4, Claude, etc.
 */
function extractTripDetails(message: string): ConversationExtraction {
  const lower = message.toLowerCase();
  const understood: TripRequest = {};

  // Extract duration
  const dayMatches = message.match(/(\d+)[\s-]*(day|days)/i);
  if (dayMatches) {
    understood.durationDays = parseInt(dayMatches[1]);
  }

  // Extract months
  const months = ['january', 'february', 'march', 'april', 'may', 'june',
                  'july', 'august', 'september', 'october', 'november', 'december'];

  for (let i = 0; i < months.length; i++) {
    if (lower.includes(months[i])) {
      // Set approximate dates for that month
      const year = new Date().getFullYear();
      understood.startDate = `${year}-${String(i + 1).padStart(2, '0')}-01`;

      if (understood.durationDays) {
        const endDate = new Date(understood.startDate);
        endDate.setDate(endDate.getDate() + understood.durationDays);
        understood.endDate = endDate.toISOString().split('T')[0];
      }
      break;
    }
  }

  // Extract cities
  const cities: Record<string, { city: string; state: string }> = {
    'new york': { city: 'New York', state: 'NY' },
    'boston': { city: 'Boston', state: 'MA' },
    'chicago': { city: 'Chicago', state: 'IL' },
    'los angeles': { city: 'Los Angeles', state: 'CA' },
    'san francisco': { city: 'San Francisco', state: 'CA' },
    'seattle': { city: 'Seattle', state: 'WA' },
    'miami': { city: 'Miami', state: 'FL' },
    'denver': { city: 'Denver', state: 'CO' },
    'atlanta': { city: 'Atlanta', state: 'GA' },
    'detroit': { city: 'Detroit', state: 'MI' },
  };

  // Look for "from" city
  const fromMatch = message.match(/from\s+([a-z\s]+?)(?:\s+to|\s+but|\s+and|,|$)/i);
  if (fromMatch) {
    const cityName = fromMatch[1].trim().toLowerCase();
    if (cities[cityName]) {
      understood.startCity = cities[cityName].city;
      understood.startState = cities[cityName].state;
    }
  }

  // Extract budget
  const budgetMatch = message.match(/\$?\s*(\d{1,3},?\d{0,3})\s*(budget|total|dollars)?/i);
  if (budgetMatch) {
    understood.budget = parseInt(budgetMatch[1].replace(',', ''));
  }

  // Extract avoided stadiums
  if (lower.includes('avoid') || lower.includes('already been') || lower.includes("i've been")) {
    understood.avoidStadiums = [];

    if (lower.includes('wrigley')) understood.avoidStadiums.push('wrigley');
    if (lower.includes('fenway')) understood.avoidStadiums.push('fenway');
    if (lower.includes('yankee')) understood.avoidStadiums.push('yankee');
    if (lower.includes('dodger')) understood.avoidStadiums.push('dodger');
  }

  // Determine confidence
  let confidence: 'high' | 'medium' | 'low' = 'low';
  const extractedFields = Object.keys(understood).length;

  if (extractedFields >= 4) confidence = 'high';
  else if (extractedFields >= 2) confidence = 'medium';

  // Generate clarification questions
  const clarificationNeeded: string[] = [];
  if (!understood.startCity) clarificationNeeded.push('Where are you starting from?');
  if (!understood.startDate && !understood.durationDays) {
    clarificationNeeded.push('When do you want to travel and for how long?');
  }
  if (!understood.budget) clarificationNeeded.push('What\'s your total budget?');

  // Generate suggestions
  const suggestions: string[] = [];
  if (understood.startCity && understood.durationDays) {
    suggestions.push('Based on your location and duration, I can suggest a great route!');
  }
  if (understood.budget && understood.budget < 1000) {
    suggestions.push('For this budget, consider a shorter trip or nearby stadiums');
  }

  return {
    understood,
    confidence,
    clarificationNeeded: clarificationNeeded.length > 0 ? clarificationNeeded : undefined,
    suggestions: suggestions.length > 0 ? suggestions : undefined,
  };
}
