'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

export default function FavoritesPage() {
  const [favoriteQuotes, setFavoriteQuotes] = useState<string[]>([]);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteQuotes');
    if (savedFavorites) {
      setFavoriteQuotes(JSON.parse(savedFavorites));
    }
  }, []);

  // Function to remove a quote from favorites
  const removeFavorite = (quoteToRemove: string) => {
    const updatedFavorites = favoriteQuotes.filter(quote => quote !== quoteToRemove);
    setFavoriteQuotes(updatedFavorites);
    localStorage.setItem('favoriteQuotes', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col font-sans antialiased">
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-2xl mx-auto text-center space-y-10">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-white tracking-tight">
              Favorite Quotes
            </h1>
          </div>
          
          {/* Favorites Display Area */}
          <div className="space-y-6">
            {favoriteQuotes.length > 0 ? (
              favoriteQuotes.map((quote, index) => (
                <div 
                  key={index}
                  className="bg-gray-800/50 p-6 rounded-2xl border-l-4 border-red-500 animate-fade-in relative"
                >
                  <button
                    onClick={() => removeFavorite(quote)}
                    className="absolute top-4 right-4 hover:scale-110 transition-transform"
                    aria-label="Remove from favorites"
                  >
                    <Heart 
                      className="h-6 w-6 text-red-500 fill-red-500" 
                    />
                  </button>
                  <blockquote className="text-2xl italic text-gray-100 leading-relaxed pr-8">
                    "{quote}"
                  </blockquote>
                </div>
              ))
            ) : (
              <div className="bg-gray-800/50 p-6 rounded-2xl border-l-4 border-red-500">
                <blockquote className="text-2xl italic text-gray-100 leading-relaxed">
                  "You don't have any favorite quotes yet. Start adding some!"
                </blockquote>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}