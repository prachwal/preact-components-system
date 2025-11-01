import type { Meta, StoryObj } from '@storybook/preact';
import { Backdrop } from '../components/ui/Backdrop';
import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Button } from '../components/ui/Button';

const meta = {
  title: 'Components/Feedback/Backdrop',
  component: Backdrop,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'If true, the backdrop is visible',
    },
    invisible: {
      control: 'boolean',
      description: 'If true, the backdrop will be invisible',
    },
    zIndex: {
      control: 'number',
      description: 'Z-index of the backdrop',
    },
  },
} satisfies Meta<typeof Backdrop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <div style={{ padding: '20px' }}>
        <Button onClick={() => setOpen(true)}>Show Backdrop</Button>
        <Backdrop open={open} onClick={() => setOpen(false)} />
      </div>
    );
  },
};

export const Invisible: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <div style={{ padding: '20px' }}>
        <Button onClick={() => setOpen(true)}>Show Invisible Backdrop</Button>
        <Backdrop open={open} onClick={() => setOpen(false)} invisible />
        {open && (
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            zIndex: 1001
          }}>
            <p>Content above invisible backdrop</p>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </div>
        )}
      </div>
    );
  },
};

export const CustomZIndex: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <div style={{ padding: '20px' }}>
        <Button onClick={() => setOpen(true)}>Show Backdrop (z-index: 2000)</Button>
        <Backdrop open={open} onClick={() => setOpen(false)} zIndex={2000} />
      </div>
    );
  },
};
