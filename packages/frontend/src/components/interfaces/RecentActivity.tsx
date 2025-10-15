import { AlertCircle, CheckCircle, Clock, Mail } from "lucide-solid";

interface RecentActivityProps {
  setActiveView: (view: string) => void;
}

const RecentActivity = (props: RecentActivityProps) => {
  const activities = [
    {
      id: 1,
      type: "success",
      title: "Newsletter Campaign Completed",
      description: "15,234 emails sent successfully",
      time: "2 hours ago",
      icon: CheckCircle,
    },
    {
      id: 2,
      type: "warning",
      title: "High Bounce Rate Detected",
      description: "Welcome series showing 8.2% bounce rate",
      time: "4 hours ago",
      icon: AlertCircle,
    },
    {
      id: 3,
      type: "info",
      title: "New Template Created",
      description: "Product announcement template saved",
      time: "6 hours ago",
      icon: Mail,
    },
    {
      id: 4,
      type: "info",
      title: "Scheduled Campaign",
      description: "Black Friday promo set for tomorrow 9 AM",
      time: "1 day ago",
      icon: Clock,
    },
    {
      id: 5,
      type: "success",
      title: "API Key Generated",
      description: "New production API key created",
      time: "2 days ago",
      icon: CheckCircle,
    },
  ];

  const getActivityStyles = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-600";
      case "warning":
        return "bg-orange-100 text-orange-600";
      case "error":
        return "bg-red-100 text-red-600";
      default:
        return "bg-blue-100 text-blue-600";
    }
  };

  return (
    <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <p class="text-sm text-gray-600">Latest updates from your campaigns</p>
      </div>

      <div class="space-y-4">
        {activities.map(activity => {
          const Icon = activity.icon;
          return (
            <div class="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div class={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityStyles(activity.type)}`}>
                <Icon class="w-4 h-4" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900">{activity.title}</p>
                <p class="text-sm text-gray-600">{activity.description}</p>
                <p class="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>

      <button
        class="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
        onClick={() => {
          props.setActiveView("activity");
        }}
      >
        View all activity
      </button>
    </div>
  );
};

export default RecentActivity;
