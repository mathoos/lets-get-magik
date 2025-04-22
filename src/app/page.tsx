import Link from "next/link";
import Image from "next/image";
import { getSupabaseClient } from "@/lib/supabase";
import Header from "../components/Header";

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

            <div className="md:py-[20vh] py-[10vh] md:px-[10vw] px-[30px] bg-[var(--secondary)]">
                {produits.length === 0 ? (
                    <p>Aucun produit trouvé</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-[30px] md:gap-[5vw]">
                        {produits.map((produit) => (
                            <div key={produit.id} className="flex flex-col justify-between gap-[10px] md:gap-[2vh]">
                                <Link href={`/produit/${produit.id}`} className="flex flex-col gap-[15px] md:gap-[5vh] md:h-auto h-full">
                                    <Image 
                                        src={produit.image} 
                                        alt={produit.nom} 
                                        width={300}
                                        height={300}
                                        className="w-full h-[25vh] md:h-[55vh] object-cover"
                                    />
                                </Link>
                                <div className="flex flex-col gap-[5px] md:gap-[2vh] h-full">
                                    <div className="flex justify-between gap-[1.5vw] h-full">
                                        <h2 className="text-[3vw] md:text-[1vw] text-[var(--primary)] font-bold h-full">{produit.nom}</h2>
                                        <p className="text-[3vw] md:text-[1vw] text-[var(--primary)]">{produit.prix}€</p>
                                    </div>
                                    <form action="/api/add-to-cart" method="POST">
                                        <input type="hidden" name="id" value={produit.id} />
                                        <button 
                                            type="submit"
                                            className="text-[var(--primary)] text-[2.5vw] md:text-[1vw] border border-[var(--primary)] px-[15px] md:px-[2vw] py-[5px] md:py-[1vh] transition-colors hover:bg-[var(--primary)] hover:text-[var(--secondary)]"
                                        >
                                            Ajouter au panier
                                        </button>
                                    </form>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}