import type { Meta, StoryObj } from '@storybook/preact';
import { h } from 'preact';

import { Grid } from '../components/layout/Grid';

const meta = {
  title: 'Layout/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

const DemoBox = ({ children, ...props }: any) => (
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

export const BasicGrid: Story = {
  render: () => (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <DemoBox>xs=12</DemoBox>
      </Grid>
      <Grid item xs={6}>
        <DemoBox>xs=6</DemoBox>
      </Grid>
      <Grid item xs={6}>
        <DemoBox>xs=6</DemoBox>
      </Grid>
      <Grid item xs={4}>
        <DemoBox>xs=4</DemoBox>
      </Grid>
      <Grid item xs={4}>
        <DemoBox>xs=4</DemoBox>
      </Grid>
      <Grid item xs={4}>
        <DemoBox>xs=4</DemoBox>
      </Grid>
    </Grid>
  ),
};

export const ResponsiveGrid: Story = {
  render: () => (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} lg={4}>
        <DemoBox>xs=12 md=6 lg=4</DemoBox>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <DemoBox>xs=12 md=6 lg=4</DemoBox>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <DemoBox>xs=12 md=6 lg=4</DemoBox>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <DemoBox>xs=12 md=6 lg=4</DemoBox>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <DemoBox>xs=12 md=6 lg=4</DemoBox>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <DemoBox>xs=12 md=6 lg=4</DemoBox>
      </Grid>
    </Grid>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3>Spacing 0</h3>
        <Grid container spacing={0}>
          <Grid item xs={4}>
            <DemoBox>Item 1</DemoBox>
          </Grid>
          <Grid item xs={4}>
            <DemoBox>Item 2</DemoBox>
          </Grid>
          <Grid item xs={4}>
            <DemoBox>Item 3</DemoBox>
          </Grid>
        </Grid>
      </div>
      <div>
        <h3>Spacing 2</h3>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <DemoBox>Item 1</DemoBox>
          </Grid>
          <Grid item xs={4}>
            <DemoBox>Item 2</DemoBox>
          </Grid>
          <Grid item xs={4}>
            <DemoBox>Item 3</DemoBox>
          </Grid>
        </Grid>
      </div>
      <div>
        <h3>Spacing 4</h3>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <DemoBox>Item 1</DemoBox>
          </Grid>
          <Grid item xs={4}>
            <DemoBox>Item 2</DemoBox>
          </Grid>
          <Grid item xs={4}>
            <DemoBox>Item 3</DemoBox>
          </Grid>
        </Grid>
      </div>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3>Center Alignment</h3>
        <Grid container spacing={2} alignItems='center' justifyContent='center'>
          <Grid item>
            <DemoBox style={{ height: '100px' }}>Tall Item</DemoBox>
          </Grid>
          <Grid item>
            <DemoBox>Item 2</DemoBox>
          </Grid>
          <Grid item>
            <DemoBox>Item 3</DemoBox>
          </Grid>
        </Grid>
      </div>
      <div>
        <h3>Space Between</h3>
        <Grid container spacing={2} justifyContent='space-between'>
          <Grid item xs={3}>
            <DemoBox>Item 1</DemoBox>
          </Grid>
          <Grid item xs={3}>
            <DemoBox>Item 2</DemoBox>
          </Grid>
          <Grid item xs={3}>
            <DemoBox>Item 3</DemoBox>
          </Grid>
        </Grid>
      </div>
      <div>
        <h3>Flex End</h3>
        <Grid container spacing={2} justifyContent='flex-end'>
          <Grid item xs={3}>
            <DemoBox>Item 1</DemoBox>
          </Grid>
          <Grid item xs={3}>
            <DemoBox>Item 2</DemoBox>
          </Grid>
          <Grid item xs={3}>
            <DemoBox>Item 3</DemoBox>
          </Grid>
        </Grid>
      </div>
    </div>
  ),
};

export const Direction: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3>Row (Default)</h3>
        <Grid container spacing={2} direction='row'>
          <Grid item xs={4}>
            <DemoBox>Item 1</DemoBox>
          </Grid>
          <Grid item xs={4}>
            <DemoBox>Item 2</DemoBox>
          </Grid>
          <Grid item xs={4}>
            <DemoBox>Item 3</DemoBox>
          </Grid>
        </Grid>
      </div>
      <div>
        <h3>Column</h3>
        <Grid container spacing={2} direction='column'>
          <Grid item>
            <DemoBox>Item 1</DemoBox>
          </Grid>
          <Grid item>
            <DemoBox>Item 2</DemoBox>
          </Grid>
          <Grid item>
            <DemoBox>Item 3</DemoBox>
          </Grid>
        </Grid>
      </div>
    </div>
  ),
};

export const NestedGrid: Story = {
  render: () => (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <DemoBox>Level 1</DemoBox>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <DemoBox style={{ backgroundColor: '#9c27b0' }}>Level 2 - Left</DemoBox>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <DemoBox style={{ backgroundColor: '#2e7d32' }}>Level 3 - Top</DemoBox>
              </Grid>
              <Grid item xs={12}>
                <DemoBox style={{ backgroundColor: '#2e7d32' }}>Level 3 - Bottom</DemoBox>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  ),
};
