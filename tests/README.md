# Tests

## Purpose

This directory is the only location for test source in 179FC_MMS. Tests are separated from implementation directories so CI jobs and quality artifacts remain centralized.

## Structure

~~~text
tests/
├── backend/    # NestJS unit, integration, and end-to-end tests
├── chatbot/    # FastAPI unit, API, safety, and contract tests
├── database/   # Migration, data-integrity, and query tests
└── frontend/   # React component, interaction, and end-to-end tests
~~~

## Plan

1. Select the test runner and coverage policy for each component.
2. Establish shared test-data, fixture, and environment conventions without coupling suites to production data.
3. Add smoke tests for frontend availability and backend `GET /health`.
4. Add feature tests as member-management flows are implemented.
5. Add contract tests for backend-chatbot integration and CI reporting.

## Conventions

- Use English test descriptions, fixture names, and filenames.
- Keep tests deterministic and isolated from real member data.
- Group test source by component and feature under the directories above.
- Store test-only configuration and fixture files under `tests/` as well.

## Documentation Rule

Update this README and the appropriate component README whenever test strategy, commands, coverage policy, or test scope changes. Update the root README when CI or repository-wide quality requirements change.
