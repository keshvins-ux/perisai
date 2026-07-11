// ─────────────────────────────────────────────────────────────────────────────
// Perisai — mock data model for Meridian Logistics Sdn Bhd (fictional)
// One engine: connectors feed controls; controls map to BOTH risk & compliance.
// computePlatformState(enabled) derives everything live from connector toggles.
// ─────────────────────────────────────────────────────────────────────────────

export const ORG = {
  name: "Meridian Logistics Sdn Bhd",
  sector: "Ports & Logistics",
  employees: 840,
  period: "Q2 FY2026",
  appetite: 62, prevIndex: 73, // board-approved appetite; prevIndex = last quarter
};

// ── Connectors (Admin page) ──────────────────────────────────────────────────
export const CONNECTORS = [
  { id: "entra",  name: "Microsoft Entra ID", vendor: "Microsoft", layer: "Identity",
    method: "API · OAuth2 read-only", devices: [812, 840], logVis: 100,
    upgrades: ["c-mfa", "c-priv", "c-joiner"], note: "Identity, MFA state, privileged roles" },
  { id: "m365",   name: "Microsoft 365 / Defender", vendor: "Microsoft", layer: "Endpoint & Email",
    method: "Graph API · scheduled 15 min", devices: [795, 840], logVis: 96,
    upgrades: ["c-edr", "c-mail", "c-dlp"], note: "Endpoint protection, mail security, DLP" },
  { id: "rapid7", name: "Rapid7 InsightVM", vendor: "Rapid7", layer: "Vulnerability",
    method: "API · daily scan import", devices: [761, 840], logVis: 91,
    upgrades: ["c-vuln", "c-patch"], note: "Vulnerability & patch posture" },
  { id: "nessus", name: "Nessus Professional", vendor: "Tenable", layer: "Vulnerability",
    method: "Structured upload · weekly", devices: [702, 840], logVis: 84,
    upgrades: ["c-vuln-ot"], note: "OT-segment scanning (port operations)" },
  { id: "pam",    name: "Delinea Secret Server", vendor: "Delinea", layer: "PAM",
    method: "API · event stream", devices: [64, 71], logVis: 90,
    upgrades: ["c-priv", "c-vault"], note: "Privileged accounts & session logs" },
  { id: "nozomi", name: "Nozomi Guardian", vendor: "Nozomi", layer: "OT / ICS",
    method: "Read-only sensor · syslog", devices: [118, 152], logVis: 78,
    upgrades: ["c-ot-seg", "c-ot-mon"], note: "Crane & yard OT network monitoring" },
  { id: "veeam",  name: "Veeam Backup", vendor: "Veeam", layer: "Resilience",
    method: "API · daily job status", devices: [38, 41], logVis: 93,
    upgrades: ["c-backup"], note: "Backup success & immutability" },
  { id: "jira",   name: "Jira Service Mgmt", vendor: "Atlassian", layer: "Remediation",
    method: "API · webhook", devices: [1, 1], logVis: 100,
    upgrades: ["c-remed"], note: "Remediation ticket tracking" },
];

// ── Controls (shared core: each maps to risk AND compliance) ─────────────────
// conf when connector off = base ("attested"/"evidenced"); on = "machine"
export const CONTROLS = [
  { id: "c-mfa",    name: "MFA enforced on all user accounts",            base: "attested",  maps: { pdpa: "P4 Security", rmit: "10.55 Access Control", iso: "A.5.17", nist: "PR.AA" } },
  { id: "c-priv",   name: "Privileged access reviewed & vaulted",         base: "attested",  maps: { pdpa: "P4 Security", rmit: "10.61 Privileged Access", iso: "A.8.2", nist: "PR.AA" } },
  { id: "c-joiner", name: "Joiner–mover–leaver deprovisioning",           base: "evidenced", maps: { pdpa: "P4 Security", rmit: "10.55", iso: "A.5.16", nist: "PR.AA" } },
  { id: "c-edr",    name: "EDR deployed & reporting on endpoints",        base: "attested",  maps: { rmit: "10.66 Malware Defence", iso: "A.8.7", nist: "DE.CM" } },
  { id: "c-mail",   name: "Email security & anti-phishing controls",      base: "attested",  maps: { rmit: "10.66", iso: "A.8.7", nist: "PR.PT" } },
  { id: "c-dlp",    name: "DLP on personal-data repositories",            base: "attested",  maps: { pdpa: "P4 Security", rmit: "11.15 Data Loss", iso: "A.8.12", nist: "PR.DS" } },
  { id: "c-vuln",   name: "Critical vulns remediated within SLA (IT)",    base: "evidenced", maps: { rmit: "10.68 Vulnerability Mgmt", iso: "A.8.8", nist: "ID.RA" } },
  { id: "c-patch",  name: "Patch currency on crown-jewel servers",        base: "attested",  maps: { rmit: "10.68", iso: "A.8.8", nist: "PR.IP" } },
  { id: "c-vuln-ot",name: "OT segment vulnerability assessment",          base: "attested",  maps: { rmit: "10.68", iso: "A.8.8", nist: "ID.RA" } },
  { id: "c-vault",  name: "Secrets vaulted, no shared admin creds",       base: "attested",  maps: { rmit: "10.61", iso: "A.5.17", nist: "PR.AA" } },
  { id: "c-ot-seg", name: "IT/OT network segmentation",                   base: "attested",  maps: { rmit: "10.51 Network Security", iso: "A.8.22", nist: "PR.AC" } },
  { id: "c-ot-mon", name: "OT anomaly monitoring & alerting",             base: "attested",  maps: { rmit: "10.63 Security Ops", iso: "A.8.16", nist: "DE.CM" } },
  { id: "c-backup", name: "Immutable backups, restore tested",            base: "evidenced", maps: { rmit: "10.72 Recovery", iso: "A.8.13", nist: "RC.RP" } },
  { id: "c-remed",  name: "Remediation tracked to closure with owners",   base: "evidenced", maps: { rmit: "10.68", iso: "A.5.36", nist: "RS.MI" } },
  { id: "c-notice", name: "Bilingual privacy notices at collection",      base: "evidenced", maps: { pdpa: "P2 Notice & Choice" } },
  { id: "c-dpo",    name: "DPO appointed & registered with Commissioner", base: "tested",    maps: { pdpa: "O1 DPO" } },
  { id: "c-breach", name: "Breach-notification runbook & harm test",      base: "attested",  maps: { pdpa: "O2 Breach Notification", rmit: "11.20 Incident Reporting", nist: "RS.CO" } },
  { id: "c-xborder",name: "Cross-border transfer basis recorded",         base: "attested",  maps: { pdpa: "O4 Cross-Border" } },
];

// ── Risks (risk module) ──────────────────────────────────────────────────────
export const RISKS = [
  { id: "r1", name: "Ransomware on port operations (OT)", crown: true,  score: 78, prev: 82,
    service: "Container Terminal Ops", owner: "COO",
    controls: ["c-ot-seg", "c-ot-mon", "c-backup", "c-vuln-ot"],
    connectors: ["nozomi", "nessus", "veeam"],
    narrative: "Crane and yard systems share legacy network paths with IT. A ransomware event halts berth operations — contractual penalties begin at hour 6." },
  { id: "r2", name: "Business email compromise → payment fraud", crown: true, score: 71, prev: 64,
    service: "Finance & Treasury", owner: "CFO",
    controls: ["c-mail", "c-mfa", "c-priv"],
    connectors: ["m365", "entra"],
    narrative: "Finance approvers targeted by credential phishing. Rising trend: two near-misses this quarter, one RM 1.4m payment stopped manually." },
  { id: "r3", name: "Customer personal-data breach (PDPA exposure)", crown: true, score: 66, prev: 66,
    service: "Customer Portal & CRM", owner: "CIO",
    controls: ["c-dlp", "c-mfa", "c-breach", "c-notice"],
    connectors: ["m365", "entra"],
    narrative: "Portal holds 210k consignee records incl. IDs. A breach triggers Commissioner notification and RM 1m penalty ceiling under PDPA 2024." },
  { id: "r4", name: "Unpatched internet-facing systems", crown: false, score: 58, prev: 65,
    service: "Shared IT Infrastructure", owner: "Head of IT",
    controls: ["c-vuln", "c-patch", "c-remed"],
    connectors: ["rapid7", "jira"],
    narrative: "External attack surface improving — critical-vuln SLA compliance up from 61% to 84% after patch-cycle reform." },
  { id: "r5", name: "Third-party freight-platform breach", crown: false, score: 55, prev: 51,
    service: "Partner Integrations", owner: "CIO",
    controls: ["c-xborder", "c-dlp"],
    connectors: [],
    narrative: "Key freight-exchange vendor holds our manifests & customer data offshore. No independent assurance received in 14 months." },
  { id: "r6", name: "Privileged-account misuse (insider)", crown: false, score: 47, prev: 52,
    service: "Shared IT Infrastructure", owner: "Head of IT",
    controls: ["c-priv", "c-vault", "c-joiner"],
    connectors: ["pam", "entra"],
    narrative: "Vaulting programme reduced shared admin credentials from 31 to 6. Session recording now covers 90% of privileged access." },
];

// ── CRQ Scenarios ────────────────────────────────────────────────────────────
export const SCENARIOS = [
  { id: "s1", name: "Ransomware halts terminal 48h", low: 4.2, high: 9.8, likely: "Possible",
    drivers: ["Berth downtime penalties", "Recovery & IR retainer", "Customer SLA credits"],
    linked: "r1" },
  { id: "s2", name: "BEC — fraudulent payment executed", low: 0.8, high: 2.6, likely: "Likely",
    drivers: ["Direct funds loss", "Investigation & legal", "Bank recovery uncertainty"],
    linked: "r2" },
  { id: "s3", name: "PDPA breach — 210k records", low: 1.4, high: 3.9, likely: "Possible",
    drivers: ["Regulatory penalty (≤RM 1m)", "Notification & credit monitoring", "Contract churn"],
    linked: "r3" },
  { id: "s4", name: "Third-party platform compromise", low: 0.6, high: 2.1, likely: "Possible",
    drivers: ["Manifest data exposure", "Joint liability under PDPA", "Re-platforming cost"],
    linked: "r5" },
];

// ── Compliance frameworks ────────────────────────────────────────────────────
export const REGULATORY = [
  { id: "rmit", name: "BNM RMiT", note: "Payment subsidiary in scope", score: 74, prev: 70,
    domains: [["Governance", 82], ["Access Control", 71], ["Network & Ops", 68], ["Incident Mgmt", 77], ["Third Party", 62]] },
  { id: "gtrm", name: "SC GTRM", note: "Guidelines on Technology Risk Mgmt", score: 69, prev: 66,
    domains: [["Oversight", 78], ["Risk Assessment", 70], ["Security Ops", 64], ["Resilience", 66]] },
  { id: "pdpa", name: "PDPA 2024", note: "Incl. amendment obligations", score: 63, prev: 55,
    domains: [["7 Principles", 66], ["DPO", 100], ["Breach Readiness", 45], ["Cross-Border", 50]] },
];

export const AUDIT = [
  { id: "iso", name: "ISO 27001:2022", stage: "Stage 1 planned Q4", score: 71,
    open: [["A.8.8 Vulnerability mgmt", "minor"], ["A.5.19 Supplier security", "major"], ["A.8.16 Monitoring", "minor"]] },
  { id: "ia", name: "Internal Audit FY26", stage: "3 of 14 findings open", score: 79,
    open: [["Privileged access recert overdue", "high"], ["DR test evidence gap", "medium"], ["Vendor SLA monitoring", "low"]] },
];

export const NIST = [
  ["Identify", 2.4, 3.0], ["Protect", 2.7, 3.0], ["Detect", 2.1, 3.0],
  ["Respond", 2.3, 3.0], ["Recover", 2.6, 3.0], ["Govern", 2.9, 3.0],
]; // [function, current, target] — peer band mid ≈ 2.5

// ── Board: decisions, spend, incidents, vendors, people ─────────────────────
export const DECISIONS = [
  { id: "d1", type: "FUNDING", ask: "Approve RM 180k — OT network segmentation phase 2",
    why: "Closes the largest driver of Scenario 1 (ransomware, RM 4.2–9.8m exposure). Reduces R1 below appetite by Q4.", due: "This meeting" },
  { id: "d2", type: "ACCEPTANCE", ask: "Formally accept residual third-party risk (R5) until vendor re-tender in Q1 FY27",
    why: "Mitigation options exhausted short-term; acceptance requires Board Risk Committee signature under risk policy.", due: "This meeting" },
  { id: "d3", type: "DIRECTION", ask: "Endorse ISO 27001 certification target — Stage 1 in Q4 FY26",
    why: "Required by two top-10 customers' procurement by FY27; current readiness 71%.", due: "Next meeting" },
];

export const SPEND = [
  // [quarter, cumulative spend RM'000, residual risk index]
  ["Q3 25", 310, 74], ["Q4 25", 620, 71], ["Q1 26", 980, 66], ["Q2 26", 1210, 61],
];

export const INCIDENTS = {
  quarter: [["Phishing reported", 41], ["Malware contained", 6], ["Near-miss payment fraud", 2], ["OT anomalies investigated", 3], ["Reportable breaches", 0]],
  mttd: [96, 72, 41, 22], mttr: [30, 26, 19, 14], // hours, last 4 quarters
};

export const VENDORS = [
  { name: "FreightXchange Pte", tier: "Critical", crown: true, posture: 54, note: "No SOC 2 in 14 months" },
  { name: "PortNet Gateway", tier: "Critical", crown: true, posture: 81, note: "ISO 27001 certified" },
  { name: "CloudPayroll MY", tier: "High", crown: false, posture: 73, note: "PDPA DPA signed" },
  { name: "TelemetryWorks", tier: "Medium", crown: false, posture: 66, note: "Assessment due Q3" },
];

export const PEOPLE = {
  roles: [["CISO", true], ["SecOps x3", true], ["GRC Analyst", true], ["OT Security Lead", false]],
  phishing: [18.2, 14.6, 9.8, 7.1], // % click rate trend
  spof: "OT security knowledge concentrated in 1 engineer",
};

// ── The engine: derive live platform state from enabled connectors ──────────
export function computePlatformState(enabled, riskSet = RISKS) {
  const on = (id) => enabled[id];

  // Coverage: weighted device visibility across enabled connectors
  let seen = 0, total = 0;
  for (const c of CONNECTORS) {
    total += c.devices[1];
    if (on(c.id)) seen += c.devices[0];
  }
  const coverage = Math.round((seen / total) * 100);

  // Effective confidence per control
  const confidence = {};
  for (const ctl of CONTROLS) confidence[ctl.id] = ctl.base;
  for (const c of CONNECTORS) {
    if (!on(c.id)) continue;
    for (const cid of c.upgrades) confidence[cid] = "machine";
  }

  const mix = { attested: 0, evidenced: 0, machine: 0, tested: 0 };
  for (const ctl of CONTROLS) mix[confidence[ctl.id]]++;

  // Log visibility gaps (enabled connectors below 100%)
  const logGaps = CONNECTORS.filter((c) => on(c.id) && c.logVis < 100)
    .map((c) => ({ name: c.name, vis: c.logVis, layer: c.layer }));
  const blind = CONNECTORS.filter((c) => !on(c.id));

  // Risk uncertainty: a risk is "degraded" if any of its feeding connectors is off
  const riskState = riskSet.map((r) => {
    const missing = r.connectors.filter((cid) => !on(cid));
    return { ...r, degraded: missing.length > 0, missing };
  });

  // Headline risk index = avg of crown-jewel scores, +4 uncertainty penalty per degraded crown risk
  const crown = riskState.filter((r) => r.crown);
  let idx = crown.reduce((a, r) => a + r.score, 0) / crown.length;
  idx += riskState.filter((r) => r.crown && r.degraded).length * 4;
  const riskIndex = Math.min(100, Math.round(idx));

  const machinePct = Math.round((mix.machine + mix.tested) / CONTROLS.length * 100);

  return { coverage, confidence, mix, logGaps, blind, riskState, riskIndex, machinePct };
}

export const CONF_META = {
  attested:  { label: "Attested",         color: "var(--co)" },
  evidenced: { label: "Evidenced",        color: "var(--am)" },
  machine:   { label: "Machine-verified", color: "var(--em)" },
  tested:    { label: "Indep. tested",    color: "var(--accent)" },
};

// ── Sector threat radar (analyst-curated, sector-scoped) ────────────────────
export const RADAR = [
  { id: "t1", level: "elevated",
    headline: "Ransomware crews targeting port TOS & weighbridge systems",
    global: "Multiple terminal-operating-system compromises reported at mid-size ports in Indonesia, Chile and the Med over the last 90 days; initial access via VPN appliances and OT/IT crossover paths.",
    relevance: "Meridian's crane, yard and gate systems share legacy network paths with IT — the same pattern exploited in these incidents.",
    adopt: "Accelerate OT segmentation phase 2 (Decision #1) and validate offline backup of TOS databases.",
    next: "Attackers are moving from opportunistic hits to targeted reconnaissance of terminal operators — expect scanning and phishing against OT maintenance vendors within the quarter.", prep: "partial",
    linkedControl: "c-ot-seg" },
  { id: "t2", level: "rising",
    headline: "BEC campaigns imitating freight-forwarder payment changes",
    global: "Interpol and regional CERTs flag a surge in business-email-compromise using spoofed carrier invoices and bank-detail-change requests across SEA logistics chains.",
    relevance: "Two near-misses this quarter match this exact pattern; finance approvers are the target surface.",
    adopt: "Enforce out-of-band verification for all bank-detail changes; extend phishing sims to finance team scenarios.",
    next: "Campaign volume typically doubles into year-end payment cycles — expect spoofed carrier invoices timed to Q4 peak shipping.", prep: "partial",
    linkedControl: "c-mail" },
  { id: "t3", level: "watch",
    headline: "Regulator attention on third-party data processors",
    global: "Data-protection authorities regionally are moving enforcement focus from breached companies to their vendors and processors — joint-liability actions rising.",
    relevance: "FreightXchange holds Meridian consignee data offshore with no assurance report in 14 months (Risk R5).",
    adopt: "Require SOC 2 / ISO evidence at re-tender; interim contractual audit right (Decision #2 accepts residual until Q1).",
    next: "First joint-liability enforcement cases are expected regionally this year — vendor assurance moves from good practice to defensible necessity.", prep: "exposed",
    linkedControl: "c-xborder" },
];

// ── ROI attribution per funded initiative ────────────────────────────────────
export const INITIATIVES = [
  { name: "EDR rollout (approved Q4 25)", spend: 310, effect: "Endpoint risk −9 pts", metric: "84% critical-vuln SLA (was 61%)" },
  { name: "PAM & credential vaulting", spend: 240, effect: "Insider risk −5 pts", metric: "Shared admin creds 31 → 6" },
  { name: "Security awareness programme", spend: 90, effect: "Phishing clicks 18.2% → 7.1%", metric: "2 BEC attempts reported by staff" },
  { name: "Backup immutability upgrade", spend: 180, effect: "Ransomware recovery ready", metric: "Restore test passed 41/41 jobs" },
];

// ── Per-framework "if the regulator walked in tomorrow" verdicts ────────────
export const REG_VERDICT = {
  rmit: "If BNM inspected today: two findings likely (privileged-access recertification, third-party assurance) — both already in remediation with owners and dates.",
  gtrm: "If SC reviewed today: security-ops monitoring depth would draw questions; compensating analyst coverage is documented.",
  pdpa: "If the Commissioner inquired today: DPO and register are defensible; breach-notification runbook is the open exposure — closing this quarter.",
};

// ── "If asked in the boardroom" prep notes ───────────────────────────────────
export const IFASKED = {
  r1: { q: "Why is our biggest risk still above appetite after a year of spend?", a: "Spend to date deliberately prioritised endpoint and identity (now improving). OT segmentation is the remaining driver — it's Decision #1 today; approval brings R1 within appetite by Q4." },
  r2: { q: "Why is BEC fraud rising despite the awareness programme?", a: "Attack volume is up sector-wide (see radar). Awareness is working — both near-misses were caught by trained staff. The residual gap is process: out-of-band verification for bank-detail changes, in this quarter's plan." },
  r3: { q: "Would we survive a PDPA inspection tomorrow?", a: "DPO, register and notices are defensible. The gap is the breach runbook — remediation is funded and closes this quarter. Exposure ceiling is RM 1m plus reputational." },
  d1: { q: "Why RM 180k now rather than next year's budget?", a: "Peak season starts Q4 — exposure window RM 4.2–9.8m. Deferral means the board formally carries that risk through the highest-revenue quarter." },
  d2: { q: "Why accept rather than fix the vendor risk?", a: "Contract locks us until Q1; interim mitigations (access restriction, contractual audit right) are in place. Acceptance makes the residual explicit and time-boxed rather than silent." },
  d3: { q: "What does ISO certification actually buy us?", a: "Two top-10 customers require it in FY27 procurement — this protects roughly 18% of revenue and shortens future security questionnaires from weeks to days." },
};

// ── Full connector catalogue (marketplace page) ──────────────────────────────
// method: API | Webhook | Agent | Syslog | Upload | Attest
export const CATALOG = [
  { cat: "Identity & Access", items: [
    { name: "Microsoft Entra ID", method: "API", auth: "OAuth2 read-only", freq: "15 min", status: "live", upgrades: 3 },
    { name: "Okta", method: "API", auth: "API token read-only", freq: "15 min", status: "available", upgrades: 3 },
  ]},
  { cat: "Endpoint & EDR", items: [
    { name: "Microsoft Defender", method: "API", auth: "Graph OAuth2", freq: "15 min", status: "live", upgrades: 3 },
    { name: "CrowdStrike Falcon", method: "API", auth: "OAuth2 read-only", freq: "hourly", status: "available", upgrades: 3 },
    { name: "SentinelOne", method: "API", auth: "API token", freq: "hourly", status: "roadmap", upgrades: 3 },
  ]},
  { cat: "Vulnerability Mgmt", items: [
    { name: "Rapid7 InsightVM", method: "API", auth: "API key read-only", freq: "daily", status: "live", upgrades: 2 },
    { name: "Tenable / Nessus", method: "Upload", auth: "n/a (report file)", freq: "weekly", status: "live", upgrades: 1 },
    { name: "Qualys VMDR", method: "API", auth: "API key", freq: "daily", status: "roadmap", upgrades: 2 },
  ]},
  { cat: "PAM & Secrets", items: [
    { name: "Delinea Secret Server", method: "Webhook", auth: "Event stream + API", freq: "real-time", status: "live", upgrades: 2 },
    { name: "CyberArk", method: "API", auth: "OAuth2", freq: "hourly", status: "roadmap", upgrades: 2 },
  ]},
  { cat: "OT / Cyber-Physical", items: [
    { name: "Nozomi Guardian", method: "Syslog", auth: "Read-only sensor", freq: "real-time", status: "live", upgrades: 2 },
    { name: "Claroty", method: "API", auth: "API token", freq: "hourly", status: "roadmap", upgrades: 2 },
  ]},
  { cat: "Cloud Posture", items: [
    { name: "Microsoft Defender for Cloud", method: "API", auth: "Azure RBAC read", freq: "hourly", status: "available", upgrades: 2 },
    { name: "Wiz", method: "API", auth: "Service account", freq: "hourly", status: "roadmap", upgrades: 3 },
  ]},
  { cat: "Email & Collaboration", items: [
    { name: "Microsoft 365", method: "API", auth: "Graph OAuth2", freq: "15 min", status: "live", upgrades: 2 },
    { name: "Google Workspace", method: "API", auth: "Service account", freq: "hourly", status: "roadmap", upgrades: 2 },
  ]},
  { cat: "SIEM & Monitoring", items: [
    { name: "Microsoft Sentinel", method: "API", auth: "Azure RBAC read", freq: "hourly", status: "available", upgrades: 2 },
    { name: "Splunk", method: "API", auth: "HEC token", freq: "hourly", status: "roadmap", upgrades: 2 },
  ]},
  { cat: "Backup & Resilience", items: [
    { name: "Veeam", method: "API", auth: "API key read-only", freq: "daily", status: "live", upgrades: 1 },
    { name: "Rubrik", method: "API", auth: "Service account", freq: "daily", status: "roadmap", upgrades: 1 },
  ]},
  { cat: "ITSM & Remediation", items: [
    { name: "Jira Service Mgmt", method: "Webhook", auth: "OAuth2 + webhook", freq: "real-time", status: "live", upgrades: 1 },
    { name: "ServiceNow", method: "API", auth: "OAuth2", freq: "hourly", status: "available", upgrades: 1 },
  ]},
  { cat: "Security Awareness", items: [
    { name: "KnowBe4", method: "API", auth: "API token", freq: "weekly", status: "available", upgrades: 1 },
  ]},
  { cat: "Threat Intelligence", items: [
    { name: "Sector CERT advisories", method: "Attest", auth: "Analyst-curated", freq: "monthly", status: "live", upgrades: 0 },
    { name: "Shodan exposure watch", method: "API", auth: "API key", freq: "weekly", status: "roadmap", upgrades: 1 },
  ]},
  { cat: "Structured Uploads", items: [
    { name: "VA report upload", method: "Upload", auth: "n/a", freq: "on demand", status: "live", upgrades: 1 },
    { name: "Pentest report upload", method: "Upload", auth: "n/a", freq: "on demand", status: "live", upgrades: 1 },
    { name: "Policy / evidence attestation", method: "Attest", auth: "DPO / analyst sign-off", freq: "on demand", status: "live", upgrades: 0 },
  ]},
];

// ═════════════════════════════════════════════════════════════════════════════
// MULTI-COMPANY DEMO DATA — same engine, three sectors
// ═════════════════════════════════════════════════════════════════════════════

const VERDANT = {
  OUTLOOK: "Threat activity will track the harvest calendar — mill exposure peaks with crop intake in 10 weeks, BEC waves will follow CPO volatility, and EUDR cyber questionnaires arrive with FY27 buyer reviews.",
  ORG: { name: "Verdant Plantations Berhad", sector: "Plantation & Agri-Commodities", employees: 3200, period: "Q2 FY2026", appetite: 58, prevIndex: 70 },
  RISKS: [
    { id: "v1", name: "Ransomware on mill SCADA & weighbridge systems", crown: true, score: 74, prev: 76,
      service: "Mill Operations (6 mills)", owner: "COO",
      controls: ["c-ot-seg", "c-ot-mon", "c-backup", "c-vuln-ot"], connectors: ["nozomi", "nessus", "veeam"],
      narrative: "Weighbridge and mill-control systems run on aging Windows hosts bridged to estate IT. A halt at peak crop stops FFB intake — spoilage begins within 24 hours." },
    { id: "v2", name: "BEC targeting commodity trading desk", crown: true, score: 69, prev: 61,
      service: "Trading & Treasury", owner: "CFO",
      controls: ["c-mail", "c-mfa", "c-priv"], connectors: ["m365", "entra"],
      narrative: "Spoofed counterparty bank-detail changes during CPO price volatility. One RM 2.1m diversion attempt stopped by manual callback this quarter." },
    { id: "v3", name: "Foreign-worker biometric data breach (PDPA)", crown: true, score: 64, prev: 66,
      service: "Estate HR & Payroll", owner: "CHRO",
      controls: ["c-dlp", "c-mfa", "c-breach", "c-notice"], connectors: ["m365", "entra"],
      narrative: "28k worker records including biometrics — now sensitive personal data under PDPA 2024. Estate-level HR systems have weakest access discipline." },
    { id: "v4", name: "ESG / traceability data integrity", crown: false, score: 55, prev: 58,
      service: "Sustainability Reporting", owner: "CSO",
      controls: ["c-remed", "c-vault"], connectors: ["jira"],
      narrative: "EUDR and buyer traceability audits depend on mill-to-estate data chains; tampering or loss risks contract suspension with EU buyers." },
    { id: "v5", name: "Estate connectivity & shadow IT", crown: false, score: 51, prev: 51,
      service: "Estate Operations", owner: "CIO",
      controls: ["c-edr", "c-joiner"], connectors: ["m365"],
      narrative: "Remote estates run unmanaged devices over VSAT/4G; endpoint agent coverage in estates is 71% vs 96% at HQ." },
  ],
  SCENARIOS: [
    { id: "s1", name: "Mill halt at peak crop — 72h", low: 3.6, high: 8.4, likely: "Possible", drivers: ["FFB spoilage & throughput loss", "Recovery & OT re-commissioning", "Buyer contract penalties"], linked: "v1" },
    { id: "s2", name: "Trading BEC — funds diverted", low: 1.2, high: 3.4, likely: "Likely", drivers: ["Direct funds loss", "Counterparty dispute & legal", "Recovery uncertainty"], linked: "v2" },
    { id: "s3", name: "Worker biometric data breach", low: 1.0, high: 2.8, likely: "Possible", drivers: ["PDPA penalty (biometrics = sensitive)", "NGO/buyer scrutiny", "Remediation & monitoring"], linked: "v3" },
    { id: "s4", name: "Traceability data loss — EU buyer audit", low: 0.9, high: 4.2, likely: "Watch", drivers: ["Contract suspension exposure", "Re-certification cost", "Price discount on unverified lots"], linked: "v4" },
  ],
  REGULATORY: [
    { id: "pdpa", name: "PDPA 2024", note: "Biometrics now sensitive data", score: 58, prev: 49, domains: [["7 Principles", 61], ["DPO", 100], ["Breach Readiness", 40], ["Cross-Border", 45]] },
    { id: "act854", name: "Act 854 readiness", note: "Agriculture is an NCII sector — designation watch", score: 52, prev: 46, domains: [["Risk Assessment", 60], ["Incident Reporting", 45], ["Baseline Controls", 55]] },
    { id: "bursa", name: "Bursa cyber disclosure", note: "Listed-issuer governance", score: 71, prev: 68, domains: [["Board Oversight", 78], ["Risk Disclosure", 66], ["Incident Readiness", 69]] },
  ],
  AUDIT: [
    { id: "iso", name: "ISO 27001:2022", stage: "Gap assessment done · certification FY27", score: 54, open: [["A.8.22 Network segregation (mills)", "major"], ["A.5.16 Identity mgmt (estates)", "major"], ["A.8.13 Backup (estates)", "minor"]] },
    { id: "ia", name: "Internal Audit FY26", stage: "5 of 11 findings open", score: 66, open: [["Weighbridge access controls", "high"], ["Estate device management", "medium"], ["Trading callback procedure", "high"]] },
  ],
  NIST: [["Identify", 1.9, 2.8], ["Protect", 2.2, 2.8], ["Detect", 1.6, 2.6], ["Respond", 1.8, 2.6], ["Recover", 2.3, 2.8], ["Govern", 2.4, 3.0]],
  DECISIONS: [
    { id: "d1", type: "FUNDING", ask: "Approve RM 260k — mill OT segmentation & weighbridge hardening (6 mills)", why: "Closes the largest driver of the mill-halt scenario (RM 3.6–8.4m). Peak crop starts in 10 weeks.", due: "This meeting" },
    { id: "d2", type: "DIRECTION", ask: "Mandate out-of-band callback for all counterparty bank-detail changes", why: "Zero-cost control that neutralises the most likely loss scenario (trading BEC). Requires CFO policy sign-off, not budget.", due: "This meeting" },
    { id: "d3", type: "ACCEPTANCE", ask: "Accept estate endpoint gap until VSAT upgrade completes Q1 FY27", why: "Estate connectivity can't support full EDR today; compensating controls documented. Board acceptance makes the residual explicit.", due: "Next meeting" },
  ],
  SPEND: [["Q3 25", 180, 78], ["Q4 25", 410, 75], ["Q1 26", 690, 72], ["Q2 26", 940, 66]],
  ROI_NOTE: "Investment is earlier-stage than peers — the curve is steepening as OT and estate coverage lands.",
  INCIDENTS: { quarter: [["Phishing reported", 63], ["Malware contained", 11], ["Trading BEC attempts", 3], ["Mill OT anomalies", 5], ["Reportable breaches", 0]], mttd: [140, 110, 74, 48], mttr: [44, 38, 30, 22] },
  VENDORS: [
    { name: "AgriTrace Systems", tier: "Critical", crown: true, posture: 58, note: "Traceability platform — no audit in 18 months" },
    { name: "MillTech Services", tier: "Critical", crown: true, posture: 63, note: "OT maintenance vendor with remote access" },
    { name: "EstatePay HR", tier: "High", crown: true, posture: 70, note: "Holds worker biometrics · DPA signed" },
    { name: "VSAT Provider", tier: "Medium", crown: false, posture: 74, note: "Estate connectivity" },
  ],
  PEOPLE: {
    roles: [["CISO (group)", true], ["SecOps x2", true], ["OT Security Lead", false], ["Estate IT Leads x6", false]],
    phishing: [24.5, 19.8, 14.2, 11.6],
    spof: "No OT security ownership across 6 mills; estate IT relies on regional generalists",
  },
  RADAR: [
    { id: "t1", level: "elevated", headline: "Ransomware crews targeting agri-commodity ERP & weighbridge systems",
      global: "Multiple palm, grain and sugar processors hit across Indonesia and LatAm in the last 90 days; entry via remote-maintenance VPNs and flat OT networks.",
      relevance: "Verdant's six mills match the victim profile exactly — aging weighbridge hosts, vendor remote access, shared IT/OT paths.",
      adopt: "Fund mill segmentation (Decision #1) and restrict MillTech remote access to just-in-time sessions.",
      next: "Expect targeting to intensify at peak crop — mills are most valuable, and most pressured to pay, when FFB intake cannot stop.", prep: "exposed", linkedControl: "c-ot-seg" },
    { id: "t2", level: "rising", headline: "BEC waves timed to commodity price volatility",
      global: "Regional CERTs report spoofed counterparty payment-change requests spiking during CPO and grain price swings — attackers monitor the same markets you trade.",
      relevance: "Three attempts this quarter align with CPO volatility windows; trading desk is the target surface.",
      adopt: "Adopt mandatory callback verification (Decision #2) — the control is procedural and free.",
      next: "CPO volatility is forecast to continue into Q4 — more BEC windows; the callback policy will be tested within weeks of adoption.", prep: "partial", linkedControl: "c-mail" },
    { id: "t3", level: "watch", headline: "EU buyers auditing supplier cyber posture under EUDR",
      global: "European buyers extending deforestation due-diligence audits into data-integrity and cyber controls on traceability chains.",
      relevance: "Two of Verdant's top-5 buyers have added cyber questionnaires to FY27 supplier reviews.",
      adopt: "Fold traceability-chain controls into the ISO 27001 scope now to answer once, not per buyer.",
      next: "Cyber sections become mandatory in two top-5 buyers' FY27 supplier audits — expect the first questionnaires in Q1.", prep: "partial", linkedControl: "c-remed" },
  ],
  INITIATIVES: [
    { name: "HQ & trading EDR rollout", spend: 280, effect: "HQ endpoint risk −8 pts", metric: "96% coverage at HQ (estates next)" },
    { name: "Awareness programme (BM + estate languages)", spend: 110, effect: "Phishing clicks 24.5% → 11.6%", metric: "3 BEC attempts reported by staff" },
    { name: "Backup immutability (mills)", spend: 210, effect: "Mill recovery ready", metric: "4 of 6 mills restore-tested" },
    { name: "DPO office & PDPA programme", spend: 90, effect: "PDPA readiness 49% → 58%", metric: "Biometric data register complete" },
  ],
  REG_VERDICT: {
    pdpa: "If the Commissioner inquired today: DPO and register are defensible, but biometric-data safeguards at estate level would draw findings — remediation is scoped and funded.",
    act854: "If Agriculture-sector NCII designation lands: we could evidence a risk assessment within 30 days, but incident-reporting readiness would not yet meet the 6-hour initial notification bar.",
    bursa: "If Bursa queried disclosure today: board oversight and this reporting pack are defensible; incident-readiness language in the annual report needs updating.",
  },
  IFASKED: {
    v1: { q: "Why are the mills still exposed after last year's IT spend?", a: "Last year's spend deliberately secured HQ, trading and identity first — those are now green. Mills were sequenced second because segmentation needs the harvest-季 downtime window; Decision #1 funds it before peak crop." },
    v2: { q: "Can't the bank just stop fraudulent transfers?", a: "Banks recover less than a third of diverted funds regionally. The effective control is ours: mandatory callback on bank-detail changes — Decision #2, zero cost, board mandate today." },
    v3: { q: "Why do worker biometrics matter to the board?", a: "The 2024 PDPA amendment reclassified biometrics as sensitive data — penalties and notification duties now apply at the RM 1m ceiling, and buyer ESG audits increasingly ask about worker-data protection." },
    d1: { q: "Why RM 260k now rather than phased over two years?", a: "Peak crop starts in 10 weeks — the exposure window is RM 3.6–8.4m per event. Deferral means the board formally carries that through the highest-throughput quarter." },
    d2: { q: "Why does a callback policy need board time?", a: "Because it binds the CFO's own team to a friction step during fast trading windows — it holds only if the board mandates it explicitly." },
    d3: { q: "Why accept the estate gap rather than fix it?", a: "Full EDR needs bandwidth the estates won't have until the VSAT upgrade in Q1. Compensating controls are in place; acceptance makes the residual explicit and time-boxed." },
  },
};

const AMANAH = {
  OUTLOOK: "Double-extortion against insurers is expected to reach Malaysia within 1–2 quarters, regulator focus on TPA accountability sharpens ahead of the FY27 composite review, and SMS-OTP retirement is becoming a sector norm.",
  ORG: { name: "Amanah General Insurance Berhad", sector: "General Insurance (BNM-regulated)", employees: 1150, period: "Q2 FY2026", appetite: 55, prevIndex: 64 },
  RISKS: [
    { id: "a1", name: "Policyholder & claims data breach (incl. medical)", crown: true, score: 68, prev: 70,
      service: "Core Policy Admin & Claims", owner: "CIO",
      controls: ["c-dlp", "c-mfa", "c-breach", "c-notice"], connectors: ["m365", "entra"],
      narrative: "1.3m policyholder records with health and financial data — sensitive under PDPA and a BNM-reportable event. Legacy core makes field-level protection hard." },
    { id: "a2", name: "Ransomware on legacy core insurance system", crown: true, score: 66, prev: 69,
      service: "Core Policy Admin", owner: "CIO",
      controls: ["c-backup", "c-vuln", "c-patch"], connectors: ["rapid7", "veeam"],
      narrative: "The 14-year-old core runs on extended-support infrastructure. An outage halts policy issuance and claims payment — a customer-visible, BNM-notifiable event within hours." },
    { id: "a3", name: "TPA / outsourced claims-processor compromise", crown: true, score: 61, prev: 55,
      service: "Claims Outsourcing", owner: "COO",
      controls: ["c-xborder", "c-dlp"], connectors: [],
      narrative: "Two TPAs process 40% of claims with full data access. BNM outsourcing rules hold Amanah accountable for their controls; one TPA has declined an audit twice." },
    { id: "a4", name: "Credential stuffing on customer & agent portals", crown: false, score: 57, prev: 62,
      service: "Digital Channels", owner: "Head of Digital",
      controls: ["c-mfa", "c-edr"], connectors: ["entra", "m365"],
      narrative: "Portal attacks track regional breach dumps. MFA rollout cut successful takeovers to near zero; agent portal remains on OTP-SMS." },
    { id: "a5", name: "Payment fraud via compromised agent accounts", crown: false, score: 49, prev: 53,
      service: "Agency Network", owner: "CFO",
      controls: ["c-priv", "c-joiner", "c-mail"], connectors: ["pam", "entra"],
      narrative: "Dormant agent accounts were the entry point in two attempted premium-diversion cases; deprovisioning automation now covers 88% of the agency network." },
  ],
  SCENARIOS: [
    { id: "s1", name: "Claims data breach — 1.3m records", low: 2.4, high: 6.8, likely: "Possible", drivers: ["PDPA penalty + BNM action", "Notification & credit monitoring", "Churn & new-business impact"], linked: "a1" },
    { id: "s2", name: "Core system ransomware — 5-day outage", low: 3.1, high: 7.9, likely: "Possible", drivers: ["Claims-payment SLA breaches", "Recovery & forensics", "BNM supervisory response"], linked: "a2" },
    { id: "s3", name: "TPA breach with Amanah data", low: 1.1, high: 3.6, likely: "Likely", drivers: ["Joint PDPA liability", "Contract termination & re-platforming", "Regulatory findings on outsourcing"], linked: "a3" },
    { id: "s4", name: "Mass account takeover — agent portal", low: 0.5, high: 1.8, likely: "Watch", drivers: ["Fraudulent policy changes", "Agent trust & remediation", "Fraud losses"], linked: "a4" },
  ],
  REGULATORY: [
    { id: "rmit", name: "BNM RMiT", note: "Full scope — licensed insurer", score: 77, prev: 73, domains: [["Governance", 85], ["Access Control", 74], ["Network & Ops", 70], ["Incident Mgmt", 80], ["Third Party", 64]] },
    { id: "pdpa", name: "PDPA 2024", note: "Health data = sensitive", score: 70, prev: 62, domains: [["7 Principles", 74], ["DPO", 100], ["Breach Readiness", 58], ["Cross-Border", 55]] },
    { id: "orr", name: "BNM Outsourcing & BCM", note: "TPA and resilience obligations", score: 66, prev: 63, domains: [["Outsourcing Register", 78], ["TPA Assurance", 52], ["BCM & DR", 68]] },
  ],
  AUDIT: [
    { id: "iso", name: "ISO 27001:2022", stage: "Certified · surveillance audit Q3", score: 83, open: [["A.5.19 Supplier security (TPAs)", "major"], ["A.8.8 Legacy patching", "minor"]] },
    { id: "ia", name: "Internal Audit FY26", stage: "2 of 9 findings open", score: 84, open: [["TPA audit rights unexercised", "high"], ["Agent-portal MFA gap", "medium"]] },
  ],
  NIST: [["Identify", 2.8, 3.2], ["Protect", 2.9, 3.2], ["Detect", 2.5, 3.0], ["Respond", 2.7, 3.0], ["Recover", 2.8, 3.2], ["Govern", 3.1, 3.4]],
  DECISIONS: [
    { id: "d1", type: "FUNDING", ask: "Approve RM 320k — core-system ransomware resilience (immutable backup + recovery runway)", why: "Cuts the worst-case core-outage scenario (RM 3.1–7.9m) and answers BNM's resilience expectations ahead of the FY27 composite review.", due: "This meeting" },
    { id: "d2", type: "DIRECTION", ask: "Mandate exercise of audit rights on both TPAs within 90 days", why: "One TPA has declined twice; BNM holds us accountable regardless. A board mandate converts a stalled negotiation into a compliance requirement.", due: "This meeting" },
    { id: "d3", type: "FUNDING", ask: "Approve RM 90k — agent-portal MFA upgrade (retire OTP-SMS)", why: "Closes the account-takeover path and an open internal-audit finding before the surveillance audit.", due: "Next meeting" },
  ],
  SPEND: [["Q3 25", 420, 68], ["Q4 25", 830, 66], ["Q1 26", 1260, 63], ["Q2 26", 1580, 60]],
  ROI_NOTE: "Mature programme — marginal returns now come from resilience and third-party assurance rather than new tooling.",
  INCIDENTS: { quarter: [["Phishing reported", 55], ["Malware contained", 4], ["Portal takeover attempts", 210], ["TPA incidents notified", 1], ["Reportable breaches", 0]], mttd: [60, 44, 30, 18], mttr: [24, 20, 15, 11] },
  VENDORS: [
    { name: "ClaimServe TPA", tier: "Critical", crown: true, posture: 51, note: "Declined audit twice · 40% of claims" },
    { name: "MediAssist TPA", tier: "Critical", crown: true, posture: 72, note: "ISO certified · audit scheduled" },
    { name: "CoreSys Maintenance", tier: "Critical", crown: true, posture: 68, note: "Legacy core vendor · remote access" },
    { name: "CloudDoc Archive", tier: "High", crown: false, posture: 79, note: "Policy document store · DPA signed" },
  ],
  PEOPLE: {
    roles: [["CISO", true], ["SecOps x4", true], ["GRC & Compliance x2", true], ["Third-Party Risk Lead", false]],
    phishing: [12.4, 9.6, 7.2, 5.8],
    spof: "TPA assurance depends on one procurement manager with no security background",
  },
  RADAR: [
    { id: "t1", level: "elevated", headline: "Extortion groups exfiltrating insurer claims files before encrypting",
      global: "Insurers in Australia, Japan and Europe hit by double-extortion targeting claims databases — health records command premium leverage in negotiation.",
      relevance: "Amanah's claims store matches the target profile: large, health-rich, on legacy infrastructure.",
      adopt: "Fund core resilience (Decision #1) and prioritise DLP alerting on bulk claims-data reads.",
      next: "Claims-data extortion is expected to reach Malaysian insurers within 1–2 quarters — prudent to assume we are on target lists now.", prep: "partial", linkedControl: "c-dlp" },
    { id: "t2", level: "rising", headline: "Regulators regionally tightening outsourcing accountability",
      global: "MAS, APRA and BNM peers issuing findings against insurers for unexercised audit rights over TPAs — 'you outsourced the work, not the accountability.'",
      relevance: "ClaimServe has declined audit twice; this is exactly the fact pattern regulators are penalising.",
      adopt: "Board mandate to exercise audit rights (Decision #2) — converts negotiation into requirement.",
      next: "Outsourcing assurance is expected to feature in the FY27 composite review — unexercised audit rights will be indefensible by then.", prep: "exposed", linkedControl: "c-xborder" },
    { id: "t3", level: "watch", headline: "Credential-stuffing kits now bundle Malaysian telco OTP-interception",
      global: "Commodity attack kits circulating with SIM-swap and OTP-relay modules targeting SMS-based authentication across SEA financial services.",
      relevance: "The agent portal still authenticates via OTP-SMS — the exact channel these kits defeat.",
      adopt: "Approve the MFA upgrade (Decision #3) and retire SMS OTP for agents.",
      next: "OTP-interception kits are commoditising — expect agent-portal attacks to escalate from opportunistic to scripted within months.", prep: "partial", linkedControl: "c-mfa" },
  ],
  INITIATIVES: [
    { name: "Customer-portal MFA (approved Q3 25)", spend: 140, effect: "Account takeovers −94%", metric: "210 attempts, 0 successes this qtr" },
    { name: "SOC uplift & detection tuning", spend: 380, effect: "Detection 60h → 18h", metric: "MTTR down to 11h" },
    { name: "PDPA programme & DPO office", spend: 120, effect: "PDPA readiness 62% → 70%", metric: "Breach runbook drafted, drill scheduled" },
    { name: "Deprovisioning automation (agents)", spend: 95, effect: "Insider/agent risk −4 pts", metric: "88% of agency auto-deprovisioned" },
  ],
  REG_VERDICT: {
    rmit: "If BNM inspected today: strong on governance and incident management; expect findings on third-party assurance (ClaimServe) and legacy patching — both on today's decision list.",
    pdpa: "If the Commissioner inquired today: DPO, register and notices are defensible; breach-drill evidence is the gap and is scheduled this quarter.",
    orr: "If BNM reviewed outsourcing today: the register is complete, but unexercised audit rights over a critical TPA would be an immediate finding — Decision #2 addresses this.",
  },
  IFASKED: {
    a1: { q: "Are we more exposed than other insurers?", a: "Our data sensitivity is sector-standard; our differentiator is the legacy core, which is why resilience (Decision #1) leads today's asks rather than another perimeter tool." },
    a2: { q: "Why not just replace the core system?", a: "Core replacement is a 3-year, RM 40m+ programme already in strategic planning. Decision #1 buys certain recovery in the meantime for RM 320k — insurance on the insurance company." },
    a3: { q: "If the TPA refuses audit again, then what?", a: "With a board mandate, refusal becomes a contractual breach and triggers exit planning — and we can evidence to BNM that accountability was enforced, not just documented." },
    d1: { q: "Why RM 320k when we already pay for backups?", a: "Current backups are online and reachable by an attacker with admin access — the exact gap exploited in recent insurer cases. Immutability plus a tested recovery runway is what converts backup from checkbox to survivability." },
    d2: { q: "Won't forcing an audit damage the TPA relationship?", a: "BNM holds us accountable either way. A board mandate depersonalises it — it's a regulatory requirement we pass through, and the relationship risk of a breach is far larger." },
    d3: { q: "Why prioritise agents over customers?", a: "Customers already have app-based MFA — takeovers dropped 94%. Agents are now the weakest authentication path and hold broader policy-change rights than any single customer." },
  },
};

// meridian bundle from existing top-level consts
const OUTLOOK_MERIDIAN = "Ransomware pressure on ports peaks with Q4 volumes and BEC keeps rising sector-wide — the OT segmentation decision determines whether Meridian enters peak season inside appetite.";

export const COMPANIES = {
  meridian: { id: "meridian", label: "Meridian Logistics (Ports)", OUTLOOK: OUTLOOK_MERIDIAN, ORG, RISKS, SCENARIOS, REGULATORY, AUDIT, NIST, DECISIONS, SPEND, ROI_NOTE: "Each RM 100k invested this year removed ~1.4 risk-index points — efficiency improving quarter on quarter.", INCIDENTS, VENDORS, PEOPLE, RADAR, INITIATIVES, REG_VERDICT, IFASKED },
  verdant: { id: "verdant", label: "Verdant Plantations (Agri)", ...VERDANT },
  amanah: { id: "amanah", label: "Amanah General (Insurance)", ...AMANAH },
};
