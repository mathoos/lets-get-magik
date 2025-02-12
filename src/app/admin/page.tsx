"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";
import AdminPanel from "@/components/AdminPanel";
import { User } from "@supabase/supabase-js"; // ✅ Import du type

const AdminPage = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null); // ✅ Remplace any par User
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        router.push("/login"); // 🔹 Redirige si l'utilisateur n'est pas connecté
      } else {
        setUser(data.user); // 🔹 Stocke les infos de l'utilisateur
      }
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  if (loading) return <p>Chargement...</p>;
  if (!user) return null; // 🔹 Évite l'affichage du panel avant la redirection

  return <AdminPanel />;
};

export default AdminPage;


