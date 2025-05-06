import React from "react";
import { FaReact } from "react-icons/fa";
import { SiVite } from "react-icons/si";
import { SiSanity } from "react-icons/si";
import { SiJavascript } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="w-screen py-6 h-72 text-center text-sm bg-neutral-900 text-white font-source-sans font-medium">
      <div className=" mx-auto flex flex-col md:flex-row justify-between items-center gap-2 px-4">
      <div className="flex flex-2/6 flex-col gap-2 items-center">
          <span className="mb-5">Powered by:</span>
          <div className="flex flex-row gap-25"><FaReact className="text-5xl" /><SiVite className="text-5xl" /></div>
            
          <div className="flex flex-row gap-25"><SiSanity className="text-5xl" /><SiJavascript className="text-5xl" /></div>
            
          
        </div>
        <span className="flex flex-col flex-2/6 text-justify">&copy; {new Date().getFullYear()} Antonio Logarzo
        <p>All the material in the website is under Creative Commons (BY-NC-ND) license. Every reproduction without permission of the author is not allowed.
          All the material is considered intellectual property of the creator and thus not usable for own purposes, or commercial endeavours.
        </p></span>
        <div className="flex flex-2/6"></div>
      </div>
    </footer>
  );
}
