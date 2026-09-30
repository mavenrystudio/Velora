// Photo files live in /public/images. Swap a file (same name) or change a path to update the site.
const p = (n: string) => `/images/${n}.jpg`
export const photos: Record<string, string> = {
  hero: p('hero'), skyline: p('skyline'), story: p('story'), chef: p('chef'),
  interior: p('interior'), private: p('private'), occasions: p('occasions'), atmosphere: p('atmosphere'),
  fillet: p('fillet'), scallop: p('scallop'), truffle: p('truffle'), tart: p('tart'), wagyu: p('wagyu'), beet: p('beet'), 'soufflé': p('souffle'),
  g1: p('g1'), g2: p('g2'), g3: p('g3'), g4: p('g4'), g5: p('g5'), g6: p('g6'), g7: p('g7'), g8: p('g8')
}
// Focal point (CSS object-position) for crops
export const positions: Record<string, string> = { atmosphere: '50% 85%', chef: '25% 25%', hero: '50% 60%', wagyu: '50% 70%' }
