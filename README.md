# Discover Videos - Netflix Clone

Welcome to "_discover-videos_" — your gateway to seamless video exploration.<br />Elevate your content discovery with our curated collection. 🎥📺

**Repository Overview**<br />Welcome to the repository for 'Discover Videos', a project featured in the [Complete Next.js Developer](https://www.udemy.com/course/complete-nextjs-developer-zero-to-mastery/) course by [Zero To Mastery](https://zerotomastery.io/). This repository serves as a comprehensive demonstration, showcasing both fundamental and advanced concepts in Next.js development. Explore the intricacies of Authentication, Incremental Static Regeneration (ISR), and GraphQL integration, alongside core features like Routing, Static Site Generation (SSG), and Serverless Functions. Dive into the depth of Next.js capabilities with this illustrative (Netflix clone) application.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

To begin exploring and contributing to this project, follow these steps:

```bash
git clone https://github.com/ThomasCode92/discover-videos
yarn install # install dependencies
# add .env.local file, as described below
yarn dev # start development server
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file. The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

### Environment variables

For this project to function properly, it's essential to set up a couple of API keys. Without them, the videos won't display correctly. The needed keys are for:

- [magic.link](https://magic.link/docs/home/welcome), passwordless authentication
- [YouTube API](https://developers.google.com/youtube/v3/getting-started), video search and viewing.

For that, you need to create a `.env.local` file in your project that will look like this:

```bash
YOUTUBE_API_KEY=<REPLACE THIS>
NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY=<REPLACE THIS>
```

Obtain the necessary environment values by referring to the documentation links provided above. Once retrieved, paste them into the appropriate placeholders.

### Local Development with YouTube API

During local development, it's advisable to include the environment variable DEVELOPMENT=true. This setting prevents fetching videos from the YouTube API and instead accesses them from `data/videos.json`. This approach helps avoid reaching the YouTube API quota during development, allowing you to continue your work without concerns about exhausting API calls.<br />Start the development server with `DEVELOPMENT=true yarn dev`

## Deployed on Vercel

The application is deployed on the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme). Vercel is a hoisting platform build by the creators of Next.js.<br />Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
