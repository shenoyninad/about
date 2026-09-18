import { useEffect, useRef, useState } from 'react'

function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setEnabled(fine.matches && !reduced.matches)
    update()
    fine.addEventListener('change', update)
    reduced.addEventListener('change', update)
    return () => {
      fine.removeEventListener('change', update)
      reduced.removeEventListener('change', update)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    document.documentElement.classList.add('custom-cursor')

    const pos = { x: innerWidth / 2, y: innerHeight / 2 }
    const dotPos = { ...pos }
    const ringPos = { ...pos }
    let scale = 1
    let targetScale = 1
    let seen = false
    let frameId = 0

    const handleMove = (event: PointerEvent) => {
      pos.x = event.clientX
      pos.y = event.clientY
      if (!seen) {
        seen = true
        dotPos.x = ringPos.x = pos.x
        dotPos.y = ringPos.y = pos.y
        dot.style.opacity = '1'
        ring.style.opacity = '1'
      }

      const target = event.target as Element | null
      const interactive = target?.closest?.('a, button, [data-cursor]')
      targetScale = interactive ? 1.9 : 1
      ring.classList.toggle('is-hover', Boolean(interactive))

      const accentEl = target?.closest?.('[data-accent]') as HTMLElement | null
      const accent =
        accentEl?.dataset.accent ??
        getComputedStyle(document.documentElement)
          .getPropertyValue('--cursor-accent')
          .trim()
      if (accent) {
        dot.style.backgroundColor = accent
        ring.style.borderColor = accent
      }
    }

    const handleLeave = () => {
      dot.style.opacity = '0'
      ring.style.opacity = '0'
      seen = false
    }

    const tick = () => {
      dotPos.x += (pos.x - dotPos.x) * 0.85
      dotPos.y += (pos.y - dotPos.y) * 0.85
      ringPos.x += (pos.x - ringPos.x) * 0.16
      ringPos.y += (pos.y - ringPos.y) * 0.16
      scale += (targetScale - scale) * 0.18
      dot.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0)`
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) scale(${scale.toFixed(3)})`
      frameId = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', handleLeave)
    frameId = requestAnimationFrame(tick)

    return () => {
      document.documentElement.classList.remove('custom-cursor')
      window.removeEventListener('pointermove', handleMove)
      document.documentElement.removeEventListener('pointerleave', handleLeave)
      cancelAnimationFrame(frameId)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  )
}

export default CustomCursor
