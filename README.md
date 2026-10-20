# QUEEN website

Next.js App Router website with TypeScript, React, local fonts and local image assets.

## Development

Use Node.js 24 and npm.

```sh
npm ci
npm run dev
```

## Production

```sh
npm run build
npm start
```

## Vercel

Import this repository, select **Next.js**, and keep the root directory at the repository root. Use `npm ci` to install and `npm run build` to build; leave the output directory at the Next.js default. No environment variables are required.

The site includes the homepage, product overview, medical mold product detail, blog overview and four blog articles. Navigation and styling are shared across pages. Images and the PDF catalog are served from `public/assets`.

The inquiry form validates input and prepares an email draft. It does not submit files or send messages through a server. Search indexing is currently disabled in the root metadata for this preview; review that setting before a public marketing launch.

Do not commit environment files, access tokens, private keys, build output or dependencies.
