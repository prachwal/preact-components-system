import type { Meta, StoryObj } from '@storybook/preact';
import { h } from 'preact';

import { Typography } from '../components/ui/Typography';

const meta = {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Typography variant='h1'>H1 Heading</Typography>
      <Typography variant='h2'>H2 Heading</Typography>
      <Typography variant='h3'>H3 Heading</Typography>
      <Typography variant='h4'>H4 Heading</Typography>
      <Typography variant='h5'>H5 Heading</Typography>
      <Typography variant='h6'>H6 Heading</Typography>
      <Typography variant='subtitle1'>Subtitle 1</Typography>
      <Typography variant='subtitle2'>Subtitle 2</Typography>
      <Typography variant='body1'>
        Body 1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
      <Typography variant='body2'>
        Body 2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
      <Typography variant='button'>Button Text</Typography>
      <Typography variant='caption'>Caption text</Typography>
      <Typography variant='overline'>Overline Text</Typography>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Typography color='primary'>Primary color text</Typography>
      <Typography color='secondary'>Secondary color text</Typography>
      <Typography color='textPrimary'>Text primary</Typography>
      <Typography color='textSecondary'>Text secondary</Typography>
      <Typography color='error'>Error color text</Typography>
      <Typography color='inherit'>Inherit color</Typography>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Typography align='left'>Left aligned text</Typography>
      <Typography align='center'>Center aligned text</Typography>
      <Typography align='right'>Right aligned text</Typography>
      <Typography align='justify'>
        Justified text - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Typography>
    </div>
  ),
};

export const NoWrap: Story = {
  render: () => (
    <div style={{ width: '200px', border: '1px solid #ccc', padding: '8px' }}>
      <Typography noWrap>
        This is a very long text that should not wrap and will be truncated with ellipsis
      </Typography>
    </div>
  ),
};

export const GutterBottom: Story = {
  render: () => (
    <div>
      <Typography variant='h4' gutterBottom>
        Heading with gutter bottom
      </Typography>
      <Typography>
        This paragraph follows the heading with proper spacing due to gutterBottom prop.
      </Typography>
    </div>
  ),
};

export const Paragraph: Story = {
  render: () => (
    <div>
      <Typography paragraph>
        First paragraph with bottom margin. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
      <Typography paragraph>
        Second paragraph with bottom margin. Sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </Typography>
      <Typography>Last paragraph without margin.</Typography>
    </div>
  ),
};
