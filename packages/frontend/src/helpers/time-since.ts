import { UTC } from "@mailtura/rpcmodel/lib/time/Timezone.ts";

export function getTimeSince(dateTime: string, showHours: boolean = false) {
  const now = UTC.now();
  const eventTime = UTC.parse(dateTime);

  const diffInDays = Math.floor(now.deltaDays(eventTime));

  if (diffInDays === 0) {
    if (!showHours) {
      return "Today";
    }

    const diffInHours = Math.floor(now.deltaHours(eventTime));
    if (diffInHours <= 1) {
      return "An hour ago";
    }
    return `${diffInHours} hours ago`;
  } else if (diffInDays === 1) {
    return "Yesterday";
  } else {
    return `${diffInDays} days ago`;
  }
}
