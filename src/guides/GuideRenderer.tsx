import { guideByPath, guideIndexMeta, guides, type Guide } from './guideContent';

function ArticleCard({ guide }: { guide: Guide }) {
  return <article className="guide-card glass-card">
    <span className="badge">{guide.category}</span>
    <h2><a href={guide.path}>{guide.title}</a></h2>
    <p>{guide.description}</p>
    <div className="guide-card-meta"><span>검토일 {guide.updated}</span><span>{guide.readingTime}</span></div>
  </article>;
}

export function GuideContent({ path }: { path: string }) {
  if (path === '/guides') return <main className="guide-index">
    <header className="guide-index-header"><span className="badge">QK TOOL HUB GUIDES</span><h1>{guideIndexMeta.title}</h1><p>{guideIndexMeta.description}</p></header>
    <section aria-labelledby="guide-list-title"><h2 id="guide-list-title">직접 확인한 최신 가이드</h2><div className="guide-grid">{guides.map(guide => <ArticleCard key={guide.path} guide={guide}/>)}</div></section>
    <section className="guide-standard glass-card"><h2>가이드 작성 기준</h2><p>도구의 실제 구현과 재현 가능한 표본을 기준으로 작성합니다. 확인한 범위와 확인하지 않은 범위를 구분하고, 현재 제공하지 않는 기능은 지원한다고 표현하지 않습니다.</p><ul><li>테스트 조건과 확인 날짜를 공개합니다.</li><li>결과 파일을 다시 열어 페이지 수·순서·크기·회전을 확인합니다.</li><li>기능이나 제한이 바뀌면 본문과 검토일을 함께 갱신합니다.</li></ul></section>
  </main>;

  const guide = guideByPath(path);
  if (!guide) return null;
  return <main className="guide-article">
    <nav className="guide-breadcrumb" aria-label="Breadcrumb"><a href="/">QK Tool Hub</a><span>/</span><a href="/guides">활용 가이드</a><span>/</span><span aria-current="page">{guide.title}</span></nav>
    <article>
      <header className="guide-hero"><span className="badge">{guide.category}</span><h1>{guide.title}</h1><p className="guide-summary">{guide.summary}</p><div className="guide-meta"><span>작성·검토: <a href="/about">QK Tool Hub 운영팀</a></span><span>작성 {guide.published}</span><span>최종 확인 {guide.updated}</span><span>{guide.readingTime}</span></div></header>
      <aside className="guide-method" aria-label="검증 방법"><strong>검증 방법</strong><p>{guide.method}</p></aside>
      {guide.sections.map(section => <section className="guide-section" key={section.title}><h2>{section.title}</h2>{section.paragraphs?.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{section.table && <div className="guide-table-wrap"><table><caption>{section.table.caption}</caption><thead><tr>{section.table.headers.map(header => <th key={header} scope="col">{header}</th>)}</tr></thead><tbody>{section.table.rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => cellIndex === 0 ? <th key={cellIndex} scope="row">{cell}</th> : <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>}{section.bullets && <ul>{section.bullets.map(item => <li key={item}>{item}</li>)}</ul>}</section>)}
      {guide.downloads && <section className="guide-section"><h2>자료 다운로드</h2><p>아래 자료는 이 글의 검증에 사용한 개인정보 없는 표본 또는 작업용 체크리스트입니다.</p><div className="guide-downloads">{guide.downloads.map(item => <a key={item.href} href={item.href} download><strong>{item.label}</strong><span>{item.detail}</span></a>)}</div></section>}
      <section className="guide-related glass-card"><h2>관련 도구</h2><div>{guide.relatedTools.map(item => <a className="btn-tool" key={item.path} href={item.path}>{item.label}</a>)}</div></section>
      <nav className="guide-more" aria-label="다른 가이드"><h2>다른 검증 기록</h2><ul>{guides.filter(item => item.path !== guide.path).map(item => <li key={item.path}><a href={item.path}>{item.title}</a></li>)}</ul></nav>
    </article>
  </main>;
}
