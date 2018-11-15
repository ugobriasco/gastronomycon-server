#!/usr/bin/env sh
set -x

# cd /var/www/gastronomycon && \
# tar zxvf package.tgz -C . && \
# cd /var/www/gastronomycon/dist && \
# npm install

cd /var/www/gastronomycon
tar zxvf package.tgz -C .
cd ./dist
npm install --production
