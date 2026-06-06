# Contributing to Social Media Machine

## Development Workflow

1. Create a feature branch from `main`
2. Make your changes
3. Run tests and type check: `npm run test && npm run typecheck`
4. Open a pull request

## Code Standards

- **TypeScript strict mode** — no `any` types
- **Maximum file sizes**: Pages 250 lines, components 250 lines, hooks 150 lines
- **Server Actions** max 100 lines — business logic goes to service files
- **Always use `t()`** for UI strings (i18n)
- **Add tests** for all new utilities and server actions
- **Storybook stories** required for all new UI components

## Branch Naming

- `feature/description` — New features
- `fix/description` — Bug fixes
- `docs/description` — Documentation updates

## Commit Messages

Follow conventional commits:
- `feat: add podcast generator`
- `fix: resolve Meta API auth issue`
- `docs: update content strategy`
