"use client";
import { useState, useEffect } from "react";
import supabase from "@/lib/supabase";

// Définir un type Produit pour la structure des données
type Produit = {
  id: string;
  nom: string;
  description: string;
  prix: number;
  image: string;
  details: string;
};

const AdminPanel = () => {
  const [produits, setProduits] = useState<Produit[]>([]);
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [prix, setPrix] = useState<number | string>("");
  const [image, setImage] = useState("");
  const [details, setDetails] = useState("");
  const [selectedProduit, setSelectedProduit] = useState<Produit | null>(null);

  // Récupérer les produits depuis la base de données
  useEffect(() => {
    const fetchProduits = async () => {
      const { data, error } = await supabase.from("produits").select("*");
      if (error) {
        console.error(error);
      } else {
        setProduits(data as Produit[]); // Assurer que les données sont bien typées
      }
    };
    fetchProduits();
  }, [produits]);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    const produitData = { nom, description, prix, image, details };

    const { error } = await supabase.from("produits").insert([produitData]);

    if (error) {
      console.error(error);
    } else {
      alert("Produit ajouté avec succès !");
      setNom("");
      setDescription("");
      setPrix("");
      setImage("");
      setDetails("");
    }
  };

  const handleDeleteProduct = async (id: string) => {
    const { error } = await supabase.from("produits").delete().match({ id });

    if (error) {
      console.error(error);
    } else {
      alert("Produit supprimé avec succès !");
    }
  };

  const handleEditProduct = async (id: string) => {
    const produit = produits.find((produit) => produit.id === id);
    if (produit) {
      setSelectedProduit(produit);
      setNom(produit.nom);
      setDescription(produit.description);
      setPrix(produit.prix);
      setImage(produit.image);
      setDetails(produit.details);
    }
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedProduit) {
      const { error } = await supabase
        .from("produits")
        .update({ nom, description, prix, image, details })
        .eq("id", selectedProduit.id);

      if (error) {
        console.error(error);
      } else {
        alert("Produit mis à jour avec succès !");
        setNom("");
        setDescription("");
        setPrix("");
        setImage("");
        setDetails("");
        setSelectedProduit(null);
      }
    }
  };

  return (
    <div>
      {/* Formulaire d'ajout/édition */}
      <h2 className="text-xl font-bold mb-4">
        {selectedProduit ? "Modifier un produit" : "Ajouter un produit"}
      </h2>
      <form onSubmit={selectedProduit ? handleUpdateProduct : handleAddProduct} className="space-y-4">
        <div>
          <label>Nom du produit</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label>Prix</label>
          <input
            type="number"
            value={prix}
            onChange={(e) => setPrix(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label>URL image</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label>Détails</label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            {selectedProduit ? "Mettre à jour le produit" : "Ajouter le produit"}
          </button>
        </div>
      </form>

      {/* Liste des produits */}
      <h2 className="text-xl font-bold mt-8">Tous les produits</h2>
      <div className="space-y-4">
        {produits.map((produit) => (
          <div key={produit.id} className="border p-4">
            <h3 className="font-semibold">{produit.nom}</h3>
            <img src={produit.image} alt={produit.nom} className="w-full h-40 object-cover" />
            <p>{produit.description}</p>
            <p>Prix: {produit.prix}€</p>
            <button
              onClick={() => handleEditProduct(produit.id)}
              className="mt-2 bg-yellow-500 text-white p-2 rounded"
            >
              Modifier
            </button>
            <button
              onClick={() => handleDeleteProduct(produit.id)}
              className="mt-2 bg-red-500 text-white p-2 rounded"
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
