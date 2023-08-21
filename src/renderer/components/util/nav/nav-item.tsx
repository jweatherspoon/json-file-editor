import { Button, Link, Tooltip } from '@mui/material';
import { Icon } from '../icon';
import { Icons } from '../../../models/icons';

export const NavItem: React.FC<NavItemProps> = ({
  icon,
  text,
  path,
  enabled,
  width,
  isSelected,
}: NavItemProps) => {
  const getColor = (theme: any) => {
    if (isSelected) {
      return theme.palette.tertiary.main;
    }

    if (!enabled) {
      return theme.palette.action.disabled.light;
    }

    return theme.palette.primary.main;
  };

  const w = width ?? 60;

  return (
    <Link to={path}>
      <Tooltip title={text}>
        <Button
          sx={{
            p: 2,
            height: w,
            width: w,
            bgcolor: (theme) => getColor(theme),
          }}
        >
          <Icon name={icon} sx={{ height: w * 0.9, width: w * 0.9 }} />
        </Button>
      </Tooltip>
    </Link>
  );
};

export interface NavItemProps {
  icon: Icons;
  text: string;
  path: string;
  width: number;
  enabled: boolean;
  isSelected?: boolean;
}
