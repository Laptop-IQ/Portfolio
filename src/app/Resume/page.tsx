"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaJs, FaReact, FaNodeJs, FaBootstrap } from "react-icons/fa";
import { SiHtml5, SiCss3, SiNextdotjs, SiTailwindcss } from "react-icons/si";

const ease = [0.25, 1, 0.5, 1];

export default function Resume() {
  const [activeTab, setActiveTab] = useState("Experience");

  // Cursor spotlight
  useEffect(() => {
    const move = (e) => {
      document.documentElement.style.setProperty("--x", e.clientX + "px");
      document.documentElement.style.setProperty("--y", e.clientY + "px");
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const tabs = ["Experience", "Education", "Skills", "About"];

  const experience = [
    {
      date: "2025 - Present",
      role: "Full Stack Developer",
      company: "Tech Solutions Inc.",
    },
    { date: "2021", role: "Frontend Intern", company: "Web Studio" },
    { date: "2020", role: "Freelance Developer", company: "Startup Projects" },
  ];

  const education = [
    {
      year: "2021 - 2023",
      degree: "M.Sc Computer Science",
      institute: "XYZ University",
    },
    {
      year: "2018 - 2021",
      degree: "B.Sc Computer Science",
      institute: "ABC College",
    },
  ];

  const skills = [
    { name: "HTML", icon: <SiHtml5 /> },
    { name: "CSS", icon: <SiCss3 /> },
    { name: "JavaScript", icon: <FaJs /> },
    { name: "React", icon: <FaReact /> },
    { name: "Next.js", icon: <SiNextdotjs /> },
    { name: "Tailwind", icon: <SiTailwindcss /> },
    { name: "Node.js", icon: <FaNodeJs /> },
    { name: "Bootstrap", icon: <FaBootstrap /> },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease }}
      className="relative px-6 lg:px-24 py-32 text-white bg-black overflow-x-hidden"
    >
      {/* Cursor spotlight */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(600px at var(--x) var(--y), rgba(255,94,0,0.15), transparent 40%)",
        }}
      />

      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,94,0,0.1),transparent_60%)]" />

      <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-3 gap-20 items-start">
        {/* LEFT */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease }}
        >
          <h2 className="text-5xl font-semibold">
            Why hire <span className="text-[var(--primary-color)]">me?</span>
          </h2>

          <p className="text-gray-400 mt-6 text-sm">
            I build scalable, high-performance web apps with modern UI.
          </p>

          {/* Tabs */}
          <div className="mt-12 flex flex-col gap-4">
            {tabs.map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                whileHover={{ x: 6 }}
                whileTap={{ scale: 0.97 }}
                className={`relative px-6 py-4 rounded-xl text-left transition ${
                  activeTab === tab
                    ? "bg-white/10 border border-white/20"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {activeTab === tab && (
                  <span className="absolute left-0 top-0 h-full w-1 bg-[var(--primary-color)] rounded-r" />
                )}
                {tab}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — FIXED STABLE BOX (NO JUMP EVER) */}
        <div className="lg:col-span-2 relative h-[450px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="absolute inset-0"
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
              transition={{ duration: 0.6, ease }}
            >
              <h3 className="text-4xl mb-10">{activeTab}</h3>

              {/* EXPERIENCE */}
              {activeTab === "Experience" && (
                <div className="border-l border-white/10 pl-8 space-y-10">
                  {experience.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <p className="text-[var(--primary-color)] text-sm">
                        {item.date}
                      </p>
                      <h4 className="text-xl mt-1">{item.role}</h4>
                      <p className="text-gray-400">{item.company}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* EDUCATION */}
              {activeTab === "Education" && (
                <div className="grid md:grid-cols-2 gap-6">
                  {education.map((item, i) => (
                    <div
                      key={i}
                      className="p-6 rounded-xl bg-white/5 border border-white/10"
                    >
                      <p className="text-[var(--primary-color)] text-sm">
                        {item.year}
                      </p>
                      <h4 className="text-xl mt-2">{item.degree}</h4>
                      <p className="text-gray-400">{item.institute}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* SKILLS */}
              {activeTab === "Skills" && (
                <div className="flex flex-wrap gap-4">
                  {skills.map((skill, i) => (
                    <div
                      key={i}
                      className="px-5 py-2 rounded-full bg-white/5 border border-white/10 flex items-center gap-2"
                    >
                      {skill.icon}
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* ABOUT */}
              {activeTab === "About" && (
                <div className="text-gray-400 space-y-4">
                  <p>
                    I’m a developer focused on modern, high-performance UI
                    systems.
                  </p>
                  <p>
                    Specializing in React, Next.js, animations and scalable
                    frontend architecture.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}
