"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import supabase from "@/lib/supabase";
import { useCart } from "../context/CartContext"; 
import { useSearch } from "../context/SearchContext"; 
import Header from "../components/Header";

import "./page.scss";

type Produit = {
    id: string;
    nom: string;
    description: string;
    prix: number;
    image: string;
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
            } 
            else {
                setProduits(data);
            }
        }
        fetchProduits();
    }, []);

    const produitsFiltres = produits.filter(
        (produit) =>
        (!categorieFiltre || produit.categorie === categorieFiltre) &&
        produit.nom.toLowerCase().includes(recherche.toLowerCase())
    );

    return (
        <div className="home">
            <Header />

            <div className="home_subtitle">
                <p>Nos formules sont : courtes, concentrées, fabriquées en France</p>
            </div>

            <div className="home_search">
                <h2>Nos produits</h2>

                {/*Filtres de catégorie */}
                <div className="home_search-tags">
                    
                
                    <button 
                        onClick={() => setCategorieFiltre(null)}
                        className={`tag ${categorieFiltre === null ? "active" : ""}`}
                    >
                        Tous
                    </button>
                    <button 
                        onClick={() => setCategorieFiltre("Maquillage")}
                        className={`tag ${categorieFiltre === "Maquillage" ? "active" : ""}`}
                    >
                        Crèmes
                    </button>
                    <button 
                        onClick={() => setCategorieFiltre("Soin")}
                        className={`tag ${categorieFiltre === "Soin" ? "active" : ""}`}
                    >
                        Soins
                    </button>
                    <button 
                        onClick={() => setCategorieFiltre("Soin")}
                        className={`tag ${categorieFiltre === "Soin" ? "active" : ""}`}
                    >
                        Sérums
                    </button>
                 
                </div>

            </div>

            {/*Liste des produits */}
            <div className="home_produits">
                {produitsFiltres.length === 0 ? (
                <p>Aucun produit trouvé</p>
                ) : (
                <div className="home_produits-container">
                    {produitsFiltres.map((produit) => (
                        <div key={produit.id} className="produit">
                            <Link href={`/produit/${produit.id}`} className="produit_link">
                                <h2>{produit.nom}</h2>
                                <img src={produit.image} alt={produit.nom} className="produit_link-img"/>
                            </Link>
                            <div className="produit_info">
                                <p>{produit.prix} €</p>
                                <button onClick={() => ajouterAuPanier({ ...produit, quantite: 1 })}>
                                    Ajouter au panier
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                )}
            </div>
        </div>
    );
}
