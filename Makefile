install:
	npm ci

help:
	node bin/gendiff.js -h

publish:
	npm publish --dry-run

lint:
	npx eslint .
		