"use client";
import Image from "next/image";

import "./Header.scss";
import headerImage from "../assets/headerImg.jpg";
import headerImage2 from "../assets/headerImg9.jpg";
import sun from "../assets/sun.svg";


export default function Header() {


    return (
        <header className="header">

            <div className="header_container">
       
                <div className="header_container-blocLeft">
                    <figure className="header_container-blocLeft--img">
                        <Image src={headerImage2} alt="Produit sur fond d'eau"/>
                        <p>
                            Laura & Nate will guide you through the weird and wonderful world of coffee with two vibrant and 
                            sweet coffees to your door each month.
                        </p>
                    </figure>
                </div>
            
                <div className="header_container-blocRight">
                    <figure className="header_container-blocRight--img">
                        <Image src={headerImage} alt="Visage d'une femme souriante" />
                        <Image src={sun} alt="Soleil" className="sun"/>
                    </figure>
                </div>

                <div className="header_container-title">
                    <h1>Lets make magik !</h1>
                </div>
            
            </div>
        </header>
    );
}
