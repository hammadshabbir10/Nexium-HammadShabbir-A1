// app/my-quotes/page.tsx
'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type Quote = {
  _id: string;
  quote: string;
  createdAt: string;
};

export default function MyQuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const id = localStorage.getItem('userId');
    if (id) {
      setUserId(id);
      fetchQuotes(id);
    }
  }, []);

  const fetchQuotes = async (userId: string) => {
    try {
      const response = await fetch(`/api/get-quotes?userId=${userId}`);
      const data = await response.json();
      if (data.success) {
        setQuotes(data.quotes);
      }
    } catch (error) {
      console.error('Failed to fetch quotes:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      
      <main className="flex-1 p-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">My Own Quotes</h1>
          
          {quotes.length === 0 ? (
            <p className="text-gray-400 text-center">You haven't saved any quotes yet</p>
          ) : (
            <div className="space-y-4">
              {quotes.map((quote) => (
                <div 
                  key={quote._id}
                  className="bg-gray-800/50 p-6 rounded-2xl border-l-4 border-blue-500"
                >
                  <blockquote className="text-xl italic text-gray-100">
                    "{quote.quote}"
                  </blockquote>
                  <p className="mt-2 text-sm text-gray-400">
                    Saved on {new Date(quote.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

    </div>
  );
}