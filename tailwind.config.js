/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'text-body': 'rgb(63 63 70 / 1)',
        'text-heading': 'rgb(39 39 42 / 1)',
      },
    },
  },
  plugins: [],
};