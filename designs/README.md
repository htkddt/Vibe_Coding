# Design handoff — 179FC Member Management Portal

## Purpose and scope

This directory stores design references and frontend handoff documentation. The reference images cover the primary desktop states currently available. They define the visual and interaction contract described here; APIs, permissions, and copy that are not visible in a reference still require product/backend confirmation.

| Image | Proposed route | Purpose |
| --- | --- | --- |
| `Sign-in.png` | `/sign-in` | Authenticate users before entering the workspace. |
| `Dashboard.png` | `/dashboard` | Summarize members, team activity, and upcoming events. |
| `Employees.png` | `/employees` | Search, browse, and begin adding members. |
| `Organization.png` | `/organization` | View the organization's reporting structure. |
| `Post_All.png` | `/posts?tab=all` | List all posts, regardless of status. |
| `Post_Published.png` | `/posts?tab=published` | List published posts only. |
| `Post_Drafts.png` | `/posts?tab=drafts` | List drafts only and expose their edit action. |
| `Settings_General.png` | `/settings?tab=general` | Edit workspace and display preferences. |
| `Settings_Notifications.png` | `/settings?tab=notifications` | Edit notification preferences. |
| `Settings_Security.png` | `/settings?tab=security` | Manage password, 2FA, and active sessions. |
| `Help.png` | `/help` | Find guides, common articles, and support. |
| `Assist.png` | N/A (assistant panel state) | Expanded state of the shared 179 Assist panel. |

`Posts`, `Settings`, and `Help` now have detailed desktop references. The separate files for each tab are states of one page, not separate sidebar destinations. The active tab must be represented in the URL so that refresh, browser navigation, and a copied link restore the same view.

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
| `UserMenu` | Toggleable account popover with Profile, Settings, Help center, and Log out actions. Closes on outside click, Escape, and navigation. | `TopBar` |
| `AssistantLauncher` / `AssistantPanel` | Persistent “Ask 179 Assist” launcher and expandable chat panel with a close action, message history, prompt suggestion, and submit input. | `AppShell` |
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

### Posts (tabbed page)

`PostsPage` owns one screen with three URL-backed views. Use `/posts?tab=all` when the parameter is omitted or invalid, `/posts?tab=published` for published content, and `/posts?tab=drafts` for drafts. Do not make a route per tab or keep the tab solely in component state.

| Area | Required behavior and content |
| --- | --- |
| Page header | Render **Posts**, the subtitle “Create, publish, and manage updates for your club.”, a `Create post` primary action, and the shared user menu. `Create post` starts the post-creation flow; its form is outside the provided reference and should be a separate route or modal with its own design approval. |
| Toolbar | A labelled search field filters by title, excerpt, and author; the tab list follows it; the `Newest first` control selects the ordering. Search text and sort should remain intact while changing tabs. Persist them in query parameters only if the product needs shareable filtered links. |
| Tabs | `All posts`, `Published`, and `Drafts` use `role="tablist"`, `role="tab"`, and `aria-selected`. The selected tab has burgundy/red text and a red underline. Click, Left/Right Arrow, Home, and End change the selected view without a full page reload. |
| Results panel | Its heading changes with the selection: `Recent posts`, `Published posts`, or `Draft posts`. List cards in the selected sort order. Each card shows a type icon, title, excerpt, author avatar/name, timestamp, a status chip, and an overflow menu. The all-posts list can contain both statuses. |
| Draft-only controls | Every draft card also exposes an obvious Edit button/icon in addition to its overflow menu. A published card must not show that edit affordance in the list design. |
| Overview rail | Show `Post overview` counts for published posts and drafts in every tab. The supporting campaign changes with context: `Share an update` + `Create post` for All/Published and `Ready to publish?` + `Review drafts` for Drafts. |

Use a `PostStatus` enum (`published`, `draft`) rather than display text to derive the tab filters and status chips. A post record needs at least `id`, `status`, `type`, `title`, `excerpt`, `author`, `updatedAt`, and `publishedAt` where applicable. Counts in `PostOverview` must come from the complete accessible collection, not only the currently rendered page of results.

For loading, retain the toolbar and overview-card dimensions with skeletons. For empty results, keep the active tab and filters visible, explain whether the cause is the tab or search query, and provide the relevant primary action: create a post for All/Published or create/review drafts for Drafts. Failures must preserve the selected tab and offer a retry action.

At desktop width, the results panel and overview rail form two columns; below the desktop breakpoint, place the overview after the list. On a narrow screen, the header action moves below the title if needed, the search takes a full row, the sort control remains reachable, and tab labels scroll horizontally. Do not hide a status chip, timestamp, or draft edit action merely to make a card narrower.

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

`HelpCenterPage` includes a help-article search input, three quick-guide cards (create a post, find a member, manage an account), a popular-article list, and a `Contact support` call to action. Cards and articles navigate to their destination or article detail; search states need loading, no-result, and error presentations.

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

## Proposed `frontend/src` structure

The frontend currently uses React with JavaScript and JSX. The feature-based structure below is the canonical reference for the currently available designs: feature logic, APIs, and components stay together, while only genuinely shared parts belong in `components/`.

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
│   │   ├── Tabs.jsx
│   │   ├── Toggle.jsx
│   │   ├── PageHeader.jsx
│   │   └── states/                # LoadingState, EmptyState, ErrorState
│   └── assistant/
│       ├── AssistantLauncher.jsx
│       └── AssistantPanel.jsx
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
│   ├── posts/
│   │   ├── api/postsApi.js
│   │   ├── components/PostsToolbar.jsx
│   │   ├── components/PostList.jsx
│   │   ├── components/PostListItem.jsx
│   │   ├── components/PostOverview.jsx
│   │   ├── components/PostsCampaignCard.jsx
│   │   └── pages/PostsPage.jsx
│   ├── settings/
│   │   ├── api/settingsApi.js
│   │   ├── components/AccountSummary.jsx
│   │   ├── components/GeneralSettingsForm.jsx
│   │   ├── components/NotificationSettingsForm.jsx
│   │   ├── components/SecuritySettingsPanel.jsx
│   │   └── pages/SettingsPage.jsx
│   ├── help/
│   │   ├── api/helpApi.js
│   │   ├── components/QuickGuideCard.jsx
│   │   ├── components/PopularArticleList.jsx
│   │   └── pages/HelpCenterPage.jsx
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
│   ├── posts.js
│   ├── settings.js
│   ├── help.js
│   └── organization.js
├── styles/
│   ├── tokens.css                 # Colors, type, spacing, radii, shadows
│   ├── globals.css                # Reset, body, focus styles
│   └── utilities.css              # Only genuinely necessary utilities
├── main.jsx                       # React bootstrap; imports globals.css
└── App.jsx                        # Temporary re-export during migration
```

This is the canonical frontend structure for the currently available designs. Add files when their feature is implemented; do not create empty placeholder files solely to mirror the tree. The root `App.jsx` is a temporary migration re-export and can be removed once `main.jsx` imports `app/App.jsx` directly.

## Data and behavior boundaries

- A page coordinates data, loading/error states, and layout; cards, forms, and charts handle rendering and callbacks. UI components must not call `fetch` directly.
- `api/*.js` modules use the shared `lib/httpClient.js`; endpoints, response shapes, and auth tokens are isolated so mock data can be replaced easily.
- Before the backend is connected, pages import from `mocks/` through the API adapter, allowing the implementation to swap to HTTP without changing the component tree.
- Tab values are validated by a page-level parser. Invalid or missing values canonicalize to `all` for Posts and `general` for Settings without creating a duplicate history entry. Browser Back/Forward restores the appropriate tab and its data request.
- Do not mix post, settings, help, and assistant data in a global page store. Each feature owns its loading/error/cache state; `authStore` remains limited to identity/session data and shared user-menu data.
- Saving settings, publishing/editing a post, changing a password, managing sessions, and contacting support require server-authorized feature APIs. Mocks must follow the same input/output contract, including validation and error shapes.
- The auth guard redirects unauthenticated users to `/sign-in`; `authStore` retains the current user and session. Confirm the admin permission model with the backend before restricting “Add member” or administration routes.
- Keep labels/content in constants or data models instead of duplicating strings across components; this also keeps the door open for i18n if needed.

## Suggested implementation order

1. Establish tokens, reset/global styles, UI primitives, and `AppShell`.
2. Add routing plus `SignInPage`/auth guard with a mock session; install `react-router-dom` at this point.
3. Implement Dashboard with mock data to establish the visual language and responsive behavior.
4. Implement Posts as one URL-backed tabbed page, including search, sort, status filtering, overview counts, all async states, and draft edit affordances.
5. Implement Settings as one URL-backed tabbed page, including dirty-form protection, save feedback, and dedicated password/session flows.
6. Implement Employees (client-side search against mock data, card/grid, and empty state), then connect the member API when its backend contract is ready.
7. Implement the Organization Chart from tree data, then handle mobile overflow/list behavior.
8. Implement Help Center and the Assistant panel using the available references; connect support/assistant services after their backend contracts are ready.

## Asset conventions and documentation updates

- Use English, lowercase kebab-case names for new assets; use SVG for icons and vectors, and optimized PNG/WebP for raster assets.
- Do not store credentials, real member data, or unlicensed assets.
- When a design changes, record its Figma/source link, export date, and any route/component impact here. For a tabbed page, record every tab state and whether it changes the shared component/API contract. Also update `frontend/README.md` when the architecture, dependency set, routes, or data flow changes.
