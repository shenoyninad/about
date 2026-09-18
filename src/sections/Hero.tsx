import DepthText from '../components/DepthText'

function Hero() {
  return (
    <div className="panel-inner">
      <div className="hero-ripples" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="hero-intro relative z-10 flex flex-col items-start gap-8">
        <p className="eyebrow">Portfolio — 2026</p>
        <DepthText
          text="Ninad Shenoy"
          layers={34}
          depth={2.4}
          faceColor="#f4ede4"
          depthColor="#ff9ecb"
          tilt={7.5}
          pointerTracking
          smoothing={0.14}
          perspective={900}
          autoOrbit
          orbitSpeed={0.35}
          fontSize="clamp(3.2rem, 11vw, 9rem)"
          fontWeight={900}
          shadow
        />
        <p className="max-w-xl text-base leading-relaxed text-[#f4ede4]/70 md:text-lg">
          Engineer & freelance builder. I design and ship polished web products
          — from the first sketch to the last{' '}
          <em className="font-display italic text-[#ff9ecb]">
            micro-interaction
          </em>
          .
        </p>
      </div>
      <div className="hero-intro absolute bottom-10 right-6 flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.3em] text-[#f4ede4]/50 md:right-12">
        Scroll to open the files
        <span className="scroll-hint-arrow text-[#ff9ecb]">⟶</span>
      </div>
    </div>
  )
}

export default Hero
