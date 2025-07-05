'use client';

import { useState, useEffect } from 'react';
import { Heart, Quote, Trash2 } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col font-sans antialiased">
      <main className="flex-1 flex flex-col items-center justify-center p-6 section-professional">
        <div className="w-full max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Heart className="h-8 w-8 text-red-500 fill-red-500" />
              <h1 className="heading-primary text-5xl font-bold tracking-tight">
                My Favorite Quotes
              </h1>
            </div>
    
          </div>
          
          {/* Favorites Display Area */}
          <div className="space-y-6">
            {favoriteQuotes.length > 0 ? (
              favoriteQuotes.map((quote, index) => (
                <div 
                  key={index}
                  className="card-professional p-8 rounded-3xl shadow-professional animate-fade-in relative hover:shadow-custom-hover transition-all duration-500 group"
                >
                  <div className="flex items-start space-x-4">
                    <Quote className="h-8 w-8 text-primary-gold mt-2 flex-shrink-0" />
                    <div className="flex-1 text-left">
                      <blockquote className="text-2xl italic text-high-contrast leading-relaxed">
                        "{quote}"
                      </blockquote>
                    </div>
                    <button
                      onClick={() => removeFavorite(quote)}
                      className="opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 p-2 rounded-full bg-red-500/20 hover:bg-red-500/30"
                      aria-label="Remove from favorites"
                    >
                      <Trash2 className="h-5 w-5 text-red-400" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="card-professional p-8 rounded-3xl shadow-professional">
                <div className="flex items-center justify-center space-x-4">
                  <Heart className="h-12 w-12 text-primary-gold/50" />
                  <div className="text-left">
                    <blockquote className="text-2xl italic text-high-contrast leading-relaxed">
                      "You don't have any favorite quotes yet. Start adding some!"
                    </blockquote>
                    <p className="mt-4 text-lg text-medium-contrast font-medium">
                      Generate quotes and click the heart to save them here.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}