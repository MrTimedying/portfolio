import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
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
    <motion.nav 
      style={{ background: "#fffff8" }} 
      className="max-w-3xl mx-auto flex flex-col items-center justify-center mt-10 px-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-5xl mx-auto px-4 md:px-8 flex justify-between items-center h-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
        >
          {location.pathname === "/fulcrum" ? (
            <motion.img 
              className="opacity-100 transition-opacity ease-in-out duration-1000" 
              src={fulcrumIcon} 
              style={{height: "80px"}}
              initial={{ opacity: 0, rotate: -10 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Logo />
            </motion.div>
          )}
        </motion.div>
        <motion.ul 
          className="flex ml-50"
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
                  className="px-3 py-2 text-black font-sans flex flex-row items-center text-[14px]"
                  aria-current={location.pathname === link.to ? "page" : undefined}
                >
                  <motion.span
                    animate={
                      location.pathname === link.to
                        ? { 
                            color: "#e07a5f",
                            fontWeight: "bold",
                            textDecoration: "underline"
                          }
                        : { 
                            color: "#000000",
                            fontWeight: "normal",
                            textDecoration: "none"
                          }
                    }
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
    </motion.nav>
  );
}