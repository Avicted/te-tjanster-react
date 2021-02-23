module.exports = {
    purge: ['src/**/*.js', 'src/**/*.jsx', 'src/**/*.ts', 'src/**/*.tsx', 'public/**/*.html'],
    darkMode: 'class', // 'media' or 'class'
    theme: {
        extend: {
            screens: {
                print: { raw: 'print' },
            },
        },
    },
    variants: {
        extend: {
            opacity: ['disabled'],
        },
    },
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
    ],
}
