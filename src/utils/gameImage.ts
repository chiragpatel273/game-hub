// Utility to provide a game image: prefer real image, otherwise generate a deterministic SVG placeholder.
// Now also supports forcing a universal dummy image for all games via FORCE_DUMMY_IMAGES.

export function generateGamePlaceholder(title: string, width = 400, height = 225) {
    const text = title || 'Game';
    // Simple hash to pick two colors
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
    }
    const hue1 = hash % 360;
    const hue2 = (hue1 + 60) % 360;
    const bg1 = `hsl(${hue1} 70% 45%)`;
    const bg2 = `hsl(${hue2} 70% 35%)`;
    const fontSize = Math.min(32, Math.max(18, Math.floor(width / (text.length * 0.6))));
    const svg = `<?xml version="1.0" encoding="UTF-8"?>\n` +
        `<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}' role='img' aria-label='${text}'>` +
        `<defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop stop-color='${bg1}' offset='0%'/>` +
        `<stop stop-color='${bg2}' offset='100%'/></linearGradient></defs>` +
        `<rect width='100%' height='100%' fill='url(#g)'/>` +
        `<text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='white'` +
        ` font-family='system-ui,Segoe UI,Roboto,sans-serif' font-size='${fontSize}' font-weight='600'` +
        `>${escapeXml(text)}</text></svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function escapeXml(str: string) {
    return str.replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', '\'': '&apos;' }[c] as string));
}

export function getGameImage(game: { image?: string | null; title?: string; name?: string }) {
    // If forced dummy mode on, always return same universal placeholder (with title overlay if provided)
    if (FORCE_DUMMY_IMAGES) {
        return generateGameCoverArtPlaceholder({
            title: game.title || game.name || 'Game',
        });
    }
    const real = game.image || (game as any).background_image; // support RAWG style if added later
    if (real && real.trim()) return real;
    return generateGameCoverArtPlaceholder({ title: game.title || game.name || 'Game' });
}

// Toggle: set to true to always display dummy images (ignores real URLs)
export const FORCE_DUMMY_IMAGES = true;

// Generate a universal dummy image (consistent style) optionally embedding the title text.
export function getUniversalDummyGameImage(text = 'Game', width = 400, height = 225) {
    // Blue → purple diagonal gradient with centered controller glyph & minimal text label (optional)
    const safeText = escapeXml(text.length > 18 ? text.slice(0, 18) + '…' : text);
    const svg = `<?xml version="1.0" encoding="UTF-8"?>\n` +
        `<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}' role='img' aria-label='${safeText} game placeholder'>` +
        `<defs>` +
        `<linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'>` +
        `<stop offset='0%' stop-color='#3b82f6'/>` +
        `<stop offset='100%' stop-color='#9333ea'/>` +
        `</linearGradient>` +
        `<filter id='shadow' x='-50%' y='-50%' width='200%' height='200%'>` +
        `<feDropShadow dx='0' dy='2' stdDeviation='6' flood-color='#00000066'/>` +
        `</filter>` +
        `</defs>` +
        `<rect width='100%' height='100%' fill='url(#bg)'/>` +
        // Controller body (simple custom vector)
        `<g filter='url(#shadow)' transform='translate(${width / 2 - 70}, ${height / 2 - 40})'>` +
        `<path d='M40 30c-9 0-14 5-18 10l-6 8c-3 4-5 9-3 14 2 5 6 8 12 9l14 2 11-8h26l11 8 14-2c6-1 10-4 12-9 2-5 0-10-3-14l-6-8c-4-5-9-10-18-10l-20 2-20-2z' fill='#43316f'/>` +
        `<circle cx='60' cy='55' r='10' fill='#1f2937'/>` +
        `<rect x='56' y='51' width='8' height='2' rx='1' fill='#f9fafb'/>` +
        `<rect x='58' y='53' width='2' height='8' rx='1' fill='#f9fafb'/>` +
        `<g transform='translate(110 52)'>` +
        `<circle cx='0' cy='0' r='7' fill='#ef4444'/>` +
        `<circle cx='18' cy='0' r='7' fill='#f59e0b'/>` +
        `<circle cx='0' cy='18' r='7' fill='#10b981'/>` +
        `<circle cx='18' cy='18' r='7' fill='#3b82f6'/>` +
        `</g>` +
        `</g>` +
        `</svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Advanced cover-style placeholder attempting to look closer to a stylized game cover.
// Includes layered gradient, abstract shapes, radial glow, title, and subtle texture.
interface CoverArtOptions {
    title: string;
    width?: number;
    height?: number; // Typical game cover ~2:3 ratio; we default to 400x600-esque scaled
    seed?: string;
}

export function generateGameCoverArtPlaceholder(opts: CoverArtOptions) {
    const {
        title,
        width = 400,
        height = Math.round(400 * 9 / 16), // default to 16:9 (225 for width 400) to match card aspect ratio
        seed = title,
    } = opts;
    // Hash seed
    let hash = 0;
    for (let i = 0; i < seed.length; i++) hash = (hash * 33 + seed.charCodeAt(i)) >>> 0;
    // Derive hues & shape rotations
    const primaryHue = hash % 360;
    const secondaryHue = (primaryHue + 40) % 360;
    const accentHue = (primaryHue + 200) % 360;
    const gradA = `hsl(${primaryHue} 75% 45%)`;
    const gradB = `hsl(${secondaryHue} 65% 35%)`;
    const accent = `hsl(${accentHue} 80% 55%)`;
    const safeTitle = escapeXml(title.length > 28 ? title.slice(0, 28) + '…' : title);
    // Title font size previously used for text overlay; text removed so variable omitted.
    // Generate abstract polygon paths (deterministic)
    function rand(n: number) { hash = (hash * 1664525 + 1013904223) >>> 0; return (hash % 10000) / 10000 * n; }
    const shapeCount = 5;
    const shapes: string[] = [];
    for (let s = 0; s < shapeCount; s++) {
        const cx = rand(width);
        const cy = rand(height);
        const r = rand(Math.min(width, height) / 3) + 40;
        const points: string[] = [];
        const sides = 5 + (hash % 4); // 5-8 sides
        for (let i = 0; i < sides; i++) {
            const angle = (Math.PI * 2 * i) / sides + rand(0.6);
            const pr = r * (0.7 + rand(0.3));
            points.push(`${(cx + Math.cos(angle) * pr).toFixed(1)},${(cy + Math.sin(angle) * pr).toFixed(1)}`);
        }
        shapes.push(`<polygon points='${points.join(' ')}' fill='${accent}' fill-opacity='0.08' stroke='${accent}' stroke-opacity='0.15' stroke-width='2' />`);
    }
    const svg = `<?xml version="1.0" encoding="UTF-8"?>\n` +
        `<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}' role='img' aria-label='${safeTitle} cover placeholder'>` +
        `<defs>` +
        `<linearGradient id='coverGrad' x1='0' y1='0' x2='0' y2='1'>` +
        `<stop offset='0%' stop-color='${gradA}'/>` +
        `<stop offset='100%' stop-color='${gradB}'/>` +
        `</linearGradient>` +
        `<radialGradient id='glow' cx='50%' cy='35%' r='60%'>` +
        `<stop offset='0%' stop-color='hsl(${primaryHue} 90% 85% / 0.6)'/>` +
        `<stop offset='70%' stop-color='transparent'/>` +
        `</radialGradient>` +
        `<pattern id='noise' width='80' height='80' patternUnits='userSpaceOnUse'>` +
        `<rect width='80' height='80' fill='none'/>` +
        `<circle cx='10' cy='10' r='1' fill='white' fill-opacity='0.08'/>` +
        `<circle cx='40' cy='30' r='1' fill='white' fill-opacity='0.05'/>` +
        `<circle cx='70' cy='50' r='1' fill='white' fill-opacity='0.07'/>` +
        `<circle cx='25' cy='60' r='1' fill='white' fill-opacity='0.05'/>` +
        `</pattern>` +
        `</defs>` +
        `<rect width='100%' height='100%' rx='12' ry='12' fill='url(#coverGrad)'/>` +
        `<rect width='100%' height='100%' rx='12' ry='12' fill='url(#noise)' style='mix-blend-mode:overlay'/>` +
        `<rect width='100%' height='100%' rx='12' ry='12' fill='url(#glow)'/>` +
        `<g>${shapes.join('')}</g>` +
        `<rect x='0' y='0' width='100%' height='100%' rx='12' ry='12' fill='none' stroke='hsl(${primaryHue} 80% 85% / 0.4)' stroke-width='2'/>` +
        `</svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
