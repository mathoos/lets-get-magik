"use client";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";
import { useCart } from "../context/CartContext"; 
import trash from "../assets/trash.svg";
//import "./Panier.scss";

export default function Panier({ isOpen, closePanier }: { isOpen: boolean; closePanier: () => void }) {

    const { panier, ajouterAuPanier, retirerDuPanier, calculerTotal, viderPanier } = useCart();  
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

    const handleChangeQuantite = (produitId: string, newQuantite: number) => {
        if (newQuantite < 1) return; 
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
    
        // Sauvegarde le panier avant le paiement
        localStorage.setItem("commande", JSON.stringify(panier));
    
        const stripe = await stripePromise;
        if (!stripe) {
            console.error("Erreur de chargement de Stripe");
            return;
        }
    
        const response = await fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ panier }),
        });
    
        const data = await response.json();
        if (data.sessionId) {
            // Redirige vers la page de paiement Stripe
            stripe.redirectToCheckout({ sessionId: data.sessionId }).then(() => {
                // Une fois la redirection effectuée, vider le panier
                localStorage.removeItem("panier");
                viderPanier();  // Utilisation de la fonction viderPanier pour vider le panier global
            });
        } else {
            console.error("Erreur de session Stripe :", data.error);
        }
    };

    return (
        <div className={`fixed top-0 right-0 w-[40vw] h-screen bg-[var(--secondary)] border-l border-[var(--primary)] transition-transform duration-300 z-50 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
            
            {/* Nav Panier */}
            <div className="flex items-center justify-between h-[8vh] pl-[2vw] pr-[2vw] bg-[var(--primary)] border-l border-[var(--secondary)]">
                <h2 className="text-[var(--secondary)]">Mon Panier</h2>
                <button className="relative w-[1.5vw] h-[1.5vw]" onClick={closePanier}>
                    <span className="absolute top-1/2 left-1/2 w-full h-[1px] bg-[var(--secondary)] transform -translate-x-1/2 -translate-y-1/2 rotate-45"></span>
                    <span className="absolute top-1/2 left-1/2 w-full h-[1px] bg-[var(--secondary)] transform -translate-x-1/2 -translate-y-1/2 -rotate-45"></span>
                </button>
            </div>

            {/* Contenu du panier */}
            {panier.length === 0 ? (
                <p className="text-[var(--primary)] p-[2vw]">Votre panier est vide.</p>
            ) : (
                <div className="flex flex-col justify-between h-[92vh] p-[2vw]">
                    
                    {/* Liste des produits */}
                    <div className="flex flex-col gap-[1vw] overflow-y-auto">
                        {panier.map((produit) => (
                            <div key={produit.id} className="flex justify-between items-center border-b border-[var(--primary)] pb-[1vw]">
                                
                                {/* Image et Nom */}
                                <div className="flex items-center gap-[2vw] w-full">
                                    <img src={produit.image} alt={produit.nom} className="w-[5vw] h-[5vw] object-cover" />
                                    <h2 className="text-[var(--primary)]">{produit.nom}</h2>
                                </div>
                                
                                {/* Prix */}
                                <p className="text-[var(--primary)] w-[50%] text-center">{produit.prix} €</p>

                                {/* Quantité & Suppression */}
                                <div className="flex items-center gap-[2vw]">
                                    <input
                                        type="number"
                                        className="no-spinner w-[2vw] h-[2vw] bg-transparent outline-none text-center appearance-none text-[var(--primary)]"
                                        value={produit.quantite}
                                        min="1"
                                        onChange={(e) => handleChangeQuantite(produit.id, parseInt(e.target.value))}
                                    />
                                    <button onClick={() => retirerDuPanier(produit.id)} className="w-[2vw] h-[2vw] flex items-center justify-center">
                                        <Image src={trash} alt="Poubelle" className="w-[20px] h-[20px]" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Total et Paiement */}
                    <div className="flex justify-between items-center">
                        <button
                            onClick={handlePaiement}
                            className="text-[var(--primary)] border border-[var(--primary)] px-[30px] py-[1vh] transition-colors hover:bg-[var(--primary)] hover:text-[var(--secondary)]"
                        >
                            Payer avec Stripe
                        </button>
                        <p className="text-[var(--primary)] font-bold">Total : {calculerTotal()}€</p>   
                    </div>
                </div>
            )}
        </div>
    );
}
