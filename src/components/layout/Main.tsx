import FeatureCard from '../common/FeatureCard';
import ContentSection from '../common/ContentSection';

const Main = () => (
  <main id="main-content" role="main" className="app-main">
    <ContentSection
      title="Welcome to our application"
      desc="This is the main content area of the application."
    >
      <FeatureCard title="Feature One">
        <p>Description of feature one.</p>
      </FeatureCard>
      <FeatureCard title="Feature Two" level={3}>
        <p>Description of feature two.</p>
      </FeatureCard>
      <FeatureCard title="Feature Three">
        <p>Description of feature three.</p>
      </FeatureCard>
      <FeatureCard title="Feature Four">
        <p>Description of feature four.</p>
      </FeatureCard>
    </ContentSection>
    <footer role="contentinfo" className="app-footer">
      <p>&copy; 2024 App Name. All rights reserved.</p>
    </footer>
  </main>
);

export default Main;