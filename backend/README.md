# Backend

## Purpose

This directory contains the NestJS HTTP API for 179FC_MMS. The initial scaffold exposes a health endpoint and provides the module structure for future member-management APIs.

## Stack

- NestJS
- TypeScript
- Node.js

## Directory Structure

~~~text
backend/
├── src/
│   ├── app.controller.ts  # Health endpoint
│   ├── app.module.ts      # Root application module
│   ├── app.service.ts     # Health service
│   └── main.ts            # HTTP server bootstrap
├── nest-cli.json
├── package.json
├── tsconfig.build.json
└── tsconfig.json
~~~

## Run Locally

~~~bash
npm install
npm run start:dev
~~~

The development server listens on `http://localhost:3000` by default. Confirm availability at `GET /health`.

The scaffold requires Node.js 20.11 or newer.

## Planned Flow

1. Define the member domain model, authentication model, and permissions.
2. Add versioned modules for members, roles, and organization administration.
3. Integrate persistence, request validation, observability, and OpenAPI documentation.
4. Expose an authenticated integration boundary for the chatbot service.

## Test Location

Do not add test source to this directory. All backend unit, integration, and end-to-end tests must be created in `../tests/backend/`.

## Documentation Rule

Update this README whenever backend code, endpoints, dependencies, environment variables, commands, or data flows change. Also update the root README when the change affects the entire repository.
