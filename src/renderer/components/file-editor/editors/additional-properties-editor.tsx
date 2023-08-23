import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';

const AdditionalPropertiesEditor = ({
  data,
  onChange,
}: AdditionalPropertiesEditorProps) => {
  const [text, setText] = useState('{}');
  useEffect(() => {
    setText(JSON.stringify(data ?? {}));
  }, [data]);

  const applyChange = (newValue: string) => {
    setText(newValue);
    try {
      const newData = JSON.parse(newValue);
      onChange(newData);
    } catch {}
  };

  return (
    <TextField
      label="Additional Properties"
      multiline
      minRows={1}
      maxRows={4}
      value={text}
      onChange={(e) => applyChange(e.target.value)}
    />
  );
};

export interface AdditionalPropertiesEditorProps {
  data: Record<string, any>;
  onChange: (data: Record<string, any>) => void;
}

export default AdditionalPropertiesEditor;
