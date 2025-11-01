import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/preact';
import { Typography } from './Typography';
import { ThemeProvider } from '../../providers/ThemeProvider';

const renderWithTheme = (component: preact.ComponentChildren) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('Typography', () => {
  it('renders children correctly', () => {
    renderWithTheme(<Typography>Hello World</Typography>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders with h1 variant', () => {
    const { container } = renderWithTheme(<Typography variant="h1">Heading 1</Typography>);
    expect(container.querySelector('h1')).toBeInTheDocument();
  });

  it('renders with custom component', () => {
    const { container } = renderWithTheme(
      <Typography variant="body1" component="span">Text</Typography>
    );
    expect(container.querySelector('span')).toBeInTheDocument();
  });

  it('applies text alignment', () => {
    const { container } = renderWithTheme(
      <Typography align="center">Centered</Typography>
    );
    const element = container.querySelector('.typography');
    expect(element).toHaveStyle({ textAlign: 'center' });
  });

  it('applies noWrap correctly', () => {
    const { container } = renderWithTheme(
      <Typography noWrap>Long text that should not wrap</Typography>
    );
    const element = container.querySelector('.typography');
    expect(element).toHaveClass('typography-nowrap');
  });

  it('applies gutterBottom', () => {
    const { container} = renderWithTheme(
      <Typography gutterBottom>Text with margin</Typography>
    );
    const element = container.querySelector('.typography');
    expect(element).toHaveClass('typography-gutter-bottom');
  });

  it('renders all typography variants', () => {
    const variants = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'button', 'caption', 'overline'] as const;
    variants.forEach(variant => {
      const { container } = renderWithTheme(
        <Typography variant={variant}>Text</Typography>
      );
      expect(container.querySelector(`.typography-${variant}`)).toBeInTheDocument();
    });
  });
});
