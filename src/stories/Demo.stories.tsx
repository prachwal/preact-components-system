import type { Meta, StoryObj } from '@storybook/preact';
import { useState } from 'preact/hooks';

import { Container } from '../components/layout/Container';
import { Grid } from '../components/layout/Grid';
import { Stack } from '../components/layout/Stack';
import { Alert } from '../components/ui/Alert';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardContent, CardActions } from '../components/ui/Card';
import { Icon } from '../components/ui/Icon';
import { Paper } from '../components/ui/Paper';
import { Typography } from '../components/ui/Typography';
import { ClickAwayListener } from '../components/utils/ClickAwayListener';
import { FocusTrap } from '../components/utils/FocusTrap';
import { Portal } from '../components/utils/Portal';
import { ThemeProvider } from '../providers/ThemeProvider';

const meta = {
  title: 'Demo/Complete Showcase',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Demo component showcasing all features
const DemoShowcase = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [alertVisible, setAlertVisible] = useState(true);

  return (
    <ThemeProvider>
      <Container maxWidth='lg' style={{ padding: '40px 20px' }}>
        <Stack spacing={4}>
          {/* Header Section */}
          <Paper
            elevation={0}
            style={{
              padding: '32px',
              textAlign: 'center',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
            }}
          >
            <Icon name='Star' size='large' color='white' style={{ marginBottom: '16px' }} />
            <Typography
              variant='h2'
              component='h1'
              style={{ marginBottom: '16px', color: 'white' }}
            >
              Preact Components System
            </Typography>
            <Typography variant='body1' style={{ color: 'rgba(255,255,255,0.9)' }}>
              A comprehensive component library with modern design, full accessibility, and
              TypeScript support
            </Typography>
          </Paper>

          {/* Alert Section */}
          {alertVisible && (
            <Alert severity='info' variant='filled' onClose={() => setAlertVisible(false)}>
              Welcome to the component showcase! Explore all features below.
            </Alert>
          )}

          {/* Features Grid */}
          <div>
            <Typography variant='h4' component='h2' style={{ marginBottom: '24px' }}>
              Core Features
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card elevation={2}>
                  <CardHeader>
                    <Icon name='Settings' size='medium' />
                    <Typography variant='h6' style={{ marginLeft: '12px' }}>
                      Icon System
                    </Typography>
                  </CardHeader>
                  <CardContent>
                    <Typography variant='body2'>
                      Integrated with lucide-preact for beautiful, accessible icons
                    </Typography>
                    <Stack direction='row' spacing={2} style={{ marginTop: '16px' }}>
                      <Icon name='Home' />
                      <Icon name='Star' />
                      <Icon name='Heart' />
                      <Icon name='Mail' />
                      <Icon name='Settings' />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card elevation={2}>
                  <CardHeader>
                    <Icon name='AlertCircle' size='medium' />
                    <Typography variant='h6' style={{ marginLeft: '12px' }}>
                      Alert Components
                    </Typography>
                  </CardHeader>
                  <CardContent>
                    <Stack spacing={2}>
                      <Alert severity='success' variant='outlined'>
                        Success message
                      </Alert>
                      <Alert severity='error' variant='outlined'>
                        Error message
                      </Alert>
                      <Alert severity='warning' variant='outlined'>
                        Warning message
                      </Alert>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card elevation={2}>
                  <CardHeader>
                    <Icon name='HelpCircle' size='medium' />
                    <Typography variant='h6' style={{ marginLeft: '12px' }}>
                      Utilities
                    </Typography>
                  </CardHeader>
                  <CardContent>
                    <Typography variant='body2' style={{ marginBottom: '16px' }}>
                      Portal, FocusTrap, and ClickAwayListener for advanced interactions
                    </Typography>
                    <Stack spacing={2}>
                      <Button variant='contained' onClick={() => setModalOpen(true)}>
                        Open Modal (Portal + FocusTrap)
                      </Button>
                      <div style={{ position: 'relative' }}>
                        <Button variant='outlined' onClick={() => setDropdownOpen(!dropdownOpen)}>
                          Toggle Dropdown
                        </Button>
                        {dropdownOpen && (
                          <ClickAwayListener onClickAway={() => setDropdownOpen(false)}>
                            <Paper
                              elevation={4}
                              style={{
                                position: 'absolute',
                                top: '100%',
                                marginTop: '8px',
                                padding: '16px',
                                zIndex: 1000,
                              }}
                            >
                              <Typography variant='body2'>Click outside to close</Typography>
                            </Paper>
                          </ClickAwayListener>
                        )}
                      </div>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>

          {/* Button Variants */}
          <div>
            <Typography variant='h4' component='h2' style={{ marginBottom: '24px' }}>
              Button Variants
            </Typography>
            <Paper elevation={1} style={{ padding: '24px' }}>
              <Stack spacing={3}>
                <Stack direction='row' spacing={2}>
                  <Button variant='contained' color='primary'>
                    Primary
                  </Button>
                  <Button variant='contained' color='secondary'>
                    Secondary
                  </Button>
                  <Button variant='contained' color='success'>
                    Success
                  </Button>
                  <Button variant='contained' color='error'>
                    Error
                  </Button>
                </Stack>
                <Stack direction='row' spacing={2}>
                  <Button variant='outlined' color='primary'>
                    Outlined
                  </Button>
                  <Button variant='outlined' color='secondary'>
                    Outlined
                  </Button>
                  <Button variant='text' color='primary'>
                    Text
                  </Button>
                  <Button variant='text' color='secondary'>
                    Text
                  </Button>
                </Stack>
                <Stack direction='row' spacing={2}>
                  <Button variant='contained' size='small'>
                    Small
                  </Button>
                  <Button variant='contained' size='medium'>
                    Medium
                  </Button>
                  <Button variant='contained' size='large'>
                    Large
                  </Button>
                </Stack>
              </Stack>
            </Paper>
          </div>

          {/* Typography Scale */}
          <div>
            <Typography variant='h4' component='h2' style={{ marginBottom: '24px' }}>
              Typography System
            </Typography>
            <Paper elevation={1} style={{ padding: '24px' }}>
              <Stack spacing={2}>
                <Typography variant='h1'>Heading 1</Typography>
                <Typography variant='h2'>Heading 2</Typography>
                <Typography variant='h3'>Heading 3</Typography>
                <Typography variant='h4'>Heading 4</Typography>
                <Typography variant='h5'>Heading 5</Typography>
                <Typography variant='h6'>Heading 6</Typography>
                <Typography variant='body1'>Body 1 - Regular body text</Typography>
                <Typography variant='body2'>Body 2 - Smaller body text</Typography>
                <Typography variant='caption'>Caption text</Typography>
              </Stack>
            </Paper>
          </div>
        </Stack>

        {/* Modal Example using Portal and FocusTrap */}
        {modalOpen && (
          <Portal>
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
              }}
              onClick={() => setModalOpen(false)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setModalOpen(false);
                }
              }}
              tabIndex={-1}
              role='button'
              aria-label='Close modal'
            >
              <FocusTrap active={modalOpen}>
                <Card
                  elevation={24}
                  onClick={(e: Event) => e.stopPropagation()}
                  style={{ maxWidth: '500px', width: '90%' }}
                >
                  <CardHeader>
                    <Typography variant='h5'>Modal Example</Typography>
                  </CardHeader>
                  <CardContent>
                    <Typography variant='body1'>
                      This modal demonstrates Portal (rendering outside DOM hierarchy) and FocusTrap
                      (keeping focus within the modal).
                    </Typography>
                    <Typography variant='body2' style={{ marginTop: '16px' }}>
                      Try pressing Tab - focus will cycle through the buttons below.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button variant='outlined' onClick={() => setModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button variant='contained' onClick={() => setModalOpen(false)}>
                      Confirm
                    </Button>
                  </CardActions>
                </Card>
              </FocusTrap>
            </div>
          </Portal>
        )}
      </Container>
    </ThemeProvider>
  );
};

export const CompleteShowcase: Story = {
  render: () => <DemoShowcase />,
};
