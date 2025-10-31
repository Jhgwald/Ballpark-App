'use client';

// Preferences Panel Component
// Allows users to adjust trip preferences with sliders and toggles

import { TripPreferences } from '@/types';

interface PreferencesPanelProps {
  preferences: TripPreferences;
  onChange: (preferences: TripPreferences) => void;
}

export default function PreferencesPanel({ preferences, onChange }: PreferencesPanelProps) {
  const updatePreference = <K extends keyof TripPreferences>(
    key: K,
    value: TripPreferences[K]
  ) => {
    onChange({ ...preferences, [key]: value });
  };

  return (
    <div className="card bg-gray-50">
      <h3 className="text-lg font-bold text-gray-800 mb-4">
        ⚙️ Preferences
      </h3>

      <div className="space-y-6">
        {/* Drive Time Strictness */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Drive Time
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
            Stadium Visits
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
        💡 Adjust these preferences to customize your trip plan
      </div>
    </div>
  );
}
