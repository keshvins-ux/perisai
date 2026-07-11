import React, { useState } from "react";
import { CONTROLS, CONF_META } from "./data.js";
import { Card, Eyebrow, Spark, Donut, Shield, Delta, Tag, Bar, Modal, scoreColor, riskColor } from "./ui.jsx";

export default function Board({ ps, goAdmin, D }) {
  const [lineage, setLineage] = useState(null);
  const [compTab, setCompTab] = useState("reg");
  const [pack, setPack] = useState(false);

  const crown = ps.riskState.filter((r) => r.crown);
  const nonCrown = ps.riskState.filter((r) => !r.crown);
  const avg = (a) => Math.round(a.reduce((x, r) => x + r.score, 0) / a.length);
  const compAvg = Math.round(D.REGULATORY.reduce((a, f) => a + f.score, 0) / D.REGULATORY.length);
  const overApp = ps.riskIndex > D.ORG.appetite;
  const improving = ps.riskState.filter((r) => r.score < r.prev).length;
  const worstScen = D.SCENARIOS.reduce((a, s) => (s.high > a.high ? s : a), D.SCENARIOS[0]);
  const weakVendors = D.VENDORS.filter((v) => v.posture < 60).length;
  const dueNow = D.DECISIONS.filter((d) => d.due === "This meeting").length;
  const threatMeta = D.RADAR.some((t) => t.level === "elevated")
    ? { label: "ELEVATED", color: "var(--co)" }
    : D.RADAR.some((t) => t.level === "rising")
      ? { label: "RISING", color: "var(--am)" }
      : { label: "STABLE", color: "var(--em)" };

  return (
    <div className="boardwrap">
      {/* 1 · THE ANSWER */}
      <section className="hero rise">
        <div className="hero-eyebrow row-sb">
          <span>{D.ORG.name} · {D.ORG.period} · cyber position in one view</span>
          <button className="packbtn" onClick={() => setPack(true)}>⎙ Generate board pack</button>
        </div>
        <h1 className="hero-verdict">
          Cyber risk is{" "}
          <em className="uv">{overApp ? "above" : "within"} the appetite you set</em>
          , compliance is <em className="uv">partial and improving</em>,
          and <em className="uv">{dueNow} decisions need you today</em>.
        </h1>

        <div className="hero-nums">
          <button className="hnum" onClick={() => document.getElementById("fold-risk")?.scrollIntoView({ behavior: "smooth" })}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Shield value={ps.riskIndex} sub={`APPETITE ${D.ORG.appetite}`} bad={overApp} size={74} />
              <div>
                <span className="hnum-l" style={{ display: "block" }}>risk index vs appetite</span>
                <Delta now={ps.riskIndex} prev={D.ORG.prevIndex} goodDown />
              </div>
            </div>
            <span className="go">TRACE MOVEMENT ▸</span>
          </button>
          <button className="hnum" onClick={() => document.getElementById("fold-comp")?.scrollIntoView({ behavior: "smooth" })}>
            <span className="hnum-v" style={{ color: scoreColor(compAvg) }}>{compAvg}<small>%</small></span>
            <span className="hnum-l">compliance across the frameworks that bind us</span>
            <Delta now={compAvg} prev={Math.round(D.REGULATORY.reduce((a,f)=>a+f.prev,0)/D.REGULATORY.length)} goodDown={false} />
            <span className="go">OPEN DETAIL ▸</span>
          </button>
          <button className="hnum" onClick={goAdmin}>
            <span className="hnum-v" style={{ color: scoreColor(ps.machinePct) }}>{ps.machinePct}<small>%</small></span>
            <span className="hnum-l">of this report verified from live systems</span>
            <span className="hnum-x">{ps.coverage}% of estate visible{ps.blind.length > 0 ? " · ⚠ sources offline" : ""}</span>
            <span className="go">VIEW SOURCES ▸</span>
          </button>
          <button className="hnum" onClick={() => document.getElementById("fold-radar")?.scrollIntoView({ behavior: "smooth" })}>
            <span className="hnum-v" style={{ color: threatMeta.color, fontSize: 25, lineHeight: 1.3 }}>{threatMeta.label}</span>
            <span className="hnum-l">sector threat level — {D.ORG.sector.split(" (")[0].toLowerCase()}</span>
            <span className="hnum-x">{D.RADAR.length} tracked campaigns · each with an adoptable action</span>
            <span className="go">OPEN RADAR ▸</span>
          </button>
        </div>
      </section>

      {/* 2 · WHAT WE NEED FROM YOU */}
      <section className="card decisions rise" style={{ animationDelay: "80ms" }}>
        <Eyebrow>Decisions required from the board</Eyebrow>
        <div className="dec-row">
          {D.DECISIONS.map((d) => (
            <div key={d.id} className="dec">
              <Tag color={d.type === "FUNDING" ? "var(--am)" : d.type === "ACCEPTANCE" ? "var(--co)" : "var(--accent)"}>{d.type}</Tag>
              <div className="dec-ask">{d.ask}</div>
              <div className="dec-why">{d.why}</div>
              {D.IFASKED[d.id] && <div className="dec-def">If deferred / challenged: <IfAsked qa={D.IFASKED[d.id]} /></div>}
              <div className="dec-due">Due: {d.due}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3 · THE PROOF, ON DEMAND */}
      <div className="bsec rise" style={{ animationDelay: "140ms" }}>Threats & exposure</div>

      <Fold id="fold-radar" title="Threat intelligence — sector radar" delay={170}
        summary={<><b style={{ color: "var(--am)" }}>{D.RADAR.length}</b> campaigns tracked · what happens next, and what we adopt</>}>
        <div className="outlook"><small>Next-quarter outlook</small>{D.OUTLOOK}</div>
        {D.RADAR.map((t) => (
          <div key={t.id} className="radar">
            <div className="radar-top">
              <Tag color={t.level === "elevated" ? "var(--co)" : t.level === "rising" ? "var(--am)" : "var(--dim)"}>{t.level}</Tag>
              <span className="radar-h">{t.headline}</span>
              <span className="prep-chip" style={{ color: t.prep === "ready" ? "var(--em)" : t.prep === "partial" ? "var(--am)" : "var(--co)" }}>
                preparedness: {t.prep}
              </span>
            </div>
            <div className="radar-grid">
              <div><small>Global picture</small>{t.global}</div>
              <div><small>Why it matters to us</small>{t.relevance}</div>
              <div className="radar-next"><small>What's next</small>{t.next}</div>
              <div className="radar-adopt"><small>What we adopt</small>{t.adopt}</div>
            </div>
          </div>
        ))}
        <div className="footnote">Curated monthly for your sector by Perisai analysts — every item ends in an action, not just news.</div>
      </Fold>

      <Fold id="fold-risk" title="Risk movement" delay={180}
        summary={<><b>{improving} of {ps.riskState.length}</b> risks improving · crown-jewel average <b style={{ color: riskColor(avg(crown)) }}>{avg(crown)}</b></>}>
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
      </Fold>

      <Fold id="fold-scen" title="What it could cost us" delay={220}
        summary={<>Worst credible case <b style={{ color: "var(--am)" }}>RM {worstScen.high}m</b> ({worstScen.name.toLowerCase()}) · 4 scenarios modelled</>}>
        {D.SCENARIOS.map((s) => (
          <button key={s.id} className="scen" onClick={() => setLineage(D.RISKS.find((r) => r.id === s.linked))}>
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
      </Fold>


      <div className="bsec">Compliance & assurance</div>

      <Fold id="fold-comp" title="Compliance position" delay={260}
        summary={<>RMiT <b style={{ color: scoreColor(74) }}>74%</b> · GTRM <b style={{ color: scoreColor(69) }}>69%</b> · PDPA <b style={{ color: scoreColor(63) }}>63%</b> — all improving</>}>
        <div className="minitabs" style={{ marginBottom: 14 }}>
          {[["reg", "Regulatory"], ["aud", "Audit"], ["bench", "Benchmark"]].map(([k, l]) => (
            <button key={k} className={compTab === k ? "on" : ""} onClick={() => setCompTab(k)}>{l}</button>
          ))}
        </div>
        {compTab === "reg" && D.REGULATORY.map((f) => (
          <div key={f.id} className="fw">
            <div className="fw-head">
              <span className="fw-name">{f.name}<small>{f.note}</small></span>
              <Delta now={f.score} prev={f.prev} goodDown={false} />
              <b style={{ color: scoreColor(f.score) }}>{f.score}%</b>
            </div>
            <div className="reg-verdict">{D.REG_VERDICT[f.id]}</div>
            <div className="fw-doms">
              {f.domains.map(([d, v]) => (
                <span key={d} className="dom" style={{ borderColor: scoreColor(v) }}>{d} <b style={{ color: scoreColor(v) }}>{v}</b></span>
              ))}
            </div>
          </div>
        ))}
        {compTab === "aud" && D.AUDIT.map((a) => (
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
            {D.NIST.map(([fn, cur, tgt]) => (
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
            <div className="footnote">D.NIST CSF 2.0 maturity (0–4). ◦ marker = peer median · | = board target.</div>
          </div>
        )}
      </Fold>

      <div className="bsec">Performance & accountability</div>

      <Fold id="fold-roi" title="What your investment bought" delay={300}
        summary={<><b>RM {(D.SPEND.at(-1)[1] / 1000).toFixed(2)}m</b> invested · residual risk <b style={{ color: "var(--em)" }}>down {D.SPEND[0][2] - D.SPEND.at(-1)[2]} points</b></>}>
        <div className="roi">
          <div className="roi-col">
            <div className="roi-num">RM {(D.SPEND[D.SPEND.length - 1][1] / 1000).toFixed(2)}m</div>
            <div className="roi-lab">cumulative spend (4 qtrs)</div>
            <Spark data={D.SPEND.map((s) => s[1])} color="var(--accent)" />
          </div>
          <div className="roi-col">
            <div className="roi-num" style={{ color: "var(--em)" }}>−{D.SPEND[0][2] - D.SPEND.at(-1)[2]} pts</div>
            <div className="roi-lab">residual risk index</div>
            <Spark data={D.SPEND.map((s) => s[2])} color="var(--em)" />
          </div>
        </div>
        <div className="roi-verdict">{D.ROI_NOTE}</div>
        <div className="init-h">What each approval delivered</div>
        {D.INITIATIVES.map((i) => (
          <div key={i.name} className="init-row">
            <span className="init-name">{i.name}<small>RM {i.spend}k</small></span>
            <span className="init-effect">{i.effect}</span>
            <span className="init-metric">{i.metric}</span>
          </div>
        ))}
      </Fold>

      <Fold id="fold-inc" title="What actually happened this quarter" delay={340}
        summary={<><b style={{ color: D.INCIDENTS.quarter.at(-1)[1] === 0 ? "var(--em)" : "var(--co)" }}>{D.INCIDENTS.quarter.at(-1)[1]}</b> reportable breaches · detection <b>{D.INCIDENTS.mttd.at(-1)}h</b> and falling</>}>
        {D.INCIDENTS.quarter.map(([k, v]) => (
          <div key={k} className="inc-row"><span>{k}</span><b style={{ color: v === 0 ? "var(--em)" : "var(--text)" }}>{v}</b></div>
        ))}
        <div className="inc-mt">
          <div><small>Mean time to detect</small><Spark data={D.INCIDENTS.mttd} color="var(--em)" /><b>{D.INCIDENTS.mttd.at(-1)}h</b></div>
          <div><small>Mean time to respond</small><Spark data={D.INCIDENTS.mttr} color="var(--em)" /><b>{D.INCIDENTS.mttr.at(-1)}h</b></div>
        </div>
      </Fold>

      <Fold id="fold-ven" title="Third-party exposure" delay={380}
        summary={<><b style={{ color: weakVendors ? "var(--co)" : "var(--em)" }}>{weakVendors}</b> critical vendor{weakVendors === 1 ? "" : "s"} below assurance threshold</>}>
        {D.VENDORS.map((v) => (
          <div key={v.name} className="ven">
            <div className="ven-l">
              <span className="ven-name">{v.crown ? "◆ " : ""}{v.name}</span>
              <small>{v.tier} · {v.note}</small>
            </div>
            <Bar pct={v.posture} color={scoreColor(v.posture)} h={7} />
            <b style={{ color: scoreColor(v.posture) }}>{v.posture}</b>
          </div>
        ))}
      </Fold>

      <Fold id="fold-ppl" title="Capability & people" delay={420}
        summary={<><b style={{ color: "var(--co)" }}>{D.PEOPLE.roles.filter(([,ok])=>!ok).length}</b> key role{D.PEOPLE.roles.filter(([,ok])=>!ok).length===1?"":"s"} unfilled · phishing clicks down to <b style={{ color: "var(--em)" }}>{D.PEOPLE.phishing.at(-1)}%</b></>}>
        <div className="ppl-roles">
          {D.PEOPLE.roles.map(([r, ok]) => (
            <span key={r} className="chip" style={{ color: ok ? "var(--em)" : "var(--co)" }}>
              <i style={{ background: ok ? "var(--em)" : "var(--co)" }} />{r}
            </span>
          ))}
        </div>
        <div className="ppl-phish">
          <small>Phishing-sim click rate</small>
          <Spark data={D.PEOPLE.phishing} color="var(--em)" /><b>{D.PEOPLE.phishing.at(-1)}%</b>
        </div>
        <div className="blindwarn">⚠ {D.PEOPLE.spof}</div>
      </Fold>

      <Modal open={!!lineage} onClose={() => setLineage(null)}>
        {lineage && <Lineage r={lineage} ps={ps} D={D} />}
      </Modal>

      <Modal open={pack} onClose={() => setPack(false)}>
        <BoardPack ps={ps} compAvg={compAvg} overApp={overApp} dueNow={dueNow} D={D} />
      </Modal>
    </div>
  );
}

function IfAsked({ qa }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="ifasked">
      <button className="ifasked-btn" onClick={() => setOpen(!open)}>{open ? "hide" : "view prep note"}</button>
      {open && <span className="ifasked-body"><em>"{qa.q}"</em> — {qa.a}</span>}
    </span>
  );
}

function BoardPack({ ps, compAvg, overApp, dueNow, D }) {
  return (
    <div className="pack">
      <div className="eyebrow">Board pack — one page (preview of generated output)</div>
      <h2 className="pack-title">Cyber Risk & Compliance Position — {D.ORG.name}</h2>
      <div className="pack-meta">{D.ORG.period} · Prepared by CIO · Generated by Perisai · evidence lineage available on request</div>
      <p className="pack-verdict">
        Cyber risk is <b style={{ color: overApp ? "var(--co)" : "var(--em)" }}>{overApp ? "above" : "within"} board appetite</b> at {ps.riskIndex} (appetite {D.ORG.appetite}), trending down from {D.ORG.prevIndex} last quarter.
        Compliance stands at <b style={{ color: "var(--am)" }}>{compAvg}%</b> across RMiT, GTRM and PDPA — all improving.
        <b> {dueNow} decisions require the board today.</b> {ps.machinePct}% of this report is machine-verified from live systems; {ps.coverage}% of the estate is visible.
      </p>
      <div className="pack-h">Decisions required</div>
      {D.DECISIONS.map((d) => (
        <div key={d.id} className="pack-dec">
          <b>{d.type}</b> — {d.ask}
          {D.IFASKED[d.id] && <small> If deferred: {D.IFASKED[d.id].a}</small>}
        </div>
      ))}
      <div className="pack-h">What your investment delivered</div>
      <p className="pack-line">RM {(D.SPEND[D.SPEND.length-1][1]/1000).toFixed(2)}m invested over four quarters; residual risk down {D.SPEND[0][2] - D.SPEND.at(-1)[2]} points. {D.INITIATIVES[0].name.split(" (")[0]}: {D.INITIATIVES[0].effect.toLowerCase()}. {D.INITIATIVES[2].name.split(" (")[0]}: {D.INITIATIVES[2].effect.toLowerCase()}.</p>
      <div className="pack-h">Regulatory position in one line each</div>
      {D.REGULATORY.map((f) => <p key={f.id} className="pack-line"><b>{f.name}:</b> {D.REG_VERDICT[f.id]}</p>)}
      <div className="pack-foot">Full product: exports to PDF/Word with your letterhead, appendix of evidence lineage, and the minuted decision record. Demo shows generated content only.</div>
    </div>
  );
}

function Fold({ id, title, summary, children, delay = 0 }) {
  const [open, setOpen] = useState(false);
  return (
    <section id={id} className={`fold rise ${open ? "open" : ""}`} style={{ animationDelay: `${delay}ms` }}>
      <button className="fold-head" onClick={() => setOpen(!open)}>
        <span className="fold-title">{title}</span>
        <span className="fold-sum">{summary}</span>
        <span className="chev">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="fold-body">{children}</div>}
    </section>
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

function Lineage({ r, ps, D }) {
  const ctls = CONTROLS.filter((c) => r.controls.includes(c.id));
  const cname = { m365: "Microsoft 365 / Defender", entra: "Entra ID", rapid7: "Rapid7 InsightVM", nozomi: "Nozomi Guardian", nessus: "Nessus (OT)", veeam: "Veeam", pam: "Delinea PAM", jira: "Jira SM" };
  return (
    <div className="lineage">
      <div className="eyebrow">Lineage — how this number is built</div>
      <h2>{r.name}</h2>
      <p className="lin-narr">{r.narrative}</p>
      <div className="lin-chain">
        <div className="lin-step">
          <div className="lin-h">1 · Signals</div>
          {r.connectors.length ? r.connectors.map((c) => (
            <div key={c} className="lin-item">{ps.blind.find((b) => b.id === c) ? "⚠ " : "● "}{cname[c] || c}</div>
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
        Board statement: <b>"{r.name}" scores {r.score}{r.degraded ? " (confidence reduced — a data source is offline)" : ""}, {r.score > 62 ? "above" : "within"} appetite.</b>
      </div>
      {D.IFASKED[r.id] && (
        <div className="prep">
          <div className="prep-h">If asked in the boardroom</div>
          <div className="prep-q">"{D.IFASKED[r.id].q}"</div>
          <div className="prep-a">{D.IFASKED[r.id].a}</div>
        </div>
      )}
    </div>
  );
}
