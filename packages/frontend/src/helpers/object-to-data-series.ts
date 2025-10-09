import type { DataSeries } from "@mailtura/rpcmodel/lib/series/dataseries.js";

type DataSeriesInput<XAxisKey extends keyof any, T> = {
  [K in keyof T]: K extends XAxisKey ? string : number;
};

export function objectToDataSeries<XAxisKey extends PropertyKey, T extends Record<string, any>>(
  xAxis: XAxisKey,
  rows: DataSeriesInput<XAxisKey, T>[]
): DataSeries<string>[] {
  if (rows.length === 0) return [];

  const seriesKeys = Object.keys(rows[0]).filter(key => key !== xAxis);

  return rows.reduce(
    (acc, row) => {
      const seriesValues = seriesKeys.map(seriesKey => row[seriesKey]);
      const xAxisValue = (row as any)[xAxis];
      return acc.map(series => {
        return {
          series: series.series,
          entries: [
            ...series.entries,
            [xAxisValue, seriesValues[seriesKeys.indexOf(series.series)]],
          ],
        } as DataSeries<string>;
      });
    },
    seriesKeys.map(seriesKey => {
      return { series: seriesKey, entries: [] } as DataSeries<string>;
    })
  );
}
