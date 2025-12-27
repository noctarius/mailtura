export function sourceTextColor(source: string) {
  switch (source) {
    case "UnsubscribeLink":
      return "text-blue-800";
    case "ManualAddition":
      return "text-gray-800";
    case "Api":
      return "text-indigo-800";
    case "Bounce":
      return "text-red-800";
    default:
      return "text-gray-800";
  }
}

export function sourceBgColor(source: string) {
  switch (source) {
    case "UnsubscribeLink":
      return "bg-blue-100";
    case "ManualAddition":
      return "bg-gray-100";
    case "Api":
      return "bg-indigo-100";
    case "Bounce":
      return "bg-red-100";
    default:
      return "bg-gray-100";
  }
}

export function sourceDisplay(source: string) {
  switch (source) {
    case "UnsubscribeLink":
      return "Unsubscribe Link";
    case "ManualAddition":
      return "Manual Addition";
    case "Api":
      return "API Request";
    case "Bounce":
      return "Bounce";
    default:
      return "Other";
  }
}
