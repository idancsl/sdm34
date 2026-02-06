"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "./navLinks";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null); // simpan index
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white text-gray-500 fixed top-0 left-0 w-full z-50 shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center space-x-3"
        >
          <div className="relative w-10 h-10 cursor-pointer">
            <Image
              src="/img/tes.png"
              alt="Logo SD Muhammadiyah 34"
              fill
              className="object-contain rounded-full"
              priority
            />
          </div>
          <span className="font-bold text-base md:text-xl hover:text-green-600 transition-colors">
            SD Muhammadiyah 34 Cikupa
          </span>
        </motion.div>

        {/* Menu Desktop */}
        <ul className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link, index) => {
            const isActive = pathname === link.href;
            return (
              <motion.li
                key={link.name}
                className="relative group"
                onMouseEnter={() => link.submenu && setDropdownOpen(index)}
                onMouseLeave={() => link.submenu && setDropdownOpen(null)}
              >
                <Link
                  href={link.href}
                  className={`text-base font-medium relative pb-1 flex items-center gap-1 transition-colors ${
                    isActive ? "text-green-600" : "text-gray-500 hover:text-green-600"
                  }`}
                >
                  {link.name} {link.submenu && <ChevronDown size={14} />}
                  {/* Underline */}
                  <span
                    className={`
                      absolute left-0 -bottom-[2px] h-[2px] bg-green-600
                      transition-all duration-300 ease-out
                      ${isActive || dropdownOpen === index ? "w-full" : "w-0 group-hover:w-full"}
                    `}
                  />
                </Link>

                {/* Dropdown */}
                {link.submenu && (
                  <AnimatePresence>
                    {dropdownOpen === index && (
                      <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg overflow-hidden z-50 w-44"
                      >
                        {link.submenu.map((sub) => (
                          <li key={sub.name}>
                            <Link
                              href={sub.href}
                              className={`block px-4 py-2 text-gray-700 hover:bg-green-100 hover:text-green-600 transition-colors ${
                                pathname === sub.href ? "bg-green-100 text-green-600" : ""
                              }`}
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                )}
              </motion.li>
            );
          })}
        </ul>

        {/* Mobile Button */}
        <motion.button
          onClick={() => setOpen(!open)}
          whileTap={{ scale: 0.9 }}
          className="md:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white px-4 pb-4 space-y-3 overflow-hidden"
          >
            {navLinks.map((link, index) => (
              <li key={link.name} className="relative">
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block py-2 text-base ${
                    pathname === link.href ? "text-green-600" : "hover:text-green-600"
                  }`}
                >
                  {link.name}
                </Link>

                {/* Mobile Submenu */}
                {link.submenu && (
                  <ul className="pl-4 mt-1 space-y-1">
                    {link.submenu.map((sub) => (
                      <li key={sub.name}>
                        <Link
                          href={sub.href}
                          onClick={() => setOpen(false)}
                          className={`block py-1 text-sm ${
                            pathname === sub.href ? "text-green-600" : "text-gray-700 hover:text-green-600"
                          }`}
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
