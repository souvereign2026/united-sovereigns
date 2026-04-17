<script>
  import { page } from '$app/stores';
  import { goals, docs } from '$lib/store.js';

  let id = $derived($page.params.id);
  let goal = $derived(goals.find(g => g.id === id));
  let relatedDocs = $derived($docs.filter(d => goal?.docs?.includes(d.id)));

  let nextGoal = $derived(() => {
    const idx = goals.findIndex(g => g.id === id);
    return goals[(idx + 1) % goals.length];
  });

  let prevGoal = $derived(() => {
    const idx = goals.findIndex(g => g.id === id);
    return goals[(idx - 1 + goals.length) % goals.length];
  });

  const features = {
    '1':  ['Direct soul-to-soul exchange', 'No broker or gatekeeper', 'Full accord between parties', 'Removal of extractive layers'],
    '2':  ['The living body needs no outside healing', 'Clean food, clean water, clean air — the body restores itself', 'Every soul knows its own body — its signals, its needs', 'The perfect state is the natural state — chosen, not prescribed'],
    '3':  ['Open ledgers for all', 'Open record of decisions', 'Transparent value exchange', 'Open ledger that no soul can alter alone'],
    '4':  ['The knowledge to raise a roof belongs to all', 'Circle infrastructure', 'No prohibitive permitting', 'Self-determined construction'],
    '5':  ['Circle energy access', 'Wind, water, and biomass', 'Decentralised power grids', 'No energy monopolies'],
    '6':  ['Soil regeneration', 'Biological growing', 'Composting and aquaponics', 'Topsoil preservation'],
    '7':  ['Food as the land grew it — nothing added', 'Honest provenance', 'Growing and sharing is the living way', 'Sacred shared meals'],
    '8':  ['Water as open land', 'Protected aquifers', 'No water enclosure', 'Clean access for all'],
    '9':  ['Clean air — what the living sky has always been', 'No atmospheric pollution', 'Open sky', 'Biological atmosphere protection'],
    '10': ['All knowing placed openly where any soul can reach it', 'Living knowing kept open and passed on', 'Rare text recovery', 'No knowledge gatekeepers'],
    '11': ['Elder-to-youth transmission', 'Apprenticeship learning', 'Teaching and learning outside all institutions', 'Living craft knowing'],
    '12': ['Land access for all', 'Anti-enclosure principles', 'Circle tending', 'Growing land for all'],
    '13': ['Direct circle gathering', 'Open circle of living souls', 'Accord by will', 'No representative proxy'],
    '14': ['Locating living traditions that never broke', 'Bringing the knowledge back', 'Elder circle roles', 'Traditional knowing transfer'],
    '15': ['Growth by example', 'Open invitation only', 'Recording what works. Giving it openly.', 'No forced conversion'],
    '16': ['Measure by what thrives', 'Soil and living vitality', 'Cultural richness', 'Living well-being as the measure'],
  };

  const relatedGoalIds = {
    '1':  ['4','10','13'], '2':  ['7','8','9'],   '3':  ['1','13','16'],
    '4':  ['5','6','12'],  '5':  ['4','6','9'],   '6':  ['7','8','12'],
    '7':  ['6','8','11'],  '8':  ['5','6','9'],   '9':  ['8','5','12'],
    '10': ['11','1','15'], '11': ['10','2','14'], '12': ['4','6','9'],
    '13': ['1','3','14'],  '14': ['11','13','7'], '15': ['10','1','13'],
    '16': ['6','7','8'],
  };

  let relatedGoals = $derived(
    (relatedGoalIds[id] ?? []).map(rid => goals.find(g => g.id === rid)).filter(Boolean)
  );

  const news = {
    '1':  [
      { date: '2025-03', title: 'Soul-to-soul exchange grows 40% in Southeast Asia', source: 'Open Exchange Review' },
      { date: '2025-01', title: 'New tally protocols remove extractive layers in 12 solvens', source: 'Living Way Journal' },
    ],
    '2':  [
      { date: '2025-03', title: 'Solvens reporting full vitality on clean food and water alone', source: 'Living Way Journal' },
      { date: '2025-01', title: 'Chronic illness rates fall in solvens adopting clean living', source: 'Circle Quarterly' },
    ],
    '3':  [
      { date: '2025-02', title: 'Open ledger trial launches in three solvens', source: 'Circle Report' },
      { date: '2024-11', title: 'Living tally systems reduce dispute rates by 60%', source: 'Circle Quarterly' },
    ],
    '6':  [
      { date: '2025-03', title: 'Aquaponics systems double yields in dry regions', source: 'Soil & Water Journal' },
      { date: '2025-01', title: 'Regenerative growing shows 30% topsoil increase over 5 years', source: 'Living Soil Review' },
    ],
    '10': [
      { date: '2025-02', title: 'Open Archive adds 2,000 rare writings', source: 'Archive Bulletin' },
      { date: '2024-12', title: 'Open knowing network reaches 50,000 living souls', source: 'Knowing Circle' },
    ],
  };

  let goalNews = $derived(news[id] ?? [
    { date: '2025-03', title: `${goal?.title} — circle report published`, source: 'Living Way Journal' },
    { date: '2025-01', title: `Progress on ${goal?.title} across 8 regions`, source: 'Circle Quarterly' },
  ]);
</script>

<svelte:head>
  <title>{goal?.title ?? 'Goal'} — Living Way Goals</title>
</svelte:head>

{#if !goal}
  <div class="not-found">
    <p>Goal not found.</p>
    <a href="/">← Back to Archive</a>
  </div>
{:else}
  <div class="goal-page">

    <!-- Hero -->
    <div class="hero" style="--c1:{goal.color}; --c2:{goal.textColor}">
      <div class="hero-bg" style="background:{goal.gradient ?? goal.color}"></div>
      <div class="hero-inner">
        <div class="hero-nav">
          <a href="/" class="nav-pill">Goals</a>
          <div class="hero-nav-right">
            <a href="/goals/{nextGoal().id}" class="nav-pill">Next →</a>
          </div>
        </div>
        <div class="hero-content">
          <div class="goal-badge">Goal {goal.id}</div>
          <h1>{goal.title}</h1>
          <div class="title-bar"></div>
          <p class="hero-summary">{goal.summary}</p>
        </div>
      </div>
    </div>

   <!-- ── Infographic Poster ── -->
<section class="section poster-section">
  <div class="section-inner">
    <div class="section-label">Overview</div>
    <div class="poster-wrap">

      <!-- Left: infographic card -->
      <div class="infographic" style="background:{goal.gradient ?? goal.color}; color:{goal.textColor}">

        <!-- Header -->
        <div class="info-header">
          <div class="info-logo">
            <img src="/united_sovereigns_logo_emblem.svg" alt="US" style="width:36px;height:36px;filter:brightness(10)"/>
          </div>
          <div class="info-header-text">
            <span class="info-report">LIVING WAY REPORT 2026</span>
          </div>
          <div class="info-corner"></div>
        </div>

        <!-- Circle of goals -->
        <div class="info-circle-wrap">
          <svg viewBox="0 0 320 320" width="280" height="280" class="goals-circle">
            {#each Array(16) as _, i}
              {@const angle = (i * 360/16 - 90) * Math.PI / 180}
              {@const r = 130}
              {@const cx = 160 + r * Math.cos(angle)}
              {@const cy = 160 + r * Math.sin(angle)}
              {@const goalColors = ['#0f7a5a','#32085a','#7a2e00','#0d1f5c','#5c0a0a','#1a3a08','#5c2800','#053a52','#051e3e','#083020','#4a2e00','#2a1500','#083030','#301800','#0a0a3a','#282800']}
              <circle
                cx={cx} cy={cy} r="16"
                fill={i === parseInt(id) - 1 ? '#fff' : goalColors[i]}
                stroke={i === parseInt(id) - 1 ? goal.textColor : 'rgba(255,255,255,0.3)'}
                stroke-width={i === parseInt(id) - 1 ? '3' : '1'}
                opacity={i === parseInt(id) - 1 ? '1' : '0.7'}
              />
              <text
                x={cx} y={cy + 4}
                text-anchor="middle"
                font-size="9"
                font-weight="700"
                fill={i === parseInt(id) - 1 ? goal.color : 'rgba(255,255,255,0.9)'}
                font-family="sans-serif"
              >{i + 1}</text>
            {/each}
            <!-- Center -->
            <circle cx="160" cy="160" r="70" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
            <text x="160" y="152" text-anchor="middle" font-size="11" font-weight="700" fill="rgba(255,255,255,0.6)" font-family="sans-serif" letter-spacing="2">GOAL</text>
            <text x="160" y="175" text-anchor="middle" font-size="42" font-weight="900" fill="#fff" font-family="sans-serif">{goal.id}</text>
          </svg>
        </div>

        <!-- Footer bar -->
        <div class="info-footer">
          <div class="info-footer-left">
            <span class="info-goal-num">{goal.id}</span>
            <span class="info-goal-name">{goal.title.split('.')[0].substring(0, 30)}</span>
          </div>
          <div class="info-footer-right">
            <span>UNITED SOVEREIGNS</span>
            <span style="opacity:0.6">FREE ASSEMBLY OF LIVING SOULS</span>
          </div>
        </div>
      </div>

      <!-- Right: principles -->
      <div class="poster-right">
        <div class="poster-big-num" style="color:{goal.color}">{goal.id}</div>
        <div class="poster-big-title">{goal.title}</div>
        <div class="poster-big-summary">{goal.summary}</div>
        <div class="poster-principles">
          <div class="poster-big-label">Living Principles</div>
          {#each (features[id] ?? []) as feat}
            <div class="poster-big-feat">
              <span class="poster-big-dot" style="background:{goal.color}"></span>
              {feat}
            </div>
          {/each}
        </div>
      </div>

    </div>
    <p class="poster-caption">Living Way Goals — United Sovereigns · Goal {goal.id}</p>
  </div>
</section>

    <!-- Overview -->
    <section class="section overview-section">
      <div class="section-inner">
        <div class="section-label">Overview</div>
        <div class="overview-grid">
          <div class="overview-text">
            <p>{goal.description}</p>
          </div>
          <div class="overview-features">
            <h3>Living Principles</h3>
            <ul>
              {#each (features[id] ?? []) as feat}
                <li>
                  <span class="feat-marker" style="background:{goal.color}"></span>
                  {feat}
                </li>
              {/each}
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Goals -->
    <section class="section related-section">
      <div class="section-inner">
        <div class="section-label">Related Goals</div>
        <div class="related-grid">
          {#each relatedGoals as rg}
            <a href="/goals/{rg.id}" class="related-tile" style="background:{rg.color}; color:{rg.textColor}">
              <span class="related-num">{rg.id}</span>
              <span class="related-title">{rg.title}</span>
              <span class="related-arrow">→</span>
            </a>
          {/each}
        </div>
      </div>
    </section>

    <!-- Records -->
    <section class="section pubs-section">
      <div class="section-inner two-col">
        <div class="col">
          <div class="section-label">Records</div>
          {#if relatedDocs.length > 0}
            <div class="pub-list">
              {#each relatedDocs as doc}
                <div class="pub-item">
                  <div class="pub-icon" style="background:{goal.color}">↓</div>
                  <div class="pub-info">
                    <p class="pub-title">{doc.title}</p>
                    <p class="pub-meta">{doc.author} · {doc.size} · {doc.date}</p>
                    <div class="pub-actions">
                      <a href={doc.fileData ?? doc.fileName} target="_blank" class="pub-btn-read">↗ Read</a>
                      <a href={doc.fileData ?? doc.fileName} download={doc.fileName} class="pub-btn-dl">↓ Receive</a>
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          {:else}
            <div class="empty-pubs">
              <p>No records yet for this goal.</p>
              <a href="/upload" class="upload-link" style="color:{goal.color}">+ Give a record →</a>
            </div>
          {/if}
        </div>

        <!-- News -->
        <div class="col">
          <div class="section-label">News & Updates</div>
          <div class="news-list">
            {#each goalNews as item}
              <div class="news-item">
                <div class="news-date">{item.date}</div>
                <div class="news-body">
                  <p class="news-title">{item.title}</p>
                  <p class="news-source">{item.source}</p>
                </div>
                <div class="news-bar" style="background:{goal.color}"></div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </section>

    <!-- Bottom nav -->
    <div class="bottom-nav">
      <a href="/goals/{prevGoal().id}" class="bottom-btn" style="border-color:{goal.color}; color:{goal.color}">
        ← {prevGoal().title}
      </a>
      <a href="/" class="bottom-btn-center" style="background:{goal.color}">
        All 16 Goals
      </a>
      <a href="/goals/{nextGoal().id}" class="bottom-btn" style="border-color:{goal.color}; color:{goal.color}">
        {nextGoal().title} →
      </a>
    </div>

  </div>
{/if}

<style>
  :global(body) { background: #fff; }
  .goal-page { background: #fff; min-height: 100vh; }

  /* ── Hero ── */
  .hero { position: relative; overflow: hidden; padding-bottom: 3rem; }
  .hero-bg {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, var(--c1) 0%, color-mix(in srgb, var(--c1) 60%, #000) 100%);
    z-index: 0;
  }
  .hero-bg::after {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse at 80% 50%, rgba(255,255,255,0.08) 0%, transparent 70%);
  }
  .hero-inner { position: relative; z-index: 1; max-width: 1100px; margin: 0 auto; padding: 0 2rem; }
  .hero-nav { display: flex; justify-content: space-between; align-items: center; padding: 1.25rem 0; flex-wrap: wrap; gap: 0.5rem; }
  .hero-nav-right { display: flex; gap: 0.5rem; flex-wrap: wrap; }
  .nav-pill {
    font-family: sans-serif; font-size: 0.72rem; font-weight: 800;
    letter-spacing: 0.06em; text-transform: uppercase; color: var(--c2);
    border: 1px solid rgba(255,255,255,0.3); padding: 0.35rem 0.9rem; text-decoration: none;
  }
  .nav-pill:hover { background: rgba(255,255,255,0.2); color: #fff; }
  .goal-badge { font-family: 'Cinzel', serif; font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--c2); opacity: 0.75; margin-bottom: 0.75rem; }
  .hero-content h1 { font-family: sans-serif; font-size: clamp(1.2rem, 3vw, 2rem); max-width: 800px; font-weight: 600; color: #fff; line-height: 1.1; margin-bottom: 1rem; letter-spacing: -0.02em; }
  .title-bar { width: 48px; height: 4px; background: #fff; opacity: 0.7; margin-bottom: 1.5rem; border-radius: 2px; }
  .hero-summary { font-family: sans-serif; font-size: 1rem; color: var(--c2); line-height: 1.7; opacity: 0.9; }

  /* ── Sections ── */
  .section { padding: 3.5rem 2rem; border-bottom: 1px solid #eee; }
  .section-inner { max-width: 1100px; margin: 0 auto; }
  .section-label { font-family: sans-serif; font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: #999; margin-bottom: 1.75rem; padding-bottom: 0.6rem; border-bottom: 1px solid #eee; }

  /* ── Poster ── */
  .poster-section { background: #f0f0f0; }
  .poster-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; align-items: center; }
  .infographic { border-radius: 16px; overflow: hidden; box-shadow: 0 16px 48px rgba(0,0,0,0.25); display: flex; flex-direction: column; }
  .info-header { display: flex; align-items: center; gap: 0.75rem; padding: 1rem 1.25rem; background: rgba(0,0,0,0.2); position: relative; }
  .info-report { font-family: sans-serif; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em; opacity: 0.9; }
  .info-corner { position: absolute; top: 0; right: 0; width: 60px; height: 60px; background: rgba(255,255,255,0.15); clip-path: polygon(100% 0, 0 0, 100% 100%); }
  .info-circle-wrap { display: flex; justify-content: center; align-items: center; padding: 1.5rem 0; }
  .info-footer { background: rgba(0,0,0,0.3); padding: 0.85rem 1.25rem; display: flex; justify-content: space-between; align-items: center; gap: 1rem; }
  .info-footer-left { display: flex; align-items: center; gap: 0.75rem; }
  .info-goal-num { font-family: sans-serif; font-size: 1.4rem; font-weight: 900; opacity: 0.9; }
  .info-goal-name { font-family: sans-serif; font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; opacity: 0.7; max-width: 120px; line-height: 1.3; }
  .info-footer-right { display: flex; flex-direction: column; align-items: flex-end; font-family: sans-serif; font-size: 0.55rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; gap: 0.2rem; }
  .poster-right { display: flex; flex-direction: column; gap: 1rem; }
  .poster-big-num { font-family: 'Cinzel', serif; font-size: 5rem; font-weight: 600; line-height: 1; opacity: 0.3; }
  .poster-big-title { font-family: sans-serif; font-size: 1.6rem; font-weight: 900; line-height: 1.2; color: #111; letter-spacing: -0.02em; }
  .poster-big-summary { font-family: sans-serif; font-size: 0.9rem; line-height: 1.7; color: #555; }
  .poster-principles { display: flex; flex-direction: column; gap: 0.6rem; margin-top: 0.5rem; }
  .poster-big-label { font-family: sans-serif; font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: #999; margin-bottom: 0.5rem; }
  .poster-big-feat { font-family: sans-serif; font-size: 0.82rem; font-weight: 600; display: flex; align-items: center; gap: 0.6rem; color: #333; line-height: 1.3; }
  .poster-big-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; opacity: 0.8; }
  .poster-caption { font-family: sans-serif; font-size: 0.7rem; color: #aaa; margin-top: 0.75rem; letter-spacing: 0.05em; }

  /* ── Overview ── */
  .overview-grid { display: grid; grid-template-columns: 3fr 2fr; gap: 3rem; align-items: start; }
  .overview-text p { font-family: sans-serif; font-size: 0.95rem; color: #333; line-height: 1.9; }
  .overview-features h3 { font-family: sans-serif; font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #555; margin-bottom: 1rem; }
  .overview-features ul { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; }
  .overview-features li { font-family: sans-serif; font-size: 0.85rem; color: #444; display: flex; align-items: center; gap: 0.6rem; line-height: 1.4; }
  .feat-marker { width: 8px; height: 8px; border-radius: 2px; flex-shrink: 0; }

  /* ── Related ── */
  .related-section { background: #fafafa; }
  .related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
  .related-tile { border-radius: 10px; padding: 1.25rem 1rem; text-decoration: none; display: flex; flex-direction: column; gap: 0.4rem; transition: transform 0.15s, box-shadow 0.15s; position: relative; overflow: hidden; }
  .related-tile::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 60%); }
  .related-tile:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.2); }
  .related-num { font-family: 'Cinzel', serif; font-size: 0.7rem; opacity: 0.6; }
  .related-title { font-family: sans-serif; font-size: 0.85rem; font-weight: 700; line-height: 1.3; }
  .related-arrow { font-size: 0.85rem; margin-top: 0.5rem; opacity: 0.6; }

  /* ── Records + News ── */
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; }
  .pub-list { display: flex; flex-direction: column; gap: 1rem; }
  .pub-item { display: flex; gap: 1rem; align-items: flex-start; padding: 1rem; background: #fafafa; border: 1px solid #eee; border-radius: 6px; }
  .pub-icon { width: 36px; height: 36px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; color: #fff; flex-shrink: 0; }
  .pub-title { font-family: sans-serif; font-size: 0.85rem; font-weight: 700; color: #111; margin-bottom: 0.2rem; }
  .pub-meta { font-family: sans-serif; font-size: 0.72rem; color: #999; margin-bottom: 0.6rem; }
  .pub-actions { display: flex; gap: 0.5rem; }
  .pub-btn-read, .pub-btn-dl { font-family: sans-serif; font-size: 0.7rem; font-weight: 600; padding: 0.25rem 0.7rem; border-radius: 999px; text-decoration: none; transition: all 0.15s; }
  .pub-btn-read { background: #009edb; color: #fff; }
  .pub-btn-read:hover { background: #007bb5; color: #fff; }
  .pub-btn-dl { border: 1px solid #ccc; color: #555; }
  .pub-btn-dl:hover { border-color: #009edb; color: #009edb; }
  .empty-pubs { padding: 2rem; background: #fafafa; border: 1px dashed #ddd; border-radius: 6px; text-align: center; }
  .empty-pubs p { font-family: sans-serif; font-size: 0.85rem; color: #999; margin-bottom: 0.75rem; }
  .upload-link { font-family: sans-serif; font-size: 0.82rem; font-weight: 600; text-decoration: none; }
  .news-list { display: flex; flex-direction: column; }
  .news-item { display: flex; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid #eee; position: relative; }
  .news-bar { position: absolute; left: 0; top: 0; bottom: 0; width: 3px; border-radius: 2px; opacity: 0; transition: opacity 0.2s; }
  .news-item:hover .news-bar { opacity: 1; }
  .news-date { font-family: 'Cinzel', serif; font-size: 0.65rem; color: #aaa; white-space: nowrap; padding-top: 0.15rem; width: 60px; flex-shrink: 0; }
  .news-title { font-family: sans-serif; font-size: 0.85rem; font-weight: 600; color: #222; line-height: 1.4; margin-bottom: 0.2rem; }
  .news-source { font-family: sans-serif; font-size: 0.7rem; color: #aaa; font-style: italic; }

  /* ── Bottom nav ── */
  .bottom-nav { display: flex; align-items: center; justify-content: center; gap: 1rem; padding: 2.5rem 2rem; background: #fafafa; border-top: 1px solid #eee; flex-wrap: wrap; }
  .bottom-btn { font-family: sans-serif; font-size: 0.78rem; font-weight: 600; padding: 0.6rem 1.25rem; border-radius: 999px; border: 2px solid; text-decoration: none; transition: all 0.15s; }
  .bottom-btn:hover { opacity: 0.8; }
  .bottom-btn-center { font-family: sans-serif; font-size: 0.78rem; font-weight: 700; padding: 0.6rem 1.5rem; border-radius: 999px; color: #fff; text-decoration: none; transition: opacity 0.15s; }
  .bottom-btn-center:hover { opacity: 0.85; color: #fff; }
  .not-found { padding: 5rem; text-align: center; font-family: sans-serif; color: #888; background: #fff; min-height: 100vh; }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .poster-wrap { grid-template-columns: 1fr; }
    .overview-grid { grid-template-columns: 1fr; gap: 1.5rem; }
    .two-col { grid-template-columns: 1fr; gap: 2rem; }
    .related-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 600px) {
    .section { padding: 2rem 1rem; }
    .hero-inner { padding: 0 1rem; }
    .related-grid { grid-template-columns: 1fr; }
    .bottom-nav { flex-direction: column; }
    .hero-nav { flex-direction: column; align-items: flex-start; }
  }
</style>