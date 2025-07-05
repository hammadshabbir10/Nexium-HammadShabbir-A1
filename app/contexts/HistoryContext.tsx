'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type HistoryItem = {
  id: string;
  name: string;
  topic: string;
  quotes: string[];
  createdAt: Date;
};

type HistoryContextType = {
  history: HistoryItem[];
  addToHistory: (topic: string, quotes: string[]) => void;
  getHistoryItem: (id: string) => HistoryItem | undefined;
};

const HistoryContext = createContext<HistoryContextType>({
  history: [],
  addToHistory: () => {},
  getHistoryItem: () => undefined,
});

export function HistoryProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('quoteHistory');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const addToHistory = (topic: string, quotes: string[]) => {
    const newItem = {
      id: Date.now().toString(),
      name: `${topic.charAt(0).toUpperCase() + topic.slice(1)} Quotes`,
      topic,
      quotes,
      createdAt: new Date(),
    };

    const updatedHistory = [newItem, ...history].slice(0, 50);
    setHistory(updatedHistory);
    localStorage.setItem('quoteHistory', JSON.stringify(updatedHistory));
  };

  const getHistoryItem = (id: string) => {
    return history.find(item => item.id === id);
  };

  return (
    <HistoryContext.Provider value={{ history, addToHistory, getHistoryItem }}>
      {children}
    </HistoryContext.Provider>
  );
}

export const useHistory = () => useContext(HistoryContext);