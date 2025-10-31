'use client';

// Summary Chips Component
// Shows "I heard..." summary with editable details

import { TripRequest } from '@/types';

interface SummaryChipsProps {
  request: TripRequest;
  onEdit: (field: keyof TripRequest, value: any) => void;
}

export default function SummaryChips({ request, onEdit }: SummaryChipsProps) {
  if (Object.keys(request).length === 0) return null;

  return (
    <div className="card bg-blue-50 border-blue-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        📋 I heard...
      </h3>

      <div className="flex flex-wrap gap-2">
        {/* Start City */}
        {request.startCity && (
          <div className="chip-editable">
            <span className="text-xs text-gray-600">From:</span>
            <span className="font-semibold">{request.startCity}, {request.startState}</span>
            <button
              onClick={() => {
                const newCity = prompt('Edit start city:', request.startCity);
                if (newCity) onEdit('startCity', newCity);
              }}
              className="text-blue-600 hover:text-blue-800"
            >
              ✏️
            </button>
          </div>
        )}

        {/* Duration */}
        {request.durationDays && (
          <div className="chip-editable">
            <span className="text-xs text-gray-600">Duration:</span>
            <span className="font-semibold">{request.durationDays} days</span>
            <button
              onClick={() => {
                const newDuration = prompt('Edit duration (days):', String(request.durationDays));
                if (newDuration) onEdit('durationDays', parseInt(newDuration));
              }}
              className="text-blue-600 hover:text-blue-800"
            >
              ✏️
            </button>
          </div>
        )}

        {/* Dates */}
        {request.startDate && (
          <div className="chip-editable">
            <span className="text-xs text-gray-600">Start:</span>
            <span className="font-semibold">{new Date(request.startDate).toLocaleDateString()}</span>
            <button
              onClick={() => {
                const newDate = prompt('Edit start date (YYYY-MM-DD):', request.startDate);
                if (newDate) onEdit('startDate', newDate);
              }}
              className="text-blue-600 hover:text-blue-800"
            >
              ✏️
            </button>
          </div>
        )}

        {/* Budget */}
        {request.budget && (
          <div className="chip-editable">
            <span className="text-xs text-gray-600">Budget:</span>
            <span className="font-semibold">${request.budget.toLocaleString()}</span>
            <button
              onClick={() => {
                const newBudget = prompt('Edit budget ($):', String(request.budget));
                if (newBudget) onEdit('budget', parseInt(newBudget));
              }}
              className="text-blue-600 hover:text-blue-800"
            >
              ✏️
            </button>
          </div>
        )}

        {/* Avoided Stadiums */}
        {request.avoidStadiums && request.avoidStadiums.length > 0 && (
          <div className="chip bg-red-100 text-red-800">
            <span className="text-xs text-red-600">Avoiding:</span>
            <span className="font-semibold">{request.avoidStadiums.length} stadium(s)</span>
          </div>
        )}

        {/* Must Visit Stadiums */}
        {request.mustVisitStadiums && request.mustVisitStadiums.length > 0 && (
          <div className="chip bg-green-100 text-green-800">
            <span className="text-xs text-green-600">Must see:</span>
            <span className="font-semibold">{request.mustVisitStadiums.length} stadium(s)</span>
          </div>
        )}
      </div>

      <p className="text-xs text-gray-600 mt-3">
        Click the pencil icons to edit any details
      </p>
    </div>
  );
}
