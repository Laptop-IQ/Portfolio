"use client";

import { motion } from "framer-motion";

const ServicesData = [
  {
    id: "01",
    title: "React JS Project",
    desc: "Modern scalable frontend systems with performance-first architecture and premium UI engineering.",
    tech: ["React JS", "Tailwind", "JavaScript"],
    img: "/Project-1.jpg",
  },
  {
    id: "02",
    title: "Travel Experience",
    desc: "Immersive travel platforms with cinematic UI and smooth storytelling interactions.",
    tech: ["Figma", "React", "Tailwind"],
    img: "/Project-2.jpg",
  },
  {
    id: "03",
    title: "Portfolio Design",
    desc: "High-end portfolios with motion-first design systems and clean typography hierarchy.",
    tech: ["Framer Motion", "React", "UI Design"],
    img: "/Project-3.jpg",
  },
  {
    id: "04",
    title: "Business Website",
    desc: "Conversion-focused business websites with strong branding and modern UX flow.",
    tech: ["React", "Tailwind", "Motion"],
    img: "/Project-4.jpg",
  },
];

export default function Services() {
  return (
    <section className="relative px-[8%] lg:px-[16%] py-28 bg-[#050505] text-white overflow-hidden">

      {/* HERO STYLE GLOW BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,94,0,0.12),transparent_60%)]" />

      {/* TITLE */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-5xl md:text-7xl font-semibold mb-20"
      >
        Selected <span className="text-[var(--primary-color)]">Work</span>
      </motion.h2>

      <div className="flex flex-col gap-14">

        {ServicesData.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="group relative border-b border-white/10 pb-12"
          >

            {/* MAIN ROW */}
            <div className="flex flex-col md:flex-row justify-between gap-10">

              {/* LEFT CONTENT */}
              <div className="max-w-2xl">

                <div className="flex items-center gap-6">

                  <h3 className="text-6xl text-white/10 font-bold group-hover:text-[var(--primary-color)] transition">
                    {service.id}
                  </h3>

                  <h2 className="text-3xl md:text-5xl font-semibold group-hover:text-[var(--primary-color)] transition leading-tight">
                    {service.title}
                  </h2>

                </div>

                <p className="text-gray-400 mt-5 text-lg leading-relaxed max-w-xl">
                  {service.desc}
                </p>

                {/* TECH TAGS */}
                <div className="flex flex-wrap gap-3 mt-6">
                  {service.tech.map((t, i) => (
                    <span
                      key={i}
                      className="text-sm px-4 py-1 rounded-full border border-white/10 text-gray-400 group-hover:border-[var(--primary-color)] group-hover:text-[var(--primary-color)] transition"
                    >
                      {t}
                    </span>
                  ))}
                </div>

              </div>

              {/* RIGHT ICON */}
              <div className="flex items-center">

                <div className="w-16 h-16 flex items-center justify-center rounded-full border border-white/15 text-white/60 group-hover:text-[var(--primary-color)] group-hover:border-[var(--primary-color)] transition duration-500">
                  <i className="bi bi-arrow-up-right text-2xl"></i>
                </div>

              </div>

            </div>

            {/* FLOATING IMAGE (CLEAN + HERO STYLE) */}
            <div className="pointer-events-none absolute right-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-500">

              {/* glow behind image */}
              <div className="absolute inset-0 bg-[var(--primary-color)]/10 blur-2xl rounded-xl scale-110" />

              <img
                src={service.img}
                alt={service.title}
                className="relative w-72 h-44 object-cover rounded-xl shadow-2xl scale-95 group-hover:scale-100 transition duration-500"
              />

            </div>

          </motion.div>
        ))}

      </div>
    </section>
  );
}