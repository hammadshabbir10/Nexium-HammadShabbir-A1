'use client';

import { useState, useEffect } from 'react';
import { Quote, Clock, Trash2, ArrowLeft, ArrowRight, Edit3 } from 'lucide-react';
import Link from 'next/link';

interface HistoryItem {
  topic: string;
  quotes: string[];
  timestamp: string;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const savedHistory = localStorage.getItem('quoteHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  };

  const clearHistory = () => {
    setHistory([]);
    setSelectedItem(null);
    localStorage.removeItem('quoteHistory');
  };

  const removeHistoryItem = (index: number) => {
    const updatedHistory = history.filter((_, i) => i !== index);
    setHistory(updatedHistory);
    localStorage.setItem('quoteHistory', JSON.stringify(updatedHistory));
    
    // If we're viewing the deleted item, go back to history list
    if (selectedItem && selectedItem === history[index]) {
      setSelectedItem(null);
    }
  };

  const viewQuotes = (item: HistoryItem) => {
    setSelectedItem(item);
  };

  const backToHistory = () => {
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased">
      <main className="flex-1 flex flex-col items-center justify-center p-6 section-professional">
        <div className="w-full max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Clock className="h-8 w-8 text-primary-gold" />
              <h1 className="heading-primary text-4xl md:text-5xl font-bold tracking-tight">
                Quote History
              </h1>
              
            </div>
            <p className="text-lg md:text-xl text-high-contrast max-w-2xl mx-auto leading-relaxed font-medium">
              Your journey through inspiring quotes. Every search, every moment of inspiration.
            </p>
            {history.length > 0 && !selectedItem && (
              <button
                onClick={clearHistory}
                className="btn-professional btn-medium-width px-6 py-3 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                Clear All History
              </button>
            )}
          </div>
          
          {/* Navigation */}
          {selectedItem && (
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={backToHistory}
                className="flex items-center space-x-2 btn-professional px-4 py-2 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to History</span>
              </button>
            </div>
          )}
          
          {/* Content Display */}
          {selectedItem ? (
            // Show selected item's quotes
            <div className="space-y-6">
              <div className="card-professional p-8 rounded-3xl shadow-professional">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-6 w-6 text-primary-gold" />
                    <h3 className="heading-secondary text-xl md:text-2xl font-bold">
                      "{selectedItem.topic}"
                    </h3>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {selectedItem.quotes.map((quote, quoteIndex) => (
                    <div key={quoteIndex} className="flex items-start space-x-4 p-4 rounded-2xl bg-primary-navy/20">
                      <Quote className="h-6 w-6 text-primary-gold mt-1 flex-shrink-0" />
                      <blockquote className="quote-text-mobile text-base md:text-lg italic text-high-contrast leading-relaxed text-left">
                        "{quote}"
                      </blockquote>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // Show history list
            <div className="space-y-8">
              {history.length > 0 ? (
                history.map((item, index) => (
                  <div 
                    key={index}
                    className="card-professional p-8 rounded-3xl shadow-professional animate-fade-in relative hover:shadow-custom-hover transition-all duration-500 group"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <Clock className="h-6 w-6 text-primary-gold" />
                        <h3 className="heading-secondary text-xl md:text-2xl font-bold">
                          "{item.topic}"
                        </h3>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => viewQuotes(item)}
                          className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 hover:scale-110 p-2 rounded-full bg-primary-navy/20 hover:bg-primary-navy/30"
                          aria-label="View quotes"
                        >
                          <ArrowRight className="h-5 w-5 text-primary-gold" />
                        </button>
                        <button
                          onClick={() => removeHistoryItem(index)}
                          className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 hover:scale-110 p-2 rounded-full bg-red-500/20 hover:bg-red-500/30"
                          aria-label="Remove from history"
                        >
                          <Trash2 className="h-5 w-5 text-red-400" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="text-high-contrast">
                      {item.quotes.length} quote{item.quotes.length !== 1 ? 's' : ''} generated
                    </div>
                  </div>
                ))
              ) : (
                <div className="card-professional p-8 rounded-3xl shadow-professional">
                  <div className="flex items-center justify-center space-x-4">
                    <Clock className="h-12 w-12 text-primary-gold/50" />
                    <div className="text-left">
                      <blockquote className="quote-text-mobile text-lg md:text-xl italic text-high-contrast leading-relaxed">
                        "No history yet. Start generating quotes to see them here!"
                      </blockquote>
                      <p className="mt-4 text-base md:text-lg text-medium-contrast font-medium">
                        Your quote generation history will appear here.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}