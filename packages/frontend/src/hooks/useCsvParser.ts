import {
  type LocalFile,
  parse,
  type ParseLocalConfig,
  type ParseMeta,
  type Parser,
  type ParseResult,
  type ParseStepResult,
} from "papaparse";

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
    countRows: <T, TFile extends LocalFile = LocalFile>(file: TFile): Promise<number> => {
      return new Promise<number>(async resolve => {
        let rowCount = 0;
        const config: ParseLocalConfig<T, TFile> = {
          header: true,
          skipEmptyLines: true,
          step(_: ParseStepResult<T>, parser: Parser) {
            rowCount++;
            if (rowCount > 50000) {
              parser.abort();
            }
          },
          complete() {
            resolve(rowCount);
          },
        };
        parse(file, config);
      });
    },
  };
};
