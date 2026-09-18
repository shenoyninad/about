import { career } from '../data/content'
import type { CSSProperties } from 'react'

function Career() {
  return (
    <div className="panel-inner">
      <div className="reveal mb-10 md:mb-16" style={{ '--d': 0 } as CSSProperties}>
        <p className="eyebrow mb-4">02 — Career</p>
        <h2 className="font-display text-4xl leading-tight md:text-6xl">
          The road{' '}
          <em className="italic text-[#7ce0c3]">so far</em>
        </h2>
      </div>

      <ol className="grid gap-8 md:grid-cols-4 md:gap-6">
        {career.map((entry, i) => (
          <li
            key={entry.period}
            className="reveal group relative border-t border-[#f4ede4]/15 pt-5 transition-colors duration-300 hover:border-[#7ce0c3]/60"
            style={{ '--d': Math.min(0.18 + i * 0.14, 0.6) } as CSSProperties}
          >
            <span className="absolute -top-[5px] left-0 h-[9px] w-[9px] rounded-full bg-[#7ce0c3] opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:shadow-[0_0_18px_#7ce0c3]" />
            <p className="mb-3 text-[0.7rem] uppercase tracking-[0.28em] text-[#7ce0c3]">
              {entry.period}
            </p>
            <h3 className="font-display text-xl md:text-2xl">{entry.role}</h3>
            <p className="mb-3 text-sm text-[#f4ede4]/55">{entry.org}</p>
            <p className="text-sm leading-relaxed text-[#f4ede4]/70">
              {entry.note}
            </p>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default Career
