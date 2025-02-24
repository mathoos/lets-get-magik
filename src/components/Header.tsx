"use client";
import Image from "next/image";
import headerImage from "../assets/headerImg.jpg";
import headerImage2 from "../assets/headerImg9.jpg";
import sun from "../assets/sun.svg";

export default function Header() {
    return (
        <header className="w-full bg-[var(--secondary)]">
            <div className="relative flex">

                {/* Bloc Gauche */}
                <figure className="hidden md:flex relative py-[30vh] px-[10vw] w-[55vw] h-[150vh]">
                    <Image
                        src={headerImage2}
                        alt="Produit sur fond d'eau"
                        className="w-full h-full object-cover"
                    />
                    <p className="absolute bottom-[32vh] left-[12vw] text-white w-[40%]">
                        Laura & Nate will guide you through the weird and wonderful world of coffee with two 
                        vibrant and sweet coffees to your door each month.
                    </p>
                </figure>

              

                {/* Bloc Droit */}
                <figure className="w-full md:w-[45vw] relative">
                    <Image
                        src={headerImage}
                        alt="Visage d'une femme souriante"
                        className="w-full h-[100vh] object-cover"
                    />
                    <Image
                        src={sun}
                        alt="Soleil"
                        className="absolute top-[60vw] right-[15px] md:top-[15vw] md:right-[20vw] w-[10vw] h-[10vw] md:w-[3vw] md:h-[3vw]"
                    />
                </figure>


                {/* Titre */}
                <div className="absolute w-full md:w-auto top-1/2 md:top-[40vh] left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:-translate-y-0 px-[30px] md:px-0">
                    <h1 className="text-[15vw] leading-[1] md:text-[10vw] md:leading-[0.8] text-center text-[var(--tertiary)]">
                        Lets make magik !
                    </h1>
                </div>

            </div>
        </header>
    );
}
