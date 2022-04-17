import yaml from 'js-yaml';

const parserFile = (data, extName) => {
  let parse;
  if (extName === '.yaml' || extName === '.yml') {
    parse = yaml.load;
  } else if (extName === '.json') {
    parse = JSON.parse;
  } else {
    throw new Error(`File extension "${extName}" not supported`);
  }
  return parse(data);
};

export default parserFile;
