.PHONY: web-dev web-prod

web-dev:
	@echo "Starting backend and frontend in development mode using Docker..."
	docker-compose up --build backend frontend

web-prod:
	@echo "Starting backend and frontend in production mode using Docker..."
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build backend frontend

web: web-dev
