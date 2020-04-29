#!/bin/sh
set -e

export GATSBY_DIR="/site"
export PATH="$PATH:/usr/local/bin/gatsby"

if [ ! -d "$GATSBY_DIR/node_modules/" ]; then
    yarn global add gatsby
    echo "Node_Modules Kosong, Jalankan NPM Dulu ..."
    yarn install
fi

# Decide what to do
if  [ "$1" == "develop" ]
then
  rm -rf $GATSBY_DIR/public
  gatsby develop --host 0.0.0.0 --port 3045

elif  [ "$1" == "build" ]
then
  rm -rf $GATSBY_DIR/public
  gatsby build

elif  [ "$1" == "stage" ]
then
  gatsby clean
  gatsby build
  gatsby serve --host 0.0.0.0 --port 3045

else
  exec $@
fi
