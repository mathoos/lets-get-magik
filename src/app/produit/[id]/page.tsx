"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import supabase from "@/lib/supabase";
import { useCart } from "@/context/CartContext";

type Produit = {
  id: string;
  nom: string;
  description: string;
  details: string; // 🔹 Texte long sur le produit
  prix: number;
  image: string;
  quantite: number;
};

export default function ProduitPage() {
  const { id } = useParams();
  const [produit, setProduit] = useState<Produit | null>(null);
  const { ajouterAuPanier } = useCart();

  useEffect(() => {
    async function fetchProduit() {
      const { data, error } = await supabase.from("produits").select("*").eq("id", id).single();
      if (error) {
        console.error("Erreur de chargement du produit", error);
      } else {
        setProduit(data);
      }
    }
    fetchProduit();
  }, [id]);

  if (!produit) return <p>Chargement...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{produit.nom}</h1>
      <img src={produit.image} alt={produit.nom} className="w-96 h-96 object-cover my-4" />
      <p className="text-lg">{produit.description}</p>
      <p className="text-gray-600 mt-4">{produit.details}</p> {/* 🔹 Texte détaillé */}
      <p className="text-2xl font-bold mt-4">{produit.prix} €</p>
      <button
        onClick={() => ajouterAuPanier({ ...produit, quantite: 1 })}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded"
      >
        Ajouter au panier
      </button>
    </div>
  );
}
