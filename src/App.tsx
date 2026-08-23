import { useEffect } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useSearchParams,
} from 'react-router-dom'
import HomePage from './pages/HomePage'
import PolicyPage from './pages/PolicyPage'

/**
 * 방침 페이지가 사이트 루트에 있던 시절에 공유된 링크는
 * `.../privacy/?v=2023-09-21` 처럼 루트에 `?v=` 를 달고 들어온다.
 * 그런 주소는 방침 페이지로 넘겨 주고, 그 외에는 메인 페이지를 보여준다.
 */
function Landing() {
  const [searchParams] = useSearchParams()

  if (searchParams.has('v')) {
    return <Navigate to={{ pathname: '/privacy', search: `?${searchParams}` }} replace />
  }

  return <HomePage />
}

/**
 * 다른 화면으로 옮겨 가면 맨 위에서 시작하게 한다.
 * 다만 `#how` 처럼 특정 자리를 가리키고 들어온 경우는 건드리지 않는다.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    // 저장소 이름이 주소에 들어가므로(`/privacy/`) 빌드가 정한 값을 그대로 쓴다
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/privacy" element={<PolicyPage />} />
        {/* 없는 주소로 들어오면 메인으로 보낸다 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
