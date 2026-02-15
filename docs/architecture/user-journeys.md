---
title: User Journeys
date: 2026-02-15
---

# User Journeys

End-to-end user flows, admin journeys, and error states with visual diagrams.

## Authentication Flows

### Sign Up (New User)

```mermaid
flowchart LR
    Visit[Visit /sign-up] --> Fill[Fill Form]
    Fill --> Submit[Submit]
    Submit --> Create[Create User + Account]
    Create --> Session[Create Session]
    Session --> Redirect[Redirect to /admin]
```

**Key files:** `app/routes/authentication/sign-up.tsx`, `app/auth/server.ts`

### Login (Existing User)

```mermaid
flowchart LR
    Visit[Visit /login] --> Fill[Enter Credentials]
    Fill --> Submit[Submit]
    Submit --> Verify[Verify Password]
    Verify --> BanCheck{Banned?}
    BanCheck --> |No| Session[Create Session]
    BanCheck --> |Yes| ShowBan[Show Ban Reason]
    Session --> Redirect[Redirect to /admin]
```

**Key files:** `app/routes/authentication/login.tsx`

### Logout

```mermaid
flowchart LR
    Click[Click Logout] --> SignOut[authClient.signOut]
    SignOut --> Delete[Delete Session]
    Delete --> Redirect[Redirect to /login]
```

## Admin Journeys

### User Management

```mermaid
flowchart TD
    Admin[Admin navigates to /admin/users] --> Load[Loader fetches users]
    Load --> Table[View User Table]
    Table --> Ban[Ban User]
    Table --> Unban[Unban User]
    Table --> Impersonate[Impersonate User]

    Ban --> SetReason[Set ban reason + expiration]
    SetReason --> Save[Save to database]
    Save --> Refresh[Refresh table]

    Impersonate --> NewSession[Create impersonation session]
    NewSession --> ViewAs[View app as user]
```

**Key files:** `app/routes/admin/users.tsx`, `app/trpc/routes/admin.ts`

### Documentation Viewing

```mermaid
flowchart TD
    Admin[Navigate to /admin/docs] --> SelectCat[Select Category Tab]
    SelectCat --> Search[Optional: Search within category]
    Search --> SelectDoc[Select Document]
    SelectDoc --> View[View Markdown Content]
    View --> TOC[Navigate via Table of Contents]
    TOC --> Scroll[Auto-highlight active heading]
```

**Key files:** `app/routes/admin/docs.tsx`

### Dashboard Overview

```mermaid
flowchart TD
    Admin[Navigate to /admin] --> Load[Load analytics data]
    Load --> Cards[View Stat Cards]
    Load --> Charts[View Area Charts]
    Charts --> Interact[Hover for details]
    Cards --> Trend[See trend indicators]
```

**Key files:** `app/routes/admin/_index.tsx`

## File Upload Journey

```mermaid
sequenceDiagram
    participant U as User
    participant C as FileUpload Component
    participant V as Validation
    participant API as Upload API
    participant R2 as R2 Bucket

    U->>C: Select file
    C->>V: Validate type & size
    alt Invalid
        V-->>U: Show error message
    else Valid
        V->>API: POST /api/upload-file
        API->>R2: bucket.put(key, file)
        R2-->>API: Success
        API-->>C: { url: "..." }
        C-->>U: Show uploaded file preview
    end
```

**Key files:** `app/components/file-upload.tsx`, `app/routes/api/upload-file.ts`

## Role-Based Access

```mermaid
flowchart TD
    AllUsers[All Users] --> Public[Public Routes]
    AllUsers --> Protected[Protected Routes]
    AllUsers --> Admin[Admin Routes]

    Public --> Login["/login"]
    Public --> SignUp["/sign-up"]
    Public --> Home["/"]

    Protected --> |Requires session| ProtectedContent[Protected Content]

    Admin --> |Requires admin role| Dashboard["/admin"]
    Admin --> Users["/admin/users"]
    Admin --> Docs["/admin/docs"]
    Admin --> KitchenSink["/admin/kitchen-sink"]
```

## Error States

### Banned User Login Attempt

```mermaid
flowchart LR
    Login[Login attempt] --> Check[Check ban status]
    Check --> ShowReason[Show ban reason]
    ShowReason --> ShowExpiry[Show expiration if set]
    ShowExpiry --> Block[Block access]
```

### Session Expired

```mermaid
flowchart LR
    Request[API request] --> Check[Validate session]
    Check --> Invalid[Session invalid/expired]
    Invalid --> Redirect[Redirect to /login]
    Redirect --> Message["Session expired" toast]
```

### Unauthorized Admin Access

```mermaid
flowchart LR
    Navigate[Navigate to /admin/*] --> Check[Check role]
    Check --> NotAdmin[role !== 'admin']
    NotAdmin --> Redirect[Redirect to /]
```

## Cross-References

- [Authentication feature](./features.md#authentication) — detailed auth capabilities
- [Security Model](./security.md) — authorization layers protecting these journeys
- [Architecture Overview](./overview.md) — route map showing all paths
