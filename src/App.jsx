import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, Component } from 'react'
import Landing from './Landing.jsx'
import VariantSite from './layout/VariantSite.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

// Hard guarantee against blank screens: any render error shows a styled
// fallback with a reload action instead of an empty white page.
class ErrorBoundary extends Component {
  state = { error: null }
  static getDerivedStateFromError(error) {
    return { error }
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0a0c10', color: '#e2e8f0', fontFamily: 'Inter, sans-serif', padding: 24 }}>
          <div style={{ textAlign: 'center', maxWidth: 420 }}>
            <p style={{ fontSize: 42 }}>🧯</p>
            <h1 style={{ fontSize: 22, fontWeight: 700 }}>Something glitched.</h1>
            <p style={{ color: '#94a3b8', fontSize: 14, marginTop: 8 }}>The page hit an unexpected error. One tap fixes it.</p>
            <button
              onClick={() => window.location.reload()}
              style={{ marginTop: 20, background: 'linear-gradient(90deg,#ff5c1a,#ff9f1c)', color: '#0a0c10', fontWeight: 700, border: 0, borderRadius: 999, padding: '12px 28px', cursor: 'pointer', fontSize: 15 }}
            >
              Reload page
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/:variantId/*" element={<VariantSite />} />
      </Routes>
    </ErrorBoundary>
  )
}
