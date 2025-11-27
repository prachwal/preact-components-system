import type { Meta, StoryObj } from '@storybook/preact';

import { SkipLink } from '../components/common/SkipLink';

const meta: Meta<typeof SkipLink> = {
  title: 'Components/SkipLink',
  tags: ['autodocs'],
  component: SkipLink,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Accessibility component that provides a keyboard navigation link to skip to main content.',
      },
    },
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SkipLink>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'The skip link appears at the top of the page and is only visible when focused with keyboard navigation.',
      },
    },
  },
};

export const WithMainContent: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div>
        <Story />
        <header
          style={{
            padding: '1rem',
            background: 'var(--pcs-bg-secondary)',
            borderBottom: '1px solid var(--pcs-border)',
          }}
        >
          <h1 style={{ color: 'var(--pcs-text)', margin: 0 }}>Site Header</h1>
          <nav>
            <a href='#main' style={{ color: 'var(--pcs-accent)' }}>
              Link 1
            </a>{' '}
            |{' '}
            <a href='#main' style={{ color: 'var(--pcs-accent)' }}>
              Link 2
            </a>
          </nav>
        </header>
        <main
          id='main-content'
          style={{ padding: '2rem', minHeight: '400px', color: 'var(--pcs-text)' }}
        >
          <h2>Main Content</h2>
          <p>This is the main content area that the skip link targets.</p>
          <p>Use Tab key to focus the skip link at the top of the page.</p>
        </main>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Shows the skip link in context with header and main content. Press Tab to reveal the skip link.',
      },
    },
  },
};
