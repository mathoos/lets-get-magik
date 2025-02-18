"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";
import Image from "next/image";
import headerImage from "../../assets/headerImg11.jpg";

import "./page.scss";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setError("Échec de la connexion. Vérifiez vos identifiants.");
        } 
        else {
            router.push("/admin");
        }
    };

    return (
        <div className="login">

            <figure className="login_img">
                <Image src={headerImage} alt="Produit sur fond d'eau" />
            </figure>

            <div className="login_form">
                <h1>Connexion</h1>   
                <form onSubmit={handleLogin} className="form">
                    <fieldset>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </fieldset>
                    <fieldset>
                        <label>Mot de passe</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </fieldset>
                    {error && 
                        <p className="text-red-500">{error}</p>
                    }
                    <button type="submit" className="bouton">
                        Se connecter
                    </button>
                </form>

            </div>



            
        </div>
    );
};

export default LoginPage;
