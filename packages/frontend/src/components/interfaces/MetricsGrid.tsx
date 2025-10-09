import { Mail, TrendingDown, TrendingUp, Users } from "lucide-react";
import React from "react";

const MetricsGrid: React.FC = () => {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <div className="flex items-center mt-2">
                  <span
                    className={`text-sm font-medium ${metric.changeType === "increase" ? "text-green-600" : "text-red-600"}`}
                  >
                    {metric.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div
                className={`w-12 h-12 rounded-lg ${metric.color} flex items-center justify-center`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MetricsGrid;
