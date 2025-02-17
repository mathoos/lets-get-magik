"use client";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";
import { useCart } from "../context/CartContext";
import trash from "../assets/trash.svg";
import "./Panier.scss";

export default function Panier({ isOpen, closePanier }: { isOpen: boolean; closePanier: () => void }) {

    const { panier, ajouterAuPanier, retirerDuPanier, calculerTotal } = useCart();
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

    const handleChangeQuantite = (produitId: string, newQuantite: number) => {
        if (newQuantite < 1) return; // Empêche d'aller en dessous de 1
        const produit = panier.find(p => p.id === produitId);
        if (produit) {
            const difference = newQuantite - produit.quantite;
            if (difference > 0) {
                for (let i = 0; i < difference; i++) {
                    ajouterAuPanier(produit);
                }
            } 
            else {
                for (let i = 0; i < Math.abs(difference); i++) {
                    retirerDuPanier(produit.id);
                }
            }
        }
    };

    const handlePaiement = async () => {
        if (panier.length === 0) return;

        // Charger Stripe
        const stripe = await stripePromise;

        if (!stripe) {
            console.error("Erreur de chargement de Stripe");
        return;
        }

        // Appel à l'API backend pour créer la session de paiement
        const response = await fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ panier }),
        });

        const data = await response.json();

        // Vérifie si on a bien un sessionId et redirige vers Stripe
        if (data.sessionId) {

            stripe.redirectToCheckout({ sessionId: data.sessionId }); // Utilise sessionId ici, pas l'URL complète
        } 
        else {
            console.error("Erreur de session Stripe :", data.error);
        }
    };
    


    return (
        <div className={`panier ${isOpen ? "open" : ""}`}>

            <div className="panier_nav">
                <h2>Mon Panier</h2>
                <button className="panier_nav-close" onClick={closePanier}></button>   
            </div>

                {panier.length === 0 ? (
                    <p>Votre panier est vide.</p>
                ) : (
                    <div className="panier_container">
                        <div className="panier_container-produits">
                            {panier.map((produit) => (
                                <div key={produit.id} className="produit">
                                    <div className="produit_name">
                                        <img src={produit.image} alt={produit.nom}/>
                                        <h2>{produit.nom}</h2>
                                    </div>
                                    <div className="produit_price">                             
                                        <p>{produit.prix} €</p>
                                    </div>
                                    <div className="produit_quantite">
                                        <input
                                            type="number"
                                            className="produit_quantite-input"
                                            value={produit.quantite}
                                            min="1"
                                            onChange={(e) => handleChangeQuantite(produit.id, parseInt(e.target.value))}
                                        />
                                        <button
                                            onClick={() => retirerDuPanier(produit.id)}
                                            className="produit_quantite-delete"
                                        >
                                            <Image src={trash} alt="Poubelle" className="poubelle"/>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                
                        <div className="panier_container-total">
                            <button
                                onClick={handlePaiement}
                                className="bouton"
                            >
                                Payer avec Stripe
                            </button>
                            <p>Total : {calculerTotal()}€</p>   
                        </div>
                    </div>
                )}
        </div>
    );
}
