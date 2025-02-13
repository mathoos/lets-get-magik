"use client";
import { useCart } from "../context/CartContext";
import { FaTrash } from "react-icons/fa";
import "./Panier.scss";

export default function Panier({ isOpen, closePanier }: { isOpen: boolean; closePanier: () => void }) {

    const { panier, ajouterAuPanier, retirerDuPanier, viderPanier, calculerTotal } = useCart();
    


    return (
        <div className={`panier ${isOpen ? "open" : ""}`}>

            <div className="panier_nav">
                <button className="panier_close" onClick={closePanier}>❌</button>
                <h2>Mon Panier</h2>
            </div>

            <div className="panier_container">

                {panier.length === 0 ? (
                    <p>Votre panier est vide.</p>
                ) : (
                    <div>

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

                
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md text-right">
                            <h2 className="text-2xl font-semibold">Total : {calculerTotal()} €</h2>
                        </div>

                  
                        <button
                            onClick={viderPanier}
                            className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 w-full mt-4"
                        >
                            Vider le panier
                        </button>

                        
                    </div>
                )}

            </div>

            

            

        </div>
    );
}
