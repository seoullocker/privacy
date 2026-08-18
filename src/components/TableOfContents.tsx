import { useEffect, useState } from 'react'
import type { Article } from '../data/types'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { ChevronDown } from './Icons'

interface Props {
  articles: Article[]
  activeId: string | null
}

/**
 * 왼쪽 목차. 지금 읽고 있는 조문을 표시해 준다.
 * 좁은 화면에서는 자리를 많이 차지하므로 접어 두고, 눌러서 펼치게 한다.
 */
export function TableOfContents({ articles, activeId }: Props) {
  const isNarrow = useMediaQuery('(max-width: 60rem)')
  const [open, setOpen] = useState(false)

  // 넓은 화면으로 돌아오면 접힘 상태를 초기화한다
  useEffect(() => {
    if (!isNarrow) setOpen(false)
  }, [isNarrow])

  const visible = !isNarrow || open

  return (
    <nav className="toc" aria-label="조문 목차">
      {isNarrow ? (
        <button
          type="button"
          className="toc__heading"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span>목차 · 전체 {articles.length}개 조문</span>
          <span className="toc__toggleIcon">
            <ChevronDown />
          </span>
        </button>
      ) : (
        <h2 className="toc__heading">목차</h2>
      )}

      {visible && (
        <ul className="toc__list">
          {articles.map((article) => (
            <li key={article.id}>
              <a
                href={`#${article.id}`}
                className={`toc__link${article.id === activeId ? ' is-active' : ''}`}
                aria-current={article.id === activeId ? 'true' : undefined}
                onClick={() => isNarrow && setOpen(false)}
              >
                <span className="toc__num">{article.label}</span>
                <span>{article.shortTitle ?? article.title}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}
