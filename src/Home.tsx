import { AppIcon } from './AppIcon';
import { pick, site, tr } from './content';
import type { Lang, UiKey } from './content';

type Props = {
  lang: Lang;
  night: boolean;
  onToggleNight: () => void;
  onToggleLang: () => void;
  onPlain: () => void;
  onOpenProject: (id: string) => void;
  onOpenExperience: () => void;
  onYoutube: () => void;
  onNotice: (key: UiKey) => void;
};

function Switch({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) {
  return (
    <button className="toggle" role="switch" aria-checked={on} onClick={onClick}>
      {label}
      <span className={on ? 'switch on' : 'switch'} aria-hidden="true"><span /></span>
    </button>
  );
}

export function Home(p: Props) {
  const { lang } = p;
  const apps = site.projects.filter((x) => !x.hidden);
  const current = site.experience.find((e) => e.current) ?? site.experience[0];
  const cv = site.identity.cvUrl;

  return (
    <div className="home">
      <section className="pad">
        <div className="pad-binding" />
        <div className="pad-paper">
          <h1>{pick(site.identity.name, lang)}</h1>
          <p>{pick(site.identity.line, lang)}</p>
          <div className="pad-actions">
            {cv
              ? <a className="gel gel-blue" href={cv} target="_blank" rel="noreferrer">{tr('viewCv', lang)}</a>
              : <button className="gel gel-blue" onClick={() => p.onNotice('cvSoon')}>{tr('viewCv', lang)}</button>}
            {cv
              ? <a className="gel gel-grey" href={cv} download>{tr('downloadCv', lang)}</a>
              : <button className="gel gel-grey" onClick={() => p.onNotice('cvSoon')}>{tr('downloadCv', lang)}</button>}
          </div>
        </div>
      </section>

      <section className="toggles">
        <Switch label={tr('night', lang)} on={p.night} onClick={p.onToggleNight} />
        <Switch label={tr('language', lang)} on={false} onClick={p.onToggleLang} />
        <Switch label={tr('plain', lang)} on={false} onClick={p.onPlain} />
      </section>

      {current && (
        <button className="ticket" onClick={p.onOpenExperience}>
          <span className="ticket-main">
            <small>{tr('currentRole', lang)}</small>
            <strong>{pick(current.role, lang)} · {pick(current.org, lang)}</strong>
          </span>
          <span className="ticket-stub">{tr('journey', lang)} {lang === 'ar' ? '←' : '→'}</span>
        </button>
      )}

      <section className="grid">
        {apps.map((x) => (
          <button key={x.id} className="app" onClick={() => p.onOpenProject(x.id)}>
            <AppIcon icon={x.icon} color={x.color} letter={pick(x.name, lang)} />
            <span>{pick(x.name, lang)}</span>
          </button>
        ))}
        <button className="app" onClick={p.onYoutube}>
          <AppIcon icon="play" />
          <span>{tr('youtube', lang)}</span>
        </button>
        <span className="app app-empty">
          <span className="empty-slot" />
          <span>{tr('next', lang)}</span>
        </span>
      </section>

      <nav className="dock">
        {site.contacts.map((c) => {
          const icon = <AppIcon icon={c.id} size={56} letter={c.label} />;
          return c.url
            ? <a key={c.id} className="app" href={c.url} target="_blank" rel="noreferrer">{icon}<span>{c.label}</span></a>
            : <button key={c.id} className="app" onClick={() => p.onNotice('noLink')}>{icon}<span>{c.label}</span></button>;
        })}
      </nav>
    </div>
  );
}
