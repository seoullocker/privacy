import { useEffect, useRef, useState } from 'react'
import type { Policy } from '../data/types'
import { Check, ChevronDown } from './Icons'

interface Props {
  policies: Policy[]
  selectedId: string
  onSelect: (id: string) => void
}

/**
 * 방침 버전을 고르는 드롭다운.
 *
 * `<select>` 를 쓰지 않고 직접 만든 이유는 각 항목에 적용 기간과 상호를 두 줄로 보여주기
 * 위해서다. 대신 키보드 조작(위/아래/Home/End/Esc)과 aria 속성을 직접 챙긴다.
 */
export function VersionSelect({ policies, selectedId, onSelect }: Props) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [focusIndex, setFocusIndex] = useState(0)

  const selected = policies.find((policy) => policy.id === selectedId) ?? policies[0]

  // 바깥을 누르거나 Esc 를 누르면 닫는다
  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const openMenu = () => {
    setFocusIndex(policies.findIndex((policy) => policy.id === selectedId))
    setOpen(true)
  }

  const choose = (id: string) => {
    onSelect(id)
    setOpen(false)
    buttonRef.current?.focus()
  }

  const onListKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      const delta = event.key === 'ArrowDown' ? 1 : -1
      setFocusIndex((prev) => (prev + delta + policies.length) % policies.length)
    } else if (event.key === 'Home') {
      event.preventDefault()
      setFocusIndex(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      setFocusIndex(policies.length - 1)
    }
  }

  return (
    <div className="version" ref={rootRef}>
      <button
        ref={buttonRef}
        type="button"
        className="version__button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="개인정보처리방침 버전 선택"
        onClick={() => (open ? setOpen(false) : openMenu())}
      >
        <span className="version__label">{selected.label}</span>
        <span className="version__caret">
          <ChevronDown />
        </span>
      </button>

      {open && (
        <ul
          className="version__menu"
          role="listbox"
          aria-label="개인정보처리방침 버전"
          tabIndex={-1}
          onKeyDown={onListKeyDown}
        >
          {policies.map((policy, index) => (
            <li key={policy.id} role="none">
              <button
                type="button"
                role="option"
                aria-selected={policy.id === selectedId}
                className="version__option"
                // 열려 있는 동안 키보드 화살표가 가리키는 항목에 초점을 옮긴다
                ref={(node) => {
                  if (open && index === focusIndex) node?.focus()
                }}
                onClick={() => choose(policy.id)}
              >
                <span className="version__check">
                  <Check />
                </span>
                <span className="version__optionText">
                  <span className="version__optionTitle">{policy.label}</span>
                  <span className="version__optionMeta">
                    {policy.effectiveFrom}
                    {policy.effectiveTo ? ` ~ ${policy.effectiveTo}` : ' ~ 현재'} · 당시 상호{' '}
                    {policy.companyName}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
