import ContentSection from '../common/ContentSection';

const Main = () => (
  <main id="main-content" role="main" className="app-main">
    <ContentSection
      title="Welcome to our application"
      desc="This is the main content area of the application."
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

export default Main;