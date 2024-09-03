.PHONY: web

web:
	@echo "Starting backend and frontend in development mode using Docker..."
	docker-compose up --build backend frontend
