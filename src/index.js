import _ from 'lodash';
import { resolve, extname } from 'path';
import { readFileSync } from 'fs';
import parserFile from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const ext1 = extname(filepath1);
  const ext2 = extname(filepath2);
  const readFile = (filepath) => readFileSync(resolve(filepath), 'utf-8');
  const fileData1 = parserFile(readFile(filepath1), ext1);
  const fileData2 = parserFile(readFile(filepath2), ext2);
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
