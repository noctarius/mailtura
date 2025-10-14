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
} from "lucide-react";

export function getCampaignStatusIcon(status: string) {
  switch (status) {
    case "Active":
      return <Play className="w-3 h-3" />;
    case "Scheduled":
      return <Calendar className="w-3 h-3" />;
    case "Completed":
      return <BarChart3 className="w-3 h-3" />;
    case "Draft":
      return <Edit className="w-3 h-3" />;
    case "Paused":
      return <Pause className="w-3 h-3" />;
    default:
      return null;
  }
}

export function getActivityStatusIcon(status: string) {
  switch (status) {
    case "delivered":
      return <CheckCircle className="w-3 h-3" />;
    case "opened":
      return <Eye className="w-3 h-3" />;
    case "clicked":
      return <MousePointer className="w-3 h-3" />;
    case "pending":
      return <Loader className="w-3 h-3" />;
    case "bounced":
      return <AlertCircle className="w-3 h-3" />;
    case "failed":
      return <XCircle className="w-3 h-3" />;
    default:
      return <Clock className="w-3 h-3" />;
  }
}

export function getUnsubscribeSourceIcon(source: string) {
  switch (source) {
    case "API Request":
      return <Webhook className="w-3 h-3" />;
    case "Unsubscribe Link":
      return <Link className="w-3 h-3" />;
    case "Manual Addition":
      return <Edit className="w-3 h-3" />;
  }
}
