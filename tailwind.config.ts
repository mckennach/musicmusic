import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  mode: 'jit',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/context/**/*.{js,ts,jsx,tsx}'
  ],
  prefix: '',
  theme: {
    container: {
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      container: {
        screens: {
          '1xl': '39rem',
          '3-4xl': '45rem',
          '5-6xl': '66rem',
          '9xl': '106rem'
        },
        center: true
      },
      fontSize: {
        '2xs': '0.625rem'
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'var(--base)',
        foreground: 'var(--text-base)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)'
        },
        secondary: {
          DEFAULT: 'var(--background-highlight)',
          foreground: 'var(--foreground)'
        },
        destructive: {
          DEFAULT: 'var(--essential-negative)',
          foreground: 'var(--foreground)',
          base: 'var(--essential-negative-base)',
          border: 'var(--essential-negative-border)',
          press: 'var(--essential-negative-press)',
          hover: 'var(--essential-negative-hover)'
        },
        muted: {
          DEFAULT: 'var(--background-tinted-base)',
          foreground: '(var(--foreground)'
        },
        accent: {
          DEFAULT: 'var(--background-tinted-base)',
          foreground: 'var(--foreground)'
        },
        popover: {
          DEFAULT: 'var(--background-elevated-base)',
          foreground: 'var(--text-base)'
        },
        card: {
          DEFAULT: 'var(--background-base)',
          foreground: 'var(--text-base)'
        },
        highlight: {
          DEFAULT: 'var(--background-highlight)',
          foreground: 'var(--foreground)'
        },
        press: {
          DEFAULT: 'var(--background-press)',
          foreground: 'var(--foreground)'
        },
        'elevated-base': {
          DEFAULT: 'var(--background-elevated-base)',
          foreground: 'var(--foreground)'
        },
        'elevated-highlight': {
          DEFAULT: 'var(--background-elevated-highlight)',
          foreground: 'var(--foreground)'
        },
        'elevated-press': {
          DEFAULT: 'var(--background-elevated-press)',
          foreground: 'var(--foreground)'
        },
        'tinted-base': {
          DEFAULT: 'var(--background-tinted-base)',
          foreground: 'var(--foreground)'
        },
        'tinted-hover': {
          DEFAULT: 'var(--background-tinted-base)',
          foreground: 'var(--foreground)'
        },
        'tinted-higlight': {
          DEFAULT: 'var(--background-tinted-highlight)',
          foreground: 'var(--foreground)'
        },
        'tinted-higlight-2': {
          DEFAULT: 'var(--background-tinted-highlight-2)',
          foreground: 'var(--foreground)'
        },
        'tinted-higlight-3': {
          DEFAULT: 'var(--background-tinted-highlight-3)',
          foreground: 'var(--foreground)'
        },
        'tinted-press': {
          DEFAULT: 'var(--background-tinted-press)',
          foreground: 'var(--foreground)'
        },
        subdued: {
          DEFAULT: 'var(--text-subdued)',
          foreground: 'var(--text-subdued)'
        },
        spotify: {
          DEFAULT: 'var(--spotify-bg-base)',
          highlight: 'var(--spotify-bg-highlight)',
          press: 'var(--spotify-bg-press)',
          'elevated-base': 'var(--spotify-bg-elevated-base)',
          'elevated-highlight': 'var(--spotify-bg-elevated-highlight)',
          'elevated-press': 'var(--spotify-bg-elevated-press)',
          'tinted-base': 'var(--spotify-bg-tinted-base)',
          'tinted-highlight': 'var(--spotify-bg-tinted-highlight)',
          'tinted-press': 'var(--spotify-bg-tinted-press)',
          foreground: 'var(--spotify-text-base)',
          inverted: 'var(--spotify-text-inverted)'
        },
        'bright-accent': 'var(--text-bright-accent)',
        invert: {
          DEFAULT: 'var(--inverted-bg-base)',
          highlight: 'var(--inverted-bg-highlight)',
          press: 'var(--inverted-bg-press)',
          'elevated-base': 'var(--inverted-bg-elevated-base)',
          'elevated-highlight': 'var(--inverted-bg-elevated-highlight)',
          'elevated-press': 'var(--inverted-bg-elevated-press)',
          'tinted-base': 'var(--inverted-bg-tinted-base)',
          'tinted-highlight': 'var(--inverted-bg-tinted-highlight)',
          'tinted-press': 'var(--inverted-bg-tinted-press)',
          foreground: 'var(--inverted-text-base)',
          subdued: 'var(--inverted-text-subdued)',
          'bright-accent': 'var(--inverted-text-bright-accent)'
        },
        announcement: {
          DEFAULT: 'var(--announcement-bg-base)',
          highlight: 'var(--announcement-bg-highlight)',
          press: 'var(--announcement-bg-press)',
          'elevated-base': 'var(--announcement-bg-elevated-base)',
          'elevated-highlight': 'var(--announcement-bg-elevated-highlight)',
          'elevated-press': 'var(--announcement-bg-elevated-press)',
          'tinted-base': 'var(--announcement-bg-tinted-base)',
          'tinted-highlight': 'var(--announcement-bg-tinted-highlight)',
          'tinted-press': 'var(--announcement-bg-tinted-press)',
          foreground: 'var(--announcement-text-base)'
        },
        slider: {
          DEFAULT: 'var(--slider-track)',
          range: 'var(--slider-range)',
          thumb: 'var(--slider-thumb)',
          'range-active': 'var(--slider-range-active)'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'overlay-animation': {
          '20%': { opacity: '1' },
          '100%': { opacity: '1' }
        },
        'background-scroll-animation': {
          '80%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' }
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-in-out forwards',
        'overlay-animation': 'overlay-animation 0.2s ease-in-out forwards',
        'background-scroll-animation':
          'background-scroll-animation 1s ease-in-out infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },

  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
    require('@tailwindcss/container-queries')
  ]
} satisfies Config

export default config
