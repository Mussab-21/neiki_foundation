const DEFAULT_FONT_URL = "https:
async function createHandwritingSvg(containerId, options = {}) {
const container = document.getElementById(containerId);
if (!container) return;
const {
text = "Hello",
fontUrl = DEFAULT_FONT_URL,
width = "100%",
height = "100%",
fontSize = 72,
strokeWidth = 2,
duration = 2.5,
delay = 0.5,
ease = "easeInOut",
color = "#f43f5e"
} = options;
container.innerHTML = `
<div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; color: #94a3b8; font-size: 14px; font-family: sans-serif;">
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite; margin-right: 8px;">
<path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
</svg>
Loading...
<style>@keyframes spin { 100% { transform: rotate(360deg); } }</style>
</div>
`;
try {
const buffer = await fetch(fontUrl).then(res => res.arrayBuffer());
const font = window.opentype.parse(buffer);
const path = font.getPath(text, 0, fontSize, fontSize);
const bbox = path.getBoundingBox();
const pad = 10;
const vx = Math.floor(bbox.x1) - pad;
const vy = Math.floor(bbox.y1) - pad;
const vw = Math.ceil(bbox.x2 - bbox.x1) + pad * 2;
const vh = Math.ceil(bbox.y2 - bbox.y1) + pad * 2;
const viewBox = `${vx} ${vy} ${vw} ${vh}`;
const d = path.toPathData(2);
container.innerHTML = `
<svg width="${width}" height="${height}" viewBox="${viewBox}" aria-hidden="true" style="color: ${color}; overflow: visible;">
<path id="handwriting-path-${containerId}" d="${d}" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" />
</svg>
`;
setTimeout(() => {
const pathEl = document.getElementById(`handwriting-path-${containerId}`);
if (pathEl && window.Motion) {
window.Motion.animate(
pathEl,
{ pathLength: [0, 1] },
{ duration: duration, delay: delay, easing: ease }
);
} else {
console.warn("Motion library not loaded, skipping animation.");
}
}, 50);
} catch (error) {
container.innerHTML = `
<div style="color: #ef4444; font-size: 14px; text-align: center; font-family: sans-serif;">
Failed to load font or generate path.
</div>`;
console.error("Handwriting SVG Error:", error);
}
}
window.createHandwritingSvg = createHandwritingSvg;