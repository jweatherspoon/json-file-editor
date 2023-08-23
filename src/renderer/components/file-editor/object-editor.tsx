import { Stack } from '@mui/material';
import { FieldSchema } from '../../../shared/models/file-info.interface';
import FieldEditor from './field-editor';
import AdditionalPropertiesEditor from './editors/additional-properties-editor';

const ObjectEditor = ({ schema, obj, onChange }: ObjectEditorProps) => {
  if (!obj) {
    return null;
  }

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

  const additionalProperties = Object.fromEntries(
    Object.entries(obj).filter(([key]) => !schema.find((s) => s.id === key))
  );

  const onAdditionalPropertiesChanged = (o: Record<string, any>) => {
    Object.entries(o).forEach(([key, val]) => onChange(key, val));
  };

  return (
    <Stack direction="column" gap={1}>
      {editors}
      <AdditionalPropertiesEditor
        onChange={onAdditionalPropertiesChanged}
        data={additionalProperties}
      />
    </Stack>
  );
};

export interface ObjectEditorProps {
  schema: FieldSchema[];
  obj: Record<string, any>;
  onChange: (field: string, newValue: any) => void;
}

export default ObjectEditor;
