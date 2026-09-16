# 두 컴퓨터 개발 인수인계 메모

## 현재 인수인계 (2026-09-16)

- 코드 기준: 커밋 `0f5db64`(원격 반영 후 운영 기준); 저장소: https://github.com/ionic2001/qktoolhub; 공개 사이트: https://www.qktoolhub.com/.
- 최근 완료: PDF 원본 가이드 6개, 도구 계산 검증 가이드 6개와 서류 제출·스캔·오류 해결·JPG PDF 변환 실전 가이드 4개를 제공한다. 다국어 90개와 한국어 가이드 목록·상세 17개로 총 107개 canonical URL이며 `/pdf-converter`는 유지한다.
- 검증: 운영 코드 빌드, 107개 URL 정적 SEO, 가이드 계산 근거, PDF 병합·추출·정리, 단위, 테마 검사 통과. 서류 제출·스캔 PDF 가이드는 운영 사이트 390px에서 본문·다운로드·관련 링크와 표 내부 스크롤을 확인했다. 환율 API 실패 시 모의 추세를 만들지 않고 참고값 상태를 표시한다. 전체 도구의 모바일·복잡한 PDF 표본·Search Console 장기 지표 검수는 미완료.
- 다음 작업: Search Console 우선 크롤링을 요청한 기존 검증 가이드와 핵심 가이드의 실제 색인·검색 의도·관련 도구 이동을 확인한다. 현재 107개 sitemap의 발견 URL 수가 `www` 105개에서 갱신되는지, 영어 Korean word counter와 한국어 환율 페이지 문구 개선 뒤 노출·CTR이 달라지는지도 확인한다. 페이지별 개별 추출·ZIP, 드래그 정리, 내용 추가·양식·OCR는 후속 기능이다.
- 사용자 확인 사항: 2026-09-16 서류 제출·스캔 PDF·PDF 오류 해결·JPG PDF 변환 가이드의 색인 요청 완료, `www` sitemap 재제출 성공. Search Console의 선택된 3개월 보고서는 2클릭·29노출이며 `jpg pdf 변환`과 `/pdf-converter`에서 각각 1클릭을 확인했다. 비-www와 HTTP는 운영에서 www·HTTPS로 이미 308 이동한다. `?lang=ko` 영구 이동 시도는 Vercel 설정 검증에서 거절되어 운영에 반영되지 않았고, 기존의 쿼리 없는 한국어 canonical 지정을 유지한다. 사이트맵 상태는 성공이며 발견 URL 수는 `www` 105개·비-www 90개다. 독립 스티커북: https://github.com/ionic2001/diorama-stickerbook.
- 배포 작업은 사용자 지시와 현재 작업의 권한 범위를 따른다. 작업별 브랜치에서 변경·검증을 기록하고 원격 `main` 반영을 두 컴퓨터의 공유 기준으로 삼는다.

## 권장 공유 구조

이 문서 묶음은 같은 GitHub 저장소의 docs/project에서 공동 관리한다. 운영 기능 기준 커밋과 문서 업데이트 커밋은 구분한다.

QK Tool Hub의 코드와 이미지 편집기 내부 스티커는 이 저장소에서 관리한다. 3D 디오라마 스티커북은 독립 저장소에서 관리하며 두 프로젝트의 소스·자산·기획서를 섞지 않는다. 컴퓨터별 브랜치보다 작업별 브랜치를 사용하고 두 컴퓨터가 동시에 같은 브랜치를 수정하지 않도록 작업 소유자를 메모에 남긴다.

## 시작할 때

1. 로컬 변경과 현재 브랜치를 확인한다. 미반영 파일이 있으면 먼저 보존한다.
2. 원격 최신 기록을 가져오고 이어갈 작업 브랜치를 확인한다.
3. 이 메모의 현재 상태·남은 작업·주의점을 읽는다.
4. 의존성과 로컬 실행을 확인한다. 이전 컴퓨터에서 통과한 검사를 현재 컴퓨터의 결과로 기록하지 않는다.

## 마칠 때

1. 변경을 작업 브랜치에 커밋하고 원격에 올린다. 미완성 기능은 main으로 합치지 않는다.
2. 아래 템플릿에 변경 파일·검증 결과·다음 작업을 기록한다.
3. 다음 컴퓨터가 이어갈 브랜치와 커밋을 명시한다. 업로드되지 않은 작업은 공유되지 않는다.

## 인수인계 템플릿

- 기록 시각 / 작성자 또는 컴퓨터:
- 작업명 / 현재 담당 컴퓨터:
- 원격 저장소 / 브랜치 / 커밋:
- 현재 상태: 진행 중 / 검증 대기 / 배포 완료
- 완료한 내용:
- 변경한 주요 파일:
- 남은 작업:
- 실행한 검사와 결과:
- 미리보기 또는 운영 배포 URL:
- 원격에 올리지 않은 파일:
- 다음 작업자가 가장 먼저 할 일:
- 충돌 가능 파일과 주의점:

## 주요 코드 위치

| 영역 | 위치 |
|---|---|
| 라우트 | src/App.tsx |
| 홈 카드·검색 | src/pages/Home.tsx |
| 페이지 메타·schema | src/seo/catalog.ts |
| 추가 설명·공통 번역 | src/seo/content.json |
| 실행 중 메타 갱신 | src/seo/PageSeo.tsx |
| 설명·관련 도구·언어 링크 | src/seo/SeoSections.tsx |
| 언어와 URL | src/i18n/LanguageContext.tsx |
| 이미지 편집기 | src/pages/ImageEditor.tsx |
| 이미지 크기 계산 | src/utils/imageEditor.ts |
| 기존 스티커 자료 | src/pages/stickerLibrary.ts |
| PDF 기능·문구 | src/pages/PdfWorkPage.tsx, src/pages/PdfConverter.tsx, src/i18n/pdfWork.ts, src/i18n/pdfHomeMenu.ts |
| PDF 페이지 작업 | src/utils/pdfOperations.ts |
| 소개·약관·방침 | src/i18n/aboutText.ts, src/i18n/legalText.ts |
| 가이드 콘텐츠·화면 | src/guides/guideContent.ts, src/guides/GuideRenderer.tsx, src/pages/GuidesPage.tsx |
| 가이드 표본·체크리스트 | scripts/build-guide-samples.mjs, public/guide-samples/ |
| 개별 번역 | src/i18n/ 및 src/features/units/text.ts |
| 정적 SEO 생성 | scripts/build-seo.mjs |
| 배포 라우팅 | vercel.json |

## 실행과 검증

```sh
npm ci
npm run dev
npm run build
npm run test:seo
npm run test:pdf
npm run test:guides
npm run test:theme
```

단위 변환 변경 시 node scripts/test-units.cjs를 추가한다. 다른 도구도 변경 범위에 맞게 실제 기능을 검사한다. npm run preview만으로 Vercel의 언어별 쿼리 라우팅을 검증했다고 보지 않는다. 최종 배포에서는 공개 URL로 확인한다.

2026-09-10 과거 검증 환경은 Node 24.15.0이었다. 저장소가 이 버전을 강제 고정한 상태라는 뜻은 아니다. 두 컴퓨터의 Node와 잠금 파일을 맞춘다. package.json의 push 스크립트는 Windows용 cmd /c sync.bat이므로 Mac의 공통 동기화 명령으로 사용하지 않는다.

비밀값은 문서·저장소에 넣지 않는다. 필요한 환경변수의 이름만 공유하고 값은 별도로 설정한다. node_modules와 빌드 결과 대신 소스와 잠금 파일을 공유한다.

## 프로젝트 경계

- `src/pages/stickerLibrary.ts`와 이미지 편집기 안의 스티커 기능은 QK Tool Hub 범위다.
- 3D 공간, 테마 덱, 디오라마 스티커 자산과 제작 파이프라인은 `ionic2001/diorama-stickerbook` 범위다.
- 독립 프로젝트 변경을 QK Tool Hub에 복사하지 않는다. 두 제품을 연결하려면 공개 주소가 확정된 뒤 외부 링크로 검토한다.
