import { Icons } from './icons';

export interface ViewInfo {
  key: string;
  route: string;
  title: string;
  icon: Icons;
  bottom?: boolean;
  disabled?: boolean;
}

export interface PageProps {
  view: ViewInfo;
}

export interface NavigationProps {
  width: number;
  config: ViewInfo[];
}
