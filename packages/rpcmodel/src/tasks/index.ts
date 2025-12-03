export interface ContactImportParameters {
  file_id: string;
  list_ids: string[];
  mapping: [target: string, source: string][];
}

export interface ContactImportArguments {
  batch_size: number;
  import_id: string;
  tenant_id: string;
}
