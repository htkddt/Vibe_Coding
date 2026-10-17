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

~~~text
frontend/
├── src/
│   ├── app/             # Route constants, router, and app composition
│   ├── components/      # Shared layout, UI primitives, and 179 Assist launcher
│   ├── features/        # Feature pages and feature-specific components
│   ├── mocks/           # Design-matched mock content
│   ├── styles/          # Shared tokens and global responsive styles
│   ├── App.jsx          # Compatibility re-export for the application
│   └── main.jsx         # React bootstrap
├── index.html
├── package.json
└── vite.config.js
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
- `/dashboard`, `/employees`, `/organization`, `/posts`, `/settings`, and `/help` use the authenticated shell. Employee profiles remain placeholders pending a design.
- `/dashboard` includes a mock team feed with updates, likes and comments, plus an upcoming session list. Users can add feed updates and scheduled sessions; these changes and interactions are stored in the current browser's `localStorage` and are not shared with other users.
- Example training and match sessions include venue photos, addresses and Google Maps search links. The dates and events are illustrative. New sessions can include an optional address (which generates a Maps search link) and image URL. The bundled, cropped sample photos are [Quân khu 7 by ThoseDaysAreGone](https://commons.wikimedia.org/wiki/File:S%C3%A2n_v%E1%BA%ADn_%C4%91%E1%BB%99ng_Qu%C3%A2n_khu_7.jpg) and [Thống Nhất by Yanee134](https://commons.wikimedia.org/wiki/File:20180909_Th%E1%BB%91ng_Nh%E1%BA%A5t_Stadium.jpg), both [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- Dashboard cards, forms, and feed actions use short entrance and interaction animations. These animations are disabled when the system requests reduced motion.
- `/posts?tab=all|published|drafts` provides URL-backed tabs, search, sorting, status counts, draft edit links, and loading/empty/error states. The post collection is mock data; counts represent the complete mock collection.
- `/settings?tab=general|notifications|security` provides URL-backed tabs, local form state, dirty-navigation confirmation, validation, and save feedback. The mock settings adapter stores preferences in browser `localStorage`; compact navigation applies after saving. These controls do not change server-side security or account settings.
- Post creation, editing and details, password and session management, help articles, and support have clearly labeled placeholder routes until their designs and server-authorized APIs are available. The help guides navigate to relevant routes. 179 Assist uses a mock reply adapter and keeps conversation history while the shell remains mounted. Hovering or keyboard-focusing its icon shows the ?Ask 179 Assist? tooltip for up to five seconds. Clicking the icon hides the tooltip and toggles the chat panel.
- Feature adapters isolate mock dashboard, posts, settings, help, and assistant behavior from their UI. Dashboard, member, and organization data are local mocks.

## Responsive behavior

- Layout dimensions use fluid CSS sizing (clamp, percentages, and auto-fitting grids), so spacing, cards, sidebars, type, and panels scale with the available viewport instead of reproducing one fixed design resolution.
- Desktop retains the burgundy sidebar and floating 179 Assist launcher, both sized relative to the viewport.
- The layout changes structure only when necessary: the dashboard column collapses, the sidebar becomes an accessible drawer, grids adapt to their available width, and the organization chart remains horizontally scrollable on narrow screens rather than clipping content.

## Planned integration

1. Replace demo access and browser storage with backend authentication, account settings, session validation, and the finalized permission model before production. The current flow does not protect real data.
2. Connect server-authorized post, settings, help, support, and assistant APIs. Implement the dedicated post, password, session, article, support, and member-profile flows once their designs and contracts are approved.
3. Add browser-based accessibility, interaction, and visual regression coverage across desktop and mobile viewports.

## Temporary demo-access workaround

Clicking Sign in to 179FC creates a mock Club Admin session without checking credentials. The session is stored in the browser tab's `sessionStorage` and is not an authentication or authorization boundary. Replace it before using real accounts or member data.

## Test Location

Do not add test source to this directory. Frontend tests live in `../tests/frontend/`. Run the current logic checks with `node --test ../tests/frontend/portal.test.mjs`.

## Documentation Rule

Update this README whenever frontend code, dependencies, routes, data flows, commands, or architecture changes. Also update the root README when the change affects the entire repository.
