---
title: Design System Overview
date: 2026-02-15
---

# Design System Overview

Comprehensive design system documentation for the CF SaaS Starter, covering the color system, typography, component library, spacing, icons, and development guidelines.

## Design Philosophy

- **ShadCN "new-york" variant** — clean, minimal aesthetic with subtle borders and refined spacing
- **OKLCH color space** — perceptually uniform colors for consistent lightness across hues
- **Accessibility-first** — contrast ratios meet WCAG standards, semantic HTML, keyboard navigation
- **Dark mode native** — full light/dark theme support via CSS custom properties
- **Radix primitives** — all interactive components built on accessible Radix UI primitives

## Color System

All colors are defined as CSS custom properties using the OKLCH color space in `app/app.css`. Never use raw hex values in components.

### Light Mode

| Variable | OKLCH Value | Usage |
|----------|-------------|-------|
| `--background` | `oklch(1 0 0)` | Page background |
| `--foreground` | `oklch(0.145 0 0)` | Primary text |
| `--card` | `oklch(1 0 0)` | Card backgrounds |
| `--card-foreground` | `oklch(0.145 0 0)` | Card text |
| `--popover` | `oklch(1 0 0)` | Popover backgrounds |
| `--popover-foreground` | `oklch(0.145 0 0)` | Popover text |
| `--primary` | `oklch(0.205 0 0)` | Primary buttons, links |
| `--primary-foreground` | `oklch(0.985 0 0)` | Text on primary |
| `--secondary` | `oklch(0.97 0 0)` | Secondary backgrounds |
| `--secondary-foreground` | `oklch(0.205 0 0)` | Text on secondary |
| `--muted` | `oklch(0.97 0 0)` | Muted backgrounds |
| `--muted-foreground` | `oklch(0.556 0 0)` | Muted/hint text |
| `--accent` | `oklch(0.97 0 0)` | Accent highlights |
| `--accent-foreground` | `oklch(0.205 0 0)` | Text on accent |
| `--destructive` | `oklch(0.577 0.245 27.325)` | Destructive actions |
| `--border` | `oklch(0.922 0 0)` | Borders |
| `--input` | `oklch(0.922 0 0)` | Input borders |
| `--ring` | `oklch(0.708 0 0)` | Focus rings |

### Chart Colors

| Variable | Light | Dark |
|----------|-------|------|
| `--chart-1` | `oklch(0.646 0.222 41.116)` | `oklch(0.488 0.243 264.376)` |
| `--chart-2` | `oklch(0.6 0.118 184.704)` | `oklch(0.696 0.17 162.48)` |
| `--chart-3` | `oklch(0.398 0.07 227.392)` | `oklch(0.769 0.188 70.08)` |
| `--chart-4` | `oklch(0.828 0.189 84.429)` | `oklch(0.627 0.265 303.9)` |
| `--chart-5` | `oklch(0.769 0.188 70.08)` | `oklch(0.645 0.246 16.439)` |

### Sidebar Colors

| Variable | Light | Dark |
|----------|-------|------|
| `--sidebar` | `oklch(0.985 0 0)` | `oklch(0.205 0 0)` |
| `--sidebar-foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` |
| `--sidebar-primary` | `oklch(0.205 0 0)` | `oklch(0.488 0.243 264.376)` |
| `--sidebar-accent` | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` |

### Dark Mode

Dark mode is activated via the `.dark` class on a parent element. All semantic color variables are reassigned:

| Variable | Dark Value |
|----------|-----------|
| `--background` | `oklch(0.145 0 0)` |
| `--foreground` | `oklch(0.985 0 0)` |
| `--card` | `oklch(0.205 0 0)` |
| `--primary` | `oklch(0.922 0 0)` |
| `--secondary` | `oklch(0.269 0 0)` |
| `--muted` | `oklch(0.269 0 0)` |
| `--muted-foreground` | `oklch(0.708 0 0)` |
| `--destructive` | `oklch(0.704 0.191 22.216)` |
| `--border` | `oklch(1 0 0 / 10%)` |
| `--input` | `oklch(1 0 0 / 15%)` |

### Color Usage Rules

1. **Never use raw hex values** — always reference CSS variables
2. **Use `cn()` for conditional classes** — handles Tailwind merge correctly
3. **Add custom colors to `app/app.css`** following ShadCN naming conventions
4. **Fallback to Tailwind built-in color names** if a CSS variable isn't appropriate

## Typography

### Font Family
```css
--font-sans: "Inter", ui-sans-serif, system-ui, sans-serif,
  "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
```

### Type Scale

| Element | Class | Size |
|---------|-------|------|
| Page title | `text-3xl font-bold tracking-tight` | 30px |
| Section heading | `text-2xl font-semibold tracking-tight` | 24px |
| Card title | `text-lg font-semibold` | 18px |
| Body text | `text-sm` | 14px |
| Small/caption | `text-xs` | 12px |
| Muted text | `text-sm text-muted-foreground` | 14px |
| Uppercase label | `text-xs font-semibold uppercase tracking-wider` | 12px |

## Component Library

55 ShadCN components organized by category. All live in `app/components/ui/`.

### Layout & Navigation
| Component | File | Description |
|-----------|------|-------------|
| Sidebar | `sidebar.tsx` | Collapsible sidebar navigation |
| Tabs | `tabs.tsx` | Tab-based content switching |
| Breadcrumb | `breadcrumb.tsx` | Hierarchical navigation |
| Navigation Menu | `navigation-menu.tsx` | Top-level navigation |
| Pagination | `pagination.tsx` | Page navigation |
| Separator | `separator.tsx` | Visual divider |
| Scroll Area | `scroll-area.tsx` | Custom scrollbar container |
| Resizable | `resizable.tsx` | Resizable panels |

### Forms & Input
| Component | File | Description |
|-----------|------|-------------|
| Button | `button.tsx` | Primary action trigger |
| Input | `input.tsx` | Text input field |
| Textarea | `textarea.tsx` | Multi-line text input |
| Select | `select.tsx` | Dropdown selection |
| Native Select | `native-select.tsx` | Native HTML select |
| Checkbox | `checkbox.tsx` | Boolean toggle |
| Radio Group | `radio-group.tsx` | Single selection from options |
| Switch | `switch.tsx` | Toggle switch |
| Slider | `slider.tsx` | Range slider |
| Calendar | `calendar.tsx` | Date picker calendar |
| Input OTP | `input-otp.tsx` | One-time password input |
| Combobox | `combobox.tsx` | Searchable select |
| Form | `form.tsx` | Form wrapper with validation |
| Field | `field.tsx` | Form field with label/error |
| Label | `label.tsx` | Input label |
| Input Group | `input-group.tsx` | Grouped inputs |
| Button Group | `button-group.tsx` | Grouped buttons |

### Data Display
| Component | File | Description |
|-----------|------|-------------|
| Table | `table.tsx` | Data table |
| Card | `card.tsx` | Content container |
| Badge | `badge.tsx` | Status indicator |
| Avatar | `avatar.tsx` | User avatar |
| Progress | `progress.tsx` | Progress bar |
| Chart | `chart.tsx` | Data visualization |
| Skeleton | `skeleton.tsx` | Loading placeholder |
| Empty | `empty.tsx` | Empty state display |
| Item | `item.tsx` | List item |
| Kbd | `kbd.tsx` | Keyboard shortcut display |
| Aspect Ratio | `aspect-ratio.tsx` | Fixed aspect ratio container |
| Carousel | `carousel.tsx` | Sliding content carousel |

### Overlay & Feedback
| Component | File | Description |
|-----------|------|-------------|
| Dialog | `dialog.tsx` | Modal dialog |
| Alert Dialog | `alert-dialog.tsx` | Confirmation dialog |
| Sheet | `sheet.tsx` | Slide-out panel |
| Drawer | `drawer.tsx` | Bottom/side drawer |
| Popover | `popover.tsx` | Floating content |
| Tooltip | `tooltip.tsx` | Hover information |
| Hover Card | `hover-card.tsx` | Rich hover content |
| Dropdown Menu | `dropdown-menu.tsx` | Action menu |
| Context Menu | `context-menu.tsx` | Right-click menu |
| Menubar | `menubar.tsx` | Menu bar |
| Command | `command.tsx` | Command palette |
| Sonner | `sonner.tsx` | Toast notifications |
| Alert | `alert.tsx` | Inline alert messages |

### Utility
| Component | File | Description |
|-----------|------|-------------|
| Toggle | `toggle.tsx` | Toggle button |
| Toggle Group | `toggle-group.tsx` | Grouped toggle buttons |
| Accordion | `accordion.tsx` | Expandable sections |
| Collapsible | `collapsible.tsx` | Expandable container |
| Spinner | `spinner.tsx` | Loading spinner |

### Adding New Components
```bash
bunx shadcn@latest add [component-name]
```

## Spacing & Layout

### Border Radius System

| Variable | Value |
|----------|-------|
| `--radius` | `0.625rem` (10px) |
| `--radius-sm` | `calc(var(--radius) - 4px)` (6px) |
| `--radius-md` | `calc(var(--radius) - 2px)` (8px) |
| `--radius-lg` | `var(--radius)` (10px) |
| `--radius-xl` | `calc(var(--radius) + 4px)` (14px) |

### Common Spacing Patterns

| Pattern | Classes | Usage |
|---------|---------|-------|
| Page padding | `p-4 lg:p-6` | Main content area |
| Card padding | `p-6` | Card content |
| Section gap | `gap-4` or `space-y-4` | Between sections |
| Inline gap | `gap-2` | Between inline elements |
| Small gap | `gap-1.5` | Between icon + text |

## Icons

### Primary: Tabler Icons
```typescript
import { IconName } from "@tabler/icons-react";
<IconName className="size-4" />  // 16px
<IconName className="size-5" />  // 20px
```

### Secondary: Lucide React
```typescript
import { IconName } from "lucide-react";
<IconName className="size-4" />
```

Use Tabler Icons as the primary icon set. Fall back to Lucide only when Tabler doesn't have the needed icon.

## Development Guidelines

### Class Names
Always use `cn()` from `@/lib/utils` for conditional classes:
```typescript
import { cn } from "@/lib/utils";

<div className={cn(
  "base-classes",
  condition && "conditional-class",
  variant === "active" && "active-class"
)} />
```

### Form Pattern
Always use ShadCN Form + React Hook Form + Zod:
```typescript
const form = useForm<z.infer<typeof schema>>({
  resolver: zodResolver(schema),
  defaultValues: { ... },
});

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField control={form.control} name="fieldName" render={...} />
  </form>
</Form>
```

### Cache Invalidation
After mutations, always invalidate relevant queries:
```typescript
const utils = api.useUtils();
const mutation = api.route.mutation.useMutation({
  onSuccess: () => {
    utils.route.listQuery.invalidate();
  },
});
```

### Responsive Design
- Mobile-first approach with Tailwind breakpoints
- Use `hidden sm:inline` for responsive text
- Use `lg:block` for desktop-only sidebars
- Test at 320px, 768px, and 1024px+ breakpoints

## Kitchen Sink

All components are showcased at `/admin/kitchen-sink` for reference and visual testing.

## Cross-References

- [Architecture Overview](../architecture/overview.md) — system context and route map
- [Feature Catalog](../architecture/features.md) — features using this design system
- **CSS source**: `app/app.css`
- **Components**: `app/components/ui/`
