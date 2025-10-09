import React from "react";
import ChartSection from "../components/interfaces/ChartSection";
import MetricsGrid from "../components/interfaces/MetricsGrid";
import RecentActivity from "../components/interfaces/RecentActivity";

interface DashboardProps {
  setActiveView: (view: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setActiveView }) => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Monitor your email campaigns and performance metrics</p>
      </div>

      <MetricsGrid />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          <ChartSection />
        </div>
        <div className="lg:col-span-1">
          <RecentActivity setActiveView={setActiveView} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
