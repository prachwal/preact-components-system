import type { Meta, StoryObj } from '@storybook/preact';
import { Snackbar } from '../components/ui/Snackbar';
import { Button } from '../components/ui/Button';
import { h } from 'preact';
import { useState } from 'preact/hooks';

const meta = {
  title: 'Components/Feedback/Snackbar',
  component: Snackbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'If true, the snackbar is visible',
    },
    message: {
      control: 'text',
      description: 'Message to display',
    },
    autoHideDuration: {
      control: 'number',
      description: 'Duration in milliseconds before auto-hide (0 to disable)',
    },
    position: {
      control: 'select',
      options: ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'],
      description: 'Position of the snackbar',
    },
    severity: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
      description: 'Severity of the snackbar (affects styling)',
    },
  },
} satisfies Meta<typeof Snackbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Show Snackbar</Button>
        <Snackbar 
          open={open} 
          message="This is a basic snackbar message"
          onClose={() => setOpen(false)}
        />
      </div>
    );
  },
};

export const WithAction: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    const handleUndo = () => {
      alert('Undo clicked!');
      setOpen(false);
    };
    
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Show Snackbar with Action</Button>
        <Snackbar 
          open={open} 
          message="Item deleted"
          onClose={() => setOpen(false)}
          action={
            <Button onClick={handleUndo} variant="text" size="small" style={{ color: 'white' }}>
              UNDO
            </Button>
          }
        />
      </div>
    );
  },
};

export const AllSeverities: Story = {
  render: () => {
    const [severity, setSeverity] = useState<'success' | 'error' | 'warning' | 'info' | null>(null);
    
    return (
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Button onClick={() => setSeverity('success')} color="success">Success</Button>
        <Button onClick={() => setSeverity('error')} color="error">Error</Button>
        <Button onClick={() => setSeverity('warning')} color="warning">Warning</Button>
        <Button onClick={() => setSeverity('info')} color="info">Info</Button>
        
        <Snackbar 
          open={severity !== null} 
          message={`This is a ${severity} message`}
          severity={severity || undefined}
          onClose={() => setSeverity(null)}
          autoHideDuration={3000}
        />
      </div>
    );
  },
};

export const AllPositions: Story = {
  render: () => {
    const [position, setPosition] = useState<'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' | null>(null);
    
    return (
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '8px',
        maxWidth: '500px'
      }}>
        <Button onClick={() => setPosition('top-left')}>Top Left</Button>
        <Button onClick={() => setPosition('top-center')}>Top Center</Button>
        <Button onClick={() => setPosition('top-right')}>Top Right</Button>
        <Button onClick={() => setPosition('bottom-left')}>Bottom Left</Button>
        <Button onClick={() => setPosition('bottom-center')}>Bottom Center</Button>
        <Button onClick={() => setPosition('bottom-right')}>Bottom Right</Button>
        
        <Snackbar 
          open={position !== null} 
          message={`Snackbar at ${position}`}
          position={position || 'bottom-center'}
          onClose={() => setPosition(null)}
          autoHideDuration={2000}
        />
      </div>
    );
  },
};

export const AutoHide: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Show Auto-Hide Snackbar (3s)</Button>
        <Snackbar 
          open={open} 
          message="This will automatically close after 3 seconds"
          onClose={() => setOpen(false)}
          autoHideDuration={3000}
        />
      </div>
    );
  },
};

export const PersistentSnackbar: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Show Persistent Snackbar</Button>
        <Snackbar 
          open={open} 
          message="This snackbar will not auto-close"
          onClose={() => setOpen(false)}
          autoHideDuration={0}
          action={
            <Button onClick={() => setOpen(false)} variant="text" size="small" style={{ color: 'white' }}>
              CLOSE
            </Button>
          }
        />
      </div>
    );
  },
};
