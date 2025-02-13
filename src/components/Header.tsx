"use client";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext";

import "./Header.scss";
import headerImage from "../assets/headerImg.jpg";
import headerImage2 from "../assets/headerImg2.jpg";
import heart from "../assets/heart.svg";
import cart from "../assets/cart.svg";
import search from "../assets/search.svg";

export default function Header() {
    const { panier } = useCart();

    return (
        <header className="header">

            <nav className="nav">
                <div className="nav_links">
                    <Link href="/panier" className="nav_links-link">
                        Produits
                    </Link>
                    <Link href="/panier" className="nav_links-link">
                        Diagnostic
                    </Link>
                    <Link href="/panier" className="nav_links-link">
                        A propos
                    </Link>
                </div>
                <div className="nav_links">
                    <div className="nav_links-search">
                        <input
                            type="text"
                            placeholder="Rechercher un produit..." 
                        />
                        <Image src={search} alt="Barre de recherche" className="search"/>
                    </div>
                    
                    
                   
                    <Link href="/panier" className="">
                        <Image src={heart} alt="Favoris"/>
                    </Link>
                    <Link href="/panier" className="nav_links-cart">
                        <Image src={cart} alt="Panier"/> 
                        <div className="nav_links-cart--length">
                            <p>{panier.length}</p>
                        </div>
                    </Link>
                </div>
            </nav>

            <div className="header_container">
       
                <div className="header_container-blocLeft">
                    <figure className="header_container-blocLeft--img">
                        <Image src={headerImage2} alt="Visage d'une femme souriante"/>
                        <p>
                            Laura & Nate will guide you through the weird and wonderful world of coffee with two vibrant and 
                            sweet coffees to your door each month.
                        </p>
                    </figure>
                </div>
            
                <div className="header_container-blocRight">
                    <figure className="header_container-blocRight--img">
                        <Image src={headerImage} alt="Visage d'une femme souriante" />
                    </figure>
                </div>

                <div className="header_container-title">
                    <h1>Lets make magik !</h1>
                </div>
            
            </div>
        </header>
    );
}
