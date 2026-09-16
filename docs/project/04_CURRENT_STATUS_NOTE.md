# QK Tool Hub 최신 작업 노트

갱신일: 2026-09-16  
저장소: https://github.com/ionic2001/qktoolhub  
운영 사이트: https://www.qktoolhub.com/  
현재 기능·SEO 코드 기준: `92643cd`

## 이번 변경

- 한국어 `/pixel-art`의 제목·H1·설명을 `이미지 도트 변환` 검색 의도에 맞췄다.
- JPG·PNG·WebP, 픽셀 크기 2~64px, 색상 팔레트, 컬러·흑백, 최대 20MB·4천만 픽셀, 긴 변 1,600px 축소와 PNG 저장 범위를 명시했다.
- `/currency-converter`를 22개에서 80개 통화로 확장했다. 5개 언어에서 통화 코드·통화명·현지화된 국가명으로 검색하며, EUR·XAF·XOF·XCD처럼 여러 국가가 공동 사용하는 통화도 관련 국가명을 함께 검색한다.
- 외부 API 실패 시 새로 추가한 통화가 1:1로 잘못 계산되지 않도록 80개 전체에 검증된 고정 참고값을 둔다. 당일 라이브 응답은 ExchangeRate-API가 제공하는 코드와 유효한 수치만 사용하고 출처 링크를 표시한다.
- 무료 공개 API는 하루 한 번 갱신되므로 5개 언어 UI의 고정된 “실시간” 표현을 “제공된 최신 환율”로 수정했다.
- 영어 `/word-counter?lang=en`은 Korean word·character·byte 계산 의도와 UTF-8·EUC-KR 추정 차이를 설명하도록 개선했다.
- 기존 `/pdf-converter`는 Google 선택 canonical이 자기 URL이고 검색 클릭도 있으므로 유지한다. 새 `/image-to-pdf`가 색인되고 검색 의도가 분리되는지 확인하기 전에는 리디렉션하지 않는다.
- 5개 언어 홈페이지→`/guides`→16개 상세 가이드의 최초 HTML 링크와 도구→관련 가이드 링크가 모두 일반 `<a href>`로 존재함을 확인했다. 이 연결은 자동 SEO 검사로 고정했다.

## Search Console 확인 결과

### 이미 색인됨

- `/pixel-art`: 색인 완료, HTTPS·Breadcrumbs 정상, 변경 후 재색인 요청 완료.
- `/currency-converter`: 색인 완료, HTTPS·Breadcrumbs 정상, 변경 후 재색인 요청 완료.
- `/pdf-converter`: 색인 완료. 사용자 선언 canonical과 Google 선택 canonical이 모두 자기 URL이며 모바일 Googlebot의 정상 수집과 성공한 페이지 가져오기를 확인했다.

### 발견됐지만 아직 크롤링되지 않음

- `/word-counter`
- `/word-counter?lang=en`
- `/image-to-pdf`
- `/pdf-merge`
- `/pdf-split`
- `/pdf-organize`
- `/pdf-to-png`
- `/guides`

위 URL은 모두 실시간 검사에서 Google 접근·색인 가능과 Breadcrumbs 정상 상태를 확인했고 우선 크롤링 대기열에 등록했다.

### 아직 Google에 알려지지 않음

- `/pdf-tools`: 실시간 검사 통과 후 색인 요청 완료.
- `/guides/jpg-images-to-one-pdf`: 이전 색인 요청 뒤에도 상태가 유지됐다. 실시간 검사는 다시 통과했으며 중복 요청하지 않았다.

## Sitemap과 판단

- 운영 sitemap: 107개 canonical URL.
- Search Console 발견 URL: `www` 105개, 비-www 90개.
- 제출된 sitemap은 성공 상태지만 107개 전체가 아직 보고되지는 않았다.
- 실시간 검사에서 기술적 차단은 발견되지 않았다. 현재 미색인은 robots·noindex·canonical 오류보다 Google의 발견·크롤링 처리 지연으로 판단한다.
- 같은 URL을 반복 제출해도 우선순위가 올라가지 않으므로 추가 요청을 멈춘다.

## 다음 확인

1. 배포 후 한국어·영어·일본어·중국어·스페인어에서 대표 국가명(AED·ZAR·PLN·MXN)과 통화 코드 검색, 추가·삭제·기준 통화 변경을 확인한다.
2. 2~3일 후 `/guides`, `/guides/jpg-images-to-one-pdf`, `/image-to-pdf`, `/pdf-merge`, `/pdf-split`, `/pdf-organize`, `/pdf-to-png`, `/pdf-tools`, 한국어·영어 `/word-counter` 상태를 다시 확인한다.
3. `www` sitemap의 발견 URL 수가 105에서 107로 갱신되는지 확인한다.
4. 2~4주 뒤 `이미지 도트 변환`, `korean word counter`, `word counter korean`, `jpg pdf 변환`의 노출·클릭 변화를 비교한다.
5. 위 상태가 안정되기 전에는 AdSense 재검토를 서두르지 않고, 가이드 색인과 실제 검색 유입을 먼저 확인한다.

## 작업 원칙

- 두 컴퓨터는 원격 `main`을 공통 기준으로 사용한다.
- 작업 시작 전 `main`을 갱신하고 작업별 브랜치에서 수정한다.
- 기능·SEO·문서 변경은 검증 후 GitHub에 올리며, 지원하지 않는 기능이나 확인하지 않은 성과를 문서에 넣지 않는다.
