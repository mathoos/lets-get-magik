import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/supabase";  // Assure-toi que tu as correctement configuré ton client Supabase

export async function POST(request: NextRequest) {
  try {
    const { nom, description, prix, image, categorie, details } = await request.json();

    // Valide les données reçues
    if (!nom || !description || !prix || !image || !categorie || !details) {
      return NextResponse.json(
        { error: "Tous les champs sont obligatoires." },
        { status: 400 }
      );
    }

    // Insère les données dans la table "produits" de Supabase
    const { data, error } = await supabase
      .from("produits")
      .insert([
        {
          nom,
          description,
          prix,
          image,
          categorie,
          details,
        },
      ])
      .single();  // Permet de renvoyer un seul produit inséré

    // Gestion des erreurs Supabase
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Si tout s'est bien passé
    return NextResponse.json(data, { status: 200 });

  } catch {
    // En cas d'erreur dans le bloc try (pas besoin de capturer 'err' ici si on ne l'utilise pas)
    return NextResponse.json({ error: "Une erreur est survenue lors de l'ajout du produit." }, { status: 500 });
  }
}
