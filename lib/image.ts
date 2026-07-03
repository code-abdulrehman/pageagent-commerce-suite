const palettes: Record<string, [string, string, string]> = {
  bottle: ["#162b45", "#9ec5c4", "#f2e7cf"],
  lamp: ["#52351e", "#f6d485", "#e8c29b"],
  tote: ["#123a36", "#91b7a7", "#e9e1ce"],
  throw: ["#3e553f", "#c7bca0", "#f2eadc"],
  dock: ["#322d43", "#a79ec8", "#eeeaf6"],
  organizer: ["#1d354d", "#b5cad7", "#f4ede1"],
  pouch: ["#5b3f32", "#d1ac8a", "#f6eadb"],
  towel: ["#1f4b59", "#98c9c4", "#e8f1e8"],
  notebook: ["#9c6040", "#e5c8aa", "#f2ede4"],
  candle: ["#5f4634", "#d8b794", "#f4efe5"],
  shell: ["#2f4350", "#94bcc1", "#edf0e7"],
  tray: ["#554b43", "#c9bca8", "#f4f0e9"],
  speaker: ["#293a44", "#8faeba", "#edf2f2"],
  stand: ["#4d525d", "#c2c4cb", "#eff0f2"],
  balm: ["#5b6041", "#c2c795", "#f1f3e8"],
  mug: ["#6c563f", "#c9b197", "#f1e8de"],
  mouse: ["#354758", "#a6bdc8", "#ebeff0"],
  mask: ["#3d3555", "#b9adcf", "#f2eef5"],
  case: ["#274653", "#91bbc2", "#eef2ee"],
  clock: ["#333b48", "#aeb9c9", "#eff1f3"],
  desk: ["#1f344b", "#9db7c6", "#f0ede5"],
  travel: ["#3f564a", "#9cc0a3", "#eff0e7"],
  home: ["#7e5742", "#d1b493", "#f4ede2"],
  wellness: ["#536742", "#c7d3a1", "#f1f4e9"],
  tech: ["#45485b", "#afb8d0", "#eff0f5"]
};

export function artwork(key: string, title: string) {
  const [dark, mid, light] = palettes[key] || palettes.tech;
  const safe = title.replace(/[<>&"]/g, "");
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 700" role="img" aria-label="${safe}">
    <defs>
      <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
        <stop stop-color="${light}"/><stop offset=".6" stop-color="${mid}"/><stop offset="1" stop-color="${dark}"/>
      </linearGradient>
      <filter id="s"><feDropShadow dx="0" dy="22" stdDeviation="20" flood-opacity=".25"/></filter>
    </defs>
    <rect width="900" height="700" fill="url(#g)"/>
    <circle cx="740" cy="105" r="200" fill="${light}" opacity=".45"/>
    <path d="M0 555 C210 430 470 650 900 475 V700 H0Z" fill="${dark}" opacity=".22"/>
    <g filter="url(#s)">
      <rect x="285" y="150" width="330" height="360" rx="48" fill="${dark}" opacity=".92"/>
      <rect x="310" y="180" width="280" height="250" rx="30" fill="${mid}" opacity=".72"/>
      <circle cx="450" cy="315" r="72" fill="${light}" opacity=".9"/>
      <path d="M402 315h96M450 267v96" stroke="${dark}" stroke-width="18" stroke-linecap="round" opacity=".75"/>
    </g>
    <text x="52" y="620" fill="${light}" font-family="Arial, sans-serif" font-size="26" letter-spacing="4">${safe.toUpperCase()}</text>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
