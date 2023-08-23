import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { EditorProps } from '../../../models/editor-props';

const ArrayEditor = ({
  field,
  value,
  onChange,
  options,
}: EditorProps<string[]>) => {
  const choices = options?.map((o) => (
    <ToggleButton value={o} key={o}>
      {o}
    </ToggleButton>
  ));

  return (
    <ToggleButtonGroup
      orientation="vertical"
      value={value ?? []}
      onChange={(_, v) => onChange(v)}
    >
      {choices}
    </ToggleButtonGroup>
  );
};

export default ArrayEditor;
