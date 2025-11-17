"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import { Music, Star, Sparkles, Heart, Phone } from "lucide-react";

export default function SponsorsPage() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => setMounted(true), []);

  const sponsors = [
    {
      name: "Satyam Wadhwa",
      location: "Faridabad",
      role: "Order Handling Specialist",
      degree: "B.Tech CSE",
      color: "from-purple-500 to-pink-500",
      icon: "🎯",
    },
    {
      name: "Gourav",
      location: "Sonipat",
      role: "Businessman",
      business: "Diwali Crackers",
      degree: "B.Tech Biotech",
      color: "from-orange-500 to-red-500",
      icon: "🎆",
    },
  ];

  const bandImages = [
    { src: "/band1.jpg", alt: "BandWar Performance 1" },
    { src: "/band2.jpg", alt: "BandWar Performance 2" },
    { src: "/band3.jpg", alt: "BandWar Performance 3" },
    { src: "/band4.jpg", alt: "BandWar Performance 4" },
    { src: "/band5.jpg", alt: "BandWar Performance 5" },
    { src: "/band6.jpg", alt: "BandWar Performance 6" },
    { src: "/band7.jpg", alt: "BandWar Performance 7" },
    { src: "/band8.jpg", alt: "BandWar Performance 8" },
    { src: "/band9.jpg", alt: "BandWar Performance 9" },
    { src: "/band10.jpg", alt: "BandWar Performance 10" },
  ];

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black text-white overflow-hidden relative"
    >
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-orange-900/20" />
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(168,85,247,0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(249,115,22,0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 80%, rgba(236,72,153,0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(168,85,247,0.15) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ y, opacity }}
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.5 }}
          className="mb-8"
        >
          <Music className="w-24 h-24 text-purple-500" strokeWidth={1.5} />
        </motion.div>

        <motion.h1
          className="text-7xl md:text-9xl font-black text-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {"BandWar".split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: i * 0.1,
                type: "spring",
                stiffness: 180,
                damping: 12,
              }}
              whileHover={{
                scale: 1.3,
                rotate: [0, -10, 10, -10, 0],
                transition: { duration: 0.6 },
              }}
              className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500 cursor-pointer"
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        <p className="text-2xl md:text-4xl text-gray-300 text-center mb-12">
          Our Incredible Sponsors
        </p>

        <div className="flex gap-4">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -20, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            >
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Band Images Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            The Band
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bandImages.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, rotateZ: 1 }}
                className="relative group rounded-2xl overflow-hidden border border-purple-700/40 shadow-xl"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/40 to-pink-600/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
                {/* Actual Image */}
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={400}
                  className="w-full h-72 object-cover rounded-2xl transition-transform duration-500 group-hover:scale-110"
                />
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-center">
                  <p className="text-lg font-semibold text-white">
                    {img.alt}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500">
            Thank You to Our Sponsors
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {sponsors.map((sponsor, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${sponsor.color} rounded-3xl blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-300`}
                />
                <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-800 hover:border-purple-500 transition-colors">
                  <div className="text-6xl mb-6">{sponsor.icon}</div>
                  <h3 className="text-4xl font-bold mb-2">{sponsor.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <p className="text-xl text-gray-400">{sponsor.location}</p>
                  </div>
                  <p className="text-lg text-purple-300 font-semibold mb-2">
                    {sponsor.degree}
                  </p>
                  <p className="text-xl text-gray-300 mb-2">{sponsor.role}</p>
                  {sponsor.business && (
                    <p className="text-lg text-orange-400">
                      Business: {sponsor.business}
                    </p>
                  )}
                  <div className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-full">
                    <Heart className="w-5 h-5 fill-white" />
                    <span className="font-semibold">Thank You!</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Credit */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 border border-gray-700 relative overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20"
            />
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                Website Developed By
              </h3>
              <p className="text-4xl font-black text-white mb-6">Sanyam Mehta</p>
              <p className="text-xl text-gray-400 mb-6">Sirsa</p>
              <motion.a
                href="tel:9253387812"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-full text-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-shadow"
              >
                <Phone className="w-6 h-6" />
                <span>9253387812</span>
              </motion.a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
