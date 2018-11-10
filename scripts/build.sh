#!/usr/bin/env sh

set -x
rm -rf ./dist
mkdir ./dist
cp server.js ./dist/server.js
cp package.json ./dist/package.json
cp package-lock.json ./dist/package-lock.json
cp cfg.js ./dist/cfg.js
cp -a util ./dist/util
cp -a server  ./dist/server
