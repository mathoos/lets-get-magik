"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import { useCart } from "../context/CartContext"; 
import { useSearch } from "../context/SearchContext"; // 🔹 Import du contexte de recherche

type Produit = {
  id: string;
  nom: string;
  description: string;
  prix: number;
  image: string;
  quantite: number;
  categorie: string; 
};

export default function Home() {
  const [produits, setProduits] = useState<Produit[]>([]);
  const [categorieFiltre, setCategorieFiltre] = useState<string | null>(null);
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
      (!categorieFiltre || produit.categorie.toLowerCase() === categorieFiltre.toLowerCase()) &&
      produit.nom.toLowerCase().includes(recherche.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Nos Produits</h1>

      
      <div className="mb-4">
        <button onClick={() => setCategorieFiltre(null)} className="px-4 py-2 mr-2 bg-gray-300 rounded">
          Tous
        </button>
        <button onClick={() => setCategorieFiltre("maquillage")} className="px-4 py-2 mr-2 bg-blue-500 text-white rounded">
          Maquillage
        </button>
        <button onClick={() => setCategorieFiltre("soin")} className="px-4 py-2 bg-green-500 text-white rounded">
          Soin
        </button>
      </div>

      <div>
        {produitsFiltres.length === 0 ? (
          <p>Aucun produit trouvé</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {produitsFiltres.map((produit) => (
              <div key={produit.id} className="border p-4">
                <Link href={`/produit/${produit.id}`}>
                  <h2 className="text-xl cursor-pointer text-blue-600 hover:underline">{produit.nom}</h2>
                  <img src={produit.image} alt={produit.nom} className="w-full h-40 object-cover" />
                </Link>
                <p>{produit.description}</p>
                <p className="text-lg font-bold">{produit.prix} €</p>
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
