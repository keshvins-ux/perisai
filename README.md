# Perisai — Cyber Risk & Compliance Intelligence (Demo)

Fully interactive demo platform with mock data for **Meridian Logistics Sdn Bhd** (fictional).
One engine, two modules: risk + compliance, computed from the same control-evidence core.

## Views

| Tab | Purpose |
|---|---|
| **Board View** | The terminal artefact: risk vs appetite, compliance position, confidence strip, decisions required, scenario exposure (RM ranges), investment ROI, incidents, third-party, people. Click any risk for full lineage (signal → asset → control → obligation). |
| **Risk Module** | Full risk register with crown-jewel filter, movement, live-fed vs attested confidence. |
| **Compliance Module** | BNM RMiT · SC GTRM · PDPA 2024 · ISO 27001 · Internal Audit · NIST CSF benchmark. |
| **Admin & Architecture** | TOGAF-style layered view, connector health, device connectivity %, log-visibility gaps. |

## The demo moment

In **Admin & Architecture**, click any connector (e.g. Rapid7) to disconnect it, then return to **Board View**:
estate visibility drops, evidence chips downgrade from *machine-verified* to *attested*, affected risks
show "reduced visibility," and the risk index rises with an uncertainty penalty. That is the
confidence-lineage story in one click.

## Structure note

All source files are intentionally at the **root level** (no `src/` folder) so the project can be
drag-and-drop uploaded to GitHub's web interface without any risk of folder flattening.
Vite handles this layout natively.

## Run locally

```bash
npm install
npm run dev
```

## Deploy (GitHub + Vercel)

1. Create a new GitHub repo, then from this folder:
   ```bash
   git init && git add -A && git commit -m "Perisai demo"
   git branch -M main
   git remote add origin https://github.com/<you>/perisai-demo.git
   git push -u origin main
   ```
2. In [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. Framework preset: **Vite** (auto-detected). Build command `npm run build`, output `dist`. Deploy.

No environment variables, no backend — everything is client-side mock data.

## Notes

- All data is fictional. Footer carries the "monitoring & readiness only — not certification or legal advice" line; keep it in any client-facing deployment.
- Mock data lives in `data.js` — one file to edit to re-theme the demo for a different prospect (org name, sector, risks, connectors).
