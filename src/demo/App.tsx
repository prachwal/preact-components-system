import { ContentSection } from '../lib/components/common';
import { AppShell, Main } from '../lib/components/layout';
import { ThemeProvider } from '../lib/providers';

// dołącz style css aplikacji produkcyjnej
import '../styles/index.scss';

/**
 * Główny komponent aplikacji Preact Components System.
 *
 * @returns Główny komponent aplikacji opakowany w ThemeProvider
 */
const App = () => (
  <ThemeProvider>
    <AppShell>
      <Main>
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
      </Main>
    </AppShell>
  </ThemeProvider>
);

export default App;
