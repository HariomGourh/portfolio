/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float':        'float 6s ease-in-out infinite',
        'blink':        'blink 1s infinite',
        'pulse-dot':    'pulse-dot 2s infinite',
        'scroll-line':  'scrollLine 2s ease-in-out infinite',
        'fade-up':      'fadeUp 1s ease both',
        'spin':         'spin 6s linear infinite',
        'spin-r':       'spin-r 14s linear infinite',
        'hero-float':   'heroFloat 5s ease-in-out infinite',
        'hero-glow':    'heroGlow 4s ease-in-out infinite alternate',
        'float-bob':    'floatBob 5s ease-in-out infinite',
        'glow1':        'glow1 20s ease-in-out infinite alternate',
        'glow2':        'glow2 16s ease-in-out infinite alternate',
        'glow3':        'glow3 24s ease-in-out infinite alternate',
      },
      keyframes: {
        float:     { '0%,100%':{transform:'translateY(0)'},     '50%':{transform:'translateY(-18px)'} },
        blink:     { '0%,100%':{opacity:'1'},                   '50%':{opacity:'0'} },
        'pulse-dot':{ '0%,100%':{opacity:'1',transform:'scale(1)'}, '50%':{opacity:'.4',transform:'scale(1.4)'} },
        scrollLine:{ '0%':{transform:'scaleY(0)',transformOrigin:'top'}, '50%':{transform:'scaleY(1)',transformOrigin:'top'}, '50.01%':{transform:'scaleY(1)',transformOrigin:'bottom'}, '100%':{transform:'scaleY(0)',transformOrigin:'bottom'} },
        fadeUp:    { from:{opacity:'0',transform:'translateY(24px)'}, to:{opacity:'1',transform:'translateY(0)'} },
        'spin':    { from:{transform:'rotate(0deg)'},   to:{transform:'rotate(360deg)'}  },
        'spin-r':  { from:{transform:'rotate(360deg)'}, to:{transform:'rotate(0deg)'}    },
        heroFloat: { '0%,100%':{transform:'translateY(0)'},     '50%':{transform:'translateY(-14px)'} },
        heroGlow:  { from:{transform:'scale(1)'},               to:{transform:'scale(1.1)'} },
        floatBob:  { '0%,100%':{transform:'translateY(0)'},     '50%':{transform:'translateY(-10px)'} },
        glow1:     { from:{transform:'translate(0,0)'},         to:{transform:'translate(100px,80px)'} },
        glow2:     { from:{transform:'translate(0,0)'},         to:{transform:'translate(-80px,-60px)'} },
        glow3:     { '0%':{transform:'translate(-50%,-50%) scale(1)'}, '100%':{transform:'translate(-50%,-50%) scale(1.3)'} },
      },
    },
  },
  plugins: [],
}
