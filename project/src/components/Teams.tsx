import { useState } from 'react';
import { teams, teammates } from '../data';
import { useScrollReveal } from '../hooks';

export function Teams() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="tim" className="relative bg-ink-950 py-20 sm:py-32">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="flex items-center gap-4">
          <span className="font-display text-sm text-flame-500 tabular-nums">03</span>
          <span className="h-px flex-1 bg-ink-800" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-ink-400">Tim</span>
        </div>

        <div ref={ref} className="mt-12">
          <h2
            className={`font-display text-5xl leading-[0.9] text-ink-50 transition-all duration-700 sm:text-7xl lg:text-8xl ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            ONE PLAYER.
            <br />
            <span className="text-flame-500">ONE TEAM.</span>
          </h2>
          <p className="mt-6 max-w-lg text-sm text-ink-300 text-pretty sm:text-base">
            Kesetiaan langka di era basket modern — Curry hanya memperkuat dua tim sepanjang kariernya.
          </p>

          <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-ink-800 bg-ink-800 lg:grid-cols-2">
            {teams.map((t, i) => (
              <div
                key={t.name}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`relative overflow-hidden bg-ink-900 p-8 transition-colors duration-500 sm:p-12 ${
                  hovered === i ? 'bg-ink-850' : ''
                }`}
                style={{ backgroundColor: hovered === i ? '#161619' : undefined }}
              >
                {/* Big number watermark */}
                <span
                  className={`pointer-events-none absolute -right-4 -top-8 font-display text-[10rem] leading-none text-ink-800 transition-all duration-500 sm:text-[14rem] ${
                    hovered === i ? 'text-flame-900/40 scale-110' : ''
                  }`}
                >
                  0{i + 1}
                </span>

                <div className="relative">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-flame-400">
                    {t.period}
                  </span>
                  <h3 className="mt-3 font-display text-4xl text-ink-50 sm:text-5xl lg:text-6xl">
                    {t.name}
                  </h3>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-ink-400">{t.role}</p>
                  <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-300 text-pretty">
                    {t.desc}
                  </p>
                  <div className="mt-8 inline-flex items-center gap-3 border-l-2 border-flame-500 pl-4">
                    <span className="font-display text-2xl text-flame-400">{t.stat}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Teammates() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  const [active, setActive] = useState(0);

  return (
    <section id="rekan" className="relative bg-ink-900 py-20 sm:py-32">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="flex items-center gap-4">
          <span className="font-display text-sm text-flame-500 tabular-nums">04</span>
          <span className="h-px flex-1 bg-ink-700" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-ink-400">Rekan Setim</span>
        </div>

        <div ref={ref} className="mt-12 grid grid-cols-12 gap-6 lg:gap-10">
          {/* Left: name list */}
          <div className="col-span-12 lg:col-span-4">
            <h2
              className={`font-display text-5xl leading-[0.9] text-ink-50 transition-all duration-700 sm:text-6xl lg:text-7xl ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              THE
              <br />
              <span className="text-flame-500">SQUAD.</span>
            </h2>
            <p className="mt-5 max-w-sm text-sm text-ink-300 text-pretty">
              Para rekan yang bersama Curry membangun dinasti Warriors.
            </p>

            <ul className="mt-10 border-t border-ink-700">
              {teammates.map((m, i) => (
                <li key={m.name}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className={`group flex w-full items-center justify-between border-b border-ink-700 py-4 text-left transition-all ${
                      active === i ? 'pl-4' : 'pl-0'
                    }`}
                  >
                    <div className="flex items-baseline gap-3">
                      <span
                        className={`font-display text-xs tabular-nums transition-colors ${
                          active === i ? 'text-flame-500' : 'text-ink-600'
                        }`}
                      >
                        0{i + 1}
                      </span>
                      <span
                        className={`font-display text-2xl transition-colors sm:text-3xl ${
                          active === i ? 'text-ink-50' : 'text-ink-400 group-hover:text-ink-200'
                        }`}
                      >
                        {m.name}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] uppercase tracking-widest transition-all ${
                        active === i ? 'text-flame-400 opacity-100' : 'text-ink-600 opacity-0 group-hover:opacity-60'
                      }`}
                    >
                      {m.role.split(' ')[0]}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: active teammate showcase */}
          <div className="col-span-12 lg:col-span-8">
            <div className="relative h-[60vh] min-h-[420px] overflow-hidden rounded-sm border border-ink-700">
              {teammates.map((m, i) => (
                <div
                  key={m.name}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    active === i ? 'z-10 opacity-100' : 'z-0 opacity-0'
                  }`}
                >
                  <img
                    src={m.image}
                    alt={m.name}
                    className="h-full w-full object-cover"
                    style={{
                      transform: active === i ? 'scale(1.05)' : 'scale(1)',
                      transition: 'transform 6s ease-out',
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-ink-950/60 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-flame-400">
                      {m.bond}
                    </span>
                    <h3 className="mt-2 font-display text-5xl text-ink-50 sm:text-6xl lg:text-7xl">
                      {m.name}
                    </h3>
                    <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-200 text-pretty sm:text-base">
                      {m.desc}
                    </p>
                    <div className="mt-5 flex items-center gap-3">
                      <span className="h-px w-8 bg-flame-500" />
                      <span className="text-xs uppercase tracking-[0.3em] text-flame-300">
                        {m.stat}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
