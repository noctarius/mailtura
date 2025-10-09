import type { DataSeries, DataSeriesDataPoint } from "@mailtura/rpcmodel/lib/series/dataseries.js";
import type { TimeSeries, TimeSeriesDataPoint } from "@mailtura/rpcmodel/lib/series/timeseries.js";

export function mergeDataSeries<Key extends string | number>(
  currentSeries: DataSeries<Key>,
  newSeries: DataSeries<Key>
): DataSeries<Key> {
  if (!currentSeries || !currentSeries.entries) return newSeries;
  if (currentSeries.entries.length === 0) return newSeries;
  if (typeof currentSeries.entries[0][0] === typeof newSeries.entries[0][0])
    throw new TypeError("Data series keys must be of the same type");

  const sorter = (a: DataSeriesDataPoint<Key>, b: DataSeriesDataPoint<Key>) => {
    return typeof a[0] === "number" && typeof b[0] === "number"
      ? a[0] - b[0]
      : a[0].toString().localeCompare(b[0].toString());
  };

  const mergedDataPoints: DataSeriesDataPoint<Key>[] = [...currentSeries.entries].sort(sorter);
  const latestDataPoint: DataSeriesDataPoint<Key> = newSeries.entries[newSeries.entries.length - 1];

  mergedDataPoints.push(...newSeries.entries.filter(entry => entry[0] > latestDataPoint[0]));
  return {
    series: newSeries.series,
    entries: mergedDataPoints,
  };
}

export function mergeTimeSeries(
  currentSeries: TimeSeries,
  newSeries: TimeSeries,
  limit: number = 3600000
): TimeSeries {
  if (!currentSeries) return newSeries;
  const mergedDataPoints: TimeSeriesDataPoint[] = [...currentSeries.entries].sort(
    (a, b) => a[0] - b[0]
  );
  const latestDataPoint: TimeSeriesDataPoint = newSeries.entries[newSeries.entries.length - 1];

  mergedDataPoints.push(...newSeries.entries.filter(entry => entry[0] > latestDataPoint[0]));
  const sortedDataPoints = mergedDataPoints.sort((a, b) => a[0] - b[0]);

  const earliest = Date.now() - limit;
  const limitedDataPoints = sortedDataPoints.filter(
    (entry, index, items) =>
      entry[0] > earliest && index < items.length - 1 && entry[0] !== items[index + 1][0]
  );
  return {
    series: newSeries.series,
    entries: limitedDataPoints,
  };
}
