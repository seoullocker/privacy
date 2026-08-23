import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { COMPANY } from '../data/company'
import { STEPS, LUGGAGE, LUGGAGE_NOTE } from '../data/home'
import { CURRENT_POLICY, PAST_POLICIES } from '../data/policies'
import { LogoMark } from '../components/Icons'
import { Photo } from '../components/Photo'
import { SiteFooter } from '../components/SiteFooter'

import subwayWide from '../assets/hero/subway-wide.webp'
import subwayWideJpg from '../assets/hero/subway-wide.jpg'
import subwayTall from '../assets/hero/subway-tall.webp'
import subwayTallJpg from '../assets/hero/subway-tall.jpg'
import alleyWide from '../assets/hero/alley-wide.webp'
import alleyWideJpg from '../assets/hero/alley-wide.jpg'
import alleyTall from '../assets/hero/alley-tall.webp'
import alleyTallJpg from '../assets/hero/alley-tall.jpg'
import studioWide from '../assets/hero/studio-wide.webp'
import studioWideJpg from '../assets/hero/studio-wide.jpg'
import studioTall from '../assets/hero/studio-tall.webp'
import studioTallJpg from '../assets/hero/studio-tall.jpg'

/* 크기는 scripts/build-images.mjs 가 내놓은 실제 픽셀 값이다 */
const TALL = { w: 768, h: 1366 }

const SUBWAY = {
  wide: { webp: subwayWide, jpg: subwayWideJpg, w: 1920, h: 1079 },
  tall: { webp: subwayTall, jpg: subwayTallJpg, ...TALL },
}
const ALLEY = {
  wide: { webp: alleyWide, jpg: alleyWideJpg, w: 1600, h: 900 },
  tall: { webp: alleyTall, jpg: alleyTallJpg, ...TALL },
}
const STUDIO = {
  wide: { webp: studioWide, jpg: studioWideJpg, w: 1600, h: 900 },
  tall: { webp: studioTall, jpg: studioTallJpg, ...TALL },
}

/** 가장 최근 이전 방침. 없으면 '이전 방침 보기' 칸을 감춘다 */
const PREVIOUS = PAST_POLICIES[0]

export default function HomePage() {
  useEffect(() => {
    document.title = `${COMPANY.services.appName} · 서울 짐보관 | ${COMPANY.name}`
  }, [])

  /*
   * 이 화면은 어두운 사진 위에 글을 얹는 구성이라 다크 한 벌로만 만들었다.
   * 방침 화면에서 밝은 화면을 골라 두었더라도 여기서는 어두운 채로 보여 주고,
   * 화면을 떠날 때 고른 값을 되돌려 놓는다.
   */
  useEffect(() => {
    const previous = document.documentElement.dataset.theme
    document.documentElement.dataset.theme = 'dark'
    return () => {
      if (previous) document.documentElement.dataset.theme = previous
    }
  }, [])

  return (
    <div className="home">
      <a className="skip-link" href="#how">
        본문 바로가기
      </a>

      <header className="homebar">
        <div className="homebar__inner">
          <a className="homebar__brand" href="#top">
            <span className="homebar__mark">
              <LogoMark />
            </span>
            <span className="homebar__names">
              <span className="homebar__name">{COMPANY.name}</span>
              <span className="homebar__sub">{COMPANY.services.appName}</span>
            </span>
          </a>

          <nav className="homebar__nav" aria-label="주요 메뉴">
            <a className="homebar__link" href="#how">
              이용 방법
            </a>
            <a className="homebar__link" href="#store">
              보관소
            </a>
            <a className="homebar__link" href="#luggage">
              맡길 수 있는 짐
            </a>
            <Link className="homebar__link" to="/privacy">
              개인정보처리방침
            </Link>
          </nav>

          <a
            className="btn btn--compact"
            href={COMPANY.services.playStore}
            target="_blank"
            rel="noreferrer noopener"
          >
            앱 열기
          </a>
        </div>
      </header>

      <main>
        <section className="hero2" id="top">
          <Photo
            {...SUBWAY}
            className="hero2__photo"
            eager
            alt="지하철 승강장에서 대형 하드캐리어를 옆에 세워 두고 양손을 편 여행자"
          />
          <div className="hero2__veil" aria-hidden />

          <div className="hero2__inner">
            <span className="hero2__badge">
              <span className="hero2__badgeDot" />
              서울 짐보관 · {COMPANY.services.appName}
            </span>

            <h1 className="hero2__title">
              짐은 맡기고,
              <br />
              서울은 두 손 가볍게.
            </h1>

            <p className="hero2__lede">
              체크아웃과 비행기 사이의 애매한 몇 시간. 대형 하드캐리어까지 근처 상점에 맡기고, 남은
              일정을 그대로 이어 가세요.
            </p>

            <div className="hero2__actions">
              <a
                className="btn btn--primary"
                href={COMPANY.services.playStore}
                target="_blank"
                rel="noreferrer noopener"
              >
                보관소 찾기
              </a>
              <a className="btn btn--ghost" href="#how">
                이용 방법 보기
              </a>
            </div>
          </div>
        </section>

        <section className="steps" id="how">
          <div className="home__eyebrow">이용 방법</div>
          <h2 className="steps__title">세 번이면 끝납니다</h2>

          <div className="steps__grid">
            {STEPS.map((step) => (
              <div className="step" key={step.no}>
                <div className="step__no">{step.no}</div>
                <h3 className="step__title">{step.title}</h3>
                <p className="step__desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          className="home__split"
          id="store"
          style={{ borderTop: '1px solid var(--divider)', borderBottom: '1px solid var(--divider)' }}
        >
          <div>
            <div className="home__eyebrow">보관소</div>
            <h2 className="home__title">골목 상점이 곧 보관소입니다</h2>
            <p className="home__lede">
              명동, 홍대처럼 사람이 몰리는 거리에서 보관함을 찾아 헤맬 필요가 없습니다. 늘 문을 열어
              두는 동네 상점이 짐을 받아 둡니다.
            </p>
            <p className="home__lede">
              사람이 직접 받고 직접 내주기 때문에, 캐리어가 커서 사물함에 들어가지 않아도 문제되지
              않습니다.
            </p>
            <a
              className="btn btn--tinted"
              style={{ marginTop: '1.8rem' }}
              href={COMPANY.services.website}
              target="_blank"
              rel="noreferrer noopener"
            >
              제휴 상점으로 참여하기
            </a>
          </div>

          <Photo
            {...ALLEY}
            className="home__figure"
            alt="밤거리 상점 앞에서 앞치마를 두른 상점 주인에게 하드캐리어를 건네는 여행자"
          />
        </section>

        <section className="home__split" id="luggage">
          <Photo
            {...STUDIO}
            className="home__figure"
            alt="어두운 스튜디오 배경에 놓인 대형 하드셸 캐리어 세 개"
          />

          <div>
            <div className="home__eyebrow">맡길 수 있는 짐</div>
            <h2 className="home__title">대형 캐리어도 그대로</h2>
            <p className="home__lede" style={{ marginBottom: '1.6rem' }}>
              역 사물함에 들어가지 않는 28~30인치 하드캐리어, 골프백, 유아차처럼 부피가 큰 짐이
              오히려 이 서비스를 쓰는 이유입니다.
            </p>

            <ul className="luggage">
              {LUGGAGE.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <p className="luggage__note">{LUGGAGE_NOTE}</p>
          </div>
        </section>

        <section className="privacyBand" id="privacy">
          <div className="privacyBand__inner">
            <div>
              <div className="home__eyebrow">개인정보</div>
              <h2 className="privacyBand__title">어떤 정보를 어떻게 다루는지 공개합니다</h2>
              <p className="privacyBand__lede">
                {COMPANY.services.appName} 앱과 홈페이지에 적용되는 개인정보처리방침 전문을 볼 수
                있습니다. 이전 버전도 원문 그대로 남겨 두었습니다.
              </p>
            </div>

            <div className="privacyBand__cards">
              <Link className="pcard pcard--primary" to="/privacy">
                <span className="pcard__mark">
                  <LogoMark />
                </span>
                <span className="pcard__text">
                  <span className="pcard__title">개인정보처리방침 전문</span>
                  <span className="pcard__meta">{CURRENT_POLICY.effectiveFrom} 시행 · 현행</span>
                </span>
                <span className="pcard__arrow" aria-hidden>
                  →
                </span>
              </Link>

              {PREVIOUS && (
                <Link className="pcard pcard--plain" to={`/privacy?v=${PREVIOUS.id}`}>
                  <span className="pcard__text">
                    <span className="pcard__title">이전 방침 보기</span>
                    <span className="pcard__meta">{PREVIOUS.effectiveFrom} 시행분</span>
                  </span>
                  <span className="pcard__arrow" aria-hidden>
                    →
                  </span>
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter showPolicyLinks />
    </div>
  )
}
