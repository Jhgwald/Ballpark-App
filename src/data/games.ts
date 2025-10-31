// Mock game schedule for the 2025 baseball season
// In a real app, this would come from an API like MLB Stats API

import { Game } from '@/types';

// Generate mock games for summer months (June-August 2025)
export const games: Game[] = [
  // Boston Red Sox home games
  { id: 'g1', stadiumId: 'fenway', homeTeam: 'Boston Red Sox', awayTeam: 'New York Yankees', date: '2025-06-15', time: '7:00 PM', averageTicketPrice: 75 },
  { id: 'g2', stadiumId: 'fenway', homeTeam: 'Boston Red Sox', awayTeam: 'Tampa Bay Rays', date: '2025-07-10', time: '7:00 PM', averageTicketPrice: 60 },
  { id: 'g3', stadiumId: 'fenway', homeTeam: 'Boston Red Sox', awayTeam: 'Toronto Blue Jays', date: '2025-08-05', time: '7:00 PM', averageTicketPrice: 65 },

  // Yankees home games
  { id: 'g4', stadiumId: 'yankee', homeTeam: 'New York Yankees', awayTeam: 'Boston Red Sox', date: '2025-06-20', time: '7:00 PM', averageTicketPrice: 85 },
  { id: 'g5', stadiumId: 'yankee', homeTeam: 'New York Yankees', awayTeam: 'Baltimore Orioles', date: '2025-07-15', time: '7:00 PM', averageTicketPrice: 70 },
  { id: 'g6', stadiumId: 'yankee', homeTeam: 'New York Yankees', awayTeam: 'Tampa Bay Rays', date: '2025-08-10', time: '1:00 PM', averageTicketPrice: 75 },

  // Cubs home games
  { id: 'g7', stadiumId: 'wrigley', homeTeam: 'Chicago Cubs', awayTeam: 'St. Louis Cardinals', date: '2025-06-18', time: '7:00 PM', averageTicketPrice: 70 },
  { id: 'g8', stadiumId: 'wrigley', homeTeam: 'Chicago Cubs', awayTeam: 'Milwaukee Brewers', date: '2025-07-12', time: '1:20 PM', averageTicketPrice: 65 },
  { id: 'g9', stadiumId: 'wrigley', homeTeam: 'Chicago Cubs', awayTeam: 'Cincinnati Reds', date: '2025-08-08', time: '7:00 PM', averageTicketPrice: 60 },

  // Dodgers home games
  { id: 'g10', stadiumId: 'dodger', homeTeam: 'Los Angeles Dodgers', awayTeam: 'San Francisco Giants', date: '2025-06-22', time: '7:00 PM', averageTicketPrice: 80 },
  { id: 'g11', stadiumId: 'dodger', homeTeam: 'Los Angeles Dodgers', awayTeam: 'San Diego Padres', date: '2025-07-18', time: '7:00 PM', averageTicketPrice: 75 },
  { id: 'g12', stadiumId: 'dodger', homeTeam: 'Los Angeles Dodgers', awayTeam: 'Colorado Rockies', date: '2025-08-12', time: '7:00 PM', averageTicketPrice: 70 },

  // More games across different stadiums
  { id: 'g13', stadiumId: 'oracle', homeTeam: 'San Francisco Giants', awayTeam: 'Los Angeles Dodgers', date: '2025-06-25', time: '7:15 PM', averageTicketPrice: 70 },
  { id: 'g14', stadiumId: 'petco', homeTeam: 'San Diego Padres', awayTeam: 'Arizona Diamondbacks', date: '2025-07-20', time: '7:00 PM', averageTicketPrice: 60 },
  { id: 'g15', stadiumId: 'coors', homeTeam: 'Colorado Rockies', awayTeam: 'Los Angeles Dodgers', date: '2025-08-15', time: '6:40 PM', averageTicketPrice: 55 },

  { id: 'g16', stadiumId: 'busch', homeTeam: 'St. Louis Cardinals', awayTeam: 'Chicago Cubs', date: '2025-06-28', time: '7:00 PM', averageTicketPrice: 60 },
  { id: 'g17', stadiumId: 'american-family', homeTeam: 'Milwaukee Brewers', awayTeam: 'Chicago Cubs', date: '2025-07-22', time: '7:00 PM', averageTicketPrice: 50 },
  { id: 'g18', stadiumId: 'great-american', homeTeam: 'Cincinnati Reds', awayTeam: 'Pittsburgh Pirates', date: '2025-08-18', time: '6:40 PM', averageTicketPrice: 45 },

  { id: 'g19', stadiumId: 'truist', homeTeam: 'Atlanta Braves', awayTeam: 'Miami Marlins', date: '2025-06-30', time: '7:20 PM', averageTicketPrice: 55 },
  { id: 'g20', stadiumId: 'nationals', homeTeam: 'Washington Nationals', awayTeam: 'Philadelphia Phillies', date: '2025-07-25', time: '7:05 PM', averageTicketPrice: 50 },
  { id: 'g21', stadiumId: 'citizens', homeTeam: 'Philadelphia Phillies', awayTeam: 'New York Mets', date: '2025-08-20', time: '7:05 PM', averageTicketPrice: 60 },

  { id: 'g22', stadiumId: 'comerica', homeTeam: 'Detroit Tigers', awayTeam: 'Cleveland Guardians', date: '2025-07-01', time: '7:10 PM', averageTicketPrice: 45 },
  { id: 'g23', stadiumId: 'progressive', homeTeam: 'Cleveland Guardians', awayTeam: 'Detroit Tigers', date: '2025-07-28', time: '7:10 PM', averageTicketPrice: 45 },
  { id: 'g24', stadiumId: 'target', homeTeam: 'Minnesota Twins', awayTeam: 'Kansas City Royals', date: '2025-08-22', time: '7:10 PM', averageTicketPrice: 50 },

  { id: 'g25', stadiumId: 'tmobile', homeTeam: 'Seattle Mariners', awayTeam: 'Oakland Athletics', date: '2025-07-05', time: '7:10 PM', averageTicketPrice: 55 },
  { id: 'g26', stadiumId: 'minute-maid', homeTeam: 'Houston Astros', awayTeam: 'Texas Rangers', date: '2025-07-30', time: '7:10 PM', averageTicketPrice: 65 },
  { id: 'g27', stadiumId: 'globe-life', homeTeam: 'Texas Rangers', awayTeam: 'Houston Astros', date: '2025-08-25', time: '7:05 PM', averageTicketPrice: 60 },

  // Add more games for better coverage
  { id: 'g28', stadiumId: 'camden', homeTeam: 'Baltimore Orioles', awayTeam: 'Tampa Bay Rays', date: '2025-07-08', time: '7:05 PM', averageTicketPrice: 55 },
  { id: 'g29', stadiumId: 'tropicana', homeTeam: 'Tampa Bay Rays', awayTeam: 'Boston Red Sox', date: '2025-08-28', time: '6:50 PM', averageTicketPrice: 40 },
  { id: 'g30', stadiumId: 'pnc', homeTeam: 'Pittsburgh Pirates', awayTeam: 'Cincinnati Reds', date: '2025-07-14', time: '7:05 PM', averageTicketPrice: 45 },
];

// Helper function to get games by stadium
export const getGamesByStadium = (stadiumId: string): Game[] => {
  return games.filter(g => g.stadiumId === stadiumId);
};

// Helper function to get games by date range
export const getGamesByDateRange = (startDate: string, endDate: string): Game[] => {
  return games.filter(g => g.date >= startDate && g.date <= endDate);
};

// Helper function to get games for a specific stadium in a date range
export const getGamesForStadiumInRange = (stadiumId: string, startDate: string, endDate: string): Game[] => {
  return games.filter(g =>
    g.stadiumId === stadiumId &&
    g.date >= startDate &&
    g.date <= endDate
  );
};

// Helper to get a game by ID
export const getGameById = (id: string): Game | undefined => {
  return games.find(g => g.id === id);
};
