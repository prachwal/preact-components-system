import { ThemeProvider } from './providers/ThemeProvider';
import AppShell from './components/layout/AppShell';

const App = () => (
  <ThemeProvider>
    <AppShell />
  </ThemeProvider>
);

export default App;