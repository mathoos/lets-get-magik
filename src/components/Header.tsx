"use client";
import Image from "next/image";
import headerImage from "../assets/headerImg.jpg";
import headerImage2 from "../assets/headerImg12.jpg";
import sun from "../assets/sun.svg";

export default function Header() {
    return (
        <header className="w-full bg-[var(--secondary)]">
            <div className="relative flex w-full h-[120vh]">

                {/* Bloc Gauche */}
                <figure className="hidden md:flex w-[50vw] h-full border-r border-[var(--primary)]">
                    <Image
                        src={headerImage2}
                        alt="Produit sur fond d'eau"
                        className="w-full h-full object-cover"
                    />
                </figure>

              

                {/* Bloc Droit */}
                <figure className="relative w-full md:w-[50vw] h-full">
                    <Image
                        src={headerImage}
                        alt="Visage d'une femme souriante"
                        className="w-full h-full object-cover"
                    />
                    <Image
                        src={sun}
                        alt="Soleil"
                        className="absolute top-[60vw] right-[15px] md:top-[15vw] md:right-[20vw] w-[10vw] h-[10vw] md:w-[3vw] md:h-[3vw]"
                    />
                </figure>



                {/* Titre */}
                <div className="absolute flex items-center justify-center w-full h-full px-[30px] md:px-0">
                    <h1 className="text-[15vw] leading-[1] md:text-[10vw] md:leading-[0.8] text-center text-[var(--tertiary)]">
                        Lets make <br/> magik !
                    </h1>
                </div>

            </div>
        </header>
    );
}
