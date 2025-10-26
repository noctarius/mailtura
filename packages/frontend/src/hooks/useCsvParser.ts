import { LocalFile, parse, ParseLocalConfig, ParseMeta, ParseResult } from "papaparse";

export type ParserResult<T> = { data: T[]; meta: ParseMeta };

export const useCsvParser = () => {
  return {
    parseFile: <T, TFile extends LocalFile = LocalFile>(file: TFile): Promise<ParserResult<T>> => {
      return new Promise<ParserResult<T>>((resolve, reject) => {
        const config: ParseLocalConfig<T, TFile> = {
          header: true,
          skipEmptyLines: true,
          preview: 6,
          complete(results: ParseResult<T>) {
            if (results.errors && results.errors.length > 0) return reject(results.errors);
            resolve({ data: results.data, meta: results.meta });
          },
        };
        parse(file, config);
      });
    },
  };
};
