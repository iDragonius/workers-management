/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#377DFF',
                bgPrimary: '#F5FAFF',
                bgSecondary: '#FFF',
                textPrimary: '#06070d',
            },
        },
    },
    plugins: [],
}