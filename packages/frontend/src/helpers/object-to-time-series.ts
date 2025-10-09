import type { TimeSeries } from "@mailtura/rpcmodel/lib/series/timeseries.js";

type TimeSeriesInput<XAxisKey extends keyof any, T> = {
  [K in keyof T]: K extends XAxisKey ? string : number;
};

export function objectToTimeSeries<XAxisKey extends keyof any, T extends Record<string, any>>(
  xAxis: XAxisKey,
  rows: TimeSeriesInput<XAxisKey, T>[]
): TimeSeries[] {
  if (rows.length === 0) return [];

  const seriesKeys = Object.keys(rows[0]).filter(key => key !== xAxis);

  return rows.reduce(
    (acc, row) => {
      const seriesValues = seriesKeys.map(seriesKey => row[seriesKey]);
      return acc.map(series => {
        return {
          series: series.series,
          entries: [...series.entries, seriesValues[seriesKeys.indexOf(series.series)]],
        } as TimeSeries;
      });
    },
    seriesKeys.map(seriesKey => {
      return { series: seriesKey, entries: [] } as TimeSeries;
    })
  );
}
