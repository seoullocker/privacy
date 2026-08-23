import { copyFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * supplyseoul.com 을 쓰므로 자원 경로 앞에 아무것도 붙지 않는다.
 *
 * 도메인을 떼고 다시 `https://<계정>.github.io/privacy/` 로 돌아가야 한다면
 * 이 값을 '/privacy/' 로 되돌리고 public/CNAME 을 지운다.
 * 배포 워크플로에서 BASE_PATH 환경변수로 덮어쓸 수도 있다.
 */
const base = process.env.BASE_PATH ?? '/'

/**
 * GitHub Pages 에는 서버 설정이 없어서 `/privacy` 같은 주소로 바로 들어오면
 * 파일을 못 찾고 404 를 낸다. 그런데 없는 주소에는 `404.html` 을 대신 내주므로,
 * 그 자리에 `index.html` 을 그대로 복사해 두면 화면이 떠서 주소를 읽고 알아서 찾아간다.
 *
 * (자원 경로가 base 로 시작하는 절대 경로라 어느 깊이에서 열려도 잘 받아온다)
 */
function spaFallback(): Plugin {
  return {
    name: 'spa-fallback-404',
    apply: 'build',
    async closeBundle() {
      const dir = resolve(__dirname, 'dist')
      await copyFile(resolve(dir, 'index.html'), resolve(dir, '404.html'))
    },
  }
}

export default defineConfig({
  base,
  plugins: [react(), spaFallback()],
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 900,
  },
})
