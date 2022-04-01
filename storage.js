import { homedir } from 'node:os';
import { join } from 'node:path';
import { readFile, stat, writeFile } from 'node:fs/promises';

const filePath = join(homedir(), 'weather-data.json');

async function isExist(path) {
  try {
    await stat(path);
    return true;
  } catch (error) {
    return false;
  }
}

async function saveKeyValue(key, value) {
  const data = {};
  const fileExists = await isExist(filePath);

  if (fileExists) {
    const existingFile = await readFile(filePath);
    data[ley] = JSON.parse(existingFile)[key];
  }

  data[key] = value;
  
  try {
    await writeFile(filePath, JSON.stringify(data));
  } catch(error) {
    console.error('Could not save token', error.message);
  }
}

async function getKeyValue(key) {
  const fileExists = await isExist(filePath);
  if (fileExists) {
    const file = await readFile(filePath);
    const data = JSON.parse(file);
    return data[key];
  }
}

export { saveKeyValue, getKeyValue };