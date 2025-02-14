"use client";  

import { usePathname } from "next/navigation";
import Nav from "./Nav";
import Footer from "./Footer";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname(); 

    const isAdminPanel = pathname === "/admin"; 

    return (
        <>
            {!isAdminPanel && <Nav />}
            <main>{children}</main>
            <Footer />
        </>
    );
};

export default ClientLayout;
