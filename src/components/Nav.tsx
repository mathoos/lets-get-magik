"use client";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext";

import "./Nav.scss";

import heart from "../assets/heart.svg";
import cart from "../assets/cart.svg";
import search from "../assets/search.svg";

export default function Nav() {
    const { panier } = useCart();

    return (
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
                    />
                    <Image src={search} alt="Barre de recherche" className="nav_links-icon search"/>
                </div>
                <Link href="/" className="">
                    <Image src={heart} alt="Favoris" className="nav_links-icon"/>
                </Link>
                <Link href="/panier" className="nav_links-cart">
                    <Image src={cart} alt="Panier" className="nav_links-icon"/> 
                    <div className="nav_links-cart--length">
                        <p>{panier.length}</p>
                    </div>
                </Link>
            </div>
        </nav>
    );
}
