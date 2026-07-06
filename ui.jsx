:root{
  --ink:#0c1215; --panel:#121b20; --panel2:#16222a; --line:#26353d;
  --text:#e9efea; --muted:#90a49b; --dim:#637269;
  --em:#4fc99a; --am:#e6a94e; --co:#e8616f; --accent:#5fd0c4;
  --ui:'Hanken Grotesk',sans-serif; --disp:'Fraunces',serif; --mono:'Spline Sans Mono',monospace;
}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:var(--ui);background:
  radial-gradient(1200px 500px at 80% -10%, rgba(95,208,196,.06), transparent 60%),
  var(--ink);color:var(--text);min-height:100vh}
small{font-size:.72em}
button{font-family:var(--ui)}
.rise{animation:rise .55s cubic-bezier(.2,.7,.2,1) both}
@keyframes rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}

/* chrome */
.topbar{display:flex;justify-content:space-between;align-items:center;padding:18px 28px;
  border-bottom:1px solid var(--line);background:linear-gradient(180deg,rgba(255,255,255,.02),transparent)}
.brand{display:flex;align-items:center;gap:11px}
.shield{color:var(--accent);font-size:20px}
.wordmark{font-family:var(--disp);font-weight:600;font-size:24px;letter-spacing:.5px}
.tag{font-family:var(--mono);font-size:9.5px;color:var(--dim);letter-spacing:2px;border:1px solid var(--line);padding:4px 8px;border-radius:5px}
.org{text-align:right}
.org-name{font-weight:600;font-size:14px}
.org-meta{font-size:11px;color:var(--muted);font-family:var(--mono)}
.tabs{display:flex;gap:4px;padding:14px 28px 0;align-items:center}
.tab{font-size:13px;font-weight:600;color:var(--muted);background:none;border:none;padding:9px 16px;border-radius:8px 8px 0 0;cursor:pointer;transition:.2s}
.tab:hover{color:var(--text)}
.tab.on{color:var(--ink);background:var(--accent)}
.tab-strip{margin-left:auto;display:flex;gap:16px;font-size:11.5px;color:var(--muted);font-family:var(--mono)}
.stage{padding:22px 28px}
.foot{padding:10px 28px 26px;font-size:10.5px;color:var(--dim);font-family:var(--mono)}

/* layout */
.grid{display:grid;grid-template-columns:repeat(12,1fr);gap:16px}
.card{background:linear-gradient(180deg,var(--panel2),var(--panel));border:1px solid var(--line);border-radius:16px;padding:20px;min-width:0}
.span4{grid-column:span 4}.span5{grid-column:span 5}.span7{grid-column:span 7}.span12{grid-column:span 12}
@media(max-width:900px){.grid{grid-template-columns:1fr}.span4,.span5,.span7,.span12{grid-column:1}}
.eyebrow{font-family:var(--mono);font-size:10.5px;letter-spacing:1.8px;text-transform:uppercase;color:var(--dim);margin-bottom:14px}
.eyebrow.row{display:flex;justify-content:space-between;align-items:center;gap:10px}
.ghost{background:none;border:1px solid var(--line);color:var(--muted);font-size:11px;padding:5px 10px;border-radius:7px;cursor:pointer;transition:.2s}
.ghost:hover{border-color:var(--accent);color:var(--accent)}
.footnote{font-size:10.5px;color:var(--dim);margin-top:12px;font-family:var(--mono)}
.minitabs{display:flex;gap:4px}
.minitabs button{background:none;border:1px solid var(--line);color:var(--muted);font-size:11px;padding:4px 10px;border-radius:7px;cursor:pointer}
.minitabs button.on{background:var(--accent);color:var(--ink);border-color:var(--accent);font-weight:700}

/* primitives */
.g-track{fill:none;stroke:var(--line)}
.donut{position:relative;flex:none}
.donut-num{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:var(--disp);font-size:34px;font-weight:500}
.spark{display:block}
.delta{font-size:11px;font-family:var(--mono)}
.delta.flat{color:var(--dim)}
.sevtag{font-family:var(--mono);font-size:10px;text-transform:uppercase;letter-spacing:.5px;border:1px solid;border-radius:6px;padding:3px 8px;white-space:nowrap}
.mbar{display:inline-block;width:90px;background:var(--line);border-radius:4px;overflow:hidden;vertical-align:middle}
.mbar span{display:block;height:100%;border-radius:4px;transition:width .5s}
.chip{font-size:10.5px;font-family:var(--mono);display:inline-flex;align-items:center;gap:5px;border:1px solid var(--line);padding:4px 8px;border-radius:6px}
.chip i{width:7px;height:7px;border-radius:50%}

/* headline */
.headline{display:flex;gap:18px;align-items:center}
.head-big{font-family:var(--disp);font-size:21px;font-weight:600;letter-spacing:.5px}
.head-sub{font-size:12px;color:var(--muted);margin:4px 0 6px}
.conf-strip{display:flex;flex-direction:column;gap:9px}
.conf-line{display:flex;align-items:center;gap:10px;font-size:12px;color:var(--muted)}
.conf-line span{flex:1}
.conf-line .mbar{flex:1.2}
.conf-chips{display:flex;gap:6px;flex-wrap:wrap;margin-top:2px}
.blindwarn{font-size:11px;color:var(--am);border:1px dashed var(--am);border-radius:8px;padding:7px 10px;margin-top:6px}

/* decisions */
.decisions{border-color:var(--accent)}
.dec-row{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
@media(max-width:900px){.dec-row{grid-template-columns:1fr}}
.dec{border:1px solid var(--line);border-radius:12px;padding:14px;display:flex;flex-direction:column;gap:8px}
.dec-ask{font-size:13.5px;font-weight:700;line-height:1.35}
.dec-why{font-size:11.5px;color:var(--muted);line-height:1.5;flex:1}
.dec-due{font-family:var(--mono);font-size:10px;color:var(--accent)}

/* crown split */
.cj-split{display:grid;grid-template-columns:1fr 1fr;gap:14px}
@media(max-width:900px){.cj-split{grid-template-columns:1fr}}
.cj-box{border:1px solid var(--line);border-radius:12px;padding:12px}
.cj-h{font-size:12px;color:var(--muted);display:flex;justify-content:space-between;margin-bottom:8px}
.cj-h b{font-family:var(--disp);font-size:18px}
.riskrow{width:100%;display:flex;align-items:center;gap:10px;background:none;border:none;border-top:1px dashed var(--line);
  padding:9px 2px;cursor:pointer;color:var(--text);text-align:left;transition:.15s}
.riskrow:hover{background:rgba(255,255,255,.02)}
.rr-name{flex:1;font-size:12.5px;font-weight:600}
.deg{font-style:normal;color:var(--am);font-size:10px;font-family:var(--mono)}
.riskrow b{font-family:var(--disp);font-size:17px;width:34px;text-align:right}

/* scenarios */
.scen{width:100%;background:none;border:none;border-top:1px dashed var(--line);padding:11px 2px;cursor:pointer;color:var(--text);text-align:left}
.scen:first-of-type{border-top:none}
.scen:hover{background:rgba(255,255,255,.02)}
.scen-top{display:flex;justify-content:space-between;align-items:baseline}
.scen-name{font-size:12.5px;font-weight:600}
.scen-range{font-family:var(--disp);font-size:15px;color:var(--am)}
.scen-bar{position:relative;height:7px;background:var(--line);border-radius:4px;margin:7px 0 5px;overflow:hidden}
.scen-bar span{position:absolute;top:0;bottom:0;background:linear-gradient(90deg,var(--am),var(--co));border-radius:4px}
.scen-bar.big{height:10px}
.scen-drv{font-size:10.5px;color:var(--muted);font-family:var(--mono)}
.scen-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
@media(max-width:900px){.scen-grid{grid-template-columns:1fr}}
.scen-card{border:1px solid var(--line);border-radius:12px;padding:14px}
.scen-big{font-family:var(--disp);font-size:20px;color:var(--am);margin:6px 0}

/* compliance */
.fw{border-top:1px dashed var(--line);padding:11px 0}
.fw:first-of-type{border-top:none;padding-top:0}
.fw-head{display:flex;align-items:center;gap:12px}
.fw-name{flex:1;font-size:13px;font-weight:600;display:flex;flex-direction:column}
.fw-name small{color:var(--muted);font-weight:400}
.fw-head b{font-family:var(--disp);font-size:19px}
.fw-doms{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}
.dom{font-size:10.5px;color:var(--muted);border:1px solid;border-radius:6px;padding:3px 8px}
.nist-row{display:flex;align-items:center;gap:10px;padding:6px 0}
.nist-fn{width:70px;font-size:12px;color:var(--muted)}
.nist-track{flex:1;position:relative;height:9px;background:var(--line);border-radius:5px}
.nist-cur{position:absolute;top:0;bottom:0;left:0;border-radius:5px}
.nist-tgt{position:absolute;top:-3px;bottom:-3px;width:2px;background:var(--text)}
.nist-peer{position:absolute;top:50%;width:6px;height:6px;border:1px solid var(--dim);border-radius:50%;transform:translate(-50%,-50%);background:var(--ink)}
.nist-val{font-family:var(--disp);font-size:14px;width:74px;text-align:right}
.comp-head{display:flex;align-items:baseline;gap:12px}
.comp-score{font-family:var(--disp);font-size:38px;font-weight:500}
.comp-note{color:var(--muted);display:block;margin:2px 0 10px}
.dom-row{display:flex;align-items:center;gap:10px;padding:6px 0;font-size:12px;color:var(--muted)}
.dom-row span{flex:1}
.dom-row .mbar{flex:1.3}
.pdpa-row{display:flex;align-items:center;gap:10px;border-top:1px dashed var(--line);padding:9px 0}
.pdpa-row:first-of-type{border-top:none}
.pdpa-name{flex:1;font-size:12px;font-weight:600;display:flex;flex-direction:column}
.pdpa-name small{color:var(--muted);font-weight:400}

/* roi / incidents / vendors / people */
.roi{display:flex;gap:18px}
.roi-col{flex:1}
.roi-num{font-family:var(--disp);font-size:26px}
.roi-lab{font-size:10.5px;color:var(--muted);font-family:var(--mono);margin:2px 0 8px}
.roi-verdict{font-size:12px;color:var(--muted);border-top:1px dashed var(--line);margin-top:12px;padding-top:10px;line-height:1.5}
.inc-row{display:flex;justify-content:space-between;font-size:12.5px;color:var(--muted);padding:6px 0;border-bottom:1px dashed var(--line)}
.inc-row b{font-family:var(--disp);font-size:15px}
.inc-mt{display:flex;gap:14px;margin-top:10px}
.inc-mt div{flex:1;display:flex;flex-direction:column;gap:3px}
.inc-mt small{color:var(--dim);font-family:var(--mono);font-size:9.5px}
.inc-mt b{font-family:var(--disp)}
.ven{display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px dashed var(--line)}
.ven:last-child{border:none}
.ven-l{flex:1;display:flex;flex-direction:column}
.ven-name{font-size:12.5px;font-weight:600}
.ven-l small{color:var(--muted)}
.ven b{font-family:var(--disp);width:28px;text-align:right}
.ppl-roles{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px}
.ppl-phish{display:flex;align-items:center;gap:10px;font-size:11px;color:var(--muted)}
.ppl-phish small{flex:1;font-family:var(--mono)}
.ppl-phish b{font-family:var(--disp);font-size:16px;color:var(--em)}

/* register (risk module) */
.reg-cols{display:grid;grid-template-columns:2.6fr 1fr .9fr .5fr 1.2fr;gap:14px;padding:0 10px 8px;
  font-family:var(--mono);font-size:10px;letter-spacing:1.4px;text-transform:uppercase;color:var(--dim)}
.reg-row{display:grid;grid-template-columns:2.6fr 1fr .9fr .5fr 1.2fr;gap:14px;padding:14px 10px;border-top:1px solid var(--line);align-items:start}
.rr-h{font-size:13.5px;font-weight:600;margin-bottom:4px}
.rr-risk{font-size:11.5px;color:var(--muted);line-height:1.45}
.rr-svc{font-size:12px;display:flex;flex-direction:column}
.rr-svc small{color:var(--muted)}
.rr-score{font-family:var(--disp);font-size:22px}
@media(max-width:900px){.reg-cols{display:none}.reg-row{grid-template-columns:1fr;gap:6px}}

/* admin — TOGAF */
.togaf{display:flex;flex-direction:column;gap:2px}
.layer{border:1px solid var(--line);border-radius:12px;padding:12px 14px;display:flex;gap:16px;align-items:flex-start;position:relative}
.layer-biz{border-color:rgba(95,208,196,.45)}
.layer-app{border-color:rgba(230,169,78,.45);background:linear-gradient(180deg,rgba(230,169,78,.05),transparent)}
.layer-data{border-color:rgba(79,201,154,.45)}
.layer-tech{border-color:var(--line)}
.layer-tab{width:150px;flex:none;font-size:12px;font-weight:700;display:flex;flex-direction:column;gap:2px;padding-top:4px}
.layer-tab small{color:var(--muted);font-weight:400}
.layer-boxes{display:flex;gap:8px;flex-wrap:wrap;flex:1}
.abox{border:1px solid var(--line);border-radius:9px;padding:8px 12px;font-size:11.5px;color:var(--text);background:var(--panel)}
.layer-app .abox{border-color:rgba(230,169,78,.5);font-weight:600}
.abox.conn{cursor:pointer;display:flex;flex-direction:column;align-items:flex-start;gap:2px;transition:.2s;position:relative;padding-left:24px}
.abox.conn small{color:var(--muted);font-family:var(--mono);font-size:9px}
.conndot{position:absolute;left:9px;top:12px;width:8px;height:8px;border-radius:50%}
.abox.conn.live .conndot{background:var(--em);box-shadow:0 0 8px var(--em);animation:pulse 2s infinite}
.abox.conn.dead{opacity:.55;border-style:dashed}
.abox.conn.dead .conndot{background:var(--co)}
@keyframes pulse{50%{opacity:.5}}
.layer-flow{position:absolute;bottom:-13px;left:50%;color:var(--dim);font-size:11px;z-index:2}

/* admin — connector table */
.conn-cols{display:grid;grid-template-columns:1.6fr 1.1fr 1.1fr .6fr .8fr;gap:12px;padding:0 8px 8px;
  font-family:var(--mono);font-size:10px;letter-spacing:1.2px;text-transform:uppercase;color:var(--dim)}
.conn-row{display:grid;grid-template-columns:1.6fr 1.1fr 1.1fr .6fr .8fr;gap:12px;padding:11px 8px;border-top:1px solid var(--line);align-items:center}
.conn-row.off{opacity:.5}
.cr-name{font-size:12.5px;font-weight:600;display:flex;flex-direction:column}
.cr-name small{color:var(--muted);font-weight:400}
.cr-method{font-family:var(--mono);font-size:10px;color:var(--muted)}
.cr-dev{display:flex;align-items:center;gap:8px;font-size:11px}
.cr-log{font-family:var(--disp);font-size:15px}
.switch{display:flex;align-items:center;gap:7px;background:none;border:1px solid var(--line);border-radius:8px;
  padding:6px 10px;color:var(--muted);font-size:11px;cursor:pointer;transition:.2s}
.switch i{width:22px;height:12px;border-radius:7px;background:var(--line);position:relative;transition:.2s}
.switch i::after{content:"";position:absolute;top:2px;left:2px;width:8px;height:8px;border-radius:50%;background:var(--dim);transition:.2s}
.switch.on{border-color:var(--em);color:var(--em)}
.switch.on i{background:rgba(79,201,154,.3)}
.switch.on i::after{left:12px;background:var(--em)}
@media(max-width:900px){.conn-cols{display:none}.conn-row{grid-template-columns:1fr 1fr;gap:8px}}

/* admin — gaps & control grid */
.gap-row{display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px dashed var(--line)}
.gap-name{flex:1;font-size:12px;font-weight:600;display:flex;flex-direction:column}
.gap-name small{color:var(--muted);font-weight:400}
.gap-row b{font-family:var(--disp);width:44px;text-align:right}
.gap-row.dead{opacity:.8}
.gap-sum{display:flex;gap:18px;margin-top:14px;font-size:12px;color:var(--muted)}
.gap-sum b{font-family:var(--disp);font-size:17px;margin-left:6px}
.ctl-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px}
.ctl-card{border:1px solid;border-radius:10px;padding:11px;display:flex;flex-direction:column;gap:7px;align-items:flex-start;
  background:var(--panel)}
.ctl-name{font-size:11.5px;font-weight:600;line-height:1.35}
.ctl-maps{display:flex;flex-direction:column;gap:1px}
.ctl-maps small{color:var(--dim);font-family:var(--mono);font-size:9px}

/* modal / lineage */
.modal-veil{position:fixed;inset:0;background:rgba(6,10,12,.75);backdrop-filter:blur(3px);display:flex;align-items:center;justify-content:center;z-index:50;padding:20px}
.modal{background:var(--panel2);border:1px solid var(--line);border-radius:18px;padding:26px;max-width:980px;width:100%;max-height:88vh;overflow:auto;position:relative}
.modal-x{position:absolute;top:14px;right:16px;background:none;border:none;color:var(--muted);font-size:15px;cursor:pointer}
.lineage h2{font-family:var(--disp);font-weight:500;font-size:22px;margin-bottom:6px}
.lin-narr{font-size:13px;color:var(--muted);line-height:1.55;margin-bottom:16px;max-width:70ch}
.lin-chain{display:flex;gap:10px;align-items:stretch;flex-wrap:wrap}
.lin-step{flex:1;min-width:190px;border:1px solid var(--line);border-radius:12px;padding:12px}
.lin-h{font-family:var(--mono);font-size:9.5px;letter-spacing:1.4px;text-transform:uppercase;color:var(--accent);margin-bottom:8px}
.lin-item{font-size:11.5px;color:var(--text);padding:3px 0;display:flex;align-items:center;gap:6px;line-height:1.4}
.lin-item small{color:var(--muted)}
.lin-dot{width:7px;height:7px;border-radius:50%;flex:none}
.lin-arrow{align-self:center;color:var(--dim)}
.lin-verdict{margin-top:16px;border-top:1px dashed var(--line);padding-top:12px;font-size:12.5px;color:var(--muted)}
.lin-verdict b{color:var(--text)}
