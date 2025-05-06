import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./logo";

const navLinks = [
  { to: "/", label: ".home" },
  { to: "/blog", label: ".blog" },
  { to: "/about", label: ".about" },
];



export default function NavMenu() {
  const location = useLocation();

  return (
    <nav style={{ background: "#fffff8" }} className="max-w-3xl mx-auto flex flex-col items-center justify-center mt-10 px-6 ">
      <div className="max-w-5xl mx-auto px-4 md:px-8 flex justify-between items-center h-16">
        <Logo />
        <ul className="flex ml-50">
          {navLinks.map(link => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="px-3 py-2 text-black font-sans text-[14px]"
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