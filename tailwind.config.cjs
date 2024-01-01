const { fontFamily } = require('tailwindcss/defaultTheme')
const config = require('./tailwind.theme.config.cjs')

const themeConfig = process.env.THEME_KEY && config[process.env.THEME_KEY] ? config[process.env.THEME_KEY] : config.rosepine
const { colors } = themeConfig

module.exports = {
    mode: 'jit',
    darkMode: 'class',
    purge: {
        content: ['./public/**/*.html', './src/**/*.{astro,js,ts,tsx,svelte}'],
        options: {
            safelist: ['dark'],
        },
    },
    theme: {
		fontFamily: {
			sans: ['DM Sans', ...fontFamily.sans],
            mono: ['Fira Code', ...fontFamily.mono],
		},
		extend: {
            colors: {
                //theme: {
                    ...colors
                //}
            },
            typography: (theme) => ({
                dark: {
                    css: {
                        color: theme("colors.gray.200"),
                        blockquote: {
                            color: colors.dark.primary,
                            borderColor: colors.primary
                        },
                        'blockquote > p::before, p::after': {
                            color: colors.primary,
                        },
                        ':not(pre) > code': {
                            color: theme('colors.gray.50'),
                            backgroundColor: theme('colors.gray.700'),
                        },
                        h1: {
                            color: theme('colors.dark.secondary'),
                        },
                        h2: {
                            color: theme('colors.dark.secondary'),
                        },
                        h3: {
                            color: theme('colors.dark.secondary'),
                        },
                    },
                },
                DEFAULT: {
                    css: {
                        a: {
                            color: theme('colors.primary'),
                              '&:hover': {
                                color: theme('colors.dark.primary'),
                              },
                        },
                        ':not(pre) > code': {
                            color: theme('colors.gray.700'),
                            backgroundColor: theme('colors.gray.100'),
                            padding: '0.25rem', /* 4px */
                            borderRadius: '0.375rem', /* 6px */
                        },
                        'code::before': {
                            content: 'none', // don’t generate the pseudo-element
                            //                content: '""', // this is an alternative: generate pseudo element using an empty string
                        },
                        'code::after': {
                            content: 'none'
                        },
                        blockquote: {
                            color: theme('colors.primary'),
                            borderColor: theme('colors.dark.primary')
                        },
                        'blockquote > p::before, p::after': {
                            color: theme('colors.primaryDark'),
                        },
                        h1: {
                            color: theme('colors.secondary'),
                        },
                        h2: {
                            color: theme('colors.secondary'),
                        },
                        h3: {
                            color: theme('colors.secondary'),
                        },
                    }
                },
            }),
		},
	},
    variants: {
        extend: { typography: ["dark"] }
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
    ]
};
