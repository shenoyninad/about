import { projects } from '../data/content'
import type { CSSProperties } from 'react'

function Projects() {
  return (
    <div className="panel-inner">
      <div className="reveal mb-8 md:mb-12" style={{ '--d': 0 } as CSSProperties}>
        <p className="eyebrow mb-4">03 — Freelance work</p>
        <h2 className="font-display text-4xl leading-tight md:text-6xl">
          Things I&apos;ve <em className="italic text-[#ffb35c]">shipped</em>
        </h2>
      </div>

      <div className="-mx-2 flex snap-x snap-mandatory gap-5 overflow-x-auto px-2 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
        {projects.map((project, i) => (
          <a
            key={project.name}
            href={project.href}
            className="project-card reveal group block min-w-[74vw] snap-start sm:min-w-0"
            style={{ '--d': 0.16 + i * 0.12 } as CSSProperties}
          >
            <div className="card-cover mb-4">
              <div className={`card-fill ${project.gradient}`} />
              <span className="card-num font-display">0{i + 1}</span>
            </div>
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-display text-xl md:text-2xl">
                {project.name}
              </h3>
              <span className="text-sm text-[#ffb35c] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                ↗
              </span>
            </div>
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#ffb35c]/80">
              {project.kind}
            </p>
            <p className="mb-3 text-sm leading-relaxed text-[#f4ede4]/65">
              {project.desc}
            </p>
            <p className="text-[0.7rem] tracking-wide text-[#f4ede4]/40">
              {project.stack.join(' · ')}
            </p>
          </a>
        ))}
      </div>
    </div>
  )
}

export default Projects
