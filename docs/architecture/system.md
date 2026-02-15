---
title: System Architecture
date: 2026-02-15
---

# System Architecture

Detailed system architecture for the CF SaaS Starter, covering the tech stack layers, data flow patterns, and component responsibilities.

## Technology Stack

```mermaid
flowchart LR
    subgraph Frontend
        React[React 19]
        RR[React Router v7]
        TW[Tailwind CSS v4]
        SH[ShadCN UI]
    end

    subgraph API
        tRPC[tRPC v11]
        Zod[Zod v4]
        BA[Better Auth]
    end

    subgraph Backend
        CF[Cloudflare Workers]
        D1[(D1 / SQLite)]
        R2[(R2 Storage)]
        KV[(Workers KV)]
    end

    Frontend --> API --> Backend
```

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client (Browser)                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │ React Router│  │ tRPC Client │  │ Better Auth Client      │ │
│  │ Components  │  │ Hooks       │  │ (useSession, signIn)    │ │
│  └──────┬──────┘  └──────┬──────┘  └───────────┬─────────────┘ │
└─────────┼────────────────┼─────────────────────┼───────────────┘
          │                │                     │
          ▼                ▼                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Cloudflare Workers (Edge)                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │ React Router│  │ tRPC Router │  │ Better Auth Handler     │ │
│  │ Loaders     │  │ /api/trpc/* │  │ /api/auth/*             │ │
│  └──────┬──────┘  └──────┬──────┘  └───────────┬─────────────┘ │
│         │                │                     │                │
│         └────────────────┼─────────────────────┘                │
│                          ▼                                      │
│                 ┌─────────────────┐                             │
│                 │  Repositories   │                             │
│                 │  (Data Access)  │                             │
│                 └────────┬────────┘                             │
└──────────────────────────┼──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Cloudflare Services                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │ D1 Database │  │ R2 Storage  │  │ Workers KV (sessions)   │ │
│  │ (SQLite)    │  │ (Files)     │  │                         │ │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow Patterns

### Server-Side Rendering (Loaders)

```mermaid
sequenceDiagram
    participant B as Browser
    participant L as Route Loader
    participant T as tRPC Caller
    participant R as Repository
    participant DB as D1

    B->>L: HTTP Request
    L->>L: Check session
    L->>T: context.trpc.route.method()
    T->>R: repository.getData(db, input)
    R->>DB: SQL Query
    DB-->>R: Result
    R-->>T: Typed data
    T-->>L: Data
    L-->>B: SSR HTML + loaderData
```

**Key point**: Server-side tRPC calls via `context.trpc.*` have **no HTTP roundtrip** — they call procedures directly.

### Client-Side Data Fetching

```mermaid
sequenceDiagram
    participant C as Component
    participant RQ as React Query
    participant H as HTTP
    participant T as tRPC Router
    participant R as Repository
    participant DB as D1

    C->>RQ: api.route.useQuery()
    RQ->>H: GET /api/trpc/route.method
    H->>T: tRPC Handler
    T->>R: repository.getData(db, input)
    R->>DB: SQL Query
    DB-->>C: Data via React Query cache
```

### Mutations with Cache Invalidation

```mermaid
sequenceDiagram
    participant C as Component
    participant M as useMutation
    participant T as tRPC Router
    participant R as Repository
    participant DB as D1
    participant Q as useQuery

    C->>M: mutate(input)
    M->>T: POST /api/trpc/route.mutation
    T->>R: repository.create(db, input)
    R->>DB: INSERT
    DB-->>M: Success
    M->>Q: invalidate queries
    Q->>T: Refetch data
    T-->>C: Updated UI
```

## Layer Responsibilities

### Routes (`app/routes/`)
- Page components and layouts
- Server loaders for SSR data fetching
- Session checks and redirects
- Client-side interactivity and navigation
- Form handling

### tRPC Routes (`app/trpc/routes/`)
- Input validation using Zod schemas
- Authorization via procedure types (`publicProcedure`, `protectedProcedure`, `adminProcedure`)
- Orchestrate repository calls
- Transform data for client consumption

### Repositories (`app/repositories/`)
- Pure database operations
- No auth/context awareness — always receive `db: Database` as first param
- Throw typed errors (`NotFoundError`, `CreationError`, etc.)
- Single responsibility per function

### Models (`app/models/`)
- Zod schemas for validation
- TypeScript type definitions
- Custom error classes (`app/models/errors/`)

## Key Files

| Layer | Location | Purpose |
|-------|----------|---------|
| Entry | `workers/app.ts` | Cloudflare Worker entry, context creation |
| Routes | `app/routes.ts` | All route definitions (flat, not filesystem) |
| tRPC | `app/trpc/router.ts` | Combined tRPC router |
| tRPC Context | `app/trpc/index.ts` | Context creation, middleware, procedures |
| tRPC Routes | `app/trpc/routes/` | Individual sub-routers |
| tRPC Client | `app/trpc/client.tsx` | Client-side React Query provider |
| DB Schema | `app/db/schema.ts` | Drizzle table definitions |
| Auth Server | `app/auth/server.ts` | Better Auth server config |
| Auth Client | `app/auth/client.ts` | Better Auth React client |

## Runtime: Cloudflare Workers

This project runs on Cloudflare Workers, **not Node.js**. Key differences:

- **No `process.env`** — access environment through Cloudflare bindings
- **In loaders/actions**: `context.cloudflare.env.BINDING_NAME`
- **In tRPC routes**: `ctx.db` (pre-built), `ctx.cfContext.BINDING_NAME`
- **Available bindings**: `DATABASE` (D1), `BUCKET` (R2), `AI`, `BETTER_AUTH_SECRET`, `EXAMPLE_WORKFLOW`
- **Configuration**: `wrangler.jsonc` and `worker-configuration.d.ts`

## Cross-References

- [Architecture Overview](./overview.md) — master doc with route map and changelog
- [API Documentation](./api.md) — tRPC routes and auth endpoints
- [Data Models](./data-models.md) — database schema and conventions
