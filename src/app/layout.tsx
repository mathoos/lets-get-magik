
import type { Metadata } from "next";
import "../styles/globals.css"
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CartProvider } from "../context/CartContext";

export const metadata: Metadata = {
    title: "Mon E-Commerce",
    description: "Achetez vos produits préférés en ligne",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr">
            <body className="flex flex-col min-h-screen">
                <CartProvider>
                    <Header />
                        <main className="flex-grow container mx-auto p-4">{children}</main>
                    <Footer />
                </CartProvider>
            </body>
        </html>
    );
}