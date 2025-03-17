/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.jsx",
    ],
    theme: {
        extend: {},
    },
    safelist: ['dark', 'positive', 'negative', 'light'],
    plugins: [
        function({ addVariant }) {
            addVariant('dark', '&.dark, .dark &');
            addVariant('light', '&.light, .light &');
            addVariant('positive', '&.positive, .positive &');
            addVariant('negative', '&.negative, .negative &');
        }
    ],
}

