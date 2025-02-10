import { NextResponse } from "next/server";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-01-27.acacia",
});


type Produit = {
  id: string;
  nom: string;
  prix: number;
  quantite: number;
};

export async function POST(req: Request) {
  try {
    const { panier }: { panier: Produit[] } = await req.json(); 

    if (!panier || panier.length === 0) {
      return NextResponse.json({ error: "Panier vide" }, { status: 400 });
    }

    // ✅ On utilise le type `Produit` ici
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/panier`,
      line_items: panier.map((produit) => ({
        price_data: {
          currency: "eur",
          product_data: { name: produit.nom },
          unit_amount: produit.prix * 100,
        },
        quantity: produit.quantite,
      })),
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Erreur Stripe :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
