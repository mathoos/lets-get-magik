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
            <nav className="fixed top-0 left-0 flex items-center justify-between gap-[30px] md:gap-[2vw] w-[100vw] h-[8vh] px-[30px] md:px-[5vw] bg-[var(--blue)] border-b border-[var(--primary)] z-10">

                {/* Menu mobile */}
                <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                    <Image src={menuIcon} alt="Menu" className="w-[30px] h-[30px]" />
                </button>

                {/* Liens de navigation (cachés sur mobile) */}
                <div className={`absolute top-[8vh] left-0 w-full flex flex-col items-center gap-4 p-4 transition-all duration-300 md:static md:flex md:flex-row md:gap-[2vw] md:p-0 ${menuOpen ? "block" : "hidden"}`}>
                    <Link href="/" className="">Home</Link>
                    <Link href="/diagnostic" className="">Diagnostic</Link>
                    <Link href="/a-propos" className="">A propos</Link>
                </div>

                {/* Icônes à droite */}
                <div className="flex items-center justify-end gap-[2vw] w-full">

                    {/* Barre de recherche (plus flexible sur mobile) */}
                    <div className="relative w-full md:w-[25vw] rounded-full bg-white flex items-center">
                        <input
                            type="text"
                            placeholder="Rechercher un produit..." 
                            value={recherche}
                            onChange={(e) => setRecherche(e.target.value)} 
                            className="text-[3vw] md:text-[1vw] w-full h-[5.5vw] md:h-[2vw] px-[10px] md:px-[1vw] py-[5px] outline-none border border-[var(--primary)] bg-transparent rounded-full"
                        />
                        <Image src={search} alt="Barre de recherche" className="absolute right-[10px] md:right-[30px] top-1/2 transform -translate-y-1/2 w-[5vw] h-[5vw] md:w-[1.5vw] md:h-[1.5vw] object-contain" />
                    </div>

                    {/* Icônes Favoris et Panier */}
                    <Link href="/">
                        <Image src={heart} alt="Favoris" className="w-[5vw] h-[5vw] md:w-[1.5vw] md:h-[1.5vw]" />
                    </Link>

                    <button className="relative flex" onClick={() => setPanierOpen(!panierOpen)}>
                        <Image src={cart} alt="Panier" className="w-[5vw] h-[5vw] md:w-[1.5vw] md:h-[1.5vw]" />
                        <div className="absolute right-[-2.7vw] bottom-[-1.7vw] md:right-[-.8vw] md:bottom-[-.4vw] flex justify-center items-center w-[3.5vw] h-[3.5vw] md:w-[1vw] md:h-[1vw] bg-white rounded-full">
                            <p className="text-[2.5vw] md:text-[.8vw]">{panier.length}</p>
                        </div>
                    </button>
                </div>
            </nav>

            <Panier isOpen={panierOpen} closePanier={() => setPanierOpen(false)} />
        </>
    );
}
