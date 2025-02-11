"use client";
import Link from "next/link";
import { useSearch } from "../context/SearchContext";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { panier } = useCart();
  const { recherche, setRecherche } = useSearch();

  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-xl font-bold text-blue-500 cursor-pointer">Mon E-Commerce 🛍️</h1>
        </Link>
        <nav className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={recherche}
            onChange={(e) => setRecherche(e.target.value.toLowerCase())}
            className="px-4 py-2 border rounded"
          />
          <Link href="/panier" className="text-gray-600 px-4">
            Panier 🛒 ({panier.length})
          </Link>
        </nav>
      </div>
    </header>
  );
}
