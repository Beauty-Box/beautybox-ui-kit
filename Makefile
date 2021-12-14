#!/usr/bin/make



up:
	include .env
	docker-compose up -d

down:
	include .env
	docker-compose down

serve:
	include .env
	docker-compose exec nodejs yarn serve

build:
	include .env
	docker-compose exec nodejs yarn build

deploy:
	include .env
	docker-compose exec nodejs yarn deploy

dep:
	include .env
	git pull && yarn && yarn build

lint:
	npx eslint .

setup:
	yarn install --frozen-lockfile

lint-fix:
	npx eslint --fix .

