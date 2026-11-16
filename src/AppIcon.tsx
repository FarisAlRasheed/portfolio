import type { ReactNode } from 'react';
import { FaEnvelope, FaGithub, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa6';

const beads = [
  [43, 24], [40.1, 32.8], [32.6, 38.3], [23.4, 38.3], [15.9, 32.8],
  [13, 24], [15.9, 15.2], [23.4, 9.7], [32.6, 9.7], [40.1, 15.2],
];

/** Built-in drawings. A project whose icon is not listed here gets its first letter. */
const drawings: Record<string, { bg: string; art: ReactNode }> = {
  bang: {
    bg: 'linear-gradient(#cdefd6, #8fd3a4)',
    art: <span className="icon-bang">!</span>,
  },
  beads: {
    bg: 'linear-gradient(#8a5a32, #4e2f15)',
    art: (
      <svg viewBox="0 0 56 56" aria-hidden="true" fill="#f4e3b8" stroke="#3b2410" strokeWidth="0.8">
        {beads.map(([cx, cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.8" />)}
        <rect x="26.4" y="41" width="3.2" height="10" rx="1.6" />
      </svg>
    ),
  },
  bricks: {
    bg: 'linear-gradient(#9ad0f5, #4c96d0)',
    art: (
      <svg viewBox="0 0 56 56" aria-hidden="true" stroke="#5e3a1c" strokeWidth="1.5">
        <rect x="7" y="15" width="30" height="13" rx="2" fill="#c99b6d" />
        <rect x="19" y="30" width="30" height="13" rx="2" fill="#b5875a" />
      </svg>
    ),
  },
  star: {
    bg: 'linear-gradient(#3fa36a, #1c6b3f)',
    art: (
      <svg viewBox="0 0 56 56" aria-hidden="true" fill="#ffd84d" stroke="#8a6a08" strokeWidth="1.5" strokeLinejoin="round">
        <polygon points="28,8 33.6,21 47.5,22.2 37,31.4 40.2,45 28,37.8 15.8,45 19,31.4 8.5,22.2 22.4,21" />
      </svg>
    ),
  },
  check: {
    bg: 'repeating-linear-gradient(#fdfbf2 0 11px, #b9cde8 11px 12px)',
    art: (
      <svg viewBox="0 0 56 56" aria-hidden="true" fill="none" stroke="#1f7a3f" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 29 L24 40 L44 16" />
      </svg>
    ),
  },
  book: {
    bg: 'linear-gradient(#e0644a, #a62e1a)',
    art: (
      <svg viewBox="0 0 56 56" aria-hidden="true" fill="#fff" stroke="#5e1a0e" strokeWidth="2" strokeLinejoin="round">
        <path d="M28 16 C22 11 13 11 8 14 V42 C13 39 22 39 28 44 C34 39 43 39 48 42 V14 C43 11 34 11 28 16 Z M28 16 V44" />
      </svg>
    ),
  },
  play: {
    bg: 'linear-gradient(#fff, #d6d6d6)',
    art: (
      <svg viewBox="0 0 56 56" aria-hidden="true">
        <circle cx="28" cy="28" r="18" fill="#c92a1e" />
        <polygon points="23,18 40,28 23,38" fill="#fff" />
      </svg>
    ),
  },
  linkedin: { bg: 'linear-gradient(#3f8bd8, #0a66c2)', art: <FaLinkedinIn className="icon-brand" aria-hidden="true" /> },
  github: { bg: 'linear-gradient(#5a5a5a, #1a1a1a)', art: <FaGithub className="icon-brand" aria-hidden="true" /> },
  whatsapp: { bg: 'linear-gradient(#5fd07a, #1c8a3c)', art: <FaWhatsapp className="icon-brand" aria-hidden="true" /> },
  email: { bg: 'linear-gradient(#7dc3f7, #2b79c9)', art: <FaEnvelope className="icon-brand" aria-hidden="true" /> },
};

export const iconNames = Object.keys(drawings);

type Props = { icon: string; color?: string; letter?: string; size?: number };

export function AppIcon({ icon, color = '#5b7fb0', letter = '', size = 60 }: Props) {
  const d = drawings[icon];
  const bg = d ? d.bg : `linear-gradient(${color}, ${color})`;
  return (
    <span className="icon" style={{ width: size, height: size, borderRadius: size * 0.235, background: bg }}>
      {d ? d.art : <span className="icon-letter">{letter.slice(0, 1)}</span>}
      <span className="shine" aria-hidden="true" />
    </span>
  );
}
