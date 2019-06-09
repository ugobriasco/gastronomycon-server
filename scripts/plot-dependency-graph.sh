#!/usr/bin/env bash
set -x
depcruise --max-depth 2 --exclude "^(node_modules|forks|__tests__)" --output-type dot ./ | dot -T svg > dependencygraph.svg
open -a "Google Chrome" dependencygraph.svg
