import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

const root = document.getElementById('root')

const resizeOps = () => {
  document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
};

resizeOps();
window.addEventListener("resize", resizeOps);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
