/**
 * 넓은 화면과 좁은 화면에 서로 다른 사진을 내주는 그림 조각.
 *
 * 같은 사진을 잘라 쓰면 세로로 긴 휴대폰에서 인물이 화면 밖으로 밀려난다.
 * 그래서 가로용·세로용을 따로 두고 브라우저가 고르게 한다.
 * 사진이라 WebP 를 먼저 권하고, 못 읽는 브라우저에는 JPEG 를 내준다.
 *
 * 원본 크기(w·h)를 함께 적어 두는 이유는, 사진을 다 받기 전에도 브라우저가
 * 들어갈 자리를 미리 비워 두게 하려는 것이다. 이게 없으면 아래에 있던 글이
 * 사진이 도착하는 순간 아래로 밀려난다.
 */
interface Source {
  webp: string
  jpg: string
  /** 원본 가로 픽셀 */
  w: number
  /** 원본 세로 픽셀 */
  h: number
}

interface Props {
  /** 넓은 화면용 */
  wide: Source
  /** 좁은 화면용 */
  tall: Source
  alt: string
  className?: string
  /** 첫 화면에 바로 보이는 사진이면 true. 미리 받아 두어 표시가 늦지 않게 한다 */
  eager?: boolean
}

/** 세로용으로 바꾸는 기준 너비. home.css 의 다른 반응형 기준과 맞춰 두었다 */
const NARROW = '(max-width: 44rem)'

export function Photo({ wide, tall, alt, className, eager }: Props) {
  return (
    <picture>
      <source media={NARROW} type="image/webp" srcSet={tall.webp} width={tall.w} height={tall.h} />
      <source media={NARROW} type="image/jpeg" srcSet={tall.jpg} width={tall.w} height={tall.h} />
      <source type="image/webp" srcSet={wide.webp} width={wide.w} height={wide.h} />
      <img
        src={wide.jpg}
        alt={alt}
        className={className}
        width={wide.w}
        height={wide.h}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        {...(eager ? { fetchPriority: 'high' as const } : {})}
      />
    </picture>
  )
}
