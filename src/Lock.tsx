import { useEffect, useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import { pick, site, tr } from './content';
import type { Lang } from './content';

const KNOB = 72;
const WAIT_MS = 450;
const SWIPE_MS = 520;

export function useClock(lang: Lang) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 20_000);
    return () => clearInterval(id);
  }, []);
  const locale = lang === 'ar' ? 'ar-SA-u-ca-gregory-nu-latn' : 'en-GB';
  return {
    time: new Intl.DateTimeFormat('en-GB', { hour: 'numeric', minute: '2-digit', hour12: false }).format(now),
    date: new Intl.DateTimeFormat(locale, { weekday: 'long', day: 'numeric', month: 'long' }).format(now),
  };
}

const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

/** The first screen. After a short pause the slider swipes across by itself, the way a person would, and unlocks. */
export function Lock({ lang, onUnlock }: { lang: Lang; onUnlock: () => void }) {
  const [progress, setProgress] = useState(0);
  const dragging = useRef(false);
  const touched = useRef(false);
  const track = useRef<HTMLDivElement>(null);
  const { time, date } = useClock(lang);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const id = setTimeout(() => setProgress(1), WAIT_MS);
      return () => clearTimeout(id);
    }
    let frame = 0;
    const start = performance.now() + WAIT_MS;
    const tick = (now: number) => {
      if (touched.current) return;
      const t = Math.max(0, Math.min(1, (now - start) / SWIPE_MS));
      setProgress(ease(t));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (progress < 1) return;
    const id = setTimeout(onUnlock, 120);
    return () => clearTimeout(id);
  }, [progress, onUnlock]);

  const fromPointer = (e: PointerEvent) => {
    const box = track.current!.getBoundingClientRect();
    const rtl = getComputedStyle(track.current!).direction === 'rtl';
    const offset = rtl ? box.right - e.clientX - KNOB / 2 : e.clientX - box.left - KNOB / 2;
    return Math.max(0, Math.min(1, offset / (box.width - KNOB)));
  };

  return (
    <div className="lock">
      <header className="lock-bar lock-top">
        <p className="lock-time" dir="ltr">{time}</p>
        <p className="lock-date">{date}</p>
      </header>

      <section className="lock-middle">
        <h1>{pick(site.identity.name, lang)}</h1>
        <p>{pick(site.identity.line, lang)}</p>
      </section>

      <footer className="lock-bar lock-bottom">
        <div className="slider" ref={track}>
          <p style={{ opacity: 1 - progress * 1.6 }}>{tr('slideToOpen', lang)}</p>
          <button
            className="knob"
            aria-label={tr('slideToOpen', lang)}
            style={{ insetInlineStart: `calc(4px + ${progress} * (100% - ${KNOB + 8}px))` }}
            onClick={() => setProgress(1)}
            onPointerDown={(e) => { touched.current = true; dragging.current = true; e.currentTarget.setPointerCapture(e.pointerId); }}
            onPointerMove={(e) => { if (dragging.current) setProgress(fromPointer(e)); }}
            onPointerUp={(e) => { dragging.current = false; setProgress(fromPointer(e) > 0.6 ? 1 : 0); }}
            onPointerCancel={() => { dragging.current = false; }}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="#6a6a6a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 12 H5 M11 5 L4 12 L11 19" />
            </svg>
          </button>
        </div>
      </footer>
    </div>
  );
}
