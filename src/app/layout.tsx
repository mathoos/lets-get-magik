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
            <head>

                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Achetez vos produits préférés en ligne" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Gilda+Display&display=swap" rel="stylesheet" />
            </head>
            <body className="flex flex-col min-h-screen">
                <CartProvider>
                    <SearchProvider>
                        <ClientLayout>
                            {children}
                        </ClientLayout>
                    </SearchProvider>
                </CartProvider>
            </body>
        </html>
    );
}
