export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-950 pt-20">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-flame-400">
              A tribute by
            </span>
            <h2 className="mt-2 font-display text-7xl text-ink-50 sm:text-8xl lg:text-9xl">
              RAYYAN
            </h2>
          </div>
          <div className="max-w-sm text-sm text-ink-400 text-pretty">
            Website tribute non-komersial untuk Stephen Curry — sang penembak terbaik
            sepanjang masa. Dibuat dengan apresiasi terhadap permainan basket.
          </div>
        </div>

        {/* Nav grid */}
        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-ink-800 bg-ink-800 sm:grid-cols-3 lg:grid-cols-6">
          {[
            { label: 'Biodata', href: '#biodata' },
            { label: 'Karir', href: '#karir' },
            { label: 'Tim', href: '#tim' },
            { label: 'Rekan', href: '#rekan' },
            { label: 'Sepatu', href: '#sepatu' },
            { label: 'Top', href: '#top' },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="group flex items-center justify-between bg-ink-900 px-5 py-4 transition-colors hover:bg-ink-850"
            >
              <span className="text-sm text-ink-200 transition-colors group-hover:text-flame-400">
                {l.label}
              </span>
              <span className="text-flame-500 opacity-0 transition-opacity group-hover:opacity-100">
                →
              </span>
            </a>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-ink-800 py-8 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="font-display text-xl text-ink-50">30</span>
            <span className="h-1.5 w-1.5 rounded-full bg-flame-500" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-ink-500">
              Stephen Curry Tribute
            </span>
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-ink-500">
            © {new Date().getFullYear()} Rayyan — All rights reserved to their respective owners
          </p>
        </div>
      </div>

      {/* Giant watermark */}
      <div className="pointer-events-none select-none overflow-hidden">
        <div className="flex w-max animate-marquee-slow whitespace-nowrap py-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="mx-8 font-display text-[10vw] leading-none text-ink-900 lg:text-[8vw]"
            >
              STEPHEN CURRY ✦
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
