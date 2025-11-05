import { TailwindTextColor } from "../../helpers/tailwind-text-colors.js";
import { TailwindBgColor } from "../../helpers/tailwind-bg-colors.js";

export function getRoleTextColor(role: string): TailwindTextColor {
  switch (role) {
    case "super_admin":
      return "text-purple-800";
    case "tenant_admin":
      return "text-blue-800";
    case "user":
      return "text-green-800";
    case "viewer":
      return "text-gray-800";
    default:
      return "text-gray-800";
  }
}

export function getRoleBgColor(role: string): TailwindBgColor {
  switch (role) {
    case "super_admin":
      return "bg-purple-100";
    case "tenant_admin":
      return "bg-blue-100";
    case "user":
      return "bg-green-100";
    case "viewer":
      return "bg-gray-100";
    default:
      return "bg-gray-100";
  }
}

export function getStatusTextColor(isActive: boolean): TailwindTextColor {
  return isActive ? "text-green-800" : "text-red-800";
}

export function getStatusBgColor(isActive: boolean): TailwindBgColor {
  return isActive ? "bg-green-100" : "bg-red-100";
}
