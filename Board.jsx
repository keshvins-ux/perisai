import React from "react";

export const Eyebrow = ({ children, right }) => (
  <div className="eyebrow row">{children}{right}</div>
);

export const Card = ({ span, delay = 0, children, className = "" }) => (
  <section className={`card rise ${span ? `span${span}` : ""} ${className}`}
    style={{ animationDelay: `${delay}ms` }}>{children}</section>
);

export function Spark({ data, w = 120, h = 34, color = "var(--accent)", invert = false }) {
  const min = Math.min(...data), max = Math.max(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * (w - 6) + 3;
    const norm = max === min ? 0.5 : (v - min) / (max - min);
    const y = invert ? 3 + norm * (h - 8) : h - 4 - norm * (h - 8);
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={w} height={h} className="spark">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx={pts.split(" ").pop().split(",")[0]} cy={pts.split(" ").pop().split(",")[1]} r="3" fill={color} />
    </svg>
  );
}

export function Donut({ value, size = 130, color = "var(--em)", label }) {
  const r = size / 2 - 10, c = 2 * Math.PI * r;
  return (
    <div className="donut" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} className="g-track" strokeWidth="9" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth="9" strokeLinecap="round"
          style={{ stroke: color, strokeDasharray: c, strokeDashoffset: c * (1 - value / 100), transition: "stroke-dashoffset .8s cubic-bezier(.2,.7,.2,1), stroke .4s" }} />
      </svg>
      <div className="donut-num" style={{ color }}>{value}<small>{label || "%"}</small></div>
    </div>
  );
}

export const Delta = ({ now, prev, goodDown = true }) => {
  const d = now - prev;
  if (d === 0) return <span className="delta flat">— steady</span>;
  const improving = goodDown ? d < 0 : d > 0;
  return (
    <span className="delta" style={{ color: improving ? "var(--em)" : "var(--co)" }}>
      {d > 0 ? "▲" : "▼"} {Math.abs(d)}{improving ? " improving" : " worsening"}
    </span>
  );
};

export const Tag = ({ color, children }) => (
  <span className="sevtag" style={{ color, borderColor: color }}>{children}</span>
);

export const Bar = ({ pct, color, h = 6 }) => (
  <span className="mbar" style={{ height: h }}>
    <span style={{ width: `${pct}%`, background: color }} />
  </span>
);

export function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="modal-veil" onClick={onClose}>
      <div className="modal rise" onClick={(e) => e.stopPropagation()}>
        <button className="modal-x" onClick={onClose}>✕</button>
        {children}
      </div>
    </div>
  );
}

export const scoreColor = (v) => (v >= 80 ? "var(--em)" : v >= 60 ? "var(--am)" : "var(--co)");
export const riskColor = (v) => (v >= 70 ? "var(--co)" : v >= 55 ? "var(--am)" : "var(--em)");
