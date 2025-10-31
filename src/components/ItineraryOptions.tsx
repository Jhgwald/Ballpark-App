'use client';

// Itinerary Options Component
// Displays the 3 trip options: Best Overall, Fastest, Most Games

import { Itinerary } from '@/types';
import { useState } from 'react';
import TripDetails from './TripDetails';

interface ItineraryOptionsProps {
  itineraries: Itinerary[];
}

export default function ItineraryOptions({ itineraries }: ItineraryOptionsProps) {
  const [selectedId, setSelectedId] = useState<string>(itineraries[0]?.id || '');

  const selectedItinerary = itineraries.find(i => i.id === selectedId);

  return (
    <div className="space-y-6">
      {/* Option Cards */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Choose Your Adventure
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {itineraries.map((itinerary) => (
            <button
              key={itinerary.id}
              onClick={() => setSelectedId(itinerary.id)}
              className={`card text-left transition-all duration-200 hover:shadow-xl ${
                selectedId === itinerary.id
                  ? 'ring-2 ring-primary border-primary'
                  : 'hover:border-gray-300'
              }`}
            >
              {/* Icon */}
              <div className="flex items-start justify-between mb-3">
                <div className={`p-3 rounded-lg ${
                  itinerary.type === 'best-overall' ? 'bg-blue-100' :
                  itinerary.type === 'fastest' ? 'bg-green-100' :
                  'bg-orange-100'
                }`}>
                  {itinerary.type === 'best-overall' && (
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  )}
                  {itinerary.type === 'fastest' && (
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  )}
                  {itinerary.type === 'most-games' && (
                    <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>

                {selectedId === itinerary.id && (
                  <div className="text-primary">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Title and Description */}
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {itinerary.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {itinerary.description}
              </p>

              {/* Stats */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Games:</span>
                  <span className="font-semibold">{itinerary.totalGames}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Activities:</span>
                  <span className="font-semibold">{itinerary.totalActivities}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Cost:</span>
                  <span className="font-semibold text-green-600">
                    ${itinerary.totalCost.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Warnings */}
              {itinerary.warnings && itinerary.warnings.length > 0 && (
                <div className="mt-3 p-2 bg-yellow-50 rounded text-xs text-yellow-800">
                  ⚠️ {itinerary.warnings[0]}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Detailed View */}
      {selectedItinerary && (
        <TripDetails itinerary={selectedItinerary} />
      )}
    </div>
  );
}
