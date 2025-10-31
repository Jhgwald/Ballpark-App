'use client';

// Preferences Panel Component
// Comprehensive trip planning controls - all settings in one place

import { TripPreferences, TripRequest } from '@/types';
import { stadiums } from '@/data/stadiums';
import { useState } from 'react';

interface PreferencesPanelProps {
  preferences: TripPreferences;
  tripRequest: TripRequest;
  onChange: (preferences: TripPreferences, tripRequest: TripRequest) => void;
}

export default function PreferencesPanel({ preferences, tripRequest, onChange }: PreferencesPanelProps) {
  const [showStadiumPicker, setShowStadiumPicker] = useState(false);

  const updatePreference = <K extends keyof TripPreferences>(
    key: K,
    value: TripPreferences[K]
  ) => {
    onChange({ ...preferences, [key]: value }, tripRequest);
  };

  const updateTripRequest = <K extends keyof TripRequest>(
    key: K,
    value: TripRequest[K]
  ) => {
    onChange(preferences, { ...tripRequest, [key]: value });
  };

  const toggleStadium = (stadiumId: string) => {
    const current = tripRequest.visitedStadiums || [];
    const updated = current.includes(stadiumId)
      ? current.filter(id => id !== stadiumId)
      : [...current, stadiumId];
    updateTripRequest('visitedStadiums', updated);
  };

  return (
    <div className="card bg-gray-50">
      <h3 className="text-lg font-bold text-gray-800 mb-4">
        ⚙️ Trip Details & Preferences
      </h3>

      <div className="space-y-6">
        {/* Trip Basics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Start City */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Starting City
            </label>
            <input
              type="text"
              value={tripRequest.startCity || ''}
              onChange={(e) => updateTripRequest('startCity', e.target.value)}
              placeholder="e.g., New York"
              className="input w-full"
            />
          </div>

          {/* Start State */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <input
              type="text"
              value={tripRequest.startState || ''}
              onChange={(e) => updateTripRequest('startState', e.target.value)}
              placeholder="e.g., NY"
              className="input w-full"
              maxLength={2}
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={tripRequest.startDate || ''}
              onChange={(e) => updateTripRequest('startDate', e.target.value)}
              className="input w-full"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (days)
            </label>
            <input
              type="number"
              value={tripRequest.durationDays || ''}
              onChange={(e) => updateTripRequest('durationDays', parseInt(e.target.value) || 0)}
              placeholder="10"
              min="1"
              max="30"
              className="input w-full"
            />
          </div>
        </div>

        {/* Stadiums Already Visited */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stadiums I've Already Been To
          </label>
          <button
            onClick={() => setShowStadiumPicker(!showStadiumPicker)}
            className="btn btn-secondary w-full justify-between flex items-center"
          >
            <span>
              {(tripRequest.visitedStadiums?.length || 0) > 0
                ? `${tripRequest.visitedStadiums?.length} selected`
                : 'Select stadiums...'}
            </span>
            <svg className={`w-5 h-5 transition-transform ${showStadiumPicker ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          {showStadiumPicker && (
            <div className="mt-2 max-h-48 overflow-y-auto bg-white border border-gray-300 rounded-lg p-2">
              <div className="grid grid-cols-1 gap-1">
                {stadiums.map((stadium) => (
                  <button
                    key={stadium.id}
                    onClick={() => toggleStadium(stadium.id)}
                    className={`text-left px-3 py-2 rounded text-sm transition-colors ${
                      tripRequest.visitedStadiums?.includes(stadium.id)
                        ? 'bg-blue-100 text-blue-800 font-medium'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{stadium.name}</span>
                      {tripRequest.visitedStadiums?.includes(stadium.id) && (
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {stadium.team} • {stadium.city}, {stadium.state}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Budget Slider */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Total Budget: ${preferences.budget.toLocaleString()}
          </label>
          <input
            type="range"
            min="500"
            max="10000"
            step="100"
            value={preferences.budget}
            onChange={(e) => updatePreference('budget', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>$500</span>
            <span>$10,000</span>
          </div>
        </div>

        {/* Drive Time Strictness */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Drive Time Preference
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => updatePreference('driveTimeStrictness', 'strict')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                preferences.driveTimeStrictness === 'strict'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Strict
              <p className="text-xs opacity-80">Max 6h/day</p>
            </button>
            <button
              onClick={() => updatePreference('driveTimeStrictness', 'flexible')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                preferences.driveTimeStrictness === 'flexible'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Flexible
              <p className="text-xs opacity-80">Up to 10h/day</p>
            </button>
          </div>
        </div>

        {/* Activity Balance */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Activity Balance
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => updatePreference('activityBalance', 'baseball-only')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-colors ${
                preferences.activityBalance === 'baseball-only'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              ⚾ Only Baseball
            </button>
            <button
              onClick={() => updatePreference('activityBalance', 'balanced')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-colors ${
                preferences.activityBalance === 'balanced'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              ⚖️ Balanced
            </button>
            <button
              onClick={() => updatePreference('activityBalance', 'sightseeing-heavy')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-colors ${
                preferences.activityBalance === 'sightseeing-heavy'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              🏛️ Sightseeing
            </button>
          </div>
        </div>

        {/* Stadium Repeats */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stadium Visit Preference
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => updatePreference('stadiumRepeats', 'dont-care')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-colors ${
                preferences.stadiumRepeats === 'dont-care'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Any
            </button>
            <button
              onClick={() => updatePreference('stadiumRepeats', 'prefer-new')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-colors ${
                preferences.stadiumRepeats === 'prefer-new'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Prefer New
            </button>
            <button
              onClick={() => updatePreference('stadiumRepeats', 'avoid-repeats')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-colors ${
                preferences.stadiumRepeats === 'avoid-repeats'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Only New
            </button>
          </div>
        </div>

        {/* Max Drive Hours */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Drive per Day: {preferences.maxDriveHoursPerDay || 8} hours
          </label>
          <input
            type="range"
            min="4"
            max="12"
            step="1"
            value={preferences.maxDriveHoursPerDay || 8}
            onChange={(e) => updatePreference('maxDriveHoursPerDay', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>4h (relaxed)</span>
            <span>12h (intense)</span>
          </div>
        </div>
      </div>

      <div className="mt-6 p-3 bg-blue-50 rounded-lg text-xs text-gray-600">
        💡 Fill in your trip details above, then click "Plan My Trip" to see options
      </div>
    </div>
  );
}
