import { TailwindBgColor } from "../../helpers/tailwind-bg-colors.js";
import { TailwindTextColor } from "../../helpers/tailwind-text-colors.js";

export function getStatusBgColor(status: string): TailwindBgColor {
  switch (status) {
    case "subscribed":
      return "bg-green-100";
    case "unsubscribed":
      return "bg-gray-100";
    case "bounced":
      return "bg-red-100";
    default:
      return "bg-gray-100";
  }
}

export function getStatusTextColor(status: string): TailwindTextColor {
  switch (status) {
    case "subscribed":
      return "text-green-800";
    case "unsubscribed":
      return "text-gray-800";
    case "bounced":
      return "text-red-800";
    default:
      return "text-gray-800";
  }
}
