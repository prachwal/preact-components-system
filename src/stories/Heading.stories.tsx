import type { Meta, StoryObj } from '@storybook/preact';

import { Heading } from '../components/common/Heading';

const meta: Meta<typeof Heading> = {
  title: 'Components/Heading',
  tags: ['autodocs'],
  component: Heading,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    level: {
      control: { type: 'select', options: [1, 2, 3, 4, 5, 6] },
      description: 'Heading level (h1-h6)',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    children: {
      control: 'text',
      description: 'Heading text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const H1: Story = {
  args: {
    level: 1,
    children: 'Main Page Title',
  },
};

export const H2: Story = {
  args: {
    level: 2,
    children: 'Section Heading',
  },
};

export const H3: Story = {
  args: {
    level: 3,
    children: 'Subsection Heading',
  },
};

export const H4: Story = {
  args: {
    level: 4,
    children: 'Minor Heading',
  },
};

export const H5: Story = {
  args: {
    level: 5,
    children: 'Small Heading',
  },
};

export const H6: Story = {
  args: {
    level: 6,
    children: 'Tiny Heading',
  },
};

export const WithCustomClass: Story = {
  args: {
    level: 2,
    children: 'Custom Styled Heading',
    className: 'custom-heading',
  },
};
