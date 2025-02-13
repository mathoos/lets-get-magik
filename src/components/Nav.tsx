"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Panier from "./Panier"; 
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext"; 

import "./Nav.scss";

import heart from "../assets/heart.svg";
import cart from "../assets/cart.svg";
import search from "../assets/search.svg";

export default function Nav() {
    const { panier } = useCart();
    const { recherche, setRecherche } = useSearch();
    const [panierOpen, setPanierOpen] = useState(false); 

    return (
        <>
        <nav className="nav">
            <div className="nav_links">
                <Link href="/" className="nav_links-link">
                    Home
                </Link>
                <Link href="/diagnostic" className="nav_links-link">
                    Diagnostic
                </Link>
                <Link href="/a-propos" className="nav_links-link">
                    A propos
                </Link>
            </div>
            <div className="nav_links">
                <div className="nav_links-search">
                    <input
                        type="text"
                        placeholder="Rechercher un produit..." 
                        value={recherche}
                        onChange={(e) => setRecherche(e.target.value)} 
                    />
                    <Image src={search} alt="Barre de recherche" className="nav_links-icon search"/>
                </div>
                <Link href="/" className="">
                    <Image src={heart} alt="Favoris" className="nav_links-icon"/>
                </Link>
                <div className="nav_links-cart" onClick={() => setPanierOpen(!panierOpen)}>
                    <Image src={cart} alt="Panier" className="nav_links-icon"/> 
                    <div className="nav_links-cart--length">
                        <p>{panier.length}</p>
                    </div>
                </div>
            </div>
        </nav>

        <Panier isOpen={panierOpen} closePanier={() => setPanierOpen(false)} />
    </>
    );
}
