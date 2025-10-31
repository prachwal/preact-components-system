import { render } from 'preact'
import './index.css'
import { default as App } from './app.tsx'

render(<App />, document.getElementById('app')!)
