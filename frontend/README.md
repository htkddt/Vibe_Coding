# Frontend

## Purpose

This directory contains the React single-page web application for 179FC_MMS. It is currently a minimal Vite scaffold written in JavaScript and JSX, with CSS for styling and a landing screen that confirms the client is running.

## Stack

- React
- JavaScript
- JSX (`.jsx`)
- CSS
- Vite

## Directory Structure

~~~text
frontend/
├── src/
│   ├── App.jsx          # Temporary application entry screen
│   ├── main.jsx         # React bootstrap
│   └── styles.css       # Global styles
├── index.html
├── package.json
└── vite.config.js
~~~

## Run Locally

~~~bash
npm ci
npm run dev
~~~

Use `npm run build` for a production build and `npm run preview` to preview it locally.

The scaffold requires Node.js 20.19 or newer (or Node.js 22.12 or newer).

## Planned Flow

1. Define authentication and role-based access requirements with the backend team.
2. Add member directory, member profile, and member administration views.
3. Integrate API data, loading states, error handling, and the virtual-assistant entry point.
4. Add accessibility, responsive layout, and visual regression coverage.

## Test Location

Do not add test source to this directory. All frontend tests must be created in `../tests/frontend/`.

## Documentation Rule

Update this README whenever frontend code, dependencies, routes, data flows, commands, or architecture changes. Also update the root README when the change affects the entire repository.
