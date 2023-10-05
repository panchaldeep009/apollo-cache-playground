/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const preset = require('./theme.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
	],
  presets: [preset],
}