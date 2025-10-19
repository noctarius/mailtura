import { TailwindBgColor } from "../../helpers/tailwind-bg-colors.js";
import { TailwindTextColor } from "../../helpers/tailwind-text-colors.js";

export function getStatusBgColor(status: string): TailwindBgColor {
  switch (status) {
    case "Subscribed":
      return "bg-green-100";
    case "Unsubscribed":
      return "bg-gray-100";
    case "Bounced":
      return "bg-red-100";
    default:
      return "bg-gray-100";
  }
}

export function getStatusTextColor(status: string): TailwindTextColor {
  switch (status) {
    case "Subscribed":
      return "text-green-800";
    case "Unsubscribed":
      return "text-gray-800";
    case "Bounced":
      return "text-red-800";
    default:
      return "text-gray-800";
  }
}
