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

## Setup on your local environment.

To configure your local environment for this project, follow these steps:

1. **Create a `.env.local` File:**
   Create a file named `.env.local` in the root directory of your project.

2. **Assign Values:**
   Inside the `.env.local` file, assign the following values to their respective variables:

- **NEXT_PUBLIC_BASE_URL**: `https://localhost:3000`
- **GIS_AUTH_ENDPOINT**: `https://auth.aiesec.org`
- **AUTH_CLIENT_ID**: `<Your Application UID from AIESEC Developer Page>`
- **AUTH_CLIENT_SECRET**: `<Your Secret ID from AIESEC Developer Page>`
- **AUTH_REDIRECT_URI**: `https://localhost:3000/auth`
- **NEXT_PUBLIC_EXPA_URL**: `https://expa.aiesec.org`


- `NEXT_PUBLIC_BASE_URL`: This is the base URL for your local development server.
- `GIS_AUTH_ENDPOINT`: Endpoint for AIESEC's authentication service.
- `AUTH_CLIENT_ID`: Obtain this UID from your AIESEC Developer Page.
- `AUTH_CLIENT_SECRET`: Obtain this Secret ID from your AIESEC Developer Page.
- `AUTH_REDIRECT_URI`: Redirect URI after authentication. Ensure it includes `auth` along with your local development server URL (`https://localhost:3000`).
- `NEXT_PUBLIC_EXPA_URL`: URL for AIESEC's Exchange Participant Application (EXPA).

3. **Accessing AIESEC Developer Page:**
Visit [AIESEC Developer Page](https://auth.aiesec.org/developers/applications) to obtain the required Client ID and Secret for authentication.

4. **Setting Redirect URI:**
When setting up your application in the AIESEC Developer Page, make sure to add the `AUTH_REDIRECT_URI` with `https://localhost:3000/auth`.

By following these steps, you'll have your local environment configured properly for development with the necessary environment variables.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
