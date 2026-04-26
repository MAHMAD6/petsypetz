# PetsyPetz 🐾

PetsyPetz is a modern, high-end pet marketplace and community platform built with Next.js. It features a premium design with smooth animations, interactive pet contests, and a robust administrative dashboard for content management.

## ✨ Key Features

- **Pet Marketplace**: A curated selection of premium pets with detailed profiles and glassmorphic card designs.
- **Pet Contests**: Interactive community contests where users can vote and showcase their pets.
- **Dynamic Stats**: Live-updating platform statistics with interactive toggles.
- **Authentication**: Dedicated secure authentication system for users and administrators.
- **Admin Dashboard**: Comprehensive management interface for handling media, hero sections, and platform content.
- **Premium UI/UX**: Built with modern aesthetics, including glassmorphism, smooth CSS transitions, and responsive layouts.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Vanilla CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) (Modern Custom Properties & Utilities)
- **Database**: [SQLite](https://sqlite.org/) via [Prisma ORM](https://www.prisma.io/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Development**: TypeScript, pnpm

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm/yarn

### Installation

1. **Clone or Extract the project**:
   ```bash
   cd petsypetz
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables**:
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

### Database Setup

Initialize the SQLite database and run migrations:

```bash
npx prisma migrate dev --name init
```

### Running the Project

Start the development server:

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 📁 Project Structure

- `src/app`: Next.js App Router pages and API routes.
- `src/components`: Reusable UI components (Hero, Navbar, StatsStrip, etc.).
- `src/lib`: Shared utilities and database clients.
- `src/store`: Global state management using Zustand.
- `prisma`: Database schema and migration history.
- `public`: Static assets and media files.

## 📄 Legacy Design Reference

For reference, the original static design file is included in the root as `petsypetz (1).html`.

---
*Built with passion for pets and premium code.*
