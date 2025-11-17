"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Music,
  Guitar,
  Drum,
  Piano,
  Mail,
  Instagram,
  Facebook,
  Youtube,
    Linkedin,

} from "lucide-react";

export default function HostelJammersHome() {
  const [activeSection, setActiveSection] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  const bandMembers = [
    { name: "Sanyam", role: "Singer", icon: Music, gradient: "from-purple-500 to-pink-500" },
    { name: "Aman", role: "Singer", icon: Music, gradient: "from-pink-500 to-rose-500" },
    { name: "Anurag", role: "Flute Master", icon: Music, gradient: "from-blue-500 to-cyan-500" },
    { name: "Anvdhya", role: "Guitarist", icon: Guitar, gradient: "from-orange-500 to-red-500" },
    { name: "Sahaj", role: "Guitarist", icon: Guitar, gradient: "from-yellow-500 to-orange-500" },
    { name: "Dipanshu", role: "Drum Set", icon: Drum, gradient: "from-green-500 to-teal-500" },
    { name: "Tanish", role: "Piano", icon: Piano, gradient: "from-indigo-500 to-purple-500" },
  ];

  // Hydration-safe particles: generate on client only
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const generated = Array.from({ length: 50 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
    setParticles(generated);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".section");
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (scrollPosition >= top && scrollPosition < bottom) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-black text-white overflow-x-hidden pt-24">{/* Gap added for navbar */}

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity, scale }}
        className="section relative min-h-screen flex items-center justify-center overflow-hidden"
        id="home"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-pink-900/30" />

          {/* Floating particles (hydration-safe) */}
          {particles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: p.left,
                top: p.top,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
              }}
            />
          ))}

          {/* Animated circles */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`circle-${i}`}
              className="absolute rounded-full border-2 border-purple-500/20"
              style={{
                width: `${(i + 1) * 100}px`,
                height: `${(i + 1) * 100}px`,
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.5, 0.2],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

         {/* Hero Content */}
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 1.2, bounce: 0.5 }}
            className="mb-8"
          >
            <motion.div
              className="text-8xl mb-4"
              animate={{
                rotate: [0, 10, -10, 0],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              🎸
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-7xl md:text-9xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-rose-500 bg-clip-text text-transparent"
          >
            {["B", "a", "n", "d", "W" ,"a","r"].map(
              (letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  whileHover={{
                    scale: 1.2,
                    color: "#ec4899",
                    textShadow: "0 0 20px #ec4899",
                  }}
                  className="inline-block"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              )
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-xl md:text-3xl text-gray-300 mb-4"
          >
            <motion.span
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              Kurukshetra University Band
            </motion.span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-lg text-gray-400 mb-12"
          >
            Where Passion Meets Music
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px rgba(168, 85, 247, 0.5)",
              y: -5,
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all relative overflow-hidden group"
            onClick={() => document.getElementById("band").scrollIntoView({ behavior: "smooth" })}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative z-10">Meet The Band</span>
          </motion.button>

          {/* Animated music notes */}
          {["🎵", "🎶", "🎼"].map((note, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              style={{
                left: `${20 + i * 30}%`,
                top: "20%",
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 1.3,
              }}
            >
              {note}
            </motion.div>
          ))}
        </div>
        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 bg-purple-400 rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Band Members Section */}
      <section className="section min-h-screen py-32 px-6 relative" id="band">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl font-bold text-center mb-20 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
          >
            The Band
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bandMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  z: 50,
                }}
                className="relative group"
              >
                <div className={`bg-gradient-to-br ${member.gradient} p-1 rounded-2xl`}>
                  <div className="bg-black rounded-2xl p-8 h-full relative overflow-hidden">
                    {/* Shine effect on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />

                    <motion.div
                      className="flex justify-center mb-6"
                      whileHover={{
                        rotate: [0, -10, 10, -10, 0],
                        scale: 1.2,
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <motion.div
                        animate={{
                          y: [0, -5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.2,
                        }}
                      >
                        <member.icon size={64} className="text-white" />
                      </motion.div>
                    </motion.div>

                    <motion.h3
                      className="text-3xl font-bold text-center mb-2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      {member.name.split("").map((char, i) => (
                        <motion.span
                          key={i}
                          whileHover={{
                            y: -5,
                            color: "#ec4899",
                            transition: { duration: 0.2 },
                          }}
                          className="inline-block"
                        >
                          {char}
                        </motion.span>
                      ))}
                    </motion.h3>

                    <motion.p
                      className="text-gray-400 text-center text-lg"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                    >
                      {member.role}
                    </motion.p>

                    {/* Animated corner accents */}
                    {[0, 1, 2, 3].map((corner) => (
                      <motion.div
                        key={corner}
                        className="absolute w-4 h-4 bg-purple-500"
                        style={{
                          top: corner < 2 ? 0 : "auto",
                          bottom: corner >= 2 ? 0 : "auto",
                          left: corner % 2 === 0 ? 0 : "auto",
                          right: corner % 2 === 1 ? 0 : "auto",
                        }}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.5 + corner * 0.1 }}
                      />
                    ))}

                    {/* Pulsing glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        background: `linear-gradient(45deg, transparent, rgba(168, 85, 247, 0.3), transparent)`,
                      }}
                      animate={{
                        backgroundPosition: ["0% 0%", "100% 100%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section min-h-screen py-32 px-6 relative" id="contact">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl font-bold mb-12 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
          >
            Get In Touch
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 mb-16"
          >
            Want to book us for your event or just want to say hi? Drop us a message!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, type: "spring" }}
            className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-lg border border-white/10 rounded-3xl p-12 mb-12 relative overflow-hidden group"
          >
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              <Mail size={48} className="mx-auto mb-6 text-purple-400 relative z-10" />
            </motion.div>

            <motion.a
              href="mailto:sanyamcsekuk@gmail.com"
              className="text-2xl text-purple-400 hover:text-purple-300 transition-colors relative z-10 inline-block"
              whileHover={{ scale: 1.05 }}
            >
              {[
                "s",
                "a",
                "n",
                "y",
                "a",
                "m",
                "c",
                "s",
                "e",
                "k",
                "u",
                "k",
                "@",
                "g",
                "m",
                "a",
                "i",
                "l",
                ".",
                "c",
                "o",
                "m",
              ].map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.03 }}
                  whileHover={{
                    y: -3,
                    color: "#ec4899",
                    transition: { duration: 0.2 },
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </motion.a>
          </motion.div>

       {/* Social Media Links */}
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ delay: 0.8 }}
  className="flex justify-center gap-6"
>
  {[
    {
      Icon: Instagram,
      href: "https://www.instagram.com/sam.12345.uiet?igsh=dWt2aHQ0NTJzNno3",
      color: "hover:text-pink-500",
      bg: "from-pink-500 to-purple-500",
    },
    {
      Icon: Linkedin,
      href: "https://www.linkedin.com/in/sanyam-mehta-729295327?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      color: "hover:text-blue-400",
      bg: "from-blue-500 to-cyan-400",
    },
  ].map(({ Icon, href, color, bg }, i) => (
    <motion.a
      key={i}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.9 + i * 0.1 }}
      whileHover={{
        scale: 1.3,
        rotate: [0, -10, 10, 0],
        y: -10,
      }}
      whileTap={{ scale: 0.9 }}
      className={`text-gray-400 ${color} transition-colors relative group`}
    >
      <motion.div
        className={`absolute inset-0 rounded-full bg-gradient-to-r ${bg} opacity-0 group-hover:opacity-20 blur-xl`}
        whileHover={{ scale: 1.5 }}
      />
      <Icon size={32} className="relative z-10" />
    </motion.a>
  ))}
</motion.div>


          {/* Floating music emojis around contact */}
          {["🎤", "🎧", "🎹", "🥁"].map((emoji, i) => (
            <motion.div
              key={i}
              className="absolute text-5xl opacity-20"
              style={{
                left: `${15 + i * 20}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 360],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
