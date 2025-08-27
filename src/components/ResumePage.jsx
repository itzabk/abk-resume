export default function ResumePage() {
  const L = (k) => import.meta.env[k] || "";
  const linked = L("VITE_LINKEDIN");
  const git = L("VITE_GITHUB");
  const med = L("VITE_MEDIUM");
  const email = import.meta.env.VITE_EMAIL || "";

  return (
    <div
      style={{ background: "#0b1020", minHeight: "100vh", color: "#e7eef7" }}
    >
      <style>{`
        @page { size: A4; margin: 16mm; }
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          a { color: inherit; text-decoration: none; }
        }
        .h1 { font-size: 28px; font-weight: 900; }
        .muted { opacity: .85; }
        .section { margin-top: 14px; }
        .title { font-weight: 800; letter-spacing: .3px; margin-bottom: 6px; }
        .grid { }
        .chip { display:inline-block; padding:3px 8px; border-radius:8px; background:rgba(255,255,255,.08); margin-right:6px; margin-top:4px; }
      `}</style>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 22px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 16,
          }}
        >
          <div>
            <div className="h1">Abhishek Bhat — Backend Developer</div>
            <div className="muted">
              Realtime systems · Backend · Security · Database
            </div>
          </div>
          <div style={{ textAlign: "right", fontSize: 13 }}>
            <div>
              <a href={linked} target="_blank">
                LinkedIn
              </a>{" "}
              ·{" "}
              <a href={git} target="_blank">
                GitHub
              </a>{" "}
              ·{" "}
              <a href={med} target="_blank">
                Medium
              </a>
            </div>
            <div>
              <a href={`mailto:${email}`}>{email}</a>
            </div>
          </div>
        </div>

        <div className="section">
          <div className="title">EXPERIENCE</div>
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontWeight: 700 }}>
              Associate Software Engineer (Backend) — Syook{" "}
              <span style={{ opacity: 0.7, fontWeight: 400 }}>
                Oct 2023 – Present
              </span>
            </div>
            <ul style={{ marginTop: 6 }}>
              <li>
                Led backend for Contractor Management SWMS ( RBAC, attendance,
                wage registers, dashboards, analytics).
              </li>
              <li>
                Contributed to multi tenant user management and LLM workflows
                for an AI powered application.
              </li>
              <li>
                Implemented remote firmware updates for IoT devices
                over-the-air.
              </li>
              <li>
                Built real-time emergency mustering (worker/asset location &
                incident roll-calls).
              </li>
              <li>
                Integrated GPS & LoRa decoders; wrote simulation scripts for
                high-volume IoT payloads.
              </li>
              <li>
                Implemented LLM usage metrics, notification pipelines, and
                filter standardization.
              </li>
              <li>
                Connected with clients to gather requirements and deliver
                solutions.
              </li>
              <li>
                Connect with cross-functional teams to deliver end-to-end
                solutions.
              </li>
              <li>
                Instrumented login/session telemetry & user activity analytics.
              </li>
            </ul>
          </div>
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontWeight: 700 }}>
              Node.js & MongoDB Intern — DCT Academy{" "}
              <span style={{ opacity: 0.7, fontWeight: 400 }}>
                Feb 2023 – Oct 2023
              </span>
            </div>
            <ul style={{ marginTop: 6 }}>
              <li>
                Built Node.js/Express APIs with MongoDB; added authentication
                and persistence.
              </li>
              <li>
                Implemented RBAC and tests; contributed to backend feature
                delivery.
              </li>
            </ul>
          </div>
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontWeight: 700 }}>
              FTTX Network Consultant — VCTI{" "}
              <span style={{ opacity: 0.7, fontWeight: 400 }}>
                Aug 2021 – Jan 2023
              </span>
            </div>
            <ul style={{ marginTop: 6 }}>
              <li>
                Designed FTTH/FTTX architectures & ROM estimates for US clients.
              </li>
              <li>Authored GIS plans using QGIS/ArcGIS & Python automation.</li>
            </ul>
          </div>
          <div>
            <div style={{ fontWeight: 700 }}>
              Ethical Hacking Intern — Reinfosec{" "}
              <span style={{ opacity: 0.7, fontWeight: 400 }}>
                Aug 2020 – Sep 2020
              </span>
            </div>
            <ul style={{ marginTop: 6 }}>
              <li>
                Security research: honeypots, PDF forensics, Metasploit/FATRAT.
              </li>
            </ul>
          </div>
        </div>
        <br />
        <div className="section">
          <div>
            <div className="title">SKILLS</div>
            <div>
              <b>Backend:</b> Node.js, Express, TypeScript, JavaScript, Python
            </div>
            <div>
              <b>Databases:</b> MongoDB, Postgres, Redis
            </div>
            <div>
              <b>Infra:</b> Docker, Git, CI/CD
            </div>
            <div>
              <b>Other:</b> LLM integrations, Observability basics
            </div>
          </div>
          <br />
          <div>
            <div className="title">EDUCATION</div>
            <div>
              B.E. / B.Tech — Information Science Engineering, Atria Institute
              of Technology (2017–2021)
            </div>
            <div>CGPA: 8.3 (84%), Distinction</div>
            <br />
            <div className="title" style={{ marginTop: 10 }}>
              LANGUAGES & LOCATION
            </div>
            <div>
              English (very proficient) · Kannada (proficient) · Hindi
              (proficient)
            </div>
            <div>Bengaluru, India</div>
          </div>
        </div>
      </div>
    </div>
  );
}
