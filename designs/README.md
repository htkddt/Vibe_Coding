# Design handoff — 179FC Member Management Portal

## Purpose and scope

This directory stores design references and frontend handoff documentation. The reference images cover the primary desktop states currently available. They define the visual and interaction contract described here; APIs, permissions, and copy that are not visible in a reference still require product/backend confirmation.

| Image | Route or state | Purpose |
| --- | --- | --- |
| [`Sign-in.png`](Sign-in.png) | `/sign-in` | Authenticate users before entering the workspace. |
| [`Dashboard.png`](Dashboard.png) | `/dashboard` | Summarize members, team activity, and upcoming events. |
| [`Employees.png`](Employees.png) | `/employees` | Search, browse, and begin adding members. |
| [`Organization.png`](Organization.png) | `/organization` | View the organization's reporting structure. |
| [`Post_All.png`](Post_All.png) | `/posts?tab=all` | List all posts, regardless of status. |
| [`Post_Published.png`](Post_Published.png) | `/posts?tab=published` | List published posts only. |
| [`Post_Drafts.png`](Post_Drafts.png) | `/posts?tab=drafts` | List drafts only and expose their edit action. |
| [`Post_Details.png`](Post_Details.png) | `/posts/:postId` | View a post, its status, actions, performance, and recent activity. |
| [`Post_Creations.png`](Post_Creations.png) | `/posts/new` | Create an update, add media, configure visibility, and save, publish, or schedule it. |
| [`Post_Editor.png`](Post_Editor.png) | `/posts/:postId/edit` | Edit a draft with draft settings, auto-save feedback, a checklist, and publishing actions. |
| [`Settings_General.png`](Settings_General.png) | `/settings?tab=general` | Edit workspace and display preferences. |
| [`Settings_Notifications.png`](Settings_Notifications.png) | `/settings?tab=notifications` | Edit notification preferences. |
| [`Settings_Security.png`](Settings_Security.png) | `/settings?tab=security` | Manage password, 2FA, and active sessions. |
| [`Help.png`](Help.png) | `/help` | Find guides, common articles, and support. |
| [`Assist.png`](Assist.png) | N/A (assistant panel state) | Expanded state of the shared 179 Assist panel. |

`Posts`, `Settings`, and `Help` now have detailed desktop references. The separate files for each tab are states of one page, not separate sidebar destinations. The active tab must be represented in the URL so that refresh, browser navigation, and a copied link restore the same view.

The three post workflow references above are separate screens reached from the posts list or details page. The current exports do not include a source Figma link or export date; record those when they become available. The images are desktop references, while responsive layouts are implemented in the frontend.

## UI and component overview

### Shared authenticated shell

`AppShell` wraps all private pages and owns the desktop layout: a fixed sidebar, page header, and content area. Dashboard, Employees, and Organization all share this shell.

| Component | Responsibility | Used by |
| --- | --- | --- |
| `AppShell` | Composes `Sidebar`, `TopBar`, page content, and the assistant launcher; handles shared responsive/layout behavior. | Every private page |
| `Sidebar` | Brand/logo, `NavItem`s, bottom user summary, and the active navigation state derived from the URL. | `AppShell` |
| `TopBar` | Page title, date/context subtitle, and avatar-based `UserMenu`. The open menu visible in several references is an interaction state, not a permanently visible card. | `AppShell` |
| `PageHeader` | Standardizes titles, subtitles, and page actions. | Private pages |
| `Tabs` | Accessible tab list with an active underline. Keeps its selected value in the page URL, supports keyboard navigation, and becomes horizontally scrollable rather than wrapping on narrow screens. | Posts, Settings |
| `Avatar` | Renders an image or colored-initials fallback. | Header, cards, organization nodes |
| User menu | Toggleable account popover implemented within `TopBar`, with Profile, Settings, Help center, and Log out actions. Closes on outside click, Escape, and navigation. | `TopBar` |
| `AssistantLauncher` | Persistent “Ask 179 Assist” launcher and expandable chat panel with a close action, message history, prompt suggestion, and submit input. | `AppShell` |
| Loading, empty, and error states | States absent from the mockups but required for API integration; the shared `EmptyState` component and page-level states cover these cases. | Per feature |

### Sign-in

`SignInPage` sits outside `AppShell` and uses a split layout: a brand/message area on the left and a form on the right. The form includes email and password fields, a “forgot password” action, submit button, and an administrator-contact help message. It should use a real `<form>`, labels bound to inputs, and field-level error messages. The current sign-in is a demo session, not real authentication.

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

### Posts (tabbed page)

`PostsPage` owns one screen with three URL-backed views. Use `/posts?tab=all` when the parameter is omitted or invalid, `/posts?tab=published` for published content, and `/posts?tab=drafts` for drafts. Do not make a route per tab or keep the tab solely in component state.

| Area | Required behavior and content |
| --- | --- |
| Page header | Render **Posts**, the subtitle “Create, publish, and manage updates for your club.”, and the shared user menu. The `Create post` action opens `/posts/new`, which has its own reference in `Post_Creations.png`. |
| Toolbar | A labelled search field filters by title, excerpt, and author; the tab list follows it; the `Newest first` control selects the ordering. Search text and sort should remain intact while changing tabs. Persist them in query parameters only if the product needs shareable filtered links. |
| Tabs | `All posts`, `Published`, and `Drafts` use `role="tablist"`, `role="tab"`, and `aria-selected`. The selected tab has burgundy/red text and a red underline. Click, Left/Right Arrow, Home, and End change the selected view without a full page reload. |
| Results panel | Its heading changes with the selection: `Recent posts`, `Published posts`, or `Draft posts`. List cards in the selected sort order. Each card shows a type icon, title, excerpt, author avatar/name, timestamp, a status chip, and an overflow menu. The all-posts list can contain both statuses. |
| Draft-only controls | Every draft card also exposes an obvious Edit button/icon in addition to its overflow menu. A published card must not show that edit affordance in the list design. |
| Overview rail | Show `Post overview` counts for published posts and drafts in every tab. The supporting campaign changes with context: `Share an update` + `Create post` for All/Published and `Ready to publish?` + `Review drafts` for Drafts. |

Use a `PostStatus` enum (`published`, `draft`) rather than display text to derive the tab filters and status chips. A post record needs at least `id`, `status`, `type`, `title`, `excerpt`, `author`, `updatedAt`, and `publishedAt` where applicable. Counts in `PostOverview` must come from the complete accessible collection, not only the currently rendered page of results.

For loading, retain the toolbar and overview-card dimensions with skeletons. For empty results, keep the active tab and filters visible, explain whether the cause is the tab or search query, and provide the relevant primary action: create a post for All/Published or create/review drafts for Drafts. Failures must preserve the selected tab and offer a retry action.

At desktop width, the results panel and overview rail form two columns; below the desktop breakpoint, place the overview after the list. On a narrow screen, the header action moves below the title if needed, the search takes a full row, the sort control remains reachable, and tab labels scroll horizontally. Do not hide a status chip, timestamp, or draft edit action merely to make a card narrower.

The table above describes the handoff intent; the current `PostsPage` groups its overview above the results and uses an inline create action and draft edit icon. The campaign and overflow menus described by the earlier handoff are not separate components in the current implementation.

### Post details, creation, and editing

| Reference | Design content and current route |
| --- | --- |
| [`Post_Details.png`](Post_Details.png) | `/posts/:postId`: back link, status, title, author and date, media and content, plus post actions, performance figures and chart, and recent activity. The current page supports editing and unpublishing published posts; sample performance and activity come from mock data. |
| [`Post_Creations.png`](Post_Creations.png) | `/posts/new`: title, rich-text update, media upload, visibility, publish-now or schedule choice, writing tips, and cancel/save-draft/publish actions. The current blank form starts with `emptyPost()` and validates title, content before publishing, image type/size, and future scheduling time. |
| [`Post_Editor.png`](Post_Editor.png) | `/posts/:postId/edit`: editable content and attachment, draft visibility and auto-save feedback, checklist, discard/save-draft/review-and-publish actions. The same route also edits published posts, with controls adapted to their status. |

Both Create and Edit are implemented in [`PostEditorPage.jsx`](../frontend/src/features/posts/pages/PostEditorPage.jsx), not in separate create and edit files. [`router.jsx`](../frontend/src/app/router.jsx) maps both routes to that component; `isNew = !postId` selects the mode. [`PostDetailsPage.jsx`](../frontend/src/features/posts/pages/PostDetailsPage.jsx) is separate. Shared post styling lives in [`post-workflow.css`](../frontend/src/styles/post-workflow.css), and the design illustrations used by the frontend live under [`public/images/posts/`](../frontend/public/images/posts/). See the [frontend implementation notes](../frontend/README.md#post-create-and-post-edit-implementation) for the file map.

Post operations currently use a mock adapter and this browser's `localStorage`: data is not shared between users or devices, and visibility is not enforced by a server. Existing drafts auto-save; a new post is saved through its action buttons. Scheduled items remain drafts until the post collection is next read after the chosen time, rather than being published by a background service. Server authorization, audience enforcement, persistent storage, and real scheduled publishing remain integration work.

### Settings (tabbed page)

`SettingsPage` is a single settings surface with the same URL rule: `/settings?tab=general` is the default, with `notifications` and `security` as the other valid values. Changing tab must not discard unsaved input silently: retain unsaved form state while data is loaded; before navigating away from a dirty page or tab, request confirmation or save/discard explicitly.

The desktop layout has a main settings card and a right-side `AccountSummary` card. The summary contains the current user's avatar/initials, name, role, and email, and remains identical across tabs. On the reference captures, the profile popover is open; implement it through the shared `UserMenu` and do not include it as permanent page content.

| Tab | Controls and requirements |
| --- | --- |
| General | `Club name` text input; `Workspace language` select; `Time zone` select; `Compact navigation` switch and supporting text; one `Save changes` action. Validate the club name, submit only changed values, and apply compact navigation through `AppShell` after a successful save. |
| Notifications | `Assistant notifications` and `Weekly activity summary` switches, each with icon, title, and explanatory copy. Both fields are persisted by the single `Save changes` action; a switch should update local form state immediately but not imply the request has succeeded. |
| Security | Password row with `Change password`; `Two-factor authentication` switch; highlighted `Active sessions` row showing current device/location plus `Manage sessions`; one `Save changes` action for settings stored on this screen. Password and session-management actions open their dedicated flows and must not be treated as simple toggles. |

Use native controls with visible labels; the visual switch needs an accessible checkbox/switch name and current state. Save buttons are disabled only when the form is pristine or a request is in progress, show progress during submission, show a success/error message near the action, and preserve typed values after an error. Security-sensitive actions must require a fresh server-side authorization check; the UI alone is not a permission boundary.

At narrow widths, retain the tab list above the content, move `AccountSummary` below the active settings panel, and stack the row action under its description when it no longer fits. The save action remains visible after a long form; use a sticky footer only if it does not obscure an active control or keyboard.

### Help Center and 179 Assist

`HelpPage` includes a help-article search input, three quick-guide cards (create a post, find a member, manage an account), a popular-article list, and a `Contact support` call to action. Cards and articles navigate to their destination or article detail; search states need loading, no-result, and error presentations.

The circular assistant trigger is present in the authenticated shell. It expands to the `AssistantPanel` reference: a header with availability message and close button, a conversation area, suggested question, and labelled text input with submit button. Opening the panel must move focus into it; closing returns focus to the launcher. Messages need their own loading/error state and must be announced accessibly.

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

## Current frontend structure

The tree below reflects the current source and assets. Generated `node_modules/` and `dist/` directories are omitted. The full tree is also maintained in [frontend/README.md](../frontend/README.md#directory-structure).

```text
frontend/
|-- public/
|   +-- images/
|       |-- dashboard/
|       |   |-- quan-khu-7.jpg
|       |   +-- thong-nhat.jpg
|       +-- posts/
|           |-- training-calendar.svg
|           +-- volunteer-team.svg
|-- src/
|   |-- app/
|   |   |-- App.jsx
|   |   |-- router.jsx
|   |   +-- routes.js
|   |-- components/
|   |   |-- assistant/
|   |   |   |-- assistantApi.js
|   |   |   +-- AssistantLauncher.jsx
|   |   |-- layout/
|   |   |   |-- AppShell.jsx
|   |   |   |-- Sidebar.jsx
|   |   |   +-- TopBar.jsx
|   |   +-- ui/
|   |       |-- states/
|   |       |   +-- EmptyState.jsx
|   |       |-- Avatar.jsx
|   |       |-- Button.jsx
|   |       |-- Card.jsx
|   |       |-- Icon.jsx
|   |       |-- PageHeader.jsx
|   |       |-- Tabs.jsx
|   |       +-- TextField.jsx
|   |-- features/
|   |   |-- auth/
|   |   |   |-- components/
|   |   |   |   +-- SignInForm.jsx
|   |   |   |-- pages/
|   |   |   |   +-- SignInPage.jsx
|   |   |   +-- authStore.jsx
|   |   |-- dashboard/
|   |   |   |-- components/
|   |   |   |   |-- PostCard.jsx
|   |   |   |   |-- SessionDetails.jsx
|   |   |   |   |-- StatCard.jsx
|   |   |   |   |-- TeamFeed.jsx
|   |   |   |   +-- UpcomingPanel.jsx
|   |   |   |-- pages/
|   |   |   |   +-- DashboardPage.jsx
|   |   |   +-- dashboardStore.js
|   |   |-- employees/
|   |   |   |-- components/
|   |   |   |   |-- EmployeeCard.jsx
|   |   |   |   |-- EmployeeGrid.jsx
|   |   |   |   +-- MemberSearch.jsx
|   |   |   +-- pages/
|   |   |       |-- EmployeeProfilePage.jsx
|   |   |       +-- EmployeesPage.jsx
|   |   |-- help/
|   |   |   |-- api/
|   |   |   |   +-- helpApi.js
|   |   |   +-- pages/
|   |   |       +-- HelpPage.jsx
|   |   |-- organization/
|   |   |   |-- components/
|   |   |   |   |-- OrganizationChart.jsx
|   |   |   |   +-- OrganizationNode.jsx
|   |   |   +-- pages/
|   |   |       +-- OrganizationPage.jsx
|   |   |-- posts/
|   |   |   |-- api/
|   |   |   |   +-- postsApi.js
|   |   |   |-- pages/
|   |   |   |   |-- PostDetailsPage.jsx
|   |   |   |   |-- PostEditorPage.jsx
|   |   |   |   +-- PostsPage.jsx
|   |   |   |-- postContent.js
|   |   |   |-- postFilters.js
|   |   |   +-- postFormat.js
|   |   |-- settings/
|   |   |   |-- api/
|   |   |   |   +-- settingsApi.js
|   |   |   +-- pages/
|   |   |       +-- SettingsPage.jsx
|   |   +-- shared/
|   |       +-- pages/
|   |           +-- PlaceholderPage.jsx
|   |-- hooks/
|   |   +-- useUrlTab.js
|   |-- mocks/
|   |   |-- dashboard.js
|   |   |-- help.js
|   |   |-- members.js
|   |   |-- organization.js
|   |   |-- posts.js
|   |   +-- settings.js
|   |-- styles/
|   |   |-- globals.css
|   |   |-- post-workflow.css
|   |   +-- tokens.css
|   |-- App.jsx
|   +-- main.jsx
|-- index.html
|-- package-lock.json
|-- package.json
|-- README.md
+-- vite.config.js
```

The frontend uses feature-based folders under `src/features/`; shared layout and UI code lives in `src/components/`. `src/App.jsx` is a compatibility re-export, while `src/main.jsx` imports `src/app/App.jsx` directly.

## Data and behavior boundaries

- A page coordinates data, loading/error states, and layout; cards, forms, and charts handle rendering and callbacks. UI components must not call `fetch` directly.
- Feature API modules currently provide mock adapters; there is no shared `lib/httpClient.js` in the current frontend. Define a shared HTTP layer and server contracts when connecting the backend.
- Mock data lives in `mocks/` and is consumed through feature adapters or directly by the features that currently have no adapter. Replace the mock paths with server-backed data as the relevant APIs become available.
- Tab values are validated by a page-level parser. Invalid or missing values canonicalize to `all` for Posts and `general` for Settings without creating a duplicate history entry. Browser Back/Forward restores the appropriate tab and its data request.
- Do not mix post, settings, help, and assistant data in a global page store. Each feature owns its loading/error/cache state; `authStore` remains limited to identity/session data and shared user-menu data.
- Production settings, post publication/editing, password and session management, and support require server-authorized feature APIs. The current mock workflows do not provide server-side authorization or shared persistence.
- The auth guard redirects unauthenticated users to `/sign-in`; `authStore` retains the current user and session. Confirm the admin permission model with the backend before restricting “Add member” or administration routes.
- Keep labels/content in constants or data models instead of duplicating strings across components; this also keeps the door open for i18n if needed.

## Current implementation and remaining integration

The shell, demo sign-in, Dashboard, post list and workflow, Settings, Employees, Organization, Help, and Assistant have frontend implementations. Several supporting routes, including password and session management, help articles, and member profiles, remain placeholders. The following work is still needed:

1. Replace demo authentication and browser-only storage with server-authorized accounts, APIs, and persistence.
2. Connect post visibility, activity metrics, uploads, and scheduled publishing to backend services; keep Create and Edit aligned when changing their shared component.
3. Complete placeholder flows when their designs and service contracts are available, and connect member, settings, help, support, and assistant APIs.
4. Validate responsive layouts, accessibility, interaction behavior, and visual consistency against the references across desktop and mobile.

## Asset conventions and documentation updates

- Use English, lowercase kebab-case names for new assets; use SVG for icons and vectors, and optimized PNG/WebP for raster assets.
- Do not store credentials, real member data, or unlicensed assets.
- When a design changes, record its Figma/source link, export date, and any route/component impact here. For a tabbed page, record every tab state and whether it changes the shared component/API contract. Also update `frontend/README.md` when the architecture, dependency set, routes, or data flow changes.
