'use client';
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";

export default function FavoriteButton({ quote }: { quote: string }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteQuotes');
    const favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
    setIsFavorite(favorites.includes(quote));
  }, [quote]);

  const toggleFavorite = () => {
    const savedFavorites = localStorage.getItem('favoriteQuotes');
    let currentFavorites = savedFavorites ? JSON.parse(savedFavorites) : [];
    
    let newFavorites;
    if (isFavorite) {
      newFavorites = currentFavorites.filter((fav: string) => fav !== quote);
    } else {
      newFavorites = [...currentFavorites, quote];
    }
    
    localStorage.setItem('favoriteQuotes', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <button
      onClick={toggleFavorite}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      className="hover:scale-110 transition-transform"
    >
      <Heart 
        className={`h-6 w-6 ${isFavorite ? "text-red-500 fill-red-500" : "text-gray-400 hover:text-red-500"}`}
      />
    </button>
  );
}