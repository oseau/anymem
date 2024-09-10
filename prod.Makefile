init: ## init on new server
	@docker load < ~/repos/anymem-web-prod.tar
	@docker compose -f prod.docker-compose.yml up -d

update: ## load image and docker-rollout
	@docker load < ~/repos/anymem-web-prod.tar
	@docker rollout -f prod.docker-compose.yml --env-file .env web
	@docker system prune --all --volumes --force