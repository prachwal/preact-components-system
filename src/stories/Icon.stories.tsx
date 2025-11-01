import type { Meta, StoryObj } from '@storybook/preact';
import { Icon, type IconName } from '../components/ui/Icon';

const meta = {
  title: 'UI/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: ['Home', 'Star', 'Info', 'Mail', 'Heart', 'Settings', 'User', 'Search', 'Menu', 'X'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    color: {
      control: 'color',
    },
    decorative: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Home',
  },
};

export const Small: Story = {
  args: {
    name: 'Star',
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    name: 'Heart',
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    name: 'Settings',
    size: 'large',
  },
};

export const CustomSize: Story = {
  args: {
    name: 'Mail',
    size: 48,
  },
};

export const WithColor: Story = {
  args: {
    name: 'Heart',
    color: '#ff0000',
  },
};

export const WithAccessibleLabel: Story = {
  args: {
    name: 'Home',
    'aria-label': 'Navigate to home page',
  },
};

export const Decorative: Story = {
  args: {
    name: 'Star',
    decorative: true,
  },
};

export const IconShowcase: Story = {
  render: () => {
    const popularIcons: IconName[] = [
      'Home', 'Star', 'Heart', 'User', 'Mail', 'Settings',
      'Search', 'Menu', 'X', 'Check', 'ChevronRight', 'ChevronLeft',
      'Info', 'AlertCircle', 'AlertTriangle', 'HelpCircle',
      'Calendar', 'Clock', 'Download', 'Upload', 'Edit', 'Trash2',
    ];

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px', padding: '20px' }}>
        {popularIcons.map((iconName) => (
          <div
            key={iconName}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Icon name={iconName} size="medium" />
            <span style={{ fontSize: '12px', textAlign: 'center' }}>{iconName}</span>
          </div>
        ))}
      </div>
    );
  },
};
