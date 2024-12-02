import { tv, type VariantProps } from 'tailwind-variants';

const cardVariants = tv({
	base: 'p-3 rounded-lg flex shadow-md',
	variants: {
		color: {
			primary: 'bg-light-cards-primary-bg text-light-cards-primary-fg',
			secondary: 'bg-light-cards-secondary-bg text-light-cards-secondary-fg',
			accent: 'bg-light-cards-accent-bg text-light-cards-accent-fg',
			background: 'bg-light-cards-background-bg text-light-cards-background-fg',
			neutral: 'bg-light-cards-neutral-bg text-light-cards-neutral-fg'
		}
	},
	defaultVariants: {
		color: 'neutral'
	}
});

type CardProps = VariantProps<typeof cardVariants>;

export { cardVariants, type CardProps };
