import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function POST(req: Request) {
  const data = await req.json();
  const { nom, description, prix, image} = data;

  const { error } = await supabase.from("produits").insert([
    { nom, description, prix, image },
  ]);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ message: "Produit ajouté !" });
}