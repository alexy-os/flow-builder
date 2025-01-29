/** @type {import('tailwindcss').Config} */
import uiPreset from '@packages/ui/tailwind.config';

export default {
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
  presets: [uiPreset]
} 