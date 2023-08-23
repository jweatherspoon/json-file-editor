import { FormGroup, InputLabel, MenuItem, Select } from '@mui/material';
import { EditorProps } from '../../../models/editor-props';

const DropdownEditor = ({
  field,
  value,
  onChange,
  options,
}: EditorProps<string>) => {
  const menuItems = [
    <MenuItem key="no-value" value="">
      None
    </MenuItem>,
    ...(options ?? []).map((o) => (
      <MenuItem key={o} value={o}>
        {o}
      </MenuItem>
    )),
  ];

  const labelId = `${field}-label`;

  return (
    <FormGroup>
      <InputLabel id={labelId}>{field}</InputLabel>
      <Select
        labelId={labelId}
        label={field}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {menuItems}
      </Select>
    </FormGroup>
  );
};

export default DropdownEditor;
