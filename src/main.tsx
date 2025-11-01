import { render } from 'preact'
import App from './App'
import './styles/index.scss'

/**
 * Punkt wejścia aplikacji - renderuje główny komponent App do elementu DOM o id 'app'.
 */
const appElement = document.getElementById('app');
if (appElement) {
  render(<App />, appElement);
} else {
  console.error('Element with id "app" not found');
  // Fallback: create the element if it doesn't exist
  const fallbackElement = document.createElement('div');
  fallbackElement.id = 'app';
  document.body.appendChild(fallbackElement);
  render(<App />, fallbackElement);
}
