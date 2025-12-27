export function getBounceTypeBgColor(type: string) {
  switch (type) {
    case "Hard":
      return "bg-red-100";
    case "Soft":
      return "bg-yellow-100";
    default:
      return "bg-gray-100";
  }
}

export function getBounceTypeTextColor(type: string) {
  switch (type) {
    case "Hard":
      return "text-red-800";
    case "Soft":
      return "text-yellow-800";
    default:
      return "text-gray-800";
  }
}
