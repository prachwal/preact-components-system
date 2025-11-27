export interface MainProps {
  children?: React.ReactNode;
}

/**
 * Main component - primary content area of the application
 *
 * Serves as the main content container with semantic HTML structure.
 * Includes sample content sections demonstrating the ContentSection component
 * and provides the primary focus area for application content.
 *
 * @example
 * ```tsx
 * // Basic main content area
 * <Main />
 * ```
 *
 * Features:
 * - Semantic main element with proper ARIA attributes
 * - Sample content sections for demonstration
 * - Content info footer within the main area
 * - Accessible content structure with proper heading hierarchy
 */
export const Main = ({ children }: MainProps) => (
  <main id='main-content' role='main' className='app-main'>
    {children}
  </main>
);
