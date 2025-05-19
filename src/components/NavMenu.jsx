import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./logo";
import fulcrumIcon from "../assets/logo192.png";

const navLinks = [
  { to: "/", label: ".home" },
  { to: "/blog", label: ".blog" },
  { to: "/fulcrum", label: ".fulcrum" },
];



export default function NavMenu() {
  const location = useLocation();

  return (
    <nav style={{ background: "#fffff8" }} className="max-w-3xl mx-auto flex flex-col items-center justify-center mt-10 px-6 ">
      <div className="max-w-5xl mx-auto px-4 md:px-8 flex justify-between items-center h-16">
        {location.pathname === "/fulcrum" ? <img className="opacity-100 transition-opacity ease-in-out duration-1000" src={fulcrumIcon} style={{height: "80px"}} /> : <Logo /> }   // If the page is the fulcrum page, different logo
        <ul className="flex ml-50">
          {navLinks.map(link => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="px-3 py-2 text-black font-sans flex flex-row items-center text-[14px]"
                aria-current={location.pathname === link.to ? "page" : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}