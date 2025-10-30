import { compose } from '@/6-shared/lib/compose';
import { withTheme } from './MUI';
import { withToastify } from './Toastify';
import { withReactDayPicker } from './ReactDayPicker';
import { withTanStackQuery } from './TanStackQuery';
import { withAuthProvider } from './Auth';

export const withProviders = compose(withAuthProvider, withTheme, withToastify, withTanStackQuery, withReactDayPicker);
