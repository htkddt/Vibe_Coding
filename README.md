# 179FC Member Management System

## Overview

179FC Member Management System (179FC_MMS) is a web application for managing members in the 179FC organization. The repository is organized as a small multi-service workspace so that the user interface, API, virtual-assistant service, automation, designs, and test assets can evolve independently.

## Repository Layout

~~~text
179FC_MMS/
├── frontend/           # React web application
├── backend/            # NestJS API
├── chatbot/            # Planned FastAPI virtual-assistant service
├── designs/            # Figma exports and design assets
├── scripts/            # Project automation
└── tests/              # All test source, grouped by component
~~~

## Tech Stack

| Area | Technology | Status |
| --- | --- | --- |
| Web client | React, React Router, JavaScript, JSX, CSS, Vite | Feature development |
| API | NestJS, TypeScript | Initial scaffold |
| Virtual assistant | Python, FastAPI | Planned |
| Testing | Component-specific test suites under `tests/` | Planned |
| Automation | PowerShell and/or Node.js scripts | Planned |

## References

- [React documentation](https://react.dev/)
- [Vite documentation](https://vite.dev/)
- [NestJS documentation](https://docs.nestjs.com/)
- [FastAPI documentation](https://fastapi.tiangolo.com/)

## Operations

### Temporary frontend demo access

The frontend currently bypasses account authentication so a reviewer without an account can enter the portal. Clicking Sign in to 179FC creates a mock Club Admin session in the browser tab?s `sessionStorage`; email and password values are not validated or transmitted.

This is a local frontend-preview workaround only, not a security feature. Before backend/database integration or any production deployment, replace it with real account lookup, credential verification, session handling, authorization, and role/permission enforcement.

### Local development

- Use a supported Node.js release: 20.19+ (or 22.12+) for the React JavaScript client, and 20.11+ for the NestJS API. Reopen the terminal after upgrading Node.js so that `node --version` reports the new release.
- The frontend development server uses port `5173`, the backend uses port `3000`. Make sure both ports are available before starting the services.
- The chatbot service is intentionally not runnable yet, its delivery plan is in `chatbot/README.md`.

### Build

- Frontend

   ~~~powershell
   cd frontend
   npm ci
   npm run build
   ~~~

- Backend

   ~~~powershell
   cd backend
   npm ci
   npm run build
   ~~~

### Run

- Frontend

   ~~~powershell
   npm run dev -- --host 127.0.0.1 --port 5173
   ~~~
   Open: `http://127.0.0.1:5173/`

- Backend

   ~~~powershell
   npm run start:dev
   ~~~

### Test

- Frontend

   ~~~powershell
   npm run preview -- --host 127.0.0.1 --port 4173
   ~~~
   Open: `http://127.0.0.1:4173/`

- Backend

   ~~~powershell
   Invoke-WebRequest http://127.0.0.1:3000/health -UseBasicParsing
   ~~~

   A healthy API returns status `200` and the JSON body `{"service":"179fc-mms-backend","status":"ok"}`.

### Documentation rule

- Update the `README.md` in the affected top-level component directory whenever its code, configuration, flow, or architecture changes.
- Update this root README whenever a change affects repository-wide architecture, shared workflows, technology choices, or operations.

### Test placement rule

- Place all test source exclusively under `tests/`.
- Use `tests/frontend/` for frontend tests, `tests/backend/` for backend tests, `tests/chatbot/` for chatbot tests, and `tests/database/` for database tests.
- Do not place test source files in application directories.

## Current Status

| Workstream | Planning | Foundation | Feature Development | Test Coverage | Current Result |
| --- | --- | --- | --- | --- | --- |
| Frontend | Complete | Complete | In progress | Planned | Responsive React portal with temporary bypassed demo sign-in, protected routes, dashboard, member directory, organization, posts, settings, help, and 179 Assist |
| Backend | Complete | Complete | Not started | Planned | NestJS API shell with `GET /health` |
| Chatbot | Complete | Not started | Not started | Planned | FastAPI delivery plan |
| Designs | Complete | Not started | Not started | Not started | Asset and handoff plan |
| Scripts | Complete | Not started | Not started | Not started | Automation plan and component folders |
| Tests | Complete | Not started | Not started | Not started | Centralized test-suite structure |

## Next Actions

| Order | Workstream | Planned Action | Expected Outcome |
| --- | --- | --- | --- |
| 1 | Product and security | Define member data, authentication, roles, permissions, and chatbot access boundaries. | A shared domain and authorization baseline for all services. |
| 2 | Backend | Implement versioned member, role, and organization administration modules with persistence and API documentation. | Secure member-management API endpoints. |
| 3 | Designs | Produce approved responsive flows for sign-in, member directory, member profile, administration, and assistant interactions. | Implementation-ready design handoff. |
| 4 | Frontend | Remove the temporary demo sign-in bypass, then connect the portal to backend/database authentication and member APIs; add the approved profile and administration designs and connect the mock post workflows. | Usable member-management web experience with real access control and live data. |
| 5 | Tests and CI | Add component test runners, smoke tests, member-flow coverage, API contracts, and CI reporting under `tests/`. | Repeatable quality checks with centralized test source. |
| 6 | Chatbot | Create the FastAPI service, integrate it with authenticated backend APIs, and add guardrails, audit logging, and observability. | Secure virtual-assistant capability. |
