import type { Meta, StoryObj } from '@storybook/preact';

import { Container } from '../lib/components/layout/Container';

const meta = {
  title: 'Layout/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

const DemoContent = () => (
  <div
    style={{
      padding: '32px',
      backgroundColor: 'var(--pcs-bg-secondary)',
      border: '2px dashed var(--pcs-accent)',
      color: 'var(--pcs-text)',
      textAlign: 'center',
    }}
  >
    Container Content
  </div>
);

export const Default: Story = {
  render: () => (
    <Container>
      <DemoContent />
    </Container>
  ),
};

export const MaxWidths: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3>xs (444px)</h3>
        <Container maxWidth='xs'>
          <DemoContent />
        </Container>
      </div>
      <div>
        <h3>sm (600px)</h3>
        <Container maxWidth='sm'>
          <DemoContent />
        </Container>
      </div>
      <div>
        <h3>md (900px)</h3>
        <Container maxWidth='md'>
          <DemoContent />
        </Container>
      </div>
      <div>
        <h3>lg (1200px)</h3>
        <Container maxWidth='lg'>
          <DemoContent />
        </Container>
      </div>
      <div>
        <h3>xl (1536px)</h3>
        <Container maxWidth='xl'>
          <DemoContent />
        </Container>
      </div>
    </div>
  ),
};

export const NoGutters: Story = {
  render: () => (
    <Container disableGutters>
      <DemoContent />
    </Container>
  ),
};

export const Fixed: Story = {
  render: () => (
    <Container fixed>
      <DemoContent />
    </Container>
  ),
};
