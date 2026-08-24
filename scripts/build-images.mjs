/**
 * 메인 페이지 히어로/섹션 이미지 생성기.
 *
 * Claude Design 에서 내려받은 압축 파일의 `uploads/` 안에 있는 원본(1920×1080 / 768×1366)을
 * 화면에 내보낼 크기로 줄이고 WebP + JPEG 두 벌로 만든다.
 *
 * 원본은 장당 2MB 안팎이라 저장소에 넣지 않는다. 다시 만들 일이 생기면
 * 압축 파일을 푼 자리를 SRC 로 넘긴다.
 *
 *   node scripts/build-images.mjs <원본이 있는 uploads 폴더>
 */
import sharp from 'sharp'
import { access, mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'src/assets/hero')

const SRC = process.argv[2]
if (!SRC) {
  console.error('원본 폴더를 알려 주세요:  node scripts/build-images.mjs <uploads 폴더>')
  process.exit(1)
}

/**
 * 원본 파일 이름 → 화면에서 쓰는 이름.
 *
 * `height` 를 적으면 그 크기에 맞춰 잘라낸다. Claude Design 원본은 화면에 쓸
 * 비율(16:9 · 768×1366)로 그대로 나왔지만, 제휴 사진을 만든 ChatGPT 이미지
 * 모델은 가로 3:2 · 세로 2:3 밖에 내주지 않아 이 두 장만 잘라 써야 한다.
 *
 * `anchor` 는 자를 때 남길 쪽이다. 제휴 가로 사진은 위쪽이 처마와 어둠뿐이라
 * 아래를 남긴다 — 그래야 캐리어 바퀴와 젖은 바닥에 번진 보랏빛이 살아 있다.
 */
const IMAGES = [
  { from: '지하철 가로.png', to: 'subway-wide', width: 1920 },
  { from: '지하철 세로.png', to: 'subway-tall', width: 768 },
  { from: '상점가 가로.png', to: 'alley-wide', width: 1600 },
  { from: '상점가 세로.png', to: 'alley-tall', width: 768 },
  { from: '가방 가로.png', to: 'studio-wide', width: 1600 },
  { from: '가방 세로.png', to: 'studio-tall', width: 768 },
  { from: '제휴 가로.png', to: 'partners-wide', width: 1536, height: 864, anchor: 'bottom' },
  { from: '제휴 세로.png', to: 'partners-tall', width: 768, height: 1366 },
]

await mkdir(OUT, { recursive: true })

for (const { from, to, width, height, anchor } of IMAGES) {
  const input = join(SRC, from)

  /*
   * 폴더에 없는 원본은 지나간다.
   * 원본은 저장소에 없고 만든 곳도 서로 달라서(메인 사진은 Claude Design,
   * 제휴 사진은 ChatGPT) 여섯 장이 한자리에 모여 있는 일이 드물다. 없다고
   * 멈춰 버리면 한 장만 다시 만들려고 나머지 원본까지 찾아와야 한다.
   */
  try {
    await access(input)
  } catch {
    console.log(`${to.padEnd(14)} 원본이 없어 지나감 (${from})`)
    continue
  }

  // 사진이라 WebP 를 먼저 쓰고, 못 읽는 브라우저에는 JPEG 를 내준다.
  // (PNG 는 사진에 쓰면 같은 화질에 용량이 몇 배로 커진다)
  const base = sharp(input).resize(
    height
      ? { width, height, fit: 'cover', position: anchor ?? 'centre' }
      : { width, withoutEnlargement: true },
  )

  const webp = await base.clone().webp({ quality: 80 }).toFile(join(OUT, `${to}.webp`))
  const jpeg = await base.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(join(OUT, `${to}.jpg`))

  const kb = (n) => `${Math.round(n / 1024)}KB`
  console.log(`${to.padEnd(14)} ${webp.width}×${webp.height}  webp ${kb(webp.size).padStart(6)}  jpeg ${kb(jpeg.size).padStart(6)}`)
}
