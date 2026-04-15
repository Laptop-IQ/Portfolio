"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, ReactNode} from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValue,
  useTransform,
  MotionValue,
} from "framer-motion";

export default function Nav() {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 🧲 Motion value (FIXED)
  const mouseX = useMotionValue(-999);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/Services" },
    { name: "Resume", href: "/Resume" },
    { name: "Work", href: "/Work" },
    { name: "Contact", href: "/Contact" },
  ];

  // 📊 Scroll Progress
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
  });

  // 📌 Scroll shrink
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 w-full z-50"
    >
      {/* 📊 Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.75 bg-(--primary-color) origin-left z-60"
        style={{ scaleX: smoothProgress }}
      />

      {/* 🍎 Navbar */}
      <div
        className={`transition-all duration-300 border-b border-white/10
        ${
          scrolled
            ? "bg-black/60 backdrop-blur-xl py-2"
            : "bg-black/30 backdrop-blur-md py-4"
        }`}
      >
        <div className="flex justify-between items-center px-[8%] lg:px-[16%]">
          {/* Logo */}
          <Link
            href="/"
            className={`font-semibold text-white transition-all duration-300
            ${scrolled ? "text-2xl" : "text-3xl"}`}
          >
            Folio
            <span className="text-(--primary-color)">Hub.</span>
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-6">
            {/* 🧲 Dock Container */}
            <div
              className="flex items-center bg-white/5 rounded-lg px-2 py-1"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                mouseX.set(e.clientX - rect.left);
              }}
              onMouseLeave={() => mouseX.set(-999)}
            >
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;

                return (
                  <DockItem key={link.name} mouseX={mouseX} index={i}>
                    <Link
                      href={link.href}
                      className="relative px-4 py-2 text-sm font-medium text-white/80 hover:text-white"
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-lg bg-white/10"
                          transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 30,
                          }}
                        />
                      )}
                      <span className="relative z-10">{link.name}</span>
                    </Link>
                  </DockItem>
                );
              })}
            </div>

            {/* CTA */}
            <Link
              href="/Contact"
              className="px-5 py-2 rounded-lg bg-white/10 text-white text-sm
              hover:bg-white/20 transition-all"
            >
              Hire Us
            </Link>
          </div>

          {/* Mobile Btn */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-2xl text-white"
          >
            <i className="ri-menu-2-line"></i>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden px-[8%] pb-6 backdrop-blur-xl bg-black/60"
            >
              <div className="flex flex-col gap-4 mt-4">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-base
                      ${
                        isActive
                          ? "text-white"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}

                <Link
                  href="/Contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-3 text-center px-5 py-2 rounded-lg bg-white/10 text-white"
                >
                  Hire Us
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

/* 🧲 Dock Item */
type DockItemProps = {
  children: ReactNode;
  mouseX: MotionValue<number>;
  index: number;
};

function DockItem({ children, mouseX, index }: DockItemProps) {
  const distance = 100;

  const scale = useTransform(mouseX, (val) => {
    const itemCenter = index * 80 + 40;
    const dist = Math.abs(val - itemCenter);

    if (dist > distance) return 1;

    return 1 + (1.3 - 1) * (1 - dist / distance);
  });

  return (
    <motion.div
      style={{ scale }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}