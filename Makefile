SHELL := /usr/bin/env bash -o errexit -o pipefail -o nounset

ifeq ($(shell uname), Linux)
	include deployment/Makefile
else
	include development/Makefile
endif

MAKEFLAGS += --always-make
.DEFAULT_GOAL := help

help:
	@grep -Eh '^[a-zA-Z_-]+:.*?##? .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?##? "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

web-dev:
	@echo "Starting backend and frontend in development mode using Docker..."
	docker-compose up --build backend frontend

web-prod:
	@echo "Starting backend and frontend in production mode using Docker..."
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build backend frontend

web: web-dev
