import { pick, site, tr } from './content';
import type { Lang } from './content';

/** The same content as an ordinary page, for visitors in a hurry, screen readers and search engines. */
export function Plain({ lang, onBack, onToggleLang }: { lang: Lang; onBack: () => void; onToggleLang: () => void }) {
  const projects = site.projects.filter((p) => !p.hidden);
  const contacts = site.contacts.filter((c) => c.url);
  return (
    <main className="plain">
      <nav>
        <button onClick={onBack}>{tr('backToSystem', lang)}</button>
        <button onClick={onToggleLang}>{tr('language', lang)}</button>
      </nav>
      <h1>{pick(site.identity.name, lang)}</h1>
      <p className="plain-line">{pick(site.identity.line, lang)}</p>
      {site.identity.cvUrl && <p><a href={site.identity.cvUrl}>{tr('viewCv', lang)}</a></p>}

      <h2>{tr('projects', lang)}</h2>
      <ul>
        {projects.map((p) => (
          <li key={p.id}>
            <strong>{pick(p.name, lang)}</strong>
            <span>{pick(p.line, lang)}</span>
            <small>
              {pick(p.type, lang)} · {pick(p.state, lang)}
              {p.url && <> · <a href={p.url} target="_blank" rel="noreferrer">{tr('openProject', lang)}</a></>}
            </small>
          </li>
        ))}
      </ul>

      <h2>{tr('experience', lang)}</h2>
      <ul>
        {site.experience.map((e) => (
          <li key={e.id}>
            <strong>{pick(e.role, lang)} · {pick(e.org, lang)}</strong>
            <span>{pick(e.note, lang)}</span>
            <small>{pick(e.period, lang)}</small>
          </li>
        ))}
      </ul>

      {contacts.length > 0 && (
        <>
          <h2>{tr('contact', lang)}</h2>
          <p className="plain-contacts">
            {contacts.map((c) => <a key={c.id} href={c.url} target="_blank" rel="noreferrer">{c.label}</a>)}
          </p>
        </>
      )}
    </main>
  );
}
