// utils/colorUtils.js
function hexToRgb(hex) {
  const bigint = parseInt(hex.replace("#", ""), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function luminance({ r, g, b }) {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928
      ? v / 12.92
      : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function getContrastColor(bgHex) {
  const rgb = hexToRgb(bgHex);
  const lum = luminance(rgb);
  // Comparaison avec blanc et noir
  const contrastWithWhite = (1.05) / (lum + 0.05);
  const contrastWithBlack = (lum + 0.05) / 0.05;
  return contrastWithWhite > contrastWithBlack ? "#fff" : "#000";
}
