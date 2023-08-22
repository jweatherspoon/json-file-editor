import { FieldSchema } from '../../../shared/models/file-info.interface';
import FieldEditor from './field-editor';

const ObjectEditor = ({ schema, obj, onChange }: ObjectEditorProps) => {
  const editors = schema.map((x) => (
    <FieldEditor
      key={`${x.id}-editor`}
      schema={x}
      editorProps={{
        field: x.id,
        value: obj[x.id],
        onChange: (newValue) => onChange(x.id, newValue),
      }}
    />
  ));

  return <>{editors}</>;
};

export interface ObjectEditorProps {
  schema: FieldSchema[];
  obj: Record<string, any>;
  onChange: (field: string, newValue: any) => void;
}

export default ObjectEditor;
