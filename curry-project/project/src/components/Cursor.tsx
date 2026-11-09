import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      setVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px)`;
      }
      const target = e.target as HTMLElement;
      setHovering(
        !!target.closest('a, button, [data-cursor="hover"], .cursor-hover')
      );
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    const onLeave = () => setVisible(false);

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null;
  }

  return (
    <>
      <div
        ref={dotRef}
        className={`pointer-events-none fixed left-0 top-0 z-[200] -ml-1 -mt-1 h-2 w-2 rounded-full bg-flame-500 transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transition: 'opacity 0.3s' }}
      />
      <div
        ref={ringRef}
        className={`pointer-events-none fixed left-0 top-0 z-[200] rounded-full border border-flame-500/60 transition-[width,height,margin,opacity] duration-200 ease-out ${
          hovering ? '-ml-5 -mt-5 h-10 w-10 bg-flame-500/10' : '-ml-3.5 -mt-3.5 h-7 w-7'
        } ${down ? 'scale-75' : 'scale-100'} ${visible ? 'opacity-100' : 'opacity-0'}`}
      />
    </>
  );
}

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const top = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? top / height : 0);
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[150] h-[3px] bg-transparent">
      <div
        className="h-full origin-left bg-gradient-to-r from-flame-500 to-gold-400"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
