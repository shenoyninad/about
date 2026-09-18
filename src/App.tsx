import StackScroll, { type PanelDef } from './components/StackScroll'
import CustomCursor from './components/CustomCursor'
import Hero from './sections/Hero'
import Career from './sections/Career'
import Projects from './sections/Projects'
import Contact from './sections/Contact'

const panels: PanelDef[] = [
  {
    id: 'home',
    label: 'Home',
    accent: '#ff9ecb',
    bg: '#191118',
    content: <Hero />,
  },
  {
    id: 'career',
    label: 'Career',
    accent: '#7ce0c3',
    bg: '#0f1c19',
    content: <Career />,
  },
  {
    id: 'work',
    label: 'Freelance Work',
    accent: '#ffb35c',
    bg: '#1c150d',
    content: <Projects />,
  },
  {
    id: 'contact',
    label: 'Contact',
    accent: '#8fa8ff',
    bg: '#0f1420',
    content: <Contact />,
  },
]

function App() {
  return (
    <>
      <CustomCursor />
      <StackScroll panels={panels} />
      <div className="grain" aria-hidden="true" />
    </>
  )
}

export default App
