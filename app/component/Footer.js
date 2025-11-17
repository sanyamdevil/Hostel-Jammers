"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Music,
  Instagram,
  Youtube,
  Facebook,
  Mail,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-zinc-900 via-black to-zinc-950 text-gray-300 pt-16 pb-10 border-t border-gray-800 overflow-hidden m-0">

      {/* Floating glow effects */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.05, 1] }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "mirror" }}
        className="absolute top-10 left-10 w-40 h-40 bg-pink-500/10 blur-3xl rounded-full"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
        className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/10 blur-3xl rounded-full"
      />

      {/* Main footer content */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center space-y-6">

        {/* Logo + intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center space-y-3"
        >
          <Music className="w-10 h-10 text-pink-500 animate-pulse" />
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent tracking-widest uppercase">
            BandWar
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl">
            Where Passion Meets Melody 🎵 — Soulful vibes and energetic
            performances that make every beat unforgettable.
          </p>
        </motion.div>

        {/* Navigation Links */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm md:text-base"
        >
          {[
            { href: "/", label: "Home" },
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
            { href: "/price", label: "Pricing" },
          ].map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="relative text-gray-400 hover:text-pink-500 transition-all duration-300 group"
            >
              {link.label}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-pink-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </motion.div>

        {/* Social Icons using <Link> */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center space-x-6 md:space-x-8 mt-6"
        >
          {/* Instagram */}
          <Link
            href="https://www.instagram.com/sam.12345.uiet?igsh=dWt2aHQ0NTJzNno3"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition duration-300"
          >
            <Instagram className="w-6 h-6" />
          </Link>

          {/* YouTube */}
          <Link
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-500 transition duration-300"
          >
            <Youtube className="w-6 h-6" />
          </Link>

          {/* Facebook */}
          <Link
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition duration-300"
          >
            <Facebook className="w-6 h-6" />
          </Link>

          {/* Mail */}
          <Link
            href="mailto:sanyamcsekuk@gmail.com"
            className="hover:text-purple-500 transition duration-300"
          >
            <Mail className="w-6 h-6" />
          </Link>

          {/* LinkedIn */}
          <Link
            href="https://www.linkedin.com/in/sanyam-mehta-729295327?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition duration-300"
          >
            <Linkedin className="w-6 h-6" />
          </Link>
        </motion.div>

        {/* Divider */}
        <div className="w-full border-t border-gray-700/50 mt-10 mb-4"></div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full text-sm text-gray-500"
        >
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-pink-500 font-semibold">BandWar</span>.
            All Rights Reserved.
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Crafted with ❤️ by passionate artists & developers.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
