web: ## Start web(frontend + backend with Next.js) in development mode
	@echo "Starting web in development mode using Docker..."
	docker-compose up --remove-orphans --build web

shell-web: ## Login to web container
	docker-compose exec web bash

fix: ## lint & format & build next.js app
	docker-compose exec web bash -c "npm run fix && npm run build"
