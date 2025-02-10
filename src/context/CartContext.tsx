"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface Produit {
    id: number;
    nom: string;
    prix: number;
    image: string;
}

interface CartContextType {
    panier: Produit[];
    ajouterAuPanier: (produit: Produit) => void;
    retirerDuPanier: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [panier, setPanier] = useState<Produit[]>([]);

    const ajouterAuPanier = (produit: Produit) => {
        setPanier([...panier, produit]);
    };

    const retirerDuPanier = (id: number) => {
        setPanier(panier.filter((produit) => produit.id !== id));
    };

    return (
        <CartContext.Provider value={{ panier, ajouterAuPanier, retirerDuPanier }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart doit être utilisé dans un CartProvider");
    }
    return context;
}