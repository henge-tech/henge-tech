#! /bin/bash

./node_modules/.bin/svg-sprite -C ./config/svg-sprite.json --shape-transform-svgo ./config/svgo.json src/svg/*.svg
