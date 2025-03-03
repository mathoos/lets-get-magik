"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";
import Image from "next/image";
import headerImage from "../../assets/headerImg8.jpg";

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
        <div className="flex w-full h-[100vh] bg-[var(--secondary)]">

            <figure className="relative w-[35vw] overflow-hidden">
                <Image src={headerImage} alt="Produit sur fond d'eau" className="w-full h-full object-cover object-top"/>
            </figure>

            <div className="flex flex-col justify-between gat-[5vh] w-[65vw] h-full px-[10vw] pt-[20vh] pb-[10vh]">
                <h1 className="text-[1.5vw] font-bold mb-[5vh]">Connexion</h1>   
                <form onSubmit={handleLogin} className="flex flex-col gap-[2vh] h-full">
                    <fieldset className="flex flex-col">
                        <label className="font-bold">Email</label>
                        <input
                            className="border border border-[var(--primary)] py-[5px] px-[10px]"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </fieldset>
                    <fieldset className="flex flex-col">
                        <label className="font-bold">Mot de passe</label>
                        <input
                            className="border border border-[var(--primary)] py-[5px] px-[10px]"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </fieldset>
                    {error && 
                        <p className="text-red-500">{error}</p>
                    }
                    <button type="submit" className="text-[var(--primary)] text-[2.5vw] md:text-[1vw] w-fit border border-[var(--primary)] px-[15px] md:px-[2vw] py-[5px] md:py-[1vh] transition-colors hover:bg-[var(--primary)] hover:text-[var(--secondary)]">
                        Se connecter
                    </button>
                </form>

            </div>



            
        </div>
    );
};

export default LoginPage;
