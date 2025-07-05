'use client';
import { use } from 'react'; // Add this import
import { useHistory } from '../../contexts/HistoryContext';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function HistoryItemPage({
  params,
}: {
  params: Promise<{ id: string }> // Update type to Promise
}) {
  const unwrappedParams = use(params); // Unwrap the promise
  const { getHistoryItem } = useHistory();
  const item = getHistoryItem(unwrappedParams.id); // Use unwrapped params

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
        <p className="text-white text-xl">History item not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      
      <main className="flex-1 p-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-6">{item.name}</h1>
          <div className="space-y-4">
            {item.quotes.map((quote, index) => (
              <div 
                key={index}
                className="bg-gray-800/50 p-6 rounded-2xl border-l-4 border-green-500"
              >
                <blockquote className="text-xl italic text-gray-100">
                  "{quote}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </main>
      
    </div>
  );
}