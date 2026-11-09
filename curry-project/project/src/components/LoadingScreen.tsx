import { useEffect, useState } from 'react';

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const start = Date.now();
    const duration = 2400;
    let raf = 0;
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setCount(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setExiting(true), 200);
        setTimeout(onDone, 900);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[300] flex flex-col items-center justify-center bg-ink-950 bg-grain ${
        exiting ? 'animate-fade-out' : ''
      }`}
    >
      <div className="absolute inset-0 opacity-30">
        <div className="absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-flame-600/20 blur-[120px]" />
      </div>

      <div className="relative flex flex-col items-center">
        {/* Logo R */}
        <div className="relative mb-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-flame-500/40 bg-ink-900/60 backdrop-blur">
            <svg viewBox="0 0 64 64" className="h-11 w-11" fill="none">
              <defs>
                <linearGradient id="lg" x1="8" y1="8" x2="56" y2="56">
                  <stop stopColor="#fb923c" />
                  <stop offset="1" stopColor="#f97316" />
                </linearGradient>
              </defs>
              <path
                d="M20 46V18h13a8 8 0 0 1 0 16h-7"
                stroke="url(#lg)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M40 46L30 34" stroke="url(#lg)" strokeWidth="5" strokeLinecap="round" />
              <circle cx="46" cy="22" r="3" fill="#fbbf24" />
            </svg>
          </div>
        </div>

        <div className="overflow-hidden">
          <p
            className="font-display text-5xl tracking-[0.15em] text-ink-50 reveal-up sm:text-7xl"
            style={{ animationDelay: '0.1s', opacity: 0 }}
          >
            RAYYAN
          </p>
        </div>
        <div className="overflow-hidden">
          <p
            className="mt-2 text-[10px] uppercase tracking-[0.5em] text-ink-400 reveal-up sm:text-xs"
            style={{ animationDelay: '0.3s', opacity: 0 }}
          >
            presents a tribute to
          </p>
        </div>

        <div className="mt-6 w-56 overflow-hidden sm:w-72">
          <div className="flex items-center justify-between font-display text-sm text-ink-300">
            <span className="tracking-widest">LOADING</span>
            <span className="tabular-nums">{count}</span>
          </div>
          <div className="mt-2 h-px w-full bg-ink-700">
            <div
              className="h-full bg-flame-500 transition-all duration-100 ease-linear"
              style={{ width: `${count}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
