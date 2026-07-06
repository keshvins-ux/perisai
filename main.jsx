import React, { useState } from "react";
import { SCENARIOS } from "../data.js";
import { Card, Eyebrow, Delta, Tag, Bar, riskColor } from "../ui.jsx";

export default function Risk({ ps }) {
  const [filter, setFilter] = useState("all");
  const rows = ps.riskState.filter((r) =>
    filter === "all" ? true : filter === "crown" ? r.crown : !r.crown
  );

  return (
    <div className="grid">
      <Card span={12} delay={0}>
        <Eyebrow right={
          <div className="minitabs">
            {[["all", "All"], ["crown", "◆ Crown jewels"], ["rest", "◇ Rest"]].map(([k, l]) => (
              <button key={k} className={filter === k ? "on" : ""} onClick={() => setFilter(k)}>{l}</button>
            ))}
          </div>
        }>Risk register — {rows.length} risks</Eyebrow>

        <div className="reg-cols"><span>Risk</span><span>Service / owner</span><span>Movement</span><span>Score</span><span>Confidence</span></div>
        {rows.map((r, i) => (
          <div key={r.id} className="reg-row rise" style={{ animationDelay: `${i * 40}ms` }}>
            <div>
              <div className="rr-h">{r.crown ? "◆ " : ""}{r.name}</div>
              <div className="rr-risk">{r.narrative}</div>
            </div>
            <div className="rr-svc">{r.service}<small>{r.owner}</small></div>
            <div><Delta now={r.score} prev={r.prev} goodDown /></div>
            <div className="rr-score" style={{ color: riskColor(r.score) }}>{r.score}</div>
            <div>
              {r.degraded
                ? <Tag color="var(--co)">◌ degraded — {r.missing.join(", ")} offline</Tag>
                : r.connectors.length
                  ? <Tag color="var(--em)">live-fed · {r.connectors.length} sources</Tag>
                  : <Tag color="var(--am)">attested only</Tag>}
            </div>
          </div>
        ))}
      </Card>

      <Card span={12} delay={200}>
        <Eyebrow>Scenario exposure detail</Eyebrow>
        <div className="scen-grid">
          {SCENARIOS.map((s) => (
            <div key={s.id} className="scen-card">
              <div className="scen-name">{s.name}</div>
              <div className="scen-big">RM {s.low}–{s.high}m <small>{s.likely}</small></div>
              <div className="scen-bar big"><span style={{ left: `${s.low / 10 * 100}%`, width: `${(s.high - s.low) / 10 * 100}%` }} /></div>
              {s.drivers.map((d) => <div key={d} className="scen-drv">· {d}</div>)}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
