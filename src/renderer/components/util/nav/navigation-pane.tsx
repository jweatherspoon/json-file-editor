import { Box, Divider, Stack } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { NavigationProps, ViewInfo } from '../../../models/view-info';
import { NavItem } from './nav-item';

export const NavigationPane = ({ config, width }: NavigationProps) => {
  const location = useLocation();

  const getNavItem = (route: ViewInfo) => (
    <NavItem
      icon={route.icon}
      text={route.title}
      key={route.key}
      path={route.route}
      enabled={!route.disabled}
      width={width}
      isSelected={location.pathname === route.route}
    />
  );

  const mainNavItems = config.filter((route) => !route.bottom).map(getNavItem);
  const bottomNavItems = config.filter((route) => route.bottom).map(getNavItem);

  return (
    <Stack sx={{ gap: 1 }}>
      <Divider />
      {mainNavItems}

      <Box sx={{ position: 'absolute', bottom: 0, width: 1 }}>
        <Divider />
        {bottomNavItems}
      </Box>
    </Stack>
  );
};
