"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import supabase from "@/lib/supabase";
import { useCart } from "@/context/CartContext";

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
            } 
            else {
                // Convertir la chaîne en tableau
                const imagesArray = data.images ? data.images.split(",") : [];  
                setProduit({ ...data, images: imagesArray });
            }
        }
        fetchProduit();
    }, [id]);
    

    if (!produit) return <p>Chargement...</p>;

    return (
        <div className="flex w-full h-[100vh] bg-[var(--secondary)]">

          
            <figure className="w-[40vw] pt-[8vh] border-r-[2px] border-[var(--primary)]">
                <img 
                    src={produit.image} 
                    alt={produit.nom}
                    className="w-full h-full object-cover"
                />
            </figure>
            

            <div className="flex justify-center items-center h-full w-[60vw]">
                <div className="flex flex-col justify-between gap-[2.5vh] w-full h-full pt-[20vh] px-[10vw] pb-[10vh]">
                    <div className="flex flex-col gap-[2.5vh]">
                        <h1 className="text-[3.5vw] leading-[0.8]">{produit.nom}</h1>
                        <p className="text-[1.2vw] font-bold w-[90%]">{produit.description}</p>
                    </div>
                    
                    <div className="">
                        <p className="h-[33vh] pr-[50px] overflow-y-auto">{produit.details}</p>
                    </div>
                    
                    <div className="flex items-center justify-end gap-[2vw]">
                        <p className="text-[1.5vw] font-bold">{produit.prix}€</p>
                        <button
                            onClick={() => ajouterAuPanier({ ...produit, quantite: 1 })}
                            className="border border-[var(--primary)] px-[15px] py-[5px] md:px-[1.5vw] md:py-[1vh]"
                        >
                            Ajouter au panier
                        </button>
                    </div>
                </div>
            </div> 
        </div>
    );
}
