import { render } from 'preact'
import './index.scss'
import App from './App'

/**
 * Punkt wejścia aplikacji - renderuje główny komponent App do elementu DOM o id 'app'.
 */
const appElement = document.getElementById('app');
if (appElement) {
  render(<App />, appElement);
} else {
  console.error('Element with id "app" not found');
}
