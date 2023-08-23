import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
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
    <Stack>
      <Typography variant="body1">{field}</Typography>
      <ToggleButtonGroup
        orientation="vertical"
        value={value ?? []}
        onChange={(_, v) => onChange(v)}
      >
        {choices}
      </ToggleButtonGroup>
    </Stack>
  );
};

export default ArrayEditor;
