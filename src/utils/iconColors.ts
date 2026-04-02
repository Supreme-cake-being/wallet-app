const darkColors = [
  "#1a1a2e",
  "#16213e",
  "#0f3460",
  "#533483",
  "#2d6a4f",
  "#1b4332",
  "#6b2737",
  "#7b2d00",
  "#3d405b",
  "#264653",
  "#2a9d8f",
  "#c0392b",
  "#5c4033",
  "#37474f",
  "#1565c0",
  "#283593",
];

export function getIconColor(id: string): string {
  const idx = id.charCodeAt(id.length - 1) % darkColors.length;
  return darkColors[idx];
}
