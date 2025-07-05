'use client';
import { useHistory } from '../contexts/HistoryContext';
import Link from 'next/link';

export default function HistoryPage() {
  const { history } = useHistory();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Quote History</h1>
          
          <div className="space-y-4">
            {history.length > 0 ? (
              history.map((item) => (
                <Link 
                  key={item.id} 
                  href={`/history/${item.id}`}
                  className="block bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800/70 transition-colors"
                >
                  <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                  <p className="text-gray-400">
                    Searched: {new Date(item.createdAt).toLocaleString()}
                  </p>
                </Link>
              ))
            ) : (
              <p className="text-gray-400">Your history is empty. Generate some quotes first!</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}