"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabase";
import AdminPanel from "@/components/AdminPanel";
import { User } from "@supabase/supabase-js"; 

const AdminPage = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null); 
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const supabase = await getSupabaseClient();
            const { data, error } = await supabase.auth.getUser();

        if (error || !data.user) {
            router.push("/login"); 
        } 
        else {
            setUser(data.user); 
        }
        setLoading(false);
        };

        checkAuth();
    }, [router]);

    if (loading) return <p>Chargement...</p>;
    if (!user) return null;

    return <AdminPanel />;
};

export default AdminPage;


