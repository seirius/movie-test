#!/bin/sh

/wait
./node_modules/typeorm/cli.js migration:run
node lib/src/app.js