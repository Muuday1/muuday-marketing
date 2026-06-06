.PHONY: help dev build start lint test typecheck docker-up docker-down clean

help: ## Show this help message
	@echo "Brasil Global Marketing Machine — Available Commands"
	@echo "====================================================="
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

dev: ## Start the Next.js development server
	npm run dev

build: ## Build the Next.js application for production
	npm run build

start: ## Start the production server (requires build first)
	npm run start

lint: ## Run ESLint across the codebase
	npm run lint

typecheck: ## Run TypeScript type checking (no emit)
	npm run typecheck

test: ## Run all Vitest tests
	npm run test

test-watch: ## Run Vitest in watch mode
	npm run test:watch

test-coverage: ## Run tests with coverage report
	npm run test:coverage

storybook: ## Start Storybook development server
	npm run storybook

session-start: ## Begin a new development session
	npm run session:start

session-end: ## End the current development session
	npm run session:end

content-generate: ## Generate content via AI
	npm run content:generate

podcast-generate: ## Generate podcast episode
	npm run podcast:generate

meta-sync: ## Sync Meta Ads campaign data
	npm run meta:sync

docker-up: ## Start Docker Compose services
	docker compose up -d

docker-down: ## Stop Docker Compose services
	docker compose down

docker-build: ## Build Docker images
	docker compose build

docker-logs: ## Tail Docker container logs
	docker compose logs -f

clean: ## Clean build artifacts and caches
	rm -rf .next node_modules/.cache storybook-static
	npm cache clean --force

install: ## Install dependencies (use --legacy-peer-deps)
	npm install --legacy-peer-deps

verify: lint typecheck test ## Run full verification pipeline
	@echo "✅ All checks passed"
