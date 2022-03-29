import _ from 'lodash';
import { resolve } from 'path';
import { readFileSync } from 'fs';

const genDiff = (filepath1, filepath2) => {
  const file1 = JSON.parse(readFileSync(resolve(filepath1), 'utf-8'));
  const file2 = JSON.parse(readFileSync(resolve(filepath2), 'utf-8'));
  const keys = Object.keys({ ...file1, ...file2 });
  const keyStatus = {};

  keys.forEach((key) => {
    if (!_.has(file2, key)) {
      keyStatus[key] = 'deleted';
    } else if (!_.has(file1, key)) {
      keyStatus[key] = 'added';
    } else if (file1[key] === file2[key]) {
      keyStatus[key] = 'unchanged';
    } else {
      keyStatus[key] = 'changed';
    }
  });
  const sortedData = _.sortBy(Object.entries(keyStatus), (key) => key)
    .flatMap(([key, value]) => {
      switch (value) {
        case 'deleted':
          return `- ${key}: ${file1[key]}`;
        case 'added':
          return `+ ${key}: ${file2[key]}`;
        case 'unchanged':
          return `  ${key}: ${file1[key]}`;
        case 'changed':
          return `- ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}`;
        default:
          throw new Error(`value = '${value}', wtf dude?`);
      }
    });
  const result = sortedData.join('\n  ');
  return `{\n  ${result}\n}`;
};

export default genDiff;
