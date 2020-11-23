#!/usr/bin/make

include .env

up:
	docker-compose up -d

down:
	docker-compose down

serve:
	docker-compose exec nodejs yarn serve

build:
	docker-compose exec nodejs yarn build

deploy:
	docker-compose exec nodejs yarn deploy

dep:
	git pull && yarn && yarn upgrade @beautybox/core && yarn deploy && rm -rf dist && mv dist_new dist

