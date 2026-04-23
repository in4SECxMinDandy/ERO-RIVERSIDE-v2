# ERO Riverside - Real Estate Platform

## Overview

A Vietnamese real estate marketing and sales platform for "Khu Đô Thị Nam Từ Sơn" (ERO Riverside) in Bắc Ninh. Features a public-facing site for property browsing and an admin dashboard for management.

## Architecture

- **Frontend:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4 + Shadcn UI (Radix UI primitives)
- **Routing:** Wouter
- **Data Fetching:** TanStack Query (React Query)
- **Animation:** Framer Motion
- **Forms:** React Hook Form + Zod

## Project Structure

```
src/
  components/
    layout/       - AdminLayout, PublicLayout
    ui/           - Shadcn UI components
  pages/
    admin/        - Dashboard, Products, Categories, Media, Registrations, Users, Logs, Login
    user/         - Home, Products, ProductDetail, Gallery, Map, About, Register
  lib/
    api-client-stub/  - Local stub for @workspace/api-client-react (API hooks)
    utils.ts      - Tailwind utility
  hooks/          - Custom React hooks
```

## Key Notes

- The original project was part of a monorepo using pnpm workspaces with a `catalog:` dependency pattern and a separate `@workspace/api-client-react` package
- A local stub (`src/lib/api-client-stub/index.ts`) was created to replace the workspace package - it provides TanStack Query hooks that call `/api/*` endpoints
- The stub makes real API calls; a backend is needed for full functionality
- Vite config uses alias to map `@workspace/api-client-react` to the local stub

## Running the App

```bash
npm run dev   # starts on port 5000
npm run build # builds to dist/
```

## Deployment

Configured as a static site deployment:
- Build: `npm run build`
- Public dir: `dist/`
