import { tv, type VariantProps } from 'tailwind-variants';

const textVariants = tv({
	base: '',
	variants: {
		weight: {
			light: 'font-light',
			normal: 'font-normal',
			medium: 'font-medium',
			semibold: 'font-semibold',
			bold: 'font-bold',
			extrabold: 'font-extrabold'
		},
		size: {
			xs: 'text-xs',
			sm: 'text-sm',
			base: 'text-base',
			md: 'text-md',
			lg: 'text-lg',
			xl: 'text-xl'
		},
		family: {
			baloo: 'font-baloo',
			poppins: 'font-poppins',
			palanquin: 'font-palanquin'
		}
	},
	defaultVariants: {
		weight: 'medium',
		size: 'base',
		family: 'poppins'
	}
});

type TextProps = VariantProps<typeof textVariants>;

export { textVariants, type TextProps };
