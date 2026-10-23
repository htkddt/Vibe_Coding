# Frontend

## Purpose

This directory contains the React single-page application for 179FC_MMS. It implements the approved 179FC portal reference with a mocked sign-in flow, responsive authenticated shell, and the Dashboard, Employees, Organization, Settings, Help, and 179 Assist experiences.

## Stack

- React
- React Router
- JavaScript
- JSX
- CSS
- Vite

## Directory Structure

The following tree shows the project source and assets. Generated `node_modules/` and `dist/` directories are omitted.

~~~text
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
|   |   |   +-- memberProfileStore.js
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
~~~

## Run Locally

~~~bash
npm ci
npm run dev
~~~

Use npm run build for a production build and npm run preview to preview it locally.

The application requires Node.js 20.19 or newer (or Node.js 22.12 or newer).

## Implemented routes and flow

- `/sign-in` uses an explicit demo-access flow. Any sign-in creates a mock Club Admin session in `sessionStorage`; credentials are neither validated nor sent. The session survives refresh in the same browser tab and is cleared on logout.
- `/dashboard`, `/employees`, `/organization`, `/posts`, `/settings`, and `/help` use the authenticated shell.
- `/employees` is a responsive directory of 30 mock members. It has Total, Online, Offline, and Team summary statistics; instant search across name, role, team, and email; and sorting by name, team, or most recently joined. Each member card has an accessible profile link plus entrance and hover motion that respects the user's reduced-motion preference.
- `/employees/:memberId` provides a working member profile. Users can upload or remove a PNG, JPG, or WebP avatar (up to 1.5 MB), select a team, and edit date of birth and phone number. Changes are stored only in the current browser's `localStorage` and are reflected in the directory; they are mock data, not server-side member records.
- `/dashboard` includes a mock team feed with updates, likes and comments, plus an upcoming session list. Users can add feed updates and scheduled sessions; these changes and interactions are stored in the current browser's `localStorage` and are not shared with other users.
- Example training and match sessions include venue photos, addresses and Google Maps search links. The dates and events are illustrative. New sessions can include an optional address (which generates a Maps search link) and image URL. The bundled, cropped sample photos are [Quân khu 7 by ThoseDaysAreGone](https://commons.wikimedia.org/wiki/File:S%C3%A2n_v%E1%BA%ADn_%C4%91%E1%BB%99ng_Qu%C3%A2n_khu_7.jpg) and [Thống Nhất by Yanee134](https://commons.wikimedia.org/wiki/File:20180909_Th%E1%BB%91ng_Nh%E1%BA%A5t_Stadium.jpg), both [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- Dashboard cards, forms, and feed actions use short entrance and interaction animations. These animations are disabled when the system requests reduced motion.
- `/posts?tab=all|published|drafts` provides URL-backed tabs, search, sorting, status counts, draft edit links, and loading/empty/error states. `/posts/:postId` displays post content, actions, and available mock performance data; `/posts/new` and `/posts/:postId/edit` provide creation and editing, image attachments, formatting, draft auto-save, review, publication, and unpublishing. The mock posts adapter stores changes and images in this browser's `localStorage`, so they are not shared across users or devices. Images are limited to 2 MB. Scheduled posts stay in drafts and are marked published when the collection is next read after the chosen time; this is not a background publishing service. Visibility is stored as a preference but is not enforced by a server.
- `/settings?tab=general|notifications|security` provides URL-backed tabs, local form state, dirty-navigation confirmation, validation, and save feedback. The mock settings adapter stores preferences in browser `localStorage`; compact navigation applies after saving. These controls do not change server-side security or account settings.
- Password and session management, help articles, and support have clearly labeled placeholder routes until their designs and server-authorized APIs are available. The help guides navigate to relevant routes. 179 Assist uses a mock reply adapter and keeps conversation history while the shell remains mounted. Hovering or keyboard-focusing its icon shows the ?Ask 179 Assist? tooltip for up to five seconds. Clicking the icon hides the tooltip and toggles the chat panel.
- Feature adapters isolate mock dashboard, posts, settings, help, assistant, and member-profile behavior from their UI. Member directory data is mocked in [`src/mocks/members.js`](src/mocks/members.js); [`memberProfileStore.js`](src/features/employees/memberProfileStore.js) persists the editable profile fields locally.

## Post Create and Post Edit implementation

**Post Create does not have a separate `PostCreatePage.jsx` file.** Both Create and Edit use [`PostEditorPage.jsx`](src/features/posts/pages/PostEditorPage.jsx), which contains their shared form and their mode-specific controls. When changing this file, check both flows: changes to shared fields, formatting, attachments, validation, and submission can affect both pages.

| Route | Component mode | Design reference |
| --- | --- | --- |
| `/posts/new` | Create: no `postId` is present, so `isNew = !postId` is `true` and the form starts with `emptyPost()` | [`Post_Creations.png`](../designs/Post_Creations.png) |
| `/posts/:postId/edit` | Edit: `postId` is present, so `isNew` is `false` and the existing post is loaded; the heading and actions depend on whether it is a draft or published | [`Post_Editor.png`](../designs/Post_Editor.png) |
| `/posts/:postId` | Details: rendered separately by `PostDetailsPage` | [`Post_Details.png`](../designs/Post_Details.png) |

The code is organized as follows:

- [`src/app/router.jsx`](src/app/router.jsx) maps both `/posts/new` and `/posts/:postId/edit` to `PostEditorPage`. The Create post link is in [`PostsPage.jsx`](src/features/posts/pages/PostsPage.jsx).
- [`PostEditorPage.jsx`](src/features/posts/pages/PostEditorPage.jsx) defines `isNew`, initializes the blank post, renders the form, and branches for create and edit settings and buttons. Its `submit(mode)` handles saving a draft, publishing, scheduling, and review. Existing drafts auto-save; the Create form is saved through its action buttons.
- [`postsApi.js`](src/features/posts/api/postsApi.js) implements `getPosts`, `savePost`, `unpublishPost`, and `restorePost`. This is a mock adapter backed by browser `localStorage`, not the backend API. Scheduled posts become published when the collection is next read after their scheduled time; visibility is not enforced by a server.
- [`postContent.js`](src/features/posts/postContent.js) handles conversion and sanitization of the editor's content. [`post-workflow.css`](src/styles/post-workflow.css) contains the post details and editor styles and is imported by [`main.jsx`](src/main.jsx).
- [`PostDetailsPage.jsx`](src/features/posts/pages/PostDetailsPage.jsx) renders the separate details page, including its link to edit. Post workflow logic tests are in [`tests/frontend/portal.test.mjs`](../tests/frontend/portal.test.mjs).

## Responsive behavior

- Layout dimensions use fluid CSS sizing (clamp, percentages, and auto-fitting grids), so spacing, cards, sidebars, type, and panels scale with the available viewport instead of reproducing one fixed design resolution.
- Desktop retains the burgundy sidebar and floating 179 Assist launcher, both sized relative to the viewport.
- The layout changes structure only when necessary: the dashboard column collapses, the sidebar becomes an accessible drawer, grids adapt to their available width, and the organization chart remains horizontally scrollable on narrow screens rather than clipping content.

## Planned integration

1. Replace demo access and browser storage with backend authentication, account settings, session validation, and the finalized permission model before production. The current flow does not protect real data.
2. Connect server-authorized post, settings, help, support, assistant, and member-profile APIs, including server-side visibility and scheduled publication. Replace browser-backed profile edits with validated, permission-aware member records once the contracts are approved.
3. Add browser-based accessibility, interaction, and visual regression coverage across desktop and mobile viewports.

## Temporary demo-access workaround

Clicking Sign in to 179FC creates a mock Club Admin session without checking credentials. The session is stored in the browser tab's `sessionStorage` and is not an authentication or authorization boundary. Replace it before using real accounts or member data.

## Test Location

Do not add test source to this directory. Frontend tests live in `../tests/frontend/`. Run the current logic checks with `node --test ../tests/frontend/portal.test.mjs`.

## Documentation Rule

Update this README whenever frontend code, dependencies, routes, data flows, commands, or architecture changes. Also update the root README when the change affects the entire repository.
