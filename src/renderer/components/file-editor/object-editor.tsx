import { Stack } from '@mui/material';
import { FieldSchema } from '../../../shared/models/file-info.interface';
import FieldEditor from './field-editor';

const ObjectEditor = ({ schema, obj, onChange }: ObjectEditorProps) => {
  const editors = schema.map((x) => (
    <FieldEditor
      key={`${x.id}-editor`}
      schema={x}
      editorProps={{
        field: x.id,
        value: obj[x.id] ?? '',
        onChange: (newValue) => onChange(x.id, newValue),
        options: x.options,
      }}
    />
  ));

  return <Stack direction="column">{editors}</Stack>;
};

export interface ObjectEditorProps {
  schema: FieldSchema[];
  obj: Record<string, any>;
  onChange: (field: string, newValue: any) => void;
}

export default ObjectEditor;
