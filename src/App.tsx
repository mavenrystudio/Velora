import { useEffect, useRef, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Menu, X, ChevronLeft, ChevronRight, Plus, Minus, MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react'
import { cats, dishes, featured, gallery, reviews, faqs } from './data'
import { Photo } from './Photo'

const ease = [0.22, 1, 0.36, 1] as const
const links = [['Home', '#home'], ['Our Story', '#story'], ['Menu', '#menu'], ['Experience', '#experience'], ['Gallery', '#gallery'], ['Reservations', '#reservations'], ['Contact', '#contact']]

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.9, delay, ease }}>{children}</motion.div>
  )
}

function Nav() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 40)
    f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f)
  }, [])
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.body.style.overflow = open ? 'hidden' : ''
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k)
  }, [open])
  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${solid || open ? 'bg-char/90 backdrop-blur' : ''}`}>
      <nav aria-label="Main" className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <a href="#home" className="font-serif text-2xl tracking-[0.4em]">VELORA</a>
        <ul className="hidden items-center gap-8 lg:flex">
          {links.slice(0, -1).map(([n, h]) => (
            <li key={h}><a href={h} className="group relative text-[11px] uppercase tracking-[0.25em] text-ivory/80 hover:text-gold">{n}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" /></a></li>
          ))}
          <li><a href="#contact" className="text-[11px] uppercase tracking-[0.25em] text-ivory/80 hover:text-gold">Contact</a></li>
        </ul>
        <a href="#reservations" className="btn hidden lg:inline-flex">Reserve</a>
        <button className="lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: '100vh' }} exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.6, ease }} className="overflow-hidden bg-char lg:hidden">
            <ul className="flex flex-col items-center gap-6 pt-12">
              {links.map(([n, h], i) => (
                <motion.li key={h} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05, ease }}>
                  <a href={h} onClick={() => setOpen(false)} className="font-serif text-3xl">{n}</a>
                </motion.li>
              ))}
              <li><a href="#reservations" onClick={() => setOpen(false)} className="btn btn-solid mt-4">Reserve a Table</a></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const words = 'AN EVENING WORTH REMEMBERING'.split(' ')
  return (
    <section id="home" ref={ref} className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <motion.div style={{ y }} initial={{ scale: 1.25, opacity: 0 }} animate={{ scale: 1, opacity: 0.85 }} transition={{ duration: 2.4, ease }} className="absolute inset-0">
        <Photo k="hero" alt="VELORA dining room set for an evening service" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-char/60 via-transparent to-char" />
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1.2 }} className="label mb-8">Fine Dining · Pristina, Kosovo</motion.p>
        <h1 className="font-serif text-5xl font-light leading-[1.05] sm:text-7xl md:text-8xl">
          {words.map((w, i) => (
            <span key={i} className="mr-[0.25em] inline-block overflow-hidden align-bottom">
              <motion.span className="inline-block" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: 0.8 + i * 0.12, duration: 1.1, ease }}>{w}</motion.span>
            </span>
          ))}
        </h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.9, duration: 1, ease }} className="mx-auto mt-8 max-w-xl text-base text-ivory/75 sm:text-lg">
          A ten-course journey through the flavours of the Balkans, composed with restraint, served with quiet devotion.
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 1 }} className="mt-10">
          <a href="#reservations" className="btn btn-solid">Reserve a Table</a>
        </motion.div>
      </div>
      <motion.span aria-hidden animate={{ scaleY: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute bottom-8 left-1/2 h-14 w-px origin-top bg-gold" />
    </section>
  )
}

function Story() {
  return (
    <section id="story" className="mx-auto grid max-w-7xl items-center gap-24 px-6 py-28 md:grid-cols-12 md:gap-10 md:py-40">
      <div className="relative md:col-span-6">
        <Reveal><div className="aspect-[3/4] overflow-hidden"><Photo k="story" alt="A chef finishing a plate with fresh micro herbs" /></div></Reveal>
        <Reveal delay={0.25} className="absolute -bottom-12 -right-2 w-1/2 md:-right-14">
          <div className="aspect-square overflow-hidden border-8 border-char"><Photo k="chef" alt="A chef seasoning a dish in low light" /></div></Reveal>
        <span aria-hidden className="absolute -left-4 -top-4 h-24 w-24 border-l border-t border-gold" />
      </div>
      <div className="md:col-span-5 md:col-start-8">
        <Reveal><p className="label mb-6">Our Story</p><h2 className="h2">Cooking is an act of <em className="text-gold">attention</em>.</h2></Reveal>
        <Reveal delay={0.1}><p className="mt-8 text-lg leading-relaxed text-ivory/70">VELORA began with a simple idea: that the land around Pristina, its mountain lamb, orchard fruit, wild herbs and river fish, deserves the patience of a great kitchen. Each menu changes with the season and is built from producers we know by name.</p></Reveal>
        <Reveal delay={0.2} className="mt-10 border-t border-ivory/15 pt-8"><p className="font-serif text-2xl">Chef Arben Krasniqi</p><p className="mt-1 text-sm text-ivory/60">Head Chef · Demo profile. Trained in Vienna and Lyon, returned home to open VELORA.</p></Reveal>
        <Reveal delay={0.3} className="mt-10 grid grid-cols-3 gap-4 text-center">
          {[['40', 'Seats'], ['10', 'Courses'], ['1', 'Kitchen']].map(([n, l]) => <div key={l} className="border border-gold/30 py-5"><p className="font-serif text-4xl text-gold">{n}</p><p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-ivory/60">{l}</p></div>)}
        </Reveal>
      </div>
    </section>
  )
}

function Band() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  return (
    <section ref={ref} aria-label="Tonight at VELORA" className="relative flex h-[75vh] items-center justify-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-x-0 -top-[15%] h-[130%]"><Photo k="skyline" alt="A lofty dining room with tall windows over the city skyline" /></motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-char via-char/50 to-char" />
      <Reveal className="relative px-6 text-center"><p className="label mb-6">Tuesday to Sunday · From 18:00</p><p className="font-serif text-5xl font-light italic sm:text-7xl">Tonight, the city is yours.</p><a href="#reservations" className="btn btn-solid mt-10">Reserve a Table</a></Reveal>
    </section>
  )
}

function MenuSection() {
  const [cat, setCat] = useState('All')
  const list = dishes.filter(d => cat === 'All' || d.cat === cat)
  return (
    <section id="menu" className="bg-char2 py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="text-center"><p className="label mb-6">Signature Menu</p><h2 className="h2">The Table</h2></Reveal>
        <div role="group" aria-label="Menu categories" className="mt-12 flex flex-wrap justify-center gap-3">
          {cats.map(c => (
            <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c}
              className={`border px-5 py-2 text-[11px] uppercase tracking-[0.25em] transition-colors duration-500 ${cat === c ? 'border-gold bg-gold text-char' : 'border-ivory/25 hover:border-gold hover:text-gold'}`}>{c}</button>
          ))}
        </div>
        <motion.ul layout className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {list.map(d => (
              <motion.li layout key={d.id} initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.6, ease }}
                className="group border border-ivory/10 bg-char p-5 transition-colors duration-500 hover:border-gold/60">
                <div className="aspect-square overflow-hidden"><div className="h-full transition-transform duration-[1200ms] group-hover:scale-110"><Photo k={d.photo} alt={d.name} /></div></div>
                <div className="mt-5 flex items-baseline justify-between gap-3"><h3 className="font-serif text-2xl">{d.name}</h3><span className="text-gold">€{d.price}</span></div>
                <p className="mt-2 text-sm leading-relaxed text-ivory/60">{d.desc}</p>
                <p className="mt-4 flex gap-2">{d.diet.length ? d.diet.map(t => <span key={t} title={t === 'V' ? 'Vegetarian' : 'Gluten-free'} className="border border-gold/50 px-2 py-0.5 text-[10px] tracking-widest text-gold">{t}</span>) : <span className="text-[10px] uppercase tracking-widest text-ivory/30">Contains meat or fish</span>}</p>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
        <p className="mt-10 text-center text-xs text-ivory/40">V vegetarian · GF gluten-free · Demo menu and prices</p>
      </div>
    </section>
  )
}

function Chef() {
  return (
    <section aria-labelledby="chef-h" className="mx-auto max-w-7xl px-6 py-28 md:py-40">
      <Reveal className="mb-20 text-center"><p className="label mb-6">Chef's Selection</p><h2 id="chef-h" className="h2">Three plates, <em className="text-gold">perfected</em></h2></Reveal>
      <div className="space-y-24 md:space-y-32">
        {featured.map((d, i) => (
          <div key={d.id} className="grid items-center gap-10 md:grid-cols-2 md:gap-20">
            <motion.div initial={{ clipPath: 'inset(0 100% 0 0)' }} whileInView={{ clipPath: 'inset(0 0% 0 0)' }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 1.4, ease }}
              className={`aspect-[4/5] overflow-hidden ${i % 2 ? 'md:order-2' : ''}`}><Photo k={d.photo} alt={d.name} /></motion.div>
            <Reveal delay={0.15}>
              <p className="font-serif text-7xl text-gold/30">0{i + 1}</p>
              <h3 className="mt-2 font-serif text-4xl sm:text-5xl">{d.name}</h3>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-ivory/70">{d.desc}</p>
              <p className="mt-6 text-gold">€{d.price}</p>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  )
}

const rooms = [
  { k: 'interior', t: 'The Dining Room', d: 'Forty seats, low amber light, hand-finished oak and ivory linen.' },
  { k: 'private', t: 'Private Dining', d: 'A secluded room for up to 14 guests with a dedicated sommelier.' },
  { k: 'occasions', t: 'Special Occasions', d: 'Anniversaries and celebrations, composed with bespoke menus.' },
  { k: 'atmosphere', t: 'The Atmosphere', d: 'Live piano on Fridays, a cellar of 400 labels, a quiet terrace.' }
]
function Experience() {
  return (
    <section id="experience" className="bg-char2 py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-16"><p className="label mb-6">Dining Experience</p><h2 className="h2 max-w-2xl">Every detail, <em className="text-gold">considered</em></h2></Reveal>
        <div className="grid gap-6 sm:grid-cols-2">
          {rooms.map((r, i) => (
            <Reveal key={r.k} delay={(i % 2) * 0.12}>
              <article className="group relative aspect-[4/3] overflow-hidden">
                <div className="h-full transition-transform duration-[1400ms] group-hover:scale-105"><Photo k={r.k} alt={r.t} /></div>
                <div className="absolute inset-0 bg-gradient-to-t from-char via-char/30 to-transparent" />
                <div className="absolute bottom-0 p-6 sm:p-8"><h3 className="font-serif text-3xl">{r.t}</h3><p className="mt-2 max-w-sm text-sm text-ivory/70">{r.d}</p></div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Gallery() {
  const [i, setI] = useState<number | null>(null)
  const n = gallery.length
  useEffect(() => {
    if (i === null) return
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setI(null)
      if (e.key === 'ArrowRight') setI(v => (v! + 1) % n)
      if (e.key === 'ArrowLeft') setI(v => (v! - 1 + n) % n)
    }
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k)
  }, [i, n])
  const spans = ['', 'md:mt-14', '', 'md:mt-14', '', 'md:mt-14', '', 'md:mt-14']
  return (
    <section id="gallery" className="mx-auto max-w-7xl px-6 py-28 md:py-40">
      <Reveal className="mb-14 text-center"><p className="label mb-6">Gallery</p><h2 className="h2">Moments at the table</h2></Reveal>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5 md:pb-14">
        {gallery.map((g, idx) => (
          <Reveal key={g.k} delay={(idx % 4) * 0.08} className={spans[idx]}>
            <button onClick={() => setI(idx)} aria-label={`Open image: ${g.alt}`} className="group block aspect-[3/4] w-full overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">
              <div className="h-full transition-all duration-[1200ms] group-hover:scale-110 group-hover:brightness-110"><Photo k={g.k} alt={g.alt} /></div>
            </button>
          </Reveal>
        ))}
      </div>
      <AnimatePresence>
        {i !== null && (
          <motion.div role="dialog" aria-modal="true" aria-label="Image viewer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-char/95 p-4" onClick={() => setI(null)}>
            <button aria-label="Close" className="absolute right-5 top-5 p-2" onClick={() => setI(null)}><X /></button>
            <button aria-label="Previous image" className="absolute left-3 p-2 sm:left-8" onClick={e => { e.stopPropagation(); setI((i - 1 + n) % n) }}><ChevronLeft size={32} /></button>
            <motion.figure key={i} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease }} className="w-full max-w-md" onClick={e => e.stopPropagation()}>
              <div className="aspect-[3/4] max-h-[75vh] overflow-hidden"><Photo k={gallery[i].k} alt={gallery[i].alt} /></div>
              <figcaption className="mt-4 text-center text-sm text-ivory/60">{gallery[i].alt} · {i + 1}/{n}</figcaption>
            </motion.figure>
            <button aria-label="Next image" className="absolute right-3 p-2 sm:right-8" onClick={e => { e.stopPropagation(); setI((i + 1) % n) }}><ChevronRight size={32} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

const SLOTS = ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30']
// Demo availability only: deterministic per date/time. Replace with a real API call.
const avail = (date: string, guests: number, t: string) => {
  let h = 0
  for (const c of date + t) h = (h * 31 + c.charCodeAt(0)) % 97
  return h % 4 !== 0 && !(guests > 6 && h % 2 === 0)
}
const today = () => new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10)

function Reservations() {
  const [f, setF] = useState({ date: '', guests: '2', time: '', name: '', email: '', phone: '' })
  const [err, setErr] = useState<Record<string, string>>({})
  const [done, setDone] = useState(false)
  const set = (k: string, v: string) => setF(p => ({ ...p, [k]: v, ...(k === 'date' || k === 'guests' ? { time: '' } : {}) }))
  const closed = f.date !== '' && new Date(f.date + 'T12:00').getDay() === 1
  const submit = (e: FormEvent) => {
    e.preventDefault()
    const x: Record<string, string> = {}
    if (!f.date) x.date = 'Choose a date.'
    else if (f.date < today()) x.date = 'Date cannot be in the past.'
    else if (closed) x.date = 'We are closed on Mondays.'
    if (!f.time) x.time = 'Select an available time.'
    if (f.name.trim().length < 2) x.name = 'Enter your full name.'
    if (!/^\S+@\S+\.\S+$/.test(f.email)) x.email = 'Enter a valid email address.'
    if (!/^\+?[\d\s()-]{7,}$/.test(f.phone)) x.phone = 'Enter a valid phone number.'
    setErr(x)
    if (!Object.keys(x).length) setDone(true) // Demo: no backend. Send `f` to your API here.
  }
  const E = ({ k }: { k: string }) => err[k] ? <p id={`${k}-e`} role="alert" className="mt-1 text-xs text-red-300">{err[k]}</p> : null
  const p = (k: string) => ({ id: k, 'aria-invalid': !!err[k], 'aria-describedby': err[k] ? `${k}-e` : undefined })
  return (
    <section id="reservations" className="bg-char2 py-28 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2">
        <Reveal><p className="label mb-6">Reservations</p><h2 className="h2">Reserve your <em className="text-gold">evening</em></h2>
          <p className="mt-8 max-w-md text-lg text-ivory/70">Tuesday to Sunday, 18:00 to 23:30. For parties above 8 or private dining, please call us directly.</p>
          <p className="mt-6 text-xs text-ivory/40">Demo mode: availability is simulated and no booking is actually made.</p></Reveal>
        <div aria-live="polite">
          {done ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="border border-gold/50 p-10 text-center">
              <h3 className="font-serif text-4xl text-gold">Thank you, {f.name.split(' ')[0]}.</h3>
              <p className="mt-4 text-ivory/70">Your table for {f.guests} on {new Date(f.date + 'T12:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })} at {f.time} is requested. A confirmation would be sent to {f.email}.</p>
              <button className="btn mt-8" onClick={() => { setDone(false); setF({ date: '', guests: '2', time: '', name: '', email: '', phone: '' }) }}>Make another booking</button>
            </motion.div>
          ) : (
            <form onSubmit={submit} noValidate className="grid gap-6 sm:grid-cols-2">
              <div><label htmlFor="date" className="label">Date</label><input {...p('date')} type="date" min={today()} value={f.date} onChange={e => set('date', e.target.value)} className="field [color-scheme:dark]" /><E k="date" /></div>
              <div><label htmlFor="guests" className="label">Guests</label>
                <select id="guests" value={f.guests} onChange={e => set('guests', e.target.value)} className="field [color-scheme:dark]">{[1, 2, 3, 4, 5, 6, 7, 8].map(n => <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>)}</select></div>
              <fieldset className="sm:col-span-2"><legend className="label mb-3">Time</legend>
                {!f.date || closed ? <p className="text-sm text-ivory/40">{closed ? 'Closed on Mondays. Please pick another date.' : 'Select a date to see availability.'}</p> :
                  <div className="grid grid-cols-4 gap-2">{SLOTS.map(t => { const ok = avail(f.date, +f.guests, t); return (
                    <button key={t} type="button" disabled={!ok} aria-pressed={f.time === t} onClick={() => set('time', t)}
                      className={`border py-2 text-sm transition-colors ${f.time === t ? 'border-gold bg-gold text-char' : ok ? 'border-ivory/25 hover:border-gold' : 'cursor-not-allowed border-ivory/10 text-ivory/20 line-through'}`}>{t}</button>) })}</div>}
                <E k="time" /></fieldset>
              <div><label htmlFor="name" className="label">Full name</label><input {...p('name')} autoComplete="name" value={f.name} onChange={e => set('name', e.target.value)} className="field" /><E k="name" /></div>
              <div><label htmlFor="phone" className="label">Phone</label><input {...p('phone')} type="tel" autoComplete="tel" placeholder="+383 44 000 000" value={f.phone} onChange={e => set('phone', e.target.value)} className="field" /><E k="phone" /></div>
              <div className="sm:col-span-2"><label htmlFor="email" className="label">Email</label><input {...p('email')} type="email" autoComplete="email" value={f.email} onChange={e => set('email', e.target.value)} className="field" /><E k="email" /></div>
              <button type="submit" className="btn btn-solid sm:col-span-2">Request Reservation</button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const [i, setI] = useState(0)
  const n = reviews.length
  return (
    <section aria-label="Guest reviews" className="mx-auto max-w-4xl px-6 py-28 text-center md:py-40">
      <p className="label mb-10">Guest Voices · Sample reviews</p>
      <div className="min-h-[14rem] sm:min-h-[12rem]" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.blockquote key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.6, ease }}>
            <p className="font-serif text-3xl font-light italic leading-snug sm:text-4xl">“{reviews[i].q}”</p>
            <footer className="mt-8 text-sm text-ivory/60">{reviews[i].a} · {reviews[i].r}</footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>
      <div className="mt-8 flex items-center justify-center gap-6">
        <button aria-label="Previous review" onClick={() => setI((i - 1 + n) % n)} className="p-2 hover:text-gold"><ChevronLeft /></button>
        {reviews.map((_, k) => <button key={k} aria-label={`Review ${k + 1}`} aria-current={k === i} onClick={() => setI(k)} className={`h-1.5 rounded-full transition-all duration-500 ${k === i ? 'w-8 bg-gold' : 'w-1.5 bg-ivory/30'}`} />)}
        <button aria-label="Next review" onClick={() => setI((i + 1) % n)} className="p-2 hover:text-gold"><ChevronRight /></button>
      </div>
    </section>
  )
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="bg-char2 py-28 md:py-40">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal className="mb-14 text-center"><p className="label mb-6">FAQ</p><h2 className="h2">Good to know</h2></Reveal>
        {faqs.map((x, k) => (
          <div key={k} className="border-b border-ivory/15">
            <h3><button id={`fq${k}`} aria-expanded={open === k} aria-controls={`fa${k}`} onClick={() => setOpen(open === k ? null : k)} className="flex w-full items-center justify-between gap-4 py-6 text-left font-serif text-2xl hover:text-gold">
              {x.q}{open === k ? <Minus size={18} /> : <Plus size={18} />}</button></h3>
            <AnimatePresence initial={false}>
              {open === k && <motion.div id={`fa${k}`} role="region" aria-labelledby={`fq${k}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease }} className="overflow-hidden">
                <p className="pb-6 text-ivory/65">{x.a}</p></motion.div>}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  const rows = [[MapPin, 'Rr. Nëna Terezë 12, 10000 Pristina, Kosovo (demo address)'], [Clock, 'Tue to Sun · 18:00 to 23:30 · Closed Monday'], [Phone, '+383 38 000 000'], [Mail, 'reservations@velora.example']] as const
  return (
    <section id="contact" className="mx-auto grid max-w-7xl gap-12 px-6 py-28 md:grid-cols-2 md:py-40">
      <Reveal><p className="label mb-6">Contact</p><h2 className="h2">Find us</h2>
        <ul className="mt-10 space-y-5">{rows.map(([I, t], k) => <li key={k} className="flex gap-4 text-ivory/75"><I size={18} className="mt-1 shrink-0 text-gold" />{t}</li>)}</ul>
        <div className="mt-8 flex gap-4"><a href="https://instagram.com" aria-label="Instagram" className="border border-ivory/25 p-3 hover:border-gold hover:text-gold"><Instagram size={18} /></a><a href="https://facebook.com" aria-label="Facebook" className="border border-ivory/25 p-3 hover:border-gold hover:text-gold"><Facebook size={18} /></a></div></Reveal>
      <Reveal delay={0.15}><div role="img" aria-label="Map placeholder" className="relative flex aspect-[4/3] items-center justify-center border border-ivory/15 bg-char2 bg-[linear-gradient(#c9a96a14_1px,transparent_1px),linear-gradient(90deg,#c9a96a14_1px,transparent_1px)] bg-[size:32px_32px]">
        <motion.span animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="text-gold"><MapPin size={40} /></motion.span>
        <span className="absolute bottom-3 text-xs text-ivory/40">Map placeholder. Embed your map here.</span></div></Reveal>
    </section>
  )
}

function Footer() {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState<{ ok: boolean; t: string } | null>(null)
  const sub = (e: FormEvent) => {
    e.preventDefault()
    if (/^\S+@\S+\.\S+$/.test(email)) { setMsg({ ok: true, t: 'Thank you. You are on the list (demo).' }); setEmail('') }
    else setMsg({ ok: false, t: 'Please enter a valid email address.' })
  }
  return (
    <footer className="border-t border-ivory/10 bg-char2 px-6 pb-8 pt-20">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-4">
        <div><p className="font-serif text-3xl tracking-[0.4em]">VELORA</p><p className="mt-4 text-sm text-ivory/50">Fine dining in Pristina, Kosovo.</p></div>
        <nav aria-label="Footer"><p className="label mb-4">Explore</p><ul className="space-y-2 text-sm text-ivory/70">{links.map(([n, h]) => <li key={h}><a href={h} className="hover:text-gold">{n}</a></li>)}</ul></nav>
        <div><p className="label mb-4">Visit</p><p className="text-sm text-ivory/70">Rr. Nëna Terezë 12<br />Pristina, Kosovo<br />Tue to Sun · 18:00 to 23:30</p></div>
        <form onSubmit={sub} noValidate><label htmlFor="nl" className="label mb-4 block">Newsletter</label>
          <div className="flex gap-2"><input id="nl" type="email" placeholder="Your email" value={email} onChange={e => setEmail(e.target.value)} aria-invalid={msg ? !msg.ok : undefined} aria-describedby="nl-m" className="field" /><button className="btn px-4">Join</button></div>
          <p id="nl-m" role="status" className={`mt-2 min-h-[1.25rem] text-xs ${msg?.ok ? 'text-gold' : 'text-red-300'}`}>{msg?.t}</p></form>
      </div>
      <p className="mx-auto mt-16 max-w-7xl text-xs text-ivory/30">© {new Date().getFullYear()} VELORA. Demo website with sample content.</p>
    </footer>
  )
}

export default function App() {
  return (<><a href="#menu" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-gold focus:p-3 focus:text-char">Skip to menu</a>
    <Nav /><main><Hero /><Story /><MenuSection /><Chef /><Experience /><Gallery /><Band /><Reservations /><Testimonials /><Faq /><Contact /></main><Footer /></>)
}
