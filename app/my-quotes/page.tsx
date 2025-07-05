// app/my-quotes/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { Quote, Edit3, Trash2, User } from 'lucide-react';

interface SavedQuote {
  id: string;
  quote: string;
  userId: string;
  createdAt: string;
}

export default function MyQuotesPage() {
  const [savedQuotes, setSavedQuotes] = useState<SavedQuote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSavedQuotes();
  }, []);

  const fetchSavedQuotes = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setLoading(false);
        return;
      }

      // For now, use localStorage instead of API
      const savedQuotesData = localStorage.getItem('savedQuotes');
      if (savedQuotesData) {
        const quotes = JSON.parse(savedQuotesData);
        const userQuotes = quotes.filter((quote: SavedQuote) => quote.userId === userId);
        setSavedQuotes(userQuotes);
      } else {
        setSavedQuotes([]);
      }
    } catch (err) {
      setError('Failed to load saved quotes');
    } finally {
      setLoading(false);
    }
  };

  const deleteQuote = async (quoteId: string) => {
    try {
      const savedQuotesData = localStorage.getItem('savedQuotes');
      if (savedQuotesData) {
        const quotes = JSON.parse(savedQuotesData);
        const updatedQuotes = quotes.filter((quote: SavedQuote) => quote.id !== quoteId);
        localStorage.setItem('savedQuotes', JSON.stringify(updatedQuotes));
        setSavedQuotes(prev => prev.filter(quote => quote.id !== quoteId));
      }
    } catch (err) {
      setError('Failed to delete quote');
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Date not available';
      }
      return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString();
    } catch (err) {
      return 'Date not available';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col font-sans antialiased">
        <main className="flex-1 flex items-center justify-center p-6 section-professional">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-gold mx-auto mb-4"></div>
            <p className="text-high-contrast text-lg">Loading your quotes...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased">
      <main className="flex-1 flex flex-col items-center justify-center p-6 section-professional">
        <div className="w-full max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Edit3 className="h-8 w-8 text-primary-gold" />
              <h1 className="heading-primary text-5xl font-bold tracking-tight">
                My Own Quotes
              </h1>
            </div>
            <p className="text-xl text-high-contrast max-w-2xl mx-auto leading-relaxed font-medium">
              Your personal collection of wisdom and inspiration. Share your thoughts with the world.
            </p>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl shadow-custom max-w-md mx-auto">
                <p className="font-medium">{error}</p>
              </div>
            )}
          </div>
          
          {/* Quotes Display Area */}
          <div className="space-y-6">
            {savedQuotes.length > 0 ? (
              savedQuotes.map((quote) => (
                <div 
                  key={quote.id}
                  className="card-professional p-8 rounded-3xl shadow-professional animate-fade-in relative hover:shadow-custom-hover transition-all duration-500 group"
                >
                  <div className="flex items-start space-x-4">
                    <User className="h-8 w-8 text-primary-gold mt-2 flex-shrink-0" />
                    <div className="flex-1 text-left">
                      <blockquote className="text-2xl italic text-high-contrast leading-relaxed">
                        "{quote.quote}"
                      </blockquote>
                      <div className="mt-4 text-sm text-subtle">
                        Created on {formatDate(quote.createdAt)}
                      </div>
                    </div>
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <button
                        className="hover:scale-110 transition-transform duration-300 p-2 rounded-full bg-primary-navy/20 hover:bg-primary-navy/30"
                        aria-label="Edit quote"
                      >
                        <Edit3 className="h-5 w-5 text-primary-gold" />
                      </button>
                      <button
                        onClick={() => deleteQuote(quote.id)}
                        className="hover:scale-110 transition-transform duration-300 p-2 rounded-full bg-red-500/20 hover:bg-red-500/30"
                        aria-label="Delete quote"
                      >
                        <Trash2 className="h-5 w-5 text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="card-professional p-8 rounded-3xl shadow-professional">
                <div className="flex items-center justify-center space-x-4">
                  <Quote className="h-12 w-12 text-primary-gold/50" />
                  <div className="text-left">
                    <blockquote className="text-2xl italic text-high-contrast leading-relaxed">
                      "You haven't saved any quotes yet. Start sharing your wisdom!"
                    </blockquote>
                    <p className="mt-4 text-lg text-medium-contrast font-medium">
                      Go back to the main page and save your own inspirational quotes.
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