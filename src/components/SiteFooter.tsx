import { Link } from 'react-router-dom'
import { COMPANY } from '../data/company'
import { PAST_POLICIES } from '../data/policies'

interface Props {
  /**
   * 방침·스토어 바로가기 칸을 함께 보여줄지.
   * 메인 페이지에서는 켜고, 방침 페이지에서는 지금 보고 있는 문서라 끈다.
   */
  showPolicyLinks?: boolean
}

/** 화면 아래 사업자 정보. 방침 본문의 보호책임자와 같은 값을 본다 */
export function SiteFooter({ showPolicyLinks }: Props = {}) {
  return (
    <footer className="footer">
      <div className={`footer__inner${showPolicyLinks ? ' footer__inner--wide' : ''}`}>
        <div>
          <h2 className="footer__title">사업자 정보</h2>
          <dl className="footer__list">
            <dt>상호</dt>
            <dd>{COMPANY.name}</dd>
            <dt>대표</dt>
            <dd>{COMPANY.representative}</dd>
            <dt>사업자등록번호</dt>
            <dd>{COMPANY.businessNumber}</dd>
          </dl>
        </div>

        <div>
          <h2 className="footer__title">개인정보 보호 문의</h2>
          <dl className="footer__list">
            <dt>전화</dt>
            <dd>
              <a href={`tel:${COMPANY.phone.replace(/-/g, '')}`}>{COMPANY.phone}</a>
            </dd>
            <dt>이메일</dt>
            <dd>
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
            </dd>
            <dt>홈페이지</dt>
            <dd>
              <a href={COMPANY.services.website} target="_blank" rel="noreferrer noopener">
                {COMPANY.services.website.replace('https://', '')}
              </a>
            </dd>
          </dl>
        </div>

        {showPolicyLinks && (
          <div>
            <h2 className="footer__title">정책</h2>
            <div className="footer__links">
              <Link to="/privacy">개인정보처리방침</Link>
              {PAST_POLICIES.map((policy) => (
                <Link key={policy.id} className="footer__linkMuted" to={`/privacy?v=${policy.id}`}>
                  이전 개인정보처리방침
                </Link>
              ))}
              <a
                className="footer__linkMuted"
                href={COMPANY.services.playStore}
                target="_blank"
                rel="noreferrer noopener"
              >
                Google Play
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="footer__bottom">
        <span>
          © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
        </span>
        <span className="footer__spacer">
          {COMPANY.services.appName} · {COMPANY.services.packageName}
        </span>
      </div>
    </footer>
  )
}
