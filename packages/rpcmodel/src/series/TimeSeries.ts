export type TimeSeriesDataPoint = [number, number];

export interface TimeSeries {
  series: string;
  entries: TimeSeriesDataPoint[];
}
