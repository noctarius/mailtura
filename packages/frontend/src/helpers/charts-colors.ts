const tailwindSolid = [
  "#ef4444", // red-500
  "#f97316", // orange-500
  "#f59e0b", // amber-500
  "#eab308", // yellow-500
  "#84cc16", // lime-500
  "#22c55e", // green-500
  "#10b981", // emerald-500
  "#14b8a6", // teal-500
  "#06b6d4", // cyan-500
  "#0ea5e9", // sky-500
  "#3b82f6", // blue-500
  "#6366f1", // indigo-500
  "#8b5cf6", // violet-500
  "#a855f7", // purple-500
  "#ec4899", // pink-500
  "#f43f5e", // rose-500
];

const tailwindArea = [
  "rgba(239, 68, 68, 0.35)", // red-500
  "rgba(249, 115, 22, 0.35)", // orange-500
  "rgba(245, 158, 11, 0.35)", // amber-500
  "rgba(234, 179, 8, 0.35)", // yellow-500
  "rgba(132, 204, 22, 0.35)", // lime-500
  "rgba(34, 197, 94, 0.35)", // green-500
  "rgba(16, 185, 129, 0.35)", // emerald-500
  "rgba(20, 184, 166, 0.35)", // teal-500
  "rgba(6, 182, 212, 0.35)", // cyan-500
  "rgba(14, 165, 233, 0.35)", // sky-500
  "rgba(59, 130, 246, 0.35)", // blue-500
  "rgba(99, 102, 241, 0.35)", // indigo-500
  "rgba(139, 92, 246, 0.35)", // violet-500
  "rgba(168, 85, 247, 0.35)", // purple-500
  "rgba(236, 72, 153, 0.35)", // pink-500
  "rgba(244, 63, 94, 0.35)", // rose-500
];

export function getSolidColor(index: number): string {
  return `${tailwindSolid[(index * 4) % tailwindSolid.length]}`;
}

export function getAreaColor(index: number): string {
  return `${tailwindArea[(index * 4) % tailwindArea.length]}`;
}
