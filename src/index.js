import _ from 'lodash';
import { resolve } from 'path';
import { readFileSync } from 'fs';

const genDiff = (filepath1, filepath2) => {
  const file1 = JSON.parse(readFileSync(resolve(filepath1), 'utf-8'));
  const file2 = JSON.parse(readFileSync(resolve(filepath2), 'utf-8'));
  const keys = Object.keys({ ...file1, ...file2 });

  const sortedData = _.sortBy(keys, (key) => key)
    .map((key) => {
      if (!_.has(file2, key)) {
        return `- ${key}: ${file1[key]}`; // deleted
      }
      if (!_.has(file1, key)) {
        return `+ ${key}: ${file2[key]}`; // added
      }
      if (file1[key] === file2[key]) {
        return `  ${key}: ${file1[key]}`; // unchanged
      }
      return `- ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}`; // changed
    });

  const result = sortedData.join('\n  ');
  return `{\n  ${result}\n}`;
};

export default genDiff;
