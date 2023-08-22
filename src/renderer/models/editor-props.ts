export interface EditorProps<T> {
  field: string;
  value: T;
  onChange: (newValue: T) => void;
}
