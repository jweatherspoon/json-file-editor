import React from 'react';
import { SxProps } from '@mui/material';
import { Icons } from 'renderer/models/icons';
import { HomeRounded } from '@mui/icons-material';

const iconMap = new Map<Icons, any>([[Icons.Home, HomeRounded]]);

export const Icon: React.FC<IconProps> = ({ name, sx }: IconProps) => {
  const LoadedIcon = iconMap.get(name) ?? <></>;
  return <LoadedIcon sx={sx} />;
};

export interface IconProps {
  name: Icons;
  sx?: SxProps;
}
