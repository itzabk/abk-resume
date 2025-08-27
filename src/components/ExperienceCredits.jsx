import React from "react";

/**
 * ExperienceCredits
 * Displays experience bullets as a subtle rolling credits block with nicer styling.
 */
export default function ExperienceCredits({ items = [] }) {
  const lines = items.filter(Boolean);
  // duration scales with number of lines so longer lists scroll slower
  const duration = Math.max(12, lines.length * 2 + 6) + "s";

  return (
    <div className="glass p-3 overflow-hidden h-64 md:h-72 relative">
      {/* fade overlays */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/60 to-transparent" />

      <div className="credits-mask h-full overflow-hidden">
        <div
          className="credits-roll"
          role="list"
          aria-label="experience credits"
          style={{ ["--duration"]: duration }}
        >
          {lines.map((t, i) => (
            <div key={i} className="credits-line" role="listitem">
              {t}
            </div>
          ))}
          {/* duplicate for seamless looping */}
          {lines.map((t, i) => (
            <div key={"dup" + i} className="credits-line" aria-hidden>
              {t}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .credits-roll{
          display:flex;
          flex-direction:column;
          gap:0.6rem;
          padding-bottom:1rem;
          /* move up by 50% because content is duplicated */
          animation: scroll var(--duration) linear infinite;
        }
        @keyframes scroll{
          0% { transform: translateY(0%); }
          100% { transform: translateY(-50%); }
        }
        .credits-roll:hover{ animation-play-state:paused; }
        .credits-line{
          color: rgba(255,255,255,0.92);
          font-size: 0.94rem;
          line-height: 1.25;
          padding: 0.45rem 0.6rem;
          border-left: 3px solid rgba(16,185,129,0.12);
          background: linear-gradient(90deg, rgba(255,255,255,0.01), transparent);
          border-radius: 0.35rem;
        }
        /* reduce motion for users who prefer reduced-motion */
        @media (prefers-reduced-motion: reduce){
          .credits-roll{ animation:none; }
        }
      `}</style>
    </div>
  );
}
