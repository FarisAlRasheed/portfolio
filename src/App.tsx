import { useCallback, useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { Desktop } from './Desktop';
import { Home } from './Home';
import { Lock } from './Lock';
import { Plain } from './Plain';
import { ExperienceSheet, Notice, ProjectSheet, YoutubeAlert } from './Sheets';
import { pick, site } from './content';
import type { Lang, UiKey } from './content';

type Sheet =
  | { kind: 'project'; id: string }
  | { kind: 'experience' }
  | { kind: 'youtube' }
  | { kind: 'notice'; text: UiKey }
  | null;

/** Screens at least this wide and tall get the desktop; everything else gets the phone. */
const WIDE = '(min-width: 900px) and (min-height: 560px)';

export function App() {
  const [locked, setLocked] = useState(true);
  const [lang, setLang] = useState<Lang>('ar');
  const [night, setNight] = useState(false);
  const [plain, setPlain] = useState(false);
  const [sheet, setSheet] = useState<Sheet>(null);
  const [wide, setWide] = useState(() => window.matchMedia(WIDE).matches);

  useEffect(() => {
    const query = window.matchMedia(WIDE);
    const update = () => setWide(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = pick(site.identity.name, lang);
  }, [lang]);

  const unlock = useCallback(() => setLocked(false), []);
  const close = useCallback(() => setSheet(null), []);
  const toggleLang = () => setLang((l) => (l === 'ar' ? 'en' : 'ar'));

  if (plain) return <Plain lang={lang} onBack={() => setPlain(false)} onToggleLang={toggleLang} />;

  const photo = night ? site.wallpapers.night || site.wallpapers.day : site.wallpapers.day;
  const wall = photo ? ({ '--wall': `url("${photo}")` } as CSSProperties) : undefined;

  const sheets = (
    <>
      {sheet?.kind === 'project' && <ProjectSheet id={sheet.id} lang={lang} onClose={close} />}
      {sheet?.kind === 'experience' && <ExperienceSheet lang={lang} onClose={close} />}
      {sheet?.kind === 'youtube' && <YoutubeAlert lang={lang} onClose={close} />}
      {sheet?.kind === 'notice' && <Notice text={sheet.text} lang={lang} onClose={close} />}
    </>
  );

  if (wide) {
    return (
      <div className={night ? 'stage wide night' : 'stage wide'} style={wall}>
        {locked ? (
          <div className="desk desk-lock"><Lock lang={lang} onUnlock={unlock} /></div>
        ) : (
          <Desktop
            lang={lang}
            night={night}
            onToggleNight={() => setNight((n) => !n)}
            onToggleLang={toggleLang}
            onPlain={() => setPlain(true)}
            onYoutube={() => setSheet({ kind: 'youtube' })}
            onNotice={(text) => setSheet({ kind: 'notice', text })}
          />
        )}
        {sheets}
      </div>
    );
  }

  return (
    <div className={night ? 'stage night' : 'stage'} style={wall}>
      <div className="phone">
        {locked ? (
          <Lock lang={lang} onUnlock={unlock} />
        ) : (
          <Home
            lang={lang}
            night={night}
            onToggleNight={() => setNight((n) => !n)}
            onToggleLang={toggleLang}
            onPlain={() => setPlain(true)}
            onOpenProject={(id) => setSheet({ kind: 'project', id })}
            onOpenExperience={() => setSheet({ kind: 'experience' })}
            onYoutube={() => setSheet({ kind: 'youtube' })}
            onNotice={(text) => setSheet({ kind: 'notice', text })}
          />
        )}
        {sheets}
      </div>
    </div>
  );
}
