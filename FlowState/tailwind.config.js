/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        ink: { DEFAULT: '#0D1F2D', soft: '#1E3A4F' },
        ocean: { DEFAULT: '#1A5F7A', mid: '#2E86AB', lt: '#57B8D6', pale: '#D6E8EE' },
        sage: { DEFAULT: '#6B9E78', lt: '#A8C5A0', pale: '#E8F4EC' },
        sand: { DEFAULT: '#F5EFE6', lt: '#FBF8F4' },
        gold: { DEFAULT: '#C8A96E', lt: '#E8D5A8' },
        mist: { DEFAULT: '#D6E8EE', dark: '#7AAABB' },
      },
      animation: {
        'bob': 'bob 3s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'ripple': 'ripple 0.6s ease-out forwards',
      },
      keyframes: {
        bob: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
        fadeUp: { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'none' } },
        shimmer: { from: { backgroundPosition: '-200% 0' }, to: { backgroundPosition: '200% 0' } },
        pulseSoft: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.6 } },
        ripple: { from: { transform: 'scale(0)', opacity: 0.4 }, to: { transform: 'scale(4)', opacity: 0 } },
      },
      backdropBlur: { xs: '4px' },
      borderRadius: { '2xl': '20px', '3xl': '28px', '4xl': '40px' },
      boxShadow: {
        'soft': '0 4px 20px rgba(13,31,45,0.07)',
        'card': '0 8px 32px rgba(13,31,45,0.10)',
        'xl-soft': '0 20px 60px rgba(13,31,45,0.14)',
        'glow-ocean': '0 0 40px rgba(46,134,171,0.25)',
        'glow-sage': '0 0 40px rgba(107,158,120,0.2)',
      },
    },
  },
  plugins: [],
}