---
title: Feature Catalog
date: 2026-02-15
---

# Feature Catalog

Comprehensive documentation of all features with flow diagrams, capabilities, and key files.

## Authentication

### Overview
Email/password authentication using Better Auth with role-based access control.

### Capabilities
- Email/password sign up and login
- User roles: `user`, `admin`
- Ban system with reason and optional expiration
- Admin impersonation for support/debugging
- Session management with device tracking

### Registration Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as SignupForm
    participant A as Better Auth
    participant DB as D1 Database

    U->>F: Fill form (name, email, password)
    F->>A: authClient.signUp.email()
    A->>DB: Create user + account
    A->>DB: Create session
    A-->>F: Set httpOnly cookie
    F-->>U: Redirect to /admin
```

### Login Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as LoginForm
    participant A as Better Auth
    participant DB as D1 Database

    U->>F: Enter credentials
    F->>A: authClient.signIn.email()
    A->>DB: Verify password
    A->>DB: Check ban status
    alt Banned
        A-->>F: Error: Account banned
    else Not Banned
        A->>DB: Create session
        A-->>F: Set cookie + redirect
    end
```

### Key Files
| File | Purpose |
|------|---------|
| `app/auth/server.ts` | Better Auth server configuration |
| `app/auth/client.ts` | Client-side auth hooks |
| `app/routes/authentication/sign-up.tsx` | Sign up page |
| `app/routes/authentication/login.tsx` | Login page |
| `app/routes/authentication/components/` | Form components |

---

## Admin Dashboard

### Overview
Protected admin area with user management, analytics, and documentation.

### Capabilities
- User listing with search/filter
- Ban/unban users with reasons
- User impersonation
- Analytics charts (area charts, stat cards)
- Documentation viewer (7 categories)

### User Management Flow

```mermaid
sequenceDiagram
    participant A as Admin
    participant L as Loader
    participant T as tRPC
    participant R as Repository
    participant DB as D1

    A->>L: GET /admin/users
    L->>L: Verify admin session
    L->>T: context.trpc.admin.getUsers()
    T->>R: userRepository.getAllUsers(db)
    R->>DB: SELECT * FROM user
    DB-->>A: Render UserDataTable
```

### Key Files
| File | Purpose |
|------|---------|
| `app/routes/admin/_layout.tsx` | Admin layout with sidebar |
| `app/routes/admin/_index.tsx` | Dashboard with analytics |
| `app/routes/admin/users.tsx` | User management page |
| `app/routes/admin/components/user-data-table.tsx` | User table |
| `app/trpc/routes/admin.ts` | Admin tRPC routes |

---

## Admin Documentation Viewer

### Overview
Markdown documentation viewer with category-based organization, Mermaid diagram support, and full-text search.

### Capabilities
- 7 categories: Architecture, Design, Meetings, Ideas, Plans, Features, Releases
- Markdown rendering with GitHub Flavored Markdown
- Syntax highlighting via Shiki
- Mermaid diagram rendering
- Table of contents with scroll tracking
- Search/filter documents within categories
- URL-based state for direct linking

### Document Viewing Flow

```mermaid
flowchart TD
    Navigate[Navigate to /admin/docs] --> Tabs[Select Category Tab]
    Tabs --> Search[Optional: Search docs]
    Search --> Select[Select document from sidebar]
    Select --> Render[Render markdown + TOC]
    Render --> Scroll[Scroll tracking highlights TOC]
```

### Key Files
| File | Purpose |
|------|---------|
| `app/routes/admin/docs.tsx` | Documentation page component |
| `app/components/markdown-renderer.tsx` | Markdown + Mermaid renderer |
| `docs/` | Static markdown files organized by category |

---

## File Upload

### Overview
File upload to Cloudflare R2 storage with validation and public URL generation.

### Capabilities
- Direct upload to R2
- File type validation
- Size limits
- Returns public URL

### Upload Flow

```mermaid
sequenceDiagram
    participant U as User
    participant C as FileUpload Component
    participant API as /api/upload-file
    participant R2 as R2 Bucket

    U->>C: Select file
    C->>C: Validate type/size
    C->>API: POST FormData
    API->>R2: bucket.put(key, file)
    R2-->>API: Success
    API-->>C: { url: "..." }
    C-->>U: Show uploaded file
```

### Key Files
| File | Purpose |
|------|---------|
| `app/components/file-upload.tsx` | Upload component |
| `app/routes/api/upload-file.ts` | Upload API route |
| `app/repositories/bucket.ts` | R2 operations |

---

## Analytics Dashboard

### Overview
Interactive charts and metrics displayed on the admin dashboard homepage.

### Capabilities
- Area charts for time series data
- Stat cards with trend indicators
- Interactive data visualization using Recharts

### Key Files
| File | Purpose |
|------|---------|
| `app/routes/admin/_index.tsx` | Dashboard page |
| `app/routes/admin/components/chart-area-interactive.tsx` | Charts |
| `app/routes/admin/components/section-cards.tsx` | Stat cards |
| `app/components/analytics/` | Reusable analytics components |

## Cross-References

- [Architecture Overview](./overview.md) — route map and feature flows
- [API Reference](./api.md) — endpoints backing these features
- [User Journeys](./user-journeys.md) — end-to-end user flows
- [Security Model](./security.md) — auth protecting these features
