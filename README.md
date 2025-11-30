# Guney Yildiz Portfolio

A professional portfolio website for Guney Yildiz (journalist, political risk consultant, PhD candidate at Cambridge) featuring:

- **Public Website**: Showcase articles, videos, research, and expertise
- **Admin Dashboard**: Paste URLs to auto-publish content in minutes
- **AI Enhancement**: Auto-generate summaries, tags, and audio
- **Smart Scraping**: Handle Forbes, BBC, YouTube, and paywalled content

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Auth**: NextAuth.js
- **Deployment**: Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (public)/           # Public site routes
│   ├── admin/              # Admin dashboard routes
│   └── api/                # API routes
├── components/             # React components
│   ├── ui/                 # Base UI components
│   ├── layout/             # Layout components
│   ├── article/            # Article components
│   ├── video/              # Video components
│   ├── forms/              # Form components
│   ├── search/             # Search components
│   ├── admin/              # Admin components
│   └── home/               # Homepage components
└── lib/                    # Utilities and helpers
    ├── content-ingestion/  # Content extraction system
    └── types.ts            # TypeScript types
```

## Environment Variables

Create a `.env.local` file with:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Auth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# APIs
ANTHROPIC_API_KEY=your_anthropic_key
ELEVENLABS_API_KEY=your_elevenlabs_key
YOUTUBE_API_KEY=your_youtube_api_key
```
