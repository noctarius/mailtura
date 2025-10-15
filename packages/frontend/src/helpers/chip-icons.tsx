import {
  AlertCircle,
  BarChart3,
  Calendar,
  CheckCircle,
  Clock,
  Edit,
  Eye, Link,
  Loader,
  MousePointer,
  Pause,
  Play, Webhook,
  XCircle,
} from "lucide-solid";

export function getCampaignStatusIcon(status: string) {
  switch (status) {
    case "Active":
      return <Play class="w-3 h-3" />;
    case "Scheduled":
      return <Calendar class="w-3 h-3" />;
    case "Completed":
      return <BarChart3 class="w-3 h-3" />;
    case "Draft":
      return <Edit class="w-3 h-3" />;
    case "Paused":
      return <Pause class="w-3 h-3" />;
    default:
      return null;
  }
}

export function getActivityStatusIcon(status: string) {
  switch (status) {
    case "delivered":
      return <CheckCircle class="w-3 h-3" />;
    case "opened":
      return <Eye class="w-3 h-3" />;
    case "clicked":
      return <MousePointer class="w-3 h-3" />;
    case "pending":
      return <Loader class="w-3 h-3" />;
    case "bounced":
      return <AlertCircle class="w-3 h-3" />;
    case "failed":
      return <XCircle class="w-3 h-3" />;
    default:
      return <Clock class="w-3 h-3" />;
  }
}

export function getUnsubscribeSourceIcon(source: string) {
  switch (source) {
    case "API Request":
      return <Webhook class="w-3 h-3" />;
    case "Unsubscribe Link":
      return <Link class="w-3 h-3" />;
    case "Manual Addition":
      return <Edit class="w-3 h-3" />;
  }
}
