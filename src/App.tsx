import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import CountryDetail from './pages/CountryDetail'
import NotFound from './pages/NotFound'
import { MoonIcon } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from './lib/utils'
import { Button } from './components/ui/button'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode))
  }, [isDarkMode])

  return (
    <Router>
      <div className={cn('min-h-screen bg-background text-foreground', isDarkMode ? 'dark' : '')}>
        <header className="border-b bg-muted">
          <div className="container mx-auto py-6 flex justify-between items-center">
            <Link to="/">
              <h1 className="text-2xl font-bold">Where in the world?</h1>
            </Link>
            <Button
              className="flex items-center gap-2"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              <MoonIcon className="w-4 h-4" />
              Dark Mode
            </Button>
          </div>
        </header>
        <main className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/country/:code" element={<CountryDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
