# alman-akka

🏳️‍🌈 event calendar

[![CI](https://github.com/kaupunginnaiset/alman-akka/actions/workflows/ci.yml/badge.svg)](https://github.com/kaupunginnaiset/alman-akka/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/kaupunginnaiset/alman-akka/branch/main/graph/badge.svg?token=NRWPWLHM1M)](https://codecov.io/gh/kaupunginnaiset/alman-akka)

## Frontend

The frontend of this app uses NextJS and Node 16 together with Yarn 1.x as a package manager.

### Development

- Run `yarn` to install the required dependencies - you can find docs and installation guide for yarn [here](https://classic.yarnpkg.com/lang/en/) if you don't have it yet
- Run `nvm use` to set the required version with [NVM](https://github.com/nvm-sh/nvm)
- To fix linter errors, run `yarn next lint --fix` (when used with vscode, there is a setting in place for automatically formatting on save)

### Getting Started

First, start the firebase emulator:

```bash
yarn tools:emulator
```

Then, open another terminal and run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

### Learn More About Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
