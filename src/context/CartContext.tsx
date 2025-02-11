"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// Définir le type du produit
type Produit = {
  id: string;
  nom: string;
  prix: number;
  image: string;
  quantite: number;
};

type CartContextType = {
  panier: Produit[];
  ajouterAuPanier: (produit: Produit) => void;
  retirerDuPanier: (id: string) => void;
  viderPanier: () => void;
  calculerTotal: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [panier, setPanier] = useState<Produit[]>([]);

  // Ajouter un produit au panier
  const ajouterAuPanier = (produit: Produit) => {
    setPanier((prevPanier) => {
      // Si le produit est déjà dans le panier, augmenter la quantité
      const produitExistant = prevPanier.find((p) => p.id === produit.id);
      if (produitExistant) {
        return prevPanier.map((p) =>
          p.id === produit.id ? { ...p, quantite: p.quantite + 1 } : p
        );
      }
      return [...prevPanier, { ...produit, quantite: 1 }];
    });
  };

  // Retirer un produit du panier
  const retirerDuPanier = (id: string) => {
    setPanier((prevPanier) => prevPanier.filter((produit) => produit.id !== id));
  };

  // Vider le panier
  const viderPanier = () => {
    setPanier([]);
  };

  // Calculer le total du panier
  const calculerTotal = () => {
    return panier.reduce((total, produit) => total + produit.prix * produit.quantite, 0);
  };

  return (
    <CartContext.Provider
      value={{ panier, ajouterAuPanier, retirerDuPanier, viderPanier, calculerTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook personnalisé pour utiliser le panier
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
