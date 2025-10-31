// This file defines all the data types used throughout the app
// Think of types as "templates" that describe what data should look like

// A baseball stadium
export interface Stadium {
  id: string;
  name: string;
  city: string;
  state: string;
  team: string;
  latitude: number;
  longitude: number;
  capacity: number;
  opened: number;
}

// A baseball game
export interface Game {
  id: string;
  stadiumId: string;
  homeTeam: string;
  awayTeam: string;
  date: string; // ISO date format
  time: string; // "7:00 PM"
  averageTicketPrice: number;
}

// An activity (sightseeing, golf, etc.)
export interface Activity {
  id: string;
  type: 'golf' | 'landmark' | 'museum' | 'nature' | 'food';
  name: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  estimatedCost: number;
  durationHours: number;
  description: string;
}

// Personal event (wedding, meeting, etc.)
export interface PersonalEvent {
  id: string;
  name: string;
  city: string;
  state: string;
  startDate: string;
  endDate: string;
  isFlexible: boolean;
}

// User preferences for the trip
export interface TripPreferences {
  driveTimeStrictness: 'strict' | 'flexible'; // Max drive time per day
  activityBalance: 'baseball-only' | 'balanced' | 'sightseeing-heavy';
  stadiumRepeats: 'dont-care' | 'prefer-new' | 'avoid-repeats';
  budget: number; // Total budget
  maxDriveHoursPerDay?: number;
}

// What the user told us about their trip
export interface TripRequest {
  startCity?: string;
  startState?: string;
  endCity?: string;
  endState?: string;
  startDate?: string;
  endDate?: string;
  durationDays?: number;
  budget?: number;
  visitedStadiums?: string[]; // Stadium IDs already visited
  avoidStadiums?: string[]; // Stadium IDs to avoid
  mustVisitStadiums?: string[]; // Stadium IDs they must see
  personalEvents?: PersonalEvent[];
  preferences?: TripPreferences;
  additionalRequests?: string; // "add golf courses", "small towns", etc.
}

// A single stop on the trip
export interface TripStop {
  type: 'game' | 'activity' | 'personal-event' | 'rest' | 'travel';
  date: string;
  game?: Game;
  activity?: Activity;
  personalEvent?: PersonalEvent;
  stadium?: Stadium;
  city: string;
  state: string;
  notes?: string;
}

// A day in the itinerary
export interface ItineraryDay {
  dayNumber: number;
  date: string;
  stops: TripStop[];
  travelFromPrevious?: {
    distanceMiles: number;
    durationHours: number;
    method: 'drive' | 'fly';
    estimatedCost: number;
  };
  accommodations?: {
    city: string;
    estimatedCost: number;
  };
  dailyCost: number;
  notes?: string;
}

// A complete trip itinerary
export interface Itinerary {
  id: string;
  type: 'best-overall' | 'fastest' | 'most-games';
  title: string;
  description: string;
  days: ItineraryDay[];
  totalCost: number;
  totalGames: number;
  totalActivities: number;
  totalDrivingMiles: number;
  totalDrivingHours: number;
  warnings?: string[]; // "8-hour drive on day 3", etc.
}

// The complete trip plan with multiple options
export interface TripPlan {
  request: TripRequest;
  itineraries: Itinerary[];
  createdAt: string;
}

// What the conversation AI extracts from user input
export interface ConversationExtraction {
  understood: TripRequest;
  confidence: 'high' | 'medium' | 'low';
  clarificationNeeded?: string[];
  suggestions?: string[];
}

// Chat message
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

// Conversation mode
export type ConversationMode = 'conversational' | 'quick';
