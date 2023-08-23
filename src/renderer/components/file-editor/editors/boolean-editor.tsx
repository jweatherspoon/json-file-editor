import { Checkbox, FormControlLabel } from '@mui/material';
import { EditorProps } from '../../../models/editor-props';

const BooleanEditor = ({ field, value, onChange }: EditorProps<boolean>) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={!!value}
          onChange={(e) => onChange(e.target.checked)}
        />
      }
      label={field}
    />
  );
};

export default BooleanEditor;
