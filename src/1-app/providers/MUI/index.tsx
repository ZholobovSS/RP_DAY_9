import type { ComponentType } from 'react';
import { theme } from './theme';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material';

export const withTheme = (WrappedComponent: ComponentType) => () => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <WrappedComponent />
    </ThemeProvider>
);
