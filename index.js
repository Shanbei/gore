#!/usr/bin/env node
const shell = require('shelljs');
// start tip
const cmdTip = require('./assets/echoTip.json');
const control = require('./lib');
const tip = Object.keys(cmdTip);
const tipStr = cmdTip[tip[Math.floor(Math.random() * tip.length)]];
shell.echo(tipStr);
// The above is a tip, which can be annotated
control();
