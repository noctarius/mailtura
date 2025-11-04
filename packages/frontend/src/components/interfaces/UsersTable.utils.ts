export function getRoleColorClasses(role: string) {
  switch (role) {
    case "super_admin":
      return "bg-purple-100 text-purple-800";
    case "tenant_admin":
      return "bg-blue-100 text-blue-800";
    case "user":
      return "bg-green-100 text-green-800";
    case "viewer":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export function getStatusColorClasses(isActive: boolean) {
  return isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
}
