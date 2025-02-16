import type { Metadata } from "next";
import ClientLayout from "../components/clientLayout";
import { CartProvider } from "../context/CartContext";
import { SearchProvider } from "../context/SearchContext";

import "../styles/globals.scss";
import "../styles/globals.css";

export const metadata: Metadata = {
    title: "Mon E-Commerce",
    description: "Achetez vos produits préférés en ligne",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr">
            <body className="flex flex-col min-h-screen">
                <CartProvider>
                    <SearchProvider>
                        <ClientLayout>{children}</ClientLayout>
                    </SearchProvider>
                </CartProvider>
            </body>
        </html>
    );
}
