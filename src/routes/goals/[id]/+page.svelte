<script>
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import { goals, docs } from "$lib/store.js";

  let id = $derived($page.params.id);
  let goal = $derived(goals.find((g) => g.id === id));
  let relatedDocs = $derived($docs.filter((d) => goal?.docs?.includes(d.id)));

  let nextGoal = $derived(() => {
    const idx = goals.findIndex((g) => g.id === id);
    return goals[(idx + 1) % goals.length];
  });

  let prevGoal = $derived(() => {
    const idx = goals.findIndex((g) => g.id === id);
    return goals[(idx - 1 + goals.length) % goals.length];
  });

  const features = {
    "1": [
      "Soul-to-soul touch",
      "Full responsibility",
      "Full trust between each other",
      "Occam/ms razor - only what is necessary exists",
    ],
    "2": [
      "The living body is whole by nature",
      "The living body knows its own restoration",
      "The living body restores itself",
      "The living body thrives on clean food, clean water, clean air",
    ],
    "3": [
      "Open ledgers for all",
      "Open record of decisions",
      "Transparent value exchange",
      "Open ledger that no soul can alter alone",
    ],
    "4": [
      "The knowledge to raise a roof belongs to all",
      "Built together, held by all",
      "Self-determined construction",
    ],
    "5": [
      "Circle energy access",
      "Wind, water, and biomass",
      "Decentralised power grids",
      "No energy monopolies",
    ],
    "6": [
      "Soil regeneration",
      "Biological growing",
      "Composting and aquaponics",
      "Topsoil preservation",
    ],
    "7": [
      "Food as the land grew it — nothing added",
      "Honest provenance",
      "Growing and sharing is the living way",
      "Sacred shared meals",
    ],
    "8": [
      "Water as open land",
      "Protected aquifers",
      "No water enclosure",
      "Clean access for all",
    ],
    "9": [
      "Clean air — what the living sky has always been",
      "No atmospheric pollution",
      "Open sky",
      "Biological atmosphere protection",
    ],
    "10": [
      "All knowing placed openly where any soul can reach it",
      "Living knowing kept open and passed on",
      "Rare text recovery",
      "No knowledge gatekeepers",
    ],
    "11": [
      "Elder-to-youth transmission",
      "Apprenticeship learning",
      "Teaching and learning outside all institutions",
      "Living craft knowing",
    ],
    "12": [
      "Land access for all",
      "Anti-enclosure principles",
      "Circle tending",
      "Growing land for all",
    ],
    "13": [
      "Direct circle gathering",
      "Open circle of living souls",
      "Accord by will",
      "No representative proxy",
    ],
    "14": [
      "Finding soulmates across distance",
      "Councils of mutual recognition",
      "Meeting without dissolving difference",
      "Common cause as practice, not slogan",
    ],
    "15": [
      "New words for what the old tongue cannot name honestly",
      "Language grown from the circle, not imposed from above",
      "Teaching the living tongue to the young",
      "Old words will have only their true meaning",
    ],
    "16": [
      "Measure by what thrives",
      "Soil and living vitality",
      "Cultural richness",
      "Living well-being as the measure",
    ],
  };

  const centerTexts = {
    "1": [
      "EVERY LIVING MEN AND WOMEN IS",
      "BORN A SOVEREIGN.",
      "THEY CARRY THIS KNOWING",
      "INTO EVERY ACT, EVERY EXCHANGE,",
      "EVERY DAY.",
    ],
    "2": [
      "THE BODY KNOWS",
      "HOW TO HEAL ITSELF.",
      "CLEAN FOOD. CLEAN WATER.",
      "CLEAN AIR.",
      "THAT IS ALL.",
    ],
    "3": [
      "EVERY EXCHANGE",
      "SEEN BY ALL.",
      "NOTHING HIDDEN.",
      "WE CONTROL",
      "ALL THE RECORDS.",
    ],
    "4": [
      "YOUR HANDS.",
      "YOUR LAND.",
      "YOUR ROOF.",
      "BUILT BY WILL,",
      "YOURS ENTIRELY",
    ],
    "5": [
      "FIRE THAT MOVES",
      "WITHOUT POISON.",
      "POWER THAT BELONGS",
      "TO THE CIRCLE,",
      "to solvens.",
    ],
    "6": [
      "FEED THE EARTH FIRST.",
      "IT FEEDS YOU",
      "FOREVER.",
      "LIVING SOIL.",
      "LIVING PEOPLE.",
    ],
    "7": [
      "progress",
      "in understanding",
      "food purity (2026-2030)",
      "synthetic preservatives",
      "have disappeared",
    ],
    "8": [
      "WATER REMEMBERS",
      "HOW TO HEAL.",
      "LET IT FLOW FREE.",
      "NO WALL.",
      "NO PRICE.",
    ],
    "9": [
      "THE SKY IS THE MEASURE.",
      "MAKE IT BLUE AGAIN.",
      "WHAT ENTERS THE AIR",
      "ENTERS EVERY",
      "LUNG.",
    ],
    "10": [
      "WHAT WAS BURIED",
      "BELONGS TO ALL.",
      "OPEN THE ARCHIVE.",
      "LET EVERY SOUL",
      "READ.",
    ],
    "11": [
      "THE ELDER'S HAND",
      "ON THE YOUNG ONE'S SHOULDER.",
      "THAT IS SCHOOL.",
      "THAT IS HOW",
      "IT PASSES.",
    ],
    "12": [
      "A DWELLING BUILT",
      "FROM WHERE YOU STAND.",
      "LAND FOR ALL",
      "WHO WORK IT",
      "AND TEND IT.",
    ],
    "13": [
      "NO HEAD. NO FOOT.",
      "EVERY SOUL",
      "EQUAL TO THE FIRE.",
      "THE CIRCLE",
      "DECIDES.",
    ],
    "14": [
      "NO SOLVEN ALONE.",
      "SEEK THE OTHER.",
      "LEARN THE FACE.",
      "LEARN THE NAME.",
      "BUILD AS ONE.",
    ],
    "15": [
      "We will replace",
      "all old WORDS",
      "that are in foreign law.",
      "WE WILL SPEAK",
      "in our living way",
    ],
    "16": [
      "COUNT WHAT LIVES.",
      "NOT WHAT IS MANAGED.",
      "MEASURE BY",
      "WHAT THRIVES.",
      "NOTHING ELSE.",
    ],
  };

  const relatedGoalIds = {
    "1": ["4", "10", "13"],
    "2": ["7", "8", "9"],
    "3": ["1", "13", "16"],
    "4": ["5", "6", "12"],
    "5": ["4", "6", "9"],
    "6": ["7", "8", "12"],
    "7": ["6", "8", "11"],
    "8": ["5", "6", "9"],
    "9": ["8", "5", "12"],
    "10": ["11", "1", "15"],
    "11": ["10", "2", "14"],
    "12": ["4", "6", "9"],
    "13": ["1", "3", "14"],
    "14": ["11", "13", "7"],
    "15": ["10", "1", "13"],
    "16": ["6", "7", "8"],
  };

  let relatedGoals = $derived(
    (relatedGoalIds[id] ?? [])
      .map((rid) => goals.find((g) => g.id === rid))
      .filter(Boolean),
  );

  const news = {
    "1": [
      {
        date: "2025-03",
        title: "Soul-to-soul exchange grows 40% in Southeast Asia",
        source: "Open Exchange Review",
        pdf: null,
      },
      {
        date: "2025-01",
        title:
          "Old books that shows some realities but wont give you full answers",
        source: "Living In The Private",
        pdf: `${base}/docs/Living-In-The-Private.pdf`,
      },
    ],
    "2": [
      {
        date: "2025-03",
        title: "Solvens reporting full vitality on clean food and water alone",
        source: "Living Way Journal",
        pdf: null,
      },
      {
        date: "2025-01",
        title: "Chronic illness rates fall in solvens adopting clean living",
        source: "Circle Quarterly",
        pdf: null,
      },
    ],
    "3": [
      {
        date: "2025-02",
        title: "Open ledger trial launches in three solvens",
        source: "Circle Report",
        pdf: null,
      },
      {
        date: "2024-11",
        title: "Living tally systems reduce dispute rates by 60%",
        source: "Circle Quarterly",
        pdf: null,
      },
    ],
    "6": [
      {
        date: "2025-03",
        title: "Aquaponics systems double yields in dry regions",
        source: "Soil & Water Journal",
        pdf: null,
      },
      {
        date: "2025-01",
        title: "Regenerative growing shows 30% topsoil increase over 5 years",
        source: "Living Soil Review",
        pdf: null,
      },
    ],
    "10": [
      {
        date: "2025-02",
        title: "Open Archive adds 2,000 rare writings",
        source: "Archive Bulletin",
        pdf: null,
      },
      {
        date: "2024-12",
        title: "Open knowing network reaches 50,000 living souls",
        source: "Knowing Circle",
        pdf: null,
      },
    ],
  };

  let goalNews = $derived(
    news[id] ?? [
      {
        date: "2025-03",
        title: `${goal?.title} — circle report published`,
        source: "Living Way Journal",
        pdf: null,
      },
      {
        date: "2025-01",
        title: `Progress on ${goal?.title} across 8 regions`,
        source: "Circle Quarterly",
        pdf: null,
      },
    ],
  );

  const goalColors = [
    "#0f7a5a",
    "#32085a",
    "#7a2e00",
    "#0d1f5c",
    "#5c0a0a",
    "#1a3a08",
    "#5c2800",
    "#053a52",
    "#051e3e",
    "#083020",
    "#4a2e00",
    "#2a1500",
    "#083030",
    "#301800",
    "#0a0a3a",
    "#282800",
  ];

  let lines = $derived(
    centerTexts[id] ?? ["LIVING WAY", "GOAL " + id, "", "", ""],
  );

  const goalVideos = {
  "1": [
    { id: '07rurm', title: 'Mental imprisonment explained' },
  ],
  "5": [
    { id: 'TEgAjWfh5qI', title: 'Tiny Steam Engine', type: 'youtube'},
  ],
  "6": [
    { id: 'HDwO0HBZhPI', title: 'Electroculture', type: 'youtube' },
  ],
  "7": [
  { type: 'book', title: 'The Clean Table — Living Food Guide', pdf: `${base}/docs/clean-table-guide.pdf` },
    { type: 'book', title: 'Is Meat Good or Bad', pdf: `${base}/docs/_Is Meat Good or Bad_2022_ebook.pdf` },
        { type: 'book', title: 'How To Heal Your Metabolism', pdf: `${base}/docs/How-to-heal.epub` },
],

  // "10": [
  //   { id: 'fwls2c', title: 'Open Archive' },
  // ],
  // "11": [
  //   { id: 'fwls2c', title: 'Living Teaching' },
  // ],
  // "12": [
  //   { id: 'fwls2c', title: 'Open Land' },
  // ],
  // "13": [
  //   { id: 'fwls2c', title: 'The Circle' },
  // ],
  // "14": [
  //   { id: 'fwls2c', title: 'Know Each Other' },
  // ],
  // "15": [
  //   { id: 'fwls2c', title: 'The Way Spreads' },
  // ],
  // "16": [
  //   { id: 'fwls2c', title: 'What Flourishes' },
  // ],
};

let videos = $derived(goalVideos[id] ?? []);

</script>

<svelte:head>
  <title>{goal?.title ?? "Goal"} — Living Way Goals</title>
</svelte:head>

{#if !goal}
  <div class="not-found">
    <p>Goal not found.</p>
    <a href="{base}/">← Back to Archive</a>
  </div>
{:else}
  <div class="goal-page">
    <!-- ── Hero ── -->
    <div class="hero" style="--c1:{goal.color}; --c2:{goal.textColor}">
      <div
        class="hero-bg"
        style="background:{goal.gradient ?? goal.color}"
      ></div>
      <div class="hero-inner">
        <div class="hero-nav">
          <a href="{base}/" class="nav-pill">Goals</a>
        </div>
        <div class="hero-content">
          <div class="goal-badge">Goal {goal.id}</div>
          <h1>{goal.title}</h1>
          <div class="title-bar"></div>
          <p class="hero-summary">{goal.summary}</p>
          <div class="hero-nav-btns">
            <a href="{base}/goals/{prevGoal().id}" class="hero-pill-btn"
              >← Previous</a
            >
            <a href="{base}/goals/{nextGoal().id}" class="hero-pill-btn"
              >Next →</a
            >
          </div>
        </div>

        <div class="hero-figures">
          <svg
            viewBox="0 0 360 110"
            width="320"
            height="100"
            xmlns="http://www.w3.org/2000/svg"
          >
            {#if id === "1"}
              <!-- 1. No Intermediary: two figures meeting directly, nothing between -->
              {#each [{ x: 130, m: 1 }, { x: 230, m: -1 }] as f}
                <circle
                  cx={f.x}
                  cy={14}
                  r="9"
                  fill="none"
                  stroke="white"
                  stroke-width="1"
                  opacity="0.4"
                />
                <circle cx={f.x} cy={14} r="7" fill="white" opacity="0.9" />
                <line
                  x1={f.x}
                  y1="21"
                  x2={f.x}
                  y2="62"
                  stroke="white"
                  stroke-width="4.5"
                  stroke-linecap="round"
                  opacity="0.9"
                />
                <line
                  x1={f.x}
                  y1="32"
                  x2={f.x + f.m * 22}
                  y2="36"
                  stroke="white"
                  stroke-width="3"
                  stroke-linecap="round"
                  opacity="0.9"
                />
                <line
                  x1={f.x}
                  y1="62"
                  x2={f.x - 10}
                  y2="92"
                  stroke="white"
                  stroke-width="3.5"
                  stroke-linecap="round"
                  opacity="0.9"
                />
                <line
                  x1={f.x}
                  y1="62"
                  x2={f.x + 10}
                  y2="92"
                  stroke="white"
                  stroke-width="3.5"
                  stroke-linecap="round"
                  opacity="0.9"
                />
              {/each}
            {:else if id === "2"}
              <!-- 2. The Living Body: organic body silhouette, cells as one whole -->
              <path
                d="M180 12 Q200 12 200 28 Q200 40 192 44 L208 80 Q210 95 198 95 L162 95 Q150 95 152 80 L168 44 Q160 40 160 28 Q160 12 180 12 Z"
                fill="white"
                opacity="0.4"
              />
              <circle cx="180" cy="22" r="8" fill="white" opacity="0.9" />
              {#each [[170, 42], [180, 40], [190, 42], [174, 55], [186, 55], [178, 70], [184, 82]] as [cx, cy]}
                <circle {cx} {cy} r="2.2" fill="white" opacity="0.95" />
              {/each}
            {:else if id === "3"}
              <!-- 3. The Tally: open ledgers, public counting -->
              {#each [80, 180, 280] as x}
                <path
                  d={`M${x - 30} 30 L${x} 25 L${x + 30} 30 L${x + 30} 80 L${x} 75 L${x - 30} 80 Z`}
                  fill="white"
                  opacity="0.4"
                />
                <line
                  x1={x}
                  y1="25"
                  x2={x}
                  y2="75"
                  stroke="white"
                  stroke-width="1.2"
                  opacity="0.8"
                />
                {#each [40, 50, 60, 70] as y}
                  <line
                    x1={x - 25}
                    y1={y}
                    x2={x - 5}
                    y2={y - 1}
                    stroke="white"
                    stroke-width="1"
                    opacity="0.85"
                  />
                  <line
                    x1={x + 5}
                    y1={y - 1}
                    x2={x + 25}
                    y2={y}
                    stroke="white"
                    stroke-width="1"
                    opacity="0.85"
                  />
                {/each}
              {/each}
            {:else if id === "4"}
              <!-- 4. Shelter Reclaimed: row of homes -->
              {#each [60, 130, 200, 270] as x}
                <polygon
                  points={`${x},20 ${x + 26},42 ${x - 26},42`}
                  fill="white"
                  opacity="0.9"
                />
                <rect
                  x={x - 22}
                  y="42"
                  width="44"
                  height="42"
                  fill="white"
                  opacity="0.7"
                />
                <rect
                  x={x - 6}
                  y="58"
                  width="12"
                  height="26"
                  fill="rgba(0,0,0,0.35)"
                />
              {/each}
            {:else if id === "5"}
              <!-- 5. Living Engine: interlocking gears, rhythm of life -->
              {#each [{ cx: 110, r: 22 }, { cx: 200, r: 28 }, { cx: 285, r: 22 }] as g}
                <circle
                  cx={g.cx}
                  cy="55"
                  r={g.r}
                  fill="none"
                  stroke="white"
                  stroke-width="2.5"
                  opacity="0.9"
                />
                <circle cx={g.cx} cy="55" r="4" fill="white" opacity="0.9" />
                {#each [0, 45, 90, 135, 180, 225, 270, 315] as a}
                  <line
                    x1={g.cx + Math.cos((a * Math.PI) / 180) * g.r}
                    y1={55 + Math.sin((a * Math.PI) / 180) * g.r}
                    x2={g.cx + Math.cos((a * Math.PI) / 180) * (g.r + 5)}
                    y2={55 + Math.sin((a * Math.PI) / 180) * (g.r + 5)}
                    stroke="white"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    opacity="0.9"
                  />
                {/each}
              {/each}
            {:else if id === "6"}
              <!-- 6. Living Soil: plants above, roots below -->
              <line
                x1="0"
                y1="55"
                x2="360"
                y2="55"
                stroke="white"
                stroke-width="1.5"
                opacity="0.5"
                stroke-dasharray="3 3"
              />
              {#each [80, 180, 280] as x}
                <line
                  x1={x}
                  y1="55"
                  x2={x}
                  y2="22"
                  stroke="white"
                  stroke-width="3"
                  stroke-linecap="round"
                  opacity="0.9"
                />
                <path
                  d={`M${x} 26 Q${x - 12} 18 ${x - 15} 26 Z`}
                  fill="white"
                  opacity="0.9"
                />
                <path
                  d={`M${x} 26 Q${x + 12} 18 ${x + 15} 26 Z`}
                  fill="white"
                  opacity="0.9"
                />
                <line
                  x1={x}
                  y1="55"
                  x2={x - 15}
                  y2="95"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  opacity="0.7"
                />
                <line
                  x1={x}
                  y1="55"
                  x2={x + 15}
                  y2="95"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  opacity="0.7"
                />
                <line
                  x1={x}
                  y1="55"
                  x2={x - 5}
                  y2="100"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  opacity="0.6"
                />
                <line
                  x1={x}
                  y1="55"
                  x2={x + 5}
                  y2="100"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  opacity="0.6"
                />
              {/each}
            {:else if id === "7"}
              <!-- 7. The Clean Table: shared table, set bowls -->
              <rect
                x="40"
                y="55"
                width="280"
                height="6"
                fill="white"
                opacity="0.9"
              />
              <line
                x1="60"
                y1="61"
                x2="60"
                y2="95"
                stroke="white"
                stroke-width="3"
                stroke-linecap="round"
                opacity="0.9"
              />
              <line
                x1="300"
                y1="61"
                x2="300"
                y2="95"
                stroke="white"
                stroke-width="3"
                stroke-linecap="round"
                opacity="0.9"
              />
              {#each [100, 180, 260] as x}
                <ellipse
                  cx={x}
                  cy="50"
                  rx="22"
                  ry="6"
                  fill="none"
                  stroke="white"
                  stroke-width="2"
                  opacity="0.9"
                />
                <ellipse
                  cx={x}
                  cy="48"
                  rx="17"
                  ry="3"
                  fill="white"
                  opacity="0.7"
                />
              {/each}
            {:else if id === "8"}
              <!-- 8. Sacred Water: drops and ripples -->
              {#each [80, 180, 280] as x}
                <path
                  d={`M${x} 18 Q${x - 8} 35 ${x} 46 Q${x + 8} 35 ${x} 18 Z`}
                  fill="white"
                  opacity="0.9"
                />
                <ellipse
                  cx={x}
                  cy="72"
                  rx="22"
                  ry="5"
                  fill="none"
                  stroke="white"
                  stroke-width="2"
                  opacity="0.7"
                />
                <ellipse
                  cx={x}
                  cy="72"
                  rx="34"
                  ry="8"
                  fill="none"
                  stroke="white"
                  stroke-width="1.5"
                  opacity="0.4"
                />
              {/each}
            {:else if id === "9"}
              <!-- 9. Blue Sky: sun with rays -->
              <circle cx="180" cy="55" r="22" fill="white" opacity="0.9" />
              {#each [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330] as a}
                <line
                  x1={180 + Math.cos((a * Math.PI) / 180) * 30}
                  y1={55 + Math.sin((a * Math.PI) / 180) * 30}
                  x2={180 + Math.cos((a * Math.PI) / 180) * 44}
                  y2={55 + Math.sin((a * Math.PI) / 180) * 44}
                  stroke="white"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  opacity="0.9"
                />
              {/each}
            {:else if id === "10"}
              <!-- 10. Open Archive: open book, knowledge unsealed -->
              <path
                d="M70 35 Q180 25 290 35 L290 82 Q180 72 70 82 Z"
                fill="white"
                opacity="0.5"
              />
              <line
                x1="180"
                y1="28"
                x2="180"
                y2="78"
                stroke="white"
                stroke-width="2"
                opacity="0.95"
              />
              {#each [44, 52, 60, 68] as y}
                <line
                  x1="92"
                  y1={y}
                  x2="170"
                  y2={y - 1}
                  stroke="white"
                  stroke-width="1"
                  opacity="0.85"
                />
                <line
                  x1="190"
                  y1={y - 1}
                  x2="268"
                  y2={y}
                  stroke="white"
                  stroke-width="1"
                  opacity="0.85"
                />
              {/each}
            {:else if id === "11"}
              <!-- 11. Living Teaching: elder hands joined with younger -->
              <circle cx="100" cy="20" r="10" fill="white" opacity="0.9" />
              <line
                x1="100"
                y1="30"
                x2="100"
                y2="70"
                stroke="white"
                stroke-width="5"
                stroke-linecap="round"
                opacity="0.9"
              />
              <line
                x1="100"
                y1="40"
                x2="128"
                y2="52"
                stroke="white"
                stroke-width="3.5"
                stroke-linecap="round"
                opacity="0.9"
              />
              <line
                x1="100"
                y1="40"
                x2="78"
                y2="55"
                stroke="white"
                stroke-width="3.5"
                stroke-linecap="round"
                opacity="0.9"
              />
              <line
                x1="100"
                y1="70"
                x2="90"
                y2="100"
                stroke="white"
                stroke-width="4"
                stroke-linecap="round"
                opacity="0.9"
              />
              <line
                x1="100"
                y1="70"
                x2="110"
                y2="100"
                stroke="white"
                stroke-width="4"
                stroke-linecap="round"
                opacity="0.9"
              />
              {#each [180, 235, 285] as x}
                <circle cx={x} cy="40" r="7" fill="white" opacity="0.9" />
                <line
                  x1={x}
                  y1="47"
                  x2={x}
                  y2="76"
                  stroke="white"
                  stroke-width="3.5"
                  stroke-linecap="round"
                  opacity="0.9"
                />
                <line
                  x1={x}
                  y1="55"
                  x2={x - 13}
                  y2="54"
                  stroke="white"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  opacity="0.9"
                />
                <line
                  x1={x}
                  y1="55"
                  x2={x + 13}
                  y2="54"
                  stroke="white"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  opacity="0.9"
                />
                <line
                  x1={x}
                  y1="76"
                  x2={x - 7}
                  y2="100"
                  stroke="white"
                  stroke-width="3"
                  stroke-linecap="round"
                  opacity="0.9"
                />
                <line
                  x1={x}
                  y1="76"
                  x2={x + 7}
                  y2="100"
                  stroke="white"
                  stroke-width="3"
                  stroke-linecap="round"
                  opacity="0.9"
                />
              {/each}
            {:else if id === "12"}
              <!-- 12. Open Land: mountains, horizon, sun behind -->
              <circle cx="270" cy="42" r="12" fill="white" opacity="0.7" />
              <polygon
                points="40,92 100,32 160,92"
                fill="white"
                opacity="0.4"
              />
              <polygon
                points="120,92 200,18 280,92"
                fill="white"
                opacity="0.65"
              />
              <polygon
                points="220,92 290,42 350,92"
                fill="white"
                opacity="0.4"
              />
              <line
                x1="0"
                y1="92"
                x2="360"
                y2="92"
                stroke="white"
                stroke-width="2"
                opacity="0.9"
              />
            {:else if id === "13"}
              <!-- 13. The Circle: council from above -->
              <circle
                cx="180"
                cy="55"
                r="42"
                fill="none"
                stroke="white"
                stroke-width="1.5"
                opacity="0.4"
                stroke-dasharray="3 3"
              />
              {#each [0, 60, 120, 180, 240, 300] as a}
                <circle
                  cx={180 + Math.cos((a * Math.PI) / 180) * 42}
                  cy={55 + Math.sin((a * Math.PI) / 180) * 42}
                  r="9"
                  fill="white"
                  opacity="0.9"
                />
              {/each}
              <circle cx="180" cy="55" r="3.5" fill="white" opacity="0.7" />
            {:else if id === "14"}
              <!-- 14. Know Each Other: solvens walking together -->
              {#each [40, 90, 140, 180, 220, 270, 320] as x}
                <circle
                  cx={x}
                  cy={10}
                  r="9"
                  fill="none"
                  stroke="white"
                  stroke-width="1"
                  opacity="0.4"
                />
                <circle cx={x} cy={10} r="7" fill="white" opacity="0.9" />
                <line
                  x1={x}
                  y1="17"
                  x2={x}
                  y2="58"
                  stroke="white"
                  stroke-width="4.5"
                  stroke-linecap="round"
                  opacity="0.9"
                />
                <line
                  x1={x - 16}
                  y1="32"
                  x2={x}
                  y2="28"
                  stroke="white"
                  stroke-width="3"
                  stroke-linecap="round"
                  opacity="0.9"
                />
                <line
                  x1={x}
                  y1="28"
                  x2={x + 16}
                  y2="32"
                  stroke="white"
                  stroke-width="3"
                  stroke-linecap="round"
                  opacity="0.9"
                />
                <line
                  x1={x}
                  y1="58"
                  x2={x - 12}
                  y2="88"
                  stroke="white"
                  stroke-width="3.5"
                  stroke-linecap="round"
                  opacity="0.9"
                />
                <line
                  x1={x}
                  y1="58"
                  x2={x + 12}
                  y2="88"
                  stroke="white"
                  stroke-width="3.5"
                  stroke-linecap="round"
                  opacity="0.9"
                />
                <line
                  x1={x - 12}
                  y1="88"
                  x2={x - 18}
                  y2="88"
                  stroke="white"
                  stroke-width="3"
                  stroke-linecap="round"
                  opacity="0.8"
                />
                <line
                  x1={x + 12}
                  y1="88"
                  x2={x + 18}
                  y2="88"
                  stroke="white"
                  stroke-width="3"
                  stroke-linecap="round"
                  opacity="0.8"
                />
              {/each}
            {:else if id === "15"}
              <!-- 15. The Way Spreads: branching network -->
              <circle cx="50" cy="55" r="6" fill="white" opacity="0.95" />
              {#each [{ x: 170, y: 25 }, { x: 170, y: 55 }, { x: 170, y: 85 }] as n}
                <line
                  x1="56"
                  y1="55"
                  x2={n.x - 5}
                  y2={n.y}
                  stroke="white"
                  stroke-width="1.5"
                  opacity="0.7"
                />
                <circle cx={n.x} cy={n.y} r="5" fill="white" opacity="0.9" />
              {/each}
              {#each [{ f: { x: 170, y: 25 }, t: [{ x: 300, y: 12 }, { x: 300, y: 38 }] }, { f: { x: 170, y: 55 }, t: [{ x: 300, y: 55 }] }, { f: { x: 170, y: 85 }, t: [{ x: 300, y: 72 }, { x: 300, y: 98 }] }] as br}
                {#each br.t as p}
                  <line
                    x1={br.f.x + 5}
                    y1={br.f.y}
                    x2={p.x - 4}
                    y2={p.y}
                    stroke="white"
                    stroke-width="1.5"
                    opacity="0.7"
                  />
                  <circle cx={p.x} cy={p.y} r="4" fill="white" opacity="0.9" />
                {/each}
              {/each}
            {:else if id === "16"}
              <!-- 16. What Flourishes: wheat stalks, harvest -->
              {#each [60, 110, 160, 210, 260, 310] as x}
                <line
                  x1={x}
                  y1="100"
                  x2={x}
                  y2="35"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  opacity="0.9"
                />
                {#each [42, 54, 66, 78] as y}
                  <ellipse
                    cx={x - 5}
                    cy={y}
                    rx="4.5"
                    ry="3"
                    fill="white"
                    opacity="0.9"
                    transform={`rotate(-30 ${x - 5} ${y})`}
                  />
                  <ellipse
                    cx={x + 5}
                    cy={y}
                    rx="4.5"
                    ry="3"
                    fill="white"
                    opacity="0.9"
                    transform={`rotate(30 ${x + 5} ${y})`}
                  />
                {/each}
                <ellipse
                  cx={x}
                  cy="32"
                  rx="3"
                  ry="5"
                  fill="white"
                  opacity="0.95"
                />
              {/each}
            {/if}
          </svg>
        </div>
      </div>
    </div>

    <!-- ── Overview Poster ── -->
    <section class="section poster-section">
      <div class="section-inner poster-inner">
        <div class="section-label">Overview</div>

        <div
          class="infographic"
          style="background:{goal.gradient ??
            goal.color}; color:{goal.textColor}"
        >
          <div class="info-header">
            <img
              src="{base}/goals_wheel.svg"
              alt="Goals"
              style="width:44px;height:44px;"
            />
            <span class="info-report">LIVING WAY RECORD 2026</span>
            <div class="info-corner"></div>
          </div>

          <div class="info-body">
            <svg
              viewBox="0 0 500 520"
              width="100%"
              style="max-width:860px; display:block;"
            >
              {#each Array(16) as _, i}
                {@const angle = (((i * 360) / 16 - 90) * Math.PI) / 180}
                {@const r = 190}
                {@const cx = 250 + r * Math.cos(angle)}
                {@const cy = 220 + r * Math.sin(angle)}
                <a href="{base}/goals/{i + 1}">
                  <circle
                    {cx}
                    {cy}
                    r="22"
                    fill={i === parseInt(id) - 1 ? "#fff" : goalColors[i]}
                    stroke={i === parseInt(id) - 1
                      ? goal.textColor
                      : "rgba(255,255,255,0.4)"}
                    stroke-width={i === parseInt(id) - 1 ? "4" : "1"}
                    opacity={i === parseInt(id) - 1 ? "1" : "0.8"}
                  />
                  <text
                    x={cx}
                    y={cy + 5}
                    text-anchor="middle"
                    font-size="12"
                    font-weight="800"
                    fill={i === parseInt(id) - 1
                      ? goal.color
                      : "rgba(255,255,255,0.95)"}
                    font-family="sans-serif"
                    style="pointer-events:none">{i + 1}</text
                  >
                </a>
              {/each}
              <text
                x="250"
                y="120"
                text-anchor="middle"
                font-family="Koulen, sans-serif"
                font-size="28"
                fill="white"
                letter-spacing="2">{lines[0]}</text
              >
              <text
                x="250"
                y="162"
                text-anchor="middle"
                font-family="Koulen, sans-serif"
                font-size="28"
                fill="white"
                letter-spacing="2">{lines[1]}</text
              >
              <rect
                x="80"
                y="180"
                width="330"
                height="54"
                fill="#c0392b"
                rx="2"
              />
              <text
                x="250"
                y="216"
                text-anchor="middle"
                font-family="Koulen, sans-serif"
                font-size="28"
                fill="white"
                letter-spacing="2">{lines[2]}</text
              >
              <text
                x="250"
                y="275"
                text-anchor="middle"
                font-family="Koulen, sans-serif"
                font-size="28"
                fill="white"
                letter-spacing="1">{lines[3]}</text
              >
              <text
                x="250"
                y="320"
                text-anchor="middle"
                font-family="Koulen, sans-serif"
                font-size="28"
                fill="white"
                letter-spacing="2">{lines[4]}</text
              >
              <text
                x="250"
                y="450"
                text-anchor="middle"
                font-family="Cinzel, serif"
                font-size="11"
                fill="white"
                letter-spacing="3"
                opacity="0.5">CIRCLE OF LIVING SOULS</text
              >
            </svg>
          </div>

          <div class="info-footer">
            <div class="info-footer-left">
              <span class="info-goal-num">{goal.id}</span>
              <div>
                <div class="info-goal-name">
                  {goal.title.substring(0, 30).toUpperCase()}
                </div>
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
              {#each features[id] ?? [] as feat}
                <li>
                  <span class="up-dot" style="background:{goal.color}"></span>
                  {feat}
                </li>
              {/each}
            </ul>
          </div>
        </div>

        <p class="poster-caption">
          Living Way Goals — United Sovereigns · Goal {goal.id}
        </p>
      </div>
    </section>

    <!-- ── Related Goals ── -->
    <section class="section related-section">
      <div class="section-inner">
        <div class="section-label">Related Goals</div>
        <div class="related-grid">
          {#each relatedGoals as rg}
            <a
              href="{base}/goals/{rg.id}"
              class="related-tile"
              style="background:{rg.gradient ?? rg.color}; color:{rg.textColor}"
            >
              <span class="related-num">{rg.id}</span>
              <span class="related-title">{rg.title}</span>
              <span class="related-arrow">→</span>
            </a>
          {/each}
        </div>
      </div>
    </section>

  

<!-- ── Videos ── -->
{#if videos.length > 0}
  <section class="section videos-section">
    <div class="section-inner">
   <div class="section-label">
  {#if videos.every(v => v.type === 'book')}
    Related Books
  {:else if videos.every(v => v.type !== 'book')}
    Related Videos
  {:else}
    Related Media
  {/if}
</div>
      <div class="videos-grid">
{#each videos as video}
  <div class="video-card">
    {#if video.type === 'book'}
      <div class="book-card-inner">
        <span class="book-icon">📖</span>
        <p class="video-title">{video.title}</p>
        <a href={video.pdf} target="_blank" class="book-link">↗ Read PDF</a>
      </div>
    {:else}
      <div class="video-wrap">
        {#if video.type === 'youtube'}
          <iframe
            src="https://www.youtube.com/embed/{video.id}"
            frameborder="0"
            allowfullscreen
            title={video.title}
          ></iframe>
        {:else}
          <iframe
            src="https://streamable.com/e/{video.id}"
            frameborder="0"
            allowfullscreen
            title={video.title}
          ></iframe>
        {/if}
      </div>
      <p class="video-title">{video.title}</p>
    {/if}
  </div>
{/each}
      </div>
    </div>
  </section>
{/if}
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
                    <p class="pub-meta">
                      {doc.author} · {doc.size} · {doc.date}
                    </p>
                    <div class="pub-actions">
                      <a
                        href={doc.fileData ?? doc.fileName}
                        target="_blank"
                        class="pub-btn-read">↗ Read</a
                      >
                      <a
                        href={doc.fileData ?? doc.fileName}
                        download={doc.fileName}
                        class="pub-btn-dl">↓ Receive</a
                      >
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          {:else}
            <div class="empty-pubs">
              <p>No records yet for this goal.</p>
              <a
                href="{base}/upload"
                class="upload-link"
                style="color:{goal.color}">+ Give a record →</a
              >
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
                  {#if item.pdf}
                    <a href={item.pdf} target="_blank" class="news-pdf"
                      >↗ Read PDF</a
                    >
                  {/if}
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
      <a
        href="{base}/goals/{prevGoal().id}"
        class="bottom-btn"
        style="border-color:{goal.color}; color:{goal.color}"
      >
        ← {prevGoal().title}
      </a>
      <a
        href="{base}/"
        class="bottom-btn-center"
        style="background:{goal.color}"
      >
        All 16 Goals
      </a>
      <a
        href="{base}/goals/{nextGoal().id}"
        class="bottom-btn"
        style="border-color:{goal.color}; color:{goal.color}"
      >
        {nextGoal().title} →
      </a>
    </div>
  </div>
{/if}

<style>
  :global(body) {
    background: #fff;
  }
  .goal-page {
    background: #fff;
    min-height: 100vh;
  }

  /* ── Hero ── */
  .hero {
    position: relative;
    overflow: hidden;
    padding-bottom: 3rem;
  }
  .hero-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
  }
  .hero-bg::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse at 80% 50%,
      rgba(255, 255, 255, 0.08) 0%,
      transparent 70%
    );
  }
  .hero-inner {
    position: relative;
    z-index: 1;
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 2rem;
  }
  .hero-nav {
    display: flex;
    align-items: center;
    padding: 1.25rem 0;
  }
  .nav-pill {
    font-family: Koulen;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    color: var(--c2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 0.35rem 0.9rem;
    text-decoration: none;
    transition: background 0.15s;
  }
  .nav-pill:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
  }
  .goal-badge {
    font-family: Koulen;
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    color: var(--c2);
    opacity: 0.75;
    margin-bottom: 0.75rem;
  }
  .hero-content {
    padding: 0.5rem 0 3rem;
    max-width: 65%;
  }
  .hero-content h1 {
    font-family: Koulen;
    font-size: clamp(1.4rem, 3.5vw, 2.4rem);
    font-weight: 500;
    color: #fff;
    line-height: 1.15;
    margin-bottom: 0.75rem;
  }
  .title-bar {
    width: 48px;
    height: 4px;
    background: #fff;
    opacity: 0.7;
    margin-bottom: 1.25rem;
    border-radius: 2px;
  }
  .hero-summary {
    font-family: Koulen;
    font-size: 0.95rem;
    color: var(--c2);
    line-height: 1.7;
    opacity: 0.9;
    margin-bottom: 1.5rem;
  }
  .hero-nav-btns {
    display: flex;
    gap: 0.75rem;
    align-items: center;
  }
  .hero-pill-btn {
    font-family: Koulen;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    color: #fff;
    text-decoration: none;
    border: 1.5px solid rgba(255, 255, 255, 0.8);
    border-radius: 999px;
    padding: 0.35rem 1rem;
    transition:
      background 0.15s,
      border-color 0.15s;
  }
  .hero-pill-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: #fff;
    color: #fff;
  }
  .hero-figures {
    position: absolute;
    right: 2rem;
    bottom: 1.5rem;
    opacity: 1;
    pointer-events: none;
    mask-image: linear-gradient(
      to left,
      rgba(255, 255, 255, 1) 60%,
      rgba(255, 255, 255, 0) 100%
    );
    -webkit-mask-image: linear-gradient(
      to left,
      rgba(255, 255, 255, 1) 60%,
      rgba(255, 255, 255, 0) 100%
    );
  }
  /* ── Sections ── */
  .section {
    padding: 3.5rem 2rem;
    border-bottom: 1px solid #eee;
  }
  .section-inner {
    max-width: 1100px;
    margin: 0 auto;
  }
  .section-label {
    font-family: Koulen;
    font-size: 2rem;
    font-weight: 500;
    text-transform: uppercase;
    color: #070707;
    margin-bottom: 1.75rem;
    padding-bottom: 0.6rem;
    border-bottom: 1px solid #eee;
  }

  /* ── Poster ── */
  .poster-section {
    background: #f0f0f0;
  }
  .poster-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .poster-inner .section-label {
    align-self: flex-start;
    width: 100%;
  }
  .infographic {
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 860px;
  }
  .info-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.5rem;
    background: rgba(0, 0, 0, 0.2);
    position: relative;
  }
  .info-report {
    font-family: Koulen;
    font-size: 1rem;
    letter-spacing: 0.1em;
    opacity: 0.9;
  }
  .info-corner {
    position: absolute;
    top: 0;
    right: 0;
    width: 70px;
    height: 70px;
    background: rgba(255, 255, 255, 0.15);
    clip-path: polygon(100% 0, 0 0, 100% 100%);
  }
  .info-body {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    width: 100%;
  }
  .info-footer {
    background: rgba(0, 0, 0, 0.3);
    padding: 1rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }
  .info-footer-left {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  .info-goal-num {
    font-family: Koulen;
    font-size: 1.8rem;
    opacity: 0.9;
  }
  .info-goal-name {
    font-family: Koulen;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    opacity: 0.85;
    line-height: 1.3;
  }
  .info-goal-sub {
    font-family: Koulen;
    font-size: 0.5rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    opacity: 0.6;
    margin-top: 0.1rem;
  }
  .info-footer-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    font-family: Koulen;
    font-size: 0.75rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    gap: 0.2rem;
  }

  /* ── Under poster ── */
  .under-poster {
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: 3rem;
    margin-top: 3rem;
    width: 100%;
    max-width: 860px;
    align-items: start;
  }
  .up-num {
    font-family: Koulen;
    font-size: 5rem;
    line-height: 1;
    opacity: 0.2;
    margin-bottom: 0.5rem;
  }
  .up-title {
    font-family: Koulen;
    font-size: clamp(1.4rem, 3vw, 2rem);
    color: #111;
    line-height: 1.2;
    margin-bottom: 0.75rem;
  }
  .up-summary {
    font-family: Koulen;
    font-size: 1rem;
    color: #555;
    line-height: 1.7;
    margin-bottom: 1rem;
  }
  .up-desc {
    font-family: Koulen;
    font-size: 0.92rem;
    color: #444;
    line-height: 1.9;
  }
  .up-label {
    font-family: Koulen;
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: #999;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #eee;
  }
  .up-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  .up-list li {
    font-family: Koulen;
    font-size: 0.88rem;
    color: #222;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    line-height: 1.4;
  }
  .up-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .poster-caption {
    font-family: Koulen;
    font-size: 0.7rem;
    color: #aaa;
    margin-top: 1.5rem;
    letter-spacing: 0.05em;
    align-self: flex-start;
  }

  /* ── Related ── */
  .related-section {
    background: #fafafa;
  }
  .related-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
  }
  .related-tile {
    border-radius: 10px;
    padding: 1.25rem 1rem;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    transition:
      transform 0.15s,
      box-shadow 0.15s;
    position: relative;
    overflow: hidden;
  }
  .related-tile::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 60%
    );
  }
  .related-tile:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }
  .related-num {
    font-family: "Cinzel", serif;
    font-size: 0.7rem;
    opacity: 0.6;
  }
  .related-title {
    font-family: Koulen;
    font-size: 0.85rem;
    line-height: 1.3;
  }
  .related-arrow {
    font-size: 0.85rem;
    margin-top: 0.5rem;
    opacity: 0.6;
  }

  /* ── Records + News ── */
  .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }
  .pub-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .pub-item {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    padding: 1rem;
    background: #fafafa;
    border: 1px solid #eee;
    border-radius: 6px;
  }
  .pub-icon {
    width: 36px;
    height: 36px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    color: #fff;
    flex-shrink: 0;
  }
  .pub-title {
    font-family: Koulen;
    font-size: 0.85rem;
    color: #111;
    margin-bottom: 0.2rem;
  }
  .pub-meta {
    font-family: Koulen;
    font-size: 0.72rem;
    color: #999;
    margin-bottom: 0.6rem;
  }
  .pub-actions {
    display: flex;
    gap: 0.5rem;
  }
  .pub-btn-read,
  .pub-btn-dl {
    font-family: Koulen;
    font-size: 0.7rem;
    padding: 0.25rem 0.7rem;
    border-radius: 999px;
    text-decoration: none;
    transition: all 0.15s;
  }
  .pub-btn-read {
    background: #009edb;
    color: #fff;
  }
  .pub-btn-read:hover {
    background: #007bb5;
    color: #fff;
  }
  .pub-btn-dl {
    border: 1px solid #ccc;
    color: #555;
  }
  .pub-btn-dl:hover {
    border-color: #009edb;
    color: #009edb;
  }
  .empty-pubs {
    padding: 2rem;
    background: #fafafa;
    border: 1px dashed #ddd;
    border-radius: 6px;
    text-align: center;
  }
  .empty-pubs p {
    font-family: Koulen;
    font-size: 0.85rem;
    color: #999;
    margin-bottom: 0.75rem;
  }
  .upload-link {
    font-family: Koulen;
    font-size: 0.82rem;
    text-decoration: none;
  }
  .news-list {
    display: flex;
    flex-direction: column;
  }
  .news-item {
    display: flex;
    gap: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid #eee;
    position: relative;
  }
  .news-bar {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    border-radius: 2px;
    opacity: 0;
    transition: opacity 0.2s;
  }
  .news-item:hover .news-bar {
    opacity: 1;
  }
  .news-date {
    font-family: "Cinzel", serif;
    font-size: 0.65rem;
    color: #aaa;
    white-space: nowrap;
    padding-top: 0.15rem;
    width: 60px;
    flex-shrink: 0;
  }
  .news-title {
    font-family: Koulen;
    font-size: 0.95rem;
    color: #222;
    line-height: 1.4;
    margin-bottom: 0.2rem;
  }
  .news-source {
    font-family: Koulen;
    font-size: 0.75rem;
    color: #aaa;
  }
  .news-pdf {
    font-family: Koulen;
    font-size: 0.75rem;
    color: #009edb;
    text-decoration: none;
    display: inline-block;
    margin-top: 0.35rem;
    letter-spacing: 0.05em;
  }
  .news-pdf:hover {
    text-decoration: underline;
  }

  /* ── Bottom nav ── */
  .bottom-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 2.5rem 2rem;
    background: #fafafa;
    border-top: 1px solid #eee;
    flex-wrap: wrap;
  }
  .bottom-btn {
    font-family: Koulen;
    font-size: 0.78rem;
    padding: 0.6rem 1.25rem;
    border-radius: 999px;
    border: 2px solid;
    text-decoration: none;
    transition: opacity 0.15s;
  }
  .bottom-btn:hover {
    opacity: 0.7;
  }
  .bottom-btn-center {
    font-family: Koulen;
    font-size: 0.78rem;
    padding: 0.6rem 1.5rem;
    border-radius: 999px;
    color: #fff;
    text-decoration: none;
    transition: opacity 0.15s;
  }
  .bottom-btn-center:hover {
    opacity: 0.85;
    color: #fff;
  }
  .not-found {
    padding: 5rem;
    text-align: center;
    font-family: Koulen;
    color: #888;
    background: #fff;
    min-height: 100vh;
  }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .hero-figures {
      display: none;
    }
    .hero-content {
      max-width: 100%;
    }
    .under-poster {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    .two-col {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    .related-grid {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 600px) {
    .section {
      padding: 2rem 1rem;
    }
    .hero-inner {
      padding: 0 1rem;
    }
    .related-grid {
      grid-template-columns: 1fr;
    }
    .bottom-nav {
      flex-direction: column;
    }
  }
  /* ── Videos ── */
.videos-section { background: #fafafa; }
.videos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  max-width: 800px;
}
.video-card {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-top: 3px solid #009edb;
  overflow: hidden;
  border-radius: 12px;
}
.video-wrap {
  position: relative;
  padding-bottom: 120%;
  height: 0;
  overflow: hidden;
  background: #000;
}
.video-wrap iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.video-title {
  font-family: sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: #222;
  padding: 0.6rem 0.75rem;
}
.book-card-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 2rem 1rem;
  text-align: center;
}

.book-icon {
  font-size: 3rem;
}

.book-link {
  font-family: Koulen;
  font-size: 0.78rem;
  color: #009edb;
  border: 1px solid #009edb;
  border-radius: 999px;
  padding: 0.35rem 1rem;
  text-decoration: none;
  transition: all 0.15s;
}

.book-link:hover {
  background: #009edb;
  color: #fff;
}
</style>
