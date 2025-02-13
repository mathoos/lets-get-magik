"use client";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { FaTrash } from "react-icons/fa";
import "./Panier.scss";

export default function Panier({ isOpen, closePanier }: { isOpen: boolean; closePanier: () => void }) {

    const { panier, ajouterAuPanier, retirerDuPanier, calculerTotal } = useCart();
    


    return (
        <div className={`panier ${isOpen ? "open" : ""}`}>

            <div className="panier_nav">
                <button className="panier_close" onClick={closePanier}>❌</button>
                <h2>Mon Panier</h2>
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
                                        <div className="produit_quantite-update">
                                            <button onClick={() => retirerDuPanier(produit.id)}>-</button>
                                            <span>{produit.quantite}</span>
                                            <button onClick={() => ajouterAuPanier(produit)}>-</button>
                                        </div>
                                        <button
                                            onClick={() => retirerDuPanier(produit.id)}
                                            className="produit_quantite-delete"
                                        >
                                            <FaTrash /> 
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                
                        <div className="panier_container-total">
                            <h2 className="">Total : {calculerTotal()} €</h2>
                            <Link href="/panier" className="bouton">Voir mon panier</Link>
                        </div>

                    </div>
                )}

         

        </div>
    );
}
