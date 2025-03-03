"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import headerImage from "../../assets/headerImg7.jpg";
import { useCart } from "../../context/CartContext"; 


interface Produit {
    id: string;
    nom: string;
    prix: number;
    quantite: number;
    image: string;
}

export default function SuccessPage() {
    const [commande, setCommande] = useState<Produit[]>([]);  
    const { viderPanier } = useCart();  

    useEffect(() => {
        const savedCommande = localStorage.getItem("commande");
        if (savedCommande) {
            setCommande(JSON.parse(savedCommande));
            localStorage.removeItem("commande"); 
        }
    
        if (savedCommande) {
            viderPanier();
        }
    }, [viderPanier]);
    

    return (
        <div className="flex w-full h-[100vh] bg-[var(--secondary)]">
            <figure className="relative w-[35vw] overflow-hidden">
                <Image className="w-full h-full object-cover object-top" src={headerImage} alt="Produit sur fond d'eau" />
                <Link href="/" className="absolute right-[2vw] bottom-[2vw] bg-[var(--secondary)] px-[15px] py-[5px] md:px-[2vw] md:py-[1vh]">Retourner à la boutique</Link>
            </figure>

            <div className="flex flex-col justify-between gap-[5vh] w-[65vw] h-full pt-[20vh] pb-[10vh] px-[10vw]">
                <div className="flex flex-col gap-[2vh]">
                    <h1 className="text-[1.5vw] font-bold">Paiement réussi !</h1>
                    <p>
                        Merci pour votre commande. <br/>
                        Celle-ci sera traitée dans les plus brefs délais. <br/>
                        Un mail de confirmation va vous être envoyé avec le récapitulatif de votre commande et les 
                        délais de livraison.
                    </p>
                </div>

                <div className="flex flex-col h-full">
                    <h2 className="mb-[2vh]">Récapitulatif de votre commande :</h2>
                    <div className="flex flex-col gap-[1vw] w-full h-full">
                        {commande.length > 0 ? (
                            commande.map((produit) => (
                                <div key={produit.id} className="flex justify-between items-center pb-[0.5vw] border-b border-[var(--primary)]">
                                    <img 
                                        className="w-[2.5vw] h-[2.5vw] object-cover"
                                        src={produit.image} 
                                        alt={produit.nom} />
                                    <h3 className="w-[60%] pl-[0.5vw] text-left">{produit.nom}</h3>
                                    <p className="w-[20%] text-center">{produit.quantite}</p>
                                    <p className="w-[20%] text-right">{produit.prix}€</p>
                                </div>
                            ))
                        ) : (
                            <p>Aucune commande trouvée.</p>
                        )}
                    </div>
                    <p className="self-end mt-auto font-bold">Total : {commande.reduce((total, produit) => total + produit.prix * produit.quantite, 0)}€</p>

                </div>
            </div>
        </div>
    );
}
