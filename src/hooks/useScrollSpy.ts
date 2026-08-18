import { useEffect, useState } from 'react'

/**
 * 화면에 보이는 조문을 찾아 목차에서 표시해 준다.
 *
 * IntersectionObserver 로 보이는 조문을 전부 모은 뒤 **문서에서 가장 앞선 것**을 고른다.
 * 단순히 마지막으로 들어온 것을 고르면 위로 스크롤할 때 표시가 튄다.
 *
 * @param ids 감시할 조문의 id 목록 (방침을 바꾸면 목록도 바뀐다)
 */
export function useScrollSpy(ids: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null)

  useEffect(() => {
    setActiveId(ids[0] ?? null)
    if (ids.length === 0) return

    const visible = new Set<string>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }

        // 문서 순서대로 훑어 가장 위에 있는 것을 고른다
        const first = ids.find((id) => visible.has(id))
        if (first) setActiveId(first)
      },
      {
        // 위쪽은 고정 헤더 높이만큼, 아래쪽은 화면 절반을 잘라 본다.
        // 이렇게 하면 "지금 읽고 있는 곳"에 가깝게 잡힌다
        rootMargin: '-96px 0px -55% 0px',
        threshold: 0,
      },
    )

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [ids])

  return activeId
}
