import { describe, it, expect } from 'vitest';

import { renderWithTheme, screen } from '../../test/test-utils';

import { Card, CardHeader, CardContent, CardActions } from './Card';

describe('Card', () => {
  it('renders children correctly', () => {
    renderWithTheme(<Card>Card Content</Card>);
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('applies hoverable class', () => {
    const { container } = renderWithTheme(<Card hoverable>Content</Card>);
    expect(container.querySelector('.card-hoverable')).toBeInTheDocument();
  });

  it('applies elevation', () => {
    const { container } = renderWithTheme(<Card elevation={3}>Content</Card>);
    expect(container.querySelector('.paper-elevation-3')).toBeInTheDocument();
  });
});

describe('CardHeader', () => {
  it('renders title', () => {
    renderWithTheme(<CardHeader title='Card Title' />);
    expect(screen.getByText('Card Title')).toBeInTheDocument();
  });

  it('renders subheader', () => {
    renderWithTheme(<CardHeader title='Title' subheader='Subheader' />);
    expect(screen.getByText('Subheader')).toBeInTheDocument();
  });

  it('renders avatar', () => {
    const { container } = renderWithTheme(
      <CardHeader title='Title' avatar={<div data-testid='avatar'>A</div>} />
    );
    expect(container.querySelector('[data-testid="avatar"]')).toBeInTheDocument();
  });
});

describe('CardContent', () => {
  it('renders children', () => {
    renderWithTheme(<CardContent>Content</CardContent>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies className', () => {
    const { container } = renderWithTheme(<CardContent>Content</CardContent>);
    expect(container.querySelector('.card-content')).toBeInTheDocument();
  });
});

describe('CardActions', () => {
  it('renders children', () => {
    renderWithTheme(<CardActions>Actions</CardActions>);
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  it('applies disableSpacing', () => {
    const { container } = renderWithTheme(<CardActions disableSpacing>Actions</CardActions>);
    expect(container.querySelector('.card-actions-no-spacing')).toBeInTheDocument();
  });
});
