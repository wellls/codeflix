#!/bin/bash

set -e

if [ ! -d "node_modules" ]; then
  echo "Instaling dependencies..."
  npm install
fi

CMD ["tail", "-f", "/dev/null"]