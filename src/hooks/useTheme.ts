import { useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'supply-seoul-theme'

/** 처음 열었을 때 어떤 테마로 시작할지 정한다. 저장된 선택 > 시스템 설정 > 다크 순 */
function initialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'

  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved === 'dark' || saved === 'light') return saved

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

/**
 * 다크/라이트 전환.
 * 색상은 CSS 의 `:root[data-theme='light']` 가 전부 처리하므로
 * 여기서는 `<html>` 의 속성 하나만 바꾸면 된다.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(initialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const toggle = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

  return { theme, toggle }
}
