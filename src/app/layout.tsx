import type { Metadata } from "next";
import ClientLayout from "../components/clientLayout";
import { CartProvider } from "../context/CartContext";
import { SearchProvider } from "../context/SearchContext";

import "../styles/globals.css";

import { Gilda_Display } from 'next/font/google'

const gilda = Gilda_Display({
    subsets: ['latin'],
    display: 'swap',
    weight: '400',
})

export const metadata: Metadata = {
    title: "Mon E-Commerce",
    description: "Achetez vos produits préférés en ligne",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr" className={gilda.className}>
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Achetez vos produits préférés en ligne" />
                <link rel="icon" href="/favicon.ico" />
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
