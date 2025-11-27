import type { Meta, StoryObj } from '@storybook/preact';
import { h } from 'preact';

import { Box } from '../components/layout/Box';
import { Grid } from '../components/layout/Grid';
import { Button } from '../components/ui/Button';
import { ThemeProvider } from '../providers/ThemeProvider';
import { createTheme } from '../theme/createTheme';

const meta = {
  title: 'Theme/Theme System',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultTheme: Story = {
  render: () => {
    const theme = createTheme();

    return (
      <Box p={3}>
        <h2>Default Theme</h2>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h3>Primary Color</h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div
                style={{
                  padding: '16px',
                  backgroundColor: theme.palette.primary.light,
                  color: theme.palette.primary.contrastText,
                }}
              >
                Light
              </div>
              <div
                style={{
                  padding: '16px',
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                }}
              >
                Main
              </div>
              <div
                style={{
                  padding: '16px',
                  backgroundColor: theme.palette.primary.dark,
                  color: theme.palette.primary.contrastText,
                }}
              >
                Dark
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <h3>Secondary Color</h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div
                style={{
                  padding: '16px',
                  backgroundColor: theme.palette.secondary.light,
                  color: theme.palette.secondary.contrastText,
                }}
              >
                Light
              </div>
              <div
                style={{
                  padding: '16px',
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                }}
              >
                Main
              </div>
              <div
                style={{
                  padding: '16px',
                  backgroundColor: theme.palette.secondary.dark,
                  color: theme.palette.secondary.contrastText,
                }}
              >
                Dark
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <h3>Status Colors</h3>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <div
                style={{
                  padding: '16px',
                  backgroundColor: theme.palette.error.main,
                  color: theme.palette.error.contrastText,
                }}
              >
                Error
              </div>
              <div
                style={{
                  padding: '16px',
                  backgroundColor: theme.palette.warning.main,
                  color: theme.palette.warning.contrastText,
                }}
              >
                Warning
              </div>
              <div
                style={{
                  padding: '16px',
                  backgroundColor: theme.palette.info.main,
                  color: theme.palette.info.contrastText,
                }}
              >
                Info
              </div>
              <div
                style={{
                  padding: '16px',
                  backgroundColor: theme.palette.success.main,
                  color: theme.palette.success.contrastText,
                }}
              >
                Success
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <h3>Typography</h3>
            <div>
              <p style={{ ...theme.typography.h1 }}>H1 Heading</p>
              <p style={{ ...theme.typography.h2 }}>H2 Heading</p>
              <p style={{ ...theme.typography.h3 }}>H3 Heading</p>
              <p style={{ ...theme.typography.body1 }}>Body 1 Text</p>
              <p style={{ ...theme.typography.body2 }}>Body 2 Text</p>
            </div>
          </Grid>
        </Grid>
      </Box>
    );
  },
};

export const CustomTheme: Story = {
  render: () => {
    const customTheme = createTheme({
      palette: {
        primary: {
          main: '#ff5722',
        },
        secondary: {
          main: '#00bcd4',
        },
      },
      typography: {
        fontFamily: 'Georgia, serif',
      },
    });

    return (
      <ThemeProvider theme={customTheme}>
        <Box p={3}>
          <h2>Custom Theme</h2>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h3>Custom Primary Color (#ff5722)</h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div
                  style={{
                    padding: '16px',
                    backgroundColor: customTheme.palette.primary.light,
                    color: customTheme.palette.primary.contrastText,
                  }}
                >
                  Light
                </div>
                <div
                  style={{
                    padding: '16px',
                    backgroundColor: customTheme.palette.primary.main,
                    color: customTheme.palette.primary.contrastText,
                  }}
                >
                  Main
                </div>
                <div
                  style={{
                    padding: '16px',
                    backgroundColor: customTheme.palette.primary.dark,
                    color: customTheme.palette.primary.contrastText,
                  }}
                >
                  Dark
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <h3>Custom Secondary Color (#00bcd4)</h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div
                  style={{
                    padding: '16px',
                    backgroundColor: customTheme.palette.secondary.light,
                    color: customTheme.palette.secondary.contrastText,
                  }}
                >
                  Light
                </div>
                <div
                  style={{
                    padding: '16px',
                    backgroundColor: customTheme.palette.secondary.main,
                    color: customTheme.palette.secondary.contrastText,
                  }}
                >
                  Main
                </div>
                <div
                  style={{
                    padding: '16px',
                    backgroundColor: customTheme.palette.secondary.dark,
                    color: customTheme.palette.secondary.contrastText,
                  }}
                >
                  Dark
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <h3>Custom Typography (Georgia)</h3>
              <p style={{ fontFamily: customTheme.typography.fontFamily }}>
                This text uses the custom font family: {customTheme.typography.fontFamily}
              </p>
            </Grid>
            <Grid item xs={12}>
              <h3>Components with Custom Theme</h3>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <Button variant='contained' color='primary'>
                  Primary
                </Button>
                <Button variant='contained' color='secondary'>
                  Secondary
                </Button>
                <Button variant='outlined' color='primary'>
                  Outlined Primary
                </Button>
                <Button variant='outlined' color='secondary'>
                  Outlined Secondary
                </Button>
              </div>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    );
  },
};

export const DarkMode: Story = {
  render: () => {
    const darkTheme = createTheme({
      palette: {
        mode: 'dark',
      },
    });

    return (
      <ThemeProvider theme={darkTheme}>
        <Box
          p={3}
          style={{
            backgroundColor: darkTheme.palette.background.default,
            color: darkTheme.palette.text.primary,
          }}
        >
          <h2>Dark Mode Theme</h2>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h3>Background Colors</h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div
                  style={{
                    padding: '16px',
                    backgroundColor: darkTheme.palette.background.default,
                    border: `1px solid ${darkTheme.palette.divider}`,
                    color: darkTheme.palette.text.primary,
                  }}
                >
                  Default Background
                </div>
                <div
                  style={{
                    padding: '16px',
                    backgroundColor: darkTheme.palette.background.paper,
                    color: darkTheme.palette.text.primary,
                  }}
                >
                  Paper Background
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <h3>Text Colors</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <p style={{ color: darkTheme.palette.text.primary }}>Primary Text</p>
                <p style={{ color: darkTheme.palette.text.secondary }}>Secondary Text</p>
                <p style={{ color: darkTheme.palette.text.disabled }}>Disabled Text</p>
              </div>
            </Grid>
            <Grid item xs={12}>
              <h3>Components in Dark Mode</h3>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <Button variant='contained' color='primary'>
                  Primary
                </Button>
                <Button variant='contained' color='secondary'>
                  Secondary
                </Button>
                <Button variant='outlined' color='error'>
                  Error
                </Button>
                <Button variant='text' color='success'>
                  Success
                </Button>
              </div>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    );
  },
};

export const SpacingSystem: Story = {
  render: () => {
    const theme = createTheme();

    return (
      <Box p={3}>
        <h2>Spacing System</h2>
        <p>Base spacing unit: 8px</p>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h3>Spacing Examples</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[0, 1, 2, 3, 4, 5].map((factor) => (
                <div key={factor}>
                  <code>
                    spacing({factor}) = {theme.spacing(factor)}
                  </code>
                  <div
                    style={{
                      width: theme.spacing(factor),
                      height: '20px',
                      backgroundColor: '#1976d2',
                      marginTop: '4px',
                    }}
                  />
                </div>
              ))}
            </div>
          </Grid>
        </Grid>
      </Box>
    );
  },
};
