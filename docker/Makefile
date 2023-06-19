export UID:=$(shell id -u)
export GID:=$(shell id -g)
CC:=docker-compose


all: help

%:
	@:

help:
	@echo "usage:"
	@echo
	@echo "  make build"
	@echo "  make clean"
	@echo "  make dev"
	@echo

b:
	docker-compose build --no-cache

build:
	docker-compose build  --no-cache

clean: 
	docker-compose down --rmi local

dev: 
	$(CC) run --rm  --service-ports angular

