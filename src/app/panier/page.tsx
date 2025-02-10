"use client";

import { useCart } from "@/context/CartContext";

export default function PanierPage() {
  const { panier, ajouterAuPanier, retirerDuPanier, calculerTotal } = useCart();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Votre Panier</h1>
      {panier.length === 0 ? (
        <p className="text-gray-600">Votre panier est vide.</p>
      ) : (
        <div className="space-y-4">
          {panier.map((produit) => (
            <div
              key={produit.id}
              className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">{produit.nom}</h2>
                <p className="text-lg font-bold text-blue-500">{produit.prix} €</p>
                <p className="text-sm text-gray-600">Quantité : {produit.quantite}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => retirerDuPanier(produit.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  -
                </button>
                <span className="px-3">{produit.quantite}</span>
                <button
                  onClick={() => ajouterAuPanier(produit)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  +
                </button>
              </div>
            </div>
          ))}

          {/* Affichage du total */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md text-right">
            <h2 className="text-2xl font-semibold">Total : {calculerTotal()} €</h2>
          </div>
        </div>
      )}
    </div>
  );
}
