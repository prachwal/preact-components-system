import { describe, it, expect, vi } from 'vitest';

import { ThemeProvider } from '../../providers/ThemeProvider';
import { render } from '../../../test/test-utils';

import { Box } from './Box';

// Mock useBreakpoint hook
const mockUseBreakpoint = vi.fn();
vi.mock('../../hooks/useBreakpoint', () => ({
  useBreakpoint: () => mockUseBreakpoint(),
}));

const renderWithTheme = (component: preact.ComponentChildren) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('Box', () => {
  it('renders children correctly', () => {
    const { container } = renderWithTheme(<Box>Content</Box>);
    expect(container.textContent).toBe('Content');
  });

  it('renders with custom className', () => {
    const { container } = renderWithTheme(<Box className='custom-class'>Content</Box>);
    const box = container.querySelector('.box');
    expect(box).toHaveClass('custom-class');
  });

  it('applies inline styles', () => {
    const { container } = renderWithTheme(
      <Box style={{ color: 'red', backgroundColor: 'blue' }}>Content</Box>
    );
    const box = container.querySelector('.box') as HTMLElement;
    expect(box.style.color).toBe('red');
    expect(box.style.backgroundColor).toBe('blue');
  });

  it('renders as custom component', () => {
    const { container } = renderWithTheme(<Box component='section'>Section Content</Box>);
    expect(container.querySelector('section')).toBeInTheDocument();
    expect(container.querySelector('section')?.textContent).toBe('Section Content');
  });

  it('renders as article component', () => {
    const { container } = renderWithTheme(<Box component='article'>Article Content</Box>);
    expect(container.querySelector('article')).toBeInTheDocument();
  });

  it('renders as header component', () => {
    const { container } = renderWithTheme(<Box component='header'>Header Content</Box>);
    expect(container.querySelector('header')).toBeInTheDocument();
  });

  it('applies padding correctly (p)', () => {
    const { container } = renderWithTheme(<Box p={2}>Content</Box>);
    const box = container.querySelector('.box') as HTMLElement;
    expect(box.style.padding).toBe('16px'); // 2 * 8px spacing
  });

  it('applies padding top correctly (pt)', () => {
    const { container } = renderWithTheme(<Box pt={3}>Content</Box>);
    const box = container.querySelector('.box') as HTMLElement;
    expect(box.style.paddingTop).toBe('24px'); // 3 * 8px spacing
  });

  it('applies padding right correctly (pr)', () => {
    const { container } = renderWithTheme(<Box pr={1}>Content</Box>);
    const box = container.querySelector('.box') as HTMLElement;
    expect(box.style.paddingRight).toBe('8px'); // 1 * 8px spacing
  });

  it('applies padding bottom correctly (pb)', () => {
    const { container } = renderWithTheme(<Box pb={4}>Content</Box>);
    const box = container.querySelector('.box') as HTMLElement;
    expect(box.style.paddingBottom).toBe('32px'); // 4 * 8px spacing
  });

  it('applies padding left correctly (pl)', () => {
    const { container } = renderWithTheme(<Box pl={2}>Content</Box>);
    const box = container.querySelector('.box') as HTMLElement;
    expect(box.style.paddingLeft).toBe('16px'); // 2 * 8px spacing
  });

  it('applies horizontal padding correctly (px)', () => {
    const { container } = renderWithTheme(<Box px={3}>Content</Box>);
    const box = container.querySelector('.box') as HTMLElement;
    expect(box.style.paddingLeft).toBe('24px'); // 3 * 8px spacing
    expect(box.style.paddingRight).toBe('24px'); // 3 * 8px spacing
  });

  it('applies vertical padding correctly (py)', () => {
    const { container } = renderWithTheme(<Box py={1}>Content</Box>);
    const box = container.querySelector('.box') as HTMLElement;
    expect(box.style.paddingTop).toBe('8px'); // 1 * 8px spacing
    expect(box.style.paddingBottom).toBe('8px'); // 1 * 8px spacing
  });

  it('applies margin correctly (m)', () => {
    const { container } = renderWithTheme(<Box m={2}>Content</Box>);
    const box = container.querySelector('.box') as HTMLElement;
    expect(box.style.margin).toBe('16px'); // 2 * 8px spacing
  });

  it('applies margin top correctly (mt)', () => {
    const { container } = renderWithTheme(<Box mt={3}>Content</Box>);
    const box = container.querySelector('.box') as HTMLElement;
    expect(box.style.marginTop).toBe('24px'); // 3 * 8px spacing
  });

  it('applies margin right correctly (mr)', () => {
    const { container } = renderWithTheme(<Box mr={1}>Content</Box>);
    const box = container.querySelector('.box') as HTMLElement;
    expect(box.style.marginRight).toBe('8px'); // 1 * 8px spacing
  });

  it('applies margin bottom correctly (mb)', () => {
    const { container } = renderWithTheme(<Box mb={4}>Content</Box>);
    const box = container.querySelector('.box') as HTMLElement;
    expect(box.style.marginBottom).toBe('32px'); // 4 * 8px spacing
  });

  it('applies margin left correctly (ml)', () => {
    const { container } = renderWithTheme(<Box ml={2}>Content</Box>);
    const box = container.querySelector('.box') as HTMLElement;
    expect(box.style.marginLeft).toBe('16px'); // 2 * 8px spacing
  });

  it('applies horizontal margin correctly (mx)', () => {
    const { container } = renderWithTheme(<Box mx={3}>Content</Box>);
    const box = container.querySelector('.box') as HTMLElement;
    expect(box.style.marginLeft).toBe('24px'); // 3 * 8px spacing
    expect(box.style.marginRight).toBe('24px'); // 3 * 8px spacing
  });

  it('applies vertical margin correctly (my)', () => {
    const { container } = renderWithTheme(<Box my={1}>Content</Box>);
    const box = container.querySelector('.box') as HTMLElement;
    expect(box.style.marginTop).toBe('8px'); // 1 * 8px spacing
    expect(box.style.marginBottom).toBe('8px'); // 1 * 8px spacing
  });

  it('applies display property', () => {
    const { container } = renderWithTheme(<Box display='flex'>Content</Box>);
    const box = container.querySelector('.box') as HTMLElement;
    expect(box.style.display).toBe('flex');
  });

  it('applies inline-block display', () => {
    const { container } = renderWithTheme(<Box display='inline-block'>Content</Box>);
    const box = container.querySelector('.box') as HTMLElement;
    expect(box.style.display).toBe('inline-block');
  });

  it('applies grid display', () => {
    const { container } = renderWithTheme(<Box display='grid'>Content</Box>);
    const box = container.querySelector('.box') as HTMLElement;
    expect(box.style.display).toBe('grid');
  });

  it('combines multiple spacing props', () => {
    const { container } = renderWithTheme(
      <Box p={2} m={1} mt={3}>
        Content
      </Box>
    );
    const box = container.querySelector('.box') as HTMLElement;
    expect(box.style.padding).toBe('16px');
    expect(box.style.marginTop).toBe('24px');
    expect(box.style.marginRight).toBe('8px');
    expect(box.style.marginBottom).toBe('8px');
    expect(box.style.marginLeft).toBe('8px');
  });

  it('overrides individual properties with combined ones', () => {
    const { container } = renderWithTheme(
      <Box p={2} px={4}>
        Content
      </Box>
    );
    const box = container.querySelector('.box') as HTMLElement;
    // px should override horizontal padding from p
    expect(box.style.paddingLeft).toBe('32px'); // 4 * 8px spacing
    expect(box.style.paddingRight).toBe('32px'); // 4 * 8px spacing
    expect(box.style.paddingTop).toBe('16px'); // 2 * 8px spacing from p
    expect(box.style.paddingBottom).toBe('16px'); // 2 * 8px spacing from p
  });

  it('spreads rest props to component', () => {
    const { container } = renderWithTheme(
      <Box data-testid='test-box' role='main' aria-label='Test Box'>
        Content
      </Box>
    );
    const box = container.querySelector('.box') as HTMLElement;
    expect(box?.getAttribute('data-testid')).toBe('test-box');
    expect(box?.getAttribute('role')).toBe('main');
    expect(box?.getAttribute('aria-label')).toBe('Test Box');
  });

  it('applies zero spacing correctly', () => {
    const { container } = renderWithTheme(<Box p={0}>Content</Box>);
    const box = container.querySelector('.box') as HTMLElement;
    expect(box.style.padding).toBe('0px');
  });

  it('applies large spacing values', () => {
    const { container } = renderWithTheme(<Box p={10}>Content</Box>);
    const box = container.querySelector('.box') as HTMLElement;
    expect(box.style.padding).toBe('80px'); // 10 * 8px spacing
  });

  it('maintains component hierarchy with custom component', () => {
    const { container } = renderWithTheme(
      <Box component='section' className='section-box'>
        <Box component='article' className='article-box'>
          Nested Content
        </Box>
      </Box>
    );
    const section = container.querySelector('section');
    const article = container.querySelector('article');
    expect(section).toHaveClass('section-box');
    expect(article).toHaveClass('article-box');
    expect(article?.textContent).toBe('Nested Content');
  });

  it('merges style objects correctly', () => {
    const { container } = renderWithTheme(
      <Box style={{ color: 'red', backgroundColor: 'blue' }} p={2}>
        Content
      </Box>
    );
    const box = container.querySelector('.box') as HTMLElement;
    // The style objects should merge properly
    expect(box.style.color).toBe('red');
    expect(box.style.backgroundColor).toBe('blue');
    expect(box.style.padding).toBe('16px');
  });

  describe('responsive behavior', () => {
    it('applies responsive padding based on breakpoint', () => {
      // Mock breakpoint as 'xs'
      mockUseBreakpoint.mockReturnValue('xs');

      const { container } = renderWithTheme(<Box p={{ xs: 1, md: 3 }}>Content</Box>);
      const box = container.querySelector('.box') as HTMLElement;
      expect(box.style.padding).toBe('8px'); // 1 * 8px for xs
    });

    it('applies responsive padding for larger breakpoint', () => {
      // Mock breakpoint as 'md'
      mockUseBreakpoint.mockReturnValue('md');

      const { container } = renderWithTheme(<Box p={{ xs: 1, md: 3 }}>Content</Box>);
      const box = container.querySelector('.box') as HTMLElement;
      expect(box.style.padding).toBe('24px'); // 3 * 8px for md
    });

    it('applies responsive margin based on breakpoint', () => {
      // Mock breakpoint as 'sm'
      mockUseBreakpoint.mockReturnValue('sm');

      const { container } = renderWithTheme(<Box m={{ xs: 2, sm: 4, lg: 6 }}>Content</Box>);
      const box = container.querySelector('.box') as HTMLElement;
      expect(box.style.margin).toBe('32px'); // 4 * 8px for sm
    });

    it('applies responsive display based on breakpoint', () => {
      // Mock breakpoint as 'xs'
      mockUseBreakpoint.mockReturnValue('xs');

      const { container } = renderWithTheme(
        <Box display={{ xs: 'block', md: 'flex' }}>Content</Box>
      );
      const box = container.querySelector('.box') as HTMLElement;
      expect(box.style.display).toBe('block');
    });

    it('falls back to smaller breakpoint when current has no value', () => {
      // Mock breakpoint as 'lg'
      mockUseBreakpoint.mockReturnValue('lg');

      const { container } = renderWithTheme(<Box p={{ xs: 1, xl: 5 }}>Content</Box>);
      const box = container.querySelector('.box') as HTMLElement;
      expect(box.style.padding).toBe('8px'); // Falls back to xs since lg has no value
    });
  });
});
