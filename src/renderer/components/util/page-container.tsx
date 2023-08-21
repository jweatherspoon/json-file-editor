import { AppBar, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { Suspense } from 'react';
import { PageProps } from '../../models/view-info';

export const PageContainer: React.FC<PageProps> = ({ view }: PageProps) => {
  const Page = React.lazy(() => import(`../pages/${view.key}`));
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h3"
            textTransform="uppercase"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            {view.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box>
        <Suspense fallback={<div>loading</div>}>
          <Page />
        </Suspense>
      </Box>
    </Box>
  );
};
