"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabase";


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
            const supabase = await getSupabaseClient();
            const { data, error } = await supabase.from("produits").select("*");
            if (error) {
                console.error(error);
            } else {
                setProduits(data as Produit[]);
            }
        };
        fetchProduits();
    }, []);

    // Ajouter un produit
    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const supabase = await getSupabaseClient();

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
            setImage("");
            setDetails("");
            setShowForm(false);
        }
    };
    
    // Supprimer un produit
    const handleDeleteProduct = async (id: string) => {
        const supabase = await getSupabaseClient();
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
        const supabase = await getSupabaseClient();
    
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
        const supabase = await getSupabaseClient();
        await supabase.auth.signOut();
        router.push("/login");
    };


    // Télécharger une image
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            
            const supabase = await getSupabaseClient();
            const fileName = `${Date.now()}-${file.name}`;
            
            try {
                const { error: uploadError } = await supabase.storage
                .from('produits-images')
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
        <div className="relative flex justify-end w-full">

            <div className="fixed top-0 left-0 flex flex-col justify-end items-start w-[15vw] h-[100vh] p-[2vw] bg-[var(--primary)]">
                <Link href="/" className="text-[var(--secondary)]">
                    Home
                </Link>
                <button 
                    className="text-[var(--secondary)]"
                    onClick={() => setShowForm(true)}>
                    Ajouter un produit
                </button>
                <button 
                    className="text-[var(--secondary)]"
                    onClick={handleLogout}>
                    Déconnexion
                </button>
            </div>

            <div className="w-[calc(100vw-15vw)] min-h-[100vh] ml-[15vw] py-[10vh] px-[2vw] bg-[var(--secondary)]">

                {!showForm && (
                    <>
                        <h1 className="text-[5vw] leading-[0.8] mb-[10vh]">Tous mes produits</h1>

                        <div className="flex justify-between mb-[2.5vh]">
                            <div className="flex items-center">
                                <div className="w-[5vw] h-auto">
                                    <h3 className="text-center font-bold">Image</h3>
                                </div>
                                <div className="w-[10vw] px-[10px]">
                                <h3 className="text-center font-bold">Titre</h3>
                            </div>
                                <div className="w-[10vw] px-[10px]">
                                <h3 className="text-center font-bold">Catégorie</h3>
                            </div>
                                <div className="w-[35vw] px-[10px]">
                                <h3 className="text-center font-bold">Description</h3>
                            </div>
                                <div className="w-[10vw] px-[10px]">
                                <h3 className="text-center font-bold">Prix</h3></div>
                            </div>
                            <div className="flex flex-col justify-between px-[10px] w-[10vw]">
                                <h3 className="text-center">Vide</h3>
                            </div>
                        </div>

                        <div className="flex flex-col gap-[1vw]">
                            {produits.map((produit) => (
                                <div key={produit.id} className="flex justify-between pb-[1vw] border-b border-b-[var(--primary)] last-of-type:border-b-[0]">
                                    <div className="flex items-center">
                                        <figure className="w-[5vw] h-[5vw]">
                                            <Image
                                                src={produit.image} 
                                                width={300}
                                                height={300}
                                                alt={produit.nom} 
                                                className="w-full h-full object-cover "
                                            />
                                        </figure>
                                        <div className="w-[10vw] px-[10px]">
                                            <h3 className="text-center">{produit.nom}</h3>
                                        </div>
                                        <div className="w-[10vw] px-[10px]">
                                            <p className="text-center">{produit.categorie}</p>
                                        </div>
                                        <div className="w-[35vw] px-[10px]">
                                            <p>{produit.description}</p>
                                        </div>
                                        <div className="w-[10vw] px-[10px]">
                                            <p className="text-center">{produit.prix}€</p>
                                        </div>
                                        </div>
                                    <div className="flex flex-col justify-between px-[10px] w-[10vw]">
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
                    <form className="flex flex-col gap-[2vh]" onSubmit={selectedProduit ? handleUpdateProduct : handleAddProduct}>
                        <h1 className="text-[1.5vw] font-bold mb-[5vh]">{selectedProduit ? "Modifier un produit" : "Ajouter un produit"}</h1>

                        <fieldset className="flex flex-col">
                            <label className="font-bold text-[var(--primary)]">Nom du produit</label>
                            <input className="border border-[var(--primary)] py-[5px] px-[10px]" type="text" value={nom} onChange={(e) => setNom(e.target.value)} required />
                        </fieldset>
                        <fieldset className="flex flex-col">
                            <label className="font-bold text-[var(--primary)]">Description</label>
                            <textarea className="border border-[var(--primary)] py-[5px] px-[10px]" value={description} onChange={(e) => setDescription(e.target.value)} required />
                        </fieldset>
                        <fieldset className="flex flex-col">
                            <label className="font-bold text-[var(--primary)]">Prix</label>
                            <input className="border border-[var(--primary)] py-[5px] px-[10px]" type="number" value={prix} onChange={(e) => setPrix(e.target.value)} required />
                        </fieldset>
                        <fieldset className="flex flex-col">
                            <label className="font-bold text-[var(--primary)]">Catégorie</label>
                            <div>
                                <select
                                    className="border border-[var(--primary)] py-[5px] px-[10px]"
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
                        <fieldset className="flex flex-col">
                            <label className="font-bold text-[var(--primary)]">Ajouter une image</label>
                            {selectedProduit && image && (
                                <div>
                                    <Image 
                                        src={image} 
                                        alt="Image actuelle" 
                                        width={300}
                                        height={300}
                                        style={{ maxWidth: "150px", display: "block", marginBottom: "10px" }} 
                                    />
                                </div>
                            )}
                            <input type="file" onChange={handleImageUpload} required={!selectedProduit} />
                        </fieldset>
                        <fieldset className="flex flex-col">
                            <label className="font-bold text-[var(--primary)]">Détails</label>
                            <textarea className="border border-[var(--primary)] py-[5px] px-[10px] min-h-[30vh]" value={details} onChange={(e) => setDetails(e.target.value)} required />
                        </fieldset>

                        <div className="flex gap-[2vw]">
                            <button className="bg-[var(--primary)] text-[var(--secondary)] px-[15px] py-[5px] md:px-[2vw] md:py-[1vh]" type="submit">{selectedProduit ? "Mettre à jour le produit" : "Ajouter le produit"}</button>
                            <button
                                className="border border-[var(--primary)] px-[15px] py-[5px] md:px-[2vw] md:py-[1vh]"
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
