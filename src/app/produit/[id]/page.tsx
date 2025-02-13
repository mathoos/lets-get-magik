"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import supabase from "@/lib/supabase";
import { useCart } from "@/context/CartContext";

import "./page.scss";

type Produit = {
    id: string;
    nom: string;
    description: string;
    details: string;
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
            } 
            else {
                setProduit(data);
            }
        }
        fetchProduit();
    }, [id]);

    if (!produit) return <p>Chargement...</p>;

    return (
        <div className="page-produit">
            <div className="page-produit_left">
                <figure className="page-produit_left-imgPrincipale">
                    <img src={produit.image} alt={produit.nom}/>
                </figure>
                <figure className="page-produit_left-imgSecondaires">
                    <img src={produit.image} alt={produit.nom}/>
                    <img src={produit.image} alt={produit.nom}/>
                    <img src={produit.image} alt={produit.nom}/>
                </figure>
            </div>

            <div className="page-produit_right">
                <div className="page-produit_right-info">
                    <h1>{produit.nom}</h1>
                    
                    <p className="">{produit.description}</p>
                    <p className="">{produit.details}</p>
                    <p className="">{produit.prix} €</p>
                    <button
                        onClick={() => ajouterAuPanier({ ...produit, quantite: 1 })}
                        className=""
                    >
                        Ajouter au panier
                    </button>
                </div>
                
            </div>


            
        </div>
    );
}
