export interface ContactImportParameters {
  file_id: string;
  subscriptions: string[];
  mapping: [target: string, source: string][];
}

export interface ContactImportArguments {
  batch_size: number;
  import_id: string;
  tenant_id: string;
}

export interface SendMailArguments {
  batch_size: number;
  mail_sending_id: string;
  tenant_id: string;
}
