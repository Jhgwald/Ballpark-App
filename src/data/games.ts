// 2026 MLB Schedule
// Based on official MLB 2026 season dates
// Season: March 25 - September 27, 2026
// All-Star Break: July 14, 2026 at Citizens Bank Park

import { Game } from '@/types';

// Realistic game schedule for summer 2026 (June-August)
// 80 games covering all 30 MLB stadiums
export const games: Game[] = [
  // JUNE 2026 GAMES

  // Week 1 (June 1-7)
  { id: 'g1', stadiumId: 'fenway', homeTeam: 'Boston Red Sox', awayTeam: 'New York Yankees', date: '2026-06-02', time: '7:10 PM', averageTicketPrice: 85 },
  { id: 'g2', stadiumId: 'yankee', homeTeam: 'New York Yankees', awayTeam: 'Tampa Bay Rays', date: '2026-06-05', time: '7:05 PM', averageTicketPrice: 80 },
  { id: 'g3', stadiumId: 'wrigley', homeTeam: 'Chicago Cubs', awayTeam: 'St. Louis Cardinals', date: '2026-06-03', time: '7:05 PM', averageTicketPrice: 70 },
  { id: 'g4', stadiumId: 'dodger', homeTeam: 'Los Angeles Dodgers', awayTeam: 'San Francisco Giants', date: '2026-06-06', time: '7:10 PM', averageTicketPrice: 85 },
  { id: 'g5', stadiumId: 'camden', homeTeam: 'Baltimore Orioles', awayTeam: 'Boston Red Sox', date: '2026-06-04', time: '7:05 PM', averageTicketPrice: 60 },
  { id: 'g6', stadiumId: 'progressive', homeTeam: 'Cleveland Guardians', awayTeam: 'Detroit Tigers', date: '2026-06-07', time: '7:10 PM', averageTicketPrice: 45 },

  // Week 2 (June 8-14)
  { id: 'g7', stadiumId: 'oracle', homeTeam: 'San Francisco Giants', awayTeam: 'Los Angeles Dodgers', date: '2026-06-10', time: '7:15 PM', averageTicketPrice: 75 },
  { id: 'g8', stadiumId: 'busch', homeTeam: 'St. Louis Cardinals', awayTeam: 'Chicago Cubs', date: '2026-06-12', time: '7:15 PM', averageTicketPrice: 65 },
  { id: 'g9', stadiumId: 'target', homeTeam: 'Minnesota Twins', awayTeam: 'Kansas City Royals', date: '2026-06-11', time: '7:10 PM', averageTicketPrice: 50 },
  { id: 'g10', stadiumId: 'tmobile', homeTeam: 'Seattle Mariners', awayTeam: 'Oakland Athletics', date: '2026-06-13', time: '6:40 PM', averageTicketPrice: 55 },
  { id: 'g11', stadiumId: 'petco', homeTeam: 'San Diego Padres', awayTeam: 'Arizona Diamondbacks', date: '2026-06-14', time: '6:40 PM', averageTicketPrice: 60 },
  { id: 'g12', stadiumId: 'citi', homeTeam: 'New York Mets', awayTeam: 'Philadelphia Phillies', date: '2026-06-09', time: '7:10 PM', averageTicketPrice: 65 },

  // Week 3 (June 15-21)
  { id: 'g13', stadiumId: 'comerica', homeTeam: 'Detroit Tigers', awayTeam: 'Cleveland Guardians', date: '2026-06-16', time: '7:10 PM', averageTicketPrice: 45 },
  { id: 'g14', stadiumId: 'truist', homeTeam: 'Atlanta Braves', awayTeam: 'Miami Marlins', date: '2026-06-18', time: '7:20 PM', averageTicketPrice: 60 },
  { id: 'g15', stadiumId: 'minute-maid', homeTeam: 'Houston Astros', awayTeam: 'Texas Rangers', date: '2026-06-19', time: '7:10 PM', averageTicketPrice: 70 },
  { id: 'g16', stadiumId: 'guaranteed', homeTeam: 'Chicago White Sox', awayTeam: 'Milwaukee Brewers', date: '2026-06-20', time: '7:10 PM', averageTicketPrice: 45 },
  { id: 'g17', stadiumId: 'coors', homeTeam: 'Colorado Rockies', awayTeam: 'Arizona Diamondbacks', date: '2026-06-21', time: '6:10 PM', averageTicketPrice: 50 },
  { id: 'g18', stadiumId: 'nationals', homeTeam: 'Washington Nationals', awayTeam: 'Baltimore Orioles', date: '2026-06-17', time: '7:05 PM', averageTicketPrice: 55 },

  // Week 4 (June 22-28)
  { id: 'g19', stadiumId: 'pnc', homeTeam: 'Pittsburgh Pirates', awayTeam: 'Cincinnati Reds', date: '2026-06-23', time: '7:05 PM', averageTicketPrice: 45 },
  { id: 'g20', stadiumId: 'american-family', homeTeam: 'Milwaukee Brewers', awayTeam: 'Chicago Cubs', date: '2026-06-25', time: '7:10 PM', averageTicketPrice: 55 },
  { id: 'g21', stadiumId: 'tropicana', homeTeam: 'Tampa Bay Rays', awayTeam: 'Toronto Blue Jays', date: '2026-06-26', time: '6:50 PM', averageTicketPrice: 40 },
  { id: 'g22', stadiumId: 'chase', homeTeam: 'Arizona Diamondbacks', awayTeam: 'San Diego Padres', date: '2026-06-27', time: '6:40 PM', averageTicketPrice: 50 },
  { id: 'g23', stadiumId: 'kauffman', homeTeam: 'Kansas City Royals', awayTeam: 'Minnesota Twins', date: '2026-06-28', time: '6:10 PM', averageTicketPrice: 40 },
  { id: 'g24', stadiumId: 'marlins', homeTeam: 'Miami Marlins', awayTeam: 'Atlanta Braves', date: '2026-06-24', time: '7:10 PM', averageTicketPrice: 45 },

  // Week 5 (June 29-30)
  { id: 'g25', stadiumId: 'angel', homeTeam: 'Los Angeles Angels', awayTeam: 'Seattle Mariners', date: '2026-06-30', time: '6:38 PM', averageTicketPrice: 55 },
  { id: 'g26', stadiumId: 'oakland', homeTeam: 'Oakland Athletics', awayTeam: 'Los Angeles Angels', date: '2026-06-29', time: '6:40 PM', averageTicketPrice: 35 },

  // JULY 2026 GAMES

  // Week 1 (July 1-7)
  { id: 'g27', stadiumId: 'fenway', homeTeam: 'Boston Red Sox', awayTeam: 'Tampa Bay Rays', date: '2026-07-02', time: '7:10 PM', averageTicketPrice: 75 },
  { id: 'g28', stadiumId: 'yankee', homeTeam: 'New York Yankees', awayTeam: 'Boston Red Sox', date: '2026-07-04', time: '7:05 PM', averageTicketPrice: 95 },
  { id: 'g29', stadiumId: 'wrigley', homeTeam: 'Chicago Cubs', awayTeam: 'Milwaukee Brewers', date: '2026-07-05', time: '1:20 PM', averageTicketPrice: 70 },
  { id: 'g30', stadiumId: 'great-american', homeTeam: 'Cincinnati Reds', awayTeam: 'Pittsburgh Pirates', date: '2026-07-03', time: '6:40 PM', averageTicketPrice: 45 },
  { id: 'g31', stadiumId: 'rogers', homeTeam: 'Toronto Blue Jays', awayTeam: 'Tampa Bay Rays', date: '2026-07-06', time: '7:07 PM', averageTicketPrice: 50 },
  { id: 'g32', stadiumId: 'globe-life', homeTeam: 'Texas Rangers', awayTeam: 'Houston Astros', date: '2026-07-07', time: '7:05 PM', averageTicketPrice: 65 },

  // Week 2 (July 8-14) - All-Star Break July 14
  { id: 'g33', stadiumId: 'citizens', homeTeam: 'Philadelphia Phillies', awayTeam: 'New York Mets', date: '2026-07-09', time: '7:05 PM', averageTicketPrice: 70 },
  { id: 'g34', stadiumId: 'nationals', homeTeam: 'Washington Nationals', awayTeam: 'Atlanta Braves', date: '2026-07-10', time: '7:05 PM', averageTicketPrice: 55 },
  { id: 'g35', stadiumId: 'dodger', homeTeam: 'Los Angeles Dodgers', awayTeam: 'San Diego Padres', date: '2026-07-11', time: '7:10 PM', averageTicketPrice: 85 },
  { id: 'g36', stadiumId: 'oracle', homeTeam: 'San Francisco Giants', awayTeam: 'Colorado Rockies', date: '2026-07-12', time: '4:05 PM', averageTicketPrice: 70 },
  // All-Star Game July 14 at Citizens Bank Park

  // Week 3 (July 15-21) - After All-Star Break
  { id: 'g37', stadiumId: 'fenway', homeTeam: 'Boston Red Sox', awayTeam: 'Toronto Blue Jays', date: '2026-07-17', time: '7:10 PM', averageTicketPrice: 70 },
  { id: 'g38', stadiumId: 'busch', homeTeam: 'St. Louis Cardinals', awayTeam: 'Cincinnati Reds', date: '2026-07-18', time: '7:15 PM', averageTicketPrice: 60 },
  { id: 'g39', stadiumId: 'tmobile', homeTeam: 'Seattle Mariners', awayTeam: 'Los Angeles Angels', date: '2026-07-19', time: '4:10 PM', averageTicketPrice: 60 },
  { id: 'g40', stadiumId: 'target', homeTeam: 'Minnesota Twins', awayTeam: 'Chicago White Sox', date: '2026-07-20', time: '7:40 PM', averageTicketPrice: 50 },
  { id: 'g41', stadiumId: 'comerica', homeTeam: 'Detroit Tigers', awayTeam: 'Kansas City Royals', date: '2026-07-21', time: '7:10 PM', averageTicketPrice: 40 },
  { id: 'g42', stadiumId: 'coors', homeTeam: 'Colorado Rockies', awayTeam: 'San Francisco Giants', date: '2026-07-16', time: '6:40 PM', averageTicketPrice: 55 },

  // Week 4 (July 22-28)
  { id: 'g43', stadiumId: 'yankee', homeTeam: 'New York Yankees', awayTeam: 'Baltimore Orioles', date: '2026-07-24', time: '7:05 PM', averageTicketPrice: 85 },
  { id: 'g44', stadiumId: 'wrigley', homeTeam: 'Chicago Cubs', awayTeam: 'Pittsburgh Pirates', date: '2026-07-25', time: '1:20 PM', averageTicketPrice: 65 },
  { id: 'g45', stadiumId: 'truist', homeTeam: 'Atlanta Braves', awayTeam: 'Washington Nationals', date: '2026-07-26', time: '7:20 PM', averageTicketPrice: 65 },
  { id: 'g46', stadiumId: 'minute-maid', homeTeam: 'Houston Astros', awayTeam: 'Oakland Athletics', date: '2026-07-27', time: '8:10 PM', averageTicketPrice: 70 },
  { id: 'g47', stadiumId: 'petco', homeTeam: 'San Diego Padres', awayTeam: 'Los Angeles Dodgers', date: '2026-07-28', time: '6:40 PM', averageTicketPrice: 75 },
  { id: 'g48', stadiumId: 'progressive', homeTeam: 'Cleveland Guardians', awayTeam: 'Minnesota Twins', date: '2026-07-23', time: '7:10 PM', averageTicketPrice: 50 },

  // Week 5 (July 29-31)
  { id: 'g49', stadiumId: 'citi', homeTeam: 'New York Mets', awayTeam: 'Washington Nationals', date: '2026-07-30', time: '7:10 PM', averageTicketPrice: 65 },
  { id: 'g50', stadiumId: 'american-family', homeTeam: 'Milwaukee Brewers', awayTeam: 'St. Louis Cardinals', date: '2026-07-31', time: '7:10 PM', averageTicketPrice: 55 },
  { id: 'g51', stadiumId: 'chase', homeTeam: 'Arizona Diamondbacks', awayTeam: 'Colorado Rockies', date: '2026-07-29', time: '6:40 PM', averageTicketPrice: 50 },

  // AUGUST 2026 GAMES

  // Week 1 (Aug 1-7)
  { id: 'g52', stadiumId: 'fenway', homeTeam: 'Boston Red Sox', awayTeam: 'Baltimore Orioles', date: '2026-08-01', time: '4:10 PM', averageTicketPrice: 75 },
  { id: 'g53', stadiumId: 'yankee', homeTeam: 'New York Yankees', awayTeam: 'Tampa Bay Rays', date: '2026-08-02', time: '1:05 PM', averageTicketPrice: 80 },
  { id: 'g54', stadiumId: 'dodger', homeTeam: 'Los Angeles Dodgers', awayTeam: 'Arizona Diamondbacks', date: '2026-08-04', time: '7:10 PM', averageTicketPrice: 85 },
  { id: 'g55', stadiumId: 'wrigley', homeTeam: 'Chicago Cubs', awayTeam: 'Cincinnati Reds', date: '2026-08-05', time: '7:05 PM', averageTicketPrice: 65 },
  { id: 'g56', stadiumId: 'camden', homeTeam: 'Baltimore Orioles', awayTeam: 'New York Yankees', date: '2026-08-06', time: '7:05 PM', averageTicketPrice: 70 },
  { id: 'g57', stadiumId: 'tropicana', homeTeam: 'Tampa Bay Rays', awayTeam: 'Boston Red Sox', date: '2026-08-07', time: '6:50 PM', averageTicketPrice: 45 },

  // Week 2 (Aug 8-14)
  { id: 'g58', stadiumId: 'oracle', homeTeam: 'San Francisco Giants', awayTeam: 'San Diego Padres', date: '2026-08-08', time: '4:05 PM', averageTicketPrice: 75 },
  { id: 'g59', stadiumId: 'busch', homeTeam: 'St. Louis Cardinals', awayTeam: 'Milwaukee Brewers', date: '2026-08-10', time: '7:45 PM', averageTicketPrice: 65 },
  { id: 'g60', stadiumId: 'target', homeTeam: 'Minnesota Twins', awayTeam: 'Detroit Tigers', date: '2026-08-11', time: '7:40 PM', averageTicketPrice: 50 },
  { id: 'g61', stadiumId: 'tmobile', homeTeam: 'Seattle Mariners', awayTeam: 'Texas Rangers', date: '2026-08-12', time: '6:40 PM', averageTicketPrice: 60 },
  { id: 'g62', stadiumId: 'citizens', homeTeam: 'Philadelphia Phillies', awayTeam: 'Atlanta Braves', date: '2026-08-13', time: '7:05 PM', averageTicketPrice: 70 },
  { id: 'g63', stadiumId: 'great-american', homeTeam: 'Cincinnati Reds', awayTeam: 'Chicago Cubs', date: '2026-08-14', time: '7:10 PM', averageTicketPrice: 45 },

  // Week 3 (Aug 15-21)
  { id: 'g64', stadiumId: 'pnc', homeTeam: 'Pittsburgh Pirates', awayTeam: 'St. Louis Cardinals', date: '2026-08-15', time: '6:35 PM', averageTicketPrice: 45 },
  { id: 'g65', stadiumId: 'comerica', homeTeam: 'Detroit Tigers', awayTeam: 'Cleveland Guardians', date: '2026-08-16', time: '1:40 PM', averageTicketPrice: 45 },
  { id: 'g66', stadiumId: 'truist', homeTeam: 'Atlanta Braves', awayTeam: 'Philadelphia Phillies', date: '2026-08-18', time: '7:20 PM', averageTicketPrice: 70 },
  { id: 'g67', stadiumId: 'minute-maid', homeTeam: 'Houston Astros', awayTeam: 'Los Angeles Angels', date: '2026-08-19', time: '8:10 PM', averageTicketPrice: 70 },
  { id: 'g68', stadiumId: 'petco', homeTeam: 'San Diego Padres', awayTeam: 'San Francisco Giants', date: '2026-08-20', time: '6:40 PM', averageTicketPrice: 70 },
  { id: 'g69', stadiumId: 'kauffman', homeTeam: 'Kansas City Royals', awayTeam: 'Chicago White Sox', date: '2026-08-21', time: '7:10 PM', averageTicketPrice: 40 },

  // Week 4 (Aug 22-28)
  { id: 'g70', stadiumId: 'yankee', homeTeam: 'New York Yankees', awayTeam: 'Toronto Blue Jays', date: '2026-08-22', time: '1:05 PM', averageTicketPrice: 85 },
  { id: 'g71', stadiumId: 'wrigley', homeTeam: 'Chicago Cubs', awayTeam: 'St. Louis Cardinals', date: '2026-08-23', time: '1:20 PM', averageTicketPrice: 75 },
  { id: 'g72', stadiumId: 'dodger', homeTeam: 'Los Angeles Dodgers', awayTeam: 'Colorado Rockies', date: '2026-08-25', time: '7:10 PM', averageTicketPrice: 80 },
  { id: 'g73', stadiumId: 'nationals', homeTeam: 'Washington Nationals', awayTeam: 'Miami Marlins', date: '2026-08-26', time: '7:05 PM', averageTicketPrice: 50 },
  { id: 'g74', stadiumId: 'progressive', homeTeam: 'Cleveland Guardians', awayTeam: 'Kansas City Royals', date: '2026-08-27', time: '7:10 PM', averageTicketPrice: 50 },
  { id: 'g75', stadiumId: 'coors', homeTeam: 'Colorado Rockies', awayTeam: 'Los Angeles Dodgers', date: '2026-08-28', time: '6:40 PM', averageTicketPrice: 60 },

  // Week 5 (Aug 29-31)
  { id: 'g76', stadiumId: 'fenway', homeTeam: 'Boston Red Sox', awayTeam: 'New York Yankees', date: '2026-08-29', time: '4:10 PM', averageTicketPrice: 90 },
  { id: 'g77', stadiumId: 'american-family', homeTeam: 'Milwaukee Brewers', awayTeam: 'Cincinnati Reds', date: '2026-08-30', time: '2:10 PM', averageTicketPrice: 50 },
  { id: 'g78', stadiumId: 'oracle', homeTeam: 'San Francisco Giants', awayTeam: 'Arizona Diamondbacks', date: '2026-08-31', time: '9:45 PM', averageTicketPrice: 70 },

  // SEPTEMBER 2026 - Early games before season end (Sept 27)
  { id: 'g79', stadiumId: 'yankee', homeTeam: 'New York Yankees', awayTeam: 'Boston Red Sox', date: '2026-09-05', time: '1:05 PM', averageTicketPrice: 95 },
  { id: 'g80', stadiumId: 'wrigley', homeTeam: 'Chicago Cubs', awayTeam: 'Milwaukee Brewers', date: '2026-09-06', time: '1:20 PM', averageTicketPrice: 70 },
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
