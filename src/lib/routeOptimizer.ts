// Route optimizer - figures out efficient routes between cities
// Uses simple distance calculations and traveling salesman heuristics

import { Stadium } from '@/types';

export interface RouteSegment {
  from: Stadium;
  to: Stadium;
  distanceMiles: number;
  durationHours: number;
}

export interface OptimizedRoute {
  stadiums: Stadium[];
  segments: RouteSegment[];
  totalMiles: number;
  totalHours: number;
}

/**
 * Calculate distance between two points using Haversine formula
 * Returns distance in miles
 */
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 3959; // Earth's radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
};

const toRad = (degrees: number): number => {
  return (degrees * Math.PI) / 180;
};

/**
 * Estimate driving time based on distance
 * Assumes average speed of 60 mph including stops
 */
export const estimateDrivingTime = (distanceMiles: number): number => {
  return distanceMiles / 60;
};

/**
 * Find the nearest unvisited stadium to current location
 * Simple nearest-neighbor heuristic
 */
const findNearestStadium = (
  current: Stadium,
  remaining: Stadium[]
): Stadium => {
  let nearest = remaining[0];
  let minDistance = calculateDistance(
    current.latitude,
    current.longitude,
    nearest.latitude,
    nearest.longitude
  );

  for (const stadium of remaining) {
    const distance = calculateDistance(
      current.latitude,
      current.longitude,
      stadium.latitude,
      stadium.longitude
    );

    if (distance < minDistance) {
      minDistance = distance;
      nearest = stadium;
    }
  }

  return nearest;
};

/**
 * Optimize route using nearest-neighbor algorithm
 * Not perfect, but good enough for our use case
 */
export const optimizeRoute = (
  start: Stadium,
  stadiums: Stadium[],
  end?: Stadium
): OptimizedRoute => {
  const route: Stadium[] = [start];
  const remaining = stadiums.filter(s => s.id !== start.id && (!end || s.id !== end.id));
  const segments: RouteSegment[] = [];

  let current = start;

  // Visit all stadiums using nearest-neighbor
  while (remaining.length > 0) {
    const next = findNearestStadium(current, remaining);
    const distance = calculateDistance(
      current.latitude,
      current.longitude,
      next.latitude,
      next.longitude
    );

    segments.push({
      from: current,
      to: next,
      distanceMiles: Math.round(distance),
      durationHours: Math.round(estimateDrivingTime(distance) * 10) / 10,
    });

    route.push(next);
    remaining.splice(remaining.indexOf(next), 1);
    current = next;
  }

  // Add final segment to end location if specified
  if (end && end.id !== current.id) {
    const distance = calculateDistance(
      current.latitude,
      current.longitude,
      end.latitude,
      end.longitude
    );

    segments.push({
      from: current,
      to: end,
      distanceMiles: Math.round(distance),
      durationHours: Math.round(estimateDrivingTime(distance) * 10) / 10,
    });

    route.push(end);
  }

  const totalMiles = segments.reduce((sum, seg) => sum + seg.distanceMiles, 0);
  const totalHours = segments.reduce((sum, seg) => sum + seg.durationHours, 0);

  return {
    stadiums: route,
    segments,
    totalMiles,
    totalHours,
  };
};

/**
 * Check if a route is feasible given max driving hours per day
 */
export const isRouteFeasible = (
  route: OptimizedRoute,
  days: number,
  maxDriveHoursPerDay: number = 8
): { feasible: boolean; reason?: string } => {
  const averageDrivePerDay = route.totalHours / days;

  if (averageDrivePerDay > maxDriveHoursPerDay) {
    return {
      feasible: false,
      reason: `Average ${averageDrivePerDay.toFixed(1)} hours of driving per day exceeds limit of ${maxDriveHoursPerDay} hours`,
    };
  }

  // Check for any single segment that's too long
  const longestSegment = Math.max(...route.segments.map(s => s.durationHours));
  if (longestSegment > maxDriveHoursPerDay * 1.5) {
    return {
      feasible: false,
      reason: `One leg requires ${longestSegment.toFixed(1)} hours of driving - consider flying`,
    };
  }

  return { feasible: true };
};

/**
 * Find stadiums within a certain radius of a location
 */
export const findStadiumsInRadius = (
  latitude: number,
  longitude: number,
  allStadiums: Stadium[],
  radiusMiles: number
): Stadium[] => {
  return allStadiums.filter(stadium => {
    const distance = calculateDistance(
      latitude,
      longitude,
      stadium.latitude,
      stadium.longitude
    );
    return distance <= radiusMiles;
  });
};

/**
 * Suggest a route that keeps driving reasonable
 */
export const suggestFeasibleRoute = (
  start: Stadium,
  allStadiums: Stadium[],
  days: number,
  maxDriveHoursPerDay: number = 8
): Stadium[] => {
  // Calculate max total driving hours
  const maxTotalHours = days * maxDriveHoursPerDay * 0.6; // Use 60% of max

  const route: Stadium[] = [start];
  const remaining = allStadiums.filter(s => s.id !== start.id);
  let current = start;
  let totalHours = 0;

  while (remaining.length > 0 && totalHours < maxTotalHours) {
    const next = findNearestStadium(current, remaining);
    const distance = calculateDistance(
      current.latitude,
      current.longitude,
      next.latitude,
      next.longitude
    );
    const hours = estimateDrivingTime(distance);

    if (totalHours + hours > maxTotalHours) {
      break;
    }

    route.push(next);
    remaining.splice(remaining.indexOf(next), 1);
    current = next;
    totalHours += hours;
  }

  return route;
};
