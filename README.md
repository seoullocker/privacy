# 서플라이 서울 홈페이지

짐 보관 서비스 **Seoul Storage**(`scm.minystore.seoulstorage`)의 홈페이지와
개인정보처리방침을 함께 담고 있는 사이트입니다.

> 공개 주소: <https://supplyseoul.com>

---

## 무엇이 들어 있나

| 주소 | 화면 | 설명 |
| --- | --- | --- |
| `/` | 메인 | 서비스 소개. 히어로 · 이용 방법 · 보관소 · 맡길 수 있는 짐 · 방침 진입 |
| `/partners` | 제휴 안내 | 제휴 상점 모집 안내. 아직 **준비 중** 화면이다 (메인의 '제휴 상점으로 참여하기' 가 여기로 온다) |
| `/privacy` | 현행 방침 | 2026년 8월 18일 시행. 방침 주소로 들어오면 언제나 이 문서가 먼저 보입니다 |
| `/privacy?v=2023-09-21` | 이전 방침 | 2023년 9월 21일 시행분. 상단 **버전 선택**으로도 고를 수 있습니다 |

메인은 어두운 사진 위에 글을 얹는 구성이라 **다크 한 벌로만** 만들었고,
방침 화면은 종전대로 밝은 화면/어두운 화면을 고를 수 있습니다.

### ⚠️ Google Play Console 주소를 바꿔야 합니다

전에는 사이트 첫 주소가 곧 방침이었지만, 이제 그 자리에 메인이 옵니다.
**도메인이 연결된 뒤 Play Console 의 "개인정보처리방침 URL" 을 아래로 바꿔 주세요.**

```
https://supplyseoul.com/privacy
```

예전에 공유한 `?v=` 링크(`.../privacy/?v=2023-09-21`)는 GitHub 이 새 도메인으로
넘겨 주고, 그 뒤 화면이 방침으로 다시 넘겨 주므로 그대로 두어도 됩니다.

---

## 개발

```bash
npm install
npm run dev      # http://localhost:5173/
npm run build    # 타입 검사 + 정적 파일 생성 (dist/)
npm run preview  # 빌드 결과 확인
```

## 배포

`main` 브랜치에 push 하면 GitHub Actions 가 자동으로 빌드해서 GitHub Pages 에 올립니다
(`.github/workflows/deploy.yml`).

**최초 1회만** 저장소 설정에서 아래를 켜야 합니다.

1. 저장소 → **Settings** → 왼쪽 메뉴 **Pages**
2. **Build and deployment** → **Source** 를 `GitHub Actions` 로 변경

GitHub Pages 에는 서버 설정이 없어서 `/privacy` 같은 주소로 바로 들어오면
파일을 못 찾습니다. 그래서 빌드할 때 `index.html` 을 `404.html` 로도 복사해 둡니다
(`vite.config.ts` 의 `spaFallback`). 없는 주소에는 GitHub 이 `404.html` 을 내주므로
화면이 떠서 주소를 읽고 알아서 찾아갑니다.

---

## 방침을 개정할 때

1. `src/data/policies/v{시행일}.ts` 파일을 새로 만듭니다.
2. 직전 방침 파일의 `status` 를 `'past'` 로 바꾸고 `effectiveTo` 와 `notice` 를 채웁니다.
3. `src/data/policies/index.ts` 의 `POLICIES` 배열 **맨 앞**에 새 방침을 넣습니다.

화면 코드는 건드리지 않아도 됩니다. 목차·버전 드롭다운·조문 번호는 모두 이 자료에서
자동으로 만들어집니다. 메인 페이지의 '이전 방침 보기' 칸도 여기를 보고 따라갑니다.

## 제휴 안내 화면

`/partners` 는 아직 준비 중이라는 사실만 알리는 화면이다. 전에는 메인의
'제휴 상점으로 참여하기' 가 외부 홈페이지(`COMPANY.services.website`)로
나갔지만, 이제 사이트 안의 이 주소로 온다.

글은 `src/pages/PartnersPage.tsx` 에 그대로 적혀 있다. 히어로 사진은
`partners-wide` · `partners-tall` 두 장이고, 메인과 똑같이 `<Photo>` 가
WebP 를 먼저 내주고 못 읽는 브라우저에는 JPEG 를 내준다.

사진이 아예 안 뜰 때를 대비해 `home.css` 의 `.partners__hero` 가 사진 뒤에
브랜드색 무늬를 깔아 둔다. 사진은 `z-index: -2` 라 평소에는 이 무늬가 보이지
않지만, 파일을 못 받아 오면 무늬가 드러나 글자가 검은 판에 뜨지 않는다.

좁은 화면에서는 이 히어로만 장막을 따로 쓴다(`home.css` 아래쪽의
`@media (max-width: 44rem)`). 메인보다 글이 한 덩이 많아서, 메인의 장막
곡선으로는 마지막 문단이 사진의 밝은 자리에 얹혀 읽히지 않는다.

## 메인 페이지 글을 고칠 때

이용 방법 단계와 맡길 수 있는 짐 목록은 `src/data/home.ts` 에 있습니다.
히어로 문구처럼 한 번만 나오는 글은 `src/pages/HomePage.tsx` 에 그대로 적혀 있습니다.

## 사진을 다시 만들 때

메인의 사진은 Claude Design 에서 내려받은 압축 파일의 `uploads/` 안에 있는 원본
(가로 1920×1080 / 세로 768×1366)에서 만듭니다. 원본은 장당 2MB 안팎이라 저장소에
넣지 않았습니다.

```bash
node scripts/build-images.mjs <압축 파일을 푼 자리의 uploads 폴더>
```

폴더에 없는 원본은 지나가므로, 한 장만 다시 만들려고 나머지 원본까지 찾아올
필요는 없다.

제휴 사진(`partners-*`) 두 장만 출처가 다르다. ChatGPT 이미지 모델로 만들었고
그쪽은 가로 3:2(1536×1024) · 세로 2:3(1024×1536) 밖에 내주지 않아서, 화면에
쓸 비율로 잘라 낸다. 그 일은 `IMAGES` 의 `height` · `anchor` 가 맡는다 —
가로는 위쪽이 처마와 어둠뿐이라 아래를 남긴다.

가로용·세로용을 따로 두는 이유는, 같은 사진을 잘라 쓰면 세로로 긴 휴대폰에서
인물이 화면 밖으로 밀려나기 때문입니다. 사진이라 WebP 를 먼저 쓰고 못 읽는
브라우저에는 JPEG 를 내줍니다.

## 도메인

`supplyseoul.com` 을 씁니다. 이 저장소에서 도메인과 얽힌 곳은 두 군데뿐입니다.

| 파일 | 하는 일 |
| --- | --- |
| `public/CNAME` | 어떤 도메인으로 서비스할지 GitHub 에 알린다 |
| `.github/workflows/deploy.yml` 의 `BASE_PATH` | 자원 경로 앞에 무엇을 붙일지 정한다 (`/`) |

도메인 쪽(가비아)에는 아래 레코드가 등록되어 있어야 합니다.

```
A      @      185.199.108.153
A      @      185.199.109.153
A      @      185.199.110.153
A      @      185.199.111.153
CNAME  www    seoullocker.github.io.
```

도메인을 떼고 `https://seoullocker.github.io/privacy/` 로 되돌리려면
`public/CNAME` 을 지우고 `BASE_PATH` 를 `/privacy/` 로 바꿉니다.

## 파일 구조

```
scripts/
└── build-images.mjs          원본 사진 → 화면에 쓸 WebP/JPEG
src/
├── assets/hero/              메인에 쓰는 사진 (위 스크립트가 만든다)
├── data/
│   ├── company.ts            사업자 정보 (본문과 푸터가 함께 본다)
│   ├── home.ts               메인 페이지의 반복되는 글
│   ├── types.ts              방침을 표현하는 자료 구조
│   └── policies/             방침 본문 (버전별 파일)
├── pages/
│   ├── HomePage.tsx          메인
│   └── PolicyPage.tsx        개인정보처리방침
├── components/               화면 조각
├── hooks/                    테마 · 목차 추적 · 읽기 진행률
└── styles/
    ├── index.css             디자인 토큰과 방침 화면 스타일
    └── home.css              메인 화면 스타일
```
