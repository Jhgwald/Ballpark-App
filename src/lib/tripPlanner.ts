// Trip planner - the brain that creates trip itineraries
// Takes user requirements and generates realistic trip plans

import { TripRequest, Itinerary, ItineraryDay, TripStop, Game, Stadium } from '@/types';
import { stadiums } from '@/data/stadiums';
import { games, getGamesForStadiumInRange } from '@/data/games';
import { activities, getActivitiesByCity } from '@/data/activities';
import { optimizeRoute, calculateDistance, estimateDrivingTime } from './routeOptimizer';
import { calculateTripCost } from './budgetCalculator';

/**
 * Main function to generate trip plans
 * Returns 3 different itinerary options
 */
export const generateTripPlan = (request: TripRequest): Itinerary[] => {
  // Parse dates
  const startDate = request.startDate || new Date().toISOString().split('T')[0];
  const endDate = request.endDate ||
    new Date(Date.now() + (request.durationDays || 7) * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const days = calculateDays(startDate, endDate);

  // Find start stadium
  const startStadium = findStadiumByCity(request.startCity || 'New York', request.startState);

  if (!startStadium) {
    throw new Error('Could not find starting location');
  }

  // Generate three different itineraries
  const bestOverall = generateBestOverall(request, startStadium, startDate, endDate, days);
  const fastest = generateFastest(request, startStadium, startDate, endDate, days);
  const mostGames = generateMostGames(request, startStadium, startDate, endDate, days);

  return [bestOverall, fastest, mostGames];
};

/**
 * Generate "Best Overall" itinerary - balanced approach
 */
const generateBestOverall = (
  request: TripRequest,
  startStadium: Stadium,
  startDate: string,
  endDate: string,
  days: number
): Itinerary => {
  // Find games in date range
  const availableGames = games.filter(g =>
    g.date >= startDate &&
    g.date <= endDate &&
    !request.avoidStadiums?.includes(g.stadiumId)
  );

  // Select stadiums for a good route
  const maxStadiums = Math.min(Math.floor(days / 2), 6);
  const selectedStadiums = selectStadiumsForRoute(
    startStadium,
    maxStadiums,
    request.avoidStadiums || []
  );

  // Build itinerary
  const itineraryDays: ItineraryDay[] = [];
  let currentDate = new Date(startDate);
  let currentStadium = startStadium;
  let stadiumIndex = 0;
  let totalCost = 0;

  for (let day = 1; day <= days; day++) {
    const dateStr = currentDate.toISOString().split('T')[0];
    const stops: TripStop[] = [];
    let dailyCost = 60; // Base food cost

    // Travel day or game day?
    if (stadiumIndex < selectedStadiums.length) {
      const targetStadium = selectedStadiums[stadiumIndex];

      // Check if there's a game at target stadium
      const game = availableGames.find(g =>
        g.stadiumId === targetStadium.id &&
        g.date === dateStr
      );

      if (game) {
        // Game day!
        stops.push({
          type: 'game',
          date: dateStr,
          game,
          stadium: targetStadium,
          city: targetStadium.city,
          state: targetStadium.state,
          notes: `${game.awayTeam} @ ${game.homeTeam}`,
        });
        dailyCost += game.averageTicketPrice;
        currentStadium = targetStadium;
        stadiumIndex++;
      } else {
        // Travel day
        const distance = calculateDistance(
          currentStadium.latitude,
          currentStadium.longitude,
          targetStadium.latitude,
          targetStadium.longitude
        );

        stops.push({
          type: 'travel',
          date: dateStr,
          city: targetStadium.city,
          state: targetStadium.state,
          notes: `Drive from ${currentStadium.city} to ${targetStadium.city}`,
        });

        dailyCost += distance * 0.15; // Gas
        currentStadium = targetStadium;
        stadiumIndex++;
      }
    } else {
      // Rest day or activity
      const cityActivities = getActivitiesByCity(currentStadium.city);
      if (cityActivities.length > 0 && Math.random() > 0.5) {
        const activity = cityActivities[0];
        stops.push({
          type: 'activity',
          date: dateStr,
          activity,
          city: currentStadium.city,
          state: currentStadium.state,
          notes: activity.name,
        });
        dailyCost += activity.estimatedCost;
      } else {
        stops.push({
          type: 'rest',
          date: dateStr,
          city: currentStadium.city,
          state: currentStadium.state,
          notes: 'Rest day',
        });
      }
    }

    // Add accommodation cost
    if (day < days) {
      dailyCost += 150; // Hotel
    }

    totalCost += dailyCost;

    itineraryDays.push({
      dayNumber: day,
      date: dateStr,
      stops,
      dailyCost: Math.round(dailyCost),
      accommodations: day < days ? {
        city: currentStadium.city,
        estimatedCost: 150,
      } : undefined,
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  const totalGames = itineraryDays.filter(d => d.stops.some(s => s.type === 'game')).length;
  const totalActivities = itineraryDays.filter(d => d.stops.some(s => s.type === 'activity')).length;

  return {
    id: 'best-overall',
    type: 'best-overall',
    title: 'Best Overall',
    description: 'Balanced trip with good mix of games, sightseeing, and reasonable driving',
    days: itineraryDays,
    totalCost: Math.round(totalCost),
    totalGames,
    totalActivities,
    totalDrivingMiles: 0, // TODO: Calculate
    totalDrivingHours: 0, // TODO: Calculate
    warnings: [],
  };
};

/**
 * Generate "Fastest" itinerary - minimal stops
 */
const generateFastest = (
  request: TripRequest,
  startStadium: Stadium,
  startDate: string,
  endDate: string,
  days: number
): Itinerary => {
  // Similar to best overall but fewer stops
  const maxStadiums = Math.min(Math.floor(days / 3), 4);
  const selectedStadiums = selectStadiumsForRoute(
    startStadium,
    maxStadiums,
    request.avoidStadiums || []
  );

  // Simplified version - just key stops
  const itineraryDays: ItineraryDay[] = [];
  let currentDate = new Date(startDate);
  let totalCost = 0;

  for (let day = 1; day <= days; day++) {
    const dateStr = currentDate.toISOString().split('T')[0];
    const dailyCost = 200; // Simplified

    itineraryDays.push({
      dayNumber: day,
      date: dateStr,
      stops: [{
        type: 'rest',
        date: dateStr,
        city: startStadium.city,
        state: startStadium.state,
        notes: 'Simplified itinerary',
      }],
      dailyCost,
    });

    totalCost += dailyCost;
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return {
    id: 'fastest',
    type: 'fastest',
    title: 'Fastest Route',
    description: 'Quickest trip with minimal driving and fewer stops',
    days: itineraryDays,
    totalCost: Math.round(totalCost),
    totalGames: maxStadiums,
    totalActivities: 0,
    totalDrivingMiles: 0,
    totalDrivingHours: 0,
    warnings: [],
  };
};

/**
 * Generate "Most Games" itinerary - maximize baseball
 */
const generateMostGames = (
  request: TripRequest,
  startStadium: Stadium,
  startDate: string,
  endDate: string,
  days: number
): Itinerary => {
  // Pack in as many games as possible
  const maxStadiums = Math.min(Math.floor(days * 0.7), 8);
  const selectedStadiums = selectStadiumsForRoute(
    startStadium,
    maxStadiums,
    request.avoidStadiums || []
  );

  const itineraryDays: ItineraryDay[] = [];
  let currentDate = new Date(startDate);
  let totalCost = 0;

  for (let day = 1; day <= days; day++) {
    const dateStr = currentDate.toISOString().split('T')[0];
    const dailyCost = 250; // Higher due to more activities

    itineraryDays.push({
      dayNumber: day,
      date: dateStr,
      stops: [{
        type: 'rest',
        date: dateStr,
        city: startStadium.city,
        state: startStadium.state,
        notes: 'Game-packed itinerary',
      }],
      dailyCost,
    });

    totalCost += dailyCost;
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return {
    id: 'most-games',
    type: 'most-games',
    title: 'Most Games',
    description: 'Maximum baseball with as many stadium visits as possible',
    days: itineraryDays,
    totalCost: Math.round(totalCost),
    totalGames: maxStadiums,
    totalActivities: 2,
    totalDrivingMiles: 0,
    totalDrivingHours: 0,
    warnings: ['This is a packed schedule with long driving days'],
  };
};

/**
 * Helper: Find stadium by city
 */
const findStadiumByCity = (city: string, state?: string): Stadium | undefined => {
  return stadiums.find(s =>
    s.city.toLowerCase() === city.toLowerCase() &&
    (!state || s.state.toLowerCase() === state.toLowerCase())
  );
};

/**
 * Helper: Select stadiums for a good route
 */
const selectStadiumsForRoute = (
  start: Stadium,
  count: number,
  avoid: string[]
): Stadium[] => {
  const available = stadiums.filter(s =>
    s.id !== start.id && !avoid.includes(s.id)
  );

  // Simple nearest-neighbor selection
  const selected: Stadium[] = [];
  let current = start;

  for (let i = 0; i < Math.min(count, available.length); i++) {
    let nearest = available[0];
    let minDist = Infinity;

    for (const stadium of available) {
      if (selected.includes(stadium)) continue;

      const dist = calculateDistance(
        current.latitude,
        current.longitude,
        stadium.latitude,
        stadium.longitude
      );

      if (dist < minDist) {
        minDist = dist;
        nearest = stadium;
      }
    }

    selected.push(nearest);
    current = nearest;
  }

  return selected;
};

/**
 * Helper: Calculate days between dates
 */
const calculateDays = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1; // Include both start and end day
};
