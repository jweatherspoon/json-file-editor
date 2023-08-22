export interface FieldSchema {
  id: string;
  type: string;
  options?: string[];
  required?: boolean;
}

export interface FileInfo {
  path?: string;
  nameField?: string;
  schema: FieldSchema[];
}
