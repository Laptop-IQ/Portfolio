"use client";

import Image from "next/image";
import Link from "next/link";
import { CountUp } from "countup.js";
import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform } from "framer-motion";

export default function Header() {
  const statsData = [
    { value: 12, label: "Years Experience" },
    { value: 22, label: "Projects Completed" },
    { value: 7, label: "Technologies Mastered" },
    { value: 450, label: "Code Commits" },
  ];

  const statsRef = useRef<HTMLDivElement | null>(null);
  const countRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const isInView = useInView(statsRef, { once: true });

  useEffect(() => {
    if (!isInView) return;

    countRefs.current.forEach((el, i) => {
      if (!el) return;

      const countUp = new CountUp(el, statsData[i].value, {
        duration: 2.2,
        separator: ",",
      });

      countUp.start();
    });
  }, [isInView]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const glowX = useTransform(mouseX, (v) => v - 250);
  const glowY = useTransform(mouseY, (v) => v - 250);

  return (
    <header
      onMouseMove={(e) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }}
      className="relative min-h-screen flex items-center justify-center text-white overflow-hidden bg-[#050505]"
    >
      {/* 🌌 Background Layer 1 (Gradient Depth) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,94,0,0.15),transparent_50%)]" />

      {/* 🌌 Background Layer 2 (Vignette) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,black_100%)]" />

      {/* ✨ Cursor Glow */}
      <motion.div
        className="pointer-events-none absolute w-125 h-125 rounded-full bg-(--primary-color)/15 blur-[160px]"
        style={{ x: glowX, y: glowY }}
      />

      {/* MAIN WRAPPER */}
      <div className="relative z-10 w-full max-w-7xl px-6 lg:px-20 flex flex-col lg:flex-row items-center justify-between gap-16">
        {/* LEFT SIDE */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs tracking-[0.3em] text-gray-500 uppercase"
          >
            Web Developer • UI Engineer • Freelancer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-4 text-5xl md:text-7xl lg:text-8xl font-semibold leading-[1.05]"
          >
            Hi, I’m <span className="text-(--primary-color)">Tyler Knox</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-gray-400 max-w-xl text-base md:text-lg leading-relaxed"
          >
            I craft premium digital experiences with modern engineering, elegant
            UI systems, and attention to every micro-detail that defines
            world-class products.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex gap-4 justify-center lg:justify-start"
          >
            <Link
              href="/Work"
              className="px-6 py-3 rounded-lg bg-(--primary-color) text-black font-medium hover:scale-105 transition-transform"
            >
              View Work
            </Link>

            <Link
              href="/cv.pdf"
              className="px-6 py-3 rounded-lg border border-white/15 hover:border-white/30 transition"
            >
              Download CV
            </Link>
          </motion.div>
        </div>

        {/* RIGHT SIDE IMAGE (ART PIECE STYLE) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:w-1/2 flex justify-center -right-20 relative"
        >
          {/* glow ring */}
          <div className="absolute w-105 h-105 rounded-full bg-(--primary-color)/10 blur-3xl" />

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border border-white/90 shadow-2xl"
          >
            <Image
              src="/Hero2.png"
              fill
              alt="Hero"
              loading="eager"
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* PREMIUM FLOATING STATS */}
      <div
        ref={statsRef}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 hidden lg:flex gap-6 z-20"
      >
        {statsData.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
              delay: i * 0.15,
              duration: 0.6,
              ease: "easeOut",
            }}
            whileHover={{
              scale: 1.08,
              y: -4,
            }}
            className="relative group"
          >
            {/* Glow Effect */}
            <div className="absolute inset-ring rounded-lg bg-linear-to-r from-purple-500/20 via-pink-500/50 to-blue-500/20 blur-xl opacity-10 group-hover:opacity-100 transition duration-500" />

            {/* Card */}
            <div className="relative px-4 py-2 rounded-lg border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] text-center min-w-12">
              {/* Number */}
              <h2
                ref={(el) => {
                  countRefs.current[i] = el;
                }}
                className="text-2xl font-semibold text-white -tracking-wider"
              />

              {/* Label */}
              <p className="text-xs text-gray-400 mt-1 -tracking-tighter">
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </header>
  );
}
