"use client";

/**
 * BandWar — Price Page (v2)
 * - Uses: GSAP (ScrollTrigger), Framer Motion, Swiper, Lucide React
 * - Animated Background Guitars + Neon Cursor + Particles
 * - All <a> tags replaced with <Link>
 */

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectCoverflow,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import {
  Music,
  Star,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  Guitar,
  Heart,
  Play,
  Sparkles,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/* Neon Cursor                                                         */
/* ------------------------------------------------------------------ */
function NeonCursor() {
  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.id = "neon-cursor";
    cursor.style.position = "fixed";
    cursor.style.width = "18px";
    cursor.style.height = "18px";
    cursor.style.borderRadius = "50%";
    cursor.style.pointerEvents = "none";
    cursor.style.background =
      "radial-gradient(circle, rgba(255,100,255,0.8) 0%, rgba(255,0,255,0) 70%)";
    cursor.style.boxShadow =
      "0 0 20px rgba(255,100,255,0.5), 0 0 40px rgba(255,0,255,0.3)";
    cursor.style.zIndex = "9999";
    cursor.style.transition = "transform 0.1s ease-out";

    document.body.appendChild(cursor);

    let x = 0,
      y = 0,
      targetX = 0,
      targetY = 0;

    const move = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      x += (targetX - x) * 0.1;
      y += (targetY - y) * 0.1;
      cursor.style.transform = `translate(${x - 9}px, ${y - 9}px)`;
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", move);
    animate();

    return () => {
      document.body.removeChild(cursor);
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return null;
}

/* ------------------------------------------------------------------ */
/* Floating Guitars Background (animated using GSAP)                   */
/* ------------------------------------------------------------------ */
function FloatingGuitars({ count = 6 }) {
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    const temp = Array.from({ length: count }).map(() => ({
      top: `${Math.random() * 90}%`,
      left: `${Math.random() * 90}%`,
      rotation: Math.random() * 360,
      size: Math.random() * 50 + 40,
      opacity: 0.05 + Math.random() * 0.15,
    }));
    setIcons(temp);
  }, [count]);

  useEffect(() => {
    if (icons.length === 0) return;
    const els = document.querySelectorAll(".floating-guitar");
    els.forEach((el) => {
      gsap.to(el, {
        y: "random(-40,40)",
        x: "random(-40,40)",
        rotation: "random(-20,20)",
        duration: 8 + Math.random() * 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, [icons]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-20">
      {icons.map((g, i) => (
        <Guitar
          key={i}
          className="floating-guitar absolute text-pink-500/20"
          style={{
            top: g.top,
            left: g.left,
            width: g.size,
            height: g.size,
            opacity: g.opacity,
            transform: `rotate(${g.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section Wrapper Helper                                              */
/* ------------------------------------------------------------------ */
function SectionWrapper({ id, children, className = "" }) {
  return (
    <section
      id={id}
      className={`px-6 md:px-16 lg:px-28 py-16 ${className}`}
    >
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Animated Waveform (as before)                                       */
/* ------------------------------------------------------------------ */
function Waveform({ bars = 60 }) {
  const [amps, setAmps] = useState([]);
  useEffect(() => {
    setAmps(
      Array.from({ length: bars }).map(() => ({
        h1: Math.random() * 40 + 10,
        h2: Math.random() * 120 + 40,
        dur: Math.random() * 1.6 + 0.6,
      }))
    );
  }, [bars]);

  if (!amps.length) return null;
  return (
    <div
      className="flex items-end gap-1 mx-auto overflow-hidden"
      style={{ maxWidth: 1200 }}
    >
      {amps.map((a, i) => (
        <motion.div
          key={i}
          className="hj-wave-bar w-1 bg-gradient-to-t from-violet-500 to-pink-400 rounded-full"
          style={{ height: a.h2 }}
          animate={{ height: [a.h1, a.h2, a.h1] }}
          transition={{
            repeat: Infinity,
            duration: a.dur,
            ease: "easeInOut",
            repeatType: "mirror",
            delay: i * 0.02,
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Price Package Card (with Link)                                      */
/* ------------------------------------------------------------------ */
function PackageCard({
  title,
  price,
  features = [],
  popular = false,
  accent = "from-pink-500 to-violet-500",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      className={`bg-gradient-to-b ${accent} p-1 rounded-3xl shadow-2xl`}
    >
      <div className="bg-black/90 rounded-3xl p-8 text-white min-h-[340px] flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3">
            {popular && (
              <span className="px-3 py-1 rounded-full bg-pink-600 text-black font-semibold text-sm">
                POPULAR
              </span>
            )}
            <h3 className="text-2xl font-extrabold tracking-tight">{title}</h3>
          </div>
          <div className="mt-4">
            <span className="text-5xl font-bold">{price}</span>
            <span className="text-gray-400 ml-2">per event</span>
          </div>

          <ul className="mt-6 space-y-3">
            {features.map((f, idx) => (
              <li key={idx} className="flex items-center gap-3 text-gray-200">
                <CheckCircle className="w-5 h-5 text-pink-400" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-pink-500 hover:bg-pink-600 text-black font-semibold shadow-lg transition"
          >
            Book Now <Play className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ Item                                                            */
/* ------------------------------------------------------------------ */
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-5 py-4 flex items-center justify-between bg-gradient-to-r from-black/60 to-black/40"
      >
        <div className="text-left">
          <div className="font-semibold">{q}</div>
          <div className="text-sm text-gray-400">
            Click to {open ? "collapse" : "expand"}
          </div>
        </div>
        <div className="text-pink-400 font-bold">{open ? "-" : "+"}</div>
      </button>
      <div className={`px-5 py-4 text-gray-300 ${open ? "block" : "hidden"}`}>
        {a}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MAIN PAGE                                                           */
/* ------------------------------------------------------------------ */
export default function PricePage() {
  const mainRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hj-hero-title", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  const packages = [
    {
      title: "Acoustic Set",
      price: "₹3,000",
      features: [
        "45 mins set",
        "2 Vocalists + Guitar",
        "Basic Sound Setup",
        "Custom Song Requests",
      ],
    },
    {
      title: "Full Band",
      price: "₹6,500",
      features: [
        "90 mins set",
        "7-Member Band",
        "Stage & Sound Setup",
        "Rehearsed Playlist",
      ],
      popular: true,
    },
    {
      title: "Festival / Corporate",
      price: "₹12,000",
      features: [
        "2 hour performance",
        "Advanced Sound & Lights",
        "Custom Setlist & MC",
        "Travel Included (Local)",
      ],
    },
  ];

  const faqs = [
    {
      q: "How far do you travel?",
      a: "We travel within 100 km. For longer distances, travel charges apply.",
    },
    {
      q: "Do you accept song requests?",
      a: "Yes — within the setlist, we take advance song requests.",
    },
    {
      q: "What is the payment schedule?",
      a: "50% advance to confirm booking, remainder on event day.",
    },
  ];

  return (
    <div
      ref={mainRef}
      className="relative min-h-screen bg-black text-white overflow-x-hidden"
    >
      <NeonCursor />
      <FloatingGuitars />
      <header className="relative pt-24 pb-12 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-pink-600 to-violet-600 text-black px-4 py-2 rounded-full mb-6 shadow-xl">
            <Music className="w-5 h-5" /> Booking & Pricing
          </div>

          <h1 className="hj-hero-title text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-violet-500">
            Packages that make your event sing
          </h1>

          <p className="text-lg text-gray-300 mb-6">
            Choose from intimate acoustic sessions to full-band festival
            experiences — perfect for college fests, weddings, and corporate
            events.
          </p>

          <Waveform bars={50} />
        </div>
      </header>

      <SectionWrapper id="packages" className="bg-black/60">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Our Packages</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-8">
            {packages.map((p, i) => (
              <PackageCard key={i} {...p} />
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="faq" className="bg-black/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((f, i) => (
              <FAQItem key={i} {...f} />
            ))}
          </div>
        </div>
      </SectionWrapper>

      <section className="px-6 md:px-16 lg:px-28 py-16">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-pink-800/10 to-violet-800/6 border border-gray-800 rounded-3xl p-8 text-center">
          <h3 className="text-3xl font-bold mb-4">
            Ready to book BandWar?
          </h3>
          <p className="text-gray-300 mb-6">
            Send us your event details — we’ll respond with availability &
            custom quote.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-pink-500 text-black font-semibold shadow-lg"
            >
              Contact Us
            </Link>
            <Link
              href="/about"
              className="px-6 py-3 rounded-full border border-gray-700 text-gray-200"
            >
              Gallery
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
