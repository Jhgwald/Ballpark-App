# ⚾ Ballpark Trip Planner

A conversational AI-powered web app for planning baseball road trips across America.

## 🎯 Features

- **Conversational Planning**: Tell the app what you want in natural language
- **Smart Extraction**: AI understands your requirements (dates, cities, budget, etc.)
- **Multiple Options**: Get 3 trip plans - Best Overall, Fastest, and Most Games
- **Interactive Map**: Visualize your route with stadiums and activities
- **Budget Planning**: See cost breakdowns and stay within budget
- **Customizable**: Adjust preferences with easy sliders and toggles
- **Editable Details**: Click to edit any extracted information

## 🏗️ Architecture

### Tech Stack
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Modern styling
- **Leaflet** - Interactive maps (placeholder in current version)

### Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── api/               # Backend API routes
│   │   ├── chat/          # Conversation handler
│   │   └── plan/          # Trip planner
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ConversationInput.tsx
│   ├── SummaryChips.tsx
│   ├── ItineraryOptions.tsx
│   ├── TripDetails.tsx
│   ├── TripMap.tsx
│   └── PreferencesPanel.tsx
├── lib/                   # Helper functions
│   ├── tripPlanner.ts     # Core planning logic
│   ├── budgetCalculator.ts
│   └── routeOptimizer.ts
├── data/                  # Mock data
│   ├── stadiums.ts        # All 30 MLB stadiums
│   ├── games.ts           # Mock game schedule
│   └── activities.ts      # Sightseeing options
└── types/                 # TypeScript types
    └── index.ts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## 📝 How It Works

### 1. User Input
Users can type or speak their trip requirements:
- "Plan me a 10-day trip in August"
- "Starting from New York with $2500 budget"
- "I want to avoid Wrigley Field"

### 2. AI Extraction
The `/api/chat` endpoint extracts key details:
- Start/end locations
- Dates and duration
- Budget
- Stadium preferences
- Activities

### 3. Trip Planning
The `/api/plan` endpoint generates 3 itineraries:
- **Best Overall**: Balanced trip with good mix
- **Fastest**: Minimal driving, fewer stops
- **Most Games**: Maximum baseball experiences

### 4. Visualization
- Day-by-day breakdown
- Cost calculations
- Interactive map (placeholder)
- Editable preferences

## 🎨 Design Philosophy

- **Clean & Modern**: Apple Maps meets ChatGPT aesthetic
- **Conversational**: Natural language, not forms
- **Transparent**: Show what was understood, allow edits
- **Flexible**: Adjust preferences without starting over

## 🔧 Customization

### Adding Real AI
Replace the mock extraction in `src/app/api/chat/route.ts` with:
- OpenAI GPT-4
- Anthropic Claude
- Google Gemini

### Adding Real Maps
Integrate Leaflet in `src/components/TripMap.tsx`:
```typescript
import L from 'leaflet';
const map = L.map(mapRef.current).setView([lat, lon], zoom);
```

### Adding Real Data
Replace mock data with APIs:
- MLB Stats API for games
- Google Places for activities
- Booking.com for hotels

## 📦 Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Other Platforms
Works on any Node.js platform:
- Netlify
- Railway
- AWS Amplify
- Google Cloud Run

## 🛣️ Future Enhancements

- [ ] Real AI integration (GPT-4/Claude)
- [ ] Live game data from MLB API
- [ ] Hotel and flight booking
- [ ] User accounts and saved trips
- [ ] Share trips with friends
- [ ] Weather forecasts
- [ ] Traffic-aware routing
- [ ] Export to calendar/PDF
- [ ] Mobile app (React Native)

## 📄 License

MIT License - feel free to use this for your own projects!

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 💡 Tips for Non-Coders

This app is built to be educational. Key concepts:

- **Components**: Reusable UI pieces (like LEGO blocks)
- **State**: Data that changes (user input, trip plans)
- **API Routes**: Backend functions that process data
- **TypeScript Types**: Templates that describe data structure

Start by reading:
1. `src/app/page.tsx` - Main application flow
2. `src/components/ConversationInput.tsx` - How input works
3. `src/lib/tripPlanner.ts` - How trips are generated

## 🙋 Questions?

Check the comments in each file - they explain what the code does in plain English!
