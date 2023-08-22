export interface TabInfo {
  id: string;
  label: string;
  hasChanges?: boolean;
  filePath?: string;
  schema?: unknown[];
}
