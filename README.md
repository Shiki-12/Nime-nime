# Nime 🎌 - Anime Streaming Platform

A modern, responsive anime streaming platform built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS**. Browse, search, and watch your favorite anime with an elegant user interface.

---

## 📋 Project Overview

**Nime** is a full-featured anime streaming frontend application that aggregates anime content from external APIs. It provides users with a seamless experience to discover, search, and watch anime series with an intuitive interface.

### Key Highlights
- ⚡ **High Performance**: Built with Next.js 16 with React Compiler enabled for optimized rendering
- 🎨 **Modern UI**: Tailwind CSS v4 with responsive design
- 🌐 **Real-time Data**: Fetches anime data with Next.js revalidation caching
- 🎯 **Type-Safe**: Full TypeScript support for robust development
- 💾 **Local Storage**: Save and manage your favorite anime
- 🔍 **Advanced Search**: Search across multiple anime titles and genres

---

## ✨ Features

- **Browse Anime**
  - View ongoing/airing anime with pagination
  - Popular anime listings
  - Movie catalog
  
- **Search & Filter**
  - Full-text anime search
  - Browse by genres with curated selections
  - Filter by anime type and status

- **Watch Anime**
  - Video player for streaming episodes
  - Episode list with navigation
  - Streaming integration

- **User Features**
  - Save/bookmark your favorite anime
  - Persistent storage using browser localStorage
  - Responsive design for desktop and mobile

- **Navigation**
  - Intuitive navbar with quick links
  - Hero banner for featured content
  - Footer with additional information

---

## 🛠️ Technology Stack

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 16.1.6 | React framework with SSR/SSG |
| **React** | 19.2.3 | UI library |
| **TypeScript** | 5.x | Type safety |
| **Tailwind CSS** | 4.x | Styling & responsive design |
| **React Compiler** | 1.0.0 | Optimized render performance |
| **ESLint** | 9.x | Code linting |

### Project Analytics

```
Total Dependencies: 3
Dev Dependencies: 8
Lines of Code: ~2,000+ (estimated)
Supported Platforms: Web
API Type: RESTful (External Services)
Caching: Next.js ISR (Incremental Static Regeneration)
```

---

## 📁 Project Structure

```
Nime-nime/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── anime/[slug]/       # Anime detail pages
│   │   ├── anime/watch/        # Episode watch pages
│   │   ├── genres/             # Genre browsing
│   │   ├── movies/             # Movie catalog
│   │   ├── popular/            # Popular anime
│   │   ├── search/[query]/     # Search results
│   │   ├── saved/              # Bookmarked anime
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home/Ongoing anime
│   │   └── globals.css         # Global styles
│   ├── components/             # React components
│   │   ├── AnimeCard.tsx       # Anime grid card
│   │   ├── AnimeActions.tsx    # Action buttons
│   │   ├── EpisodeList.tsx     # Episode navigation
│   │   ├── HeroBanner.tsx      # Featured banner
│   │   ├── Navbar.tsx          # Main navigation
│   │   ├── SearchBar.tsx       # Search input
│   │   ├── VideoPlayer.tsx     # Episode player
│   │   └── Footer.tsx          # Footer section
│   ├── hooks/                  # Custom React hooks
│   │   └── useLocalStorage.ts  # Browser storage hook
│   ├── lib/                    # Utility functions
│   │   └── api.ts              # API calls & data fetching
│   └── types/                  # TypeScript interfaces
│       └── anime.ts            # Anime data types
├── public/                     # Static assets
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── next.config.ts              # Next.js config
├── tailwind.config.js          # Tailwind config
└── eslint.config.mjs           # ESLint rules
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** 18.17+ or later ([Download](https://nodejs.org/))
- **npm** 8.0+, **yarn**, **pnpm**, or **bun** (npm comes with Node.js)
- **Git** (for version control)

### Installation Steps

1. **Clone or navigate to the project directory**
   ```bash
   cd c:\laragon\www\Nime-nime
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   Or using other package managers:
   ```bash
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Verify installation**
   ```bash
   npm --version
   node --version
   ```

---

## 💻 Running Locally

### Development Mode

Start the development server with hot-reload:

```bash
npm run dev
```

Or with other package managers:
```bash
yarn dev
# or
pnpm dev
# or
bun dev
```

The application will be available at:
- **Local**: [http://localhost:3000](http://localhost:3000)
- **Network**: http://YOUR_IP:3000

**Hot Module Replacement (HMR)** is enabled—your changes will reflect in the browser instantly.

### Production Build

Build the application for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

### Linting

Check for code quality issues:

```bash
npm run lint
```

---

## 🔧 Configuration

### Next.js Configuration
See [next.config.ts](next.config.ts) for:
- React Compiler optimization enabled
- Remote image patterns for anime poster CDNs:
  - `cdn.myanimelist.net` - MyAnimeList images
  - `*.wp.com` - WordPress image hosting

### Environment Setup

The application uses the following external API:
- **Base URL**: `https://www.sankavollerei.com/anime/animasu`
- **Type**: RESTful API
- **Caching**: 1-hour ISR (Incremental Static Regeneration)

No API keys or environment variables required for basic functionality.

### TypeScript Configuration
- **Target**: ES2020
- **Module**: ESNext
- **Strict Mode**: Enabled
- **JSX**: React 19

---

## 🌐 API Integration

The app fetches anime data from an external anime database API with the following endpoints:

| Endpoint | Purpose |
|---|---|
| `/ongoing?page=X` | Fetch currently airing anime |
| `/detail/{slug}` | Get detailed anime information |
| `/episode/{slug}` | Fetch episode streaming data |
| `/genre` | List available genres |
| `/search?query=X` | Search anime by title |
| `/movies` | Movie catalog |
| `/popular` | Popular anime rankings |

---

## 🎯 Common Tasks

### View Database/Admin
Currently, the app uses a read-only external API. For local development with a custom database, you would need to:
1. Set up a Node.js backend API
2. Update the `BASE_URL` in [src/lib/api.ts](src/lib/api.ts)

### Add New Pages
1. Create a new folder in [src/app/](src/app/)
2. Add `page.tsx` and `layout.tsx` (if needed)
3. Use existing API functions from [src/lib/api.ts](src/lib/api.ts)

### Customize Styling
1. Edit Tailwind classes in components
2. Modify `globals.css` for global styles
3. Check `tailwind.config.js` for theme configuration

### Add Custom Hooks
1. Create new files in [src/hooks/](src/hooks/)
2. Export custom React hooks
3. Import in components as needed

---

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 15+
- Mobile browsers (iOS Safari, Chrome Android)

---

## ⚠️ Troubleshooting

### Port 3000 Already in Use
```bash
# Find and kill process on port 3000
# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Then restart: npm run dev
```

### API Connection Errors
- Check your internet connection
- Verify the API is accessible: `https://www.sankavollerei.com/anime/animasu`
- Clear browser cache and restart dev server

### Build Failures
```bash
# Clear cache and rebuild
rm -r .next node_modules
npm install
npm run build
```

### Hot Reload Not Working
- Restart the dev server: `Ctrl+C` then `npm run dev`
- Check that port 3000 is not blocked by firewall

---

## 📝 Notes

- **API Rate Limiting**: The external API may have rate limits. The app includes 1-hour caching to minimize requests.
- **CORS**: The API supports cross-origin requests from this domain.
- **Responsive Design**: Mobile-first approach with responsive breakpoints (sm, md, lg, xl).
- **Performance**: React Compiler optimization reduces re-renders and improves bundle size.

---

## 📄 License

This project is provided as-is for personal and educational use.

---

## 🤝 Contributing

To contribute improvements:
1. Create a new branch (`git checkout -b feature/improvement`)
2. Make your changes and test locally
3. Commit with clear messages
4. Push and create a pull request

---

**Last Updated**: March 6, 2026  
**Status**: Active Development  
**Version**: 0.1.0
