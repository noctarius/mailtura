import type { DataSeries } from "@mailtura/rpcmodel/lib/series/dataseries.js";
import { capitalize } from "../../helpers/capitalize.js";
import { getSolidColor } from "../../helpers/charts-colors.js";
import { EChartsAutoSize } from "echarts-solid";
import { createMemo } from "solid-js";

interface StackedLineChartProps {
  xSeries: string[];
  data: DataSeries<string>[];
}

const StackLineChart = (props: StackedLineChartProps) => {
  const buildOptions = createMemo(() => {
    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
        },
        formatter: (
          params: { axisValue: number; seriesName: string; value: string; color: string }[]
        ) => {
          return `<div style="font-weight: bold; margin-bottom: 8px;">${params[0].axisValue}</div>${params.reduce(
            (acc, param) => {
              return `${acc}
                <div style="display: flex; align-items: center; margin-bottom: 4px;">
                  <span style="display: inline-block; width: 10px; height: 10px; background-color: ${param.color}; border-radius: 50%; margin-right: 8px;"></span>
                  <span style="margin-right: 8px;">${param.seriesName}:</span>
                  <span style="font-weight: bold;">${param.value.toLocaleString()}</span>
                </div>`;
            },
            ""
          )}`;
        },
      },
      legend: {
        data: props.data.map(series => capitalize(series.series)),
        bottom: 0,
        textStyle: {
          color: "#6b7280",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "15%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: props.xSeries,
        axisLine: {
          lineStyle: {
            color: "#e5e7eb",
          },
        },
        axisLabel: {
          color: "#6b7280",
        },
      },
      yAxis: {
        type: "value",
        axisLine: {
          lineStyle: {
            color: "#e5e7eb",
          },
        },
        axisLabel: {
          color: "#6b7280",
          formatter: (value: number) => value.toLocaleString(),
        },
        splitLine: {
          lineStyle: {
            color: "#f0f0f0",
            type: "dashed",
          },
        },
      },
      series: props.data.map((series, index) => {
        const dataPoints = props.data.find(d => d.series === series.series)?.entries;
        return {
          name: capitalize(series.series),
          type: "line",
          stack: "Total",
          areaStyle: {
            opacity: 0.2,
          },
          emphasis: {
            focus: "series",
          },
          data: dataPoints?.map(value => value[1]),
          itemStyle: {
            color: getSolidColor(index),
          },
          lineStyle: {
            width: 2,
          },
        };
      }),
    };
  });

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <EChartsAutoSize
        option={buildOptions()}
        style={{ height: "100%", width: "100%" }}
        opts={{ renderer: "canvas" }}
      />
    </div>
  );
};

export default StackLineChart;
