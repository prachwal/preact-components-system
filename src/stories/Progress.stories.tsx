import type { Meta, StoryObj } from '@storybook/preact';
import { CircularProgress, LinearProgress } from '../components/ui/Progress';
import { h } from 'preact';

const CircularMeta = {
  title: 'Components/Feedback/CircularProgress',
  component: CircularProgress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['determinate', 'indeterminate'],
      description: 'The variant to use',
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'The value of the progress (0-100) for determinate variant',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info'],
      description: 'The color of the progress indicator',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the progress indicator',
    },
  },
} satisfies Meta<typeof CircularProgress>;

export default CircularMeta;
type CircularStory = StoryObj<typeof CircularMeta>;

export const Indeterminate: CircularStory = {
  args: {
    variant: 'indeterminate',
    color: 'primary',
  },
};

export const Determinate: CircularStory = {
  args: {
    variant: 'determinate',
    value: 75,
    color: 'primary',
  },
};

export const AllColors: CircularStory = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center' }}>
        <CircularProgress color="primary" />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Primary</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <CircularProgress color="secondary" />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Secondary</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <CircularProgress color="success" />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Success</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <CircularProgress color="error" />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Error</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <CircularProgress color="warning" />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Warning</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <CircularProgress color="info" />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Info</p>
      </div>
    </div>
  ),
};

export const AllSizes: CircularStory = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <CircularProgress size="small" />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Small</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <CircularProgress size="medium" />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Medium</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <CircularProgress size="large" />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Large</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <CircularProgress size={80} />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Custom (80px)</p>
      </div>
    </div>
  ),
};

export const DeterminateValues: CircularStory = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center' }}>
        <CircularProgress variant="determinate" value={0} />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>0%</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <CircularProgress variant="determinate" value={25} />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>25%</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <CircularProgress variant="determinate" value={50} />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>50%</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <CircularProgress variant="determinate" value={75} />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>75%</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <CircularProgress variant="determinate" value={100} />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>100%</p>
      </div>
    </div>
  ),
};

// Linear Progress Stories
const LinearMeta = {
  title: 'Components/Feedback/LinearProgress',
  component: LinearProgress,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['determinate', 'indeterminate', 'buffer'],
      description: 'The variant to use',
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'The value of the progress (0-100) for determinate variant',
    },
    valueBuffer: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'The value for the buffer (0-100) for buffer variant',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info'],
      description: 'The color of the progress indicator',
    },
  },
} satisfies Meta<typeof LinearProgress>;

type LinearStory = StoryObj<typeof LinearMeta>;

export const LinearIndeterminate: LinearStory = {
  args: {
    variant: 'indeterminate',
    color: 'primary',
  },
  render: (args) => (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <LinearProgress {...args} />
    </div>
  ),
};

export const LinearDeterminate: LinearStory = {
  args: {
    variant: 'determinate',
    value: 65,
    color: 'primary',
  },
  render: (args) => (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <LinearProgress {...args} />
    </div>
  ),
};

export const LinearBuffer: LinearStory = {
  args: {
    variant: 'buffer',
    value: 40,
    valueBuffer: 70,
    color: 'primary',
  },
  render: (args) => (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <LinearProgress {...args} />
    </div>
  ),
};

export const LinearAllColors: LinearStory = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px' }}>Primary</p>
        <LinearProgress variant="determinate" value={70} color="primary" />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px' }}>Secondary</p>
        <LinearProgress variant="determinate" value={70} color="secondary" />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px' }}>Success</p>
        <LinearProgress variant="determinate" value={70} color="success" />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px' }}>Error</p>
        <LinearProgress variant="determinate" value={70} color="error" />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px' }}>Warning</p>
        <LinearProgress variant="determinate" value={70} color="warning" />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px' }}>Info</p>
        <LinearProgress variant="determinate" value={70} color="info" />
      </div>
    </div>
  ),
};
