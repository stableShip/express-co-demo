TESTS = $(shell find test -type f -name "*.test.js")
REPORTER = spec
TIMEOUT = 5000
MOCHA_OPTS =

test:
	@NODE_ENV=test /usr/local/bin/mocha \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) \
		$(MOCHA_OPTS) \
		$(TESTS)

test-cov:
	@rm -rf coverage
	@NODE_ENV=test /usr/local/bin/istanbul cover --report html /usr/local/bin/_mocha \
		-- -R $(REPORTER) \
		--timeout $(TIMEOUT) \
		$(MOCHA_OPTS) \
		$(TESTS)

test-all: test test-cov

.PHONY: test-cov test test-all