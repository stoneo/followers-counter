.PHONY: install run build

install: ## Install
	@ yarn install

run: ## Run
	@ cp -n .env.dist .env
	@ ./node_modules/.bin/babel-node src/index.js

build: ## Build with babel
	@ ./node_modules/.bin/babel --compact true src/ --out-dir build/
	@ chmod +x build/index.js

lint: ## Lint
	@ ./node_modules/.bin/eslint src/
