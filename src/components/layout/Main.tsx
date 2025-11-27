import { ContentSection } from '../common/ContentSection';

export interface MainProps {}

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
export const Main = () => (
  <main id='main-content' role='main' className='app-main'>
    <ContentSection
      title='Welcome to our application'
      desc='This is the main content area of the application.'
      columns={4}
      hasChildrenContainer={true}
    >
      <article className='feature-card'>
        <h3>Feature One</h3>
        <p>Description of feature one.</p>
      </article>
      <article className='feature-card'>
        <h3>Feature Two</h3>
        <p>Description of feature two.</p>
      </article>
      <article className='feature-card'>
        <h3>Feature Three</h3>
        <p>Description of feature three.</p>
      </article>
      <article className='feature-card'>
        <h3>Feature Four</h3>
        <p>Description of feature four.</p>
      </article>
    </ContentSection>
  </main>
);
