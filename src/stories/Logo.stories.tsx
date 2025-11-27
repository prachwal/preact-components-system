import type { Meta, StoryObj } from '@storybook/preact';

import { Logo } from '../components/common/Logo';

const meta: Meta<typeof Logo> = {
  title: 'Components/Logo',
  tags: ['autodocs'],
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: {},
};

export const InContainer: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <Story />
      </div>
    ),
  ],
};
