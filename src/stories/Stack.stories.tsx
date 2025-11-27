import type { Meta, StoryObj } from '@storybook/preact';
import { h } from 'preact';

import { Stack } from '../components/layout/Stack';

const meta = {
  title: 'Layout/Stack',
  component: Stack,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

const DemoBox = ({ children, ...props }: Record<string, unknown>) => (
  <div
    style={{
      padding: '16px',
      backgroundColor: '#1976d2',
      color: 'white',
      textAlign: 'center',
      borderRadius: '4px',
      ...props.style,
    }}
  >
    {children}
  </div>
);

export const BasicStack: Story = {
  render: () => (
    <Stack spacing={2}>
      <DemoBox>Item 1</DemoBox>
      <DemoBox>Item 2</DemoBox>
      <DemoBox>Item 3</DemoBox>
    </Stack>
  ),
};

export const HorizontalStack: Story = {
  render: () => (
    <Stack direction='row' spacing={2}>
      <DemoBox>Item 1</DemoBox>
      <DemoBox>Item 2</DemoBox>
      <DemoBox>Item 3</DemoBox>
    </Stack>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3>Spacing 1</h3>
        <Stack spacing={1}>
          <DemoBox>Item 1</DemoBox>
          <DemoBox>Item 2</DemoBox>
          <DemoBox>Item 3</DemoBox>
        </Stack>
      </div>
      <div>
        <h3>Spacing 3</h3>
        <Stack spacing={3}>
          <DemoBox>Item 1</DemoBox>
          <DemoBox>Item 2</DemoBox>
          <DemoBox>Item 3</DemoBox>
        </Stack>
      </div>
      <div>
        <h3>Spacing 5</h3>
        <Stack spacing={5}>
          <DemoBox>Item 1</DemoBox>
          <DemoBox>Item 2</DemoBox>
          <DemoBox>Item 3</DemoBox>
        </Stack>
      </div>
    </div>
  ),
};

export const WithDivider: Story = {
  render: () => (
    <Stack
      spacing={2}
      divider={<hr style={{ border: 0, borderTop: '1px solid #ccc', margin: 0 }} />}
    >
      <DemoBox>Item 1</DemoBox>
      <DemoBox>Item 2</DemoBox>
      <DemoBox>Item 3</DemoBox>
    </Stack>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3>Align Center</h3>
        <Stack spacing={2} alignItems='center'>
          <DemoBox style={{ width: '200px' }}>200px</DemoBox>
          <DemoBox style={{ width: '300px' }}>300px</DemoBox>
          <DemoBox style={{ width: '150px' }}>150px</DemoBox>
        </Stack>
      </div>
      <div>
        <h3>Align Flex-End</h3>
        <Stack spacing={2} alignItems='flex-end'>
          <DemoBox style={{ width: '200px' }}>200px</DemoBox>
          <DemoBox style={{ width: '300px' }}>300px</DemoBox>
          <DemoBox style={{ width: '150px' }}>150px</DemoBox>
        </Stack>
      </div>
    </div>
  ),
};

export const JustifyContent: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3>Space Between</h3>
        <Stack
          direction='row'
          spacing={0}
          justifyContent='space-between'
          style={{ minHeight: '100px' }}
        >
          <DemoBox>Item 1</DemoBox>
          <DemoBox>Item 2</DemoBox>
          <DemoBox>Item 3</DemoBox>
        </Stack>
      </div>
      <div>
        <h3>Center</h3>
        <Stack direction='row' spacing={0} justifyContent='center' style={{ minHeight: '100px' }}>
          <DemoBox>Item 1</DemoBox>
          <DemoBox>Item 2</DemoBox>
          <DemoBox>Item 3</DemoBox>
        </Stack>
      </div>
    </div>
  ),
};
