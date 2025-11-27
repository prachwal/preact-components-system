import type { Meta, StoryObj } from '@storybook/preact';
import { h } from 'preact';

import { TextField } from '../components/ui/TextField';

const meta = {
  title: 'Components/Forms/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'standard'],
      description: 'TextField variant',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'TextField size',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
      description: 'TextField color',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input',
    },
    required: {
      control: 'boolean',
      description: 'Mark as required',
    },
    readOnly: {
      control: 'boolean',
      description: 'Mark as read-only',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make input full width',
    },
    multiline: {
      control: 'boolean',
      description: 'Render as textarea',
    },
    error: {
      control: 'boolean',
      description: 'Error state',
    },
    success: {
      control: 'boolean',
      description: 'Success state',
    },
    warning: {
      control: 'boolean',
      description: 'Warning state',
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default TextField',
    placeholder: 'Enter text...',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    label: 'Outlined',
    placeholder: 'Enter text...',
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    label: 'Filled',
    placeholder: 'Enter text...',
  },
};

export const Standard: Story = {
  args: {
    variant: 'standard',
    label: 'Standard',
    placeholder: 'Enter text...',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minWidth: '300px' }}>
      <TextField variant="outlined" label="Outlined" placeholder="Enter text..." />
      <TextField variant="filled" label="Filled" placeholder="Enter text..." />
      <TextField variant="standard" label="Standard" placeholder="Enter text..." />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minWidth: '300px' }}>
      <TextField size="small" label="Small" placeholder="Small input..." />
      <TextField size="medium" label="Medium" placeholder="Medium input..." />
      <TextField size="large" label="Large" placeholder="Large input..." />
    </div>
  ),
};

export const WithHelperText: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    helperText: 'We will never share your email.',
  },
};

export const ValidationStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minWidth: '300px' }}>
      <TextField
        label="Error State"
        error
        helperText="This field has an error"
        defaultValue="invalid@"
      />
      <TextField
        label="Success State"
        success
        helperText="This field is valid"
        defaultValue="valid@email.com"
      />
      <TextField
        label="Warning State"
        warning
        helperText="This field has a warning"
        defaultValue="warning@example.com"
      />
    </div>
  ),
};

export const Required: Story = {
  args: {
    label: 'Required Field',
    required: true,
    placeholder: 'This field is required',
    helperText: 'This field is required',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
    value: 'Disabled value',
    helperText: 'This field is disabled',
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'Read Only',
    readOnly: true,
    value: 'Read only value',
    helperText: 'This field is read-only',
  },
};

export const Multiline: Story = {
  args: {
    label: 'Message',
    multiline: true,
    rows: 4,
    placeholder: 'Enter your message...',
    helperText: 'Maximum 500 characters',
  },
};

export const WithAdornments: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minWidth: '300px' }}>
      <TextField
        label="Price"
        startAdornment={<span>$</span>}
        placeholder="0.00"
        type="number"
      />
      <TextField
        label="Weight"
        endAdornment={<span>kg</span>}
        placeholder="0"
        type="number"
      />
      <TextField
        label="Search"
        startAdornment={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        }
        placeholder="Search..."
      />
    </div>
  ),
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width',
    fullWidth: true,
    placeholder: 'This input takes full width',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export const PasswordField: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    helperText: 'Password must be at least 8 characters',
  },
};

export const EmailField: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'example@email.com',
    helperText: 'Enter a valid email address',
  },
};

export const NumberField: Story = {
  args: {
    label: 'Quantity',
    type: 'number',
    placeholder: '0',
    helperText: 'Enter a number',
  },
};

export const DateField: Story = {
  args: {
    label: 'Birth Date',
    type: 'date',
    helperText: 'Select your birth date',
  },
};
