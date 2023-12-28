This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
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

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

Useful Commands:

If stuck on downloading:
```bash
npm cache clear --force

npm install

npm config set cache C:\Users\myname\AppData\Roaming\npm-cache

npm config set prefix C:\Users\myname\AppData\Roaming\npm

# then download needed packages
```

Vercel:
```bash
npm i -g vercel@latest

npm i -g @vercel/client

npm i @vercel/postgres

vercel link

vercel env pull .env.development.local
```

Prisma:
```bash
npm i -g prisma@latest

npm i -g @prisma/client@latest

prisma init

prisma generate

prisma migrate dev
```

If prisma schema not updating after 
```bash 
prisma migrate dev
```

Restart VS Code language server (Hit Ctrl + Shift + P, then search for Restart TS server) or open and close VSCode

Notes on prisma generate:
https://stackoverflow.com/questions/63972581/how-to-run-prisma-generate-in-production

Notes on prisma relational queries:
https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#nested-writes