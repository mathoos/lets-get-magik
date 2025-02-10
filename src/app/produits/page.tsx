"use client";

import React from "react";
import { useCart } from "../../context/CartContext";

const produits = [
    { id: 1, nom: "Produit 1", prix: 29.99, image: "/images/produit1.jpg" },
    { id: 2, nom: "Produit 2", prix: 49.99, image: "/images/produit2.jpg" },
    { id: 3, nom: "Produit 3", prix: 19.99, image: "/images/produit3.jpg" },
];

export default function ProduitsPage() {
    const { ajouterAuPanier } = useCart();

  return (
    <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Nos Produits</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {produits.map((produit) => (
                <div key={produit.id} className="bg-white p-4 rounded-lg shadow-md">
                    <img src={produit.image} alt={produit.nom} className="w-full h-64 object-cover rounded-lg mb-4" />
                    <h2 className="text-xl font-semibold mb-2">{produit.nom}</h2>
                    <p className="text-lg font-bold text-blue-500">{produit.prix} €</p>
                    <button
                        onClick={() => ajouterAuPanier(produit)}
                        className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                        Ajouter au panier
                    </button>
                </div>
            ))}
        </div>
    </div>
  );
}