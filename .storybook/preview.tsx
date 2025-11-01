import type { Preview } from '@storybook/preact-vite';
import { ThemeProvider } from '../src/providers/ThemeProvider';
import '../src/index.scss';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story: any, context: any) => {
      const theme = context.globals.theme || 'system';
      return (
        <div
          data-theme={theme}
          style={{
            backgroundColor: 'var(--bg)',
            color: 'var(--text)',
            // minHeight: '100vh',
            padding: '1rem',
            transition: 'background-color 0.25s ease, color 0.25s ease'
          }}
        >
          <ThemeProvider>
            {Story(context)}
          </ThemeProvider>
        </div>
      );
    },
  ],
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'system',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light theme' },
          { value: 'dark', icon: 'moon', title: 'Dark theme' },
          { value: 'system', icon: 'computer', title: 'System theme' },
        ],
        showName: true,
      },
    },
  },
};

export default preview;