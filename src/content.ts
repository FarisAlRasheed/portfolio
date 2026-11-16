import raw from '../content/site.json';

export type Lang = 'ar' | 'en';
export type Text = { ar: string; en: string };

export type Project = {
  id: string;
  icon: string;
  color: string;
  flagship: boolean;
  hidden: boolean;
  name: Text;
  line: Text;
  about: Text;
  type: Text;
  state: Text;
  url: string;
};

export type Experience = {
  id: string;
  current: boolean;
  role: Text;
  org: Text;
  note: Text;
  period: Text;
};

export type Contact = { id: string; label: string; url: string };

export type Site = {
  identity: { name: Text; line: Text; cvUrl: string };
  experience: Experience[];
  contacts: Contact[];
  projects: Project[];
  wallpapers: { day: string; night: string };
};

export const site = raw as Site;

/** Pick the text for a language, falling back to Arabic when a translation is empty. */
export const pick = (t: Text, lang: Lang) => t[lang] || t.ar;

const ui = {
  viewCv: { ar: 'عرض السيرة', en: 'View CV' },
  downloadCv: { ar: 'تنزيل PDF', en: 'Download PDF' },
  cvSoon: { ar: 'السيرة الذاتية قيد الإعداد.', en: 'The CV is being prepared.' },
  night: { ar: 'الوضع الليلي', en: 'Night mode' },
  language: { ar: 'English', en: 'العربية' },
  plain: { ar: 'عرض بسيط', en: 'Plain view' },
  currentRole: { ar: 'الدور الحالي', en: 'Current role' },
  journey: { ar: 'المسيرة', en: 'Journey' },
  next: { ar: 'القادم', en: 'Next' },
  youtube: { ar: 'يوتيوب', en: 'YouTube' },
  slideToOpen: { ar: 'اسحب للفتح', en: 'Slide to open' },
  close: { ar: 'إغلاق', en: 'Close' },
  openProject: { ar: 'افتح المشروع', en: 'Open the project' },
  noLink: { ar: 'لم يُضف الرابط بعد.', en: 'This link has not been added yet.' },
  ok: { ar: 'حسنًا', en: 'OK' },
  whyYoutube: { ar: 'لماذا فتحت يوتيوب؟', en: 'Why did you open YouTube?' },
  beHonest: { ar: 'كن صادقًا مع نفسك قبل أن تضيع ساعة.', en: 'Be honest with yourself before an hour disappears.' },
  forStudy: { ar: 'أحتاجه للدراسة · 5 دقائق', en: 'I need it for study · 5 minutes' },
  byAccident: { ar: 'فتحته بدون قصد · أغلقه', en: 'Opened it by accident · close it' },
  fiveMinutes: { ar: 'لك 5 دقائق، وبعدها أسألك مرة أخرى.', en: 'You have 5 minutes, then I ask again.' },
  tabClosed: { ar: 'أُغلق التبويب. عُد إلى ما كنت تفعله.', en: 'Tab closed. Back to what you were doing.' },
  whatHappened: { ar: 'ما الذي حدث للتو؟', en: 'What just happened?' },
  backToSystem: { ar: 'العودة إلى النظام', en: 'Back to the system' },
  projects: { ar: 'المشاريع', en: 'Projects' },
  experience: { ar: 'المسيرة', en: 'Experience' },
  contact: { ar: 'تواصل', en: 'Contact' },
  now: { ar: 'الآن', en: 'Now' },
  aboutMe: { ar: 'من أنا', en: 'About me' },
  colName: { ar: 'الاسم', en: 'Name' },
  colWhat: { ar: 'ما هو', en: 'What it is' },
  colType: { ar: 'النوع', en: 'Type' },
  colState: { ar: 'الحالة', en: 'State' },
  clickToOpen: { ar: 'اضغط أي مشروع لفتحه في نافذته', en: 'click a project to open it in its own window' },
} satisfies Record<string, Text>;

export type UiKey = keyof typeof ui;
export const tr = (key: UiKey, lang: Lang) => ui[key][lang];
