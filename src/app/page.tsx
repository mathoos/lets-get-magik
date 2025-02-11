"use client";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";

// Définir le type du produit
type Produit = {
  id: string;
  nom: string;
  description: string;
  prix: number;
  image: string;
};

export default function Home() {
  const [produits, setProduits] = useState<Produit[]>([]);  // Utilisation du type Produit ici

  useEffect(() => {
    async function fetchProduits() {
      const { data, error } = await supabase.from("produits").select("*");
      if (error) {
        console.error(error);
      } else {
        console.log(data);  // Ajouté pour débogage
        setProduits(data);
      }
    }
    fetchProduits();
  }, []);
  

  return (
    <div>
  <h1 className="text-3xl font-bold">Nos Produits</h1>
  <div>
    {produits.length === 0 ? (
      <p>Pas de produits disponibles</p>
    ) : (
      <div className="grid grid-cols-3 gap-4">
        {produits.map((produit) => (
          <div key={produit.id} className="border p-4">
            <h2 className="text-xl">{produit.nom}</h2>
            <p>{produit.description}</p>
            <p className="text-lg font-bold">{produit.prix} €</p>
            <img src={produit.image}></img>
          </div>
        ))}
      </div>
    )}
  </div>
</div>

  );
}
