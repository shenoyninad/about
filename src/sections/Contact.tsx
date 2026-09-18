import { useRef, type CSSProperties, type ReactNode } from 'react'
import { email, socials } from '../data/content'

function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (event: React.PointerEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const dx = event.clientX - (rect.left + rect.width / 2)
    const dy = event.clientY - (rect.top + rect.height / 2)
    el.style.transform = `translate(${dx * 0.22}px, ${dy * 0.22}px)`
  }

  const handleLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0, 0)'
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="inline-block transition-transform duration-300 ease-out"
    >
      {children}
    </div>
  )
}

function Contact() {
  return (
    <div className="panel-inner">
      <p className="eyebrow reveal mb-6" style={{ '--d': 0 } as CSSProperties}>
        04 — Contact
      </p>
      <h2
        className="reveal font-display max-w-4xl text-5xl leading-[1.05] md:text-7xl"
        style={{ '--d': 0.1 } as CSSProperties}
      >
        Let&apos;s build{' '}
        <em className="italic text-[#8fa8ff]">something worth opening</em>{' '}
        twice.
      </h2>

      <div
        className="reveal mt-10 flex flex-wrap items-center gap-6 md:mt-14"
        style={{ '--d': 0.28 } as CSSProperties}
      >
        <Magnetic>
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-3 rounded-full border border-[#8fa8ff]/50 px-7 py-4 text-sm tracking-wide text-[#f4ede4] transition-colors duration-300 hover:bg-[#8fa8ff] hover:text-[#0f1420]"
          >
            {email} <span aria-hidden="true">↗</span>
          </a>
        </Magnetic>
        <p className="text-sm text-[#f4ede4]/50">
          Freelance & collaboration inquiries welcome.
        </p>
      </div>

      <div
        className="reveal mt-12 flex flex-wrap items-center gap-8 md:mt-16"
        style={{ '--d': 0.42 } as CSSProperties}
      >
        {socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            className="text-xs uppercase tracking-[0.3em] text-[#f4ede4]/60 transition-colors duration-300 hover:text-[#8fa8ff]"
          >
            {social.label}
          </a>
        ))}
      </div>

      <p
        className="reveal absolute bottom-8 right-6 text-[0.65rem] uppercase tracking-[0.3em] text-[#f4ede4]/35 md:right-12"
        style={{ '--d': 0.5 } as CSSProperties}
      >
        © 2026 Ninad Shenoy — Made with too many layers
      </p>
    </div>
  )
}

export default Contact
