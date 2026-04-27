<script>
import { base } from '$app/paths';
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
      alert(`"${doc.title}" is a sample entry — give real files via the Give page.`);
    }
  }

  function removeDoc(id) {
    if (confirm('Drop this record?')) docs.remove(id);
  }

  const topics = [
    { num: '1',  label: 'No Intermediary',      icon: '☀', color: '#1a4a2e' },
    { num: '2',  label: 'The Living Body',       icon: '♁', color: '#3a1a5e' },
    { num: '3',  label: 'The Tally',             icon: '▤', color: '#7a4a10' },
    { num: '4',  label: 'Shelter Reclaimed',     icon: '⌂', color: '#2a3a5e' },
    { num: '5',  label: 'Living Engine',         icon: '◎', color: '#5e1a1a' },
    { num: '6',  label: 'Living Soil',           icon: '✦', color: '#3a4a1a' },
    { num: '7',  label: 'The Clean Table',       icon: '♆', color: '#6a3a0a' },
    { num: '8',  label: 'Sacred Water',          icon: '◈', color: '#2a4a6e' },
    { num: '9',  label: 'Blue Sky',              icon: '✺', color: '#1a3a5e' },
    { num: '10', label: 'Open Archive',          icon: '◫', color: '#1a4a3a' },
    { num: '11', label: 'Living Teaching',       icon: '⚇', color: '#6a5a10' },
    { num: '12', label: 'Open Land',             icon: '⌂', color: '#3a2a0a' },
    { num: '13', label: 'The Circle',            icon: '✦', color: '#1a4a4a' },
    { num: '14', label: 'getting to know each other', icon: '≋', color: '#5a3a0a' },
    { num: '15', label: 'The Way Spreads',       icon: '⊛', color: '#1a2a4e' },
    { num: '16', label: 'What Flourishes',       icon: '▐', color: '#3a4a0a' },
  ];
</script>

<svelte:head>
  <title>Living Archive — Records</title>
</svelte:head>

<!-- ── Hero Section ── -->
<section class="hero">
  <div class="hero-inner">
    <div class="hero-image">
      <img
        src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=900&auto=format&fit=crop"
        alt="Archive"
      />
    </div>
    <div class="hero-content">
      <h1>Living Knowledge,<br/>Kept &<br/>Open to All.</h1>
      <p>
        Living knowledge, craft and discovery are the instruments by which living solvens advance the Living Way Goals — grounding action in what is true, hastening what is needed, and carrying proven answers to those who hold the greatest need.
      </p>
      <p>
    These words are new and they are ours. Solven. Circle. Bond. Tally. The living way carries its own tongue — learn it here, carry it forward.
      </p>
      <div class="hero-actions">
        <a href="{base}/docs/Agenda_Living_Way.pdf" target="_blank" class="btn-outline">↗ Read Agenda Living Way</a>
        <a href="#archive" class="btn-outline">Browse Archive</a>
      </div>
    </div>
  </div>
</section>

<!-- ── Stats bar ── -->
<div class="stats-bar">
  <div class="stat">
    <span class="stat-num">{$docs.length}</span>
    <span class="stat-label">Records</span>
  </div>
  <div class="stat-divider"></div>
  <div class="stat">
    <span class="stat-num">{[...new Set($docs.map(d => d.category))].length}</span>
    <span class="stat-label">Kinds</span>
  </div>
  <div class="stat-divider"></div>
  <div class="stat">
    <span class="stat-num">{$docs.filter(d => d.fileData).length}</span>
    <span class="stat-label">Receivable</span>
  </div>
  <div class="stat-divider"></div>
  <div class="stat">
    <span class="stat-num">{[...new Set($docs.flatMap(d => d.tags))].length}</span>
    <span class="stat-label">Marks</span>
  </div>
</div>

<!-- ── Living Way Goals Section ── -->
<section class="goals">
  <div class="goals-inner">
    <div class="goals-title">Living Way Goals — United Sovereigns</div>
    <div class="goals-grid">

<a href="{base}/goals/1" class="tile t1">
        <span class="tile-num">1</span>
        <div class="tile-icon"><svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="19" cy="10" r="4" fill="#A8D5BE"/><line x1="19" y1="1" x2="19" y2="5" stroke="#A8D5BE" stroke-width="1.5" stroke-linecap="round"/><line x1="27" y1="4" x2="24.5" y2="6.5" stroke="#A8D5BE" stroke-width="1.5" stroke-linecap="round"/><line x1="30" y1="10" x2="26" y2="10" stroke="#A8D5BE" stroke-width="1.5" stroke-linecap="round"/><line x1="11" y1="4" x2="13.5" y2="6.5" stroke="#A8D5BE" stroke-width="1.5" stroke-linecap="round"/><line x1="8" y1="10" x2="12" y2="10" stroke="#A8D5BE" stroke-width="1.5" stroke-linecap="round"/><line x1="19" y1="16" x2="19" y2="24" stroke="#A8D5BE" stroke-width="1.8" stroke-linecap="round"/><line x1="14" y1="19" x2="24" y2="19" stroke="#A8D5BE" stroke-width="1.5" stroke-linecap="round"/><line x1="19" y1="24" x2="15" y2="30" stroke="#A8D5BE" stroke-width="1.8" stroke-linecap="round"/><line x1="19" y1="24" x2="23" y2="30" stroke="#A8D5BE" stroke-width="1.8" stroke-linecap="round"/></svg></div>
        <div class="tile-label">No Intermediary</div>
</a>

<a href="{base}/goals/2" class="tile t2">
  <span class="tile-num">2</span>
  <div class="tile-icon"><svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="19" cy="19" r="15" fill="none" stroke="#D0A0F0" stroke-width="0.6" opacity="0.4" stroke-dasharray="2 3"/><circle cx="19" cy="9" r="3.5" fill="none" stroke="#D0A0F0" stroke-width="1.5"/><line x1="19" y1="13" x2="19" y2="24" stroke="#D0A0F0" stroke-width="1.5" stroke-linecap="round"/><line x1="14" y1="18" x2="24" y2="18" stroke="#D0A0F0" stroke-width="1.3" stroke-linecap="round"/><line x1="19" y1="24" x2="15" y2="31" stroke="#D0A0F0" stroke-width="1.5" stroke-linecap="round"/><line x1="19" y1="24" x2="23" y2="31" stroke="#D0A0F0" stroke-width="1.5" stroke-linecap="round"/></svg></div>
  <div class="tile-label">The Living Body</div>
</a>

<a href="{base}/goals/3" class="tile t3">
        <span class="tile-num">3</span>
        <div class="tile-icon"><svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="12" width="5" height="20" rx="2" fill="#F5C87A"/><rect x="16" y="8" width="5" height="24" rx="2" fill="#F5C87A"/><line x1="10" y1="15" x2="13" y2="15" stroke="#7D3C00" stroke-width="1"/><line x1="10" y1="18" x2="13" y2="18" stroke="#7D3C00" stroke-width="1"/><line x1="10" y1="21" x2="13" y2="21" stroke="#7D3C00" stroke-width="1"/><line x1="18" y1="11" x2="21" y2="11" stroke="#7D3C00" stroke-width="1"/><line x1="18" y1="14" x2="21" y2="14" stroke="#7D3C00" stroke-width="1"/><line x1="18" y1="17" x2="21" y2="17" stroke="#7D3C00" stroke-width="1"/><line x1="18" y1="20" x2="21" y2="20" stroke="#7D3C00" stroke-width="1"/><line x1="25" y1="14" x2="30" y2="14" stroke="#F5C87A" stroke-width="2" stroke-linecap="round"/><line x1="25" y1="20" x2="30" y2="20" stroke="#F5C87A" stroke-width="2" stroke-linecap="round"/><line x1="25" y1="26" x2="30" y2="26" stroke="#F5C87A" stroke-width="2" stroke-linecap="round"/></svg></div>
        <div class="tile-label">The Tally</div>
</a>

<a href="{base}/goals/4" class="tile t4">
        <span class="tile-num">4</span>
        <div class="tile-icon"><svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="19,6 32,18 6,18" fill="none" stroke="#A0B8F0" stroke-width="1.8"/><rect x="12" y="18" width="14" height="14" rx="1" fill="none" stroke="#A0B8F0" stroke-width="1.8"/><rect x="16" y="24" width="6" height="8" rx="1" fill="#A0B8F0"/><rect x="13" y="20" width="4" height="4" rx="0.5" fill="#A0B8F0"/><rect x="21" y="20" width="4" height="4" rx="0.5" fill="#A0B8F0"/></svg></div>
        <div class="tile-label">Shelter Reclaimed</div>
</a>

<a href="{base}/goals/5" class="tile t5">
  <span class="tile-num">5</span>
  <div class="tile-icon"><svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="19" cy="19" r="8" fill="none" stroke="#F0A0A0" stroke-width="1.8"/><circle cx="19" cy="19" r="3" fill="#F0A0A0"/><line x1="19" y1="7" x2="19" y2="4" stroke="#F0A0A0" stroke-width="1.5" stroke-linecap="round"/><line x1="19" y1="31" x2="19" y2="34" stroke="#F0A0A0" stroke-width="1.5" stroke-linecap="round"/><line x1="7" y1="19" x2="4" y2="19" stroke="#F0A0A0" stroke-width="1.5" stroke-linecap="round"/><line x1="31" y1="19" x2="34" y2="19" stroke="#F0A0A0" stroke-width="1.5" stroke-linecap="round"/><path d="M14 10 Q10 14 10 19" stroke="#F0A0A0" stroke-width="1.2" stroke-linecap="round" fill="none"/><path d="M24 10 Q28 14 28 19" stroke="#F0A0A0" stroke-width="1.2" stroke-linecap="round" fill="none"/><path d="M24 28 Q28 24 28 19" stroke="#F0A0A0" stroke-width="1.2" stroke-linecap="round" fill="none"/><path d="M14 28 Q10 24 10 19" stroke="#F0A0A0" stroke-width="1.2" stroke-linecap="round" fill="none"/></svg></div>
  <div class="tile-label">Living Engine</div>
</a>

<a href="{base}/goals/6" class="tile t6">
  <span class="tile-num">6</span>
  <div class="tile-icon"><svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="19" y1="32" x2="19" y2="16" stroke="#B0D878" stroke-width="2" stroke-linecap="round"/><path d="M19 16 Q19 8 26 8 Q22 12 19 16" fill="#B0D878"/><path d="M19 20 Q14 14 8 16 Q12 18 19 20" fill="#B0D878"/><path d="M19 24 Q24 18 30 20 Q26 22 19 24" fill="#B0D878"/><path d="M12 32 Q15 28 19 32 Q23 28 26 32" stroke="#B0D878" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg></div>
  <div class="tile-label">Living Soil</div>
</a>

<a href="{base}/goals/7" class="tile t7">
  <span class="tile-num">7</span>
  <div class="tile-icon"><svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 16 Q10 28 19 28 Q28 28 28 16 Z" fill="none" stroke="#F5B87A" stroke-width="1.8"/><path d="M10 16 Q19 12 28 16" fill="none" stroke="#F5B87A" stroke-width="1.8"/><line x1="19" y1="28" x2="19" y2="33" stroke="#F5B87A" stroke-width="1.8" stroke-linecap="round"/><line x1="14" y1="33" x2="24" y2="33" stroke="#F5B87A" stroke-width="1.8" stroke-linecap="round"/><circle cx="16" cy="20" r="1.5" fill="#F5B87A"/><circle cx="22" cy="20" r="1.5" fill="#F5B87A"/><path d="M16 24 Q19 26.5 22 24" stroke="#F5B87A" stroke-width="1.2" fill="none" stroke-linecap="round"/><line x1="19" y1="12" x2="19" y2="8" stroke="#F5B87A" stroke-width="1.5" stroke-linecap="round"/></svg></div>
  <div class="tile-label">The Clean Table</div>
</a>

<a href="{base}/goals/8" class="tile t8">
  <span class="tile-num">8</span>
  <div class="tile-icon"><svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 8 L22 16 L19 28 L16 16 Z" fill="#80D4F0" opacity="0.9"/><ellipse cx="19" cy="16" rx="6" ry="3" fill="none" stroke="#80D4F0" stroke-width="1.2"/><circle cx="19" cy="28" r="2" fill="#80D4F0"/></svg></div>
  <div class="tile-label">Sacred Water</div>
</a>

<a href="{base}/goals/9" class="tile t9">
  <span class="tile-num">9</span>
  <div class="tile-icon"><svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="19" cy="19" r="6" fill="#78C8F0"/><line x1="19" y1="4" x2="19" y2="9" stroke="#78C8F0" stroke-width="2" stroke-linecap="round"/><line x1="19" y1="29" x2="19" y2="34" stroke="#78C8F0" stroke-width="2" stroke-linecap="round"/><line x1="4" y1="19" x2="9" y2="19" stroke="#78C8F0" stroke-width="2" stroke-linecap="round"/><line x1="29" y1="19" x2="34" y2="19" stroke="#78C8F0" stroke-width="2" stroke-linecap="round"/><line x1="8" y1="8" x2="11.5" y2="11.5" stroke="#78C8F0" stroke-width="1.5" stroke-linecap="round"/><line x1="26.5" y1="26.5" x2="30" y2="30" stroke="#78C8F0" stroke-width="1.5" stroke-linecap="round"/><line x1="30" y1="8" x2="26.5" y2="11.5" stroke="#78C8F0" stroke-width="1.5" stroke-linecap="round"/><line x1="11.5" y1="26.5" x2="8" y2="30" stroke="#78C8F0" stroke-width="1.5" stroke-linecap="round"/></svg></div>
  <div class="tile-label">Blue Sky</div>
</a>

<a href="{base}/goals/10" class="tile t10">
  <span class="tile-num">10</span>
  <div class="tile-icon"><svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="8" width="20" height="24" rx="2" fill="none" stroke="#90D8A8" stroke-width="1.8"/><rect x="13" y="8" width="12" height="4" rx="1" fill="#90D8A8"/><line x1="13" y1="17" x2="25" y2="17" stroke="#90D8A8" stroke-width="1.2" stroke-linecap="round"/><line x1="13" y1="20.5" x2="25" y2="20.5" stroke="#90D8A8" stroke-width="1.2" stroke-linecap="round"/><line x1="13" y1="24" x2="21" y2="24" stroke="#90D8A8" stroke-width="1.2" stroke-linecap="round"/><circle cx="27" cy="27" r="5" fill="#1A4A2E" stroke="#90D8A8" stroke-width="1.5"/><line x1="25" y1="27" x2="29" y2="27" stroke="#90D8A8" stroke-width="1.5" stroke-linecap="round"/><line x1="27" y1="25" x2="27" y2="29" stroke="#90D8A8" stroke-width="1.5" stroke-linecap="round"/></svg></div>
  <div class="tile-label">Open Archive</div>
</a>

<a href="{base}/goals/11" class="tile t11">
  <span class="tile-num">11</span>
  <div class="tile-icon"><svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="13" cy="10" r="3.5" fill="none" stroke="#F5C87A" stroke-width="1.5"/><circle cx="25" cy="14" r="2.5" fill="none" stroke="#F5C87A" stroke-width="1.5"/><line x1="13" y1="14" x2="13" y2="24" stroke="#F5C87A" stroke-width="1.5" stroke-linecap="round"/><line x1="8" y1="18" x2="18" y2="18" stroke="#F5C87A" stroke-width="1.3" stroke-linecap="round"/><line x1="13" y1="24" x2="10" y2="30" stroke="#F5C87A" stroke-width="1.5" stroke-linecap="round"/><line x1="13" y1="24" x2="16" y2="30" stroke="#F5C87A" stroke-width="1.5" stroke-linecap="round"/><line x1="25" y1="17" x2="25" y2="26" stroke="#F5C87A" stroke-width="1.5" stroke-linecap="round"/><line x1="21" y1="21" x2="29" y2="21" stroke="#F5C87A" stroke-width="1.3" stroke-linecap="round"/><line x1="25" y1="26" x2="22" y2="32" stroke="#F5C87A" stroke-width="1.5" stroke-linecap="round"/><line x1="25" y1="26" x2="28" y2="32" stroke="#F5C87A" stroke-width="1.5" stroke-linecap="round"/></svg></div>
  <div class="tile-label">Living Teaching</div>
</a>

<a href="{base}/goals/12" class="tile t12">
  <span class="tile-num">12</span>
  <div class="tile-icon"><svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="4" y1="30" x2="34" y2="30" stroke="#D4A870" stroke-width="2" stroke-linecap="round"/><polygon points="19,8 28,20 10,20" fill="none" stroke="#D4A870" stroke-width="1.8"/><rect x="14" y="20" width="10" height="10" fill="none" stroke="#D4A870" stroke-width="1.8"/><rect x="16.5" y="23" width="5" height="7" fill="#D4A870"/><circle cx="8" cy="24" r="3" fill="none" stroke="#D4A870" stroke-width="1.2"/><circle cx="30" cy="24" r="3" fill="none" stroke="#D4A870" stroke-width="1.2"/></svg></div>
  <div class="tile-label">Open Land</div>
</a>

<a href="{base}/goals/13" class="tile t13">
  <span class="tile-num">13</span>
  <div class="tile-icon"><svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="19" cy="19" r="11" fill="none" stroke="#80D8D8" stroke-width="1.5"/><circle cx="19" cy="8" r="2.5" fill="#80D8D8"/><circle cx="28.5" cy="13.5" r="2.5" fill="#80D8D8"/><circle cx="28.5" cy="24.5" r="2.5" fill="#80D8D8"/><circle cx="19" cy="30" r="2.5" fill="#80D8D8"/><circle cx="9.5" cy="24.5" r="2.5" fill="#80D8D8"/><circle cx="9.5" cy="13.5" r="2.5" fill="#80D8D8"/><circle cx="19" cy="19" r="2" fill="#80D8D8"/><line x1="19" y1="10.5" x2="19" y2="17" stroke="#80D8D8" stroke-width="1" stroke-linecap="round"/><line x1="26.5" y1="15" x2="21" y2="18" stroke="#80D8D8" stroke-width="1" stroke-linecap="round"/><line x1="26.5" y1="23" x2="21" y2="20" stroke="#80D8D8" stroke-width="1" stroke-linecap="round"/><line x1="19" y1="27.5" x2="19" y2="21" stroke="#80D8D8" stroke-width="1" stroke-linecap="round"/><line x1="11.5" y1="23" x2="17" y2="20" stroke="#80D8D8" stroke-width="1" stroke-linecap="round"/><line x1="11.5" y1="15" x2="17" y2="18" stroke="#80D8D8" stroke-width="1" stroke-linecap="round"/></svg></div>
  <div class="tile-label">The Circle</div>
</a>

<a href="{base}/goals/14" class="tile t14">
  <span class="tile-num">14</span>
  <div class="tile-icon"><svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 30 Q19 20 19 16" stroke="#D4A870" stroke-width="2" stroke-linecap="round"/><path d="M19 16 Q14 10 8 12" stroke="#D4A870" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M19 16 Q24 10 30 12" stroke="#D4A870" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M19 20 Q13 16 7 18" stroke="#D4A870" stroke-width="1.3" fill="none" stroke-linecap="round" opacity="0.7"/><path d="M19 20 Q25 16 31 18" stroke="#D4A870" stroke-width="1.3" fill="none" stroke-linecap="round" opacity="0.7"/><line x1="14" y1="30" x2="24" y2="30" stroke="#D4A870" stroke-width="1.5" stroke-linecap="round"/></svg></div>
  <div class="tile-label">Know each Other</div>
</a>

<a href="{base}/goals/15" class="tile t15">
  <span class="tile-num">15</span>
  <div class="tile-icon"><svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="19" cy="19" r="3" fill="#9090F0"/><circle cx="8" cy="10" r="2.5" fill="none" stroke="#9090F0" stroke-width="1.5"/><circle cx="30" cy="10" r="2.5" fill="none" stroke="#9090F0" stroke-width="1.5"/><circle cx="8" cy="28" r="2.5" fill="none" stroke="#9090F0" stroke-width="1.5"/><circle cx="30" cy="28" r="2.5" fill="none" stroke="#9090F0" stroke-width="1.5"/><circle cx="4" cy="19" r="2" fill="none" stroke="#9090F0" stroke-width="1.3"/><circle cx="34" cy="19" r="2" fill="none" stroke="#9090F0" stroke-width="1.3"/><line x1="16" y1="18" x2="10.5" y2="12" stroke="#9090F0" stroke-width="1" stroke-linecap="round"/><line x1="22" y1="18" x2="27.5" y2="12" stroke="#9090F0" stroke-width="1" stroke-linecap="round"/><line x1="16" y1="20" x2="10.5" y2="26" stroke="#9090F0" stroke-width="1" stroke-linecap="round"/><line x1="22" y1="20" x2="27.5" y2="26" stroke="#9090F0" stroke-width="1" stroke-linecap="round"/><line x1="16" y1="19" x2="6" y2="19" stroke="#9090F0" stroke-width="1" stroke-linecap="round"/><line x1="22" y1="19" x2="32" y2="19" stroke="#9090F0" stroke-width="1" stroke-linecap="round"/></svg></div>
  <div class="tile-label">The Way Spreads</div>
</a>

<a href="{base}/goals/16" class="tile t16">
  <span class="tile-num">16</span>
  <div class="tile-icon"><svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="6" y1="32" x2="6" y2="16" stroke="#D4D480" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="32" x2="12" y2="10" stroke="#D4D480" stroke-width="2" stroke-linecap="round"/><line x1="18" y1="32" x2="18" y2="20" stroke="#D4D480" stroke-width="2" stroke-linecap="round"/><line x1="24" y1="32" x2="24" y2="14" stroke="#D4D480" stroke-width="2" stroke-linecap="round"/><line x1="30" y1="32" x2="30" y2="8" stroke="#D4D480" stroke-width="2" stroke-linecap="round"/><path d="M6 16 Q9 13 12 10 Q15 15 18 20 Q21 17 24 14 Q27 11 30 8" stroke="#D4D480" stroke-width="1.3" fill="none" stroke-linecap="round"/><circle cx="6" cy="16" r="1.8" fill="#D4D480"/><circle cx="12" cy="10" r="1.8" fill="#D4D480"/><circle cx="18" cy="20" r="1.8" fill="#D4D480"/><circle cx="24" cy="14" r="1.8" fill="#D4D480"/><circle cx="30" cy="8" r="1.8" fill="#D4D480"/><line x1="4" y1="32" x2="34" y2="32" stroke="#D4D480" stroke-width="1.2" stroke-linecap="round"/></svg></div>
  <div class="tile-label"> flourish of the living way</div>
</a>

    </div>
  </div>
</section>


<!-- ── Archive Section ── -->
<section class="library" id="archive">
  <div class="library-inner">

    <div class="section-header">
      <h2>Archive</h2>
      <a href="{base}/upload" class="btn-solid-sm">+ Give a Record</a>
    </div>

    <!-- Controls -->
    <div class="controls">
      <div class="search-wrap">
        <span class="search-icon">⌕</span>
        <input
          type="search"
          placeholder="Search title, keeper, mark…"
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
      {filtered.length} record{filtered.length !== 1 ? 's' : ''}
      {#if search || activeCategory !== 'all'}
        — <button class="clear-btn" onclick={() => { search = ''; activeCategory = 'all'; }}>clear</button>
      {/if}
    </p>

    <!-- Grid -->
    {#if filtered.length === 0}
      <div class="empty">
        <p>Nothing found.</p>
        <a href="{base}/upload" class="btn-solid">Give one</a>
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
              <button class="btn-download" onclick={() => downloadDoc(doc)}>↓ Receive</button>
            </div>
          </article>
        {/each}
      </div>
    {/if}
  </div>
</section>

<!-- ── Videos Section ── -->
<section class="videos-section">
  <div class="videos-inner">
    <div class="section-header">
      <h2>Videos</h2>
    </div>
    <div class="videos-grid">
  {#each [
  { id: '91g5gs', title: 'The “Healing Cathedral” of Armenia 🇦🇲' },
  { id: 'yz2760', title: 'The bumblebee is a truly magical creature' },
  { id: 'j1q2w4', title: 'The plant that fuels any engine' },
  { id: '1ui5ro', title: 'Antonio Ferretti was an Italian engineer who invented ＂Lanital＂' },
  { id: '03qxuy', title: '🎶 Each Sound Frequency produces a unique vibrational pattern' },
] as video}
        <div class="video-card">
          <div class="video-wrap">
            <iframe
              src="https://streamable.com/e/{video.id}"
              frameborder="0"
              allowfullscreen
              title={video.title}
            ></iframe>
          </div>
          <p class="video-title">{video.title}</p>
        </div>
      {/each}
    </div>
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
    font-family: Koulen;
    font-size: clamp(1.8rem, 3.5vw, 2.6rem);
    font-weight: 600;
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

  /* ── Videos ── */
.videos-section {
  background: #fff;
  padding: 2.5rem 2rem 3rem;
  border-bottom: 1px solid #e0e0e0;
}

.videos-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.videos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.video-card {
  background: #fafafa;
  border: 1px solid #e0e0e0;
  border-top: 5px solid #009edb;
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
  font-size: 0.88rem;
  font-weight: 600;
  color: #222;
  padding: 0.75rem 1rem;
}

@media (max-width: 480px) {
.videos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  max-width: 800px;
}}
</style>