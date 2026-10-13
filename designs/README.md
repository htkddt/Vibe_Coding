# Design handoff — 179FC Member Management Portal

## Purpose and scope

This directory stores design references and frontend handoff documentation. This proposal is based on the four available images; it is not the final product specification.

| Image | Proposed route | Purpose |
| --- | --- | --- |
| `Sign-in.png` | `/sign-in` | Authenticate users before entering the workspace. |
| `Dashboard.png` | `/dashboard` | Summarize members, team activity, and upcoming events. |
| `Employees.png` | `/employees` | Search, browse, and begin adding members. |
| `Organization.png` | `/organization` | View the organization's reporting structure. |

The sidebar also shows `Posts`, `Settings`, and `Help Center`, but no detailed design is available for them. In the first implementation phase, these routes should only have a shell/placeholder page or remain behind a feature flag; their detailed UI should not be inferred.

## UI and component overview

### Shared authenticated shell

`AppShell` wraps all private pages and owns the desktop layout: a fixed sidebar, page header, and content area. Dashboard, Employees, and Organization all share this shell.

| Component | Responsibility | Used by |
| --- | --- | --- |
| `AppShell` | Composes `Sidebar`, `TopBar`, page content, and the assistant launcher; handles shared responsive/layout behavior. | Every private page |
| `Sidebar` | Brand/logo, `NavItem`s, bottom user summary, and the active navigation state derived from the URL. | `AppShell` |
| `TopBar` | Page title, date/context subtitle, and avatar-based `UserMenu`. | `AppShell` |
| `PageHeader` | Standardizes titles, subtitles, and page actions. | Private pages |
| `Avatar` | Renders an image or colored-initials fallback. | Header, cards, organization nodes |
| `AssistantLauncher` | The “Ask 179 Assist” button and circular assistant trigger. Conversation content is not yet designed, so it remains separate from the shell. | `AppShell` |
| `EmptyState`, `LoadingState`, `ErrorState` | States absent from the mockups but required for API integration. | Per feature |

### Sign-in

`SignInPage` sits outside `AppShell` and uses `AuthSplitLayout`: a brand/message area on the left and a form on the right. The form includes a `TextField` (email), `PasswordField`, “forgot password” `TextLink`, submit `Button`, and an administrator-contact help message. It should use a real `<form>`, labels bound to inputs, and field-level error messages.

### Dashboard

| Component | Content represented in the design |
| --- | --- |
| `StatCard` | “Active members”, “Posts this week”, and “Teams” values; receives the tone/color and value via props. |
| `StatsGrid` | Responsive grid containing `StatCard`s. |
| `TeamFeed` / `PostCard` | Author avatar, team, timestamp, content, tag, and action/statistics area (like/comment). |
| `UpcomingPanel` / `UpcomingEventItem` | Event list with a date badge, title, and time/location metadata. |

### Employees

`EmployeesPage` includes `MemberSearch` (search by name or role), `AddMemberButton`, and `EmployeeGrid`. Each `EmployeeCard` contains an avatar, team, name, role, and “View profile” link. A card/link click should navigate to the placeholder route `/employees/:memberId`; do not implement the profile UI until a design is available.

### Organization

`OrganizationPage` displays a short description and `OrganizationChart`. The chart receives an `OrganizationMember` tree instead of hard-coded coordinates from the image. `OrganizationNode` renders the avatar and name; `OrgConnector` only renders the connecting lines. On smaller screens, the chart should become an indented tree/list or horizontally scrollable region rather than being forced into the viewport.

## Minimal design system

The designs indicate a light system with thin borders and very pale pink cards, contrasted with a burgundy sidebar and red/orange/green accent colors. Before building individual pages, define CSS tokens so every component uses the same values:

```css
/* Example token names — fine-tune with DevTools or the source Figma file when available */
:root {
  --color-surface: #ffffff;
  --color-surface-subtle: #fff1f3;
  --color-sidebar: #7d2939;
  --color-primary: #db1e38;
  --color-text: #1f2430;
  --color-text-muted: #647087;
  --color-border: #e4e8ef;
  --shadow-card: 0 8px 18px rgb(31 36 48 / 0.10);
  --radius-sm: 8px;
  --radius-md: 12px;
}
```

Add spacing, font-size, font-weight, and breakpoint tokens as well. Do not scatter colors, shadows, or magic numbers throughout features. The images are desktop references, so responsive behavior should be confirmed in review: use a collapsed/drawer sidebar on mobile, make grids single-column, and allow header actions to wrap.

## Proposed `frontend/src` structure

The frontend currently uses React with JavaScript and JSX. The feature-based structure below keeps logic, APIs, and components close together; only genuinely shared parts belong in `components/`. It can be introduced incrementally—do not create empty files just to mirror the tree.

```text
frontend/src/
├── app/
│   ├── App.jsx                    # Declares application routes and providers
│   ├── router.jsx                 # Public/private routes and 404 fallback
│   └── routes.js                  # URL constants; avoids hard-coded paths
├── assets/
│   ├── brand/                     # Approved logo/wordmark assets
│   └── icons/                     # Local SVGs (if no icon library is used)
├── components/
│   ├── layout/
│   │   ├── AppShell.jsx
│   │   ├── Sidebar.jsx
│   │   └── TopBar.jsx
│   ├── ui/
│   │   ├── Avatar.jsx
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── TextField.jsx
│   │   ├── PageHeader.jsx
│   │   └── states/                # LoadingState, EmptyState, ErrorState
│   └── assistant/
│       └── AssistantLauncher.jsx
├── features/
│   ├── auth/
│   │   ├── api/authApi.js
│   │   ├── components/SignInForm.jsx
│   │   ├── pages/SignInPage.jsx
│   │   └── authStore.js           # Context/reducer initially; replace when needed
│   ├── dashboard/
│   │   ├── api/dashboardApi.js
│   │   ├── components/StatCard.jsx
│   │   ├── components/TeamFeed.jsx
│   │   ├── components/PostCard.jsx
│   │   ├── components/UpcomingPanel.jsx
│   │   └── pages/DashboardPage.jsx
│   ├── employees/
│   │   ├── api/membersApi.js
│   │   ├── components/MemberSearch.jsx
│   │   ├── components/EmployeeCard.jsx
│   │   ├── components/EmployeeGrid.jsx
│   │   ├── pages/EmployeesPage.jsx
│   │   └── pages/EmployeeProfilePage.jsx # Route is ready; UI awaits a design
│   └── organization/
│       ├── api/organizationApi.js
│       ├── components/OrganizationChart.jsx
│       ├── components/OrganizationNode.jsx
│       └── pages/OrganizationPage.jsx
├── hooks/
│   └── useMediaQuery.js           # Widely used hook, not owned by a feature
├── lib/
│   ├── httpClient.js              # Base URL, auth headers, normalized errors
│   ├── formatters.js              # Pure date/name formatting
│   └── constants.js
├── mocks/
│   ├── dashboard.js               # Data matching the designs while API is unavailable
│   ├── members.js
│   └── organization.js
├── styles/
│   ├── tokens.css                 # Colors, type, spacing, radii, shadows
│   ├── globals.css                # Reset, body, focus styles
│   └── utilities.css              # Only genuinely necessary utilities
├── main.jsx                       # React bootstrap; imports globals.css
└── App.jsx                        # Temporary re-export during migration
```

After migration, the root `App.jsx` can move fully into `app/`, with the import in `main.jsx` updated accordingly. If the project does not need a compatibility file, this can happen in the initial frontend setup PR.

## Data and behavior boundaries

- A page coordinates data, loading/error states, and layout; cards, forms, and charts handle rendering and callbacks. UI components must not call `fetch` directly.
- `api/*.js` modules use the shared `lib/httpClient.js`; endpoints, response shapes, and auth tokens are isolated so mock data can be replaced easily.
- Before the backend is connected, pages import from `mocks/` through the API adapter, allowing the implementation to swap to HTTP without changing the component tree.
- The auth guard redirects unauthenticated users to `/sign-in`; `authStore` retains the current user and session. Confirm the admin permission model with the backend before restricting “Add member” or administration routes.
- Keep labels/content in constants or data models instead of duplicating strings across components; this also keeps the door open for i18n if needed.

## Suggested implementation order

1. Establish tokens, reset/global styles, UI primitives, and `AppShell`.
2. Add routing plus `SignInPage`/auth guard with a mock session; install `react-router-dom` at this point.
3. Implement Dashboard with mock data to establish the visual language and responsive behavior.
4. Implement Employees (client-side search against mock data, card/grid, and empty state), then connect the member API when its backend contract is ready.
5. Implement the Organization Chart from tree data, then handle mobile overflow/list behavior.
6. Integrate the assistant, Posts, Settings, Help Center, and profile UI after receiving their respective designs or product specifications.

## Asset conventions and documentation updates

- Use English, lowercase kebab-case names for new assets; use SVG for icons and vectors, and optimized PNG/WebP for raster assets.
- Do not store credentials, real member data, or unlicensed assets.
- When a design changes, record its Figma/source link, export date, and any route/component impact here. Also update `frontend/README.md` when the architecture, dependency set, routes, or data flow changes.
