init: ## init on new server
	@docker load < ~/repos/anymem-web-prod.tar
	@docker compose -f prod.docker-compose.yml up -d
