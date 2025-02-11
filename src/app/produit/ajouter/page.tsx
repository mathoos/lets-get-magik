"use client";

import { useState } from "react";

export default function AjouterProduit() {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [prix, setPrix] = useState("");
  const [image, setImage] = useState("");
  const [categorie, setCategorie] = useState("");
  const [details, setDetails] = useState("");

  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const produitData = {
      nom,
      description,
      prix: parseFloat(prix),
      image,
      categorie,
      details,
    };

    const res = await fetch("/api/produits/ajouter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produitData),
    });

    const data = await res.json();

    if (res.status === 200) {
      setMessage("Produit ajouté avec succès !");
    } else {
      setMessage(data.error || "Erreur lors de l'ajout du produit.");
    }

    setNom("");
    setDescription("");
    setPrix("");
    setImage("");
    setCategorie("");
    setDetails("");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Ajouter un produit</h1>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nom" className="block">Nom</label>
          <input
            type="text"
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="prix" className="block">Prix (€)</label>
          <input
            type="number"
            id="prix"
            value={prix}
            onChange={(e) => setPrix(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="image" className="block">URL image</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="categorie" className="block">Catégorie</label>
          <input
            type="text"
            id="categorie"
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="details" className="block">Détails</label>
          <textarea
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">
          Ajouter le produit
        </button>
      </form>
    </div>
  );
}
