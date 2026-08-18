/**
 * 화면에서 쓰는 아이콘. 외부 아이콘 라이브러리를 넣지 않고 필요한 것만 직접 그린다.
 * (방침 문서 한 장을 띄우자고 수백 KB 를 받게 할 이유가 없다)
 */

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

/** 브랜드 마크 — 짐 보관함을 단순하게 나타낸 도형 */
export function LogoMark() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3.2" y="5" width="17.6" height="14.5" rx="2.6" stroke="#fff" strokeWidth="1.9" />
      <path d="M8.4 5V3.6A1.6 1.6 0 0 1 10 2h4a1.6 1.6 0 0 1 1.6 1.6V5" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M3.2 11.6h17.6" stroke="#fff" strokeWidth="1.6" opacity="0.65" />
      <circle cx="12" cy="15.6" r="1.35" fill="#fff" />
    </svg>
  )
}

export function ChevronDown() {
  return (
    <svg {...base}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export function Check() {
  return (
    <svg {...base}>
      <path d="m20 6-11 11-5-5" />
    </svg>
  )
}

export function Sun() {
  return (
    <svg {...base}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

export function Moon() {
  return (
    <svg {...base}>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  )
}

export function Printer() {
  return (
    <svg {...base}>
      <path d="M6 9V3h12v6" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="7" rx="1" />
    </svg>
  )
}

export function Info() {
  return (
    <svg {...base}>
      <circle cx="12" cy="12" r="9.2" />
      <path d="M12 11v5M12 7.8v.4" />
    </svg>
  )
}

export function Alert() {
  return (
    <svg {...base}>
      <path d="M10.3 3.9 2.4 17.4A2 2 0 0 0 4.1 20.4h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9.5v4M12 16.8v.3" />
    </svg>
  )
}

export function Archive() {
  return (
    <svg {...base}>
      <rect x="2.8" y="3.6" width="18.4" height="4.4" rx="1.4" />
      <path d="M4.6 8v10.6a1.8 1.8 0 0 0 1.8 1.8h11.2a1.8 1.8 0 0 0 1.8-1.8V8" />
      <path d="M9.8 12h4.4" />
    </svg>
  )
}

export function Link() {
  return (
    <svg {...base} strokeWidth={1.6}>
      <path d="M10.4 13.6a3.6 3.6 0 0 0 5.1 0l2.9-2.9a3.6 3.6 0 0 0-5.1-5.1l-1.2 1.2" />
      <path d="M13.6 10.4a3.6 3.6 0 0 0-5.1 0l-2.9 2.9a3.6 3.6 0 0 0 5.1 5.1l1.2-1.2" />
    </svg>
  )
}
