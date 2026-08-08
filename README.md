# React Weather Dashboard — Multi-Page Edition

A multi-page React application extending the Week 4 weather dashboard with client-side routing and global state management via the Context API. Users can search weather from the home page, browse an A-Z grid of cities, view detailed forecasts, and manage a persisted list of favorite cities from anywhere in the app.

## 📋 Project Overview

This project demonstrates:
- Client-side routing with React Router (static, dynamic, and catch-all routes)
- Global state management using the Context API, avoiding prop drilling
- Both declarative (`Link`/`NavLink`) and programmatic (`useNavigate`) navigation
- Persisting global state to localStorage and rehydrating it on load
- Reusing logic and components from a previous project (Week 4) inside a new architecture

## 🛠️ Built With

- React (functional components + hooks)
- React Router (`react-router-dom`)
- Vite
- [Open-Meteo](https://open-meteo.com/) — free geocoding and weather API

## 📁 Project Structure

week-5-react-router/
├── src/
│ ├── pages/
│ │ ├── Home.jsx — search dashboard (root route)
│ │ ├── Cities.jsx — A-Z city grid with icon + temperature
│ │ ├── CityDetail.jsx — full weather detail for one city
│ │ ├── Favorites.jsx — starred cities
│ │ └── NotFound.jsx — 404 catch-all
│ ├── components/
│ │ ├── NavBar.jsx — shared navigation, uses NavLink
│ │ ├── SearchForm.jsx — controlled search input
│ │ ├── WeatherResult.jsx — current conditions + favorite toggle
│ │ └── ForecastList.jsx — forecast days via .map()
│ ├── context/
│ │ └── FavoritesContext.jsx — global favorites state + localStorage sync
│ ├── hooks/
│ │ └── useWeather.js — custom hook wrapping fetch + loading/error state
│ ├── api/
│ │ └── weatherApi.js — pure data-fetching functions
│ ├── data/
│ │ └── cities.js — curated A-Z city list
│ ├── App.jsx — route definitions + page transition wrapper
│ ├── App.css
│ └── main.jsx — BrowserRouter + FavoritesProvider setup
├── index.html
└── README.md

## 🚀 Setup & Usage

1. Clone this repository: git clone https://github.com/SaadZulfiqar847/AdvanceSoftLogic-web-dev-week-5.git 

2. Navigate into the project folder: cd AdvanceSoftLogic-web-dev-week-5

3. Install dependencies: npm install 

4. Start the dev server: npm run dev 

5. Open the URL shown in the terminal (usually `http://localhost:5173`).

## 🧭 Routes

| Path | Component | Type | Description |
|---|---|---|---|
| `/` | `Home` | Static | Search dashboard — search any city and view its current weather + forecast |
| `/cities` | `Cities` | Static | A-Z grid of curated cities, showing icon + temperature; click a card to view details |
| `/cities/:cityName` | `CityDetail` | Dynamic | Full weather detail for one city, read from the `:cityName` URL parameter via `useParams` |
| `/favorites` | `Favorites` | Static | Starred cities, re-fetches current weather for each on load |
| `*` | `NotFound` | Catch-all | Matches any unrecognized URL; provides a link back to Home |

Navigation is handled two ways: `NavLink` in the shared navbar for direct links (with active-route highlighting), and `useNavigate` for the "Back to Cities" button on the detail page, since that action is triggered by code rather than a direct link click.

## 🌐 State Management Approach

- **Local state** (`useState`) is used for anything only one component needs — e.g. the in-progress text inside `SearchForm`, or the current temperature unit on a given page.
- **Global state** (Context API) is used specifically for favorites, since three unrelated components across different routes (`Cities`, `WeatherResult`, `Favorites`) all need to read and update the same data. `FavoritesContext` exposes `favorites`, `addFavorite`, `removeFavorite`, and `isFavorite` via a custom `useFavorites()` hook, so no component needs to import `useContext` directly or know the context object exists.
- **Persistence:** `FavoritesProvider` reads from `localStorage` once on mount (via a lazy `useState` initializer) and writes back automatically via a `useEffect` that watches the `favorites` array — individual components never touch `localStorage` directly.
- **Why Context instead of prop drilling:** `Cities`, `CityDetail` (via `WeatherResult`), and `Favorites` are three separate route-level pages with no direct parent-child relationship to each other. Passing favorites state through props would require lifting it all the way to `App.jsx` and threading it through every route, including pages that don't need it. Context lets each page subscribe directly instead.

## ✨ Features

- Search-based home dashboard (Week 4 logic, relocated)
- A-Z city browser with concurrent fetching (`Promise.all`)
- Dynamic city detail pages via route parameters
- Global favorites system, persisted across sessions, manageable from three different pages
- Smooth fade-in route transitions
- Custom animated loading state
- Styled 404 page with a way back to Home

## ⚠️ Known Limitations

- The city list on `/cities` is a fixed, curated set rather than a searchable/paginated catalog
- If a favorited city's live weather fails to load on the Favorites page, that individual card shows "N/A" rather than blocking the rest of the list — a deliberate resilience choice, unlike the Cities page's all-or-nothing `Promise.all` behavior

## 👤 Author

Saad Zulfiqar — [GitHub](https://github.com/SaadZulfiqar847)