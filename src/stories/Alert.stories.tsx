import type { Meta, StoryObj } from '@storybook/preact';
import { h } from 'preact';

import { Alert, AlertTitle } from '../components/ui/Alert';
import { Button } from '../components/ui/Button';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllSeverities: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Alert severity="error">This is an error alert</Alert>
      <Alert severity="warning">This is a warning alert</Alert>
      <Alert severity="info">This is an info alert</Alert>
      <Alert severity="success">This is a success alert</Alert>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3>Standard Variant</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Alert variant="standard" severity="error">Standard error alert</Alert>
          <Alert variant="standard" severity="warning">Standard warning alert</Alert>
          <Alert variant="standard" severity="info">Standard info alert</Alert>
          <Alert variant="standard" severity="success">Standard success alert</Alert>
        </div>
      </div>
      <div>
        <h3>Filled Variant</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Alert variant="filled" severity="error">Filled error alert</Alert>
          <Alert variant="filled" severity="warning">Filled warning alert</Alert>
          <Alert variant="filled" severity="info">Filled info alert</Alert>
          <Alert variant="filled" severity="success">Filled success alert</Alert>
        </div>
      </div>
      <div>
        <h3>Outlined Variant</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Alert variant="outlined" severity="error">Outlined error alert</Alert>
          <Alert variant="outlined" severity="warning">Outlined warning alert</Alert>
          <Alert variant="outlined" severity="info">Outlined info alert</Alert>
          <Alert variant="outlined" severity="success">Outlined success alert</Alert>
        </div>
      </div>
    </div>
  ),
};

export const WithTitle: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        This is an error alert with a title
      </Alert>
      <Alert severity="warning">
        <AlertTitle>Warning</AlertTitle>
        This is a warning alert with a title
      </Alert>
      <Alert severity="info">
        <AlertTitle>Information</AlertTitle>
        This is an info alert with a title
      </Alert>
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        This is a success alert with a title
      </Alert>
    </div>
  ),
};

export const WithCloseButton: Story = {
  render: () => {
    return (
      <Alert severity="warning" onClose={() => console.log('Close clicked')}>
        <AlertTitle>Dismissible Alert</AlertTitle>
        This alert can be closed by clicking the close button
      </Alert>
    );
  },
};

export const WithAction: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Alert
        severity="info"
        action={
          <Button variant="text" size="small" color="info">
            Undo
          </Button>
        }
      >
        This is an alert with a custom action button
      </Alert>
      <Alert
        severity="success"
        action={
          <Button variant="text" size="small" color="success">
            View
          </Button>
        }
        onClose={() => console.log('Close clicked')}
      >
        <AlertTitle>Success!</AlertTitle>
        Your changes have been saved successfully
      </Alert>
    </div>
  ),
};

export const NoIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Alert severity="error" icon={false}>Error alert without icon</Alert>
      <Alert severity="success" icon={false}>Success alert without icon</Alert>
    </div>
  ),
};

export const CustomIcon: Story = {
  render: () => (
    <Alert
      severity="info"
      icon={
        <span style={{ fontSize: '20px' }}>🎉</span>
      }
    >
      Alert with custom icon
    </Alert>
  ),
};
