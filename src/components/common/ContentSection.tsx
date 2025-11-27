import type { ComponentChildren } from 'preact';

import { Heading } from './Heading';

/**
 * Props for the ContentSection component.
 */
export interface ContentSectionProps {
  /** The title of the section, displayed as a heading. */
  title?: string;
  /** The heading level for the title (1-6). Defaults to 2. */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /** The description text displayed below the title. */
  desc?: string;
  /** The child elements to be rendered in the grid layout. */
  children: ComponentChildren;
  /** Additional CSS class names for the wrapper element. */
  className?: string;
  /** The HTML element to use as the wrapper. Defaults to 'article'. */
  as?: 'article' | 'section' | 'div';
  /** Number of columns in the grid layout (1-6). Defaults to 4. */
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Custom class name for the grid container. If not provided, uses grid-cols-{columns}. */
  gridClassName?: string;
  /** has div container for children */
  hasChildrenContainer?: boolean;
}

/**
 * A flexible content section component that displays a title, description, and children in a responsive grid layout.
 *
 * @example
 * ```tsx
 * <ContentSection
 *   title="Our Features"
 *   desc="Explore what we offer"
 *   columns={3}
 * >
 *   <FeatureCard title="Feature 1" />
 *   <FeatureCard title="Feature 2" />
 * </ContentSection>
 * ```
 *
 * @example
 * ```tsx
 * // Just the grid without title/desc
 * <ContentSection columns={2}>
 *   <FeatureCard title="Item 1" />
 *   <FeatureCard title="Item 2" />
 * </ContentSection>
 * ```
 *
 * @example
 * ```tsx
 * // Custom grid class
 * <ContentSection gridClassName="my-custom-grid">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </ContentSection>
 * ```
 */
export const ContentSection = ({
  title,
  level = 2,
  desc,
  children,
  className,
  as: Wrapper = 'article',
  columns = 4,
  gridClassName,
  hasChildrenContainer = false,
}: ContentSectionProps) => {
  // Validate columns prop
  const validColumns = Math.max(1, Math.min(6, columns));

  const wrapperClass = `content-section ${className ?? ''}`.trim();
  const gridClass = gridClassName ?? `grid-cols-${validColumns}`;

  return (
    <Wrapper className={wrapperClass}>
      {title ? <Heading level={level}>{title}</Heading> : null}
      {desc ? <p>{desc}</p> : null}
      {hasChildrenContainer ? <div className={gridClass}>{children}</div> : children}
    </Wrapper>
  );
};
