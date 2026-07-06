import React, { useMemo, useState } from "react";
import { ORG, CONNECTORS, computePlatformState } from "./data.js";
import Board from "./views/Board.jsx";
import Risk from "./views/Risk.jsx";
import Compliance from "./views/Compliance.jsx";
import Admin from "./views/Admin.jsx";

export default function App() {
  const [tab, setTab] = useState("board");
  const [enabled, setEnabled] = useState(
    Object.fromEntries(CONNECTORS.map((c) => [c.id, true]))
  );
  const toggle = (id) => setEnabled((e) => ({ ...e, [id]: !e[id] }));
  const ps = useMemo(() => computePlatformState(enabled), [enabled]);

  return (
    <div className="root">
      <header className="topbar">
        <div className="brand">
          <span className="shield">◈</span>
          <span className="wordmark">perisai</span>
          <span className="tag">RISK&nbsp;&amp;&nbsp;COMPLIANCE&nbsp;INTELLIGENCE</span>
        </div>
        <div className="org">
          <div className="org-name">{ORG.name}</div>
          <div className="org-meta">{ORG.sector} · {ORG.employees} staff · {ORG.period} · DEMO DATA</div>
        </div>
      </header>

      <nav className="tabs">
        {[["board", "Board View"], ["risk", "Risk Module"], ["comp", "Compliance Module"], ["admin", "Admin & Architecture"]].map(([k, l]) => (
          <button key={k} className={`tab ${tab === k ? "on" : ""}`} onClick={() => setTab(k)}>{l}</button>
        ))}
        <div className="tab-strip">
          <span>Visibility <b style={{ color: ps.coverage >= 80 ? "var(--em)" : "var(--am)" }}>{ps.coverage}%</b></span>
          <span>Verified <b style={{ color: ps.machinePct >= 60 ? "var(--em)" : "var(--am)" }}>{ps.machinePct}%</b></span>
        </div>
      </nav>

      <main className="stage">
        {tab === "board" && <Board ps={ps} goAdmin={() => setTab("admin")} />}
        {tab === "risk" && <Risk ps={ps} />}
        {tab === "comp" && <Compliance ps={ps} />}
        {tab === "admin" && <Admin ps={ps} enabled={enabled} toggle={toggle} />}
      </main>

      <footer className="foot">Perisai demo · fictional data (Meridian Logistics Sdn Bhd) · monitoring & readiness only — not certification or legal advice</footer>
    </div>
  );
}
