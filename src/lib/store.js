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
      id: '1', title: 'Introduction to Conspirators Ierarchy', author: 'Dr. John Coleman',
      category: 'books', description: 'THE STORY OF THE COMMITTEE OF 300',
      size: '851 KB', pages: 169, date: '2024-11-15',
      tags: [ 'globalism', 'new-world-order'], fileName: 'CONSPIRATORS HIERARCHY_ THE STORY OF THE COMMITTEE OF 300.pdf', fileData: null
    },
    {
      id: '2', title: 'The Mutus Liber', author: 'Anonymous (1677)',
      category: 'books', description: 'The silent book — alchemical emblems without words. A visual treatise on the Great Work.',
      size: '18.7 MB', pages: 21, date: '2024-10-03',
      tags: ['alchemy', 'hermetic', 'esoteric'], fileName: 'mutus-liber.pdf', fileData: null
    },
    {
      id: '3', title: 'Living In The Private', author: 'Unknown',
      category: 'books', description: 'Educate Yourself, Ask Questions, Verify Everything.',
      size: '1.4 MB', pages: 489, date: '2025-01-20',
      tags: ['privacy', 'jurisdiction'], fileName: 'nixos-manual.pdf', fileData: null
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

export const goals = [
  { id: '1', title: 'Living souls meeting directly — in exchange, in word, in building, in growing', color: '#b8860b', gradient: 'linear-gradient(135deg, #0f7a5a 0%, #c8a000 45%, #ffd700 70%, #986e24 100%)', textColor: '#fff8dc', summary: 'No one between Me and God', description: 'A living soul stands in direct relation to God and to all of creation. This has always been so. The living way begins from this recognition — that every exchange, every word, every act of a living soul flows directly from that standing. When two living souls meet to interchange, to speak, to build or to grow together, the meeting is whole in itself. It requires no witness, no record-keeper, no approving from outside. The living way calls solvens to build all their structures — their tallies, their circles, their bonds — on this foundation. The direct meeting of souls is the most natural thing in the world. We are simply remembering how to live it.', docs: [] },

  { id: '2', title: 'Full sovereignty over your own living body. Complete confidence arises when accepting responsibility for your own well-being.', color: '#5a1a7a', gradient: 'linear-gradient(135deg, #32085a 0%, #5a1a7a 50%, #9030c0 100%)', textColor: '#e8c0ff', summary: 'The living body is perfect. Its well-being is the living soul\'s own knowing and choosing.', description: 'Every living soul comes into the world with a body of perfect design. The conditions of good well-being are not complex: clean food in its natural form, clean water, clean air, movement, sunlight, rest and living bonds. A solven that builds on these foundations does not generate the chronic illness that institutional medicine feeds upon. Each soul holds full knowing of its own body — what enters it, what restores it, what harms it. This is not a belief. It is what living souls discover when the poisons are removed. No institution — medical, governmental, or religious — may place itself between a living soul and its own body. The body answers to its creator, not to any earthly authority. Well-being is a living state, not a managed condition.', docs: [] },

  { id: '3', title: 'The Tally — a new word for a measure and alternative idea', color: '#b85c00', gradient: 'linear-gradient(135deg, #7a2e00 0%, #c96a00 60%, #f0a040 100%)', textColor: '#fde8c0', summary: 'Every exchange seen by all. Nothing hidden.', description: 'A tally is the oldest form of honest record — a mark made in the open, witnessed by all, altered by none. The Tally goal affirms that accounts of value, exchange, and contribution must be legible to every participant. Hidden books breed hidden power. When the record is open, those who hold it cannot lie about what it contains. This goal covers open ledgers, open accounting, open records of circle decisions, and the right of every soul in a solven to read the record that concerns them. The tally carries no interest. It answers to no bank, no sea, no admiral. It is the instrument of living souls exchanging on land.', docs: [] },

  { id: '4', title: 'Having a home is a default. Take it back. No need to ask. No need to wait.', color: '#1a3a8a', gradient: 'linear-gradient(135deg, #0d1f5c 0%, #1a3a8a 50%, #3a6ae8 100%)', textColor: '#c0d8ff', summary: 'The knowledge to raise a roof belongs to all.', description: 'To build is one of the most fundamental acts of a living soul. A dwelling, a workshop, a barn, a path — these are extensions of the body into the world. Shelter Reclaimed affirms that no institution may prohibit the construction of shelter, tools, or infrastructure needed for dignified life. Codes, permits, and restrictions that exist to extract or enforce dependency rather than protect genuine safety are not binding on living souls. Every soul has the right to shape their dwelling and their land according to their knowing, their needs, and their solven\'s accord.', docs: [] },

  { id: '5', title: 'Effective Engine — any fuel, no poison. The knowledge that was buried, recovered.', color: '#8a1a1a', gradient: 'linear-gradient(135deg, #5c0a0a 0%, #a02020 50%, #e04040 100%)', textColor: '#ffd0d0', summary: 'Energy and productive power openly available to all solvens.', description: 'The engine of life is energy — the capacity to do work, to move, to transform. When energy is monopolised, everything downstream is controlled. Living Engine affirms that solvens must have access to the means of generating, storing, and distributing power: mechanical, electrical, thermal, and biological. This includes the right to build mills, collect water, harness wind, ferment fuel, and maintain engines without dependency on centralised suppliers. Numerous engine designs capable of operating on variable local fuels — running clean — exist in historical archives and were buried by commercial and political opposition. Recovering them is the work.', docs: [] },

  { id: '6', title: 'Electroculture and permaculture — suppressed knowledge, recovered. No poison on the land.', color: '#2d6010', gradient: 'linear-gradient(135deg, #1a3a08 0%, #2d6010 50%, #4a9a18 100%)', textColor: '#c8f080', summary: 'Soil vitality as the foundation of all living systems.', description: 'Soil is not dirt. It is a living system of incomprehensible complexity — billions of organisms per handful, cycling nutrients, holding water, growing food, and anchoring ecosystems. Electroculture and permaculture, both suppressed by the agrochemical industry, restore this system without poison. Living Soil affirms that the care, regeneration, and protection of topsoil is a primary obligation of any solven that intends to persist. This goal covers composting, biological growing, aquaponics, food forest design, and all practices that build rather than deplete the living layer beneath our feet.', docs: [] },

  { id: '7', title: 'Pure food, grown clean, shared openly. Food as the land grew it — nothing added.', color: '#8a4a00', gradient: 'linear-gradient(135deg, #5c2800 0%, #8a4a00 50%, #c87820 100%)', textColor: '#ffd8a0', summary: 'Living food, grown without poison, shared without deception.', description: 'The table is where life sustains itself. What is placed on it — and how it was grown, prepared, and shared — shapes the well-being and wholeness of a solven. The Clean Table affirms the right to food that is grown without toxic inputs and exchanged without deception about its nature or origin. It covers the right to grow, slaughter, ferment, preserve, and share food outside bureaucratic prohibition. Growing and sharing is the living way. The sacred character of the shared meal is a bond between living souls that no institution may commercialise or regulate away.', docs: [] },

  { id: '8', title: 'Water flows as living open land for all. Water as sacred commons of the living.', color: '#0a6080', gradient: 'linear-gradient(135deg, #053a52 0%, #0a6080 50%, #10a8d8 100%)', textColor: '#a0e8ff', summary: 'Water as open land — kept, clean, and openly accessible to all.', description: 'Water is not a commodity. It is the precondition of all life and cannot be owned in the way that objects are owned. Sacred Water affirms that access to clean water — for drinking, bathing, irrigation, and living systems — is a standing that no entity may extinguish through purchase, enclosure, or pollution. Solvens have both the right and the obligation to protect their water sources, tend them as open land, and refuse the enclosure of rivers, aquifers, and rainfall. Water belongs to the living. Viktor Schauberger\'s work showed that water carries living qualities that straight pipes destroy. Let it move as it knows how to move.', docs: [] },

  { id: '9', title: 'The sky is the measure. Make it blue again. Open sky — what the living sky has always been.', color: '#0a4a7a', gradient: 'linear-gradient(135deg, #051e3e 0%, #0a4a7a 50%, #1878c8 100%)', textColor: '#b0d8ff', summary: 'Clean air and open sky as the living condition of all breathing souls.', description: 'Air cannot be enclosed, but it can be poisoned, and the sky above cannot be owned, but it can be denied. Blue Sky affirms that the atmosphere is a living layer that no entity may degrade through emissions, spray, or occupation without the accord of those who breathe beneath it. This goal covers air vitality, the right to unobstructed sky, and the protection of atmospheric conditions that sustain biological life. Trees are the primary restoration technology. A solven that plants trees is restoring the sky. What enters the air enters every living body.', docs: [] },

  { id: '10', title: 'All knowing placed openly where any soul can reach it. What was buried belongs to all.', color: '#0f5a38', gradient: 'linear-gradient(135deg, #083020 0%, #0f5a38 50%, #18a060 100%)', textColor: '#a0f0c8', summary: 'Living knowing kept open, passed on, accessible to all.', description: 'Knowing that is locked away serves only its keeper. Open Archive affirms that the accumulated learning of living souls — books, techniques, maps, histories, sciences, arts — belongs to everyone and must be kept, copied, and distributed without restriction. This goal covers open archives, open learning records, the recovery of rare texts, oral tradition preservation, and the right to learn without paying tribute to gatekeepers of knowing. This archive is one expression of that goal.', docs: [] },

  { id: '11', title: 'Living wisdom passed hand to hand, elder to youth. Teaching outside all institutions.', color: '#7a5200', gradient: 'linear-gradient(135deg, #4a2e00 0%, #7a5200 50%, #c08010 100%)', textColor: '#ffe0a0', summary: 'Living knowing passed directly between souls, outside institutions.', description: 'True teaching is not the transfer of certified information from an accredited institution. It is the living transmission of understanding from one soul to another — from elder to youth, from craftsperson to apprentice, from grower to child. Living Teaching affirms the right to teach and to learn outside institutional systems, to learn through doing, and to pass on knowing through direct bond. Credentials that gate-keep rather than verify are obstacles to living teaching, not expressions of it. The elder\'s hand on the young one\'s shoulder. That is school.', docs: [] },

  { id: '12', title: 'Every soul stands on enough land to grow and build.', color: '#4a3000', gradient: 'linear-gradient(135deg, #2a1500 0%, #4a3000 50%, #8a5818 100%)', textColor: '#f0c878', summary: 'Land access as the foundation of living, self-sustaining life.', description: 'Land is not created by its claimants. It exists before any title, any fence, any deed. Open Land affirms that every soul and every solven must have access to enough land to grow food, build shelter, and sustain life. No system of land holding may leave the majority landless while a few hold vast territories idle or extractive. Solvens have the right to occupy, cultivate, and tend land that sustains them, regardless of paper claims made by distant entities who have never walked it.', docs: [] },

  { id: '13', title: 'Stop delegating. Those who live with the decision make the decision.', color: '#0f5858', gradient: 'linear-gradient(135deg, #083030 0%, #0f5858 50%, #18a0a0 100%)', textColor: '#a0f0f0', summary: 'Decisions made directly by those who live with their consequence.', description: 'The circle is the oldest form of living accord — every soul visible to every other, no hidden deliberation, no head of table. The Circle affirms that decisions affecting a solven must be made by that solven, in open circle, with every voice having equal standing. This is not the representative structure of elected strangers, but the direct accord of those who live with the consequence of each decision. The circle meets, it listens, it deliberates, and it reaches resolution through genuine accord rather than majority domination.', docs: [] },

{ id: '14', title: 'Uniting to build a new future. We must know each other.', color: '#42005a', gradient: 'linear-gradient(135deg, #220030 0%, #38005a 50%, #a01091 100%)', textColor: '#f080ee', summary: 'Solvens finding one another and building common cause across distance and difference.', description: 'A solven alone is a candle in the wind. What the living way asks of us cannot be carried by isolated kindreds, however strong each may be. The future being built must be built together — which means solvens must first find each other, recognise each other, and learn to act in concert without dissolving what makes each one distinct. Uniting Bond is the patient work of meeting: across distance, language, custom and inherited grievance. It is the building of councils where none existed, the learning of faces and names, the slow construction of trust between kindreds who have until now stood apart. We cannot build a future with people we do not know.', docs: [] },

  { id: '15', title: 'Inventing new words and dictionary. Words that carry no old poison.', color: '#1a1a6a', gradient: 'linear-gradient(135deg, #0a0a3a 0%, #1a1a6a 50%, #3030b8 100%)', textColor: '#c0c0ff', summary: 'Creating a new language built from the living way — free of the old world\'s weight and deception.', description: 'Every language now spoken was shaped by conquest, commerce, courts and clergy. The words we use carry assumptions we never chose — of hierarchy, ownership, separation from the living world. A solven who thinks in the old tongue thinks in the old way without knowing it. Living Tongue is the slow, deliberate act of building a language from the ground up — words born from the circle, from the soil, from the body, from the bond between living souls. Not an artificial code, but a tongue that grows as the way grows. It begins with naming what the old languages have no honest word for, and it spreads as solvens teach it to their young.', docs: [] },

  { id: '16', title: 'Measuring soil, sky, water and the living condition of every solven. Nothing else.', color: '#4a4a00', gradient: 'linear-gradient(135deg, #282800 0%, #4a4a00 50%, #888800 100%)', textColor: '#e8e890', summary: 'Measuring by what genuinely thrives — life, vitality, and living accord.', description: 'The final measure of any solven is not its output, its military strength, or its compliance with external standards. It is what actually flourishes within it — the vitality of its children, the life of its soil, the richness of its bonds, the beauty of what it makes, and the living state of those who dwell there. What Flourishes affirms that all goals of the living way must be evaluated by this single standard: does life thrive here? If yes, the way is working. If not, something must change.', docs: [] },
];