import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import userConfig from '../profile.config'
import { resolveConfig } from './config/defaults'
import { ThemeProvider } from './theme/ThemeProvider'
import App from './App'
import './index.css'

const config = resolveConfig(userConfig)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider config={config}>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
