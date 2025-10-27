"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface HistoryItem {
  id: string;
  title: string;
  prompt: string;
  content: string;
}

interface HistoryContextType {
  history: HistoryItem[];
  addHistory: (item: {
    title: string;
    prompt: string;
    content: string;
  }) => void;
  selectedItem: HistoryItem | null;
  setSelectedItem: (id: string | null) => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export function HistoryProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedItem, _setSelectedItem] = useState<HistoryItem | null>(null);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem("generationHistory");
      if (storedHistory) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Failed to parse history from localStorage", error);
    }
  }, []);

  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem("generationHistory", JSON.stringify(history));
    }
  }, [history]);

  const addHistory = (item: {
    title: string;
    prompt: string;
    content: string;
  }) => {
    const newItem: HistoryItem = { id: Date.now().toString(), ...item };
    const newHistory = [newItem, ...history];
    setHistory(newHistory);
    _setSelectedItem(newItem);
  };

  const setSelectedItem = (id: string | null) => {
    if (id === null) {
      _setSelectedItem(null);
    } else {
      const item = history.find((h) => h.id === id);
      _setSelectedItem(item || null);
    }
  };

  const value = {
    history,
    addHistory,
    selectedItem,
    setSelectedItem,
  };

  return (
    <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
  );
}

export function useHistory() {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error("useHistory must be used within a HistoryProvider");
  }
  return context;
}
