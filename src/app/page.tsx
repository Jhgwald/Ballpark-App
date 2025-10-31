'use client';

// Main Page - Road Trip Planner
// Brings together all components into a cohesive experience

import { useState } from 'react';
import ConversationInput from '@/components/ConversationInput';
import ItineraryOptions from '@/components/ItineraryOptions';
import TripMap from '@/components/TripMap';
import PreferencesPanel from '@/components/PreferencesPanel';
import { TripRequest, TripPlan, TripPreferences, ConversationMode } from '@/types';

export default function Home() {
  // State
  const [conversationMode, setConversationMode] = useState<ConversationMode>('conversational');
  const [tripRequest, setTripRequest] = useState<TripRequest>({});
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preferences, setPreferences] = useState<TripPreferences>({
    driveTimeStrictness: 'flexible',
    activityBalance: 'balanced',
    stadiumRepeats: 'prefer-new',
    budget: 3000,
    maxDriveHoursPerDay: 8,
  });

  // Handle user message submission
  const handleMessageSubmit = async (message: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Step 1: Extract trip details from conversation
      const chatResponse = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      if (!chatResponse.ok) {
        throw new Error('Failed to process message');
      }

      const extraction = await chatResponse.json();

      // Update trip request with extracted data
      const updatedRequest = {
        ...tripRequest,
        ...extraction.understood,
        preferences,
      };
      setTripRequest(updatedRequest);

      // Step 2: Generate trip plan if we have enough info
      if (extraction.confidence === 'high' || conversationMode === 'quick') {
        await generateTripPlan(updatedRequest);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Generate trip plan
  const generateTripPlan = async (request: TripRequest) => {
    try {
      const planResponse = await fetch('/api/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...request, preferences }),
      });

      if (!planResponse.ok) {
        throw new Error('Failed to generate trip plan');
      }

      const plan = await planResponse.json();
      setTripPlan(plan);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate plan');
    }
  };

  // Edit trip request field
  const handleEditRequest = (field: keyof TripRequest, value: any) => {
    const updatedRequest = { ...tripRequest, [field]: value };
    setTripRequest(updatedRequest);

    // Regenerate plan if we already have one
    if (tripPlan) {
      generateTripPlan(updatedRequest);
    }
  };

  // Update preferences and trip request
  const handlePreferencesChange = (newPreferences: TripPreferences, newTripRequest: TripRequest) => {
    setPreferences(newPreferences);
    setTripRequest(newTripRequest);

    // Regenerate plan if we have one
    if (tripPlan) {
      generateTripPlan(newTripRequest);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            ⚾ Ballpark Trip Planner
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Plan your perfect baseball road trip with AI assistance
          </p>

          {/* Mode Toggle */}
          <div className="inline-flex items-center gap-2 p-1 bg-gray-200 rounded-lg">
            <button
              onClick={() => setConversationMode('conversational')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                conversationMode === 'conversational'
                  ? 'bg-white text-gray-900 shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              💬 Conversational
            </button>
            <button
              onClick={() => setConversationMode('quick')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                conversationMode === 'quick'
                  ? 'bg-white text-gray-900 shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              ⚡ Quick Mode
            </button>
          </div>
        </header>

        {/* Conversation Input */}
        <section>
          <ConversationInput
            onSubmit={handleMessageSubmit}
            isLoading={isLoading}
          />
        </section>

        {/* Error Display */}
        {error && (
          <div className="card bg-red-50 border-red-200">
            <p className="text-red-800">
              ❌ {error}
            </p>
          </div>
        )}

        {/* Preferences Panel - Always visible */}
        <section>
          <PreferencesPanel
            preferences={preferences}
            tripRequest={tripRequest}
            onChange={handlePreferencesChange}
          />
        </section>

        {/* Trip Plan Results */}
        {tripPlan && (
          <>
            {/* Itinerary Options */}
            <section>
              <ItineraryOptions itineraries={tripPlan.itineraries} />
            </section>

            {/* Map */}
            <section>
              <TripMap itinerary={tripPlan.itineraries[0]} />
            </section>

            {/* Action Buttons */}
            <section className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  // Reset and start over
                  setTripPlan(null);
                  setTripRequest({});
                }}
                className="btn btn-secondary px-8 py-3"
              >
                Start Over
              </button>
              <button
                onClick={() => {
                  alert('In the full version, this would let you book hotels, buy tickets, and export your itinerary!');
                }}
                className="btn btn-primary px-8 py-3"
              >
                Save & Export Trip
              </button>
            </section>
          </>
        )}

        {/* Loading State */}
        {isLoading && !tripPlan && (
          <div className="card text-center py-12">
            <div className="animate-spin w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-xl font-semibold text-gray-800">
              Planning your perfect road trip...
            </p>
            <p className="text-gray-600 mt-2">
              Finding the best routes, games, and activities
            </p>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 pt-8 border-t">
          <p>
            Built with Next.js, TypeScript, and Tailwind CSS
          </p>
          <p className="mt-1">
            Mock data used for demonstration • No real bookings or payments
          </p>
        </footer>
      </div>
    </div>
  );
}
