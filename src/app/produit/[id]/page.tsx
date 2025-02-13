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
    images: string[];
};

export default function ProduitPage() {
    const { id } = useParams();
    const [produit, setProduit] = useState<Produit | null>(null);
    const { ajouterAuPanier } = useCart();

    useEffect(() => {
        async function fetchProduit() {
            const { data, error } = await supabase
                .from("produits")
                .select("id, nom, description, details, prix, image, images")
                .eq("id", id)
                .single();
    
            if (error) {
                console.error("Erreur de chargement du produit", error);
            } else {
                // Convertir la chaîne en tableau
                const imagesArray = data.images ? data.images.split(",") : [];  
                setProduit({ ...data, images: imagesArray });
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
                    {produit.images.length > 0 ? (
                        produit.images.map((img, index) => (
                            <img key={index} src={img} alt={`${produit.nom} - ${index + 1}`} />
                        ))
                    ) : (
                        // Si pas d'images secondaires, afficher 3 fois l'image principale
                        [...Array(3)].map((_, index) => (
                            <img key={index} src={produit.image} alt={`${produit.nom} - principale`} />
                        ))
                    )}
                </figure>
            </div>

            <div className="page-produit_right">
                <div className="page-produit_right-info">
                    <h1>{produit.nom}</h1>
                    <p className="subtitle">{produit.description}</p>
                    <p className="text">{produit.details}</p>
                    <div className="page-produit_right-info--bottom">
                        <p className="price">{produit.prix} €</p>
                        <button
                            onClick={() => ajouterAuPanier({ ...produit, quantite: 1 })}
                            className="bouton"
                        >
                            Ajouter au panier
                        </button>
                    </div>
                </div>
            </div> 
        </div>
    );
}
