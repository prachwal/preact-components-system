import type { Meta, StoryObj } from '@storybook/preact';
import { h } from 'preact';

import { Button } from '../components/ui/Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
      description: 'Button variant',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
      description: 'Button color',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make button full width',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'contained',
    color: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'contained',
    color: 'secondary',
  },
};

export const Outlined: Story = {
  args: {
    children: 'Outlined Button',
    variant: 'outlined',
    color: 'primary',
  },
};

export const Text: Story = {
  args: {
    children: 'Text Button',
    variant: 'text',
    color: 'primary',
  },
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button variant="contained" color="primary">Primary</Button>
      <Button variant="contained" color="secondary">Secondary</Button>
      <Button variant="contained" color="error">Error</Button>
      <Button variant="contained" color="warning">Warning</Button>
      <Button variant="contained" color="info">Info</Button>
      <Button variant="contained" color="success">Success</Button>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexDirection: 'column', alignItems: 'flex-start' }}>
      <Button variant="contained" color="primary">Contained</Button>
      <Button variant="outlined" color="primary">Outlined</Button>
      <Button variant="text" color="primary">Text</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button size="small" color="primary">Small</Button>
      <Button size="medium" color="primary">Medium</Button>
      <Button size="large" color="primary">Large</Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexDirection: 'column', alignItems: 'flex-start' }}>
      <Button variant="contained" startIcon={<span>←</span>}>Start Icon</Button>
      <Button variant="contained" endIcon={<span>→</span>}>End Icon</Button>
      <Button variant="outlined" startIcon={<span>↓</span>} endIcon={<span>↓</span>}>
        Both Icons
      </Button>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    children: 'Loading Button',
    loading: true,
    variant: 'contained',
    color: 'primary',
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexDirection: 'column', alignItems: 'flex-start' }}>
      <Button variant="contained" disabled>Contained Disabled</Button>
      <Button variant="outlined" disabled>Outlined Disabled</Button>
      <Button variant="text" disabled>Text Disabled</Button>
    </div>
  ),
};

export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    fullWidth: true,
    variant: 'contained',
    color: 'primary',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};
