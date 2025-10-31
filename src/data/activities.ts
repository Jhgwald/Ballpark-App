// Mock data for activities (golf, landmarks, museums, etc.)
// These would come from APIs like Google Places in a real app

import { Activity } from '@/types';

export const activities: Activity[] = [
  // Golf Courses
  {
    id: 'golf1',
    type: 'golf',
    name: 'Pebble Beach Golf Links',
    city: 'Pebble Beach',
    state: 'CA',
    latitude: 36.5681,
    longitude: -121.9500,
    estimatedCost: 595,
    durationHours: 5,
    description: 'World-famous coastal golf course',
  },
  {
    id: 'golf2',
    type: 'golf',
    name: 'Pinehurst Resort',
    city: 'Pinehurst',
    state: 'NC',
    latitude: 35.1954,
    longitude: -79.4689,
    estimatedCost: 400,
    durationHours: 5,
    description: 'Historic golf resort with multiple courses',
  },
  {
    id: 'golf3',
    type: 'golf',
    name: 'Torrey Pines Golf Course',
    city: 'San Diego',
    state: 'CA',
    latitude: 32.9028,
    longitude: -117.2522,
    estimatedCost: 250,
    durationHours: 5,
    description: 'Public course overlooking the Pacific',
  },

  // Landmarks
  {
    id: 'landmark1',
    type: 'landmark',
    name: 'Statue of Liberty',
    city: 'New York',
    state: 'NY',
    latitude: 40.6892,
    longitude: -74.0445,
    estimatedCost: 25,
    durationHours: 3,
    description: 'Iconic American monument',
  },
  {
    id: 'landmark2',
    type: 'landmark',
    name: 'Golden Gate Bridge',
    city: 'San Francisco',
    state: 'CA',
    latitude: 37.8199,
    longitude: -122.4783,
    estimatedCost: 0,
    durationHours: 2,
    description: 'Famous suspension bridge',
  },
  {
    id: 'landmark3',
    type: 'landmark',
    name: 'Gateway Arch',
    city: 'St. Louis',
    state: 'MO',
    latitude: 38.6247,
    longitude: -90.1848,
    estimatedCost: 15,
    durationHours: 2,
    description: '630-foot monument to westward expansion',
  },
  {
    id: 'landmark4',
    type: 'landmark',
    name: 'Space Needle',
    city: 'Seattle',
    state: 'WA',
    latitude: 47.6205,
    longitude: -122.3493,
    estimatedCost: 35,
    durationHours: 2,
    description: 'Iconic Seattle observation tower',
  },

  // Museums
  {
    id: 'museum1',
    type: 'museum',
    name: 'Metropolitan Museum of Art',
    city: 'New York',
    state: 'NY',
    latitude: 40.7794,
    longitude: -73.9632,
    estimatedCost: 30,
    durationHours: 4,
    description: 'World-class art museum',
  },
  {
    id: 'museum2',
    type: 'museum',
    name: 'Smithsonian National Air and Space Museum',
    city: 'Washington',
    state: 'DC',
    latitude: 38.8882,
    longitude: -77.0199,
    estimatedCost: 0,
    durationHours: 3,
    description: 'Free museum with aviation and space artifacts',
  },
  {
    id: 'museum3',
    type: 'museum',
    name: 'Rock and Roll Hall of Fame',
    city: 'Cleveland',
    state: 'OH',
    latitude: 41.5086,
    longitude: -81.6954,
    estimatedCost: 30,
    durationHours: 3,
    description: 'Museum celebrating rock music history',
  },
  {
    id: 'museum4',
    type: 'museum',
    name: 'Art Institute of Chicago',
    city: 'Chicago',
    state: 'IL',
    latitude: 41.8796,
    longitude: -87.6237,
    estimatedCost: 32,
    durationHours: 3,
    description: 'Major art museum with impressive collection',
  },

  // Nature
  {
    id: 'nature1',
    type: 'nature',
    name: 'Grand Canyon National Park',
    city: 'Grand Canyon',
    state: 'AZ',
    latitude: 36.1069,
    longitude: -112.1129,
    estimatedCost: 35,
    durationHours: 6,
    description: 'One of the Seven Natural Wonders',
  },
  {
    id: 'nature2',
    type: 'nature',
    name: 'Yosemite National Park',
    city: 'Yosemite Valley',
    state: 'CA',
    latitude: 37.8651,
    longitude: -119.5383,
    estimatedCost: 35,
    durationHours: 8,
    description: 'Stunning waterfalls and granite cliffs',
  },
  {
    id: 'nature3',
    type: 'nature',
    name: 'Niagara Falls',
    city: 'Niagara Falls',
    state: 'NY',
    latitude: 43.0828,
    longitude: -79.0763,
    estimatedCost: 25,
    durationHours: 3,
    description: 'Famous waterfall on US-Canada border',
  },
  {
    id: 'nature4',
    type: 'nature',
    name: 'Rocky Mountain National Park',
    city: 'Estes Park',
    state: 'CO',
    latitude: 40.3428,
    longitude: -105.6836,
    estimatedCost: 30,
    durationHours: 6,
    description: 'Majestic mountain scenery',
  },

  // Food destinations
  {
    id: 'food1',
    type: 'food',
    name: 'Reading Terminal Market',
    city: 'Philadelphia',
    state: 'PA',
    latitude: 39.9533,
    longitude: -75.1591,
    estimatedCost: 25,
    durationHours: 2,
    description: 'Historic indoor food market',
  },
  {
    id: 'food2',
    type: 'food',
    name: 'Pike Place Market',
    city: 'Seattle',
    state: 'WA',
    latitude: 47.6097,
    longitude: -122.3425,
    estimatedCost: 30,
    durationHours: 2,
    description: 'Famous public market with fresh seafood',
  },
  {
    id: 'food3',
    type: 'food',
    name: 'French Quarter',
    city: 'New Orleans',
    state: 'LA',
    latitude: 29.9584,
    longitude: -90.0644,
    estimatedCost: 50,
    durationHours: 4,
    description: 'Historic neighborhood with amazing cuisine',
  },
  {
    id: 'food4',
    type: 'food',
    name: 'Deep Dish Pizza Tour',
    city: 'Chicago',
    state: 'IL',
    latitude: 41.8781,
    longitude: -87.6298,
    estimatedCost: 35,
    durationHours: 3,
    description: 'Sample Chicago-style deep dish pizza',
  },
];

// Helper function to get activities by city
export const getActivitiesByCity = (city: string): Activity[] => {
  return activities.filter(a => a.city.toLowerCase() === city.toLowerCase());
};

// Helper function to get activities by type
export const getActivitiesByType = (type: Activity['type']): Activity[] => {
  return activities.filter(a => a.type === type);
};

// Helper function to get activities by state
export const getActivitiesByState = (state: string): Activity[] => {
  return activities.filter(a => a.state.toLowerCase() === state.toLowerCase());
};

// Helper function to find activities near a location
export const getActivitiesNearLocation = (
  latitude: number,
  longitude: number,
  radiusMiles: number = 50
): Activity[] => {
  // Simple distance calculation (not precise, but good enough for mock data)
  const milesPerDegree = 69; // Approximate

  return activities.filter(activity => {
    const latDiff = Math.abs(activity.latitude - latitude);
    const lonDiff = Math.abs(activity.longitude - longitude);
    const distance = Math.sqrt(latDiff ** 2 + lonDiff ** 2) * milesPerDegree;
    return distance <= radiusMiles;
  });
};
