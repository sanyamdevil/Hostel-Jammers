"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
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
  Award,
  Users,
  Sparkles,
  Star,
  Heart,
  Mic,
  Disc3,
  Guitar,
  Drum,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const sectionRefs = useRef([]);
  const controls = useAnimation();
  const [hearts, setHearts] = useState([]); // 🩷 Client-only random hearts

  /* === 1. Animate sections on scroll === */
  useEffect(() => {
    sectionRefs.current.forEach((el, index) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          delay: index * 0.15,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          ease: "power4.out",
        }
      );
    });
  }, []);

  /* === 2. Artists Data === */
  const artists = [
    { name: "Aman", role: "Lead Vocalist", icon: <Mic /> },
    { name: "Sanyam", role: "Vocalist", icon: <Music /> },
    { name: "Anurag", role: "Flute Master", icon: <Disc3 /> },
    { name: "Tanish", role: "Piano", icon: <Sparkles /> },
    { name: "Anudhya", role: "Guitarist", icon: <Guitar /> },
    { name: "Sahaj", role: "Guitarist", icon: <Guitar /> },
    { name: "Dipanshu", role: "Drum Set", icon: <Drum /> },
  ];

  /* === 3. Songs === */
  const songs = [
    "Aadat",
    "Pal Pal Dil Ke Paas",
    "Saat Samundar Paar",
    "Tum Hi Ho",
    "Kun Faya Kun",
    "Channa Mereya",
    "Agar Tum Saath Ho",
    "Teri Mitti",
    "Let It Be",
    "Hotel California",
    "Shape of You",
    "Believer",
    "Counting Stars",
  ];

  /* === 4. Awards === */
  const awards = [
    { title: "Ramlila Award" },
    { title: "Kurukshetra University Award" },
    { title: "School Award" },
  ];

  /* === 5. Gallery === */
  const gallery = [
    { img: "/band11.jpg", title: "Live Performance" },
    { img: "/band12.jpg", title: "Band Together" },
    { img: "/band13.jpg", title: "On Stage" },
    { img: "/band14.jpg", title: "Concert Night" },
    { img: "/band15.jpg", title: "Behind The Scenes" },
    { img: "/band16.jpg", title: "Award Ceremony" },
    { img: "/band17.jpg", title: "Making Memories" },
  ];

  /* === 6. Floating neon icons (client-only random) === */
  useEffect(() => {
    const heartData = Array.from({ length: 8 }).map(() => ({
      top: `${Math.random() * 90}%`,
      left: `${Math.random() * 90}%`,
      width: `${Math.random() * 40 + 20}px`,
      height: `${Math.random() * 40 + 20}px`,
    }));
    setHearts(heartData);
  }, []);

  useEffect(() => {
    if (hearts.length === 0) return;
    const icons = document.querySelectorAll(".floating-icon");
    icons.forEach((icon, i) => {
      gsap.to(icon, {
        y: "random(-20,20)",
        x: "random(-20,20)",
        duration: "random(3,6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.5,
      });
    });
  }, [hearts]);

  /* === 7. Particle Background === */
  useEffect(() => {
    const canvas = document.getElementById("particles");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let w, h;
    const num = 60;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      particles = Array.from({ length: num }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 1.2,
        dy: (Math.random() - 0.5) * 1.2,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        ctx.beginPath();
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 10);
        grd.addColorStop(0, "rgba(255,0,255,0.6)");
        grd.addColorStop(1, "transparent");
        ctx.fillStyle = grd;
        ctx.arc(p.x, p.y, p.r * 10, 0, Math.PI * 2);
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;
      });
      requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className="relative overflow-x-hidden bg-black text-white min-h-screen font-sans">
      {/* === Background Particles === */}
      <canvas
        id="particles"
        className="fixed top-0 left-0 w-full h-full -z-10 opacity-50"
      />

      {/* === Floating Neon Hearts === */}
      {hearts.length > 0 && (
        <div className="fixed top-0 left-0 w-full h-full -z-5 overflow-hidden pointer-events-none">
          {hearts.map((h, i) => (
            <Heart
              key={i}
              className="floating-icon absolute text-pink-500/20"
              style={{
                top: h.top,
                left: h.left,
                width: h.width,
                height: h.height,
              }}
            />
          ))}
        </div>
      )}

      {/* === HEADER === */}
      <section
        ref={(el) => (sectionRefs.current[0] = el)}
        className="flex flex-col justify-center items-center text-center py-32 bg-gradient-to-b from-black via-gray-900 to-black relative"
      >
        <motion.h1
          className="text-7xl md:text-9xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-violet-600 bg-clip-text text-transparent"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, type: "spring" }}
        >
          BandWar
        </motion.h1>
        <motion.p
          className="mt-8 text-2xl tracking-widest text-pink-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Where Passion Meets Melody
        </motion.p>
      </section>

      {/* === ABOUT === */}
      <section
        ref={(el) => (sectionRefs.current[1] = el)}
        className="bg-white text-black px-10 md:px-32 py-24 space-y-8"
      >
        <h2 className="text-5xl font-bold text-center text-violet-700 mb-8">
          About Us
        </h2>
        <p className="text-lg leading-relaxed text-gray-700 text-justify">
          BandWar is not just a band—it's a musical revolution born from
          friendship and shared passion. What started as casual jam sessions in
          a hostel room has evolved into a powerhouse ensemble that captivates
          audiences with soulful renditions and electrifying performances. Each
          member brings unique energy, creating a blend that transcends genres
          and touches hearts.
        </p>
      </section>

      {/* === ARTISTS === */}
      <section
        ref={(el) => (sectionRefs.current[2] = el)}
        className="bg-black text-white py-20 px-10 md:px-32"
      >
        <h2 className="text-5xl font-bold text-center text-pink-400 mb-12 flex items-center justify-center gap-2">
          <Users className="text-violet-400" /> The Artists
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {artists.map((artist, i) => (
            <motion.div
              key={i}
              className="p-6 bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl shadow-lg text-center border border-violet-700/30 hover:border-pink-400/60 transition-all"
              whileHover={{ scale: 1.05, rotate: 1 }}
            >
              <div className="flex justify-center text-pink-400 mb-3 text-4xl">
                {artist.icon}
              </div>
              <h3 className="text-2xl font-semibold">{artist.name}</h3>
              <p className="text-gray-400 mt-1">{artist.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* === SONGS === */}
      <section
        ref={(el) => (sectionRefs.current[3] = el)}
        className="bg-white text-black py-24 px-10 md:px-32"
      >
        <h2 className="text-5xl font-bold text-center text-violet-700 mb-12 flex items-center justify-center gap-2">
          <Music className="text-pink-500" /> Popular Performances
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {songs.map((song, i) => (
            <motion.div
              key={i}
              className="p-4 bg-gradient-to-r from-pink-100 to-violet-200 rounded-xl shadow-lg text-center font-medium text-gray-800 hover:from-pink-300 hover:to-violet-400 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              🎵 {song}
            </motion.div>
          ))}
        </div>
      </section>

      {/* === WAVEFORM === */}
      <section
        ref={(el) => (sectionRefs.current[4] = el)}
        className="bg-gradient-to-r from-black via-gray-900 to-black py-24 text-center"
      >
        <h2 className="text-5xl font-bold text-pink-400 mb-10">
          Feel The Vibe
        </h2>
        <div className="flex justify-center gap-1 px-10">
          {Array.from({ length: 60 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-gradient-to-t from-violet-500 to-pink-400 rounded-full"
              animate={{
                height: [
                  `${Math.random() * 40 + 10}px`,
                  `${Math.random() * 120 + 30}px`,
                  `${Math.random() * 60 + 20}px`,
                ],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: Math.random() * 1.5 + 0.5,
              }}
            />
          ))}
        </div>
      </section>

      {/* === AWARDS === */}
      <section
        ref={(el) => (sectionRefs.current[5] = el)}
        className="bg-white text-black py-24 px-10 md:px-32"
      >
        <h2 className="text-5xl font-bold text-center text-violet-700 mb-12 flex items-center justify-center gap-2">
          <Award className="text-pink-500" /> Awards & Recognition
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {awards.map((a, i) => (
            <motion.div
              key={i}
              className="bg-gradient-to-br from-gray-100 via-white to-gray-200 border border-pink-300 text-center px-10 py-8 rounded-2xl shadow-lg hover:shadow-violet-500/40 transition-all hover:scale-105"
              whileHover={{ y: -5 }}
            >
              <span className="text-4xl">🏆</span>
              <h3 className="mt-4 text-xl font-semibold text-pink-600">
                {a.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* === GALLERY === */}
      <section
        ref={(el) => (sectionRefs.current[6] = el)}
        className="bg-black text-white py-24 px-10 md:px-32"
      >
        <h2 className="text-5xl font-bold text-center text-pink-400 mb-12 flex items-center justify-center gap-2">
          <Star className="text-violet-400" /> Gallery
        </h2>
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          coverflowEffect={{
            rotate: 25,
            stretch: 0,
            depth: 150,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          navigation
          className="mySwiper w-full max-w-5xl mx-auto"
        >
          {gallery.map((g, i) => (
            <SwiperSlide
              key={i}
              className="bg-black rounded-2xl overflow-hidden shadow-2xl hover:shadow-pink-500/40 transition-all duration-500"
            >
              <Image
                src={g.img}
                alt={g.title}
                width={800}
                height={500}
                className="w-full h-96 object-cover opacity-90 hover:opacity-100 transition duration-700"
              />
              <div className="p-4 text-center text-pink-400 font-semibold bg-gradient-to-t from-black/70 to-transparent">
                {g.title}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

     
    </div>
  );
}
