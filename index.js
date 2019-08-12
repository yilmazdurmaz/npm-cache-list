'use strict';
/* eslint-disable standard/no-callback-literal */
/* jshint esversion:6*/
/* jshint node:true */

const cacache = require('cacache');
const path = require('path');
const child_process = require("child_process");

const npm_cache = child_process.execSync("npm config get cache").toString().trim();
console.log("Cache is at '" + npm_cache + "'");

const usage = '\n\tnpm-cache-list      (show this list)' +
              '\n\tnpm-cache-list help (show this list)' +
              '\n\tnpm-cache-list all  (show all versioned packages - takes long to complete)' +
              '\n\tnpm-cache-list list <search terms> (search the cache - terms are combined with "or", not "and")';

exports = module.exports = cache;

function cache(args) {
  const cmd = args.shift();
  let result;
  switch (cmd) {
    case 'all':
      console.log("Listing all versioned packages, this will take some time");
      result = list([]);
      break;
    case 'ls':
    case 'list':
      console.log("Listing packages including search terms:", args);
      result = list(args);
      break;
    case 'help':
    default:
      console.log('Usage: ' + cache.usage);
  }
}

cache.usage = usage;

cache.list = list;

function list(searchterms) {
  const cache = path.join(npm_cache, '_cacache');
  let prefix = cache;
  if (prefix.indexOf(process.env.HOME) === 0) {
    prefix = '~' + prefix.substr(process.env.HOME.length);
  }
  return cacache.ls(cache).then((files) => {
    var allpackages = [];
    for (var file in files) {
      const id = files[file].metadata.id;
      if (id !== undefined) {
        let name = id.replace(/@/g, " ").trim().split(" ");
        let at = id[0] === "@" ? "@" : " ";
        allpackages.push({
          "package": name[0],
          "version": name[1],
          "scoped": at
        });
      }
    }
    allpackages.sort((a, b) => {
      if (a.version < b.version) {
        return 1;
      } else {
        return -1;
      }
    }).sort((a, b) => {
      if (a.package.toLowerCase() > b.package.toLowerCase()) {
        return 1;
      } else {
        return -1;
      }
    });
    if (searchterms.length > 0) {
      allpackages = allpackages.filter(function (onepackage) {
        return onepackage.package.toLowerCase().includes(searchterms[0].toLowerCase());
      });
    }
    for (var index in allpackages) {
      var onepackage = allpackages[index];
      console.log(onepackage.scoped + onepackage.package + "@" + onepackage.version);
    }
  });
}