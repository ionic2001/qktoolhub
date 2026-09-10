# 두 컴퓨터 개발 인수인계 메모

## 현재 인수인계

- 배포 원칙: 변경 사항은 로컬에서 먼저 확인하고 사용자 확인 후 배포한다.

- 작업 기준 main: c3dd57b8948d491fdd0003b40d92e15d50b9949b
- 저장소: https://github.com/ionic2001/qktoolhub
- 현재 작업 브랜치: `main` (PR #3 병합 및 운영 배포 완료)
- 최근 완료: 환율 FAQ와 수수료 예시 보강, 개인정보 범주 구분, 홈에는 운영 중인 도구 8개만 표시, 5개 언어 소개·문의 페이지 추가. 빌드·전체 스크립트 검사와 운영 화면 확인 통과.
- 다음 작업: QK Tool Hub 8개 도구의 모바일 회귀와 Search Console 색인 상태 확인.
- 사용자 확인 사항: sitemap 재제출 완료.
- 독립 프로젝트: https://github.com/ionic2001/diorama-stickerbook (`main` 0500fd9).

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
| 기존 스티커 자료 | src/pages/stickerLibrary.ts |
| 개별 번역 | src/i18n/ 및 src/features/units/text.ts |
| 정적 SEO 생성 | scripts/build-seo.mjs |
| 배포 라우팅 | vercel.json |

## 실행과 검증

```sh
npm ci
npm run dev
npm run build
npm run test:seo
```

단위 변환 변경 시 node scripts/test-units.cjs를 추가한다. 다른 도구도 변경 범위에 맞게 실제 기능을 검사한다. npm run preview만으로 Vercel의 언어별 쿼리 라우팅을 검증했다고 보지 않는다. 최종 배포에서는 공개 URL로 확인한다.

실제 검증 환경은 Node 24.15.0이었다. 저장소가 이 버전을 강제 고정한 상태라는 뜻은 아니다. 두 컴퓨터의 Node와 잠금 파일을 맞춘다. package.json의 push 스크립트는 Windows용 cmd /c sync.bat이므로 Mac의 공통 동기화 명령으로 사용하지 않는다.

비밀값은 문서·저장소에 넣지 않는다. 필요한 환경변수의 이름만 공유하고 값은 별도로 설정한다. node_modules와 빌드 결과 대신 소스와 잠금 파일을 공유한다.

## 프로젝트 경계

- `src/pages/stickerLibrary.ts`와 이미지 편집기 안의 스티커 기능은 QK Tool Hub 범위다.
- 3D 공간, 테마 덱, 디오라마 스티커 자산과 제작 파이프라인은 `ionic2001/diorama-stickerbook` 범위다.
- 독립 프로젝트 변경을 QK Tool Hub에 복사하지 않는다. 두 제품을 연결하려면 공개 주소가 확정된 뒤 외부 링크로 검토한다.
