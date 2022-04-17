import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('wrong ext', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('foo.foo');
  expect(() => {
    genDiff(filepath1, filepath2);
  }).toThrow();
  expect(() => {
    genDiff(filepath2, filepath1);
  }).toThrow();
});

test('genDiff JSON flat', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  expect(genDiff(filepath1, filepath2)).toEqual(readFile('correct.txt'));
});

test('genDiff YAML flat', () => {
  const filepath1 = getFixturePath('file3.yaml');
  const filepath2 = getFixturePath('file4.yml');
  expect(genDiff(filepath1, filepath2)).toEqual(readFile('correct.txt'));
});
