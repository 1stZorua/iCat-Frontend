import type { Config } from 'tailwindcss';

export default {
	mode: 'jit',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: [
		'toast',
		'toast-success',
		'toast-error',
		'toast-loading',
		'toast-info',
		'toast-bottom',
		'toast-top',
		'toast-center',
		'toast-pending',
		'toast-toast'
	],
	theme: {
		extend: {
			colors: {
				light: {
					btn: {
						primary: {
							bg: '#9192FE',
							fg: '#FFFFFF'
						},
						secondary: {
							bg: '#FFFFFF',
							fg: '#9192FE'
						},
						text: {
							bg: '',
							fg: ''
						}
					},
					text: {
						primary: '#2C2A37',
						accent: '#FFFFFF',
						muted: '#7C7C7C'
					},
					cards: {
						primary: {
							bg: '#ACDEFF',
							fg: '#3779A5'
						},
						secondary: {
							bg: '#B9F9C9',
							fg: '#3AA454'
						},
						accent: {
							bg: '#FFDA67',
							fg: '#A3862E'
						},
						background: {
							bg: '#F9B9BA',
							fg: '#A64748'
						},
						neutral: {
							bg: '#9192FE',
							fg: '#FFFFFF'
						}
					},
					background: {
						primary: '#FFFFFF',
						secondary: '#F3F7FA'
					},
					gradient: {
						from: '#C69DCD',
						to: '#9192FE'
					}
				}
			},
			fontFamily: {
				baloo: ['Baloo2', 'sans-serif'],
				poppins: ['Poppins', 'sans-serif'],
				palanquin: ['Palanquin', 'sans-serif']
			},
			borderRadius: {
				md: '0.625rem',
				lg: '1.25rem',
				xl: '1.875rem'
			},
			boxShadow: {
				md: '0 0 8px rgba(0, 0, 0, 0.05), 0 0 8px rgba(0, 0, 0, 0.05), 0 0 8px rgba(0, 0, 0, 0.05)'
			}
		},
		fontSize: {
			xs: 'clamp(0.25rem, 2.5vw, 0.5rem)',
			sm: 'clamp(0.75rem, 2.5vw, 1rem)',
			base: 'clamp(1rem, 3vw, 1.25rem)',
			md: 'clamp(1.125rem, 3vw, 1.5rem)',
			lg: 'clamp(1.125rem, 4vw, 2rem)',
			xl: 'clamp(1.5rem, 4.5vw, 2.25rem)'
		},
		screens: {
			xs: { max: '360px' },
			sm: { max: '576px' },
			md: { max: '768px' },
			lg: { max: '1024px' },
			xl: { max: '1280px' }
		}
	},
	plugins: []
} satisfies Config;
