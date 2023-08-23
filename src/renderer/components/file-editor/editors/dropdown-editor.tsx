import { MenuItem, Select } from '@mui/material';
import { EditorProps } from '../../../models/editor-props';

const DropdownEditor = ({
  field,
  value,
  onChange,
  options,
}: EditorProps<string>) => {
  const menuItems = [
    <MenuItem key="no-value" value={undefined}>
      None
    </MenuItem>,
    ...(options ?? []).map((o) => (
      <MenuItem key={o} value={o}>
        {o}
      </MenuItem>
    )),
  ];

  return (
    <Select
      label={field}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {menuItems}
    </Select>
  );
};

export default DropdownEditor;
