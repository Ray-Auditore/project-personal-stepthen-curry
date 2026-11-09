import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Biodata', href: '#biodata', num: '01' },
  { label: 'Karir', href: '#karir', num: '02' },
  { label: 'Tim', href: '#tim', num: '03' },
  { label: 'Rekan', href: '#rekan', num: '04' },
  { label: 'Sepatu', href: '#sepatu', num: '05' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-ink-950/80 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
          <a href="#top" className="group flex items-center gap-3">
            <span className="font-display text-2xl leading-none text-ink-50 transition-colors group-hover:text-flame-400">
              30
            </span>
            <span className="hidden text-[10px] uppercase tracking-[0.3em] text-ink-400 sm:block">
              Stephen Curry
            </span>
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group flex items-center gap-2 text-sm text-ink-200 transition-colors hover:text-flame-400"
                >
                  <span className="text-[10px] font-bold tabular-nums text-ink-500 transition-colors group-hover:text-flame-500">
                    {l.num}
                  </span>
                  <span className="hover-underline pb-1">{l.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <span className="text-[10px] uppercase tracking-[0.3em] text-ink-500">By Rayyan</span>
            <span className="h-1.5 w-1.5 rounded-full bg-flame-500 animate-pulse" />
          </div>

          <button
            className="rounded-full border border-ink-700 p-2 text-ink-100 lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
        </nav>
      </header>

      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 z-[120] flex flex-col bg-ink-950 transition-transform duration-500 lg:hidden ${
          open ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 sm:px-8">
          <span className="font-display text-2xl text-ink-50">30</span>
          <button
            className="rounded-full border border-ink-700 p-2 text-ink-100"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>
        <ul className="flex flex-1 flex-col justify-center gap-2 px-5 sm:px-8">
          {links.map((l, i) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="group flex items-baseline gap-4 border-b border-ink-800 py-5"
              >
                <span className="font-display text-sm text-flame-500 tabular-nums">
                  {l.num}
                </span>
                <span className="font-display text-5xl text-ink-100 transition-colors group-hover:text-flame-400 sm:text-6xl">
                  {l.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="px-5 py-8 text-xs uppercase tracking-[0.3em] text-ink-500 sm:px-8">
          A tribute by Rayyan
        </div>
      </div>
    </>
  );
}
