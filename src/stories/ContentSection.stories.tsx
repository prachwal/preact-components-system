import type { Meta, StoryObj } from '@storybook/preact';
import ContentSection from '../components/common/ContentSection';

const meta: Meta<typeof ContentSection> = {
  title: 'Components/ContentSection',
  tags: ['autodocs'],
  component: ContentSection,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Section title',
    },
    desc: {
      control: 'text',
      description: 'Section description',
    },
    columns: {
      control: { type: 'select', options: [1, 2, 3, 4, 5, 6] },
      description: 'Number of grid columns',
    },
    stylename: {
      control: 'text',
      description: 'Custom CSS class for grid',
    },
    hasChildrenContainer: {
      control: 'boolean',
      description: 'Whether to wrap children in grid container',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    as: {
      control: { type: 'select', options: ['article', 'section', 'div'] },
      description: 'HTML element type',
    },
    level: {
      control: { type: 'select', options: [1, 2, 3, 4, 5, 6] },
      description: 'Heading level',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ContentSection>;

export const Default: Story = {
  args: {
    title: 'Our Features',
    desc: 'Explore what we offer',
    columns: 4,
    children: (
      <>
        <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
          Feature 1
        </div>
        <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
          Feature 2
        </div>
        <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
          Feature 3
        </div>
        <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
          Feature 4
        </div>
      </>
    ),
  },
};

export const WithoutTitle: Story = {
  args: {
    columns: 3,
    children: (
      <>
        <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
          Item 1
        </div>
        <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
          Item 2
        </div>
        <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
          Item 3
        </div>
      </>
    ),
  },
};

export const SingleColumn: Story = {
  args: {
    title: 'Single Column Layout',
    desc: 'Perfect for testimonials or single items',
    columns: 1,
    children: (
      <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '4px', textAlign: 'center' }}>
        Single centered item
      </div>
    ),
  },
};

export const CustomGridClass: Story = {
  args: {
    title: 'Custom Grid',
    desc: 'Using custom CSS class',
    stylename: 'grid-cols-2',
    children: (
      <>
        <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
          Custom 1
        </div>
        <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
          Custom 2
        </div>
      </>
    ),
  },
};