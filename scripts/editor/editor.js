// Editor page logic. Plain JavaScript on purpose: no build step, so `npm run editor` just works.

const ICONS = [
  ['letter', 'الحرف الأول من الاسم'],
  ['bang', 'علامة تعجب'],
  ['beads', 'سبحة'],
  ['bricks', 'لبنتان'],
  ['star', 'نجمة'],
  ['check', 'علامة صح'],
  ['book', 'كتاب'],
];

const TABS = [
  ['identity', 'الهوية'],
  ['projects', 'المشاريع'],
  ['experience', 'المسيرة'],
  ['contacts', 'التواصل'],
  ['files', 'الخلفيات والسيرة'],
];

let site = null;
let tab = 'projects';
let dirty = false;

const form = document.getElementById('form');
const statusEl = document.getElementById('status');
const saveBtn = document.getElementById('save');
const preview = document.getElementById('preview');

// ---------- small DOM helpers ----------

function el(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === 'class') node.className = v;
    else if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
    else if (v === true) node.setAttribute(k, '');
    else if (v !== false && v != null) node.setAttribute(k, v);
  }
  for (const c of [].concat(children)) node.append(c);
  return node;
}

const get = (path) => path.reduce((o, k) => o[k], site);
function set(path, value) {
  const target = path.slice(0, -1).reduce((o, k) => o[k], site);
  target[path[path.length - 1]] = value;
  markDirty();
}

function markDirty() {
  dirty = true;
  saveBtn.disabled = false;
  statusEl.textContent = 'تعديلات غير محفوظة';
  statusEl.className = 'dirty';
}

/** One text box bound to a place in the data. */
function field(label, path, { multiline = false, dir, type = 'text' } = {}) {
  const input = el(multiline ? 'textarea' : 'input', { type: multiline ? null : type, dir });
  input.value = get(path) ?? '';
  input.addEventListener('input', () => set(path, input.value));
  return el('label', {}, [label, input]);
}

/** Arabic and English side by side for the same text. */
function pair(label, path, opts = {}) {
  return el('div', { class: 'pair' }, [
    field(`${label} · عربي`, [...path, 'ar'], { ...opts, dir: 'rtl' }),
    field(`${label} · English`, [...path, 'en'], { ...opts, dir: 'ltr' }),
  ]);
}

function check(label, path, after) {
  const input = el('input', { type: 'checkbox' });
  input.checked = Boolean(get(path));
  input.addEventListener('change', () => { set(path, input.checked); if (after) after(); });
  return el('label', { class: 'check' }, [input, label]);
}

function select(label, path, options) {
  const input = el('select');
  for (const [value, text] of options) input.append(el('option', { value }, text));
  const current = get(path);
  input.value = options.some(([v]) => v === current) ? current : 'letter';
  input.addEventListener('change', () => set(path, input.value));
  return el('label', {}, [label, input]);
}

function move(list, from, to) {
  if (to < 0 || to >= list.length) return;
  list.splice(to, 0, list.splice(from, 1)[0]);
  markDirty();
  render();
}

const text2 = (ar = '', en = '') => ({ ar, en });
const newId = (prefix) => `${prefix}-${Date.now().toString(36)}`;

// ---------- sections ----------

function identitySection() {
  return [
    el('section', { class: 'card' }, [
      el('div', { class: 'card-head' }, el('h2', {}, 'الهوية')),
      pair('الاسم', ['identity', 'name']),
      pair('السطر التعريفي', ['identity', 'line']),
      el('p', { class: 'note' }, 'يظهر الاسم والسطر في شاشة القفل، وفي أعلى الشاشة الرئيسية، وفي العرض البسيط.'),
    ]),
  ];
}

function projectCard(p, i) {
  const list = site.projects;
  const base = ['projects', i];
  return el('section', { class: p.hidden ? 'card hidden-item' : 'card' }, [
    el('div', { class: 'card-head' }, [
      el('h2', {}, p.name.ar || p.name.en || 'مشروع بلا اسم'),
      p.flagship ? el('span', { class: 'tag' }, 'رئيسي') : '',
      p.hidden ? el('span', { class: 'tag off' }, 'مخفي') : '',
      el('button', { class: 'small', 'aria-label': 'تحريك للأعلى', disabled: i === 0, onclick: () => move(list, i, i - 1) }, '↑'),
      el('button', { class: 'small', 'aria-label': 'تحريك للأسفل', disabled: i === list.length - 1, onclick: () => move(list, i, i + 1) }, '↓'),
      el('button', {
        class: 'small danger',
        onclick: () => {
          if (!confirm(`حذف «${p.name.ar || p.name.en}» نهائيًا؟ يمكنك إخفاؤه بدل حذفه.`)) return;
          list.splice(i, 1); markDirty(); render();
        },
      }, 'حذف'),
    ]),
    pair('الاسم', [...base, 'name']),
    pair('سطر واحد: ما هو؟', [...base, 'line']),
    pair('الشرح (يظهر عند فتح المشروع)', [...base, 'about'], { multiline: true }),
    pair('النوع', [...base, 'type']),
    pair('الحالة', [...base, 'state']),
    field('رابط المشروع (اتركه فارغًا إن لم يوجد)', [...base, 'url'], { dir: 'ltr', type: 'url' }),
    el('div', { class: 'row' }, [
      select('الأيقونة', [...base, 'icon'], ICONS),
      field('لون الأيقونة (لأيقونة الحرف)', [...base, 'color'], { type: 'color' }),
      el('div', {}, [
        check('مشروع رئيسي', [...base, 'flagship'], render),
        check('مخفي عن الموقع', [...base, 'hidden'], render),
      ]),
    ]),
  ]);
}

function projectsSection() {
  const add = el('button', {
    class: 'primary',
    onclick: () => {
      site.projects.push({
        id: newId('project'), icon: 'letter', color: '#5b7fb0', flagship: false, hidden: false,
        name: text2('مشروع جديد', 'New project'), line: text2(), about: text2(),
        type: text2(), state: text2(), url: '',
      });
      markDirty(); render();
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    },
  }, '+ مشروع جديد');
  return [
    el('p', { class: 'note' }, 'الترتيب هنا هو ترتيب الأيقونات في الشاشة الرئيسية. أيقونة يوتيوب المحروسة بـ«انتبه» جزء من النظام وليست في هذه القائمة.'),
    ...site.projects.map(projectCard),
    add,
  ];
}

function experienceCard(e, i) {
  const list = site.experience;
  const base = ['experience', i];
  return el('section', { class: 'card' }, [
    el('div', { class: 'card-head' }, [
      el('h2', {}, `${e.role.ar || e.role.en} · ${e.org.ar || e.org.en}`),
      e.current ? el('span', { class: 'tag' }, 'الدور الحالي') : '',
      el('button', { class: 'small', 'aria-label': 'تحريك للأعلى', disabled: i === 0, onclick: () => move(list, i, i - 1) }, '↑'),
      el('button', { class: 'small', 'aria-label': 'تحريك للأسفل', disabled: i === list.length - 1, onclick: () => move(list, i, i + 1) }, '↓'),
      el('button', {
        class: 'small danger',
        onclick: () => { if (confirm('حذف هذه الخبرة نهائيًا؟')) { list.splice(i, 1); markDirty(); render(); } },
      }, 'حذف'),
    ]),
    pair('الدور', [...base, 'role']),
    pair('الجهة', [...base, 'org']),
    pair('سطر توضيحي', [...base, 'note']),
    pair('الفترة', [...base, 'period']),
    el('label', { class: 'check' }, [
      (() => {
        const input = el('input', { type: 'checkbox' });
        input.checked = e.current;
        input.addEventListener('change', () => {
          // Only one role can be the current one: it is what the home screen ticket shows.
          list.forEach((x, k) => { x.current = input.checked && k === i; });
          markDirty(); render();
        });
        return input;
      })(),
      'هذا دوري الحالي (يظهر في الشاشة الرئيسية)',
    ]),
  ]);
}

function experienceSection() {
  const add = el('button', {
    class: 'primary',
    onclick: () => {
      site.experience.push({ id: newId('exp'), current: false, role: text2('دور جديد', 'New role'), org: text2(), note: text2(), period: text2() });
      markDirty(); render();
    },
  }, '+ خبرة جديدة');
  return [
    el('p', { class: 'note' }, 'الترتيب هنا هو ترتيب المسيرة من الأحدث إلى الأقدم.'),
    ...site.experience.map(experienceCard),
    add,
  ];
}

function contactsSection() {
  return [
    el('section', { class: 'card' }, [
      el('div', { class: 'card-head' }, el('h2', {}, 'التواصل')),
      ...site.contacts.map((c, i) => field(c.label, ['contacts', i, 'url'], { dir: 'ltr' })),
      el('p', { class: 'note' }, 'واتساب بصيغة https://wa.me/9665XXXXXXXX والبريد بصيغة mailto:name@example.com. الرابط الفارغ يُظهر رسالة «لم يُضف الرابط بعد».'),
    ]),
  ];
}

function upload(label, kind, path, accept) {
  const current = el('code', {}, get(path) || 'لا يوجد ملف');
  const input = el('input', { type: 'file', accept });
  input.addEventListener('change', async () => {
    const file = input.files[0];
    if (!file) return;
    const ext = file.name.split('.').pop().toLowerCase();
    try {
      const res = await fetch(`/api/upload?kind=${kind}&ext=${encodeURIComponent(ext)}`, { method: 'POST', body: file });
      const out = await res.json();
      if (!res.ok) throw new Error(out.error);
      set(path, out.url);
      current.textContent = out.url;
    } catch (err) {
      showError(`تعذّر رفع الملف: ${err.message}`);
    }
  });
  const clear = el('button', { class: 'small', onclick: () => { set(path, ''); current.textContent = 'لا يوجد ملف'; } }, 'إزالة');
  return el('label', {}, [label, el('div', { class: 'file' }, [input, current, clear])]);
}

function filesSection() {
  return [
    el('section', { class: 'card' }, [
      el('div', { class: 'card-head' }, el('h2', {}, 'الخلفيات')),
      upload('خلفية النهار', 'wallpaper-day', ['wallpapers', 'day'], 'image/jpeg,image/png,image/webp'),
      upload('خلفية الوضع الليلي', 'wallpaper-night', ['wallpapers', 'night'], 'image/jpeg,image/png,image/webp'),
      el('p', { class: 'note' }, 'استخدم صورًا تملك حق استخدامها. الأفضل صورة طولية بعرض 1200 بكسل تقريبًا وحجم أقل من 400 كيلوبايت حتى يبقى الموقع سريعًا.'),
    ]),
    el('section', { class: 'card' }, [
      el('div', { class: 'card-head' }, el('h2', {}, 'السيرة الذاتية')),
      upload('ملف PDF', 'cv', ['identity', 'cvUrl'], 'application/pdf'),
    ]),
  ];
}

const sections = {
  identity: identitySection,
  projects: projectsSection,
  experience: experienceSection,
  contacts: contactsSection,
  files: filesSection,
};

// ---------- page ----------

function render() {
  const tabs = document.getElementById('tabs');
  tabs.replaceChildren(...TABS.map(([id, label]) =>
    el('button', { class: id === tab ? 'on' : '', onclick: () => { tab = id; render(); } }, label)));
  form.replaceChildren(...sections[tab]());
}

function showError(message) {
  statusEl.textContent = message;
  statusEl.className = 'error';
}

async function save() {
  saveBtn.disabled = true;
  try {
    const res = await fetch('/api/site', { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify(site) });
    if (!res.ok) throw new Error((await res.json()).error);
    dirty = false;
    statusEl.textContent = 'حُفظ في content/site.json';
    statusEl.className = '';
  } catch (err) {
    saveBtn.disabled = false;
    showError(`تعذّر الحفظ: ${err.message}`);
  }
}

saveBtn.addEventListener('click', save);
document.getElementById('reload').addEventListener('click', () => { preview.src = preview.src; });
window.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') { e.preventDefault(); if (dirty) save(); }
});
window.addEventListener('beforeunload', (e) => { if (dirty) e.preventDefault(); });

fetch('/api/site')
  .then((r) => r.json())
  .then((data) => { site = data; render(); })
  .catch((err) => showError(`تعذّر تحميل المحتوى: ${err.message}`));
