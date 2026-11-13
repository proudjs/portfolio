/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        surface: 'var(--surface)',
        red: 'var(--red)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        gold: 'var(--gold)',
      },
      fontFamily: {
        display: 'var(--display)',
        body: 'var(--body)',
      },
    },
  },
  plugins: [],
}
