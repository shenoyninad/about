import { useRef, type CSSProperties, type ReactNode } from "react";
import { email, socials } from "../data/content";

function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (event: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${dx * 0.22}px, ${dy * 0.22}px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  };

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="inline-block transition-transform duration-300 ease-out"
    >
      {children}
    </div>
  );
}

const socialIcons: Record<string, ReactNode> = {
  github: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.53-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 2.88-.39c.98 0 1.96.13 2.88.39 2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.24 2.76.12 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.66.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  ),
};

function Contact() {
  return (
    <div className="panel-inner">
      <p className="eyebrow reveal mb-6" style={{ "--d": 0 } as CSSProperties}>
        04 — Contact
      </p>
      <h2
        className="reveal font-display max-w-4xl text-5xl leading-[1.05] md:text-7xl"
        style={{ "--d": 0.1 } as CSSProperties}
      >
        Let&apos;s build{" "}
        <em className="italic text-[#8fa8ff]">something worth opening</em>{" "}
        twice.
      </h2>

      <div
        className="reveal mt-10 flex flex-wrap items-center gap-6 md:mt-14"
        style={{ "--d": 0.28 } as CSSProperties}
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
        style={{ "--d": 0.42 } as CSSProperties}
      >
        {socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            className="inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.3em] text-[#f4ede4]/60 transition-colors duration-300 hover:text-[#8fa8ff]"
          >
            {socialIcons[social.icon]}
            {social.label}
          </a>
        ))}
      </div>

      <p
        className="reveal absolute bottom-8 right-6 text-[0.65rem] uppercase tracking-[0.3em] text-[#f4ede4]/35 md:right-12"
        style={{ "--d": 0.5 } as CSSProperties}
      >
        © 2026 Ninad Shenoy — Made with too many layers
      </p>
    </div>
  );
}

export default Contact;
