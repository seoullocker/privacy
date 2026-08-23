/**
 * 사업자 정보. 방침 본문과 화면 하단(푸터)이 같은 값을 본다.
 *
 * 상호가 '서울러기지' 에서 '서플라이 서울' 로 바뀌었고 사업자등록번호는 그대로다.
 * 지난 방침(2023-09-21)은 당시 상호를 원문 그대로 두므로 이 값을 쓰지 않는다.
 */
export const COMPANY = {
  /** 현재 상호 */
  name: '서플라이 서울',
  /** 지난 방침에 적혀 있는 예전 상호 */
  formerName: '서울러기지',
  representative: '신철민',
  businessNumber: '502-79-00292',
  phone: '010-6839-6071',
  email: 'cjfals1015@naver.com',
  /** 이 방침이 적용되는 서비스 */
  services: {
    appName: 'Seoul Storage',
    packageName: 'scm.minystore.seoulstorage',
    website: 'https://seoulstorage.imweb.me',
    /** 구글 플레이 스토어 (메인 페이지의 '앱 열기' 버튼이 쓴다) */
    playStore: 'https://play.google.com/store/apps/details?id=scm.minystore.seoulstorage',
  },
} as const
