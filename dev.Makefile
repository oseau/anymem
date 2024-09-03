web: ## Start backend and frontend in development mode
	@echo "Starting backend and frontend in development mode using Docker..."
	docker-compose up --build backend frontend

shell-frontend: ## Login to frontend container
	docker-compose exec frontend bash

shell-backend: ## Login to backend container
	docker-compose exec backend bash
