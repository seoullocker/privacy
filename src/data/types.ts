/**
 * 개인정보처리방침을 화면에 그리기 위한 자료 구조.
 *
 * 조문을 HTML 로 직접 적지 않고 이런 구조로 두는 이유는 세 가지다.
 * 1) 방침이 개정될 때 문장만 바꾸면 되고 화면 코드는 건드리지 않는다
 * 2) 목차와 본문이 같은 자료를 보므로 서로 어긋날 수 없다
 * 3) 나중에 영문판을 붙일 때 같은 구조에 번역문만 채우면 된다
 */

/** 조문 안에 들어가는 한 덩어리 */
export type Block =
  /** 일반 문단 */
  | { kind: 'paragraph'; text: string }
  /** 조문 안의 소제목 */
  | { kind: 'subheading'; text: string }
  /** 목록. ordered 가 true 면 번호를 매긴다 */
  | { kind: 'list'; ordered?: boolean; items: string[] }
  /** 표. head 는 열 제목, rows 는 행 */
  | { kind: 'table'; caption?: string; head: string[]; rows: string[][] }
  /** 강조해서 따로 띄우는 안내 상자 */
  | { kind: 'callout'; tone?: 'info' | 'warn'; text: string }
  /** 용어와 설명이 짝을 이루는 항목 (보호책임자 연락처 등) */
  | { kind: 'definition'; items: { term: string; desc: string }[] }

/** 조문 하나 */
export interface Article {
  /** 링크에 쓰는 값. `#article-3` 형태로 주소창에 남는다 */
  id: string
  /** 화면에 보이는 조문 번호 (예: '제3조') */
  label: string
  /** 조문 제목 */
  title: string
  /** 목차에 짧게 줄여 쓸 이름. 없으면 title 을 그대로 쓴다 */
  shortTitle?: string
  blocks: Block[]
}

/** 방침 한 판(버전) */
export interface Policy {
  /** 버전 구분값. 드롭다운의 value 로 쓴다 */
  id: string
  /** 드롭다운에 보이는 이름 */
  label: string
  /** 현재 시행 중인지, 지난 것인지 */
  status: 'current' | 'past'
  /** 시행 시작일 (표시용 문자열) */
  effectiveFrom: string
  /** 시행 종료일. 현행 방침에는 없다 */
  effectiveTo?: string
  /** 이 방침이 시행될 당시의 상호 */
  companyName: string
  /** 이 판을 열었을 때 맨 위에 띄울 안내. 지난 판에만 쓴다 */
  notice?: string
  /** 조문 앞에 오는 전문 */
  preamble: Block[]
  articles: Article[]
}
