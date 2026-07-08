import React from 'react'
import './portfolio.css'
import Hero from '../../Components/Portfolio components/Hero/HeroPort'
import PorttNavbar from '../../Components/Portfolio components/portNav/PortNavbar'
import About from '../../Components/Portfolio components/Hero/AboutPort'
import Skills from '../../Components/Portfolio components/Skills/Skills'
import Services from '../../Components/Portfolio components/Skills/Servicesport'
import Projects from '../../Components/Portfolio components/Projects/Projects'
import Experience from '../../Components/Portfolio components/Projects/Experience'
import Education from '../../Components/Portfolio components/Skills/Education'
import Testimonials from '../../Components/Portfolio components/Skills/Testimonials'
import Contact from '../../Components/Portfolio components/Projects/Contact'
import GithubStats from '../../Components/Portfolio components/ThemeToggle/GithubStats'
import Scene2 from '../../Components/Scene2.jsx'
import Cursor from '../../Components/Portfolio components/Cursor/Cursor'
import ScrollProgress from '../../Components/Portfolio components/ThemeToggle/ScrollProgress.jsx'
const protfolio = () => {
  return (
    <>
    <ScrollProgress/>
      <Scene2 />
      <Cursor />
      <PorttNavbar />
      <Hero />
      <About />
      <Skills />
      <Services />
      <Projects />
      <Experience />
      <Education />
      <Testimonials />
      <GithubStats />
      <Contact />
      <footer className="footer">
        <p>© 2026 Laiba Afzal. All Rights Reserved.</p>
      </footer>
    </ >
  )
}

export default protfolio