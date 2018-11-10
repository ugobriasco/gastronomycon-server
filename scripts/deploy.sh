#!/usr/bin/env sh
set -x
. ./scripts/config.sh;
sh ./scripts/build.sh
tar -czf package.tgz dist && \
scp package.tgz $REMOTE_USER@$REMOTE_HOST:$REMOTE_APP_DIR && \
ssh $REMOTE_USER@$REMOTE_HOST 'bash -s' < ./scripts/untar.sh
echo 'Done';
