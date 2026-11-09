import { useEffect, useRef, useState } from 'react';
import { career } from '../data';

export function Career() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress from when section top hits viewport top until bottom hits bottom
      const total = rect.height - vh;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / total));
      setScrollProgress(progress);

      const idx = Math.min(
        career.length - 1,
        Math.floor(progress * career.length * 1.1)
      );
      setActiveIndex(idx);

      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  // translate the horizontal track based on scroll progress
  const trackWidth = trackRef.current?.scrollWidth ?? 0;
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const maxTranslate = Math.max(0, trackWidth - viewportWidth);
  const translate = -scrollProgress * maxTranslate;

  return (
    <section
      ref={sectionRef}
      id="karir"
      className="relative"
      style={{ height: `${career.length * 60}vh` }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden bg-ink-900">
        {/* Header */}
        <div className="flex items-center gap-4 px-5 pt-24 sm:px-8 sm:pt-28">
          <span className="font-display text-sm text-flame-500 tabular-nums">02</span>
          <span className="h-px flex-1 bg-ink-700" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-ink-400">Awal Karir</span>
        </div>

        <div className="flex items-end justify-between px-5 pt-6 sm:px-8">
          <h2 className="font-display text-5xl leading-none text-ink-50 sm:text-7xl lg:text-8xl">
            THE JOURNEY
          </h2>
          <div className="hidden items-center gap-3 text-xs text-ink-400 sm:flex">
            <span className="tabular-nums text-flame-400">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-ink-600">/</span>
            <span className="tabular-nums">{String(career.length).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Horizontal track */}
        <div className="relative mt-auto flex-1 overflow-hidden">
          <div
            ref={trackRef}
            className="flex h-full items-stretch gap-0 will-change-transform"
            style={{ transform: `translateX(${translate}px)` }}
          >
            {career.map((item, i) => (
              <article
                key={item.year}
                className="flex h-full w-[88vw] shrink-0 flex-col justify-center border-r border-ink-700 px-6 sm:w-[60vw] sm:px-10 lg:w-[42vw] xl:w-[36vw]"
              >
                <div
                  className={`transition-all duration-500 ${
                    i === activeIndex ? 'opacity-100' : 'opacity-40'
                  }`}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-7xl text-flame-500 sm:text-8xl lg:text-9xl">
                      {item.year}
                    </span>
                    {i === activeIndex && (
                      <span className="h-2 w-2 rounded-full bg-flame-500 animate-pulse" />
                    )}
                  </div>
                  <h3 className="mt-4 font-serif-editorial text-2xl text-ink-50 sm:text-3xl" style={{ fontFamily: '"Playfair Display", serif' }}>
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-300 text-pretty sm:text-base">
                    {item.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="px-5 pb-8 sm:px-8">
          <div className="h-px w-full bg-ink-700">
            <div
              className="h-full bg-flame-500 transition-all"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-ink-500">
            <span>2006</span>
            <span className="hidden sm:block">Scroll to explore →</span>
            <span>2024</span>
          </div>
        </div>
      </div>
    </section>
  );
}
