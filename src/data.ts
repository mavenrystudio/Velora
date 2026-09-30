export type Dish = { id: string; name: string; desc: string; price: number; cat: string; diet: string[]; photo: string }
export const cats = ['All', 'Starters', 'Mains', 'Desserts']
export const dishes: Dish[] = [
  { id: 'a', name: 'Hokkaido Scallop', desc: 'Cured in Rugova honey, pickled kohlrabi, brown butter dashi.', price: 34, cat: 'Starters', diet: ['GF'], photo: 'scallop' },
  { id: 'b', name: 'Roasted Beetroot', desc: 'Smoked sheep curd, walnut, aged balsamic, wild herbs.', price: 24, cat: 'Starters', diet: ['V', 'GF'], photo: 'beet' },
  { id: 'c', name: 'Wagyu Tartare', desc: 'Egg yolk, black garlic, ajvar crisp, cured trout roe.', price: 38, cat: 'Starters', diet: [], photo: 'wagyu' },
  { id: 'd', name: 'Ember-Grilled Fillet', desc: 'Charred over vine wood, black garlic purée, wild mountain herbs.', price: 52, cat: 'Mains', diet: ['GF'], photo: 'fillet' },
  { id: 'f', name: 'Truffle Tagliolini', desc: 'Hand-cut pasta, aged Parmigiano, black winter truffle.', price: 46, cat: 'Mains', diet: ['V'], photo: 'truffle' },
  { id: 'g', name: 'Valrhona Soufflé', desc: 'Molten dark chocolate, salted caramel, cocoa nib crumble.', price: 21, cat: 'Desserts', diet: ['V'], photo: 'soufflé' },
  { id: 'h', name: 'Smoked Lemon Tart', desc: 'Torched meringue, black cherry, crisp almond shortcrust.', price: 19, cat: 'Desserts', diet: ['V'], photo: 'tart' }
]
export const featured = ['d', 'a', 'g'].map(id => dishes.find(d => d.id === id)!)
export const gallery = [
  { k: 'g1', alt: 'A long table set for dinner in warm light' }, { k: 'g2', alt: 'Intimate dining corner with a golden lamp' },
  { k: 'g3', alt: 'Bar wall glowing with bottles' }, { k: 'g4', alt: 'Chocolate cake with warm ganache poured over' },
  { k: 'g5', alt: 'Rosé poured into a glass' }, { k: 'g6', alt: 'Plated course with edible flowers' },
  { k: 'g7', alt: 'Chef finishing dishes at the pass' }, { k: 'g8', alt: 'Olive oil and fresh basil on oak' }
]
export const reviews = [
  { q: 'Every course arrived like a small performance. Quiet, precise, unforgettable.', a: 'Sample Reviewer A', r: 'Anniversary dinner' },
  { q: 'The grilled fillet alone is worth the trip. Service felt effortless and warm.', a: 'Sample Reviewer B', r: 'Business dinner' },
  { q: 'We booked the private room for a birthday. Flawless from start to finish.', a: 'Sample Reviewer C', r: 'Private dining' }
]
export const faqs = [
  { q: 'Is there a dress code?', a: 'Smart elegant. Jackets are appreciated for gentlemen; we kindly ask guests to avoid sportswear and beachwear.' },
  { q: 'Where can I park?', a: 'Complimentary valet is available from 17:45 at the main entrance, with additional public parking two minutes away.' },
  { q: 'Can you accommodate dietary needs?', a: 'Yes. Vegetarian, vegan, gluten-free and allergy-aware menus are available. Please tell us when reserving, ideally 48 hours ahead.' },
  { q: 'How do reservations and cancellations work?', a: 'Tables are held for 15 minutes. Please cancel or amend at least 24 hours ahead by phone or email. Parties over 8 are handled by our team directly.' }
]
