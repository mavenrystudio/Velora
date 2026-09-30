# VELORA

React + TypeScript + Tailwind CSS + Framer Motion + Lucide.

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check and production build into /dist
npm run preview
```
Requires Node 18+.

## Photography
All 23 photos are included in `public/images/` (optimized JPGs from Unsplash, per your upload).
Swap a file with the same name, or change paths and crop focal points in `src/photos.ts`.
Unsplash requires no attribution but crediting the photographers is appreciated.

## Demo behaviour
- Reservations: availability is simulated in `avail()` in `src/App.tsx`. Replace the
  `setDone(true)` line in `submit()` with a call to your booking API.
- Newsletter: validates and shows a demo success message; wire it to your provider.
- Reviews, chef, address, phone and prices are sample content.
- Map is a placeholder; embed Google Maps or Mapbox in `Contact`.
