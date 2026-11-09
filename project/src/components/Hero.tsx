import { useEffect, useRef, useState } from 'react';

const PORTRAIT =
  'https://images.pexels.com/photos/12882022/pexels-photo-12882022.jpeg?auto=compress&cs=tinysrgb&h=1400&w=940';
const ACTION =
  'https://images.pexels.com/photos/12882043/pexels-photo-12882043.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1600';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      setScrollY(window.scrollY);
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  const p = Math.min(1, scrollY / 800);
  const fade = 1 - p * 1.4;
  const lift = scrollY * 0.4;

  return (
    <section ref={ref} id="top" className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink-950">
      {/* Background image with parallax */}
      <div
        className="absolute inset-0"
        style={{ transform: `translateY(${lift}px) scale(${1 + p * 0.1})` }}
      >
        <img
          src={ACTION}
          alt=""
          className="h-full w-full object-cover opacity-40"
          style={{ filter: `brightness(${0.6 - p * 0.3})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-ink-950/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/80 via-transparent to-ink-950/50" />
      </div>

      {/* Grain overlay */}
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.07] mix-blend-overlay" />

      {/* Content */}
      <div
        className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-12 sm:px-8 sm:pb-16"
        style={{ opacity: Math.max(0, fade) }}
      >
        <div className="grid grid-cols-12 items-end gap-4">
          {/* Left meta */}
          <div className="col-span-12 mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 sm:col-span-7 sm:mb-0">
            <span className="text-[10px] uppercase tracking-[0.4em] text-flame-400">
              Golden State Warriors
            </span>
            <span className="h-px w-8 bg-ink-600" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-ink-400">
              Point Guard · #30
            </span>
          </div>

          {/* Right portrait (desktop) */}
          <div className="hidden sm:col-span-5 sm:block">
            <div className="relative ml-auto h-[42vh] w-full max-w-xs overflow-hidden rounded-sm">
              <img
                src={PORTRAIT}
                alt="Stephen Curry"
                className="h-full w-full object-cover"
                style={{ transform: `translateY(${-lift * 0.15}px)` }}
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
            </div>
          </div>
        </div>

        {/* Big name */}
        <div className="mt-4 sm:mt-8">
          <h1 className="font-display leading-[0.82] text-ink-50">
            <span className="block text-[18vw] sm:text-[14vw] lg:text-[12vw] xl:text-[180px]">
              STEPHEN
            </span>
            <span className="block text-[18vw] italic text-flame-500 sm:text-[14vw] lg:text-[12vw] xl:text-[180px] font-serif-editorial" style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700 }}>
              Curry.
            </span>
          </h1>
        </div>

        <div className="mt-6 grid grid-cols-12 items-end gap-4">
          <p className="col-span-12 max-w-md text-sm leading-relaxed text-ink-300 text-pretty sm:col-span-6 sm:text-base">
            The Baby-Faced Assassin. Sang penembak yang merevolusi basket modern —
            empat kali juara NBA, dua kali MVP, dan pemegang rekor three-pointer sepanjang masa.
          </p>

          <div className="col-span-12 flex items-center gap-6 sm:col-span-6 sm:justify-end">
            <a
              href="#biodata"
              className="group flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-ink-200 transition-colors hover:text-flame-400"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-ink-600 transition-all group-hover:border-flame-500 group-hover:bg-flame-500/10">
                <span className="block h-3 w-px bg-ink-300 animate-scroll-down group-hover:bg-flame-400" />
              </span>
              Scroll
            </a>
          </div>
        </div>
      </div>

      {/* Bottom marquee */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 border-t border-ink-800/60 bg-ink-950/50 py-2 backdrop-blur-sm"
        style={{ opacity: Math.max(0, fade) }}
      >
        <Marquee />
      </div>
    </section>
  );
}

function Marquee() {
  const items = [
    '4× NBA CHAMPION',
    '2× MVP',
    '10× ALL-STAR',
    'ALL-TIME 3PT LEADER',
    'FINALS MVP 2022',
    '50/40/90 CLUB',
    'UNANIMOUS MVP',
  ];
  const doubled = [...items, ...items, ...items, ...items];
  return (
    <div className="flex w-max animate-marquee-slow whitespace-nowrap">
      {doubled.map((t, i) => (
        <span key={i} className="mx-6 flex items-center gap-6 text-[10px] uppercase tracking-[0.3em] text-ink-400">
          {t}
          <span className="text-flame-500">✦</span>
        </span>
      ))}
    </div>
  );
}
