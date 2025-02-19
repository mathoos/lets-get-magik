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

export default function Nav() {
    const { panier } = useCart();
    const { recherche, setRecherche } = useSearch();
    const [panierOpen, setPanierOpen] = useState(false); 

    return (
        <>
            <nav className="fixed top-0 left-0 flex justify-between w-full h-[8vh] px-[5vw] bg-[var(--primary)] z-10 items-center">

                <div className="flex items-center gap-[2vw]">
                    <Link href="/" className="text-[var(--secondary)]">Home</Link>
                    <Link href="/diagnostic" className="text-[var(--secondary)]">Diagnostic</Link>
                    <Link href="/a-propos" className="text-[var(--secondary)]">A propos</Link>
                </div>

                <div className="flex items-center gap-[2vw]">

                    <div className="relative w-[20vw] rounded-full bg-[var(--secondary)] flex items-center">
                        <input
                            type="text"
                            placeholder="Rechercher un produit..." 
                            value={recherche}
                            onChange={(e) => setRecherche(e.target.value)} 
                            className="w-full h-full px-5 py-2 outline-none bg-transparent rounded-full text-[var(--primary)]"
                        />
                        <Image src={search} alt="Barre de recherche" className="absolute right-3 top-1/2 transform -translate-y-1/2 w-[25px] h-[25px]" />
                    </div>

                    <Link href="/">
                        <Image src={heart} alt="Favoris" className="w-[25px] h-[25px]" />
                    </Link>

                    <button className="relative flex" onClick={() => setPanierOpen(!panierOpen)}>
                        <Image src={cart} alt="Panier" className="w-[25px] h-[25px]" />
                        <div className="absolute right-[-17px] bottom-[-5px] flex justify-center items-center w-[20px] h-[20px] bg-[var(--secondary)] rounded-full">
                            <p className="text-[var(--primary)] text-sm">{panier.length}</p>
                        </div>
                    </button>
                </div>
            </nav>

            <Panier isOpen={panierOpen} closePanier={() => setPanierOpen(false)} />
        </>
    );
}
