This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy to GitHub Pages

This project is configured to automatically deploy to GitHub Pages when you push to the `main` branch.

### Initial Setup

1. Go to your repository settings on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Build and deployment**, select:
   - Source: **GitHub Actions**
4. Push your code to the `main` branch

The deployment will happen automatically via GitHub Actions.

### Accessing Your Deployed Site

After deployment, your site will be available at:
```
https://polyplot-xyz.github.io/Polyplot-frontend/
```

### Local Build Testing

To test the static export locally:

```bash
npm run build
npx serve@latest out
```

### Custom Domain (Optional)

If you want to use a custom domain:

1. Create a `CNAME` file in the `public` directory with your domain
2. Configure your DNS settings to point to GitHub Pages
3. Update `basePath` in `next.config.ts` to an empty string

## Deploy on Vercel

Alternatively, you can deploy to Vercel by removing the `output: 'export'` line from `next.config.ts`.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
