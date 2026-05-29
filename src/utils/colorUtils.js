export function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

export function rgbToHex(r, g, b) {
  const toHex = (n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

export function hslToRgb(h, s, l) {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => {
    const k = (n + h / 30) % 12;
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  return { r: f(0) * 255, g: f(8) * 255, b: f(4) * 255 };
}

const SHADE_STOPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

export function generatePalette(hex500) {
  const { r, g, b } = hexToRgb(hex500);
  const { h, s } = rgbToHsl(r, g, b);
  const palette = {};

  for (const stop of SHADE_STOPS) {
    let lightness;
    if (stop === 50) lightness = 96;
    else if (stop === 100) lightness = 90;
    else if (stop === 200) lightness = 82;
    else if (stop === 300) lightness = 70;
    else if (stop === 400) lightness = 58;
    else if (stop === 500) lightness = 46;
    else if (stop === 600) lightness = 37;
    else if (stop === 700) lightness = 28;
    else if (stop === 800) lightness = 20;
    else if (stop === 900) lightness = 14;
    else if (stop === 950) lightness = 8;

    const { r: rr, g: gg, b: bb } = hslToRgb(h, s, lightness);
    palette[stop] = rgbToHex(rr, gg, bb);
  }
  return palette;
}

export function applyCustomAccent(hex, prefix = 'accent') {
  const palette = generatePalette(hex);
  const root = document.documentElement;

  for (const stop of SHADE_STOPS) {
    root.style.setProperty(`--${prefix}-${stop}`, palette[stop]);
  }

  const indigo = generatePalette(adjustHue(hex, -15));
  for (const stop of SHADE_STOPS) {
    root.style.setProperty(`--${prefix}-indigo-${stop}`, indigo[stop]);
  }

  const purple = generatePalette(adjustHue(hex, 30));
  for (const stop of SHADE_STOPS) {
    root.style.setProperty(`--${prefix}-purple-${stop}`, purple[stop]);
  }

  const green = generatePalette(adjustHue(hex, 90));
  for (const stop of SHADE_STOPS) {
    root.style.setProperty(`--${prefix}-green-${stop}`, green[stop]);
  }
}

export function clearCustomAccent(prefix = 'accent') {
  const root = document.documentElement;
  const suffixes = ['', '-indigo', '-purple', '-green'];
  for (const suffix of suffixes) {
    for (const stop of SHADE_STOPS) {
      root.style.removeProperty(`--${prefix}${suffix}-${stop}`);
    }
  }
  root.removeAttribute('data-custom-accent');
}

function adjustHue(hex, degrees) {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);
  const { r: rr, g: gg, b: bb } = hslToRgb((h + degrees + 360) % 360, s, l);
  return rgbToHex(rr, gg, bb);
}
