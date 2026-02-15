---
title: Architecture Overview
date: 2026-02-15
---

# Architecture Overview

Master architecture document for the CF SaaS Starter — a full-stack SaaS boilerplate built on Cloudflare Workers, React Router v7, tRPC, D1/Drizzle, Better Auth, and ShadCN/Tailwind.

## Product Mindmap

```mermaid
mindmap
  root((CF SaaS Starter))
    Authentication
      Email/Password Sign Up
      Login / Logout
      Session Management
      Role-Based Access
      Ban System
      Admin Impersonation
    Admin Dashboard
      User Management
      Analytics Charts
      Documentation Viewer
      Kitchen Sink
    API Layer
      tRPC Routes
      Auth Endpoints
      File Upload
    Storage
      D1 Database
      R2 File Storage
    Integrations
      Stripe Payments
      PostHog Analytics
      Resend Email
```

## Route Map

```mermaid
flowchart TD
    Root["/"] --> Home["/home"]
    Root --> Login["/login"]
    Root --> SignUp["/sign-up"]
    Root --> Admin["/admin/*"]
    Root --> API["/api/*"]

    Admin --> Dashboard["/admin/ (Dashboard)"]
    Admin --> Users["/admin/users"]
    Admin --> Docs["/admin/docs/:category?/:doc?"]
    Admin --> KitchenSink["/admin/kitchen-sink"]

    API --> TRPC["/api/trpc/*"]
    API --> Auth["/api/auth/*"]
    API --> Upload["/api/upload-file"]

    style Admin fill:#f0f9ff,stroke:#0ea5e9
    style API fill:#f0fdf4,stroke:#22c55e
```

## Information Architecture

| Route | File | Auth | Purpose |
|-------|------|------|---------|
| `/` | `routes/home.tsx` | Public | Landing page |
| `/login` | `routes/authentication/login.tsx` | Public | Login form |
| `/sign-up` | `routes/authentication/sign-up.tsx` | Public | Registration form |
| `/admin/` | `routes/admin/_index.tsx` | Admin | Dashboard with analytics |
| `/admin/users` | `routes/admin/users.tsx` | Admin | User management table |
| `/admin/docs/:category?/:doc?` | `routes/admin/docs.tsx` | Admin | Documentation viewer |
| `/admin/kitchen-sink` | `routes/admin/kitchen-sink.tsx` | Admin | Component showcase |
| `/api/trpc/*` | `routes/api/trpc.$.ts` | Varies | tRPC API handler |
| `/api/auth/*` | `routes/api/auth.$.ts` | Public | Better Auth handler |
| `/api/upload-file` | `routes/api/upload-file.ts` | Protected | R2 file upload |

## System Architecture

```mermaid
flowchart TB
    subgraph Client["Client (Browser)"]
        RR[React Router Components]
        TC[tRPC Client Hooks]
        AC[Better Auth Client]
    end

    subgraph Edge["Cloudflare Workers (Edge)"]
        RL[React Router Loaders]
        TR[tRPC Router]
        AH[Better Auth Handler]
        RP[Repositories]
    end

    subgraph Services["Cloudflare Services"]
        D1[(D1 Database)]
        R2[(R2 Storage)]
        KV[(Workers KV)]
    end

    RR --> RL
    TC --> TR
    AC --> AH
    RL --> RP
    TR --> RP
    AH --> D1
    RP --> D1
    RP --> R2
    AH --> KV
```

## Data Flow

### Server-Side Rendering
```
Route Loader → context.trpc.routeName.method() → Repository → D1 → Response via useLoaderData()
```

### Client-Side Fetching
```
Component → api.routeName.useQuery() → /api/trpc/* → tRPC Router → Repository → D1
```

### Mutations
```
Component → api.routeName.useMutation() → /api/trpc/* → tRPC Router → Repository → D1
                                                                                    ↓
                                                              onSuccess → invalidate queries
```

## Data Relationships

```mermaid
erDiagram
    USER ||--o{ SESSION : has
    USER ||--o{ ACCOUNT : has
    USER ||--o{ VERIFICATION : "verified by"

    USER {
        text id PK
        text name
        text email UK
        text role "user | admin"
        integer banned
        text banReason
        integer banExpires
        text image
        integer createdAt
        integer updatedAt
    }

    SESSION {
        text id PK
        text userId FK
        text token UK
        text ipAddress
        text userAgent
        text impersonatedBy FK
        integer expiresAt
        integer createdAt
        integer updatedAt
    }

    ACCOUNT {
        text id PK
        text userId FK
        text accountId
        text providerId
        text accessToken
        text refreshToken
        integer createdAt
        integer updatedAt
    }

    VERIFICATION {
        text id PK
        text identifier
        text value
        integer expiresAt
        integer createdAt
        integer updatedAt
    }
```

## Feature Flows

### Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant C as Client
    participant A as Better Auth
    participant DB as D1 Database

    U->>C: Submit credentials
    C->>A: POST /api/auth/sign-in/email
    A->>DB: Verify credentials
    DB-->>A: User record
    A->>DB: Create session
    A-->>C: Set httpOnly cookie
    C-->>U: Redirect to /admin
```

### Admin User Management

```mermaid
sequenceDiagram
    participant A as Admin
    participant L as Loader
    participant T as tRPC
    participant R as Repository
    participant DB as D1

    A->>L: Navigate to /admin/users
    L->>T: context.trpc.admin.getUsers()
    T->>R: userRepository.getAllUsers(db)
    R->>DB: SELECT * FROM user
    DB-->>A: Render user table
```

## Key Files Reference

| Layer | File | Purpose |
|-------|------|---------|
| Entry | `workers/app.ts` | Worker entry, context creation |
| Routes | `app/routes.ts` | Route definitions |
| tRPC | `app/trpc/router.ts` | Combined tRPC router |
| tRPC Context | `app/trpc/index.ts` | Context, middleware, procedures |
| DB Schema | `app/db/schema.ts` | Drizzle table definitions |
| Auth Server | `app/auth/server.ts` | Better Auth configuration |
| Auth Client | `app/auth/client.ts` | Client-side auth hooks |

## Cross-References

- **System details**: [System Architecture](./system.md)
- **API reference**: [API Documentation](./api.md)
- **Data models**: [Data Models](./data-models.md)
- **Features**: [Feature Catalog](./features.md)
- **Integrations**: [Third-Party Integrations](./integrations.md)
- **Security**: [Security Model](./security.md)
- **User flows**: [User Journeys](./user-journeys.md)
- **Design system**: [Design System Overview](../design/design-system-overview.md)

## Changelog

### 2026-02-15 - Documentation System Overhaul
- Added: Architecture documentation at `docs/architecture/`
- Added: Design system documentation at `docs/design/`
- Added: Architecture and Design tabs to admin docs viewer
- Changed: Default docs tab from "features" to "architecture"

### 2026-01-24 - Initial Setup
- Added: Admin documentation viewer with 5 categories
- Added: Markdown rendering with Mermaid diagram support
- Added: Authentication system with Better Auth
- Added: Admin dashboard with user management
