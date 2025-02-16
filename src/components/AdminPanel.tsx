"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";

import "./AdminPanel.scss";
import "./AdminPanelForm.scss";


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
    const [categorie, setCategorie] = useState<string>("");
    const [selectedProduit, setSelectedProduit] = useState<Produit | null>(null);
    const [showForm, setShowForm] = useState(false);
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

    // Ajouter un produit
    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const produitData = { nom, description, prix, image, categorie, details };
    
        const { error } = await supabase.from("produits").insert([produitData]);
    
        if (error) {
            console.error(error);
        } 
        else {
            alert("Produit ajouté avec succès !");
            setNom("");
            setDescription("");
            setCategorie("");
            setPrix("");
            setImage("");  // Réinitialise l'image
            setDetails("");
            setShowForm(false);
        }
    };
    
    // Supprimer un produit
    const handleDeleteProduct = async (id: string) => {
        const { error } = await supabase.from("produits").delete().match({ id });

        if (error) {
            console.error(error);
        } 
        else {
            alert("Produit supprimé avec succès !");
        }
    };

    // Récupère l'id du produit sélectionné et ouvre le form avec les champs pré-remplis
    const handleEditProduct = async (id: string) => {
        const produit = produits.find((produit) => produit.id === id);
        if (produit) {
            setSelectedProduit(produit);
            setNom(produit.nom);
            setDescription(produit.description);
            setCategorie(produit.categorie);
            setPrix(produit.prix);
            setImage(produit.image);
            setDetails(produit.details);
            setShowForm(true);
        }
    };

    //  Modifier un produit
    const handleUpdateProduct = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (selectedProduit) {
            const updatedProduit = {
                nom,
                description,
                categorie,
                prix,
                image: image || selectedProduit.image, 
                details
            };
    
            const { error } = await supabase
                .from("produits")
                .update(updatedProduit)
                .eq("id", selectedProduit.id);
    
            if (error) {
                console.error(error);
            } 
            else {
                alert("Produit mis à jour avec succès !");
                setNom("");
                setDescription("");
                setCategorie("");
                setPrix("");
                setImage("");
                setDetails("");
                setSelectedProduit(null);
                setShowForm(false);
            }
        }
    };
    

    // Se déconnecter
    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login"); 
    };


    // Télécharger une image
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Récupère le premier fichier choisi par l'utilisateur
        if (file) {
            
            const fileName = `${Date.now()}-${file.name}`;
            
            try {
                const { error: uploadError } = await supabase.storage
                .from('produits-images') // 'produits-images' est le nom du bucket dans Supabase Storage
                .upload(fileName, file);
            
            if (uploadError) {
                console.error('Erreur lors du téléchargement de l\'image:', uploadError.message || uploadError);
                return;
            }
    
            const { data } = supabase.storage
            .from('produits-images')
            .getPublicUrl(fileName);
            
            setImage(data.publicUrl); 
            
            } 

            catch (error) {
                console.error('Erreur lors du téléchargement de l\'image:', error);
            }
        }
    };
    


    return (
        <div className="panel">

            <div className="panel_barreLaterale">
                <Link href="/">
                    Home
                </Link>
                <button onClick={() => setShowForm(true)}>
                    Ajouter un produit
                </button>
                <button onClick={handleLogout}>
                    Déconnexion
                </button>
            </div>

            <div className="panel_container">

                {!showForm && (
                    <>
                        <h1>Tous mes produits</h1>

                        <div className="produit produit_sort">
                            <div className="produit_info">
                                <div className="produit_info-img"><h3>Image</h3></div>
                                <div className="produit_info-title"><h3>Titre</h3></div>
                                <div className="produit_info-categorie"><h3>Catégorie</h3></div>
                                <div className="produit_info-description"><h3>Description</h3></div>
                                <div className="produit_info-prix"><h3>Prix</h3></div>
                            </div>
                            <div className="produit_buttons"><h3>Vide</h3></div>
                        </div>

                        <div className="panel_container-produits">
                            {produits.map((produit) => (
                                <div key={produit.id} className="produit">
                                    <div className="produit_info">
                                        <figure className="produit_info-img">
                                            <img src={produit.image} alt={produit.nom} />
                                        </figure>
                                        <div className="produit_info-title"><h3>{produit.nom}</h3></div>
                                        <div className="produit_info-categorie"><p>{produit.categorie}</p></div>
                                        <div className="produit_info-description"><p>{produit.description}</p></div>
                                        <div className="produit_info-prix"><p>{produit.prix}€</p></div>
                                        </div>
                                    <div className="produit_buttons">
                                        <button onClick={() => handleEditProduct(produit.id)}>Modifier</button>
                                        <button onClick={() => handleDeleteProduct(produit.id)}>Supprimer</button>
                                        <button>Voir</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {showForm && ( 
                    <form className="form" onSubmit={selectedProduit ? handleUpdateProduct : handleAddProduct}>
                        <h1>{selectedProduit ? "Modifier un produit" : "Ajouter un produit"}</h1>

                        <fieldset>
                            <label>Nom du produit</label>
                            <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} required />
                        </fieldset>
                        <fieldset>
                            <label>Description</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                        </fieldset>
                        <fieldset>
                            <label>Prix</label>
                            <input type="number" value={prix} onChange={(e) => setPrix(e.target.value)} required />
                        </fieldset>
                        <fieldset>
                            <label>Catégorie</label>
                            <div>
                                <select
                                    value={categorie}
                                    onChange={(e) => setCategorie(e.target.value)}
                                    required
                                >
                                <option value="" disabled>Sélectionner une catégorie</option>
                                {["Soin", "Sérum", "Crème"].map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                                </select>
                            </div>
                        </fieldset>
                        <fieldset>
                            <label>Ajouter une image</label>
                            {selectedProduit && image && (
                                <div>
                                    <img src={image} alt="Image actuelle" style={{ maxWidth: "150px", display: "block", marginBottom: "10px" }} />
                                </div>
                            )}
                            <input type="file" onChange={handleImageUpload} required={!selectedProduit} />
                        </fieldset>
                        <fieldset>
                            <label>Détails</label>
                            <textarea className="details" value={details} onChange={(e) => setDetails(e.target.value)} required />
                        </fieldset>

                        <div className="form_buttons">
                            <button className="bouton" type="submit">{selectedProduit ? "Mettre à jour le produit" : "Ajouter le produit"}</button>
                            <button
                                className="bouton"
                                type="button"
                                onClick={() => {
                                    setShowForm(false);
                                    setSelectedProduit(null); 
                                    setNom("");
                                    setDescription("");
                                    setCategorie("");
                                    setPrix("");
                                    setImage("");
                                    setDetails("");
                                }}
                                >
                                Annuler
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
