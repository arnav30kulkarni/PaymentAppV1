# Contributing to PayFlow

Thanks for contributing to this project.

This repository is a local demo app for a wallet and payment flow. Please keep changes focused, readable, and aligned with the current UI and backend architecture.

---

## Local development setup

1. Fork or clone the repository.
2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

4. Start MongoDB:

```bash
docker run -d --name mongo -p 27017:27017 mongo:latest
```

5. Configure environment variables by copying the example file:

```bash
cp .env.example backend/.env
```

6. Start the app:

```bash
cd backend
npm run dev
```

```bash
cd ../frontend
npm run dev -- --host 0.0.0.0
```

---

## Branching

Use concise branch names such as:

- feature/payments-ui
- fix/auth-token-flow
- refactor/dashboard-layout
- chore/update-docs

---

## Commit messages

Follow a clear and conventional approach:

- `feat:` for new features
- `fix:` for bug fixes
- `refactor:` for structural or UI redesign work
- `docs:` for documentation updates
- `chore:` for maintenance and setup changes

Examples:

```bash
git commit -m "refactor: redesign dashboard and payment flow"
git commit -m "fix: resolve invalid token route handling"
```

---

## Coding guidelines

- Keep code readable and modular.
- Do not commit real secrets or local `.env` files.
- Prefer small, reviewable pull requests.
- Reuse existing patterns before introducing new abstractions.
- Ensure the frontend still builds after changes.

For frontend validation:

```bash
cd frontend
npm run build
```

For lint checks:

```bash
cd frontend
npx eslint src
```

---

## Pull requests

When submitting a PR:

- describe the problem clearly
- explain the change you made
- list what was tested
- include screenshots when UI changes are significant

---

## Community expectations

Please keep discussions respectful, constructive, and aligned with the purpose of this demo app.

This project is meant to be a learning and demonstration platform, not a production banking system.