# 서플라이 서울 — 개인정보처리방침

짐 보관 서비스 **Seoul Storage** 애플리케이션(`scm.minystore.seoulstorage`)과
홈페이지에 적용되는 개인정보처리방침을 공개하는 사이트입니다.

> 공개 주소: <https://seoullocker.github.io/privacy/>

Google Play Console 의 "개인정보처리방침 URL" 칸에 위 주소를 넣습니다.

---

## 무엇이 들어 있나

| 화면 | 설명 |
| --- | --- |
| 현행 방침 | 2026년 8월 18일 시행. 접속하면 언제나 이 문서가 먼저 보입니다 |
| 이전 방침 | 2023년 9월 21일 시행분. 상단 **버전 선택**에서 고르면 원문 그대로 볼 수 있습니다 |

특정 버전을 링크로 공유하려면 주소 뒤에 `?v=` 를 붙입니다.

```
https://seoullocker.github.io/privacy/            현행
https://seoullocker.github.io/privacy/?v=2023-09-21   이전 버전
```

---

## 개발

```bash
npm install
npm run dev      # http://localhost:5173/privacy/
npm run build    # 타입 검사 + 정적 파일 생성 (dist/)
npm run preview  # 빌드 결과 확인
```

## 배포

`main` 브랜치에 push 하면 GitHub Actions 가 자동으로 빌드해서 GitHub Pages 에 올립니다
(`.github/workflows/deploy.yml`).

**최초 1회만** 저장소 설정에서 아래를 켜야 합니다.

1. 저장소 → **Settings** → 왼쪽 메뉴 **Pages**
2. **Build and deployment** → **Source** 를 `GitHub Actions` 로 변경

---

## 방침을 개정할 때

1. `src/data/policies/v{시행일}.ts` 파일을 새로 만듭니다.
2. 직전 방침 파일의 `status` 를 `'past'` 로 바꾸고 `effectiveTo` 와 `notice` 를 채웁니다.
3. `src/data/policies/index.ts` 의 `POLICIES` 배열 **맨 앞**에 새 방침을 넣습니다.

화면 코드는 건드리지 않아도 됩니다. 목차·버전 드롭다운·조문 번호는 모두 이 자료에서 자동으로 만들어집니다.

## 도메인을 연결할 때

1. `public/` 에 `CNAME` 파일을 만들고 도메인만 한 줄 적습니다.
2. `.github/workflows/deploy.yml` 의 `BASE_PATH` 를 `/` 로 바꿉니다.
3. 저장소 → Settings → Pages → Custom domain 에 도메인을 넣습니다.

## 파일 구조

```
src/
├── data/
│   ├── company.ts            사업자 정보 (본문과 푸터가 함께 본다)
│   ├── types.ts              방침을 표현하는 자료 구조
│   └── policies/             방침 본문 (버전별 파일)
├── components/               화면 조각
├── hooks/                    테마 · 목차 추적 · 읽기 진행률
└── styles/index.css          디자인 토큰과 전체 스타일
```
