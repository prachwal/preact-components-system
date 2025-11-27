import { describe, it, expect } from 'vitest';

import { render, screen } from '../../../test/test-utils';

import { Heading } from './Heading';

describe('Heading', () => {
  it('renders children correctly', () => {
    render(<Heading level={1}>Test Heading</Heading>);
    expect(screen.getByText('Test Heading')).toBeInTheDocument();
  });

  it('renders correct heading tag for level 1', () => {
    const { container } = render(<Heading level={1}>H1</Heading>);
    expect(container.querySelector('h1')).toBeInTheDocument();
  });

  it('renders correct heading tag for level 2', () => {
    const { container } = render(<Heading level={2}>H2</Heading>);
    expect(container.querySelector('h2')).toBeInTheDocument();
  });

  it('renders correct heading tag for level 3', () => {
    const { container } = render(<Heading level={3}>H3</Heading>);
    expect(container.querySelector('h3')).toBeInTheDocument();
  });

  it('renders correct heading tag for level 4', () => {
    const { container } = render(<Heading level={4}>H4</Heading>);
    expect(container.querySelector('h4')).toBeInTheDocument();
  });

  it('renders correct heading tag for level 5', () => {
    const { container } = render(<Heading level={5}>H5</Heading>);
    expect(container.querySelector('h5')).toBeInTheDocument();
  });

  it('renders correct heading tag for level 6', () => {
    const { container } = render(<Heading level={6}>H6</Heading>);
    expect(container.querySelector('h6')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Heading level={1} className='custom-class'>
        Heading
      </Heading>
    );
    const heading = container.querySelector('h1');
    expect(heading).toHaveClass('custom-class');
  });
});
