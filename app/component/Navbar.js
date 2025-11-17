"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Music, Menu, X } from "lucide-react";

/**
 * 🔮 BandWar Navbar
 * Glassy, Animated, Music-Themed Navbar
 * - Animated glow underline on hover
 * - Background blur (glassmorphism)
 * - Responsive with slide-in mobile menu
 * - GSAP + Framer Motion animations
 */

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/price" },
  { label: "Sponsor", href: "/sponsor" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP glow pulse on logo
  useEffect(() => {
    gsap.to(".hj-logo-glow", {
      opacity: 0.5,
      scale: 1.05,
      repeat: -1,
      yoyo: true,
      duration: 2.4,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-xl transition-all duration-700 ${
        scrolled
          ? "bg-black/60 shadow-lg border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-2 group relative cursor-pointer"
        >
          <div className="relative">
            <Music className="hj-logo-glow w-7 h-7 text-pink-500 drop-shadow-[0_0_6px_rgba(236,72,153,0.8)]" />
            <div className="absolute inset-0 blur-md bg-pink-500/30 rounded-full -z-10"></div>
          </div>
          <span className="text-lg md:text-xl font-extrabold tracking-widest bg-gradient-to-r from-pink-400 via-purple-400 to-violet-500 bg-clip-text text-transparent uppercase">
            BandWar
          </span>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Link
                href={link.href}
                className="relative text-gray-300 hover:text-pink-400 transition-all duration-300 group"
              >
                {link.label}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg text-gray-300 hover:text-pink-400 focus:outline-none transition-all duration-300"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : -40 }}
        transition={{ duration: 0.4 }}
        className={`absolute top-full left-0 w-full bg-black/80 backdrop-blur-2xl md:hidden shadow-2xl ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center space-y-4 py-6">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-pink-400 text-lg transition-all duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Floating glowing line under navbar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1.5 }}
        className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-pink-500/70 to-transparent blur-[1px]"
      />
    </motion.nav>
  );
}
