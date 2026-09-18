import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'

export type PanelDef = {
  id: string
  label: string
  accent: string
  bg: string
  content: ReactNode
}

const DWELL = 0.72
const TRANSITION = 1 - DWELL

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1)
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

const computeMetrics = () => {
  const vw = window.innerWidth
  const vh = window.innerHeight
  return {
    vw,
    vh,
    spineW: vw < 768 ? 18 : 56,
    unit: Math.max(1, Math.round(vh * 1.8)),
  }
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  return reduced
}

function StackScroll({ panels }: { panels: PanelDef[] }) {
  const panelRefs = useRef<(HTMLElement | null)[]>([])
  const spineRefs = useRef<(HTMLButtonElement | null)[]>([])
  const barRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const [metrics, setMetrics] = useState(computeMetrics)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const handleResize = () => setMetrics(computeMetrics())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (reduced) return
    const { vw, spineW, unit } = metrics
    const count = panels.length
    const maxG = count - 1 + DWELL
    let smooth = window.scrollY
    let frameId = 0
    let lastActive = -1

    const tick = () => {
      const target = window.scrollY
      smooth += (target - smooth) * 0.14
      if (Math.abs(target - smooth) < 0.4) smooth = target
      const g = clamp01(smooth / unit / maxG) * maxG

      for (let i = 0; i < count; i++) {
        const panel = panelRefs.current[i]
        if (!panel) continue

        const enter =
          i === 0 ? 1 : clamp01((g - (i - TRANSITION)) / TRANSITION)
        const exit =
          i === count - 1 ? 0 : clamp01((g - (i + DWELL)) / TRANSITION)
        const contentP = clamp01((g - i + TRANSITION) / 0.5)
        const rest = i * spineW

        let tx = rest
        if (enter < 1) tx = rest + (vw - rest) * (1 - easeOutCubic(enter))
        if (exit > 0) tx = rest - (rest + vw) * easeInOutCubic(exit)

        const hidden = exit >= 1 || (i > 0 && enter <= 0)
        panel.style.visibility = hidden ? 'hidden' : 'visible'
        panel.style.transform = `translate3d(${tx.toFixed(2)}px, 0, 0) scale(${(
          1 - exit * 0.04
        ).toFixed(4)})`
        panel.style.setProperty('--p', contentP.toFixed(4))

        const spine = spineRefs.current[i]
        if (spine) {
          const s = easeOutCubic(exit)
          spine.style.opacity = s.toFixed(3)
          spine.style.transform = `translate3d(${((s - 1) * spineW).toFixed(2)}px, 0, 0)`
          spine.style.pointerEvents = exit >= 1 ? 'auto' : 'none'
        }
      }

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${(g / maxG).toFixed(4)})`
      }

      const active = Math.min(count - 1, Math.max(0, Math.round(g - 0.36)))
      if (active !== lastActive) {
        lastActive = active
        const accent = panels[active].accent
        document.documentElement.style.setProperty('--cursor-accent', accent)
        if (barRef.current) barRef.current.style.backgroundColor = accent
        if (counterRef.current) {
          counterRef.current.textContent = `0${active + 1}`
        }
      }

      frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [metrics, reduced, panels])

  if (reduced) {
    return (
      <main>
        {panels.map((panel) => (
          <section
            key={panel.id}
            className="panel-static"
            data-accent={panel.accent}
            style={
              {
                backgroundColor: panel.bg,
                '--accent': panel.accent,
              } as CSSProperties
            }
          >
            {panel.content}
          </section>
        ))}
      </main>
    )
  }

  const totalHeight =
    (panels.length - 1 + DWELL) * metrics.unit + metrics.vh

  const goTo = (index: number) => {
    window.scrollTo({
      top: index === 0 ? 0 : (index + 0.4) * metrics.unit,
      behavior: 'smooth',
    })
  }

  return (
    <>
      <div style={{ height: totalHeight }} aria-hidden="true" />
      <main className="stage">
        {panels.map((panel, i) => (
          <section
            key={panel.id}
            ref={(el) => {
              panelRefs.current[i] = el
            }}
            className="panel"
            data-accent={panel.accent}
            style={
              {
                backgroundColor: panel.bg,
                zIndex: 10 + i,
                visibility: i === 0 ? 'visible' : 'hidden',
                transform: i === 0 ? undefined : 'translate3d(100vw, 0, 0)',
                '--accent': panel.accent,
              } as CSSProperties
            }
          >
            {panel.content}
          </section>
        ))}

        {panels.slice(0, -1).map((panel, i) => (
          <button
            key={panel.id}
            ref={(el) => {
              spineRefs.current[i] = el
            }}
            type="button"
            className="spine"
            aria-label={`Back to ${panel.label}`}
            onClick={() => goTo(i)}
            style={
              {
                left: i * metrics.spineW,
                width: metrics.spineW,
                zIndex: 40,
                backgroundColor: panel.bg,
                '--accent': panel.accent,
              } as CSSProperties
            }
          >
            <span className="spine-num">0{i + 1}</span>
            <span className="spine-label">{panel.label}</span>
            <span className="spine-num" aria-hidden="true">
              ●
            </span>
          </button>
        ))}

        <header className="pointer-events-none absolute inset-x-0 top-0 z-[60] flex items-center justify-between px-6 py-5 text-[0.7rem] uppercase tracking-[0.32em] text-[#f4ede4]/80 md:px-10">
          <span>Ninad Shenoy</span>
          <span className="tabular-nums">
            <span ref={counterRef}>01</span>
            <span className="opacity-50"> / 0{panels.length}</span>
          </span>
        </header>

        <div className="absolute inset-x-0 bottom-0 z-[60] h-[3px] bg-white/10">
          <div
            ref={barRef}
            className="h-full w-full origin-left scale-x-0"
            style={{ backgroundColor: panels[0].accent }}
          />
        </div>
      </main>
    </>
  )
}

export default StackScroll
