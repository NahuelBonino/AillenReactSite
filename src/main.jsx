import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import '../public/css/fontawesome-all.min.css'
import './styles/main.css'
import App from './App.jsx'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
