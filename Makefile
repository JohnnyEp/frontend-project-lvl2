install:
	npm ci

help:
	node bin/gendiff.js -h

publish:
	npm publish --dry-run

lint:
	npx eslint .
		
test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-coverage:
	npm run coverage
