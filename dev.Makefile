web: ## Start web(frontend + backend with Next.js) in development mode
	@echo "Starting web in development mode using Docker..."
	@docker compose up --remove-orphans --build web

shell-web: ## Login to web container
	@docker compose exec web bash

build: ## lint & format & build next.js app
	@docker compose exec web bash -c "npm exec -- prettier --write --list-different . && npm exec -- oxlint -c .oxlintrc.json --fix && rsync -azvhP --delete --info=progress2,name0,flist0,stats --stats --exclude='.next' /usr/src/anymem/web/ /tmp/anymem-web-fix && cd /tmp/anymem-web-fix && npm run build"

update: ## build image and rsync to server then update
	@docker buildx build --platform linux/amd64 --file web/prod.Dockerfile --tag anymem-web-prod web
	@docker save anymem-web-prod:latest > /tmp/anymem-web-prod.tar
	@source .env && rsync -azvhP --exclude='.env*' --exclude='.next' --exclude='node_modules' $(shell pwd) $$DEST/repos && rsync -avP /tmp/anymem-web-prod.tar $$DEST/repos
