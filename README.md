# Pokedex app

Pokedex web app for learn useSWR

- **Framework**: [Next.js](https://nextjs.org/)
- **API** [Pokeapi](https://pokeapi.co/docs/v2)
- **Fetching** [SWR](https://swr.vercel.app/)
- **Deployment** [Vercel](https://vercel.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)

## TODO

- [ X ] ~~Add pagination for main page~~
- [ X ] ~~Move usePokemon hook to custom hooks file~~
- [ X ] ~~Add @shadcn-ui/skeleton for loading states~~
- [ X ] ~~Add search by name filtering for main page~~
- [ X ] ~~Improve error handling and utils functions~~
- [ X ] ~~break down the individual components of the Pokemon detail page~~

## Overview

- `__tests__/*` - All tests contains here.
- `components/` - All components.
- `components/ui` - Primitive components.
- `types/`- Contains all types and interfaces.
- `lib/`- Contains metadata and util functions.
- `app/*` - All other static pages.
- `app/pokemon/*` - Dynamic pokemon detail pages.

## Demo

```bash
https://pokedex-beta-three-39.vercel.app/
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
