import type { Meta, StoryObj } from '@storybook/preact';
import { Skeleton } from '../components/ui/Skeleton';
import { h } from 'preact';

const meta = {
  title: 'Components/Feedback/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'rectangular', 'circular'],
      description: 'The type of content that will be rendered',
    },
    animation: {
      control: 'select',
      options: ['pulse', 'wave', false],
      description: 'The animation effect',
    },
    width: {
      control: 'text',
      description: 'Width of the skeleton',
    },
    height: {
      control: 'text',
      description: 'Height of the skeleton',
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    variant: 'text',
    width: '100%',
  },
  render: (args) => (
    <div style={{ width: '300px' }}>
      <Skeleton {...args} />
    </div>
  ),
};

export const Rectangular: Story = {
  args: {
    variant: 'rectangular',
    width: '100%',
    height: 200,
  },
  render: (args) => (
    <div style={{ width: '300px' }}>
      <Skeleton {...args} />
    </div>
  ),
};

export const Circular: Story = {
  args: {
    variant: 'circular',
    width: 40,
    height: 40,
  },
};

export const Animations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '300px' }}>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Pulse Animation</p>
        <Skeleton animation="pulse" width="100%" height={40} />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Wave Animation</p>
        <Skeleton animation="wave" width="100%" height={40} />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>No Animation</p>
        <Skeleton animation={false} width="100%" height={40} />
      </div>
    </div>
  ),
};

export const UserCard: Story = {
  render: () => (
    <div style={{ width: '300px', padding: '16px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
        <Skeleton variant="circular" width={48} height={48} />
        <div style={{ flex: 1 }}>
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
        </div>
      </div>
      <Skeleton variant="rectangular" width="100%" height={150} style={{ marginBottom: '8px' }} />
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="80%" />
    </div>
  ),
};

export const ArticleList: Story = {
  render: () => (
    <div style={{ width: '600px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ display: 'flex', gap: '16px' }}>
          <Skeleton variant="rectangular" width={120} height={90} />
          <div style={{ flex: 1 }}>
            <Skeleton variant="text" width="100%" style={{ marginBottom: '8px' }} />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="60%" />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const ProductGrid: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
      gap: '16px',
      maxWidth: '800px'
    }}>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i}>
          <Skeleton variant="rectangular" width="100%" height={200} style={{ marginBottom: '8px' }} />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
        </div>
      ))}
    </div>
  ),
};

export const CommentThread: Story = {
  render: () => (
    <div style={{ width: '500px' }}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ marginBottom: '24px', marginLeft: i > 1 ? '32px' : '0' }}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
            <Skeleton variant="circular" width={32} height={32} />
            <div style={{ flex: 1 }}>
              <Skeleton variant="text" width="30%" />
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="80%" />
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};
