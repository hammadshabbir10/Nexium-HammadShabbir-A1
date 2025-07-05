'use client';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Quote, Save, Sparkles } from "lucide-react";
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
      // Save to localStorage instead of API
      const savedQuotesData = localStorage.getItem('savedQuotes');
      const savedQuotes = savedQuotesData ? JSON.parse(savedQuotesData) : [];
      
      const newQuote = {
        id: crypto.randomUUID(),
        quote: customQuote,
        userId: userId,
        createdAt: new Date().toISOString()
      };
      
      savedQuotes.push(newQuote);
      localStorage.setItem('savedQuotes', JSON.stringify(savedQuotes));
      
      setCustomQuote('');
      setError(""); // Clear any previous errors
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
    <div className="min-h-screen flex flex-col font-sans antialiased">      
      <main className="flex-1 flex flex-col items-center justify-center p-6 section-professional">
        <div className="w-full max-w-4xl mx-auto text-center space-y-12">
          {/* Hero Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Sparkles className="h-8 w-8 text-primary-gold animate-pulse" />
              <h1 className="heading-primary text-6xl font-bold tracking-tight">
                Quote Generator
              </h1>
            </div>
           
          </div>
          
          {/* Quotes Display Area */}
          <div className="space-y-6">
            {quotes.length > 0 ? (
              quotes.map((quote, index) => (
                <div 
                  key={index}
                  className="card-professional p-8 rounded-3xl shadow-professional animate-fade-in relative hover:shadow-custom-hover transition-all duration-500 group"
                >
                  <div className="absolute top-6 right-6">
                    <button
                      onClick={() => toggleFavorite(quote)}
                      className="hover:scale-110 transition-transform duration-300 p-2 rounded-full bg-primary-navy/20 hover:bg-primary-navy/30"
                      aria-label={favorites.includes(quote) ? "Remove from favorites" : "Add to favorites"}
                    >
                      <Heart 
                        className={`h-6 w-6 ${favorites.includes(quote) ? "text-red-500 fill-red-500" : "text-primary-gold hover:text-red-400"}`}
                      />
                    </button>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Quote className="h-8 w-8 text-primary-gold mt-2 flex-shrink-0" />
                    <blockquote className="text-2xl italic text-high-contrast leading-relaxed text-left">
                      "{quote}"
                    </blockquote>
                  </div>
                </div>
              ))
            ) : (
              <div className="card-professional p-8 rounded-3xl shadow-professional">
                <div className="flex items-start space-x-4">
                  <Quote className="h-8 w-8 text-primary-gold mt-2 flex-shrink-0" />
                  <div className="text-left">
                    <blockquote className="text-2xl italic text-high-contrast leading-relaxed">
                      "The only limit to our realization of tomorrow is our doubts of today."
                    </blockquote>
                    <p className="mt-4 text-lg text-medium-contrast font-medium">
                      — Franklin D. Roosevelt
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Section */}
          <div className="space-y-8 w-full max-w-2xl mx-auto">
            <div className="space-y-4">
              <h2 className="heading-secondary text-3xl font-bold mb-6">Generate New Quotes</h2>
              <Input
                type="text"
                placeholder="Generate inspiring quotes about..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerateQuotes()}
                className="input-professional w-full px-6 py-4 text-lg rounded-2xl text-high-contrast border-primary-gold/30 focus:ring-2 focus:ring-primary-gold hover:bg-primary-navy transition-all duration-300 placeholder-primary-gold/60"
              />
              
              <Button 
                onClick={handleGenerateQuotes}
                disabled={isLoading}
                className="btn-professional btn-full-width py-5 text-lg text-white rounded-2xl font-semibold transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
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
                  <span className="flex items-center justify-center">
                    Generate Inspiring Quotes
                  </span>
                )}
              </Button>
            </div>

            {/* Custom Quote Section */}
            <div className="space-y-4 pt-8 border-t border-primary-gold/20">
              <h2 className="heading-secondary text-3xl font-bold mb-6">Share Your Wisdom</h2>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Enter your own inspirational quote..."
                  value={customQuote}
                  onChange={(e) => setCustomQuote(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveCustomQuote()}
                  className="input-professional w-full px-6 py-4 text-lg rounded-2xl text-high-contrast border-primary-gold/30 focus:ring-2 focus:ring-primary-gold hover:bg-primary-navy transition-all duration-300 placeholder-primary-gold/60 pr-20"
                />
                <Button 
                  onClick={handleSaveCustomQuote}
                  disabled={saveLoading}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-gold hover:bg-primary-gold/80 text-primary-black rounded-xl px-4 py-2 transition-all duration-300"
                >
                  {saveLoading ? (
                    <svg className="animate-spin h-5 w-5 text-primary-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <span className="flex items-center">
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}