'use client';

// Trip Map Component
// Interactive map showing the route with stadiums and activities

import { useEffect, useRef, useState } from 'react';
import { Itinerary } from '@/types';

interface TripMapProps {
  itinerary: Itinerary;
}

export default function TripMap({ itinerary }: TripMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [showStadiums, setShowStadiums] = useState(true);
  const [showActivities, setShowActivities] = useState(true);

  useEffect(() => {
    // In a real app, this would initialize Leaflet map
    // For now, we'll create a simple visual representation

    if (!mapRef.current) return;

    // This is a placeholder - in production you'd use:
    // import L from 'leaflet';
    // const map = L.map(mapRef.current).setView([39.8283, -98.5795], 4);
    // Add tiles, markers, polylines, etc.

  }, [itinerary]);

  // Collect all locations from itinerary
  const locations = itinerary.days.flatMap(day =>
    day.stops.map(stop => ({
      city: stop.city,
      state: stop.state,
      type: stop.type,
    }))
  );

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">
          Route Map
        </h3>

        {/* Toggle Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setShowStadiums(!showStadiums)}
            className={`text-sm px-3 py-1 rounded-full transition-colors ${
              showStadiums
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            ⚾ Stadiums
          </button>
          <button
            onClick={() => setShowActivities(!showActivities)}
            className={`text-sm px-3 py-1 rounded-full transition-colors ${
              showActivities
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            🎯 Activities
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div
        ref={mapRef}
        className="w-full h-[500px] bg-gradient-to-br from-blue-100 to-green-100 rounded-xl flex items-center justify-center relative overflow-hidden"
      >
        {/* Placeholder map visualization */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <svg
            className="w-full h-full opacity-20"
            viewBox="0 0 800 500"
            fill="none"
          >
            {/* Simple route line */}
            <path
              d="M 100 250 Q 250 150 400 250 T 700 250"
              stroke="#3B82F6"
              strokeWidth="4"
              fill="none"
              strokeDasharray="10,5"
            />

            {/* Location markers */}
            {[
              { x: 100, y: 250 },
              { x: 250, y: 150 },
              { x: 400, y: 250 },
              { x: 550, y: 150 },
              { x: 700, y: 250 },
            ].map((point, i) => (
              <g key={i}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="8"
                  fill="#3B82F6"
                  className="animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              </g>
            ))}
          </svg>

          <div className="relative z-10 text-center p-8 bg-white/80 backdrop-blur rounded-xl">
            <p className="text-2xl mb-2">🗺️</p>
            <p className="font-bold text-gray-800 mb-1">Interactive Map</p>
            <p className="text-sm text-gray-600">
              Full Leaflet map integration will load here
            </p>
            <div className="mt-4 text-left">
              <p className="text-xs font-semibold text-gray-700 mb-2">Route includes:</p>
              <div className="space-y-1">
                {Array.from(new Set(locations.map(l => `${l.city}, ${l.state}`))).slice(0, 5).map((loc, i) => (
                  <div key={i} className="text-xs text-gray-600">
                    📍 {loc}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span>Baseball Stadium</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span>Activity</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          <span>Accommodation</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-blue-400"></div>
          <span>Route</span>
        </div>
      </div>

      <p className="mt-3 text-xs text-gray-500 italic">
        💡 In the full version, you can click markers to see details and hover over route segments to see drive times
      </p>
    </div>
  );
}
