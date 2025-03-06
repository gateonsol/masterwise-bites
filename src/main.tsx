
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add dark mode script to prevent flash of wrong theme
const script = document.createElement('script')
script.innerHTML = `
  let darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  let theme = localStorage.getItem('ui-theme')
  
  if (theme === 'dark' || (!theme && darkModeMediaQuery.matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
`
script.setAttribute('type', 'text/javascript')
document.head.prepend(script)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
