import { useEffect, useRef, useState } from 'react'

// Scroll-reveal: returns a ref; element needs className="reveal"
export function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0.12 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

// Observes all `.reveal` descendants of a container — one hook per section
export function useRevealAll() {
  const ref = useRef(null)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const els = root.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0.1 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return ref
}

// Count-up number when scrolled into view. Supports "2,638", "96%", "24/7", "<5", "30+"
export function useCountUp(target, duration = 1400) {
  const ref = useRef(null)
  const [text, setText] = useState(target)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const m = String(target).match(/^([^0-9]*)([\d,]+)(.*)$/)
    if (!m) return setText(target)
    const [, pre, numRaw, post] = m
    const num = parseInt(numRaw.replace(/,/g, ''), 10)
    if (!Number.isFinite(num) || num === 0) return setText(target)
    setText(`${pre}0${post}`)
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        io.disconnect()
        const t0 = performance.now()
        const fmt = numRaw.includes(',')
        function tick(now) {
          const p = Math.min((now - t0) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          const v = Math.round(num * eased)
          setText(`${pre}${fmt ? v.toLocaleString('en-US') : v}${post}`)
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [target, duration])
  return [ref, text]
}

// Header background on scroll
export function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > threshold)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [threshold])
  return scrolled
}

// Spotlight hover — attach returned handler to onMouseMove of a .spotlight el
export function spotlightMove(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}
