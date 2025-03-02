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
        <div className="success">
            <figure className="success_img">
                <Image src={headerImage} alt="Produit sur fond d'eau" />
                <Link href="/" className="bouton">Retourner à la boutique</Link>
            </figure>

            <div className="success_info">
                <div className="success_info-title">
                    <h1>Paiement réussi !</h1>
                    <p>
                        Merci pour votre commande. <br/>
                        Celle-ci sera traitée dans les plus brefs délais. <br/>
                        Un mail de confirmation va vous être envoyé avec le récapitulatif de votre commande et les 
                        délais de livraison.
                    </p>
                </div>

                <div className="success_info-recap">
                    <h2>Récapitulatif de votre commande :</h2>
                    <div className="success_info-recap--container">
                        {commande.length > 0 ? (
                            commande.map((produit) => (
                                <div key={produit.id} className="produit">
                                    <img src={produit.image} alt={produit.nom} />
                                    <h3>{produit.nom}</h3>
                                    <p className="quantite">{produit.quantite}</p>
                                    <p className="prix">{produit.prix}€</p>
                                </div>
                            ))
                        ) : (
                            <p>Aucune commande trouvée.</p>
                        )}
                    </div>
                    <p className="total">Total : {commande.reduce((total, produit) => total + produit.prix * produit.quantite, 0)}€</p>

                </div>
            </div>
        </div>
    );
}
