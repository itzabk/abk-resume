import React from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const go = (id) =>
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  const items = [
    ["hero", "Home"],
    ["medium", "Medium"],
    ["experience", "Experience"],
    ["skills", "Skills"],
    ["education", "Education"],
    ["contact", "Contact"],
  ];
  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={
        "glass p-3 sticky top-3 z-40 transition-all " +
        (scrolled ? "scale-[.98] opacity-95" : "")
      }
    >
      <div className="flex justify-between items-center gap-3">
        <div className="font-extrabold tracking-wide">ABK</div>
        <div className="flex gap-2">
          {items.map(([id, label]) => (
            <button
              key={id}
              onClick={() => go(id)}
              className="px-3 py-2 rounded-md relative transition hover:bg-white/5 group"
            >
              {label}
              <span className="absolute left-2 right-2 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-center"></span>
            </button>
          ))}
          <a
            href="/resume"
            className="px-3 py-2 rounded-md relative transition hover:bg-white/5 group"
          >
            Resume
            <span className="absolute left-2 right-2 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-center"></span>
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
