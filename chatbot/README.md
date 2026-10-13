# Chatbot

## Purpose

This directory is reserved for the 179FC_MMS virtual-assistant service. The service will be implemented with Python and FastAPI after its product requirements, access model, and data boundaries are defined.

## Planned Stack

- Python
- FastAPI
- Pydantic for request and response validation
- HTTP client integration with the NestJS API

## Implementation Plan

1. Document supported assistant use cases, prohibited actions, and escalation paths.
2. Define authenticated API contracts between the chatbot and the NestJS backend.
3. Create the FastAPI application with configuration, health check, structured logging, and typed schemas.
4. Implement conversation orchestration with authorization-aware member data access.
5. Add rate limiting, audit logging, error handling, and observability.
6. Implement chatbot tests in `../tests/chatbot/` and add CI automation in `../scripts/chatbot/`.

## Proposed Structure

~~~text
chatbot/
├── app/
│   ├── api/
│   ├── core/
│   ├── services/
│   └── main.py
├── pyproject.toml
└── README.md
~~~

## Test Location

Do not add test source to this directory. All chatbot tests must be created in `../tests/chatbot/`.

## Documentation Rule

Update this README whenever chatbot code, dependencies, API contracts, prompts, guardrails, environment variables, or operations change. Also update the root README when the change affects the entire repository.
