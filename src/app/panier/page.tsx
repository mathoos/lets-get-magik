"use client";

import { useCart } from "@/context/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import { FaTrash } from "react-icons/fa";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

export default function PanierPage() {
    const { panier, ajouterAuPanier, retirerDuPanier, viderPanier, calculerTotal } = useCart();

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
            viderPanier(); // Vider le panier après la commande
            stripe.redirectToCheckout({ sessionId: data.sessionId }); // Utilise sessionId ici, pas l'URL complète
        } 
        else {
            console.error("Erreur de session Stripe :", data.error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Votre Panier</h1>
            {panier.length === 0 ? (
                <p className="text-gray-600">Votre panier est vide.</p>
            ) : (
                <div className="space-y-4">
                    {panier.map((produit) => (
                        <div
                            key={produit.id}
                            className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
                        >
                        <div className="flex items-center space-x-4">
                            <img
                                src={produit.image} 
                                alt={produit.nom}
                                className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div>
                                <h2 className="text-xl font-semibold">{produit.nom}</h2>
                                <p className="text-lg font-bold text-blue-500">{produit.prix} €</p>
                                <p className="text-sm text-gray-600">Quantité : {produit.quantite}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                            onClick={() => retirerDuPanier(produit.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                            >
                            -
                            </button>
                            <span className="px-3">{produit.quantite}</span>
                            <button
                            onClick={() => ajouterAuPanier(produit)}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                            >
                            +
                            </button>
                            {/* Bouton poubelle pour supprimer un produit */}
                            <button
                            onClick={() => retirerDuPanier(produit.id)}
                            className="bg-red-200 text-red-500 p-2 rounded-full hover:bg-red-300"
                            >
                            <FaTrash /> {/* Icone poubelle */}
                            </button>
                        </div>
                        </div>
                    ))}

                    {/* Affichage du total */}
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md text-right">
                        <h2 className="text-2xl font-semibold">Total : {calculerTotal()} €</h2>
                    </div>

                    {/* Bouton pour lancer le paiement */}
                    <button
                        onClick={handlePaiement}
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 w-full mt-4"
                    >
                        Payer avec Stripe
                    </button>
                </div>
            )}
        </div>
    );
}
