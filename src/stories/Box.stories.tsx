import type { Meta, StoryObj } from '@storybook/preact';

import { Box } from '../components/layout/Box';

const meta = {
  title: 'Layout/Box',
  component: Box,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Box style={{ backgroundColor: 'var(--pcs-bg-secondary)', color: 'var(--pcs-text)', border: '1px solid var(--pcs-border)' }}>
      Default Box Content
    </Box>
  ),
};

export const Padding: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Box p={1} style={{ backgroundColor: 'var(--pcs-bg-secondary)', color: 'var(--pcs-text)' }}>
        Padding 1 (8px)
      </Box>
      <Box p={2} style={{ backgroundColor: 'var(--pcs-bg-secondary)', color: 'var(--pcs-text)' }}>
        Padding 2 (16px)
      </Box>
      <Box p={4} style={{ backgroundColor: 'var(--pcs-bg-secondary)', color: 'var(--pcs-text)' }}>
        Padding 4 (32px)
      </Box>
      <Box px={2} py={1} style={{ backgroundColor: 'var(--pcs-bg-secondary)', color: 'var(--pcs-text)' }}>
        Horizontal 2, Vertical 1
      </Box>
    </div>
  ),
};

export const Margin: Story = {
  render: () => (
    <div style={{ backgroundColor: 'var(--pcs-bg)', color: 'var(--pcs-text)', padding: '8px' }}>
      <Box m={2} p={2} style={{ backgroundColor: 'var(--pcs-bg-secondary)', color: 'var(--pcs-text)' }}>
        Margin 2 (16px)
      </Box>
      <Box mt={3} p={2} style={{ backgroundColor: 'var(--pcs-bg-secondary)', color: 'var(--pcs-text)' }}>
        Margin Top 3 (24px)
      </Box>
      <Box mx={4} p={2} style={{ backgroundColor: 'var(--pcs-bg-secondary)', color: 'var(--pcs-text)' }}>
        Margin Horizontal 4 (32px)
      </Box>
    </div>
  ),
};

export const Display: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Box display="flex" style={{ gap: '8px' }}>
        <Box p={2} style={{ backgroundColor: 'var(--pcs-bg-secondary)', color: 'var(--pcs-text)', flex: 1 }}>Flex Item 1</Box>
        <Box p={2} style={{ backgroundColor: 'var(--pcs-bg-secondary)', color: 'var(--pcs-text)', flex: 1 }}>Flex Item 2</Box>
      </Box>
      <Box display="inline-block" p={2} style={{ backgroundColor: 'var(--pcs-bg-secondary)', color: 'var(--pcs-text)' }}>
        Inline Block
      </Box>
      <Box display="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <Box p={2} style={{ backgroundColor: 'var(--pcs-bg-secondary)', color: 'var(--pcs-text)' }}>Grid Item 1</Box>
        <Box p={2} style={{ backgroundColor: 'var(--pcs-bg-secondary)', color: 'var(--pcs-text)' }}>Grid Item 2</Box>
      </Box>
    </div>
  ),
};

export const AsComponent: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Box component="section" p={2} style={{ backgroundColor: 'var(--pcs-bg-secondary)', color: 'var(--pcs-text)' }}>
        Rendered as &lt;section&gt;
      </Box>
      <Box component="article" p={2} style={{ backgroundColor: 'var(--pcs-bg-secondary)', color: 'var(--pcs-text)' }}>
        Rendered as &lt;article&gt;
      </Box>
      <Box component="header" p={2} style={{ backgroundColor: 'var(--pcs-bg-secondary)', color: 'var(--pcs-text)' }}>
        Rendered as &lt;header&gt;
      </Box>
    </div>
  ),
};

export const Combined: Story = {
  render: () => (
    <Box
      component="article"
      p={3}
      m={2}
      display="flex"
      style={{
        backgroundColor: 'var(--pcs-bg-secondary)',
        color: 'var(--pcs-text)',
        borderRadius: '8px',
        boxShadow: 'var(--pcs-shadow-sm)',
        gap: '16px',
      }}
    >
      <Box p={2} style={{ backgroundColor: 'var(--pcs-bg)', color: 'var(--pcs-text)', flex: 1, borderRadius: '4px' }}>
        Content 1
      </Box>
      <Box p={2} style={{ backgroundColor: 'var(--pcs-bg)', color: 'var(--pcs-text)', flex: 1, borderRadius: '4px' }}>
        Content 2
      </Box>
    </Box>
  ),
};
