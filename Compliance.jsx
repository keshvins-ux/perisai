import React from "react";
import { REGULATORY, AUDIT, NIST, CONTROLS, CONF_META } from "./data.js";
import { Card, Eyebrow, Delta, Bar, Tag, scoreColor } from "./ui.jsx";

export default function Compliance({ ps }) {
  const pdpaCtls = CONTROLS.filter((c) => c.maps.pdpa);
  return (
    <div className="grid">
      {REGULATORY.map((f, i) => (
        <Card span={4} delay={i * 70} key={f.id}>
          <Eyebrow>{f.name}</Eyebrow>
          <div className="comp-head">
            <b className="comp-score" style={{ color: scoreColor(f.score) }}>{f.score}%</b>
            <Delta now={f.score} prev={f.prev} goodDown={false} />
          </div>
          <small className="comp-note">{f.note}</small>
          {f.domains.map(([d, v]) => (
            <div key={d} className="dom-row">
              <span>{d}</span><Bar pct={v} color={scoreColor(v)} /><b style={{ color: scoreColor(v) }}>{v}</b>
            </div>
          ))}
        </Card>
      ))}

      <Card span={7} delay={240}>
        <Eyebrow>Audit readiness</Eyebrow>
        {AUDIT.map((a) => (
          <div key={a.id} className="fw">
            <div className="fw-head">
              <span className="fw-name">{a.name}<small>{a.stage}</small></span>
              <b style={{ color: scoreColor(a.score) }}>{a.score}%</b>
            </div>
            <div className="fw-doms">
              {a.open.map(([f, sev]) => (
                <span key={f} className="dom" style={{ borderColor: sev === "major" || sev === "high" ? "var(--co)" : "var(--am)" }}>
                  {f} <b style={{ color: sev === "major" || sev === "high" ? "var(--co)" : "var(--am)" }}>{sev}</b>
                </span>
              ))}
            </div>
          </div>
        ))}
        <div className="nist" style={{ marginTop: 18 }}>
          <div className="eyebrow">NIST CSF 2.0 benchmark</div>
          {NIST.map(([fn, cur, tgt]) => (
            <div key={fn} className="nist-row">
              <span className="nist-fn">{fn}</span>
              <div className="nist-track">
                <span className="nist-peer" style={{ left: "50%" }} />
                <span className="nist-cur" style={{ width: `${cur / 4 * 100}%`, background: cur >= 2.5 ? "var(--em)" : "var(--am)" }} />
                <span className="nist-tgt" style={{ left: `${tgt / 4 * 100}%` }} />
              </div>
              <span className="nist-val">{cur.toFixed(1)} <small>/ tgt {tgt.toFixed(1)}</small></span>
            </div>
          ))}
        </div>
      </Card>

      <Card span={5} delay={320}>
        <Eyebrow>PDPA control evidence — live confidence</Eyebrow>
        {pdpaCtls.map((c) => (
          <div key={c.id} className="pdpa-row">
            <span className="pdpa-name">{c.name}<small>{c.maps.pdpa}</small></span>
            <Tag color={CONF_META[ps.confidence[c.id]].color}>{CONF_META[ps.confidence[c.id]].label}</Tag>
          </div>
        ))}
        <div className="footnote">Same controls feed the risk module — one piece of evidence, two answers. Toggle connectors in Admin to watch these chips change.</div>
      </Card>
    </div>
  );
}
