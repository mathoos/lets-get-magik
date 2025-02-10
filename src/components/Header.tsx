import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between">
            <Link href="/">
                <h1 className="text-xl font-bold text-blue-500 cursor-pointer">
                    Mon E-Commerce 🛍️
                </h1>
            </Link>
            <nav>
                <Link href="/produits" className="text-gray-600 px-4">Produits</Link>
                <Link href="/panier" className="text-gray-600 px-4">Panier</Link>
            </nav>
        </div>
    </header>
  );
}