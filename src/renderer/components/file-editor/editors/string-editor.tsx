import { TextField } from '@mui/material';
import { EditorProps } from '../../../models/editor-props';

const StringEditor = ({ field, value, onChange }: EditorProps<string>) => {
  return (
    <TextField
      label={field}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default StringEditor;
