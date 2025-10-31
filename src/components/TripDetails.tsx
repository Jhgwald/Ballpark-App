'use client';

// Trip Details Component
// Shows day-by-day breakdown of the selected itinerary

import { Itinerary } from '@/types';

interface TripDetailsProps {
  itinerary: Itinerary;
}

export default function TripDetails({ itinerary }: TripDetailsProps) {
  return (
    <div className="card">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        Day-by-Day Breakdown
      </h3>

      <div className="space-y-4">
        {itinerary.days.map((day) => (
          <div
            key={day.dayNumber}
            className="border-l-4 border-primary pl-4 py-2"
          >
            {/* Day Header */}
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-bold text-lg text-gray-800">
                  Day {day.dayNumber}
                </h4>
                <p className="text-sm text-gray-600">
                  {new Date(day.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-600">Daily cost</p>
                <p className="font-bold text-green-600">
                  ${day.dailyCost.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Stops */}
            <div className="space-y-2 mt-3">
              {day.stops.map((stop, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  {/* Icon */}
                  <div className={`p-2 rounded-lg ${
                    stop.type === 'game' ? 'bg-blue-100 text-blue-600' :
                    stop.type === 'activity' ? 'bg-green-100 text-green-600' :
                    stop.type === 'travel' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {stop.type === 'game' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    )}
                    {stop.type === 'activity' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    )}
                    {stop.type === 'travel' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                      </svg>
                    )}
                    {stop.type === 'rest' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">
                      {stop.city}, {stop.state}
                    </p>
                    {stop.notes && (
                      <p className="text-sm text-gray-600 mt-1">
                        {stop.notes}
                      </p>
                    )}
                    {stop.game && (
                      <p className="text-xs text-gray-500 mt-1">
                        {stop.game.time} • ~${stop.game.averageTicketPrice} per ticket
                      </p>
                    )}
                    {stop.activity && (
                      <p className="text-xs text-gray-500 mt-1">
                        ~{stop.activity.durationHours}h • ${stop.activity.estimatedCost}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Accommodation */}
            {day.accommodations && (
              <div className="mt-3 p-2 bg-purple-50 rounded text-sm">
                🏨 Overnight in {day.accommodations.city} • ${day.accommodations.estimatedCost}
              </div>
            )}

            {/* Notes */}
            {day.notes && (
              <div className="mt-2 text-sm text-gray-600 italic">
                💡 {day.notes}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl">
        <h4 className="font-bold text-gray-800 mb-3">Trip Summary</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-primary">{itinerary.totalGames}</p>
            <p className="text-sm text-gray-600">Games</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">{itinerary.totalActivities}</p>
            <p className="text-sm text-gray-600">Activities</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-orange-600">{itinerary.days.length}</p>
            <p className="text-sm text-gray-600">Days</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">${itinerary.totalCost.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Total Cost</p>
          </div>
        </div>
      </div>
    </div>
  );
}
