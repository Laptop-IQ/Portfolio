"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaReact, FaJsSquare, FaBootstrap } from "react-icons/fa";
import { SiTailwindcss, SiFigma, SiFramer } from "react-icons/si";

const projects = [
  {
    id: "01",
    title: "React JS Project",
    desc: "High-performance React application with scalable architecture and premium UI system designed for modern products.",
    img: "/Project-1.jpg",
    tech: ["react", "tailwind", "javascript"],
  },
  {
    id: "02",
    title: "Travel Experience UI",
    desc: "Luxury travel booking interface designed with motion-first UX principles and smooth interactions.",
    img: "/Project-2.jpg",
    tech: ["figma", "tailwind", "react"],
  },
  {
    id: "03",
    title: "Portfolio System",
    desc: "Minimal, animation-driven portfolio system with modern UI patterns and clean structure.",
    img: "/Project-3.jpg",
    tech: ["bootstrap", "framer", "react"],
  },
];

const getIcon = (tech) => {
  switch (tech) {
    case "react":
      return FaReact;
    case "tailwind":
      return SiTailwindcss;
    case "javascript":
      return FaJsSquare;
    case "bootstrap":
      return FaBootstrap;
    case "figma":
      return SiFigma;
    case "framer":
      return SiFramer;
    default:
      return null;
  }
};

export default function Work() {
  const [index, setIndex] = useState(0);
  const project = projects[index];

  const next = () => setIndex((i) => (i + 1) % projects.length);
  const prev = () =>
    setIndex((i) => (i - 1 + projects.length) % projects.length);

  return (
    <section className="relative min-h-screen flex items-center py-32 px-6 lg:px-24 text-white bg-[#050505] overflow-hidden">
      {/* Glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,94,0,0.12),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-20 items-center">
        {/* LEFT SIDE */}
        <div className="relative h-[420px] flex flex-col justify-between">
          <div>
            <p className="text-xs tracking-[0.3em] text-gray-500 uppercase">
              Selected Work
            </p>

            {/* FIXED HEIGHT TITLE AREA */}
            <div className="mt-6 min-h-[180px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-5xl md:text-6xl font-semibold leading-tight line-clamp-2">
                    {project.title}
                  </h2>

                  <p className="text-gray-400 mt-4 text-lg leading-relaxed line-clamp-3">
                    {project.desc}
                  </p>

                  {/* TECH */}
                  <div className="flex gap-4 mt-6 flex-wrap">
                    {project.tech.map((t, i) => {
                      const Icon = getIcon(t);
                      return (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-sm text-gray-300"
                        >
                          {Icon && (
                            <Icon className="text-[var(--primary-color)] text-lg" />
                          )}
                          {t}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* FIXED BUTTON AREA (NEVER MOVES) */}
          <div className="flex gap-4 mt-auto pt-6">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-white/15 hover:border-[var(--primary-color)] transition flex items-center justify-center"
            >
              ←
            </button>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-white/15 hover:border-[var(--primary-color)] transition flex items-center justify-center"
            >
              →
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center min-h-[420px]">
          {/* glow */}
          <div className="absolute w-[420px] h-[420px] bg-[var(--primary-color)]/10 blur-3xl rounded-full" />

          <AnimatePresence mode="wait">
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.95, rotate: 2 }}
              transition={{ duration: 0.5 }}
              className="relative w-[320px] md:w-[450px] h-[260px] md:h-[320px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            >
              <Image
                src={project.img}
                alt={project.title}
                fill
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
