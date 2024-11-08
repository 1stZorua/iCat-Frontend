# SvelteKit Template

A SvelteKit template with TypeScript, TailwindCSS, essential utilities, and a pre-configured folder structure to speed up development.

## Packages

- **TypeScript**
- **Tailwind CSS**
- **tailwind-variants**
- **tailwind-merge**
- **clsx**

## Folder Structure

```bash
src/
├── lib/
│   ├── components/      # Reusable UI components
│   │   ├── layout/      # Layout components (e.g., header, footer)
│   │   └── shared/      # Shared UI components (e.g., buttons, modals)
│   ├── images/          # Static image assets
│   ├── types/           # TypeScript types/interfaces
│   └── utils/           # Utility functions and helpers
```

## Getting Started

```bash
npx degit 1stZorua/sveltekit-template my-new-app
cd my-new-app
npm install
npm run dev
```