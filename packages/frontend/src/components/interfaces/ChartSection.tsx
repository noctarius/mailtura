import { objectToDataSeries } from "../../helpers/object-to-data-series.js";
import StackedLineChart from "./StackedLineChart.js";
import { createSignal } from "solid-js";

const ChartSection = () => {
  const [chartType, setChartType] = createSignal<"emails" | "performance">("emails");

  const emailData = [
    { name: "Jan", sent: 45000, delivered: 44100, opened: 10584, clicked: 1673 },
    { name: "Feb", sent: 52000, delivered: 50960, opened: 12230, clicked: 1937 },
    { name: "Mar", sent: 48000, delivered: 47040, opened: 11290, clicked: 1804 },
    { name: "Apr", sent: 61000, delivered: 59780, opened: 14355, clicked: 2294 },
    { name: "May", sent: 58000, delivered: 56840, opened: 13642, clicked: 2178 },
    { name: "Jun", sent: 67000, delivered: 65660, opened: 15759, clicked: 2515 },
  ];

  const performanceData = [
    { name: "Jan", deliveryRate: 98.0, openRate: 24.0, clickRate: 3.8 },
    { name: "Feb", deliveryRate: 98.0, openRate: 23.5, clickRate: 3.8 },
    { name: "Mar", deliveryRate: 98.0, openRate: 24.0, clickRate: 3.8 },
    { name: "Apr", deliveryRate: 98.0, openRate: 23.5, clickRate: 3.8 },
    { name: "May", deliveryRate: 98.1, openRate: 23.5, clickRate: 3.8 },
    { name: "Jun", deliveryRate: 98.0, openRate: 24.0, clickRate: 3.8 },
  ];

  return (
    <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h3 class="text-lg font-semibold text-gray-900">Email Analytics</h3>
          <p class="text-sm text-gray-600">Track your email campaign performance over time</p>
        </div>
        <div class="flex space-x-2">
          <button
            onClick={() => setChartType("emails")}
            class={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${chartType() === "emails" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"}`}
          >
            Email Volume
          </button>
          <button
            onClick={() => setChartType("performance")}
            class={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${chartType() === "performance" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"}`}
          >
            Performance
          </button>
        </div>
      </div>

      <div class="h-80">
        {chartType() === "emails" ? (
          <StackedLineChart
            xSeries={emailData.map(item => item.name)}
            data={objectToDataSeries("name", emailData)}
          />
        ) : (
          <StackedLineChart
            xSeries={performanceData.map(item => item.name)}
            data={objectToDataSeries("name", performanceData)}
          />
        )}
      </div>
    </div>
  );
};

export default ChartSection;
