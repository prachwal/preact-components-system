import type { Meta, StoryObj } from '@storybook/preact';
import { h } from 'preact';

import { Paper } from '../lib/components/ui/Paper';

const meta = {
  title: 'Components/Paper',
  component: Paper,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Paper>;

export default meta;
type Story = StoryObj<typeof meta>;

const DemoContent = () => <div style={{ padding: '16px' }}>Paper Content</div>;

export const Elevations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3>Elevation 0</h3>
        <Paper elevation={0}>
          <DemoContent />
        </Paper>
      </div>
      <div>
        <h3>Elevation 1</h3>
        <Paper elevation={1}>
          <DemoContent />
        </Paper>
      </div>
      <div>
        <h3>Elevation 2</h3>
        <Paper elevation={2}>
          <DemoContent />
        </Paper>
      </div>
      <div>
        <h3>Elevation 4</h3>
        <Paper elevation={4}>
          <DemoContent />
        </Paper>
      </div>
      <div>
        <h3>Elevation 8</h3>
        <Paper elevation={8}>
          <DemoContent />
        </Paper>
      </div>
      <div>
        <h3>Elevation 24</h3>
        <Paper elevation={24}>
          <DemoContent />
        </Paper>
      </div>
    </div>
  ),
};

export const Outlined: Story = {
  render: () => (
    <Paper variant='outlined'>
      <DemoContent />
    </Paper>
  ),
};

export const Square: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Paper elevation={3}>
        <div style={{ padding: '16px' }}>Rounded (default)</div>
      </Paper>
      <Paper elevation={3} square>
        <div style={{ padding: '16px' }}>Square corners</div>
      </Paper>
    </div>
  ),
};

export const CustomComponent: Story = {
  render: () => (
    <Paper component='section' elevation={2}>
      <div style={{ padding: '16px' }}>Rendered as &lt;section&gt; element</div>
    </Paper>
  ),
};
