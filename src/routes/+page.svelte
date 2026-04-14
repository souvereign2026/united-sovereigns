<script>
  import { docs, CATEGORIES } from '$lib/store.js';

  let search = $state('');
  let activeCategory = $state('all');

  let filtered = $derived(
    $docs.filter(doc => {
      const matchCat = activeCategory === 'all' || doc.category === activeCategory;
      const q = search.toLowerCase();
      const matchSearch = !q ||
        doc.title.toLowerCase().includes(q) ||
        doc.author.toLowerCase().includes(q) ||
        doc.tags.some(t => t.toLowerCase().includes(q)) ||
        doc.description.toLowerCase().includes(q);
      return matchCat && matchSearch;
    })
  );

  function downloadDoc(doc) {
    if (doc.fileData) {
      const a = document.createElement('a');
      a.href = doc.fileData;
      a.download = doc.fileName;
      a.click();
    } else {
      alert(`"${doc.title}" is a sample entry — upload real files via the Upload page.`);
    }
  }

  function removeDoc(id) {
    if (confirm('Remove this document?')) docs.remove(id);
  }
</script>

<svelte:head>
  <title>DocShelf — Library</title>
</svelte:head>

<!-- ── Hero Section ── -->
<section class="hero">
  <div class="hero-inner">
    <div class="hero-image">
      <img
        src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=900&auto=format&fit=crop"
        alt="Library"
      />
    </div>
    <div class="hero-content">
      <h1>Knowledge,<br/>Archived &<br/>Accessible.</h1>
      <p>
       Living knowledge, craft and discovery are the instruments by which free solvens advance the Living Way Goals — grounding action in what is true, hastening what is needed, and carrying proven answers to those who hold the greatest need.
      </p>
      <p>
       On 6–7 May 2026, the eleventh annual Solven of Living Knowledge, Craft and Discovery for the Living Way Goals will be held under the roof of United Sovereigns in New York.

      </p>
      <div class="hero-actions">
<a href="/docs/Agenda_Living_Way.pdf" target="_blank" class="btn-outline">↗ Read Agenda Living Way</a>
        <a href="#library" class="btn-outline">Browse Library</a>
      </div>
    </div>
  </div>
</section>

<!-- ── Stats bar ── -->
<div class="stats-bar">
  <div class="stat">
    <span class="stat-num">{$docs.length}</span>
    <span class="stat-label">Documents</span>
  </div>
  <div class="stat-divider"></div>
  <div class="stat">
    <span class="stat-num">{[...new Set($docs.map(d => d.category))].length}</span>
    <span class="stat-label">Categories</span>
  </div>
  <div class="stat-divider"></div>
  <div class="stat">
    <span class="stat-num">{$docs.filter(d => d.fileData).length}</span>
    <span class="stat-label">Downloadable</span>
  </div>
  <div class="stat-divider"></div>
  <div class="stat">
    <span class="stat-num">{[...new Set($docs.flatMap(d => d.tags))].length}</span>
    <span class="stat-label">Tags</span>
  </div>
</div>

<!-- ── Library Section ── -->
<section class="library" id="library">
  <div class="library-inner">

    <div class="section-header">
      <h2>Document Library</h2>
      <a href="/upload" class="btn-solid-sm">+ Add Document</a>
    </div>

    <!-- Controls -->
    <div class="controls">
      <div class="search-wrap">
        <span class="search-icon">⌕</span>
        <input
          type="search"
          placeholder="Search title, author, tag…"
          bind:value={search}
        />
      </div>
      <div class="categories">
        {#each CATEGORIES as cat}
          <button
            class="cat-btn"
            class:active={activeCategory === cat.id}
            onclick={() => activeCategory = cat.id}
          >{cat.label}</button>
        {/each}
      </div>
    </div>

    <p class="result-count">
      {filtered.length} document{filtered.length !== 1 ? 's' : ''}
      {#if search || activeCategory !== 'all'}
        — <button class="clear-btn" onclick={() => { search = ''; activeCategory = 'all'; }}>clear filters</button>
      {/if}
    </p>

    <!-- Grid -->
    {#if filtered.length === 0}
      <div class="empty">
        <p>No documents found.</p>
        <a href="/upload" class="btn-solid">Upload one</a>
      </div>
    {:else}
      <div class="grid">
        {#each filtered as doc (doc.id)}
          <article class="card">
            <div class="card-top">
              <span class="card-cat">{doc.category}</span>
              <button class="remove-btn" onclick={() => removeDoc(doc.id)}>✕</button>
            </div>
            <h3 class="card-title">{doc.title}</h3>
            <p class="card-author">{doc.author}</p>
            <p class="card-desc">{doc.description}</p>
            <div class="card-tags">
              {#each doc.tags as tag}
                <button class="tag" onclick={() => search = tag}>#{tag}</button>
              {/each}
            </div>
            <div class="card-footer">
              <div class="card-meta">
                <span>{doc.size}</span>
                {#if doc.pages}<span>· {doc.pages}p</span>{/if}
                <span>· {doc.date}</span>
              </div>
              <button class="btn-download" onclick={() => downloadDoc(doc)}>↓ Download</button>
            </div>
          </article>
        {/each}
      </div>
    {/if}
  </div>
</section>

<style>
  /* ── Hero ── */
  .hero {
    background: #fff;
    border-bottom: 1px solid #e0e0e0;
    padding: 2.5rem 2rem;
  }

  .hero-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: 3rem;
    align-items: center;
  }

  .hero-image img {
    width: 100%;
    height: 420px;
    object-fit: cover;
    display: block;
    border-radius: 2px;
  }

  .hero-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .hero-content h1 {
    font-family: sans-serif;
    font-size: clamp(1.8rem, 3.5vw, 2.6rem);
    font-weight: 800;
    color: #111;
    line-height: 1.15;
  }

  .hero-content p {
    font-family: sans-serif;
    font-size: 0.9rem;
    color: #444;
    line-height: 1.7;
  }

  .hero-actions {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    margin-top: 0.5rem;
  }

  .btn-solid {
    background: #4caf50;
    color: #fff;
    font-family: sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    padding: 0.65rem 1.4rem;
    border-radius: 999px;
    border: 2px solid #4caf50;
    cursor: pointer;
    transition: background 0.2s;
    text-decoration: none;
    display: inline-block;
  }

  .btn-solid:hover { background: #388e3c; border-color: #388e3c; color: #fff; }

  .btn-outline {
    background: transparent;
    color: #009edb;
    font-family: sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    padding: 0.65rem 1.4rem;
    border-radius: 999px;
    border: 2px solid #009edb;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;
    display: inline-block;
  }

  .btn-outline:hover { background: #009edb; color: #fff; }

  /* ── Stats bar ── */
  .stats-bar {
    background: #f9f9f9;
    border-bottom: 1px solid #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    padding: 1.25rem 2rem;
    flex-wrap: wrap;
  }

  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 2.5rem;
  }

  .stat-num {
    font-family: sans-serif;
    font-size: 1.8rem;
    font-weight: 800;
    color: #009edb;
    line-height: 1;
  }

  .stat-label {
    font-family: sans-serif;
    font-size: 0.72rem;
    color: #777;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-top: 0.2rem;
  }

  .stat-divider {
    width: 1px;
    height: 40px;
    background: #ddd;
  }

  /* ── Library ── */
  .library {
    background: #f5f5f5;
    padding: 2.5rem 2rem 4rem;
  }

  .library-inner {
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid #009edb;
  }

  .section-header h2 {
    font-family: sans-serif;
    font-size: 1.3rem;
    font-weight: 700;
    color: #222;
  }

  .btn-solid-sm {
    background: #009edb;
    color: #fff;
    font-family: sans-serif;
    font-size: 0.78rem;
    font-weight: 600;
    padding: 0.45rem 1rem;
    border-radius: 999px;
    border: none;
    cursor: pointer;
    transition: background 0.2s;
    text-decoration: none;
  }

  .btn-solid-sm:hover { background: #007bb5; color: #fff; }

  /* Controls */
  .controls {
    display: flex;
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }

  .search-wrap {
    position: relative;
    flex: 1;
    min-width: 200px;
    max-width: 400px;
  }

  .search-icon {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: #aaa;
    font-size: 1.1rem;
    pointer-events: none;
  }

  .search-wrap input {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 2px;
    padding: 0.55rem 0.75rem 0.55rem 2.2rem;
    font-size: 0.85rem;
    font-family: sans-serif;
    outline: none;
    background: #fff;
    color: #222;
    transition: border-color 0.2s;
  }

  .search-wrap input:focus { border-color: #009edb; }

  .categories {
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
  }

  .cat-btn {
    font-family: sans-serif;
    font-size: 0.75rem;
    padding: 0.35rem 0.85rem;
    border: 1px solid #ccc;
    border-radius: 999px;
    background: #fff;
    color: #555;
    cursor: pointer;
    transition: all 0.15s;
  }

  .cat-btn:hover, .cat-btn.active {
    background: #009edb;
    border-color: #009edb;
    color: #fff;
  }

  .result-count {
    font-family: sans-serif;
    font-size: 0.78rem;
    color: #888;
    margin-bottom: 1.25rem;
  }

  .clear-btn {
    color: #009edb;
    font-family: sans-serif;
    font-size: 0.78rem;
    background: none;
    border: none;
    cursor: pointer;
    text-decoration: underline;
  }

  /* Grid */
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
  }

  .card {
    background: #fff;
    border: 1px solid #e0e0e0;
    border-top: 3px solid #009edb;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    transition: box-shadow 0.2s;
  }

  .card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.1); }

  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-cat {
    font-family: sans-serif;
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #009edb;
    font-weight: 600;
  }

  .remove-btn {
    font-size: 0.65rem;
    color: #bbb;
    transition: color 0.15s;
    cursor: pointer;
    background: none;
    border: none;
  }

  .remove-btn:hover { color: #c0392b; }

  .card-title {
    font-family: sans-serif;
    font-size: 1rem;
    font-weight: 700;
    color: #111;
    line-height: 1.3;
  }

  .card-author {
    font-family: sans-serif;
    font-size: 0.78rem;
    color: #777;
    font-style: italic;
  }

  .card-desc {
    font-family: sans-serif;
    font-size: 0.8rem;
    color: #555;
    line-height: 1.6;
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
  }

  .tag {
    font-family: sans-serif;
    font-size: 0.65rem;
    color: #777;
    background: #f0f0f0;
    border: 1px solid #e0e0e0;
    border-radius: 2px;
    padding: 0.15rem 0.4rem;
    cursor: pointer;
    transition: all 0.15s;
  }

  .tag:hover { background: #009edb; color: #fff; border-color: #009edb; }

  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.75rem;
    border-top: 1px solid #eee;
    margin-top: auto;
  }

  .card-meta {
    font-family: sans-serif;
    font-size: 0.68rem;
    color: #aaa;
    display: flex;
    gap: 0.3rem;
  }

  .btn-download {
    font-family: sans-serif;
    font-size: 0.72rem;
    font-weight: 600;
    color: #009edb;
    border: 1px solid #009edb;
    border-radius: 999px;
    padding: 0.3rem 0.8rem;
    cursor: pointer;
    transition: all 0.15s;
    background: none;
  }

  .btn-download:hover { background: #009edb; color: #fff; }

  .empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 4rem;
    text-align: center;
    font-family: sans-serif;
    color: #888;
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .hero-inner { grid-template-columns: 1fr; gap: 1.5rem; }
    .hero-image img { height: 240px; }
    .stat { padding: 0 1.25rem; }
    .stat-num { font-size: 1.4rem; }
    .library { padding: 2rem 1rem 3rem; }
    .hero { padding: 1.5rem 1rem; }
  }

  @media (max-width: 480px) {
    .stats-bar { gap: 0.5rem; }
    .stat-divider { display: none; }
    .stat { padding: 0.5rem 1rem; }
    .grid { grid-template-columns: 1fr; }
  }
</style>