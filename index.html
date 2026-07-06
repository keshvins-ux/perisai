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
  appetite: 62, // board-approved risk appetite threshold (index 0–100, lower = safer)
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
export function computePlatformState(enabled) {
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
  const riskState = RISKS.map((r) => {
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
