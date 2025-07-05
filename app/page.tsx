'use client';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart } from "lucide-react";
import { useHistory } from './contexts/HistoryContext';

export default function QuoteGenerator() {
  const [topic, setTopic] = useState("");
  const [quotes, setQuotes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [customQuote, setCustomQuote] = useState('');
  const [userId, setUserId] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);

  const { addToHistory } = useHistory();

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteQuotes');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    let id = localStorage.getItem('userId');
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem('userId', id);
    }
    setUserId(id);
  }, []);

  const handleGenerateQuotes = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic first");
      return;
    }

    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch('/api/generate-quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) throw new Error('Failed to fetch quotes');
      
      const data = await response.json();
      setQuotes(data.quotes);
      addToHistory(topic, data.quotes);
    } catch (err) {
      console.error(err);
      setError("Failed to generate quotes. Please try again.");
      setQuotes([
        "Every challenge is an opportunity in disguise.",
        "Persistence turns failure into extraordinary achievement.",
        "Your potential is limitless when you believe in yourself."
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveCustomQuote = async () => {
    if (!customQuote.trim()) {
      setError("Please enter your quote first");
      return;
    }

    setSaveLoading(true);
    setError("");

    try {
      const response = await fetch('/api/save-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, quote: customQuote }),
      });

      const data = await response.json();
      if (data.success) {
        setCustomQuote('');
        setError(""); // Clear any previous errors
      }
    } catch (err) {
      console.error(err);
      setError("Failed to save your quote");
    } finally {
      setSaveLoading(false);
    }
  };

  const toggleFavorite = (quote: string) => {
    let newFavorites;
    if (favorites.includes(quote)) {
      newFavorites = favorites.filter(fav => fav !== quote);
    } else {
      newFavorites = [...favorites, quote];
    }
    setFavorites(newFavorites);
    localStorage.setItem('favoriteQuotes', JSON.stringify(newFavorites));
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col font-sans antialiased">      
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-2xl mx-auto text-center space-y-10">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-white tracking-tight">
              Quote Generator
            </h1>
            {error && (
              <p className="text-red-400 bg-red-900/30 p-2 rounded-lg">
                {error}
              </p>
            )}
          </div>
          
          {/* Quotes Display Area */}
          <div className="space-y-6">
            {quotes.length > 0 ? (
              quotes.map((quote, index) => (
                <div 
                  key={index}
                  className="bg-gray-800/50 p-6 rounded-2xl border-l-4 border-green-500 animate-fade-in relative"
                >
                  <button
                    onClick={() => toggleFavorite(quote)}
                    className="absolute top-4 right-4 hover:scale-110 transition-transform"
                    aria-label={favorites.includes(quote) ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Heart 
                      className={`h-6 w-6 ${favorites.includes(quote) ? "text-red-500 fill-red-500" : "text-gray-400 hover:text-red-500"}`}
                    />
                  </button>
                  <blockquote className="text-2xl italic text-gray-100 leading-relaxed pr-8">
                    "{quote}"
                  </blockquote>
                </div>
              ))
            ) : (
              <div className="bg-gray-800/50 p-6 rounded-2xl border-l-4 border-green-500">
                <blockquote className="text-2xl italic text-gray-100 leading-relaxed">
                  "The only limit to our realization of tomorrow is our doubts of today."
                </blockquote>
                <p className="mt-4 text-lg text-gray-400">
                  — Franklin D. Roosevelt
                </p>
              </div>
            )}
          </div>

          <div className="space-y-6 w-full">
            <Input
              type="text"
              placeholder="Generate inspiring quotes about..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerateQuotes()}
              className="w-full px-6 py-4 text-lg rounded-full bg-gray-800 text-white border-gray-700 focus:ring-2 focus:ring-green-500 hover:bg-gray-700/80 transition-colors"
            />
            
            {/* Custom Quote Input */}
            <div className="relative">
              <Input
                type="text"
                placeholder="Enter your own inspirational quote..."
                value={customQuote}
                onChange={(e) => setCustomQuote(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveCustomQuote()}
                className="w-full px-6 py-4 text-lg rounded-full bg-gray-800 text-white border-gray-700 focus:ring-2 focus:ring-blue-500 hover:bg-gray-700/80 transition-colors"
              />
              <Button 
                onClick={handleSaveCustomQuote}
                disabled={saveLoading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2"
              >
                {saveLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  "Save"
                )}
              </Button>
            </div>

            <Button 
              onClick={handleGenerateQuotes}
              disabled={isLoading}
              className="w-full py-5 text-lg bg-green-600 hover:bg-green-700 text-white rounded-full font-medium transition-all hover:shadow-lg hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </span>
              ) : (
                "Generate Inspiring Quotes"
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}