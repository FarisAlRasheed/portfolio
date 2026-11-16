import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { AppIcon } from './AppIcon';
import { pick, site, tr } from './content';
import type { Lang, Project, UiKey } from './content';

function Overlay({ label, onClose, children }: { label: string; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className="overlay" onClick={onClose}>
      <div className="overlay-body" role="dialog" aria-modal="true" aria-label={label} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

function ProjectCard({ project, lang }: { project: Project; lang: Lang }) {
  const about = pick(project.about, lang);
  return (
    <div className="pad">
      <div className="pad-binding" />
      <div className="pad-paper">
        <div className="sheet-head">
          <AppIcon icon={project.icon} color={project.color} letter={pick(project.name, lang)} size={48} />
          <h2>{pick(project.name, lang)}</h2>
        </div>
        <p className="sheet-line">{pick(project.line, lang)}</p>
        {about && <p>{about}</p>}
        <p className="sheet-meta">{pick(project.type, lang)} · {pick(project.state, lang)}</p>
        {project.url && (
          <div className="pad-actions">
            <a className="gel gel-blue" href={project.url} target="_blank" rel="noreferrer">{tr('openProject', lang)}</a>
          </div>
        )}
      </div>
    </div>
  );
}

function CloseButton({ lang, onClose }: { lang: Lang; onClose: () => void }) {
  return <button className="gel gel-grey sheet-close" onClick={onClose}>{tr('close', lang)}</button>;
}

export function ProjectSheet({ id, lang, onClose }: { id: string; lang: Lang; onClose: () => void }) {
  const project = site.projects.find((p) => p.id === id);
  if (!project) return null;
  return (
    <Overlay label={pick(project.name, lang)} onClose={onClose}>
      <ProjectCard project={project} lang={lang} />
      <CloseButton lang={lang} onClose={onClose} />
    </Overlay>
  );
}

export function ExperienceSheet({ lang, onClose }: { lang: Lang; onClose: () => void }) {
  return (
    <Overlay label={tr('experience', lang)} onClose={onClose}>
      <div className="pad">
        <div className="pad-binding" />
        <div className="pad-paper">
          <h2>{tr('experience', lang)}</h2>
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
      </div>
      <CloseButton lang={lang} onClose={onClose} />
    </Overlay>
  );
}

/** The YouTube icon is guarded by Antabih: the visitor meets the product instead of reading about it. */
export function YoutubeAlert({ lang, onClose }: { lang: Lang; onClose: () => void }) {
  const [answer, setAnswer] = useState<'study' | 'accident' | null>(null);
  const antabih = site.projects.find((p) => p.id === 'antabih');
  return (
    <Overlay label={tr('whyYoutube', lang)} onClose={onClose}>
      <section className="alert">
        <div className="alert-title">
          <AppIcon icon="bang" size={30} />
          <h2>{antabih ? pick(antabih.name, lang) : '!'}</h2>
        </div>
        {answer === null ? (
          <>
            <p className="alert-question">{tr('whyYoutube', lang)}</p>
            <p>{tr('beHonest', lang)}</p>
            <button className="alert-button primary" onClick={() => setAnswer('study')}>{tr('forStudy', lang)}</button>
            <button className="alert-button" onClick={() => setAnswer('accident')}>{tr('byAccident', lang)}</button>
          </>
        ) : (
          <>
            <p className="alert-question">{tr(answer === 'study' ? 'fiveMinutes' : 'tabClosed', lang)}</p>
            <button className="alert-button primary" onClick={onClose}>{tr('ok', lang)}</button>
          </>
        )}
      </section>
      {answer !== null && antabih && (
        <div className="rise">
          <p className="what-happened">{tr('whatHappened', lang)}</p>
          <ProjectCard project={antabih} lang={lang} />
        </div>
      )}
    </Overlay>
  );
}

export function Notice({ text, lang, onClose }: { text: UiKey; lang: Lang; onClose: () => void }) {
  return (
    <Overlay label={tr(text, lang)} onClose={onClose}>
      <section className="alert">
        <p className="alert-question">{tr(text, lang)}</p>
        <button className="alert-button primary" onClick={onClose}>{tr('ok', lang)}</button>
      </section>
    </Overlay>
  );
}
