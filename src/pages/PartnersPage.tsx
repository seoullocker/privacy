import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { COMPANY } from '../data/company'
import { LogoMark } from '../components/Icons'
import { SiteFooter } from '../components/SiteFooter'
import { useDarkOnly } from '../hooks/useDarkOnly'

/** 제휴 안내에서 곧 채울 칸. 준비 중이라는 말만으로는 무엇을 기다리는지 알 수 없다 */
const COMING = [
  {
    title: '제휴 조건과 정산',
    desc: '짐 한 개당 얼마를 받고, 언제 어떻게 정산되는지 표로 정리합니다.',
  },
  {
    title: '필요한 공간과 준비물',
    desc: '대형 캐리어를 세워 둘 만한 자리 기준과 상점에서 챙길 것을 안내합니다.',
  },
  {
    title: '신청부터 개시까지',
    desc: '신청서를 넣은 뒤 방문 확인과 앱 지도 등록까지 걸리는 단계를 밝힙니다.',
  },
]

export default function PartnersPage() {
  useEffect(() => {
    document.title = `제휴 상점 안내 · 준비 중 | ${COMPANY.name}`
  }, [])

  useDarkOnly()

  return (
    <div className="home partners">
      <a className="skip-link" href="#partners-main">
        본문 바로가기
      </a>

      <header className="homebar">
        <div className="homebar__inner">
          <Link className="homebar__brand" to="/">
            <span className="homebar__mark">
              <LogoMark />
            </span>
            <span className="homebar__names">
              <span className="homebar__name">{COMPANY.name}</span>
              <span className="homebar__sub">{COMPANY.services.appName}</span>
            </span>
          </Link>

          <nav className="homebar__nav" aria-label="주요 메뉴">
            <Link className="homebar__link" to="/#how">
              이용 방법
            </Link>
            <Link className="homebar__link" to="/#store">
              보관소
            </Link>
            <Link className="homebar__link" to="/privacy">
              개인정보처리방침
            </Link>
          </nav>

          <Link className="btn btn--compact" to="/">
            메인으로
          </Link>
        </div>
      </header>

      <main id="partners-main">
        {/*
         * 사진이 들어올 자리.
         * 아직 사진이 없어 CSS 로 배경을 그려 두었다(`.partners__hero`).
         * 사진이 준비되면 여기에 메인과 같은 <Photo> 를 얹으면 된다 —
         *   <Photo {...PARTNERS} className="hero2__photo" eager alt="..." />
         *   <div className="hero2__veil" aria-hidden />
         */}
        <section className="hero2 partners__hero">
          <div className="hero2__inner">
            <span className="hero2__badge">
              <span className="hero2__badgeDot" />
              COMING SOON · 준비 중
            </span>

            <h1 className="hero2__title">
              제휴 상점 안내를
              <br />
              준비하고 있습니다.
            </h1>

            <p className="hero2__lede">
              골목 상점이 보관소가 되는 절차와 정산 조건을 한 화면에 정리하는 중입니다. 오래
              걸리지 않게 하겠습니다.
            </p>

            <div className="hero2__actions">
              <a className="btn btn--primary" href={`tel:${COMPANY.phone.replace(/-/g, '')}`}>
                전화로 문의하기
              </a>
              <a
                className="btn btn--ghost"
                href={`mailto:${COMPANY.email}?subject=${encodeURIComponent('제휴 상점 문의')}`}
              >
                이메일 보내기
              </a>
            </div>

            <p className="partners__hint">
              먼저 이야기 나누고 싶다면 지금 연락해 주세요. 상점 자리와 짐을 둘 수 있는 공간만
              알려 주시면 안내드립니다.
            </p>
          </div>
        </section>

        <section className="partners__plan">
          <div className="home__eyebrow">무엇을 준비하고 있나</div>
          <h2 className="steps__title">이 화면에 곧 담길 내용</h2>

          <div className="steps__grid">
            {COMING.map((item, i) => (
              <div className="step" key={item.title}>
                <div className="step__no">{i + 1}</div>
                <h3 className="step__title">{item.title}</h3>
                <p className="step__desc">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="partners__back">
            <Link className="btn btn--tinted" to="/#store">
              보관소 이야기 다시 보기
            </Link>
          </p>
        </section>
      </main>

      <SiteFooter showPolicyLinks />
    </div>
  )
}
