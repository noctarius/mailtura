export type DataSeriesDataPoint<Key> = [Key, number];

export interface DataSeries<Key extends string | number> {
  series: string;
  entries: DataSeriesDataPoint<Key>[];
}
