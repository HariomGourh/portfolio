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
        'float':       'float 6s ease-in-out infinite',
        'blink':       'blink 1s infinite',
        'ring-spin':   'ringSpin 5s linear infinite',
        'ring-spin-r': 'ringSpin 10s linear infinite reverse',
        'pulse-dot':   'pulseDot 2s infinite',
        'scroll-line': 'scrollLine 2s ease-in-out infinite',
        'fade-up':     'fadeUp 1s ease both',
        'marquee':     'marqueeScroll 28s linear infinite',
        'border-spin': 'borderSpin 5s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-18px)' },
        },
        blink: {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '0' },
        },
        ringSpin: {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        pulseDot: {
          '0%,100%': { opacity: '1', transform: 'scale(1)' },
          '50%':     { opacity: '0.4', transform: 'scale(1.4)' },
        },
        scrollLine: {
          '0%':     { transform: 'scaleY(0)', transformOrigin: 'top' },
          '50%':    { transform: 'scaleY(1)', transformOrigin: 'top' },
          '50.01%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
          '100%':   { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        marqueeScroll: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        borderSpin: {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}
