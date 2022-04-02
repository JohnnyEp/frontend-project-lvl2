import _ from 'lodash';
import { resolve } from 'path';
import { readFileSync } from 'fs';

const genDiff = (filepath1, filepath2) => {
  if (!filepath1.endsWith('.json') || !filepath2.endsWith('.json')) {
    return 'One or both files are not .JSON';
  }
  const readFile = (filepath) => readFileSync(resolve(filepath), 'utf-8');
  const fileData1 = JSON.parse(readFile(filepath1));
  const fileData2 = JSON.parse(readFile(filepath2));
  const keys = Object.keys({ ...fileData1, ...fileData2 });

  const result = _.sortBy(keys, (key) => key)
    .map((key) => {
      if (!_.has(fileData2, key)) {
        return `- ${key}: ${fileData1[key]}`; // deleted
      }
      if (!_.has(fileData1, key)) {
        return `+ ${key}: ${fileData2[key]}`; // added
      }
      if (fileData1[key] === fileData2[key]) {
        return `  ${key}: ${fileData1[key]}`; // unchanged
      }
      return `- ${key}: ${fileData1[key]}\n  + ${key}: ${fileData2[key]}`; // changed
    })
    .join('\n  ');

  return `{\n  ${result}\n}`;
};

export default genDiff;
