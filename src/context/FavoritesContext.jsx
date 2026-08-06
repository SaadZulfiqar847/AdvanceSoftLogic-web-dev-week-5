import { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEY = 'favoriteCities';

// The context itself — just a named channel, no logic lives here.
const FavoritesContext = createContext(null);

// Provider component. Wraps around the parts of the app that need
// access to favorites (in our case, the whole app). Owns the actual
// state and the functions that change it.
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    // lazy initializer — only reads localStorage once, on first mount
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  // Whenever favorites changes, sync it to localStorage automatically.
  // Centralizing this here means individual components never need to
  // remember to save — they just call addFavorite/removeFavorite.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  function addFavorite(city) {
    setFavorites((prev) => {
      const alreadyExists = prev.some(
        (fav) => fav.name === city.name && fav.country === city.country
      );
      if (alreadyExists) return prev;
      return [...prev, city];
    });
  }

  function removeFavorite(city) {
    setFavorites((prev) =>
      prev.filter((fav) => fav.name !== city.name || fav.country !== city.country)
    );
  }

  function isFavorite(city) {
    return favorites.some(
      (fav) => fav.name === city.name && fav.country === city.country
    );
  }

  // Everything inside `value` is what consuming components will be
  // able to read/call via useContext.
  const value = { favorites, addFavorite, removeFavorite, isFavorite };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

// Custom hook wrapping useContext — this is a common, recommended
// pattern: components import useFavorites() instead of importing
// useContext + FavoritesContext separately everywhere they need it.
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}