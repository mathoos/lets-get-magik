"use client";
import { useEffect } from "react";
import { useCart } from "../../context/CartContext";
import Link from "next/link";
import Image from "next/image";
import headerImage from "../../assets/headerImg7.jpg"

import "./page.scss";

export default function SuccessPage() {

    const { viderPanier } = useCart();

    useEffect(() => {
        viderPanier();
    }, []); 
    

    return (
        <div className="success">
          
            <figure className="success_img">
                <Image src={headerImage} alt="Produit sur fond d'eau"/>
                <Link href="/" className="bouton">
                    Retourner à la boutique
                </Link>
            </figure>
            <div className="success_info">
    
                <div className="success_info-title">
                    <h1>Paiement réussi !</h1>
                    <p>
                        Merci pour votre commande. <br/>
                        Celle-ci sera traitée dans les plus brefs délais. <br/>
                        Un mail de confirmation va vous être envoyé avec le récapitulatif de votre commande 
                        et les délais de livraison.
                    </p>
                </div>
                <div className="success_info-recap">
                    <h2>Récapitulatif de votre commande :</h2>
                    <div className="success_info-recap--container"></div>
                </div>   
            </div>
        </div>
    );
}
