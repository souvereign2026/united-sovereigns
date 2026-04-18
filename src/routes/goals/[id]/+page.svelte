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
    '1':  ['Soul-to-soul touch', 'No broker or gatekeeper', 'Full accord between parties', 'Removal of extractive layers'],
    '2':  ['The living body is whole by nature', 'The living body knows its own restoration', 'The living body restores itself when given what it needs', 'The living body thrives on clean food, clean water, clean air'],
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

  const centerTexts = {
    '1':  ['EVERY LIVING MAN AND WOMAN IS', 'BORN A SOVEREIGN.', 'THEY CARRY THIS KNOWING', 'INTO EVERY ACT, EVERY EXCHANGE,', 'EVERY DAY.'],
    '2':  ['THE BODY KNOWS', 'HOW TO HEAL ITSELF.', 'CLEAN FOOD. CLEAN WATER.', 'CLEAN AIR.', 'THAT IS ALL.'],
    '3':  ['EVERY EXCHANGE', 'SEEN BY ALL.', 'NOTHING HIDDEN.', 'NO MASTER', 'OF THE RECORD.'],
    '4':  ['YOUR HANDS.', 'YOUR LAND.', 'YOUR ROOF.', 'BUILT FREE,', 'OWNED FREE.'],
    '5':  ['FIRE THAT MOVES', 'WITHOUT POISON.', 'POWER THAT BELONGS', 'TO THE CIRCLE,', 'NOT THE COMPANY.'],
    '6':  ['FEED THE EARTH FIRST.', 'IT FEEDS YOU', 'FOREVER.', 'LIVING SOIL.', 'LIVING PEOPLE.'],
    '7':  ['EAT WHAT THE LAND MADE.', 'NOTHING ADDED.', 'NOTHING TAKEN.', 'THE TABLE IS', 'SACRED.'],
    '8':  ['WATER REMEMBERS', 'HOW TO HEAL.', 'LET IT FLOW FREE.', 'NO WALL.', 'NO PRICE.'],
    '9':  ['THE SKY IS THE MEASURE.', 'MAKE IT BLUE AGAIN.', 'WHAT ENTERS THE AIR', 'ENTERS EVERY', 'LUNG.'],
    '10': ['WHAT WAS BURIED', 'BELONGS TO ALL.', 'OPEN THE ARCHIVE.', 'LET EVERY SOUL', 'READ.'],
    '11': ['THE ELDER\'S HAND', 'ON THE YOUNG ONE\'S SHOULDER.', 'THAT IS SCHOOL.', 'THAT IS HOW', 'IT PASSES.'],
    '12': ['A DWELLING BUILT', 'FROM WHERE YOU STAND.', 'LAND FOR ALL', 'WHO WORK IT', 'AND TEND IT.'],
    '13': ['NO HEAD. NO FOOT.', 'EVERY SOUL', 'EQUAL TO THE FIRE.', 'THE CIRCLE', 'DECIDES.'],
    '14': ['OLD KNOWING', 'FLOWS DOWNWARD.', 'DO NOT LET', 'IT STOP.', 'PASS IT ON.'],
    '15': ['ONE SOLVEN ACTS.', 'ANOTHER WATCHES.', 'THE WAY MOVES.', 'BY EXAMPLE,', 'NOT BY FORCE.'],
    '16': ['COUNT WHAT LIVES.', 'NOT WHAT IS MANAGED.', 'MEASURE BY', 'WHAT THRIVES.', 'NOTHING ELSE.'],
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

  const goalColors = ['#0f7a5a','#32085a','#7a2e00','#0d1f5c','#5c0a0a','#1a3a08','#5c2800','#053a52','#051e3e','#083020','#4a2e00','#2a1500','#083030','#301800','#0a0a3a','#282800'];

  let lines = $derived(centerTexts[id] ?? ['LIVING WAY', 'GOAL ' + id, '', '', '']);
</script>

<svelte:head>
  <title>{goal?.title ?? 'Goal'} — Living Way Goals</title>
  <link href="https://fonts.googleapis.com/css2?family=Koulen&display=swap" rel="stylesheet"/>
</svelte:head>

{#if !goal}
  <div class="not-found">
    <p>Goal not found.</p>
    <a href="/">← Back to Archive</a>
  </div>
{:else}
  <div class="goal-page">

    <!-- ── Hero ── -->
    <div class="hero" style="--c1:{goal.color}; --c2:{goal.textColor}">
      <div class="hero-bg" style="background:{goal.gradient ?? goal.color}"></div>
      <div class="hero-inner">
        <div class="hero-nav">
          <a href="/" class="nav-pill">Goals</a>
        </div>
        <div class="hero-content">
          <div class="goal-badge">Goal {goal.id}</div>
          <h1>{goal.title}</h1>
          <div class="title-bar"></div>
          <p class="hero-summary">{goal.summary}</p>
<a href="/goals/{nextGoal().id}" class="next-btn">Next →</a>
        </div>

        <!-- Figures: 3x smaller -->
        <div class="hero-figures">
          <svg viewBox="0 0 360 110" width="140" height="44" xmlns="http://www.w3.org/2000/svg">
            {#each [40, 90, 140, 180, 220, 270, 320] as x}
              <circle cx={x} cy={10} r="9" fill="none" stroke="white" stroke-width="1" opacity="0.4"/>
              <circle cx={x} cy={10} r="7" fill="white" opacity="0.9"/>
              <line x1={x} y1="17" x2={x} y2="58" stroke="white" stroke-width="4.5" stroke-linecap="round" opacity="0.9"/>
              <line x1={x-16} y1="32" x2={x} y2="28" stroke="white" stroke-width="3" stroke-linecap="round" opacity="0.9"/>
              <line x1={x} y1="28" x2={x+16} y2="32" stroke="white" stroke-width="3" stroke-linecap="round" opacity="0.9"/>
              <line x1={x} y1="58" x2={x-12} y2="88" stroke="white" stroke-width="3.5" stroke-linecap="round" opacity="0.9"/>
              <line x1={x} y1="58" x2={x+12} y2="88" stroke="white" stroke-width="3.5" stroke-linecap="round" opacity="0.9"/>
              <line x1={x-12} y1="88" x2={x-18} y2="88" stroke="white" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
              <line x1={x+12} y1="88" x2={x+18} y2="88" stroke="white" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
            {/each}
          </svg>
        </div>
      </div>
    </div>

    <!-- ── Overview Poster ── -->
    <section class="section poster-section">
      <div class="section-inner poster-inner">
        <div class="section-label">Overview</div>

        <div class="infographic" style="background:{goal.gradient ?? goal.color}; color:{goal.textColor}">
          <div class="info-header">
            <img src="/goals_wheel.svg" alt="Goals" style="width:44px;height:44px;"/>
            <span class="info-report">LIVING WAY RECORD 2026</span>
            <div class="info-corner"></div>
          </div>

          <div class="info-body">
            <svg viewBox="0 0 500 440" width="100%" style="max-width:860px; display:block;" xmlns="http://www.w3.org/2000/svg">
              {#each Array(16) as _, i}
                {@const angle = (i * 360/16 - 90) * Math.PI / 180}
                {@const r = 200}
                {@const cx = 250 + r * Math.cos(angle)}
                {@const cy = 220 + r * Math.sin(angle)}
                <a href="/goals/{i+1}">
                  <circle cx={cx} cy={cy} r="22"
                    fill={i === parseInt(id) - 1 ? '#fff' : goalColors[i]}
                    stroke={i === parseInt(id) - 1 ? goal.textColor : 'rgba(255,255,255,0.4)'}
                    stroke-width={i === parseInt(id) - 1 ? '4' : '1'}
                    opacity={i === parseInt(id) - 1 ? '1' : '0.8'}
                  />
                  <text x={cx} y={cy+5} text-anchor="middle" font-size="12" font-weight="800"
                    fill={i === parseInt(id) - 1 ? goal.color : 'rgba(255,255,255,0.95)'}
                    font-family="sans-serif" style="pointer-events:none">{i+1}</text>
                </a>
              {/each}

              <text x="250" y="120" text-anchor="middle" font-family="Koulen, sans-serif" font-size="28" fill="white" letter-spacing="2">{lines[0]}</text>
              <text x="250" y="162" text-anchor="middle" font-family="Koulen, sans-serif" font-size="32" fill="white" letter-spacing="2">{lines[1]}</text>
              <rect x="55" y="180" width="390" height="54" fill="#c0392b" rx="2"/>
              <text x="250" y="216" text-anchor="middle" font-family="Koulen, sans-serif" font-size="28" fill="white" letter-spacing="2">{lines[2]}</text>
              <text x="250" y="275" text-anchor="middle" font-family="Koulen, sans-serif" font-size="26" fill="white" letter-spacing="1">{lines[3]}</text>
              <text x="250" y="320" text-anchor="middle" font-family="Koulen, sans-serif" font-size="32" fill="white" letter-spacing="2">{lines[4]}</text>
              <text x="250" y="400" text-anchor="middle" font-family="Cinzel, serif" font-size="11" fill="white" letter-spacing="5" opacity="0.5">CIRCLE OF LIVING SOULS</text>
            </svg>
          </div>

          <div class="info-footer">
            <div class="info-footer-left">
              <span class="info-goal-num">{goal.id}</span>
              <div>
                <div class="info-goal-name">{goal.title.substring(0, 30).toUpperCase()}</div>
                <div class="info-goal-sub">CIRCLE OF LIVING SOULS</div>
              </div>
            </div>
            <div class="info-footer-right">
              <span>UNITED SOVEREIGNS</span>
              <span style="opacity:0.6">FREE ASSEMBLY OF LIVING SOULS</span>
            </div>
          </div>
        </div>

        <!-- Text UNDER poster -->
        <div class="under-poster">
          <div class="under-left">
            <div class="up-num" style="color:{goal.color}">{goal.id}</div>
            <div class="up-title">{goal.title}</div>
            <div class="up-summary">{goal.summary}</div>
            <p class="up-desc">{goal.description}</p>
          </div>
          <div class="under-right">
            <div class="up-label">Living Principles</div>
            <ul class="up-list">
              {#each (features[id] ?? []) as feat}
                <li>
                  <span class="up-dot" style="background:{goal.color}"></span>
                  {feat}
                </li>
              {/each}
            </ul>
          </div>
        </div>

        <p class="poster-caption">Living Way Goals — United Sovereigns · Goal {goal.id}</p>
      </div>
    </section>

    <!-- ── Related Goals ── -->
    <section class="section related-section">
      <div class="section-inner">
        <div class="section-label">Related Goals</div>
        <div class="related-grid">
          {#each relatedGoals as rg}
            <a href="/goals/{rg.id}" class="related-tile" style="background:{rg.gradient ?? rg.color}; color:{rg.textColor}">
              <span class="related-num">{rg.id}</span>
              <span class="related-title">{rg.title}</span>
              <span class="related-arrow">→</span>
            </a>
          {/each}
        </div>
      </div>
    </section>

    <!-- ── Records + News ── -->
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

    <!-- ── Bottom nav ── -->
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
  .hero-bg { position: absolute; inset: 0; z-index: 0; }
  .hero-bg::after { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 80% 50%, rgba(255,255,255,0.08) 0%, transparent 70%); }
  .hero-inner { position: relative; z-index: 1; max-width: 1100px; margin: 0 auto; padding: 0 2rem; }
  .hero-nav { display: flex; align-items: center; padding: 1.25rem 0; }
  .nav-pill { font-family: sans-serif; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; color: var(--c2); border: 1px solid rgba(255,255,255,0.3); padding: 0.35rem 0.9rem; text-decoration: none; transition: background 0.15s; }
  .nav-pill:hover { background: rgba(255,255,255,0.2); color: #fff; }
  .goal-badge { font-family: 'Cinzel', serif; font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--c2); opacity: 0.75; margin-bottom: 0.75rem; }
  .hero-content { padding: 0.5rem 0 3rem; max-width: 65%; }
  .hero-content h1 { font-family: Koulen; font-size: clamp(1.4rem, 3.5vw, 2.4rem); font-weight: 500; color: #fff; line-height: 1.15; margin-bottom: 0.75rem; }
  .title-bar { width: 48px; height: 4px; background: #fff; opacity: 0.7; margin-bottom: 1.25rem; border-radius: 2px; }
  .hero-summary { font-family: sans-serif; font-size: 0.95rem; color: var(--c2); line-height: 1.7; opacity: 0.9; margin-bottom: 1.5rem; }

  .next-btn {
    display: inline-block;
    font-family: sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--c2);
    text-decoration: none;
    opacity: 0.75;
    transition: opacity 0.2s;
  }
  .next-btn:hover { opacity: 1; color: #fff; }

  .hero-figures {
    position: absolute;
    right: 2rem;
    bottom: 1rem;
    opacity: 0.45;
    pointer-events: none;
    mask-image: linear-gradient(to left, rgba(255,255,255,1) 30%, rgba(255,255,255,0) 100%);
    -webkit-mask-image: linear-gradient(to left, rgba(255,255,255,1) 30%, rgba(255,255,255,0) 100%);
  }

  /* ── Sections ── */
  .section { padding: 3.5rem 2rem; border-bottom: 1px solid #eee; }
  .section-inner { max-width: 1100px; margin: 0 auto; }
  .section-label { font-family: sans-serif; font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: #999; margin-bottom: 1.75rem; padding-bottom: 0.6rem; border-bottom: 1px solid #eee; }

  /* ── Poster ── */
  .poster-section { background: #f0f0f0; }
  .poster-inner { display: flex; flex-direction: column; align-items: center; }
  .poster-inner .section-label { align-self: flex-start; width: 100%; }
  .infographic { border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.25); display: flex; flex-direction: column; width: 100%; max-width: 860px; }
  .info-header { display: flex; align-items: center; gap: 0.75rem; padding: 1rem 1.5rem; background: rgba(0,0,0,0.2); position: relative; }
  .info-report { font-family: 'Koulen', sans-serif; font-size: 1rem; letter-spacing: 0.1em; opacity: 0.9; }
  .info-corner { position: absolute; top: 0; right: 0; width: 70px; height: 70px; background: rgba(255,255,255,0.15); clip-path: polygon(100% 0, 0 0, 100% 100%); }
  .info-body { display: flex; justify-content: center; align-items: center; padding: 1rem; width: 100%; }
  .info-footer { background: rgba(0,0,0,0.3); padding: 1rem 1.5rem; display: flex; justify-content: space-between; align-items: center; gap: 1rem; }
  .info-footer-left { display: flex; align-items: center; gap: 0.75rem; }
  .info-goal-num { font-family: 'Koulen', sans-serif; font-size: 1.8rem; opacity: 0.9; }
  .info-goal-name { font-family: 'Koulen', sans-serif; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.06em; opacity: 0.85; line-height: 1.3; }
  .info-goal-sub { font-family: sans-serif; font-size: 0.5rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.6; margin-top: 0.1rem; }
  .info-footer-right { display: flex; flex-direction: column; align-items: flex-end; font-family: 'Koulen', sans-serif; font-size: 0.75rem; letter-spacing: 0.08em; text-transform: uppercase; gap: 0.2rem; }

  /* ── Under poster ── */
  .under-poster { display: grid; grid-template-columns: 3fr 2fr; gap: 3rem; margin-top: 3rem; width: 100%; max-width: 860px; align-items: start; }
  .up-num { font-family: 'Cinzel', serif; font-size: 5rem; font-weight: 600; line-height: 1; opacity: 0.2; margin-bottom: 0.5rem; }
  .up-title { font-family: sans-serif; font-size: clamp(1.4rem, 3vw, 2rem); font-weight: 900; color: #111; line-height: 1.2; margin-bottom: 0.75rem; }
  .up-summary { font-family: sans-serif; font-size: 1rem; color: #555; line-height: 1.7; margin-bottom: 1rem; font-style: italic; }
  .up-desc { font-family: sans-serif; font-size: 0.92rem; color: #444; line-height: 1.9; }
  .up-label { font-family: sans-serif; font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: #999; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid #eee; }
  .up-list { list-style: none; display: flex; flex-direction: column; gap: 0.75rem; }
  .up-list li { font-family: sans-serif; font-size: 0.88rem; font-weight: 600; color: #222; display: flex; align-items: center; gap: 0.75rem; line-height: 1.4; }
  .up-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
  .poster-caption { font-family: sans-serif; font-size: 0.7rem; color: #aaa; margin-top: 1.5rem; letter-spacing: 0.05em; align-self: flex-start; }

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
  .bottom-btn { font-family: sans-serif; font-size: 0.78rem; font-weight: 600; padding: 0.6rem 1.25rem; border-radius: 999px; border: 2px solid; text-decoration: none; transition: opacity 0.15s; }
  .bottom-btn:hover { opacity: 0.7; }
  .bottom-btn-center { font-family: sans-serif; font-size: 0.78rem; font-weight: 700; padding: 0.6rem 1.5rem; border-radius: 999px; color: #fff; text-decoration: none; transition: opacity 0.15s; }
  .bottom-btn-center:hover { opacity: 0.85; color: #fff; }
  .not-found { padding: 5rem; text-align: center; font-family: sans-serif; color: #888; background: #fff; min-height: 100vh; }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .hero-figures { display: none; }
    .hero-content { max-width: 100%; }
    .under-poster { grid-template-columns: 1fr; gap: 1.5rem; }
    .two-col { grid-template-columns: 1fr; gap: 2rem; }
    .related-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 600px) {
    .section { padding: 2rem 1rem; }
    .hero-inner { padding: 0 1rem; }
    .related-grid { grid-template-columns: 1fr; }
    .bottom-nav { flex-direction: column; }
  }
</style>