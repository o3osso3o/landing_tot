import React, { useEffect, useState } from "react";

// Replace these paths when the final portfolio images are available.
export const STREAMING_IMAGE_PATHS = {
  personaJiwon: "/assets/persona-kim-jiwon.jpg",
  personaYeonwoo: "/assets/persona-lee-yeonwoo.jpg",
  moodboard: "/assets/moodboard.jpg",
  flowchart: "/assets/user-flow.jpg",
  wireframe: "/assets/wireframe.jpg",
  prototype: "/assets/final-prototype.jpg",
};

const FIGMA_PROTOTYPE_URL = "https://www.figma.com/proto/oOpFfqzfkspTri2CmjFpjr/%EB%85%B8%EC%88%98%EC%A7%84-%EA%B0%9C%EC%9D%B8%EB%AA%A8%EB%B0%94%EC%9D%BC%EC%95%B1?node-id=276-2763&viewport=52%2C-722%2C0.21&t=kVaQooVMiNmIgVGV-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=276%3A2763&page-id=200%3A49";

const overview = [
  ["Project Type", "개인 UI/UX 프로젝트"],
  ["Scope", "Lean Canvas, Persona, Hypothesis, MVP, IA/Flow, Wireframe, Prototype"],
  ["Tool", "Figma, FigJam, Midjourney, Premiere"],
  ["Role", "UX Research, UX Planning, UI Design, Prototype"],
];

const backgroundStats = [
  ["62.9%", "생활체육 참여율"],
  ["40.5%", "걷기"],
  ["17.1%", "등산"],
  ["+5.0%p", "등산 전년 대비"],
];

const problemSteps = ["걷고 싶다", "코스를 찾는다", "후기를 확인한다", "음악을 고른다", "선택이 길어진다", "외출을 미루거나 포기한다"];

const opportunity = [
  ["01", "반복 사용 기회 상실", "외출할 때마다 켜는 앱이 되지 못하면 재방문과 습관형 사용자를 만들기 어렵습니다."],
  ["02", "상황 기반 추천 데이터 부족", "어떤 상황에서 어떤 코스와 음악을 선택하는지 쌓이지 않으면 추천 고도화가 어렵습니다."],
  ["03", "제휴 수익 기회 상실", "실제 외출이 일어나야 주변 상권, 카페, 편의시설과의 연결도 가능해집니다."],
];

const solution = [
  ["01", "상황 맞춤 즉시 추천", "목적, 동행자, 체력, 분위기를 선택하면 지금 걷기 좋은 워크세션을 추천합니다."],
  ["02", "코스 + 음악 통합 추천", "지도앱과 음악앱을 오가지 않고 코스와 플레이리스트를 한 번에 선택합니다."],
  ["03", "개인화와 루틴 형성", "퇴근 후 30분 걷기처럼 반복되는 상황을 기억하고 다시 꺼내기 쉽게 만듭니다."],
];

const features = [
  ["01", "상황 선택 체크리스트", "짧은 질문으로 오늘의 산책 조건을 고릅니다."],
  ["02", "추천 워크세션", "코스와 플레이리스트를 하나의 카드로 추천합니다."],
  ["03", "원탭 재생", "결정을 끝낸 순간 바로 음악을 시작합니다."],
  ["04", "세션 피드백", "종료 후 별점으로 다음 추천을 더 정교하게 만듭니다."],
  ["05", "보관함과 루틴 기억", "자주 찾는 산책 경험을 다시 꺼내기 쉽게 저장합니다."],
  ["06", "멤버십 기반 개인화", "사용 흐름을 해치지 않는 확장 모델을 제안합니다."],
];

const membership = [
  ["Free", "무료 회원", ["기본 워크세션", "저작권 없는 플레이리스트", "퍼블릭 도메인 기반 음악"]],
  ["Plus", "플러스 회원", ["고급 플레이리스트 추천", "기록 / 리포트 기능", "최근 루틴 기억"]],
  ["Pro", "프로 회원", ["광고 없음", "초개인화 추천", "상황별 원탭 재추천", "장기 루틴 기억", "프리미엄 로컬 큐레이션", "제휴 혜택"]],
];

const expected = [
  ["01", "반복 사용", ["코스 선택률", "플레이리스트 재생 시작률", "한 달 2회 이상 재방문 비율"]],
  ["02", "추천 신뢰", ["개인화 추천 클릭률", "원탭 재생 사용률", "다시 듣기 비율"]],
  ["03", "서비스 포지셔닝", ["걷기 전 가장 먼저 실행한 앱 비율", "기존 음악앱 대신 사용한 비율"]],
  ["04", "제휴 가능성", ["평균 청취 시간", "세션 완료율", "제휴 클릭률", "제휴 페이지 진입률"]],
];

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Section({ id, eyebrow, title, intro, className = "", children }) {
  return (
    <section id={id} className={`streaming-section ${className}`}>
      <div className="streaming-container">
        <header className="streaming-section__header streaming-reveal">
          {eyebrow && <p className="streaming-eyebrow">{eyebrow}</p>}
          <h2>{title}</h2>
          {intro && <p className="streaming-section__intro">{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}

function ImagePanel({ src, alt, label, kind = "default", className = "" }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <figure className={`streaming-image streaming-image--${kind} ${className}`}>
      <div className="streaming-image__placeholder" aria-hidden="true">
        <span>{label}</span>
        <small>이미지 경로 연결 대기</small>
      </div>
      <img
        className={loaded ? "streaming-image__asset is-loaded" : "streaming-image__asset"}
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(false)}
      />
    </figure>
  );
}

function List({ items }) {
  return <ul className="streaming-list">{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

function ExternalPrototypeLink({ className = "", children = "Figma 프로토타입 실행" }) {
  return <a className={className} href={FIGMA_PROTOTYPE_URL} target="_blank" rel="noreferrer">{children}</a>;
}

function BrandCharacter() {
  return (
    <div className="streaming-character" aria-hidden="true">
      <span className="streaming-character__hair" />
      <span className="streaming-character__ear streaming-character__ear--left" />
      <span className="streaming-character__ear streaming-character__ear--right" />
      <span className="streaming-character__eye streaming-character__eye--left" />
      <span className="streaming-character__eye streaming-character__eye--right" />
      <span className="streaming-character__smile" />
    </div>
  );
}

function PhoneMockup({ screen = "recommend", compact = false }) {
  return (
    <div className={`streaming-phone ${compact ? "streaming-phone--compact" : ""}`}>
      <div className="streaming-phone__notch" />
      <div className={`streaming-phone__screen streaming-phone__screen--${screen}`}>
        {screen === "splash" && (
          <>
            <div className="streaming-splash__sky" />
            <div className="streaming-splash__hill" />
            <div className="streaming-splash__content"><BrandCharacter /><strong>Track</strong><small>on your <b>Track</b></small><span>시작하기</span></div>
          </>
        )}
        {screen === "select" && (
          <div className="streaming-app">
            <header><b>Tot</b><small>3 / 3</small><i>×</i></header>
            <div className="streaming-progress"><span /><span /><span /></div>
            <h4>지금 듣고 싶은 무드</h4>
            <div className="streaming-app__options">
              {["기분 전환하고 싶어요", "집중하고 싶어요", "사색하고 싶어요", "에너지를 얻고 싶어요", "마음을 진정시키고 싶어요"].map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
        )}
        {screen === "recommend" && (
          <div className="streaming-app">
            <header><b>Tot</b><i>×</i></header>
            <h4 className="streaming-app__english">Pick your Track</h4>
            <div className="streaming-app__chips"><span>혼자</span><span>저녁 산책</span><span>기분 전환</span></div>
            <small className="streaming-app__help">지원님에게 맞는 워크 세션을 찾았어요</small>
            <article className="streaming-session-card">
              <div className="streaming-session-card__photo" />
              <strong>한강공원 노을 코스</strong>
              <small>서둘러 걸어서 더해진 한강공원.<br />차분하고 느긋한 저녁 산책에 잘 어울려요.</small>
              <em>⌖ 반포 한강공원 · ◷ 30분</em>
              <div><span>#그루브</span><span>#저녁</span><span>#R&B</span></div>
              <footer><b>♡ 저장</b><b>▶ 바로 재생</b></footer>
            </article>
          </div>
        )}
        {screen === "player" && (
          <div className="streaming-player">
            <header><b>Tot</b><span>한강공원 노을 코스</span><i>⋮</i></header>
            <article>
              <div className="streaming-player__cover" />
              <small>1 / 22</small><strong>GOT ME GOT U</strong><em>Crush</em>
              <p>⌖ 반포 한강공원<br />◷ 30분</p>
            </article>
            <div className="streaming-player__bar"><span /></div>
            <footer>↝　◀　<b>▶</b>　▶　↻</footer>
          </div>
        )}
      </div>
    </div>
  );
}

function PrototypeShowcase() {
  return (
    <div className="streaming-prototype-stage streaming-reveal">
      <PhoneMockup screen="splash" compact />
      <PhoneMockup screen="select" compact />
      <PhoneMockup screen="recommend" />
      <PhoneMockup screen="player" compact />
    </div>
  );
}

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".streaming-reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="streaming-page">
      <nav className="streaming-nav" aria-label="프로젝트 탐색">
        <button type="button" className="streaming-nav__brand" onClick={() => scrollToId("hero")}>
          Track <span>on</span> your Track
        </button>
        <button type="button" className="streaming-nav__cta" onClick={() => scrollToId("prototype")}>Prototype</button>
      </nav>

      <section id="hero" className="streaming-hero">
        <div className="streaming-container streaming-hero__grid">
          <div className="streaming-hero__copy streaming-reveal">
            <p className="streaming-eyebrow">Walking streaming app · UX/UI case study</p>
            <h1>Track <span>on</span><br />your Track</h1>
            <p className="streaming-hero__lead">걷고 싶은 순간, 코스와 음악을 한 번에 추천하는 걷기 전용 스트리밍 앱</p>
            <p className="streaming-hero__text">목적, 동행자, 체력, 분위기에 맞춘 워크세션 추천부터 음악 재생과 산책 실행까지 자연스럽게 이어지도록 설계했습니다.</p>
            <div className="streaming-tags">
              {["#UX Planning", "#Streaming App", "#Walking Experience", "#Figma Prototype", "#Lean Canvas"].map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <div className="streaming-actions">
              <button type="button" className="streaming-button streaming-button--primary" onClick={() => scrollToId("problem")}>문제 정의 보기</button>
              <button type="button" className="streaming-button streaming-button--ghost" onClick={() => scrollToId("prototype")}>프로토타입 보기</button>
            </div>
          </div>
          <div className="streaming-hero__visual streaming-reveal">
            <div className="streaming-hero__orb" />
            <PhoneMockup screen="recommend" />
            <div className="streaming-hero__note">Course + Music<br /><strong>One tap play</strong></div>
          </div>
        </div>
      </section>

      <Section id="overview" eyebrow="01 · Overview" title="걷기 전의 선택을, 하나의 흐름으로." intro="이 프로젝트는 걷기와 가벼운 등산이 반복되는 생활형 행동이라는 점에 주목해 시작했습니다. 외출 전 여러 앱을 오가며 겪는 선택 피로를 줄이고자 했습니다.">
        <div className="streaming-grid streaming-grid--4 streaming-reveal">
          {overview.map(([title, text]) => <article className="streaming-card streaming-card--overview" key={title}><p>{title}</p><strong>{text}</strong></article>)}
        </div>
      </Section>

      <Section id="background" eyebrow="02 · Background" title="걷기는 가장 쉽게 반복되는 생활형 행동입니다." intro="걷기와 가벼운 등산은 진입장벽이 낮아 누구나 쉽게 시작하고 반복할 수 있습니다. 하지만 현재 서비스들은 이런 반복 행동을 습관형 사용으로 연결하기보다 필요할 때 한 번 검색해서 쓰는 도구에 머무르는 경우가 많습니다." className="streaming-section--sky">
        <div className="streaming-grid streaming-grid--4 streaming-reveal">
          {backgroundStats.map(([value, label]) => <article className="streaming-stat" key={label}><strong>{value}</strong><span>{label}</span></article>)}
        </div>
        <p className="streaming-caption streaming-reveal">출처: 문체부 2025년 조사 기준</p>
      </Section>

      <Section id="market" eyebrow="03 · Market gap" title="음악도 많고, 코스 정보도 많지만 외출을 결정해주는 서비스는 부족합니다.">
        <div className="streaming-market streaming-reveal">
          <article className="streaming-card streaming-market__card">
            <span className="streaming-card__chip">Music</span><h3>Streaming Service</h3><p>Spotify, Apple Music, YouTube Music, Melon 등</p>
            <List items={["분위기별 플레이리스트 제공", "상황별 음악 추천", "음악 감상 경험에 강점"]} />
          </article>
          <div className="streaming-market__plus">+</div>
          <article className="streaming-card streaming-market__card">
            <span className="streaming-card__chip streaming-card__chip--green">Course</span><h3>Outdoor Service</h3><p>AllTrails, 지도앱, 블로그, SNS 등</p>
            <List items={["코스 정보 제공", "난이도, 후기, 조건 검색", "장소 탐색에 강점"]} />
          </article>
        </div>
        <blockquote className="streaming-quote streaming-reveal">각 서비스는 강하지만, <strong>“오늘 어디를 걷고 무엇을 들을지”</strong>를 한 번에 결정해주지는 못합니다.</blockquote>
      </Section>

      <Section id="problem" eyebrow="04 · Problem definition" title="사용자는 외출 전 여러 앱 사이에서 흩어집니다." intro="지도, 블로그, SNS, 스트리밍 앱을 오가며 정보를 찾는 동안 선택 피로가 생기고 실제 행동으로 이어지지 못합니다." className="streaming-section--dark">
        <div className="streaming-steps streaming-reveal">
          {problemSteps.map((step, index) => <article className="streaming-step" key={step}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong></article>)}
        </div>
        <p className="streaming-emphasis streaming-reveal">정보는 많지만, 외출을 결정해주는 하나의 서비스는 없습니다.</p>
      </Section>

      <Section id="opportunity" eyebrow="05 · Business opportunity" title="선택 단계에서 끊기면, 비즈니스 기회도 함께 사라집니다.">
        <div className="streaming-grid streaming-grid--3 streaming-reveal">
          {opportunity.map(([number, title, text]) => <article className="streaming-card streaming-card--number" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
        <blockquote className="streaming-quote streaming-reveal">이 서비스의 기회는 단순 음악 추천이 아니라, <strong>“외출 전 선택”과 “실제 실행”</strong>을 연결하는 데 있습니다.</blockquote>
      </Section>

      <Section id="persona" eyebrow="06 · Persona" title="두 가지 사용 상황을 중심으로 퍼소나를 정의했습니다." className="streaming-section--mint">
        <div className="streaming-grid streaming-grid--2 streaming-reveal">
          <article className="streaming-persona">
            <ImagePanel src={STREAMING_IMAGE_PATHS.personaJiwon} alt="1순위 퍼소나 김지원 이미지" label="Persona 01 · 김지원" kind="persona" />
            <div><p className="streaming-eyebrow">Primary Persona</p><h3>김지원 <small>25세 · 학생</small></h3><List items={["혼자 산책하는 루틴형 사용자", "기분 전환과 생각 정리가 목적", "새로운 코스보다 빠른 선택이 중요"]} /><strong className="streaming-persona__need">“선택 피로 없이 지금 기분에 맞는 음악을 바로 듣고 싶다.”</strong></div>
          </article>
          <article className="streaming-persona">
            <ImagePanel src={STREAMING_IMAGE_PATHS.personaYeonwoo} alt="2순위 퍼소나 이연우 이미지" label="Persona 02 · 이연우" kind="persona" />
            <div><p className="streaming-eyebrow">Secondary Persona</p><h3>이연우 <small>31세 · 직장인</small></h3><List items={["친구나 연인과 걷는 탐색형 사용자", "분위기와 새로움 발견이 중요", "부담 없는 코스를 선호"]} /><strong className="streaming-persona__need">“함께 걷는 순간에 어울리는 코스와 음악을 쉽게 찾고 싶다.”</strong></div>
          </article>
        </div>
      </Section>

      <Section id="benefits" eyebrow="07 · User outcomes" title="사용자는 더 빠르게 고르고, 더 쉽게 나갈 수 있어야 합니다.">
        <div className="streaming-grid streaming-grid--2 streaming-reveal">
          <article className="streaming-card streaming-outcome"><h3>김지원 · Routine Walker</h3><h4>Outcomes</h4><List items={["빠른 상황 맞춤 재생", "혼자 걷는 시간의 몰입감 강화", "코스와 음악을 한 번에 선택", "산책 실행 증가"]} /><h4>Benefits</h4><List items={["결정 피로 감소", "빠른 감정 회복", "나를 정리하는 시간으로 전환"]} /></article>
          <article className="streaming-card streaming-outcome"><h3>이연우 · Social Explorer</h3><h4>Outcomes</h4><List items={["동행 맞춤 선택", "새로움 발견", "분위기 있는 산책 경험 강화", "탐색 흐름 유지"]} /><h4>Benefits</h4><List items={["더 즐거운 동행 경험", "여가 만족도 향상", "기억에 남는 순간 경험"]} /></article>
        </div>
      </Section>

      <Section id="hypothesis" eyebrow="08 · Main hypothesis" title="가장 중요한 가설" className="streaming-section--blue">
        <blockquote className="streaming-hypothesis streaming-reveal">걷고 싶지만 지금 내 기분에 맞는 음악을 바로 고르기 어려운 사용자가 <strong>상황 맞춤 즉시 재생</strong> 기능을 통해 선택 피로를 줄이면, 재생 시작률과 산책 실행률이 증가할 것이라고 믿습니다.</blockquote>
        <div className="streaming-flow streaming-reveal">{["나가서 걷고 싶음", "음악을 고르기 번거로움", "산책을 미루거나 포기", "상황 맞춤 즉시 재생"].map((item) => <span key={item}>{item}</span>)}</div>
      </Section>

      <Section id="solution" eyebrow="09 · Solution direction" title="해결 방향은 ‘즉시 추천’, ‘통합 선택’, ‘루틴 기억’입니다.">
        <div className="streaming-grid streaming-grid--3 streaming-reveal">
          {solution.map(([number, title, text]) => <article className="streaming-card streaming-card--solution" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </Section>

      <Section id="features" eyebrow="10 · Key features" title="핵심 기능" className="streaming-section--sky">
        <div className="streaming-grid streaming-grid--3 streaming-reveal">
          {features.map(([number, title, text]) => <article className="streaming-card streaming-feature" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </Section>

      <Section id="mvp" eyebrow="11 · MVP scope" title="MVP는 산책 실행까지 이어지는 최소 흐름에 집중했습니다." intro="모든 기능을 구현하기보다, 걷기 전 선택 피로를 줄이고 바로 재생까지 이어지는지 검증하는 데 집중했습니다.">
        <div className="streaming-flow streaming-flow--large streaming-reveal">{["상황 선택", "워크세션 추천", "음악 재생", "세션 종료", "피드백 기록"].map((item) => <span key={item}>{item}</span>)}</div>
        <div className="streaming-grid streaming-grid--2 streaming-reveal">
          <article className="streaming-card"><h3>Included</h3><List items={["상황 선택 체크리스트", "추천 워크세션", "재생 화면", "종료 후 별점 피드백"]} /></article>
          <article className="streaming-card"><h3>Later</h3><List items={["고도화된 구독 모델", "장기 루틴 분석", "로컬 제휴 쿠폰", "상세 리포트"]} /></article>
        </div>
      </Section>

      <Section id="flow" eyebrow="12 · IA / User flow" title="사용 흐름 설계" intro="로그인 이후 상황 선택을 통해 추천 워크세션으로 진입하고, 홈·검색·보관함·마이페이지에서 반복 사용과 탐색, 루틴 기억, 멤버십 관리를 이어갑니다." className="streaming-section--visual">
        <ImagePanel src={STREAMING_IMAGE_PATHS.flowchart} alt="Track on your Track 서비스 IA 및 사용자 흐름도" label="IA / User Flow Chart" kind="wide" className="streaming-reveal" />
        <div className="streaming-tags streaming-tags--center streaming-reveal">{["홈", "검색", "보관함", "마이페이지"].map((tag) => <span key={tag}>{tag}</span>)}</div>
      </Section>

      <Section id="moodboard" eyebrow="13 · Moodboard" title="가볍게 나가고 싶어지는 산뜻한 분위기" intro="과한 운동성보다 가볍게 밖으로 나가고 싶어지는 감정에 초점을 맞췄습니다. 블루와 그린을 중심으로 산책, 잔디, 하늘, 음악의 이미지를 연결했습니다.">
        <ImagePanel src={STREAMING_IMAGE_PATHS.moodboard} alt="블루와 그린 컬러를 중심으로 구성한 무드보드" label="Visual Moodboard" kind="wide" className="streaming-reveal" />
        <div className="streaming-tags streaming-tags--center streaming-reveal">{["산뜻함", "가벼운 외출", "리듬감", "발견", "부드러운 캐릭터", "블루 & 그린"].map((tag) => <span key={tag}>{tag}</span>)}</div>
      </Section>

      <Section id="wireframe" eyebrow="14 · Wireframe" title="와이어프레임에서 핵심 흐름을 먼저 검증했습니다." intro="상황 선택, 추천 워크세션, 재생, 종료 피드백과 주요 탭 구조를 먼저 설계하고 사용자가 어떤 흐름으로 산책 실행까지 이동하는지 확인했습니다." className="streaming-section--visual">
        <ImagePanel src={STREAMING_IMAGE_PATHS.wireframe} alt="Track on your Track 핵심 화면 와이어프레임" label="Wireframe Collection" kind="wide" className="streaming-reveal" />
        <div className="streaming-grid streaming-grid--4 streaming-reveal">
          {["상황 선택이 부담스럽지 않은가", "추천 결과까지 빠르게 도달하는가", "재생 행동이 명확한가", "피드백이 다음 추천으로 이어지는가"].map((item) => <article className="streaming-card streaming-card--mini" key={item}>{item}</article>)}
        </div>
      </Section>

      <Section id="prototype" eyebrow="15 · Final prototype" title="최종 프로토타입" intro="온보딩, 상황 선택, 추천 워크세션, 재생, 세션 피드백, 홈, 검색, 보관함, 마이페이지와 멤버십 구조까지 구현했습니다.">
        <PrototypeShowcase />
        <div className="streaming-tags streaming-tags--center streaming-reveal">{["상황 기반 추천", "워크세션 카드", "재생 UI", "별점 피드백", "루틴 보관함", "멤버십 화면"].map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="streaming-actions streaming-actions--center streaming-reveal">
          <ExternalPrototypeLink className="streaming-button streaming-button--primary">Figma 프로토타입 직접 실행 ↗</ExternalPrototypeLink>
        </div>
      </Section>

      <Section id="membership" eyebrow="16 · Membership model" title="반복 사용과 구독 전환을 고려한 멤버십 구조" intro="아래 구성은 실제 성과가 아니라, 서비스의 반복 사용 흐름을 확장하기 위한 수익 모델 제안입니다." className="streaming-section--mint">
        <div className="streaming-grid streaming-grid--3 streaming-reveal">
          {membership.map(([badge, title, items]) => <article className={`streaming-card streaming-plan streaming-plan--${badge.toLowerCase()}`} key={badge}><span>{badge}</span><h3>{title}</h3><List items={items} /></article>)}
        </div>
      </Section>

      <Section id="expected" eyebrow="17 · Expected outcomes" title="기대할 수 있는 변화" intro="이 지표들은 실제 성과가 아니라, 서비스 검증을 위해 설정한 기대 지표와 측정 기준입니다.">
        <div className="streaming-grid streaming-grid--4 streaming-reveal">
          {expected.map(([number, title, items]) => <article className="streaming-card streaming-metric" key={number}><span>{number}</span><h3>{title}</h3><List items={items} /></article>)}
        </div>
      </Section>

      <section id="conclusion" className="streaming-conclusion">
        <div className="streaming-container streaming-reveal">
          <p className="streaming-eyebrow">18 · Conclusion</p>
          <h2>이 프로젝트를 통해<br />확인하고 싶었던 것</h2>
          <p>음악 추천 앱을 하나 더 만드는 것이 아니라, 걷고 싶은 순간의 선택 피로를 줄이고 코스와 음악을 연결해 실제 외출 실행까지 돕는 경험을 설계하는 데 집중했습니다.</p>
          <blockquote>Track on your Track은 사용자가 <strong>“걸을까?”</strong>라고 생각한 순간, 가장 빠르게 <strong>“바로 나가볼까?”</strong>로 이어지게 만드는 걷기 전용 스트리밍 경험입니다.</blockquote>
          <div className="streaming-actions streaming-actions--center">
            <ExternalPrototypeLink className="streaming-button streaming-button--primary">프로토타입 보러가기 ↗</ExternalPrototypeLink>
            <button type="button" className="streaming-button streaming-button--ghost" onClick={() => scrollToId("problem")}>기획 과정 다시 보기</button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
