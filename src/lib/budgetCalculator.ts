// Budget calculator - estimates costs for trips
// Helps users understand what their trip will cost

export interface CostBreakdown {
  transportation: number;
  accommodations: number;
  food: number;
  tickets: number;
  activities: number;
  total: number;
}

export interface DailyCost {
  date: string;
  transportation: number;
  accommodations: number;
  food: number;
  tickets: number;
  activities: number;
  total: number;
}

// Average costs per category
const COSTS = {
  // Food per person per day
  foodPerDay: 60,

  // Accommodations (per night)
  hotelBudget: 100,
  hotelMid: 150,
  hotelNice: 250,

  // Transportation
  gasPerMile: 0.15, // Rough estimate including gas + wear
  flightShort: 200, // Under 500 miles
  flightMedium: 350, // 500-1500 miles
  flightLong: 500, // Over 1500 miles

  // Activities
  averageActivity: 50,
};

/**
 * Calculate transportation cost based on distance
 */
export const calculateTransportationCost = (
  distanceMiles: number,
  method: 'drive' | 'fly'
): number => {
  if (method === 'drive') {
    return distanceMiles * COSTS.gasPerMile;
  } else {
    // Flying
    if (distanceMiles < 500) return COSTS.flightShort;
    if (distanceMiles < 1500) return COSTS.flightMedium;
    return COSTS.flightLong;
  }
};

/**
 * Calculate accommodation cost
 */
export const calculateAccommodationCost = (
  nights: number,
  tier: 'budget' | 'mid' | 'nice' = 'mid'
): number => {
  const nightlyCost =
    tier === 'budget' ? COSTS.hotelBudget :
    tier === 'nice' ? COSTS.hotelNice :
    COSTS.hotelMid;

  return nights * nightlyCost;
};

/**
 * Calculate food cost
 */
export const calculateFoodCost = (days: number): number => {
  return days * COSTS.foodPerDay;
};

/**
 * Calculate total trip cost
 */
export const calculateTripCost = (
  days: number,
  totalMiles: number,
  numberOfGames: number,
  averageTicketPrice: number = 60,
  numberOfActivities: number = 0,
  transportationMethod: 'drive' | 'mixed' = 'drive'
): CostBreakdown => {
  // Transportation
  let transportation = 0;
  if (transportationMethod === 'drive') {
    transportation = totalMiles * COSTS.gasPerMile;
  } else {
    // Mixed - assume some driving, some flying
    const drivingMiles = totalMiles * 0.6;
    const flyingMiles = totalMiles * 0.4;
    transportation = calculateTransportationCost(drivingMiles, 'drive') +
                     calculateTransportationCost(flyingMiles, 'fly');
  }

  // Accommodations (nights = days - 1 usually)
  const nights = Math.max(days - 1, 0);
  const accommodations = calculateAccommodationCost(nights);

  // Food
  const food = calculateFoodCost(days);

  // Game tickets
  const tickets = numberOfGames * averageTicketPrice;

  // Activities
  const activities = numberOfActivities * COSTS.averageActivity;

  const total = transportation + accommodations + food + tickets + activities;

  return {
    transportation: Math.round(transportation),
    accommodations: Math.round(accommodations),
    food: Math.round(food),
    tickets: Math.round(tickets),
    activities: Math.round(activities),
    total: Math.round(total),
  };
};

/**
 * Check if a trip is within budget
 */
export const isWithinBudget = (estimatedCost: number, budget: number): boolean => {
  return estimatedCost <= budget;
};

/**
 * Calculate how much over/under budget
 */
export const getBudgetDifference = (estimatedCost: number, budget: number): number => {
  return budget - estimatedCost;
};

/**
 * Get budget tier name
 */
export const getBudgetTier = (totalBudget: number, days: number): string => {
  const perDay = totalBudget / days;

  if (perDay < 150) return 'Budget';
  if (perDay < 250) return 'Moderate';
  if (perDay < 400) return 'Comfortable';
  return 'Luxury';
};

/**
 * Suggest budget adjustments
 */
export const suggestBudgetAdjustments = (
  estimatedCost: number,
  budget: number
): string[] => {
  if (estimatedCost <= budget) return [];

  const overBudget = estimatedCost - budget;
  const percentOver = (overBudget / budget) * 100;

  const suggestions: string[] = [];

  if (percentOver > 30) {
    suggestions.push('Consider reducing the number of days');
    suggestions.push('Look into budget accommodations');
  }

  if (percentOver > 20) {
    suggestions.push('Skip some activities to save on costs');
    suggestions.push('Drive instead of flying where possible');
  }

  if (percentOver > 10) {
    suggestions.push('Find cheaper game tickets (upper deck seats)');
    suggestions.push('Pack lunches to reduce food costs');
  }

  return suggestions;
};
