"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";

import "./AdminPanel.scss";


type Produit = {
    id: string;
    nom: string;
    description: string;
    prix: number;
    image: string;
    categorie: string;
    details: string;
};

const AdminPanel = () => {
    const [produits, setProduits] = useState<Produit[]>([]);
    const [nom, setNom] = useState("");
    const [description, setDescription] = useState("");
    const [prix, setPrix] = useState<number | string>("");
    const [image, setImage] = useState("");
    const [details, setDetails] = useState("");
    const [categorie, setCategorie] = useState("");
    const [selectedProduit, setSelectedProduit] = useState<Produit | null>(null);
    const router = useRouter();

    // Récupérer les produits depuis la base de données
    useEffect(() => {
        const fetchProduits = async () => {
        const { data, error } = await supabase.from("produits").select("*");
        if (error) {
            console.error(error);
        } 
        else {
            setProduits(data as Produit[]);
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
        } 
        else {
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
        } 
        else {
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
            } 
            else {
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

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login"); 
    };



    return (
        <div className="panel">


                <div className="panel_barreLaterale">
                    <Link href="/">
                        Home
                    </Link>
                    <button onClick={handleLogout}>
                        Déconnexion
                    </button>
                </div>

                <div className="panel_container">
                    <h1>Tous mes produits</h1>

                    <div className="produit produit_sort">
                        <div className="produit_info">
                            <div className="produit_info-img">
                                <h3>Image</h3>
                            </div>
                            <div className="produit_info-title">
                                <h3>Titre</h3>
                            </div>
                            <div className="produit_info-categorie">
                                <h3>Catégorie</h3>
                            </div>
                            <div className="produit_info-description">
                                <h3>Description</h3>
                            </div>
                            <div className="produit_info-prix">
                                <h3>Prix</h3>
                            </div>     
                        </div>
                        <div className="produit_buttons">
                            <h3>Vide</h3>
                        </div>
                    </div>

                    <div className="panel_container-produits">
                        {produits.map((produit) => (
                            <div key={produit.id} className="produit">
                                <div className="produit_info">
                                    <figure className="produit_info-img">
                                        <img src={produit.image} alt={produit.nom}/>
                                    </figure>
                                    <div className="produit_info-title">
                                        <h3>{produit.nom}</h3> 
                                    </div>
                                    <div className="produit_info-categorie">
                                        <p>{produit.categorie}</p>
                                    </div>
                                    <div className="produit_info-description">
                                        <p>{produit.description}</p>
                                    </div>
                                    <div className="produit_info-prix">
                                        <p>{produit.prix}€</p>
                                    </div>     
                                </div>
                                <div className="produit_buttons">
                                    <button onClick={() => handleEditProduct(produit.id)}>
                                        Modifier
                                    </button>
                                    <button onClick={() => handleDeleteProduct(produit.id)}>
                                        Supprimer
                                    </button>
                                    <button>
                                        Voir
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
          

            {/* <h2>
                {selectedProduit ? "Modifier un produit" : "Ajouter un produit"}
            </h2> */}
            

            {/* <form onSubmit={selectedProduit ? handleUpdateProduct : handleAddProduct}>
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
            </form> */}


            
        </div>
    );
};

export default AdminPanel;
