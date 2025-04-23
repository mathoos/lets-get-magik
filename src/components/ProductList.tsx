"use client";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext";

type Produit = {
    id: string;
    nom: string;
    description: string;
    prix: number;
    image: string;
    categorie: string;
};


export default function ProductList({ produits }: { produits: Produit[] }) {

    const { ajouterAuPanier } = useCart();

    return (
        <div className="md:py-[20vh] py-[10vh] md:px-[10vw] px-[30px] bg-[var(--secondary)]">
            {produits.length === 0 ? (
                <p>Aucun produit trouvé</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-[30px] md:gap-[5vw]">
                    {produits.map((produit) => (
                        <div key={produit.id} className="flex flex-col justify-between gap-[10px] md:gap-[2vh]">
                            <Link href={`/produit/${produit.id}`} className="flex flex-col gap-[15px] md:gap-[5vh] md:h-auto h-full">
                                <Image 
                                    src={produit.image} 
                                    alt={produit.nom} 
                                    width={300}
                                    height={300}
                                    className="w-full h-[25vh] md:h-[55vh] object-cover"
                                />
                            </Link>
                            <div className="flex flex-col gap-[5px] md:gap-[2vh] h-full">
                                <div className="flex justify-between gap-[1.5vw] h-full">
                                    <h2 className="text-[3vw] md:text-[1vw] text-[var(--primary)] font-bold h-full">{produit.nom}</h2>
                                    <p className="text-[3vw] md:text-[1vw] text-[var(--primary)]">{produit.prix}€</p>
                                </div>
                                <button className="text-[var(--primary)] text-[2.5vw] md:text-[1vw] border border-[var(--primary)] px-[15px] md:px-[2vw] py-[5px] md:py-[1vh] transition-colors hover:bg-[var(--primary)] hover:text-[var(--secondary)]" onClick={() => ajouterAuPanier({ ...produit, quantite: 1 })}>
                                    Ajouter au panier
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
