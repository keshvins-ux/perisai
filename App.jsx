import React, { useMemo, useState } from "react";
import { CONNECTORS, COMPANIES, computePlatformState } from "./data.js";
import Board from "./Board.jsx";
import Risk from "./Risk.jsx";
import Compliance from "./Compliance.jsx";
import Admin from "./Admin.jsx";
import Connectors from "./Connectors.jsx";

export default function App() {
  const [tab, setTab] = useState("board");
  const [co, setCo] = useState("meridian");
  const D = COMPANIES[co];
  const [enabled, setEnabled] = useState(
    Object.fromEntries(CONNECTORS.map((c) => [c.id, true]))
  );
  const toggle = (id) => setEnabled((e) => ({ ...e, [id]: !e[id] }));
  const ps = useMemo(() => computePlatformState(enabled, D.RISKS), [enabled, co]);

  return (
    <div className="root">
      <header className="topbar">
        <div className="brand">
          <span className="shield">◈</span>
          <span className="wordmark">perisai</span>
          <span className="tag">RISK&nbsp;&amp;&nbsp;COMPLIANCE&nbsp;INTELLIGENCE</span>
        </div>
        <div className="org">
          <select className="co-switch" value={co} onChange={(e) => setCo(e.target.value)}>
            {Object.values(COMPANIES).map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
          <div className="org-meta">{D.ORG.sector} · {D.ORG.employees} staff · {D.ORG.period} · DEMO DATA</div>
        </div>
      </header>

      <nav className="tabs">
        {[["board", "Board View"], ["risk", "Risk Module"], ["comp", "Compliance Module"], ["conn", "Connectors"], ["admin", "Admin & Architecture"]].map(([k, l]) => (
          <button key={k} className={`tab ${tab === k ? "on" : ""}`} onClick={() => setTab(k)}>{l}</button>
        ))}
        <div className="tab-strip">
          <span>Visibility <b style={{ color: ps.coverage >= 80 ? "var(--em)" : "var(--am)" }}>{ps.coverage}%</b></span>
          <span>Verified <b style={{ color: ps.machinePct >= 60 ? "var(--em)" : "var(--am)" }}>{ps.machinePct}%</b></span>
        </div>
      </nav>

      <main className="stage">
        {tab === "board" && <Board key={co} ps={ps} goAdmin={() => setTab("admin")} D={D} />}
        {tab === "risk" && <Risk key={co} ps={ps} D={D} />}
        {tab === "comp" && <Compliance key={co} ps={ps} D={D} />}
        {tab === "conn" && <Connectors />}
        {tab === "admin" && <Admin key={co} ps={ps} enabled={enabled} toggle={toggle} D={D} />}
      </main>

      <footer className="foot">Perisai demo · all companies and data fictional · monitoring & readiness only — not certification or legal advice</footer>
    </div>
  );
}
