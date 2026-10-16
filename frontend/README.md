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

- /sign-in is the public sign-in form. It is currently in explicit demo-access mode: clicking Sign in to 179FC opens the mock Club Admin session even when email and password are blank or invalid.
- Private routes are guarded by the in-memory auth store; unauthenticated visitors are redirected to /sign-in.
- /dashboard, /employees, /organization, /settings, and /help implement the supplied reference screens. The employee search, notification switch, user menu, help guides, and 179 Assist panel are interactive.
- The Settings and Help Center layouts were refreshed from designs/images/Settings.png and designs/images/Help.png (updated 2026-10-16): Settings now has notification tabs, preferences, save feedback, and account details; Help Center now has search, guides, articles, and support contact states.
- /posts and /employees/:memberId intentionally remain clearly labeled placeholders because detailed product designs are not available.
- Mock content is isolated in src/mocks/ so a future API adapter can replace it without changing page/component layout.

## Responsive behavior

- Layout dimensions use fluid CSS sizing (clamp, percentages, and auto-fitting grids), so spacing, cards, sidebars, type, and panels scale with the available viewport instead of reproducing one fixed design resolution.
- Desktop retains the burgundy sidebar and floating 179 Assist launcher, both sized relative to the viewport.
- The layout changes structure only when necessary: the dashboard column collapses, the sidebar becomes an accessible drawer, grids adapt to their available width, and the organization chart remains horizontally scrollable on narrow screens rather than clipping content.

## Planned integration

1. Replace the demo-access workaround with backend authentication, database-backed user lookup, password/session validation, and the finalized permission model before any production deployment. Do not treat the current form as authentication or use it to protect real member data.
2. Add API adapters, loading/error states, and mutation workflows once backend endpoints are specified.
3. Implement the Posts and member-profile screens after their designs are approved.
4. Add frontend tests under ../tests/frontend/ and visual regression coverage.

## Temporary demo-access workaround

The portal deliberately bypasses account authentication so reviewers without an account can enter the workspace: any click on Sign in to 179FC creates the in-memory mock Club Admin session. The email and password inputs are visual-only in this mode and are neither validated nor sent anywhere.

This workaround is only for the current frontend preview. It must be removed and replaced with real backend/database authentication before the system handles real accounts, sessions, roles, permissions, or member data.

## Test Location

Do not add test source to this directory. All frontend tests must be created in ../tests/frontend/.

## Documentation Rule

Update this README whenever frontend code, dependencies, routes, data flows, commands, or architecture changes. Also update the root README when the change affects the entire repository.
