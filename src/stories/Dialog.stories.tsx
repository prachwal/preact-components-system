import type { Meta, StoryObj } from '@storybook/preact';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '../components/ui/Dialog';
import { Button } from '../components/ui/Button';
import { h } from 'preact';
import { useState } from 'preact/hooks';

const meta = {
  title: 'Components/Feedback/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'If true, the dialog is visible',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'fullscreen'],
      description: 'Size of the dialog',
    },
    disableBackdropClick: {
      control: 'boolean',
      description: 'If true, clicking the backdrop will not close the dialog',
    },
    disableEscapeKeyDown: {
      control: 'boolean',
      description: 'If true, pressing the Escape key will not close the dialog',
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogContent>
            This is a basic dialog with title and content.
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} variant="text">Cancel</Button>
            <Button onClick={() => setOpen(false)} variant="contained">OK</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: () => {
    const [size, setSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl' | null>(null);
    
    return (
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Button onClick={() => setSize('xs')}>Extra Small</Button>
        <Button onClick={() => setSize('sm')}>Small</Button>
        <Button onClick={() => setSize('md')}>Medium</Button>
        <Button onClick={() => setSize('lg')}>Large</Button>
        <Button onClick={() => setSize('xl')}>Extra Large</Button>
        
        <Dialog open={size !== null} onClose={() => setSize(null)} size={size || 'md'}>
          <DialogTitle>Dialog Size: {size?.toUpperCase()}</DialogTitle>
          <DialogContent>
            This is a {size} dialog. Resize your browser or try different sizes to see the difference.
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSize(null)}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  },
};

export const Fullscreen: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open Fullscreen Dialog</Button>
        <Dialog open={open} onClose={() => setOpen(false)} size="fullscreen">
          <DialogTitle>Fullscreen Dialog</DialogTitle>
          <DialogContent>
            <p>This dialog takes up the entire viewport.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  },
};

export const ConfirmationDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    const handleConfirm = () => {
      alert('Confirmed!');
      setOpen(false);
    };
    
    return (
      <div>
        <Button onClick={() => setOpen(true)} color="error">Delete Item</Button>
        <Dialog open={open} onClose={() => setOpen(false)} size="sm">
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this item? This action cannot be undone.
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} variant="text">Cancel</Button>
            <Button onClick={handleConfirm} variant="contained" color="error">Delete</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  },
};

export const NoBackdropClose: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open Dialog (No Backdrop Close)</Button>
        <Dialog open={open} onClose={() => setOpen(false)} disableBackdropClick>
          <DialogTitle>Important Message</DialogTitle>
          <DialogContent>
            You must click a button to close this dialog. Clicking the backdrop won't work.
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} variant="contained">Got it</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  },
};

export const ScrollableContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open Dialog with Long Content</Button>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Terms and Conditions</DialogTitle>
          <DialogContent>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} variant="text">Decline</Button>
            <Button onClick={() => setOpen(false)} variant="contained">Accept</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  },
};
