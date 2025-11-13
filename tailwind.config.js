/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          500: '#1e293b',
          600: '#0f172a',
          900: '#020617'
        },
        secondary: {
          500: '#64748b',
          600: '#475569'
        },
        accent: {
          500: '#f59e0b',
          600: '#d97706'
        },
        background: {
          50: '#ffffff',
          100: '#f8fafc'
        }
      },
      fontFamily: {
        primary: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif']
      }
    },
  },
  plugins: [],
}
