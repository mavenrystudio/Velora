import { photos, positions } from './photos'
export function Photo({ k, alt, className = '' }: { k: string; alt: string; className?: string }) {
  const url = photos[k]
  if (url) return <img src={url} alt={alt} loading="lazy" style={{ objectPosition: positions[k] }} className={`h-full w-full object-cover ${className}`} />
  const h = [...k].reduce((a, c) => a + c.charCodeAt(0), 0)
  const hue = 25 + (h % 30), cx = 30 + (h % 40), cy = 35 + (h % 30)
  return (
    <svg role="img" aria-label={alt} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className={`h-full w-full ${className}`}>
      <defs>
        <radialGradient id={`g${k}`} cx={`${cx}%`} cy={`${cy}%`} r="80%">
          <stop offset="0" stopColor={`hsl(${hue} 45% 32%)`} /><stop offset="1" stopColor="#121110" />
        </radialGradient>
      </defs>
      <rect width="100" height="100" fill={`url(#g${k})`} />
      <g fill="none" stroke="#c9a96a" strokeOpacity=".5" strokeWidth=".25">
        <circle cx={cx} cy={cy} r="24" /><circle cx={cx} cy={cy} r="17" /><circle cx={cx} cy={cy} r="6" fill="#c9a96a" fillOpacity=".15" />
        <path d={`M${cx - 34} ${cy + 30}h68`} />
      </g>
    </svg>
  )
}
