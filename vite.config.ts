import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * GitHub Pages 는 `https://<계정>.github.io/<저장소>/` 아래에 올라가므로
 * 자원 경로 앞에 저장소 이름이 붙어야 한다. 저장소 이름이 `privacy` 라서 기본값이 `/privacy/`.
 *
 * 나중에 도메인(예: supplyseoul.com)을 붙이면 이 값을 '/' 로 바꾸면 된다.
 * 배포 워크플로에서 BASE_PATH 환경변수로 덮어쓸 수도 있다.
 */
const base = process.env.BASE_PATH ?? '/privacy/'

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    outDir: 'dist',
    // 방침 문서 한 장짜리 사이트라 청크를 쪼갤 이유가 없다
    chunkSizeWarningLimit: 900,
  },
})
