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
                    <Link href="/panier" className="">
                        Produits
                    </Link>
                    <Link href="/panier" className="">
                        Diagnostic
                    </Link>
                    <Link href="/panier" className="">
                        A propos
                    </Link>
                </div>
                <div className="nav_links">
                    <Link href="/panier" className="">
                        <Image src={search} alt="Barre de recherche"/>
                    </Link>
                    <Link href="/panier" className="">
                        <Image src={heart} alt="Favoris"/>
                    </Link>
                    <Link href="/panier" className="nav_links-cart">
                        <Image src={cart} alt="Panier"/> ({panier.length})
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
