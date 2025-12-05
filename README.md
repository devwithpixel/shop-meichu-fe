# Shop Meichu

A modern, premium digital assets marketplace specializing in high-quality 3D meshes, textures, and opacity maps for creators, designers, and developers.

## Features

- **Digital Asset Marketplace** - Browse and purchase professional 3D meshes, textures, and opacity maps
- **Modern UI/UX** - Built with Next.js 16 and React 19 for a seamless user experience
- **Smooth Animations** - Powered by GSAP and Motion for fluid, engaging interactions
- **Responsive Design** - Fully responsive interface using Tailwind CSS
- **Advanced Filtering** - Find exactly what you need with powerful search and filter capabilities
- **Secure Authentication** - User authentication powered by Iron Session
- **Shopping Cart** - Intuitive cart management for easy purchasing
- **User Dashboard** - Manage your purchases and account settings

## Tech Stack

### Frontend

- **Framework**: [Next.js 16](https://nextjs.org/) - React framework with App Router
- **React**: 19.2.0 - Latest React with concurrent features
- **TypeScript**: Type-safe development
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework

### UI Components

- **Shadcn UI** - A collection of ready-to-use React components

### Animations & Interactions

- **GSAP** - Professional-grade animation library

### State Management & Data Fetching

- **SWR** - React Hooks for data fetching
- **React Hook Form** - Performant form management
- **Zod** - TypeScript-first schema validation
- **Mutative** - Efficient immutable state updates

### Additional Libraries

- **TanStack Table** - Headless table component
- **date-fns** - Modern date utility library
- **React Hot Toast** - Notifications
- **nuqs** - Type-safe URL search params

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20.x or higher
- **npm** or **yarn** or **pnpm**
- **Git**

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/princeTyo/shop-meichu-fe.git
cd shop-meichu-fe
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Using yarn:

```bash
yarn install
```

Using pnpm:

```bash
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory and add your environment variables:

```env
# Example:
NEXT_PUBLIC_BACKEND_BASE_URL=
# Strapi Backend URL
NEXT_PUBLIC_BACKEND_API_URL="${NEXT_PUBLIC_BACKEND_BASE_URL}/api"
SESSION_SECRET=
# Generate SESSION_SECRET using `openssl rand -base64 32`
```

### 4. Run Development Server

Using npm:

```bash
npm run dev
```

Using yarn:

```bash
yarn dev
```

Using pnpm:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Build for Production

### Build the Application

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

---

**Built by the Shop Meichu Team**
