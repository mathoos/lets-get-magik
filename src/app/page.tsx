import Link from "next/link";
import { getSupabaseClient } from "@/lib/supabase";
import Header from "../components/Header";
import ProductList from "../components/ProductList";

export default async function Home() {
    const supabase = await getSupabaseClient();
    const { data: produits, error } = await supabase.from("produits").select("*");

    if (error || !produits) {
        console.error("Erreur lors du chargement des produits :", error);
        return <div className="p-10">Erreur lors du chargement des produits.</div>;
    }

    const allCategories = ["Soin", "Sérum", "Crème"];
    const uniqueCategories = Array.from(new Set(produits.map((p) => p.categorie)));
    const categories = Array.from(new Set([...allCategories, ...uniqueCategories]));

    return (
        <div className="w-full">
            <Header />

            <div className="bg-[var(--quaternary)] py-[5vh] md:py-[15vh] px-[30px] md:px-[10vw] border-y border-[var(--primary)]">
                <p className="md:text-[2.5vw]">Nos formules sont : courtes, concentrées, fabriquées en France.</p>
            </div>

            <div className="sticky top-[6vh] md:top-[-10vh] flex flex-col gap-[2vh] justify-between py-[5vh] md:py-[20vh] px-[30px] md:px-[10vw] pb-[auto] md:pb-[2vw] bg-[var(--secondary)]">
                <h2 className="text-[7vw] md:text-[2.5vw]">Nos produits</h2>

                <div className="flex gap-[5vw] md:gap-[2vw] flex-wrap">
                    {categories.map((cat) => (
                        <Link 
                            key={cat} 
                            href={`/?categorie=${encodeURIComponent(cat)}`}
                            className="text-[3.5vw] md:text-[1.2vw] border border-[var(--primary)] px-[15px] py-[5px] md:px-[2vw] md:py-[1vh] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--secondary)] transition-colors"
                        >
                            {cat}
                        </Link>
                    ))}
                </div>
            </div>

            <ProductList produits={produits} />
        </div>
    );
}