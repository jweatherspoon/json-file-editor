import { ReactNode } from 'react';

export interface TabInfo {
  id: string;
  label: string;
  hasChanges?: boolean;
  content?: ReactNode;
  disabled?: boolean;
}
