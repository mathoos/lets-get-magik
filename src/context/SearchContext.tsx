"use client";
import { createContext, useContext, useState } from "react";

// Création du contexte
const SearchContext = createContext<{
  recherche: string;
  setRecherche: (recherche: string) => void;
} | null>(null);

// Provider du contexte
export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [recherche, setRecherche] = useState("");

  return (
    <SearchContext.Provider value={{ recherche, setRecherche }}>
      {children}
    </SearchContext.Provider>
  );
}

// Hook pour utiliser le contexte
export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch doit être utilisé dans un SearchProvider");
  }
  return context;
}
