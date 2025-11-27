import AppShell from './components/layout/AppShell';
import { ThemeProvider } from './providers/ThemeProvider';

/**
 * Główny komponent aplikacji Preact Components System.
 *
 * @returns Główny komponent aplikacji opakowany w ThemeProvider
 */
const App = () => (
  <ThemeProvider>
    <AppShell />
  </ThemeProvider>
);

export default App;