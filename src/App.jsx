import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Landing from './Landing.jsx'
import VariantSite from './layout/VariantSite.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/:variantId/*" element={<VariantSite />} />
      </Routes>
    </>
  )
}
