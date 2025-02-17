"use client";
import { useEffect } from "react";
import { useCart } from "../../context/CartContext";
import Link from "next/link";

export default function SuccessPage() {

    const { viderPanier } = useCart();

    useEffect(() => {
        viderPanier();
    }, []); 
    

    return (
        <div className="container mx-auto p-4 text-center">
            <h1>Paiement réussi ! 🎉</h1>
            <p>Merci pour votre commande.</p>
            <Link href="/" className="text-blue-500 hover:underline mt-4 inline-block">
                Retourner à la boutique
            </Link>
        </div>
    );
}
