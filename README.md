<div align="center">
  <h1>🎮 Game Hub</h1>
  <p><strong>A modern game discovery web app</strong> built with React, TypeScript, Vite, Chakra UI v3, and the RAWG Video Games Database API.</p>
</div>

## ✨ Features

- Browse and discover video games with cover art
- Filter by platform & genre
- Sort by relevance, date added, release date, name, popularity, rating
- Search games by keyword
- Metacritic critic scores & rating emojis
- Light / Dark theme toggle (next-themes + Chakra color mode helper)
- Responsive layout (sidebar on desktop, stacked on mobile)
- Reusable data fetching hook with request cancellation
- Skeleton loading for genres & cards (no layout shift)

## 🧱 Tech Stack

| Layer | Technology |
|-------|------------|
| UI | React 19, Chakra UI v3 |
| Styling | Chakra tokens + color mode helpers |
| Build | Vite |
| Language | TypeScript |
| Data | RAWG.io REST API (Axios) |
| Theming | next-themes integration |

## 🚀 Getting Started

### 1. Clone
```bash
git clone <repo-url>
cd game-hub
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Dev Server
```bash
npm run dev
```
Open the printed local URL (usually http://localhost:5173).

## 🔑 API Key
This project uses the RAWG API. An example key is currently hardcoded in `src/services/api-client.ts`:
```ts
params: { key: '3424b45fd632466582afe83b0d564420' }
```
Replace it with your own key (free from https://rawg.io/apidocs) for production use. Consider moving it to an environment variable (e.g. `VITE_RAWG_API_KEY`).

Example `.env`:
```env
VITE_RAWG_API_KEY=your_key_here
```
Then update the axios client:
```ts
params: { key: import.meta.env.VITE_RAWG_API_KEY }
```

## 📁 Project Structure
```
src/
  components/
    layout/        # Layout + UI building blocks (NavBar, GameGrid, GameCard, selectors)
    ui/            # Provider + color mode helpers
  hooks/           # Data fetching hooks (useGames, useGenres, usePlatforms, useData)
  services/        # API client (axios instance)
  assets/          # Static assets
```

## 🧩 Key Hooks

- `useData<T>`: Generic fetcher with abort support & dependency-based revalidation
- `useGames(gameQuery)`: Fetch games with dynamic query params (platform, genre, ordering, search)
- `useGenres()` / `usePlatforms()` for sidebar + filters

## 🧠 State Model
The `Layout` component owns a `gameQuery` object:
```ts
interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
  searchText: string;
}
```
This is passed down to filtering components and hooks for consistent data loading.

## 🌗 Theming
Color mode toggling uses a lightweight wrapper around `next-themes`. Components read palette values via `useColorModeValue(light, dark)`.

## ✅ Potential Improvements (Open Roadmap)
- Pagination / infinite scroll
- Debounced search input
- Detailed game page (screenshots, description, trailers)
- Platform + genre multi-select
- Persisted user preferences (localStorage)
- Error boundary + toast notifications
- Unit + integration tests

## 🛡️ License
This project is for educational/demo purposes. RAWG API usage must follow their Terms of Service.

## 🙌 Acknowledgments
- RAWG (https://rawg.io/) for the free games database
- Chakra UI for an accessible component system

---
Feel free to open issues or suggest enhancements.

