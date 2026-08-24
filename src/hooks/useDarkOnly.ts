import { useEffect } from 'react'

/**
 * 이 화면만 어두운 채로 고정한다.
 *
 * 메인·제휴 화면은 어두운 사진 위에 글을 얹는 구성이라 다크 한 벌로만 만들었다.
 * 방침 화면에서 밝은 화면을 골라 두었더라도 여기서는 어두운 채로 보여 주고,
 * 화면을 떠날 때 고른 값을 되돌려 놓는다.
 */
export function useDarkOnly() {
  useEffect(() => {
    const previous = document.documentElement.dataset.theme
    document.documentElement.dataset.theme = 'dark'
    return () => {
      if (previous) document.documentElement.dataset.theme = previous
    }
  }, [])
}
