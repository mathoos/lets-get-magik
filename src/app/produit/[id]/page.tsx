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
        <div className="flex flex-col md:flex-row w-full h-auto md:h-[100vh] bg-[var(--secondary)]">

          
            <figure className="w-[100vw] h-[100vw] md:h-full md:w-[40vw] pt-[calc(8vh+10vh)] md:pt-[8vh] px-[30px] md:px-[0] pb-[30px] md:pb-[0] md:border-r-[2px] border-[var(--primary)] border-[none]">
                <img 
                    src={produit.image} 
                    alt={produit.nom}
                    className="w-full h-full object-contain md:object-cover"
                />
            </figure>
            

            <div className="flex flex-col md:flex-row justify-center items-center h-full w-full md:w-[60vw]">

                <div className="flex flex-col justify-between gap-[5vh] w-full h-full p-[30px] md:pt-[20vh] md:px-[10vw] pb-[10vh]">
                    <div className="flex flex-col gap-[2.5vh]">
                        <h1 className="text-[10vw] md:text-[3.5vw] leading-[0.8]">{produit.nom}</h1>
                        <p className="text-[5vw] md:text-[1.2vw] font-bold w-full md:w-[90%]">{produit.description}</p>
                    </div>
                    
                    <div className="">
                        <p className="h-auto md:h-[30vh] pr-none md:pr-[50px] overflow-y-auto">{produit.details}</p>
                    </div>
                    
                    <div className="flex items-center justify-between md:justify-end gap-[2vw]">
                        <p className="text-[5vw] md:text-[1.5vw] font-bold">{produit.prix}€</p>
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
