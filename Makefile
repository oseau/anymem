SHELL := /usr/bin/env bash -o errexit -o pipefail -o nounset

ifeq ($(shell uname), Linux)
	include prod.Makefile
else
	include dev.Makefile
endif

MAKEFLAGS += --always-make
.DEFAULT_GOAL := help

help:
	@grep -Eh '^[a-zA-Z_-]+:.*?##? .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?##? "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
# Login to frontend container
login-frontend:
	docker-compose exec frontend /bin/sh

# Login to backend container
login-backend:
	docker-compose exec backend /bin/sh
