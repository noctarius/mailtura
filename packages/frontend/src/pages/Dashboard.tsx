import ChartSection from "../components/interfaces/ChartSection";
import MetricsGrid from "../components/interfaces/MetricsGrid";
import RecentActivity from "../components/interfaces/RecentActivity";

interface DashboardProps {
  setActiveView: (view: string) => void;
}

const Dashboard = (props: DashboardProps) => {
  return (
    <div class="p-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p class="text-gray-600">Monitor your email campaigns and performance metrics</p>
      </div>

      <MetricsGrid />

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div class="lg:col-span-2">
          <ChartSection />
        </div>
        <div class="lg:col-span-1">
          <RecentActivity setActiveView={props.setActiveView} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
