import { render } from 'preact';

import App from './App';

/**
 * Punkt wejścia aplikacji - renderuje główny komponent App do elementu DOM o id 'app'.
 */
const appElement = document.getElementById('app');
if (appElement) {
  render(<App />, appElement);
} else {
  throw new Error('Element with id "app" not found');
}
