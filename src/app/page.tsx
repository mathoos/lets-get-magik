"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import supabase from "@/lib/supabase";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";
import Header from "../components/Header";

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
    const [categories, setCategories] = useState<string[]>([]);
    const { ajouterAuPanier } = useCart();
    const { recherche } = useSearch();

    useEffect(() => {
        async function fetchProduits() {
            const { data, error } = await supabase.from("produits").select("*");
            if (error) {
                console.error(error);
            } else {
                setProduits(data);
                const allCategories = ["Soin", "Sérum", "Crème"];
                const uniqueCategories = Array.from(new Set(data.map((prod) => prod.categorie).filter(cat => cat)));
                setCategories(Array.from(new Set([...allCategories, ...uniqueCategories])));
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
        <div className="w-full">
            <Header />

            <div className="bg-[var(--quaternary)] py-[15vh] px-[10vw]">
                <p className="text-[2.5vw] text-[var(--primary)]">Nos formules sont : courtes, concentrées, fabriquées en France</p>
            </div>

            <div className="sticky top-[-10vh] flex flex-col gap-[2vh] justify-between py-[20vh] px-[10vw] pb-[2vw] bg-[var(--secondary)]">
                <h2 className="text-[2.5vw] text-[var(--primary)]">Nos produits</h2>

                <div className="flex gap-[2vw]">
                    <button 
                        onClick={() => setCategorieFiltre(null)}
                        className={`text-[1.5vw] border border-[var(--primary)] px-[30px] py-[1vh] ${categorieFiltre === null ? "bg-[var(--primary)] text-[var(--secondary)]" : "text-[var(--primary)]"}`}
                    >
                        Tous
                    </button>
                    {categories.map((cat) => (
                        <button 
                            key={cat}
                            onClick={() => setCategorieFiltre(cat)}
                            className={`text-[1.5vw] border border-[var(--primary)] px-[30px] py-[1vh] ${categorieFiltre === cat ? "bg-[var(--primary)] text-[var(--secondary)]" : "text-[var(--primary)]"}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="py-[20vh] px-[10vw] bg-[var(--secondary)]">
                {produitsFiltres.length === 0 ? (
                    <p>Aucun produit trouvé</p>
                ) : (
                    <div className="grid grid-cols-3 gap-[5vw]">
                        {produitsFiltres.map((produit) => (
                            <div key={produit.id} className="flex flex-col gap-[30px] bg-white p-[30px]">
                                <Link href={`/produit/${produit.id}`} className="flex flex-col gap-[15px]">
                                    <h2 className="text-[var(--primary)] font-bold">{produit.nom}</h2>
                                    <img src={produit.image} alt={produit.nom} className="w-full h-80 object-cover"/>
                                </Link>
                                <div className="flex justify-between items-center">
                                    <p className="text-[var(--primary)]">{produit.prix} €</p>
                                    <button className="text-[var(--primary)] border border-[var(--primary)] px-[30px] py-[1vh]" onClick={() => ajouterAuPanier({ ...produit, quantite: 1 })}>
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
