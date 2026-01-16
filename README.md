# Prichat

A real-time chat application built with modern web technologies. Users can create private chat rooms, invite others, and communicate in real-time with message persistence.

## Features

- **Real-time Messaging**: Instant message delivery using Upstash Realtime
- **Chat Rooms**: Create and join private chat rooms with unique identifiers
- **User Management**: Set and manage usernames for chat participation
- **Message History**: Persistent message storage using Redis
- **Responsive UI**: Beautiful, responsive interface with Tailwind CSS
- **Type-Safe**: Built with TypeScript for robust type safety
- **Modern React**: Uses React 19 with Next.js 16

## Tech Stack

### Frontend
- **Framework**: Next.js 16 (React 19)
- **Styling**: Tailwind CSS 4 with PostCSS
- **State Management**: TanStack React Query
- **UI Components**: Lucide React icons, shadcn-inspired components
- **3D Graphics**: Three.js (for visual effects)
- **Utilities**: clsx, tailwind-merge, date-fns

### Backend
- **API Framework**: Elysia with TypeScript
- **Real-time**: Upstash Realtime
- **Database**: Upstash Redis
- **Validation**: Zod

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
# Create a .env.local file with your Upstash credentials:
# UPSTASH_REDIS_REST_URL=your_redis_url
# UPSTASH_REDIS_REST_TOKEN=your_redis_token
# UPSTASH_REDIS_URL=your_redis_connection_string
# UPSTASH_REDIS_TOKEN=your_redis_token
```

### Development

```bash
# Run the development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Production

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── [[...slugs]]/  # Dynamic authentication and routes
│   │   └── realtime/      # Real-time WebSocket endpoint
│   ├── room/              # Chat room page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── LoadingSkeleton.tsx
│   ├── PixelSnow.tsx
│   └── Providers.tsx
├── hooks/                 # Custom React hooks
│   └── use-username.ts
├── lib/                   # Utility libraries
│   ├── eden.ts            # Elysia client setup
│   ├── realtime.ts        # Realtime schema definition
│   ├── realtime-client.ts # Realtime client logic
│   ├── redis.ts           # Redis client
│   └── utils.ts
└── types/                 # TypeScript type definitions
```

## API Routes

### Authentication & Dynamic Routes
- `GET/POST /api/[[...slugs]]` - Handles authentication and dynamic routing

### Real-time
- `GET /api/realtime` - WebSocket endpoint for real-time messaging

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Usage

1. **Enter a username** - Set your username on the home page
2. **Create or join a room** - Enter a room ID or create a new one
3. **Chat in real-time** - Send and receive messages instantly
4. **Share rooms** - Invite others using the room ID

## Environment Setup

This project requires Upstash (Redis and Realtime) credentials. Sign up at [upstash.com](https://upstash.com) and configure your `.env.local` file.


## Support

For issues or questions, please refer to the project documentation.
