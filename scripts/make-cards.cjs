// Generates the project cards used in README.md (assets/card-*.svg) from one template.
// Run: node scripts/make-cards.cjs
const fs = require("fs");
const path = require("path");

const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const cards = [
  {
    file: "card-dashboard.svg",
    status: "In use",
    note: "Built with Claude Code",
    title: "QA Dashboard",
    lines: ["Test progress from the team's sheets,", "failed cases, a bug tracker, QA KPIs", "and PDF/Word reports in one place."],
    tags: ["Next.js", "TypeScript", "Cucumber"],
  },
  {
    file: "card-automation.svg",
    status: "Private",
    note: "Client repositories",
    title: "Banking web automation",
    lines: ["Playwright suites for three banking", "back-office portals, including", "maker-checker approval flows."],
    tags: ["Playwright", "TypeScript", "Page Objects"],
  },
  {
    file: "card-portfolio.svg",
    status: "Live",
    note: "yidne-portfolio.onrender.com",
    title: "Portfolio",
    lines: ["My portfolio with its own admin", "panel, so content updates go live", "without a redeploy."],
    tags: ["React", "Supabase", "Tailwind CSS"],
  },
];

const W = 420;
const H = 260;
const sans = `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`;

const tagRow = (tags) => {
  let x = 24;
  return tags
    .map((t) => {
      const w = Math.round(t.length * 8.6 + 24);
      const out = `<rect x="${x}" y="208" width="${w}" height="30" rx="15" fill="#ffffff" fill-opacity="0.08" stroke="#ffffff" stroke-opacity="0.12"/><text x="${x + w / 2}" y="228" text-anchor="middle" font-size="14.5" fill="#cfd8db">${esc(t)}</text>`;
      x += w + 8;
      return out;
    })
    .join("");
};

const card = (c) => {
  const statusW = Math.round(c.status.length * 8.4 + 32);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(c.title)}: ${esc(c.lines.join(" "))}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0d2a31"/><stop offset="1" stop-color="#071114"/></linearGradient>
    <radialGradient id="glow" cx="1" cy="0" r="0.9"><stop offset="0" stop-color="#1f8fa6" stop-opacity="0.45"/><stop offset="1" stop-color="#1f8fa6" stop-opacity="0"/></radialGradient>
    <linearGradient id="blue" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7cc8f5"/><stop offset="1" stop-color="#1a7fc4"/></linearGradient>
    <linearGradient id="silver" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#9aa4aa"/><stop offset="1" stop-color="#f4f6f7"/></linearGradient>
  </defs>
  <rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="18" fill="url(#bg)"/>
  <rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="18" fill="url(#glow)"/>
  <rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="18" fill="none" stroke="#ffffff" stroke-opacity="0.1"/>
  <g font-family='${sans}'>
    <rect x="24" y="22" width="${statusW}" height="24" rx="12" fill="#4ade80" fill-opacity="0.14"/>
    <circle cx="38" cy="34" r="4" fill="#4ade80"/>
    <text x="48" y="38.5" font-size="14" font-weight="600" fill="#4ade80">${esc(c.status)}</text>
    <text x="${24 + statusW + 10}" y="38.5" font-size="14" fill="#869199">${esc(c.note)}</text>
    <text x="24" y="88" font-size="28" font-weight="800" fill="#ffffff">${esc(c.title)}</text>
    ${c.lines.map((l, i) => `<text x="24" y="${124 + i * 25}" font-size="17" fill="#c9d3d6">${esc(l)}</text>`).join("\n    ")}
    ${tagRow(c.tags)}
  </g>
  <g fill="none" stroke-linecap="round" stroke-width="6">
    <path d="M386 34 L404 12" stroke="url(#silver)"/>
    <path d="M376 24 L386 34" stroke="url(#blue)"/>
  </g>
</svg>
`;
};

const outDir = path.join(__dirname, "..", "assets");
cards.forEach((c) => fs.writeFileSync(path.join(outDir, c.file), card(c)));
console.log("wrote", cards.map((c) => c.file).join(", "));
