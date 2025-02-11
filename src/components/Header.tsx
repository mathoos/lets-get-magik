"use client";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { panier } = useCart();

  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-xl font-bold text-blue-500 cursor-pointer">Mon E-Commerce 🛍️</h1>
        </Link>
        
        {/* 🔹 Liens vers les catégories */}
        <nav className="flex space-x-4">
          <Link href="/panier" className="text-gray-600">
            Panier 🛒 ({panier.length})
          </Link>
        </nav>
      </div>
    </header>
  );
}
