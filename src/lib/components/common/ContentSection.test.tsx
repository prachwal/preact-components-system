import { describe, it, expect } from 'vitest';

import { render, screen } from '../../../test/test-utils';

import { ContentSection } from './ContentSection';

describe('ContentSection', () => {
  it('renders children correctly', () => {
    render(<ContentSection>Test content</ContentSection>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(<ContentSection title='Test Title'>Content</ContentSection>);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<ContentSection desc='Test description'>Content</ContentSection>);
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<ContentSection className='custom-class'>Content</ContentSection>);
    expect(container.querySelector('.content-section.custom-class')).toBeInTheDocument();
  });

  it('renders as different wrapper element', () => {
    const { container } = render(<ContentSection as='section'>Content</ContentSection>);
    expect(container.querySelector('section.content-section')).toBeInTheDocument();
  });

  it('renders title with correct heading level', () => {
    const { container } = render(
      <ContentSection title='Title' level={3}>
        Content
      </ContentSection>
    );
    expect(container.querySelector('h3')).toBeInTheDocument();
  });

  it('wraps children in grid container when hasChildrenContainer is true', () => {
    const { container } = render(
      <ContentSection hasChildrenContainer columns={2}>
        <div>Item 1</div>
        <div>Item 2</div>
      </ContentSection>
    );
    expect(container.querySelector('.grid-cols-2')).toBeInTheDocument();
  });

  it('applies custom grid className', () => {
    const { container } = render(
      <ContentSection gridClassName='custom-grid' hasChildrenContainer>
        <div>Item</div>
      </ContentSection>
    );
    expect(container.querySelector('.custom-grid')).toBeInTheDocument();
  });

  it('validates columns prop (min 1, max 6)', () => {
    const { container } = render(
      <ContentSection hasChildrenContainer columns={10 as 1 | 2 | 3 | 4 | 5 | 6}>
        <div>Item</div>
      </ContentSection>
    );
    expect(container.querySelector('.grid-cols-6')).toBeInTheDocument();
  });
});
