import React, { useState } from "react";
import { CATALOG } from "./data.js";
import { Eyebrow, Tag } from "./ui.jsx";

const METHOD_META = {
  API:     { label: "REST API (polled)", color: "var(--em)" },
  Webhook: { label: "Webhook / event stream", color: "var(--accent)" },
  Agent:   { label: "Agent / collector", color: "#8ea6f0" },
  Syslog:  { label: "Syslog / sensor feed", color: "#c08ef0" },
  Upload:  { label: "Structured upload", color: "var(--am)" },
  Attest:  { label: "Manual attestation", color: "var(--dim)" },
};
const STATUS_META = {
  live:      { label: "● Live", color: "var(--em)" },
  available: { label: "Available on request", color: "var(--am)" },
  roadmap:   { label: "Roadmap", color: "var(--dim)" },
};

export default function Connectors() {
  const [filter, setFilter] = useState("all");
  const counts = { live: 0, available: 0, roadmap: 0 };
  CATALOG.forEach((c) => c.items.forEach((i) => counts[i.status]++));

  return (
    <div className="grid">
      <section className="card span12 rise">
        <Eyebrow right={
          <div className="minitabs">
            {[["all", "All"], ["live", "Live"], ["available", "Available"], ["roadmap", "Roadmap"]].map(([k, l]) => (
              <button key={k} className={filter === k ? "on" : ""} onClick={() => setFilter(k)}>{l}</button>
            ))}
          </div>
        }>
          Connector catalogue — {counts.live} live · {counts.available} available on request · {counts.roadmap} roadmap
        </Eyebrow>

        <div className="cat-legend">
          {Object.entries(METHOD_META).map(([k, m]) => (
            <span key={k} className="chip" style={{ color: m.color }}><i style={{ background: m.color }} />{m.label}</span>
          ))}
        </div>

        <div className="cat-note">
          Every connector is justified by the <b>evidence upgrades</b> it delivers — the number of controls it lifts
          from self-attested to machine-verified across both the risk and compliance modules. All access is read-only.
        </div>

        {CATALOG.map((c) => {
          const items = c.items.filter((i) => filter === "all" || i.status === filter);
          if (!items.length) return null;
          return (
            <div key={c.cat} className="cat-group">
              <div className="cat-h">{c.cat}</div>
              <div className="cat-cols"><span>Connector</span><span>Method</span><span>Auth model</span><span>Sync</span><span>Evidence upgrades</span><span>Status</span></div>
              {items.map((i) => (
                <div key={i.name} className={`cat-row ${i.status}`}>
                  <span className="cat-name">{i.name}</span>
                  <span><Tag color={METHOD_META[i.method].color}>{i.method}</Tag></span>
                  <span className="cat-auth">{i.auth}</span>
                  <span className="cat-freq">{i.freq}</span>
                  <span className="cat-up">{i.upgrades > 0 ? <><b>{i.upgrades}</b> control{i.upgrades > 1 ? "s" : ""} → machine-verified</> : <small>context signal</small>}</span>
                  <span style={{ color: STATUS_META[i.status].color, fontSize: 11, fontFamily: "var(--mono)" }}>{STATUS_META[i.status].label}</span>
                </div>
              ))}
            </div>
          );
        })}
        <div className="footnote">Don't see your tool? Any system with an export can start via structured upload today and graduate to a live connector — the confidence model tracks the difference honestly.</div>
      </section>
    </div>
  );
}
