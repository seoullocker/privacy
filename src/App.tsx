import { useCallback, useEffect, useMemo, useState } from 'react'
import { POLICIES, CURRENT_POLICY } from './data/policies'
import { ArticleSection } from './components/ArticleSection'
import { BlockRenderer } from './components/BlockRenderer'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'
import { TableOfContents } from './components/TableOfContents'
import { Archive } from './components/Icons'
import { useReadingProgress } from './hooks/useReadingProgress'
import { useScrollSpy } from './hooks/useScrollSpy'
import { useTheme } from './hooks/useTheme'

/** 주소창의 `?v=2023-09-21` 을 읽는다. 특정 버전을 링크로 공유할 수 있게 하기 위함 */
function versionFromUrl(): string {
  if (typeof window === 'undefined') return CURRENT_POLICY.id

  const requested = new URLSearchParams(window.location.search).get('v')
  const found = POLICIES.find((policy) => policy.id === requested)

  // 없는 버전을 가리키는 링크로 들어와도 현행 방침을 보여준다
  return found?.id ?? CURRENT_POLICY.id
}

export default function App() {
  const { theme, toggle } = useTheme()
  const [selectedId, setSelectedId] = useState(versionFromUrl)
  const progress = useReadingProgress()

  const policy = useMemo(
    () => POLICIES.find((item) => item.id === selectedId) ?? CURRENT_POLICY,
    [selectedId],
  )

  // 방침이 바뀌면 감시할 조문 목록도 바뀐다
  const articleIds = useMemo(() => policy.articles.map((article) => article.id), [policy])
  const activeId = useScrollSpy(articleIds)

  // 브라우저 탭 제목도 어느 버전을 보고 있는지 알려준다
  useEffect(() => {
    document.title =
      policy.status === 'current'
        ? `개인정보처리방침 | ${policy.companyName}`
        : `개인정보처리방침 (${policy.effectiveFrom} 시행 · 이전 버전) | ${policy.companyName}`
  }, [policy])

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id)

    // 새로고침해도 같은 버전이 열리도록 주소를 바꿔 둔다.
    // 현행 방침은 기본값이므로 주소를 깨끗하게 유지한다
    const url = new URL(window.location.href)
    if (id === CURRENT_POLICY.id) url.searchParams.delete('v')
    else url.searchParams.set('v', id)
    window.history.replaceState(null, '', url)

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const isPast = policy.status === 'past'

  return (
    <>
      <a className="skip-link" href="#document">
        본문 바로가기
      </a>

      <div className="progress" aria-hidden>
        <div className="progress__bar" style={{ width: `${progress}%` }} />
      </div>

      <SiteHeader
        policies={POLICIES}
        selectedId={policy.id}
        onSelect={handleSelect}
        theme={theme}
        onToggleTheme={toggle}
      />

      <main>
        <div className="hero">
          <div className="hero__inner">
            <span className={`badge${isPast ? ' badge--past' : ''}`}>
              <span className="badge__dot" />
              {isPast ? '이전 버전 · 효력 없음' : '현행 · 시행 중'}
            </span>

            <h1 className="hero__title">
              <span className="hero__company">{policy.companyName}</span>
              개인정보처리방침
            </h1>

            <div className="hero__meta">
              <span className="hero__metaItem">
                <span className="hero__metaLabel">시행일</span>
                <span className="hero__metaValue">{policy.effectiveFrom}</span>
              </span>
              {policy.effectiveTo && (
                <span className="hero__metaItem">
                  <span className="hero__metaLabel">적용 종료</span>
                  <span className="hero__metaValue">{policy.effectiveTo}</span>
                </span>
              )}
              <span className="hero__metaItem">
                <span className="hero__metaLabel">조문</span>
                <span className="hero__metaValue">전체 {policy.articles.length}개</span>
              </span>
            </div>
          </div>
        </div>

        <div className="shell">
          <TableOfContents articles={policy.articles} activeId={activeId} />

          <article className="doc" id="document">
            {policy.notice && (
              <div className="archiveNotice" role="note">
                <span className="archiveNotice__icon">
                  <Archive />
                </span>
                <span>
                  <strong>이전 버전을 보고 있습니다</strong>
                  {policy.notice}
                </span>
              </div>
            )}

            <div className="doc__preamble">
              {policy.preamble.map((block, index) => (
                <BlockRenderer key={index} block={block} />
              ))}
            </div>

            {policy.articles.map((article) => (
              <ArticleSection key={article.id} article={article} />
            ))}
          </article>
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
