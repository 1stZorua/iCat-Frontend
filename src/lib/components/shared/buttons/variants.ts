import { tv, type VariantProps } from 'tailwind-variants';

const buttonVariants = tv({
	base: 'flex px-6 py-2',
	variants: {
		variant: {
			primary: 'bg-light-btn-primary-bg text-light-btn-primary-fg rounded-md',
			secondary: 'bg-light-btn-secondary-bg text-light-btn-secondary-fg rounded-full',
			action:
				'flex items-center justify-center bg-light-background-primary h-12 w-12 shadow-md rounded-full',
			text: 'bg-light-btn-text-bg text-light-btn-text-fg'
		}
	},
	defaultVariants: {
		variant: 'primary'
	}
});

type ButtonProps = VariantProps<typeof buttonVariants>;

export { buttonVariants, type ButtonProps };
