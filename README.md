# iCat

iCat is an interactive application designed for the Philips Museum. It allows visitors to chat with iCat, scan exhibitions, and answer questions to earn cosmetics.

## Figma Design

The design of iCat prioritizes a clean and intuitive interface. For detailed design elements and prototypes, please refer to the [Figma design](https://www.figma.com/design/mFjReu2wh6NmKH00q719ra/ICat?node-id=0-1&t=qg04wpLNwEOkdugm-1).

## Packages

- **clsx**
- **iconify-icon**
- **svelte-sonner**
- **sveltekit-flash-message**
- **tailwind-merge**
- **tailwindcss**
- **tailwind-variants**
- **typescript**

## Folder Structure

```bash
src/
├── lib/
│   ├── components/      # Reusable UI components
│   │   ├── layout/      # Layout components (e.g., header, footer)
│   │   ├── page/        # Page components (e.g., layout, wrapper)
│   │   └── shared/      # Shared UI components (e.g., buttons, modals)
│   ├── types/           # TypeScript types/interfaces
│   └── utils/           # Utility functions and helpers
static/
├── fonts/               # Custom fonts
├── images/              # Static image assets
```

## Features

- **Chat with iCat:** Visitors can have a conversation with iCat to learn more about exhibitions and museum events.

- **Scan Exhibitions:** Use your device to scan exhibitions and discover more information about each artwork or display.

- **Earn Cosmetics:** Answer questions correctly and complete interactive tasks to unlock cosmetics for your virtual iCat.

## Getting Started

```bash
npm install
npm run dev
```
