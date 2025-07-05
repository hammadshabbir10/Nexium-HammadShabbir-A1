'use client';
import { use } from 'react'; // Add this import
import { useHistory } from '../../contexts/HistoryContext';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { Quote, ArrowLeft, Clock } from 'lucide-react';
import Link from 'next/link';

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
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="card-professional p-8 rounded-2xl text-center max-w-md">
          <Quote className="h-12 w-12 text-medium-contrast mx-auto mb-4" />
          <p className="text-high-contrast text-xl mb-4 font-medium">History item not found</p>
          <Link href="/history" className="text-primary-brown hover:text-primary-navy transition-colors font-medium">
            ← Back to History
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-6 section-professional">
        <div className="container-professional">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <Quote className="h-8 w-8 text-primary-brown" />
                <h1 className="heading-primary text-4xl font-bold">{item.name}</h1>
              </div>
              <Link 
                href="/history" 
                className="flex items-center space-x-2 text-medium-contrast hover:text-primary-brown transition-colors duration-300 font-medium"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to History</span>
              </Link>
            </div>
            
            <div className="space-y-6">
              {item.quotes.map((quote, index) => (
                <div 
                  key={index}
                  className="card-professional p-6 rounded-2xl shadow-professional hover:shadow-custom-hover transition-all duration-300 group"
                >
                  <div className="flex items-start space-x-4">
                    <Quote className="h-6 w-6 text-primary-brown mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <blockquote className="text-xl italic text-high-contrast leading-relaxed">
                        "{quote}"
                      </blockquote>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-primary-sage/10 rounded-xl border border-primary-sage/20">
              <div className="flex items-center space-x-2 text-medium-contrast font-medium">
                <Clock className="h-4 w-4" />
                <span>Searched on {new Date(item.createdAt).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}