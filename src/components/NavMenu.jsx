import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import Logo from "./logo";
import fulcrumIcon from "../assets/logo192.png";

const navLinks = [
  { to: "/", label: ".home" },
  { to: "/blog", label: ".blog" },
  { to: "/fulcrum", label: ".fulcrum" },
  { to: "/statdash", label: ".statdash" },
];

export default function NavMenu() {
  const location = useLocation();

  return (
    <motion.nav 
      className="w-screen bg-zinc-900 text-white flex flex-col items-center justify-center sticky top-0 z-50 shadow-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-5xl mx-auto px-4 md:px-8 flex justify-between items-center h-20 w-full">
        <div className="logo-container">
          {location.pathname === "/fulcrum" ? (
            <motion.img
              className="opacity-100 transition-opacity ease-in-out duration-1000"
              src={fulcrumIcon}
              style={{ height: "60px" }}
              initial={{ opacity: 0, rotate: -10 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          ) : location.pathname === "/statdash" ? (
            <motion.img
              className="opacity-100 transition-opacity ease-in-out duration-1000"
              src="/portfolio/statdash/statdash.png"
              alt="StatDash Icon"
              style={{ height: "60px" }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          ) : (
            <Logo animate={true} width={60} height={60} />
          )}
        </div>
        <motion.ul 
          className="flex"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {navLinks.map((link, index) => (
            <motion.li 
              key={link.to}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: 0.5 + index * 0.1 
              }}
            >
              <motion.div
                whileHover={{ 
                  scale: 1.1,
                  y: -2,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={link.to}
                  className="px-3 py-2 text-white font-sans flex flex-row items-center text-[14px]"
                  aria-current={location.pathname === link.to ? "page" : undefined}
                >
                  <motion.span
                    animate={
                      location.pathname === link.to
                        ? { 
                            color: "#e07a5f"
                          }
                        : { 
                            color: "#ffffff"
                          }
                    }
                    style={{
                      fontWeight: location.pathname === link.to ? "bold" : "normal",
                      textDecoration: location.pathname === link.to ? "underline" : "none"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {link.label}
                  </motion.span>
                </Link>
              </motion.div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
      {/* Fading bottom border */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
    </motion.nav>
  );
}