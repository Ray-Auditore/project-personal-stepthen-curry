import { useState } from 'react';
import { shoes, brandCollabs } from '../data';
import { useScrollReveal } from '../hooks';

export function Shoes() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  const [active, setActive] = useState(0);
  const shoe = shoes[active];

  return (
    <section id="sepatu" className="relative bg-ink-950 py-20 sm:py-32">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="flex items-center gap-4">
          <span className="font-display text-sm text-flame-500 tabular-nums">05</span>
          <span className="h-px flex-1 bg-ink-800" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-ink-400">Sepatu & Kolaborasi</span>
        </div>

        {/* Showcase */}
        <div ref={ref} className="mt-12 grid grid-cols-12 gap-6 lg:gap-10">
          {/* Left: big image */}
          <div className="col-span-12 lg:col-span-7">
            <div
              className={`relative overflow-hidden rounded-sm border border-ink-800 bg-ink-900 transition-all duration-700 ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/10]">
                {shoes.map((s, i) => (
                  <img
                    key={s.model}
                    src={s.image}
                    alt={s.model}
                    className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                      active === i ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
                    }`}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 to-transparent" />
                <div className="absolute left-5 top-5 flex items-center gap-3">
                  <span className="rounded-full bg-ink-950/70 px-3 py-1 text-[10px] uppercase tracking-widest text-flame-400 backdrop-blur">
                    {shoe.year}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-flame-400">
                  <span>{shoe.brand}</span>
                  <span className="text-ink-600">/</span>
                  <span className="text-ink-400">{shoe.collab}</span>
                </div>
                <h3 className="mt-2 font-display text-4xl text-ink-50 sm:text-5xl lg:text-6xl">
                  {shoe.model}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-300 text-pretty">
                  {shoe.desc}
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <span className="h-px w-8 bg-flame-500" />
                  <span className="text-xs uppercase tracking-[0.3em] text-ink-400">
                    Colorway — {shoe.colorway}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: selector list */}
          <div className="col-span-12 lg:col-span-5">
            <div className="text-[10px] uppercase tracking-[0.4em] text-ink-500">
              Koleksi Signature
            </div>
            <div className="mt-5 border-t border-ink-800">
              {shoes.map((s, i) => (
                <button
                  key={s.model}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`group flex w-full items-center gap-4 border-b border-ink-800 py-5 text-left transition-all ${
                    active === i ? 'pl-3' : 'pl-0'
                  }`}
                >
                  <span
                    className={`font-display text-xs tabular-nums transition-colors ${
                      active === i ? 'text-flame-500' : 'text-ink-600'
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-sm border border-ink-700">
                    <img src={s.image} alt={s.model} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div
                      className={`font-display text-xl transition-colors sm:text-2xl ${
                        active === i ? 'text-ink-50' : 'text-ink-400 group-hover:text-ink-200'
                      }`}
                    >
                      {s.model}
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-ink-500">
                      {s.brand} · {s.year}
                    </div>
                  </div>
                  <span
                    className={`h-2 w-2 rounded-full transition-all ${
                      active === i ? 'bg-flame-500' : 'bg-ink-700'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Brand collaborations */}
        <BrandCollabs />
      </div>
    </section>
  );
}

function BrandCollabs() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  const marqueeBrands = brandCollabs.concat(brandCollabs).concat(brandCollabs);

  return (
    <div ref={ref} className="mt-24">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-4xl text-ink-50 sm:text-5xl lg:text-6xl">
          BRAND COLLABS
        </h3>
        <span className="hidden text-[10px] uppercase tracking-[0.4em] text-ink-500 sm:block">
          {brandCollabs.length} Partners
        </span>
      </div>

      {/* Infinite marquee */}
      <div className="mt-10 overflow-hidden border-y border-ink-800 py-6 mask-fade-r">
        <div className="flex w-max animate-marquee">
          {marqueeBrands.map((b, i) => (
            <span
              key={i}
              className="mx-8 font-display text-3xl text-ink-600 transition-colors hover:text-flame-500 sm:text-4xl"
            >
              {b.brand}
              <span className="ml-8 text-flame-700">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Detail cards */}
      <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-ink-800 bg-ink-800 sm:grid-cols-2 lg:grid-cols-3">
        {brandCollabs.map((b, i) => (
          <div
            key={b.brand}
            className={`group bg-ink-900 p-6 transition-all duration-500 hover:bg-ink-850 ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
            style={{ transitionDelay: `${i * 80}ms`, backgroundColor: undefined }}
          >
            <div className="flex items-start justify-between">
              <h4 className="font-display text-2xl text-ink-50 transition-colors group-hover:text-flame-400">
                {b.brand}
              </h4>
              <span className="rounded-full border border-ink-700 px-2.5 py-0.5 text-[9px] uppercase tracking-widest text-ink-400">
                {b.type}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-400 text-pretty">{b.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
