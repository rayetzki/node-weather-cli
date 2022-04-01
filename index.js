#!/usr/bin/env node
import { getWeather } from './api.js';
import { printHelp, printSuccess, printError, printWeather } from './logger.js';
import { saveKeyValue } from './storage.js';

async function saveToken(token) {
  if (!token.length) {
    return printError('Не передан токен');
  }
  
  try {
    await saveKeyValue('token', token);
    printSuccess('Токен сохранен');
  } catch (error) {
    printError(error.message);
  }
}

function getArguments() {
  return process.argv.slice(2).reduce((args, arg, index, argsList) => {
    if (!arg?.startsWith('-') || args[arg.substring(1)]) return args;
    
    if (!argsList[index + 1] || index === argsList.length - 1) {
      args[arg.substring(1)] = true;
    } else {
      args[arg.substring(1)] = argsList[index + 1];
    }

    return args;
  }, {});
}

async function runWithArgs(args) {
  if (args.h) {
    return printHelp();
  } else if (args.s) {
    const response = await getWeather(args.s);
    printWeather(response, response.weather[0].icon);
  } else if (args.t) {
    return saveToken(args.t);
  }
}

function init() {
  runWithArgs(getArguments());
}

init();