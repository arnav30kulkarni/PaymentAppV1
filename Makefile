.PHONY: help lint audit build check

help:
	@printf '%s\n' \
	  'make lint   - Run the configured frontend ESLint checks' \
	  'make audit  - Audit backend and frontend dependencies for vulnerabilities' \
	  'make build  - Build the frontend and syntax-check the backend entry point' \
	  'make check  - Run lint, audit, and build'

lint:
	npm run lint --prefix frontend

audit:
	npm audit --prefix backend --audit-level=high
	npm audit --prefix frontend --audit-level=high

build:
	npm run build --prefix frontend
	node --check backend/server.js

check: lint audit build
