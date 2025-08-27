import React, { useContext } from "react";
import Navbar from "./components/Navbar.jsx";
import ParticleBackground from "./components/ParticleBackground.jsx";
import CrimsonGlow from "./components/CrimsonGlow.jsx";
import BlogsCarousel from "./components/BlogsCarousel.jsx";
import Skills from "./components/Skills.jsx";
import FloatingToggle from "./components/FloatingToggle.jsx";
import { ThemeContext } from "./contexts/ThemeContext.jsx";

function useClock() {
  const [now, setNow] = React.useState(new Date());
  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    now.toLocaleString("en-IN", {
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
    }) + " IST"
  );
}
function Clock() {
  return <span className="text-xs text-white/80">{useClock()}</span>;
}

import { getLink, getEmail } from "./utils/envLinks.js";
function LangCycler() {
  const langs = [
    { code: "EN", name: "English" },
    { code: "KN", name: "Kannada" },
    { code: "HI", name: "Hindi" },
  ];
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % langs.length), 1600);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex gap-2">
      {langs.map((l, idx) => (
        <div
          key={l.code}
          className={
            "w-9 h-9 rounded-lg bg-white/5 inline-flex items-center justify-center transition-all " +
            (idx === i ? "w-24 px-2" : "")
          }
        >
          <span className={"text-xs " + (idx === i ? "hidden md:inline" : "")}>
            {idx === i ? l.name : l.code}
          </span>
          <span className={"text-xs md:hidden"}>{l.code}</span>
        </div>
      ))}
    </div>
  );
}
import { HeroRobot } from "./components/Robots.jsx";
import SoundManager from "./components/SoundManager.jsx";
import ResumePage from "./components/ResumePage.jsx";
import ExperienceCredits from "./components/ExperienceCredits.jsx";
import CrimsonPetals from "./components/CrimsonPetals.jsx";
import SafeGuard from "./components/SafeGuard.jsx";

import { motion } from "framer-motion";

function TypingLooper({
  lines,
  typeSpeed = 100,
  eraseSpeed = 50,
  pause = 900,
}) {
  const [display, setDisplay] = React.useState("");
  const [line, setLine] = React.useState(0);
  const [phase, setPhase] = React.useState("typing"); // 'typing' | 'pausing' | 'erasing'

  React.useEffect(() => {
    let id;
    const text = lines[line];
    if (phase === "typing") {
      if (display.length < text.length) {
        id = setTimeout(
          () => setDisplay(text.slice(0, display.length + 1)),
          typeSpeed
        );
      } else {
        setPhase("pausing");
      }
    } else if (phase === "pausing") {
      id = setTimeout(() => setPhase("erasing"), pause);
    } else if (phase === "erasing") {
      if (display.length > 0) {
        id = setTimeout(
          () => setDisplay(text.slice(0, display.length - 1)),
          eraseSpeed
        );
      } else {
        setLine((line + 1) % lines.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(id);
  }, [display, line, phase, lines, typeSpeed, eraseSpeed, pause]);

  return (
    <span className="font-mono">
      {display}
      <span className="opacity-80">│</span>
    </span>
  );
}

import ErrorBoundary from "./components/ErrorBoundary.jsx";

function useEffectsEnabled() {
  const [enabled, setEnabled] = React.useState(true);
  React.useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get("safe") === "1") setEnabled(false);
  }, []);
  return { enabled, setEnabled };
}

import Toast from "./components/Toast.jsx";

/* Medium items using user's banners */
const MEDIUM = [
  {
    title: "Concurrency & Parallelism in Node.js",
    url: "https://medium.com/javascript-in-plain-english/concurrency-parallelism-in-node-js-beyond-buzzwords-ecf18282a27e",
    snippet: "Clear mental model + practical patterns to avoid bottlenecks.",
    banner: "/banners/concurrency.png",
  },
  {
    title: "Reactor Pattern in Node.js",
    url: "https://medium.com/javascript-in-plain-english/the-reactor-pattern-in-node-js-behind-the-magic-of-asynchronous-i-o-bf88d4368ac3",
    snippet: "The event loop behind fast asynchronous I/O.",
    banner: "/banners/reactor.png",
  },
  {
    title: "Redis Semantic Caching for AI",
    url: "https://medium.com/javascript-in-plain-english/redis-semantic-caching-for-ai-from-expensive-tokens-to-instant-answers-731146f05b8c",
    snippet: "Speed up LLM apps with semantic cache hits.",
    banner: "/banners/sem-cache.png",
  },
  {
    title: "Concurrency and Parallelism Article",
    url: "#",
    snippet: "Concurrency vs Parallelism explained with examples.",
    banner: "/banners/chef.png",
  },
];

export default function App() {
  const [toast, setToast] = React.useState(false);
  const effects = useEffectsEnabled();
  function showToast(msg) {
    setToast(true);
    setTimeout(() => setToast(false), 1800);
  }
  const { mode } = useContext(ThemeContext);

  if (typeof window !== "undefined" && window.location.pathname === "/resume") {
    return <ResumePage />;
  }

  const bgClass =
    mode === "aurora"
      ? "bg-aurora"
      : mode === "cyberpunk"
      ? "bg-cyberpunk"
      : "bg-minimal";

  return (
    <ErrorBoundary>
      <div
        className={bgClass}
        style={{ minHeight: "100vh", position: "relative", zIndex: 1 }}
        id="top"
      >
        {effects.enabled && mode === "aurora" && (
          <SafeGuard fallback={<div />}>
            <ParticleBackground />
          </SafeGuard>
        )}
        {effects.enabled && mode === "cyberpunk" && (
          <SafeGuard fallback={<div />}>
            <CrimsonPetals />
          </SafeGuard>
        )}
        {effects.enabled && mode === "minimal" && (
          <SafeGuard fallback={<div />}>
            <ParticleBackground />
          </SafeGuard>
        )}
        <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
          <Navbar />
          {/* HERO */}
          <section
            id="hero"
            className="mt-6 glass p-6 grid md:grid-cols-2 items-center gap-6 md:min-h-[260px]"
          >
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-extrabold"
              >
                <TypingLooper
                  lines={[
                    "Hi, I’m Abhishek Bhat — Backend Developer",
                    "I enjoy designing and building pragmatic, reliable backend systems",
                    "Always curious, always shipping.",
                  ]}
                  typeSpeed={110}
                  eraseSpeed={55}
                  pause={1000}
                />
              </motion.h1>
            </div>
            <div className="order-last md:order-2 flex justify-center md:justify-end">
              {mode !== "minimal" && (
                <SafeGuard
                  fallback={
                    <div className="text-white/70 text-xs">3D disabled</div>
                  }
                >
                  <HeroRobot mode={mode} />
                </SafeGuard>
              )}
            </div>
          </section>

          {/* MEDIUM */}
          <section id="medium" className="mt-6">
            <div className="text-sm font-semibold mb-3">Latest on Medium</div>
            <BlogsCarousel items={MEDIUM} />
          </section>

          {/* GRID */}
          <div className="mt-6 grid md:grid-cols-[260px,1fr] gap-5 items-start">
            {/* Sidebar */}
            <aside className="md:sticky md:top-24">
              <div className="glass p-4 mb-4">
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.google.com/maps/place/Bengaluru,+Karnataka"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/5 inline-flex items-center justify-center">
                      <img src="/india.svg" alt="India" className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-medium underline-offset-4 hover:underline">
                        Bengaluru, India
                      </div>
                      <div className="text-xs text-white/70">Timezone: IST</div>
                      <div className="mt-1">
                        <Clock />
                      </div>
                    </div>
                  </a>
                </div>
                <div className="mt-3 flex gap-2">
                  <LangCycler />
                </div>
              </div>

              <div className="glass p-4 mb-4">
                <div className="text-sm font-semibold">Hiring Signals</div>
                <div className="mt-3 flex flex-col gap-2">
                  {[
                    "Open to Work",
                    "Remote Friendly",
                    "Available immediately",
                  ].map((h) => (
                    <div key={h} className="p-2 rounded-md bg-white/5">
                      {h}
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass p-4">
                <div className="text-sm font-semibold">Download</div>
                <div className="mt-3">
                  <button
                    onClick={() => window.print()}
                    className="w-full px-3 py-2 rounded-md bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900"
                  >
                    Download PDF
                  </button>
                </div>
              </div>
            </aside>

            {/* Main */}
            <main>
              <section id="experience" className="glass p-4 mb-6">
                <div className="text-lg font-semibold mb-3">Experience</div>
                <div className="space-y-4">
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.5 }}
                    className="glass p-4 ring-1 ring-emerald-400/20"
                    aria-current="true"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="text-lg font-semibold">
                            Associate Software Engineer (Backend)
                          </div>
                          <span
                            className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold"
                            aria-label="current role"
                          >
                            Active
                          </span>
                        </div>
                        <div className="text-sm text-white/70">
                          Syook • Oct 2023 – Present
                        </div>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {[
                          "Node.js",
                          "MongoDB",
                          "Postgres",
                          "Express",
                          "Redis",
                          "LLM",
                          "AI",
                        ].map((t) => (
                          <span
                            key={t}
                            className="text-xs px-2 py-1 rounded-md bg-white/5"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ul className="mt-3 text-sm text-white/80 list-disc list-inside space-y-1">
                      <div className="mt-1">
                        <ExperienceCredits
                          items={[
                            "Contributed to multi tenant user management and LLM workflows for an AI powered application.",
                            "Led the Backend development of a Contractor Lifecycle & Safety Management System (SWMS) covering the entire flow of contracts, contractors, workers, and organizational users. Designed and shipped  RBAC, contractor onboarding, approvals, attendance & wage registers, compliance checklists, and safety workflows. Delivered analytics dashboards for workforce utilization, cost insights, and compliance tracking, ensuring smooth operations across the contractor ecosystem.",
                            "Shipped emergency mustering for onsite safety: real-time worker/asset location, roll-calls and incident summaries.",
                            "Integrated GPS & LoRa decoders; authored simulation scripts to validate high-volume IoT payloads.",
                            "Implemented notifications and filter standardization across services.",
                            "Instrumented login/session telemetry and user activity analytics for product insights.",
                            "Implemented remote firmware updates for IoT devices over-the-air.",
                            "Worked on unit and integration tests to ensure code quality and reliability.",
                            "Contributed to documentation and knowledge sharing within the team.",
                            "Connect with cross-functional teams to deliver end-to-end solutions.",
                            "Connected with clients to gather requirements and deliver solutions.",
                          ]}
                        />
                      </div>
                    </ul>
                  </motion.article>
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.5 }}
                    className="glass p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-lg font-semibold">
                          Node.js & MongoDB Intern
                        </div>
                        <div className="text-sm text-white/70">
                          DCT Academy • Feb 2023 – Oct 2023
                        </div>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {["Node.js", "MongoDB", "Express"].map((t) => (
                          <span
                            key={t}
                            className="text-xs px-2 py-1 rounded-md bg-white/5"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ul className="mt-3 text-sm text-white/80 list-disc list-inside space-y-1">
                      <li>
                        Built backend APIs with Node.js/Express and MongoDB;
                        Implemented RBAC and tests.
                      </li>
                      <li>
                        Contributed to projects delivering authentication &
                        persistence features.
                      </li>
                    </ul>
                  </motion.article>
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.5 }}
                    className="glass p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-lg font-semibold">
                          FTTX Network Consultant
                        </div>
                        <div className="text-sm text-white/70">
                          VCTI • Aug 2021 – Jan 2023
                        </div>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {["FTTX", "QGIS", "Python", "ArcGIS"].map((t) => (
                          <span
                            key={t}
                            className="text-xs px-2 py-1 rounded-md bg-white/5"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ul className="mt-3 text-sm text-white/80 list-disc list-inside space-y-1">
                      <li>
                        Designed FTTH/FTTX architectures and ROM calculations
                        for US clients.
                      </li>
                      <li>
                        Built GIS-based plans with QGIS/ArcGIS automated by
                        Python.
                      </li>
                    </ul>
                  </motion.article>
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.5 }}
                    className="glass p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-lg font-semibold">
                          Ethical Hacking Intern
                        </div>
                        <div className="text-sm text-white/70">
                          Reinfosec • Aug 2020 – Sep 2020
                        </div>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {["Ethical Hacking", "Metasploit"].map((t) => (
                          <span
                            key={t}
                            className="text-xs px-2 py-1 rounded-md bg-white/5"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ul className="mt-3 text-sm text-white/80 list-disc list-inside space-y-1">
                      <li>
                        Hands-on security research with honeypots, PDF forensics
                        and attack simulation.
                      </li>
                      <li>
                        Used Metasploit & FATRAT to build detection scripts and
                        remediation notes.
                      </li>
                    </ul>
                  </motion.article>
                </div>
              </section>

              <section id="skills" className="mb-6">
                <div className="text-lg font-semibold mb-3">
                  Skills & Tech Stack
                </div>
                <Skills />
              </section>

              <section id="education" className="glass p-4 mb-6">
                <div className="text-lg font-semibold mb-3">Education</div>
                <div className="font-medium">
                  B.E. / B.Tech — Information Science Engineering
                </div>
                <div className="text-sm text-white/70">
                  Atria Institute of Technology • 2017–2021 • CGPA: 8.3 (84%) —
                  Passed with distinction
                </div>
              </section>

              <section id="contact" className="glass p-4">
                <div className="text-lg font-semibold mb-3">
                  Contact & Links
                </div>
                <div className="flex gap-3">
                  <a
                    className="px-3 py-2 rounded-md glass"
                    href={getLink("VITE_LINKEDIN")}
                    target="_blank"
                  >
                    LinkedIn
                  </a>
                  <a
                    className="px-3 py-2 rounded-md glass"
                    href={getLink("VITE_GITHUB")}
                    target="_blank"
                  >
                    GitHub
                  </a>
                  <a
                    className="px-3 py-2 rounded-md glass"
                    href={getLink("VITE_MEDIUM")}
                    target="_blank"
                  >
                    Medium
                  </a>
                  {/* <a
                    className="px-3 py-2 rounded-md glass"
                    href={`mailto:${getEmail()}`}
                  >
                    Email
                  </a>
                  <button
                    className="px-3 py-2 rounded-md glass"
                    onClick={() => {
                      (async () => {
                        try {
                          const email = getEmail();
                          if (navigator.clipboard && window.isSecureContext) {
                            await navigator.clipboard.writeText(email);
                          } else {
                            const ta = document.createElement("textarea");
                            ta.value = email;
                            document.body.appendChild(ta);
                            ta.select();
                            document.execCommand("copy");
                            document.body.removeChild(ta);
                          }
                          showToast("Email copied!");
                          if (window.sndChime) window.sndChime.play();
                        } catch (e) {
                          console.error("Copy failed", e);
                          showToast("Could not copy email");
                        }
                      })();
                    }}
                  >
                    Copy email
                  </button> */}
                </div>
              </section>
            </main>
          </div>
        </div>

        <SoundManager />
        <div
          className="no-print"
          style={{ position: "fixed", right: 120, bottom: 22, zIndex: 60 }}
        >
          <button
            className="glass px-3 py-2 rounded-md"
            onClick={() => effects.setEnabled((v) => !v)}
          >
            {effects.enabled ? "Disable effects" : "Enable effects"}
          </button>
        </div>
        <Toast show={toast} />
        <FloatingToggle />
      </div>
    </ErrorBoundary>
  );
}
