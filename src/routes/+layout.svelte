<script>
import { base } from '$app/paths';
  import '../app.css';
  import { page } from '$app/stores';
  let menuOpen = $state(false);

  const nav = [
    { href: '/', label: 'Home' },
    { href: '/', label: 'Library' },
    { href: '/upload', label: 'Upload' },
    { href: '/about', label: 'About' },
  ];

  const langs = ['English', 'Русский', 'العربية', '中文'];
  let activeLang = $state('English');
</script>

<div class="layout">

  <!-- Top bar -->
  <div class="topbar">
    <span class="topbar-welcome">🏠 Welcome to United Sovereigns</span>
    <div class="topbar-langs">
      {#each langs as lang}
        <button
          class="lang-btn"
          class:active={activeLang === lang}
          onclick={() => activeLang = lang}
        >{lang}</button>
      {/each}
    </div>
  </div>

  <!-- Logo + title + search -->
  <div class="masthead">
    <div class="masthead-inner">
<a href="{base}/" class="brand">
  <img src="{base}/united_sovereigns_logo.svg" alt="United Sovereigns logo" class="brand-logo-img" />
        <div class="brand-text">
          <span class="brand-name">United <br> Sovereigns</span>
          <span class="brand-sub">Open circle of Living Souls</span>
        </div>
      </a>

      <div class="masthead-search">
        <input type="search" placeholder="Search documents…" />
        <button class="search-btn">🔍</button>
      </div>
    </div>
  </div>

<!-- Main nav bar -->
  <nav class="navbar">
    <div class="navbar-inner">
      {#each nav as n}
        <a href="{base}{n.href}" class:active={$page.url.pathname === base + n.href}>{n.label}</a>
      {/each}
    </div>

    <!-- Mobile hamburger -->
    <button class="hamburger" onclick={() => menuOpen = !menuOpen}>
      {menuOpen ? '✕' : '☰'}
    </button>
  </nav>

  {#if menuOpen}
    <div class="mobile-menu">
      {#each nav as n}
        <a href="{base}{n.href}" onclick={() => menuOpen = false}>{n.label}</a>
      {/each}
    </div>
  {/if}

  <main><slot /></main>
  <footer>
    <span>© {new Date().getFullYear()} DocShelf</span>
    <span class="dim">store · share · archive</span>
  </footer>
</div>

<style>
  .layout { display: flex; flex-direction: column; min-height: 100vh; }

  /* ── Top bar ── */
  .topbar {
    background: #f5f5f5;
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.35rem 2rem;
    font-size: 0.75rem;
    color: #444;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .topbar-welcome { color: #555; }

  .topbar-langs {
    display: flex;
    gap: 0.1rem;
    flex-wrap: wrap;
  }

  .lang-btn {
    font-size: 0.72rem;
    color: #555;
    padding: 0.2rem 0.6rem;
    border-radius: 2px;
    cursor: pointer;
    background: none;
    border: none;
    font-family: Koulen;
    transition: background 0.15s, color 0.15s;
  }

  .lang-btn:hover { background: #e0e0e0; }
  .lang-btn.active {
    background: #009edb;
    color: #fff;
    font-weight: 600;
  }

  /* ── Masthead ── */
  .masthead {
    background: #fff;
    border-bottom: 3px solid #009edb;
    padding: 1rem 2rem;
  }

  .masthead-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    text-decoration: none;
    color: inherit;
  }



  .brand-text {
    display: flex;
    flex-direction: column;
    border-left: 2px solid #ccc;
    padding-left: 1rem;
  }

  .brand-name {
    font-size: 3.4rem;
    font-weight: 500;
    color: #5c1f85;
    font-family: Koulen;
    line-height: 1
    ;
  }

  .brand-sub {
    font-size: 0.85rem;
    color: #555;
    font-family: Koulen;
  }

  .masthead-search {
    display: flex;
    border: 1px solid #ccc;
    border-radius: 2px;
    overflow: hidden;
    flex-shrink: 0;
  }

  .masthead-search input {
    border: none;
    outline: none;
    padding: 0.5rem 0.75rem;
    font-size: 0.85rem;
    width: 220px;
    background: #fff;
    color: #222;
    font-family: Koulen;
  }

  .search-btn {
    background: #009edb;
    color: white;
    border: none;
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background 0.15s;
  }

  .search-btn:hover { background: #007bb5; }

  /* ── Navbar ── */
  .navbar {
    background: #4a4a4a;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .navbar-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: stretch;
  }

  .navbar-inner a {
    color: #fff;
    font-family: Koulen;
    font-size: 0.85rem;
    padding: 0.85rem 1.25rem;
    display: flex;
    align-items: center;
    transition: background 0.15s;
    border-right: 1px solid rgba(255,255,255,0.08);
    letter-spacing: 0.02em;
  }

  .navbar-inner a:hover, .navbar-inner a.active {
    background: #009edb;
    color: #fff;
  }

  .hamburger {
    display: none;
    color: white;
    font-size: 1.3rem;
    padding: 0.75rem 1rem;
    margin-left: auto;
    background: none;
    border: none;
    cursor: pointer;
  }

  /* ── Mobile menu ── */
  .mobile-menu {
    background: #3a3a3a;
    display: flex;
    flex-direction: column;
    z-index: 99;
  }

  .mobile-menu a {
    color: #fff;
    font-family: Koulen;
    font-size: 0.9rem;
    padding: 0.9rem 1.5rem;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    transition: background 0.15s;
  }

  .mobile-menu a:hover { background: #009edb; }

  /* ── Footer ── */
  main { flex: 1; }

  footer {
    background: #4a4a4a;
    color: #aaa;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    font-family: sans-serif;
  }

  .dim { font-style: italic; }

  /* ── Responsive ── */
  @media (max-width: 640px) {
    .topbar { padding: 0.35rem 1rem; }
    .masthead { padding: 0.75rem 1rem; }
    .masthead-search { display: none; }
    .brand-logo { width: 48px; height: 48px; font-size: 1.3rem; }
    .brand-name { font-size: 1.1rem; }
    .navbar-inner { display: none; }
    .hamburger { display: block; }
  }
</style>