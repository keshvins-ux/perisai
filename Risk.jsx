import React from "react";
import { CONNECTORS, CONTROLS, CONF_META } from "../data.js";
import { Card, Eyebrow, Bar, Tag, scoreColor } from "../ui.jsx";

const LAYERS = [
  { id: "biz", name: "Business Layer", note: "Services & stakeholders",
    boxes: ["Container Terminal Ops", "Finance & Treasury", "Customer Portal & CRM", "Partner Integrations"] },
  { id: "app", name: "Application Layer", note: "The engine — Perisai core",
    boxes: ["Ingestion & Normalisation", "Control–Evidence Core", "Risk Engine", "Compliance Mapping", "Narrative & Reporting"] },
  { id: "data", name: "Data Layer", note: "Connected sources", boxes: null }, // rendered as connectors
  { id: "tech", name: "Technology Layer", note: "Estate under management",
    boxes: ["840 endpoints", "71 privileged accounts", "152 OT devices", "41 backup jobs", "3 cloud tenants"] },
];

export default function Admin({ ps, enabled, toggle }) {
  return (
    <div className="grid">
      <Card span={12} delay={0}>
        <Eyebrow>System architecture — TOGAF layered view</Eyebrow>
        <div className="togaf">
          {LAYERS.map((L) => (
            <div key={L.id} className={`layer layer-${L.id}`}>
              <div className="layer-tab">{L.name}<small>{L.note}</small></div>
              <div className="layer-boxes">
                {L.boxes
                  ? L.boxes.map((b) => <div key={b} className="abox">{b}</div>)
                  : CONNECTORS.map((c) => (
                      <button key={c.id}
                        className={`abox conn ${enabled[c.id] ? "live" : "dead"}`}
                        onClick={() => toggle(c.id)}
                        title="Click to connect / disconnect">
                        <i className="conndot" />
                        {c.name}
                        <small>{enabled[c.id] ? `${Math.round(c.devices[0] / c.devices[1] * 100)}% devices · ${c.logVis}% logs` : "DISCONNECTED"}</small>
                      </button>
                    ))}
              </div>
              {L.id !== "tech" && <div className="layer-flow">▼</div>}
            </div>
          ))}
        </div>
        <div className="footnote">Click any source in the Data Layer to simulate connecting or disconnecting it — then open the Board view to see confidence change.</div>
      </Card>

      <Card span={7} delay={80}>
        <Eyebrow>Connector health & device connectivity</Eyebrow>
        <div className="conn-table">
          <div className="conn-cols"><span>Source</span><span>Method</span><span>Devices seen</span><span>Log visibility</span><span>State</span></div>
          {CONNECTORS.map((c) => {
            const pct = Math.round((c.devices[0] / c.devices[1]) * 100);
            const on = enabled[c.id];
            return (
              <div key={c.id} className={`conn-row ${on ? "" : "off"}`}>
                <span className="cr-name">{c.name}<small>{c.layer} · {c.note}</small></span>
                <span className="cr-method">{c.method}</span>
                <span className="cr-dev">
                  <Bar pct={on ? pct : 0} color={on ? scoreColor(pct) : "var(--line)"} />
                  <b>{on ? `${c.devices[0]}/${c.devices[1]}` : "—"}</b>
                </span>
                <span className="cr-log">
                  <b style={{ color: on ? scoreColor(c.logVis) : "var(--dim)" }}>{on ? `${c.logVis}%` : "—"}</b>
                </span>
                <button className={`switch ${on ? "on" : ""}`} onClick={() => toggle(c.id)}>
                  <i />{on ? "Connected" : "Off"}
                </button>
              </div>
            );
          })}
        </div>
      </Card>

      <Card span={5} delay={160}>
        <Eyebrow>Visibility gaps — why confidence isn't 100%</Eyebrow>
        {ps.logGaps.map((g) => (
          <div key={g.name} className="gap-row">
            <span className="gap-name">{g.name}<small>{g.layer}</small></span>
            <Bar pct={g.vis} color={scoreColor(g.vis)} />
            <b style={{ color: scoreColor(g.vis) }}>{g.vis}%</b>
          </div>
        ))}
        {ps.blind.map((c) => (
          <div key={c.id} className="gap-row dead">
            <span className="gap-name">⚠ {c.name}<small>disconnected — {c.upgrades.length} controls downgraded to attested</small></span>
            <Bar pct={0} color="var(--line)" /><b style={{ color: "var(--co)" }}>0%</b>
          </div>
        ))}
        <div className="gap-sum">
          <div>Estate visibility <b style={{ color: scoreColor(ps.coverage) }}>{ps.coverage}%</b></div>
          <div>Machine-verified evidence <b style={{ color: scoreColor(ps.machinePct) }}>{ps.machinePct}%</b></div>
        </div>
        <div className="footnote">These two numbers are the Board view's confidence strip — same computation, no massage.</div>
      </Card>

      <Card span={12} delay={240}>
        <Eyebrow>Control–evidence register (the shared core)</Eyebrow>
        <div className="ctl-grid">
          {CONTROLS.map((c) => (
            <div key={c.id} className="ctl-card" style={{ borderColor: CONF_META[ps.confidence[c.id]].color }}>
              <div className="ctl-name">{c.name}</div>
              <Tag color={CONF_META[ps.confidence[c.id]].color}>{CONF_META[ps.confidence[c.id]].label}</Tag>
              <div className="ctl-maps">
                {Object.entries(c.maps).map(([k, v]) => <small key={k}>{k.toUpperCase()} · {v}</small>)}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
