import { writable } from 'svelte/store';

const STORAGE_KEY = 'docshelf_docs';

function loadDocs() {
  if (typeof localStorage === 'undefined') return getSamples();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : getSamples();
  } catch { return getSamples(); }
}

function getSamples() {
  return [
    {
      id: '1', title: 'Introduction to Distributed Systems', author: 'M. van Steen',
      category: 'technical', description: 'Comprehensive overview of distributed computing, consistency models, and fault tolerance.',
      size: '4.2 MB', pages: 318, date: '2024-11-15',
      tags: ['networking', 'systems'], fileName: 'distributed-systems.pdf', fileData: null
    },
    {
      id: '2', title: 'The Mutus Liber', author: 'Anonymous (1677)',
      category: 'books', description: 'The silent book — alchemical emblems without words. A visual treatise on the Great Work.',
      size: '18.7 MB', pages: 21, date: '2024-10-03',
      tags: ['alchemy', 'hermetic', 'esoteric'], fileName: 'mutus-liber.pdf', fileData: null
    },
    {
      id: '3', title: 'NixOS Manual', author: 'NixOS Contributors',
      category: 'technical', description: 'Official reference for NixOS. Configuration, modules, package management, deployment.',
      size: '2.1 MB', pages: 489, date: '2025-01-20',
      tags: ['nixos', 'linux'], fileName: 'nixos-manual.pdf', fileData: null
    }
  ];
}

function createDocsStore() {
  const { subscribe, set, update } = writable(loadDocs());
  const save = (docs) => {
    if (typeof localStorage !== 'undefined')
      localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
  };
  return {
    subscribe,
    add: (doc) => update(docs => { const next = [doc, ...docs]; save(next); return next; }),
    remove: (id) => update(docs => { const next = docs.filter(d => d.id !== id); save(next); return next; }),
  };
}

export const docs = createDocsStore();
export const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'technical', label: 'Technical' },
  { id: 'books', label: 'Books' },
  { id: 'research', label: 'Research' },
  { id: 'other', label: 'Other' }
];
