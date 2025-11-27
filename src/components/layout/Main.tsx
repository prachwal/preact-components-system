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
  <main id="main-content" role="main" className="app-main">
    <ContentSection
      title="Welcome to our application"
      desc="This is the main content area of the application."
      columns={4}
      hasChildrenContainer={true}
    >
      <ContentSection
        title="Feature One"
        hasChildrenContainer={true}
        className="feature-card"
        as="article"
        level={3}
      >
        <p>Description of feature one.</p>
      </ContentSection>
      <ContentSection
        title="Feature Two"
        hasChildrenContainer={true}
        className="feature-card"
        as="article"
        level={3}
      >
        <p>Description of feature two.</p>
      </ContentSection>
      <ContentSection
        title="Feature Three"
        hasChildrenContainer={true}
        className="feature-card"
        as="article"
        level={3}
      >
        <p>Description of feature three.</p>
      </ContentSection>
      <ContentSection
        title="Feature Four"
        hasChildrenContainer={true}
        className="feature-card"
        as="article"
        level={3}
      >
        <p>Description of feature four.</p>
      </ContentSection>
    </ContentSection>
    <footer role="contentinfo" className="app-footer">
      <p>&copy; 2024 App Name. All rights reserved.</p>
    </footer>
  </main>
);