import { useRef, useState } from 'react';
import type { PointerEvent, ReactNode } from 'react';
import { AppIcon } from './AppIcon';
import { useClock } from './Lock';
import { pick, site, tr } from './content';
import type { Lang, UiKey } from './content';

type Kind = 'about' | 'projects' | 'experience' | 'project';
type Win = { key: string; kind: Kind; id?: string; x: number; y: number };

type Props = {
  lang: Lang;
  night: boolean;
  onToggleNight: () => void;
  onToggleLang: () => void;
  onPlain: () => void;
  onYoutube: () => void;
  onNotice: (key: UiKey) => void;
};

const MENU_HEIGHT = 34;
const WIDTHS: Record<Kind, number> = { about: 400, projects: 680, experience: 420, project: 440 };

function Window({ win, title, z, onFocus, onClose, onMove, closeLabel, children }: {
  win: Win; title: string; z: number; closeLabel: string;
  onFocus: () => void; onClose: () => void; onMove: (x: number, y: number) => void; children: ReactNode;
}) {
  const grab = useRef<{ dx: number; dy: number } | null>(null);
  const down = (e: PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) return;
    grab.current = { dx: e.clientX - win.x, dy: e.clientY - win.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const move = (e: PointerEvent) => {
    if (!grab.current) return;
    const x = Math.max(-WIDTHS[win.kind] + 120, Math.min(window.innerWidth - 120, e.clientX - grab.current.dx));
    const y = Math.max(MENU_HEIGHT, Math.min(window.innerHeight - 60, e.clientY - grab.current.dy));
    onMove(x, y);
  };
  return (
    <section
      className={`win win-${win.kind}`}
      style={{ left: win.x, top: win.y, zIndex: z, width: WIDTHS[win.kind] }}
      onPointerDown={onFocus}
      aria-label={title}
    >
      <div className="win-bar" onPointerDown={down} onPointerMove={move} onPointerUp={() => { grab.current = null; }}>
        <button className="win-close" aria-label={closeLabel} onClick={onClose} />
        <span>{title}</span>
      </div>
      <div className="win-body">{children}</div>
    </section>
  );
}

/** The computer version: a glossy desktop with a menu bar, movable windows and a dock. */
export function Desktop(p: Props) {
  const { lang } = p;
  const { time } = useClock(lang);
  const apps = site.projects.filter((x) => !x.hidden);
  const cv = site.identity.cvUrl;

  const [wins, setWins] = useState<Win[]>(() => [
    { key: 'projects', kind: 'projects', x: 70, y: 96 },
    { key: 'about', kind: 'about', x: Math.max(480, window.innerWidth - 470), y: 70 },
  ]);

  const focus = (key: string) => setWins((ws) => {
    const w = ws.find((x) => x.key === key);
    return w && ws[ws.length - 1] !== w ? [...ws.filter((x) => x !== w), w] : ws;
  });
  const closeWin = (key: string) => setWins((ws) => ws.filter((x) => x.key !== key));
  const moveWin = (key: string, x: number, y: number) =>
    setWins((ws) => ws.map((w) => (w.key === key ? { ...w, x, y } : w)));
  const open = (kind: Kind, id?: string) => setWins((ws) => {
    const key = id ? `${kind}:${id}` : kind;
    const existing = ws.find((x) => x.key === key);
    if (existing) return [...ws.filter((x) => x !== existing), existing];
    const step = (ws.length % 6) * 28;
    return [...ws, { key, kind, id, x: 180 + step, y: 120 + step }];
  });

  const title = (w: Win) => {
    if (w.kind === 'about') return pick(site.identity.name, lang);
    if (w.kind === 'projects') return tr('projects', lang);
    if (w.kind === 'experience') return tr('experience', lang);
    const project = site.projects.find((x) => x.id === w.id);
    return project ? pick(project.name, lang) : '';
  };

  const body = (w: Win) => {
    if (w.kind === 'about') {
      const current = site.experience.find((e) => e.current);
      return (
        <div className="pad-paper">
          <h1>{pick(site.identity.name, lang)}</h1>
          <p>{pick(site.identity.line, lang)}</p>
          {current && <p className="sheet-meta">{tr('now', lang)}: {pick(current.role, lang)} · {pick(current.org, lang)}</p>}
          <div className="pad-actions">
            {cv
              ? <a className="gel gel-blue" href={cv} target="_blank" rel="noreferrer">{tr('viewCv', lang)}</a>
              : <button className="gel gel-blue" onClick={() => p.onNotice('cvSoon')}>{tr('viewCv', lang)}</button>}
            {cv
              ? <a className="gel gel-grey" href={cv} download>{tr('downloadCv', lang)}</a>
              : <button className="gel gel-grey" onClick={() => p.onNotice('cvSoon')}>{tr('downloadCv', lang)}</button>}
          </div>
        </div>
      );
    }
    if (w.kind === 'projects') {
      return (
        <>
          <table className="finder">
            <thead>
              <tr><th>{tr('colName', lang)}</th><th>{tr('colWhat', lang)}</th><th>{tr('colType', lang)}</th><th>{tr('colState', lang)}</th></tr>
            </thead>
            <tbody>
              {apps.map((x) => (
                <tr key={x.id} tabIndex={0} onClick={() => open('project', x.id)} onKeyDown={(e) => { if (e.key === 'Enter') open('project', x.id); }}>
                  <td><strong>{pick(x.name, lang)}</strong></td>
                  <td>{pick(x.line, lang)}</td>
                  <td>{pick(x.type, lang)}</td>
                  <td>{pick(x.state, lang)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="finder-foot">{apps.length} · {tr('clickToOpen', lang)}</p>
        </>
      );
    }
    if (w.kind === 'experience') {
      return (
        <div className="win-text">
          <ol className="timeline">
            {site.experience.map((e) => (
              <li key={e.id} className={e.current ? 'current' : undefined}>
                <small>{pick(e.period, lang)}</small>
                <strong>{pick(e.role, lang)} · {pick(e.org, lang)}</strong>
                <span>{pick(e.note, lang)}</span>
              </li>
            ))}
          </ol>
        </div>
      );
    }
    const project = site.projects.find((x) => x.id === w.id);
    if (!project) return null;
    const about = pick(project.about, lang);
    return (
      <div className="win-text">
        <div className="sheet-head">
          <AppIcon icon={project.icon} color={project.color} letter={pick(project.name, lang)} size={56} />
          <div>
            <h2>{pick(project.name, lang)}</h2>
            <p className="sheet-meta">{pick(project.type, lang)} · {pick(project.state, lang)}</p>
          </div>
        </div>
        <p><strong>{pick(project.line, lang)}</strong></p>
        {about && <p>{about}</p>}
        {project.url && (
          <div className="pad-actions">
            <a className="gel gel-blue" href={project.url} target="_blank" rel="noreferrer">{tr('openProject', lang)}</a>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="desk">
      <nav className="menu">
        <div>
          <strong>{pick(site.identity.name, lang)}</strong>
          <button onClick={() => open('about')}>{tr('aboutMe', lang)}</button>
          <button onClick={() => open('projects')}>{tr('projects', lang)}</button>
          <button onClick={() => open('experience')}>{tr('experience', lang)}</button>
        </div>
        <div>
          <button onClick={p.onPlain}>{tr('plain', lang)}</button>
          <button onClick={p.onToggleNight} aria-pressed={p.night}>{tr('night', lang)}</button>
          <button onClick={p.onToggleLang}>{tr('language', lang)}</button>
          <span dir="ltr">{time}</span>
        </div>
      </nav>

      {wins.map((w, i) => (
        <Window
          key={w.key}
          win={w}
          z={i + 1}
          title={title(w)}
          closeLabel={tr('close', lang)}
          onFocus={() => focus(w.key)}
          onClose={() => closeWin(w.key)}
          onMove={(x, y) => moveWin(w.key, x, y)}
        >
          {body(w)}
        </Window>
      ))}

      <nav className="shelf" aria-label={tr('projects', lang)}>
        {apps.map((x) => (
          <button key={x.id} title={pick(x.name, lang)} aria-label={pick(x.name, lang)} onClick={() => open('project', x.id)}>
            <AppIcon icon={x.icon} color={x.color} letter={pick(x.name, lang)} size={56} />
          </button>
        ))}
        <button title={tr('youtube', lang)} aria-label={tr('youtube', lang)} onClick={p.onYoutube}>
          <AppIcon icon="play" size={56} />
        </button>
        <span className="shelf-gap" aria-hidden="true" />
        {site.contacts.map((c) => {
          const icon = <AppIcon icon={c.id} size={56} letter={c.label} />;
          return c.url
            ? <a key={c.id} title={c.label} aria-label={c.label} href={c.url} target="_blank" rel="noreferrer">{icon}</a>
            : <button key={c.id} title={c.label} aria-label={c.label} onClick={() => p.onNotice('noLink')}>{icon}</button>;
        })}
      </nav>
    </div>
  );
}
