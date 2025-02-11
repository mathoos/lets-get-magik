"use client";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";

type Produit = {
  id: string;
  nom: string;
  description: string;
  prix: number;
  image: string;
  quantite: number;
};

export default function Home() {
  const [produits, setProduits] = useState<Produit[]>([]);
  const { ajouterAuPanier } = useCart();
  const { recherche } = useSearch();

  useEffect(() => {
    async function fetchProduits() {
      const { data, error } = await supabase.from("produits").select("*");
      if (error) {
        console.error(error);
      } else {
        setProduits(data);
      }
    }
    fetchProduits();
  }, []);

  const produitsFiltres = produits.filter(
    (produit) =>
      produit.nom.toLowerCase().includes(recherche) || produit.description.toLowerCase().includes(recherche)
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mt-8">Nos Produits</h1>
      <div>
        {produitsFiltres.length === 0 ? (
          <p>Pas de produits disponibles pour cette recherche</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {produitsFiltres.map((produit) => (
              <div key={produit.id} className="border p-4">
                <h2 className="text-xl">{produit.nom}</h2>
                <p>{produit.description}</p>
                <p className="text-lg font-bold">{produit.prix} €</p>
                <img src={produit.image} alt={produit.nom} />
                <button
                  onClick={() => ajouterAuPanier({ ...produit, quantite: 1 })}
                  className="mt-2 p-2 bg-blue-500 text-white rounded"
                >
                  Ajouter au panier
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
