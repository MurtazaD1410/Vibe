# Vibe

Vibe is an AI-powered website builder inspired by Lovable.  
It leverages **Gemini 2.5 Pro** to create fully functional websites in minutes.  
Built with **Next.js**, **tRPC**, **TanStack Query**, **Clerk** for authentication & beta billing, **e2b** for sandboxes and live preview and **Inngest** for background service to ensure tasks run even if the internet drops.

---

## 🚀 Features

- **AI Website Generation** – Uses Google’s **Gemini 2.5 Pro** model to create responsive websites from user prompts.
- **Authentication & Billing** – Powered by **Clerk** (billing in beta).
- **tRPC + TanStack Query** – Type-safe API calls with smart client caching.
- **Background Job Processing (Inngest)** – Continues running queued tasks in the background, even during network disruptions.
- **Sandbox Previews** – Uses **e2b** to provide live sandboxes for website previews.
- **Code Review** – Includes a dedicated `code-view` folder for reviewing generated website code.
- **Modern UI** – Built with Next.js 14 and optimized for performance.

---

## 🛠️ Tech Stack

- **Framework** – [Next.js](https://nextjs.org/)
- **API Layer** – [tRPC](https://trpc.io/)
- **Data Fetching** – [TanStack Query](https://tanstack.com/query/latest)
- **Authentication & Billing** – [Clerk](https://clerk.com/)
- **AI Model** – [Gemini 2.5 Pro](https://ai.google/), via API
- **Background Jobs** – [Inngest](https://www.inngest.com/) service
- **Sandbox Preview** – [e2b](https://e2b.dev/)

