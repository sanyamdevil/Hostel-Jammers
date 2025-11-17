"use client";
/*
  Contact + Highlight Page for BandWar
  - Uses: framer-motion, gsap, swiper, lucide-react, next/image, next/link
  - Replace /band1.jpg ... /band6.jpg with your actual highlight images in /public
  - Files required for visuals: highlight1.jpg, highlight2.jpg, highlight3.jpg, highlight4.jpg, highlight5.jpg, highlight6.jpg
*/

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import gsap from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  Play,
  Music,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* ------------------------------- CONFIG DATA ------------------------------ */
/* -------------------------------------------------------------------------- */

/*
  Fixed positions for decorative particles/orbs.
  Using fixed arrays avoids Math.random at render time (prevents hydration mismatch).
*/
const ORB_POSITIONS = [
  { left: "6%", top: "8%", size: 72, color: "#ec4899" },
  { left: "86%", top: "12%", size: 96, color: "#a855f7" },
  { left: "20%", top: "26%", size: 56, color: "#f472b6" },
  { left: "70%", top: "36%", size: 72, color: "#7c3aed" },
  { left: "44%", top: "54%", size: 88, color: "#fb7185" },
  { left: "10%", top: "66%", size: 64, color: "#06b6d4" },
  { left: "78%", top: "76%", size: 100, color: "#a78bfa" },
  { left: "50%", top: "86%", size: 52, color: "#fda4af" },
];

/*
  Highlight images used inside Swiper gallery.
  Replace these filenames with images you add to /public.
*/
const HIGHLIGHT_IMAGES = [
  { src: "/band1.jpg", title: "KUK Fest 2024", caption: "Live performance at main stage" },
  { src: "/band2.jpg", title: "Cultural Eve", caption: "Soulful night at the campus" },
  { src: "/band3.jpg", title: "Battle of Bands", caption: "Grand finale performance" },
  { src: "/band4.jpg", title: "Open Mic Night", caption: "Acoustic vibes and fans" },
  { src: "/band5.jpg", title: "Campus Jam", caption: "BandWar unplugged session" },
  { src: "/band6.jpg", title: "Charity Concert", caption: "Music for a cause" },
];

/* Band contact details (kept constant) */
const BAND_INFO = {
  name: "BandWar",
  email: "sanyamcsekuk@gmail.com",
  phone: "+91 92533 87812",
  whatsapp: "919253387812", // for wa.me links use country code + number (no plus)
  location: "Kurukshetra University",
  mapQuery: "Kurukshetra+University",
};

/* -------------------------------------------------------------------------- */
/* ------------------------------ UTILITY CSS ------------------------------- */
/* -------------------------------------------------------------------------- */

/*
  Tailwind / CSS utility usage is embedded in className strings
  This file relies on Tailwind being set up in your project.
*/

/* -------------------------------------------------------------------------- */
/* ------------------------------ THE COMPONENT ----------------------------- */
/* -------------------------------------------------------------------------- */

export default function ContactHighlightPage() {
  /* framer controls for coordinated animations */
  const controls = useAnimation();

  /* cursor follow state (for large glow) */
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  /* highlight state for link containers — track hovered or focused container */
  const [activeHighlight, setActiveHighlight] = useState(null);

  /* ref for the whole hero/viewport to animate entry with GSAP */
  const rootRef = useRef(null);

  /* small in-view detection for subtle entrance animations */
  const aboutRef = useRef(null);
  const aboutInView = useInView(aboutRef, { once: true, margin: "-120px" });

  useEffect(() => {
    /* initial framer start */
    controls.start({ opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } });

    /* GSAP timeline for subtle continuous motion in header */
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(rootRef.current, { duration: 6, rotate: 0.0001, ease: "sine.inOut" }); // tiny nudge to create GPU layer
    // animate individual orbs slightly to create a breathing feeling
    ORB_POSITIONS.forEach((pos, idx) => {
      gsap.to(`#orb-${idx}`, {
        x: (idx % 2 === 0 ? 12 : -12),
        y: (idx % 3 === 0 ? 6 : -6),
        duration: 6 + (idx % 4),
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: idx * 0.2,
      });
    });

    /* Animate band card stagger in */
    gsap.fromTo(
      ".band-contact-card",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.12, ease: "power3.out" }
    );

    return () => {
      tl.kill();
      ORB_POSITIONS.forEach((_, idx) => {
        gsap.killTweensOf(`#orb-${idx}`);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* handle pointer move used solely for cursor-follow glow */
  function handlePointer(e) {
    setCursor({ x: e.clientX, y: e.clientY });
  }

  /* clickable handlers for links — opens mail client, whatsapp and map */
  function openMail() {
    window.location.href = `mailto:${BAND_INFO.email}`;
  }
  function openWhatsApp() {
    // using wa.me link for direct chat
    window.open(`https://wa.me/${BAND_INFO.whatsapp}`, "_blank");
  }
  function openMap() {
    window.open(`https://www.google.com/maps?q=${BAND_INFO.mapQuery}`, "_blank");
  }

  /* variants used by framer-motion for repeated patterns */
  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
  };

  const pulse = {
    animate: {
      scale: [1, 1.03, 1],
      boxShadow: [
        "0 10px 30px rgba(0,0,0,0.2)",
        "0 14px 40px rgba(236,72,153,0.14)",
        "0 10px 30px rgba(0,0,0,0.2)",
      ],
      transition: { duration: 2.6, repeat: Infinity, ease: "easeInOut" },
    },
  };

  /* helper to add accessible focus/hover handlers for highlight containers */
  function activateHighlight(id) {
    setActiveHighlight(id);
  }
  function deactivateHighlight() {
    setActiveHighlight(null);
  }

  /* small accessibility note: ensure clickable Link uses a <a> inside next/link when target blank */
  return (
    <div
      ref={rootRef}
      onMouseMove={handlePointer}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-purple-950 to-pink-900 text-white"
    >
      {/* cursor-follow glow - large soft orb */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ translateX: cursor.x - 160, translateY: cursor.y - 160 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="pointer-events-none fixed w-[320px] h-[320px] rounded-full blur-3xl bg-gradient-to-br from-pink-500/20 to-purple-500/10 opacity-80"
      />

      {/* decorative fixed orbs for depth (positions deterministic) */}
      {ORB_POSITIONS.map((orb, idx) => (
        <motion.div
          id={`orb-${idx}`}
          key={idx}
          aria-hidden
          className="pointer-events-none fixed rounded-full opacity-40 blur-2xl"
          style={{
            left: orb.left,
            top: orb.top,
            width: orb.size,
            height: orb.size,
            background: orb.color,
            mixBlendMode: "screen",
            transform: "translate3d(0,0,0)",
          }}
        />
      ))}

      {/* TOP HERO */}
      <header className="relative z-30 pt-28 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            className="text-center"
            aria-hidden={false}
          >
            <motion.h1
              layout
              initial={{ scale: 0.98 }}
              animate={{ scale: 1, textShadow: "0 0 8px rgba(236,72,153,0.3)" }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-rose-400"
            >
              Contact & Highlights — BandWar
            </motion.h1>

            <motion.p
              className="mt-4 text-gray-300 max-w-2xl mx-auto text-lg"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              Reach us for bookings, collaborations or campus events. Click any contact
              method to open it (email, WhatsApp, or map). Highlights below show our best
              performances — hover the images to see animated frames and glowing outlines.
            </motion.p>
          </motion.div>
        </div>
      </header>

      {/* CONTACT CARDS */}
      <main className="relative z-30">
        <section className="max-w-6xl mx-auto px-6 pb-12 md:pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* EMAIL CARD */}
            <motion.article
              className={`band-contact-card group rounded-3xl p-8 cursor-pointer transform transition-all duration-300`}
              onMouseEnter={() => activateHighlight("email")}
              onMouseLeave={deactivateHighlight}
              onFocus={() => activateHighlight("email")}
              onBlur={deactivateHighlight}
              onClick={openMail}
              whileHover={{ y: -6 }}
              role="button"
              tabIndex={0}
              aria-label={`Email ${BAND_INFO.email}`}
            >
              <div
                className={`rounded-2xl p-6 bg-gradient-to-br from-white/6 to-white/3 border border-white/10 shadow-xl ${
                  activeHighlight === "email" ? "ring-8 ring-pink-500/20" : ""
                }`}
              >
                <div className="flex items-center justify-center mb-4">
                  <Mail className="text-pink-300" size={40} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-100">Email</h3>
                <p className="text-gray-300 mb-4">{BAND_INFO.email}</p>

                <motion.div
                  className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-pink-600/80 hover:bg-pink-500 transition-colors"
                  whileTap={{ scale: 0.98 }}
                >
                  <Play size={18} />
                  <span className="font-medium">Open Mail</span>
                </motion.div>
              </div>
            </motion.article>

            {/* WHATSAPP CARD */}
            <motion.article
              className={`band-contact-card group rounded-3xl p-8 cursor-pointer transform transition-all duration-300`}
              onMouseEnter={() => activateHighlight("whatsapp")}
              onMouseLeave={deactivateHighlight}
              onFocus={() => activateHighlight("whatsapp")}
              onBlur={deactivateHighlight}
              onClick={openWhatsApp}
              whileHover={{ y: -6 }}
              role="button"
              tabIndex={0}
              aria-label={`WhatsApp ${BAND_INFO.phone}`}
            >
              <div
                className={`rounded-2xl p-6 bg-gradient-to-br from-white/6 to-white/3 border border-white/10 shadow-xl ${
                  activeHighlight === "whatsapp" ? "ring-8 ring-green-400/20" : ""
                }`}
              >
                <div className="flex items-center justify-center mb-4">
                  <Phone className="text-green-300" size={40} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-100">WhatsApp</h3>
                <p className="text-gray-300 mb-4">{BAND_INFO.phone}</p>

                <motion.div
                  className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-green-600/80 hover:bg-green-500 transition-colors"
                  whileTap={{ scale: 0.98 }}
                >
                  <Play size={18} />
                  <span className="font-medium">Open Chat</span>
                </motion.div>
              </div>
            </motion.article>

            {/* MAP CARD */}
            <motion.article
              className={`band-contact-card group rounded-3xl p-8 cursor-pointer transform transition-all duration-300`}
              onMouseEnter={() => activateHighlight("map")}
              onMouseLeave={deactivateHighlight}
              onFocus={() => activateHighlight("map")}
              onBlur={deactivateHighlight}
              onClick={openMap}
              whileHover={{ y: -6 }}
              role="button"
              tabIndex={0}
              aria-label={`Location ${BAND_INFO.location}`}
            >
              <div
                className={`rounded-2xl p-6 bg-gradient-to-br from-white/6 to-white/3 border border-white/10 shadow-xl ${
                  activeHighlight === "map" ? "ring-8 ring-purple-500/20" : ""
                }`}
              >
                <div className="flex items-center justify-center mb-4">
                  <MapPin className="text-purple-300" size={40} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-100">Location</h3>
                <p className="text-gray-300 mb-4">{BAND_INFO.location}</p>

                <motion.div
                  className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-purple-600/80 hover:bg-purple-500 transition-colors"
                  whileTap={{ scale: 0.98 }}
                >
                  <Play size={18} />
                  <span className="font-medium">Open Map</span>
                </motion.div>
              </div>
            </motion.article>
          </div>
        </section>

        {/* Decorative divider */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-0.5 bg-gradient-to-r from-pink-600/40 via-purple-400/20 to-white/10 rounded-full mb-10" />
        </div>

        {/* HIGHLIGHTS GALLERY - Swiper with animated, clickable highlight containers */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-center text-pink-300 mb-8"
          >
            Highlights — live moments & best scenes
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full"
          >
            <Swiper
              modules={[Autoplay, EffectCoverflow, Pagination]}
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              slidesPerView={"auto"}
              autoplay={{ delay: 200, disableOnInteraction: false }}
              coverflowEffect={{
                rotate: 28,
                stretch: 0,
                depth: 220,
                modifier: 1.1,
                slideShadows: false,
              }}
              pagination={{ clickable: true }}
              className="py-8"
            >
              {HIGHLIGHT_IMAGES.map((item, idx) => (
                <SwiperSlide
                  key={idx}
                  className="max-w-[420px] w-[92%] md:w-[420px] flex justify-center"
                >
                  {/* each highlight card */}
                  <motion.div
                    role="group"
                    className={`relative rounded-2xl overflow-hidden shadow-2xl border border-white/8 transform transition-all duration-500`}
                    whileHover={{ scale: 1.03, y: -8 }}
                    onMouseEnter={() => activateHighlight(`highlight-${idx}`)}
                    onMouseLeave={() => deactivateHighlight()}
                    onFocus={() => activateHighlight(`highlight-${idx}`)}
                    onBlur={() => deactivateHighlight()}
                  >
                    {/* image area */}
                    <div className="relative w-full h-[360px]">
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 92vw, 420px"
                        className={`object-cover transition-transform duration-700 ${
                          activeHighlight === `highlight-${idx}` ? "scale-105" : "scale-100"
                        }`}
                        priority={idx === 0}
                      />
                      {/* overlay animated frame */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: activeHighlight === `highlight-${idx}` ? 1 : 0.6,
                          boxShadow:
                            activeHighlight === `highlight-${idx}` ? "0 30px 60px rgba(236,72,153,0.18)" : "0 10px 30px rgba(0,0,0,0.4)",
                        }}
                        transition={{ duration: 0.35 }}
                        className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 mix-blend-overlay"
                        aria-hidden
                      />

                      {/* corner neon border that animates continuously */}
                      <motion.div
                        className="pointer-events-none absolute inset-0"
                        animate={{
                          borderImageSlice: [1, 1, 1],
                        }}
                      >
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id={`g-${idx}`} x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#ec4899" stopOpacity="0.85" />
                              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.6" />
                              <stop offset="100%" stopColor="#f472b6" stopOpacity="0.85" />
                            </linearGradient>
                          </defs>
                          <rect x="1" y="1" width="98" height="98" rx="6" ry="6" fill="none" stroke={`url(#g-${idx})`} strokeWidth="0.6" strokeDasharray="6 4" />
                        </svg>
                      </motion.div>

                      {/* info badge bottom-left */}
                      <motion.div
                        initial={{ y: 24, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.25 + idx * 0.05 }}
                        className="absolute left-4 bottom-4 rounded-full bg-black/50 px-4 py-2 backdrop-blur-md flex items-center gap-3"
                      >
                        <Music size={18} className="text-pink-300" />
                        <div className="text-left">
                          <div className="text-sm font-medium text-white">{item.title}</div>
                          <div className="text-xs text-gray-200/80">{item.caption}</div>
                        </div>
                      </motion.div>

                      {/* clickable overlay that visually emphasizes when selected */}
                      <button
                        aria-label={`Open highlight ${item.title}`}
                        onClick={() => {
                          // when clicked, temporarily set highlight to the clicked slide to emphasize
                          activateHighlight(`highlight-${idx}`);
                          setTimeout(() => deactivateHighlight(), 1400);
                        }}
                        className="absolute inset-0"
                      />
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </section>

        {/* HIGHLIGHT GRID - clickable images only (no additional numbered image placeholders) */}
        <section className="max-w-7xl mx-auto px-6 pb-28">
          <motion.h3
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-3xl font-semibold text-center text-purple-200 mb-6"
          >
            More moments — hover to highlight
          </motion.h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {/* re-using HIGHLIGHT_IMAGES array but rendered as small cards with a glowing frame */}
            {HIGHLIGHT_IMAGES.map((it, i) => (
              <motion.figure
                key={`mini-${i}`}
                className="relative rounded-xl overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.03 }}
                onMouseEnter={() => activateHighlight(`mini-${i}`)}
                onMouseLeave={deactivateHighlight}
                onFocus={() => activateHighlight(`mini-${i}`)}
                onBlur={deactivateHighlight}
                tabIndex={0}
              >
                <Image
                  src={it.src}
                  alt={it.title}
                  width={600}
                  height={400}
                  className={`w-full h-48 object-cover transition-transform duration-700 ${activeHighlight === `mini-${i}` ? "scale-105" : "scale-100"}`}
                />

                {/* small overlay */}
                <motion.figcaption
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeHighlight === `mini-${i}` ? 1 : 0.8 }}
                  transition={{ duration: 0.25 }}
                  className={`absolute left-3 bottom-3 bg-black/50 px-3 py-1 rounded-full backdrop-blur-md text-sm text-white`}
                >
                  {it.title}
                </motion.figcaption>

                {/* border glow when active */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{ opacity: activeHighlight === `mini-${i}` ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ boxShadow: "0 20px 50px rgba(168,85,247,0.16)", borderRadius: 12 }}
                />
              </motion.figure>
            ))}
          </div>
        </section>

        {/* MAP & SOCIALS */}
        <section className="max-w-6xl mx-auto px-6 pb-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* MAP */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-3xl overflow-hidden border border-white/8 shadow-xl"
            >
              <iframe
                title="Kurukshetra University map"
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3431.5048392178343!2d76.81341627529447!3d29.948950174971498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391e2b06a0b9a3b3%3A0x9d2c5201772c4ef3!2sKurukshetra%20University!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin`}
                width="100%"
                height="360"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>

            {/* socials + quick actions */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="rounded-3xl p-8 bg-gradient-to-br from-white/3 to-white/6 border border-white/8 shadow-xl"
            >
              <h4 className="text-2xl font-semibold mb-4 text-white">Connect with us</h4>
              <p className="text-gray-300 mb-6">Follow BandWar on socials — or hit WhatsApp to book us.</p>

              <div className="flex items-center gap-4 mb-6">
                <Link href="mailto:sanyamcsekuk@gmail.com" className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-pink-600/80 text-white hover:bg-pink-500 transition">
                  <Mail size={18} />
                  Email
                </Link>

                <button
                  onClick={openWhatsApp}
                  className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-green-600/80 text-white hover:bg-green-500 transition"
                >
                  <Phone size={18} />
                  WhatsApp
                </button>
              </div>

              <div className="flex gap-4 items-center">
                <Link href="#" className="p-3 rounded-full bg-white/6 hover:bg-white/10 transition">
                  <Instagram size={22} />
                </Link>
                <Link href="#" className="p-3 rounded-full bg-white/6 hover:bg-white/10 transition">
                  <Facebook size={22} />
                </Link>
                <Link href="#" className="p-3 rounded-full bg-white/6 hover:bg-white/10 transition">
                  <Youtube size={22} />
                </Link>
              </div>

              <div className="mt-8 text-sm text-gray-300">
                <div><strong>Band:</strong> {BAND_INFO.name}</div>
                <div className="mt-2"><strong>Contact:</strong> <Link href={`https://wa.me/${BAND_INFO.whatsapp}`} className="text-white underline">{BAND_INFO.phone}</Link></div>
                <div className="mt-1"><strong>Location:</strong> <Link href={`https://www.google.com/maps?q=${BAND_INFO.mapQuery}`} className="text-white underline">{BAND_INFO.location}</Link></div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

   
    </div>
  );
}
