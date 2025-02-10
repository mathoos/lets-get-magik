"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Définition de l'interface d'un produit
interface Produit {
  id: number;
  nom: string;
  prix: number;
  image: string;
}

// Définition de l'interface d'un produit dans le panier (avec la quantité)
interface ProduitPanier extends Produit {
  quantite: number;
}

// Définition des fonctions disponibles dans le contexte du panier
interface CartContextType {
  panier: ProduitPanier[];
  ajouterAuPanier: (produit: Produit) => void;
  retirerDuPanier: (id: number) => void;
  calculerTotal: () => number;
}

// Création du contexte du panier
const CartContext = createContext<CartContextType | undefined>(undefined);

// Création du Provider pour gérer l'état global du panier
export function CartProvider({ children }: { children: ReactNode }) {
  const [panier, setPanier] = useState<ProduitPanier[]>([]);

  // Fonction pour ajouter un produit au panier
  const ajouterAuPanier = (produit: Produit) => {
    setPanier((prevPanier) => {
      const existe = prevPanier.find((p) => p.id === produit.id);

      if (existe) {
        // Si le produit est déjà dans le panier, augmenter la quantité
        return prevPanier.map((p) =>
          p.id === produit.id ? { ...p, quantite: p.quantite + 1 } : p
        );
      } else {
        // Sinon, ajouter le produit avec une quantité initiale de 1
        return [...prevPanier, { ...produit, quantite: 1 }];
      }
    });
  };

  // Fonction pour retirer un produit du panier
  const retirerDuPanier = (id: number) => {
    setPanier((prevPanier) =>
      prevPanier
        .map((p) => (p.id === id ? { ...p, quantite: p.quantite - 1 } : p))
        .filter((p) => p.quantite > 0) // Supprimer les produits dont la quantité devient 0
    );
  };

  // Fonction pour calculer le total du panier
  const calculerTotal = () => {
    return panier.reduce((total, produit) => total + produit.prix * produit.quantite, 0);
  };

  return (
    <CartContext.Provider value={{ panier, ajouterAuPanier, retirerDuPanier, calculerTotal }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook personnalisé pour utiliser le contexte du panier
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart doit être utilisé dans un CartProvider");
  }
  return context;
}
