"use client";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext"; 

import Link from "next/link";
import Image from "next/image";
import Panier from "./Panier"; 

import heart from "../assets/heart.svg";
import cart from "../assets/cart.svg";
import search from "../assets/search.svg";
import menuIcon from "../assets/menu.svg"; // Ajoute une icône de menu pour mobile

export default function Nav() {

    const { panier } = useCart();
    const { recherche, setRecherche } = useSearch();
    const [panierOpen, setPanierOpen] = useState(false); 
    const [menuOpen, setMenuOpen] = useState(false); 

    return (
        <>
            <nav className="fixed top-0 left-0 flex justify-between w-[100vw] h-[8vh] px-[30px] bg-[var(--primary)] z-10 items-center md:px-[5vw]">

                {/* Menu mobile */}
                <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                    <Image src={menuIcon} alt="Menu" className="w-[30px] h-[30px]" />
                </button>

                {/* Liens de navigation (cachés sur mobile) */}
                <div className={`absolute top-[8vh] left-0 w-full bg-[var(--primary)] flex flex-col items-center gap-4 p-4 transition-all duration-300 md:static md:flex md:flex-row md:gap-[2vw] md:p-0 ${menuOpen ? "block" : "hidden"}`}>
                    <Link href="/" className="text-[var(--secondary)]">Home</Link>
                    <Link href="/diagnostic" className="text-[var(--secondary)]">Diagnostic</Link>
                    <Link href="/a-propos" className="text-[var(--secondary)]">A propos</Link>
                </div>

                {/* Icônes à droite */}
                <div className="flex items-center gap-4 md:gap-[2vw]">

                    {/* Barre de recherche (plus flexible sur mobile) */}
                    <div className="relative w-full md:w-[20vw] rounded-full bg-[var(--secondary)] flex items-center">
                        <input
                            type="text"
                            placeholder="Rechercher un produit..." 
                            value={recherche}
                            onChange={(e) => setRecherche(e.target.value)} 
                            className="w-full h-full px-5 py-2 outline-none bg-transparent rounded-full text-[var(--primary)]"
                        />
                        <Image src={search} alt="Barre de recherche" className="absolute right-3 top-1/2 transform -translate-y-1/2 w-[25px] h-[25px]" />
                    </div>

                    {/* Icônes Favoris et Panier */}
                    <Link href="/">
                        <Image src={heart} alt="Favoris" className="w-[25px] h-[25px]" />
                    </Link>

                    <button className="relative flex" onClick={() => setPanierOpen(!panierOpen)}>
                        <Image src={cart} alt="Panier" className="w-[25px] h-[25px]" />
                        <div className="absolute right-[-10px] bottom-[-5px] flex justify-center items-center w-[18px] h-[18px] bg-[var(--secondary)] rounded-full text-[var(--primary)] text-xs">
                            {panier.length}
                        </div>
                    </button>
                </div>
            </nav>

            <Panier isOpen={panierOpen} closePanier={() => setPanierOpen(false)} />
        </>
    );
}
