.PHONY: web

web:
	@echo "Starting backend and frontend in development mode..."
	@cd backend && npm run dev & \
	cd frontend && npm run dev
