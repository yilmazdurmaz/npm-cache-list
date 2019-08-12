#!/usr/bin/env node

var args = process.argv.splice(process.execArgv.length + 2);

var npm_cache_list = require("../index.js");

npm_cache_list(args);