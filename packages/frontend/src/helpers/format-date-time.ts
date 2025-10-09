import { LOCAL, UTC } from "@mailtura/rpcmodel/lib/time/Timezone.ts";

export function formatDateTime(dateTime: string, asLocalTime: boolean = false) {
  const date = UTC.parse(dateTime);
  return (asLocalTime ? date.toTimezone(LOCAL) : date).format("MMM DD, yyyy HH:mm");
}
