.PHONY: install run build

install: ## Install
	npm install

run: ## Run
	cp -n .env.dist .env
	./node_modules/.bin/babel-node index.js

build: ## Build with babel
	@ ./node_modules/.bin/babel --compact true index.js counter.js --out-dir build/
	@ chmod +x build/index.js

lint: ## Lint
	./node_modules/.bin/eslint index.js
