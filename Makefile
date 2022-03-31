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
	NODE_OPTIONS=--experimental-vm-modules npm test -- --coverage --coverageProvider=v8
