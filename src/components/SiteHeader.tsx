import { Link } from 'react-router-dom'
import type { Policy } from '../data/types'
import { COMPANY } from '../data/company'
import type { Theme } from '../hooks/useTheme'
import { LogoMark, Moon, Printer, Sun } from './Icons'
import { VersionSelect } from './VersionSelect'

interface Props {
  policies: Policy[]
  selectedId: string
  onSelect: (id: string) => void
  theme: Theme
  onToggleTheme: () => void
}

/** 화면 맨 위에 계속 붙어 있는 막대. 버전 선택이 여기에 있다 */
export function SiteHeader({ policies, selectedId, onSelect, theme, onToggleTheme }: Props) {
  return (
    <header className="topbar">
      <div className="topbar__inner">
        <Link className="brand" to="/">
          <span className="brand__mark">
            <LogoMark />
          </span>
          <span className="brand__text">
            <span className="brand__name">{COMPANY.name}</span>
            <span className="brand__sub">Supply Seoul</span>
          </span>
        </Link>

        <VersionSelect policies={policies} selectedId={selectedId} onSelect={onSelect} />

        <button
          type="button"
          className="icon-btn"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? '밝은 화면으로 전환' : '어두운 화면으로 전환'}
          title={theme === 'dark' ? '밝은 화면으로 전환' : '어두운 화면으로 전환'}
        >
          {theme === 'dark' ? <Sun /> : <Moon />}
        </button>

        <button
          type="button"
          className="icon-btn"
          onClick={() => window.print()}
          aria-label="이 방침 인쇄하기"
          title="인쇄 / PDF 로 저장"
        >
          <Printer />
        </button>
      </div>
    </header>
  )
}
