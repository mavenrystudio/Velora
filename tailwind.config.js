export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: { char: '#121110', char2: '#1b1917', ivory: '#f4efe6', gold: '#c9a96a' },
    fontFamily: { serif: ['"Cormorant Garamond"', 'Georgia', 'serif'], sans: ['Jost', 'system-ui', 'sans-serif'] }
  } },
  plugins: []
}
