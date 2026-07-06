import React, { useState } from "react";
import { ORG, RISKS, SCENARIOS, REGULATORY, AUDIT, NIST, DECISIONS, SPEND, INCIDENTS, VENDORS, PEOPLE, CONTROLS, CONF_META } from "../data.js";
import { Card, Eyebrow, Spark, Donut, Delta, Tag, Bar, Modal, scoreColor, riskColor } from "../ui.jsx";

export default function Board({ ps, goAdmin }) {
  const [lineage, setLineage] = useState(null);
  const [compTab, setCompTab] = useState("reg");

  const crown = ps.riskState.filter((r) => r.crown);
  const nonCrown = ps.riskState.filter((r) => !r.crown);
  const avg = (a) => Math.round(a.reduce((x, r) => x + r.score, 0) / a.length);
  const compAvg = Math.round(REGULATORY.reduce((a, f) => a + f.score, 0) / REGULATORY.length);
  const overApp = ps.riskIndex > ORG.appetite;

  return (
    <div className="grid">
      {/* ── Headline row ─────────────────────────────────────── */}
      <Card span={4} delay={0}>
        <Eyebrow>Risk position vs appetite</Eyebrow>
        <div className="headline">
          <Donut value={ps.riskIndex} color={overApp ? "var(--co)" : "var(--em)"} label="" />
          <div>
            <div className="head-big" style={{ color: overApp ? "var(--co)" : "var(--em)" }}>
              {overApp ? "ABOVE" : "WITHIN"} APPETITE
            </div>
            <div className="head-sub">Board-set appetite: <b>{ORG.appetite}</b> · Current index: <b>{ps.riskIndex}</b></div>
            <Delta now={ps.riskIndex} prev={73} goodDown />
          </div>
        </div>
      </Card>

      <Card span={4} delay={60}>
        <Eyebrow>Compliance position</Eyebrow>
        <div className="headline">
          <Donut value={compAvg} color={scoreColor(compAvg)} />
          <div>
            <div className="head-big" style={{ color: scoreColor(compAvg) }}>PARTIAL</div>
            <div className="head-sub">Across RMiT · GTRM · PDPA</div>
            <Delta now={compAvg} prev={64} goodDown={false} />
          </div>
        </div>
      </Card>

      <Card span={4} delay={120}>
        <Eyebrow right={<button className="ghost" onClick={goAdmin}>Admin →</button>}>Confidence in this report</Eyebrow>
        <div className="conf-strip">
          <div className="conf-line">
            <span>Estate visibility</span>
            <Bar pct={ps.coverage} color={scoreColor(ps.coverage)} /><b>{ps.coverage}%</b>
          </div>
          <div className="conf-line">
            <span>Machine-verified evidence</span>
            <Bar pct={ps.machinePct} color={scoreColor(ps.machinePct)} /><b>{ps.machinePct}%</b>
          </div>
          <div className="conf-chips">
            {Object.entries(ps.mix).map(([k, n]) => (
              <span key={k} className="chip" style={{ color: CONF_META[k].color }}>
                <i style={{ background: CONF_META[k].color }} />{n} {CONF_META[k].label}
              </span>
            ))}
          </div>
          {ps.blind.length > 0 && (
            <div className="blindwarn">⚠ {ps.blind.length} source{ps.blind.length > 1 ? "s" : ""} disconnected — parts of this report are self-attested only</div>
          )}
        </div>
      </Card>

      {/* ── Decisions required ───────────────────────────────── */}
      <Card span={12} delay={180} className="decisions">
        <Eyebrow>Decisions required from the board</Eyebrow>
        <div className="dec-row">
          {DECISIONS.map((d) => (
            <div key={d.id} className="dec">
              <Tag color={d.type === "FUNDING" ? "var(--am)" : d.type === "ACCEPTANCE" ? "var(--co)" : "var(--accent)"}>{d.type}</Tag>
              <div className="dec-ask">{d.ask}</div>
              <div className="dec-why">{d.why}</div>
              <div className="dec-due">Due: {d.due}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* ── Risk movement ────────────────────────────────────── */}
      <Card span={7} delay={240}>
        <Eyebrow>Risk movement — crown jewels vs rest of estate</Eyebrow>
        <div className="cj-split">
          <div className="cj-box">
            <div className="cj-h">◆ Crown jewels <b style={{ color: riskColor(avg(crown)) }}>{avg(crown)}</b></div>
            {crown.map((r) => <RiskRow key={r.id} r={r} onLineage={setLineage} />)}
          </div>
          <div className="cj-box">
            <div className="cj-h">◇ Non-crown <b style={{ color: riskColor(avg(nonCrown)) }}>{avg(nonCrown)}</b></div>
            {nonCrown.map((r) => <RiskRow key={r.id} r={r} onLineage={setLineage} />)}
          </div>
        </div>
        <div className="footnote">Click any risk to trace its lineage — signal → asset → control → obligation.</div>
      </Card>

      {/* ── Scenario exposure (CRQ) ──────────────────────────── */}
      <Card span={5} delay={300}>
        <Eyebrow>Scenario exposure (RM millions)</Eyebrow>
        {SCENARIOS.map((s) => (
          <button key={s.id} className="scen" onClick={() => setLineage(RISKS.find((r) => r.id === s.linked))}>
            <div className="scen-top">
              <span className="scen-name">{s.name}</span>
              <span className="scen-range">RM {s.low}–{s.high}m</span>
            </div>
            <div className="scen-bar">
              <span style={{ left: `${s.low / 10 * 100}%`, width: `${(s.high - s.low) / 10 * 100}%` }} />
            </div>
            <div className="scen-drv">{s.likely} · {s.drivers[0]}</div>
          </button>
        ))}
        <div className="footnote">Ranges derived from asset value, control coverage & current gaps — not point estimates.</div>
      </Card>

      {/* ── Compliance block ─────────────────────────────────── */}
      <Card span={7} delay={360}>
        <Eyebrow right={
          <div className="minitabs">
            {[["reg", "Regulatory"], ["aud", "Audit"], ["bench", "Benchmark"]].map(([k, l]) => (
              <button key={k} className={compTab === k ? "on" : ""} onClick={() => setCompTab(k)}>{l}</button>
            ))}
          </div>
        }>Compliance</Eyebrow>

        {compTab === "reg" && REGULATORY.map((f) => (
          <div key={f.id} className="fw">
            <div className="fw-head">
              <span className="fw-name">{f.name}<small>{f.note}</small></span>
              <Delta now={f.score} prev={f.prev} goodDown={false} />
              <b style={{ color: scoreColor(f.score) }}>{f.score}%</b>
            </div>
            <div className="fw-doms">
              {f.domains.map(([d, v]) => (
                <span key={d} className="dom" style={{ borderColor: scoreColor(v) }}>{d} <b style={{ color: scoreColor(v) }}>{v}</b></span>
              ))}
            </div>
          </div>
        ))}

        {compTab === "aud" && AUDIT.map((a) => (
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

        {compTab === "bench" && (
          <div className="nist">
            {NIST.map(([fn, cur, tgt]) => (
              <div key={fn} className="nist-row">
                <span className="nist-fn">{fn}</span>
                <div className="nist-track">
                  <span className="nist-peer" style={{ left: "50%" }} title="Peer median 2.5" />
                  <span className="nist-cur" style={{ width: `${cur / 4 * 100}%`, background: cur >= 2.5 ? "var(--em)" : "var(--am)" }} />
                  <span className="nist-tgt" style={{ left: `${tgt / 4 * 100}%` }} />
                </div>
                <span className="nist-val">{cur.toFixed(1)} <small>/ tgt {tgt.toFixed(1)}</small></span>
              </div>
            ))}
            <div className="footnote">NIST CSF 2.0 maturity (0–4). ◦ marker = peer median · | = board target.</div>
          </div>
        )}
      </Card>

      {/* ── Investment ROI ───────────────────────────────────── */}
      <Card span={5} delay={420}>
        <Eyebrow>Security investment vs residual risk</Eyebrow>
        <div className="roi">
          <div className="roi-col">
            <div className="roi-num">RM {(SPEND[SPEND.length - 1][1] / 1000).toFixed(2)}m</div>
            <div className="roi-lab">cumulative spend (4 qtrs)</div>
            <Spark data={SPEND.map((s) => s[1])} color="var(--accent)" />
          </div>
          <div className="roi-col">
            <div className="roi-num" style={{ color: "var(--em)" }}>−13 pts</div>
            <div className="roi-lab">residual risk index</div>
            <Spark data={SPEND.map((s) => s[2])} color="var(--em)" />
          </div>
        </div>
        <div className="roi-verdict">Each RM 100k invested this year removed ~1.4 risk-index points — efficiency improving quarter on quarter.</div>
      </Card>

      {/* ── Incidents ────────────────────────────────────────── */}
      <Card span={4} delay={480}>
        <Eyebrow>What actually happened — {ORG.period}</Eyebrow>
        {INCIDENTS.quarter.map(([k, v]) => (
          <div key={k} className="inc-row"><span>{k}</span><b style={{ color: v === 0 ? "var(--em)" : "var(--text)" }}>{v}</b></div>
        ))}
        <div className="inc-mt">
          <div><small>Mean time to detect</small><Spark data={INCIDENTS.mttd} color="var(--em)" invert={false} /><b>22h</b></div>
          <div><small>Mean time to respond</small><Spark data={INCIDENTS.mttr} color="var(--em)" /><b>14h</b></div>
        </div>
      </Card>

      {/* ── Third party ──────────────────────────────────────── */}
      <Card span={4} delay={540}>
        <Eyebrow>Third-party exposure</Eyebrow>
        {VENDORS.map((v) => (
          <div key={v.name} className="ven">
            <div className="ven-l">
              <span className="ven-name">{v.crown ? "◆ " : ""}{v.name}</span>
              <small>{v.tier} · {v.note}</small>
            </div>
            <Bar pct={v.posture} color={scoreColor(v.posture)} h={7} />
            <b style={{ color: scoreColor(v.posture) }}>{v.posture}</b>
          </div>
        ))}
      </Card>

      {/* ── People ───────────────────────────────────────────── */}
      <Card span={4} delay={600}>
        <Eyebrow>Capability & people</Eyebrow>
        <div className="ppl-roles">
          {PEOPLE.roles.map(([r, ok]) => (
            <span key={r} className="chip" style={{ color: ok ? "var(--em)" : "var(--co)" }}>
              <i style={{ background: ok ? "var(--em)" : "var(--co)" }} />{r}
            </span>
          ))}
        </div>
        <div className="ppl-phish">
          <small>Phishing-sim click rate</small>
          <Spark data={PEOPLE.phishing} color="var(--em)" /><b>7.1%</b>
        </div>
        <div className="blindwarn">⚠ {PEOPLE.spof}</div>
      </Card>

      {/* ── Lineage modal ────────────────────────────────────── */}
      <Modal open={!!lineage} onClose={() => setLineage(null)}>
        {lineage && <Lineage r={lineage} ps={ps} />}
      </Modal>
    </div>
  );
}

function RiskRow({ r, onLineage }) {
  return (
    <button className="riskrow" onClick={() => onLineage(r)}>
      <span className="rr-name">{r.name}{r.degraded && <em className="deg"> ◌ reduced visibility</em>}</span>
      <Delta now={r.score} prev={r.prev} goodDown />
      <b style={{ color: riskColor(r.score) }}>{r.score}</b>
    </button>
  );
}

function Lineage({ r, ps }) {
  const ctls = CONTROLS.filter((c) => r.controls.includes(c.id));
  return (
    <div className="lineage">
      <div className="eyebrow">Lineage — how this number is built</div>
      <h2>{r.name}</h2>
      <p className="lin-narr">{r.narrative}</p>
      <div className="lin-chain">
        <div className="lin-step">
          <div className="lin-h">1 · Signals</div>
          {r.connectors.length ? r.connectors.map((c) => (
            <div key={c} className="lin-item">{ps.blind.find((b) => b.id === c) ? "⚠ " : "● "}{c === "m365" ? "Microsoft 365 / Defender" : c === "entra" ? "Entra ID" : c === "rapid7" ? "Rapid7 InsightVM" : c === "nozomi" ? "Nozomi Guardian" : c === "nessus" ? "Nessus (OT)" : c === "veeam" ? "Veeam" : c === "pam" ? "Delinea PAM" : c === "jira" ? "Jira SM" : c}</div>
          )) : <div className="lin-item">◌ No live feed — analyst-attested only</div>}
        </div>
        <span className="lin-arrow">→</span>
        <div className="lin-step">
          <div className="lin-h">2 · Business service</div>
          <div className="lin-item">◆ {r.service}</div>
          <div className="lin-item">Owner: {r.owner}</div>
        </div>
        <span className="lin-arrow">→</span>
        <div className="lin-step">
          <div className="lin-h">3 · Controls & confidence</div>
          {ctls.map((c) => (
            <div key={c.id} className="lin-item">
              <i className="lin-dot" style={{ background: CONF_META[ps.confidence[c.id]].color }} />
              {c.name} <small style={{ color: CONF_META[ps.confidence[c.id]].color }}>{CONF_META[ps.confidence[c.id]].label}</small>
            </div>
          ))}
        </div>
        <span className="lin-arrow">→</span>
        <div className="lin-step">
          <div className="lin-h">4 · Obligations touched</div>
          {[...new Set(ctls.flatMap((c) => Object.entries(c.maps).map(([k, v]) => `${k.toUpperCase()} ${v}`)))].slice(0, 6).map((m) => (
            <div key={m} className="lin-item">§ {m}</div>
          ))}
        </div>
      </div>
      <div className="lin-verdict">
        Board statement: <b>“{r.name}” scores {r.score}{r.degraded ? " (confidence reduced — a data source is offline)" : ""}, {r.score > 62 ? "above" : "within"} appetite.</b>
      </div>
    </div>
  );
}
