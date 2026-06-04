/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#000000',
        'dark-surface': '#212529',
        'text-primary': '#ffffff',
        'text-muted': '#6c757d',
        'border-color': '#343a40',
        'accent': '#0069d9',
        'accent-blue': '#007bff',
        'danger': '#dc3545',
        'success': '#28a745',
        'warning': '#ffc107',
      },
      fontFamily: {
        'dm-sans': ['DM Sans', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },
      spacing: {
        0: '0',
        1: '5px',
        2: '10px',
        3: '15px',
        4: '20px',
        5: '25px',
        6: '30px',
        7: '35px',
        8: '40px',
      },
      maxWidth: {
        'site': '1004px',
      },
    },
  },
  plugins: [],
}
