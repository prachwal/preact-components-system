import { render } from 'preact'
import './index.scss'
import App from './App'

/**
 * Punkt wejścia aplikacji - renderuje główny komponent App do elementu DOM o id 'app'.
 */
render(<App />, document.getElementById('app')!)
