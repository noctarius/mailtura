import { Mail, TrendingDown, TrendingUp, Users } from "lucide-solid";

const MetricsGrid = () => {
  const metrics = [
    {
      title: "Emails Sent",
      value: "1,234,567",
      change: "+12.5%",
      changeType: "increase",
      icon: Mail,
      color: "bg-blue-500",
    },
    {
      title: "Delivery Rate",
      value: "98.4%",
      change: "+0.8%",
      changeType: "increase",
      icon: TrendingUp,
      color: "bg-green-500",
    },
    {
      title: "Open Rate",
      value: "24.2%",
      change: "-1.2%",
      changeType: "decrease",
      icon: TrendingDown,
      color: "bg-orange-500",
    },
    {
      title: "Click Rate",
      value: "3.8%",
      change: "+0.3%",
      changeType: "increase",
      icon: Users,
      color: "bg-purple-500",
    },
  ];

  return (
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map(metric => {
        const Icon = metric.icon;
        return (
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
                <p class="text-2xl font-bold text-gray-900">{metric.value}</p>
                <div class="flex items-center mt-2">
                  <span
                    class={`text-sm font-medium ${metric.changeType === "increase" ? "text-green-600" : "text-red-600"}`}
                  >
                    {metric.change}
                  </span>
                  <span class="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div class={`w-12 h-12 rounded-lg ${metric.color} flex items-center justify-center`}>
                <Icon class="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MetricsGrid;
