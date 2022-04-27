const { find } = require('./nedb');
const { padEnd, padStart } = require('lodash');
const { echo } = require('shelljs');
const nonEmptyReg = /(.+?)/;
const getMap = async () => {
  const map = await find({
    param: nonEmptyReg,
  });
  const items = [];
  for (let i = 0; map[i]; i++) {
    const { param, key } = map[i];
    const res = await find({
      key,
      path: nonEmptyReg,
    });
    if (res[0]) {
      const { path } = res[0];
      items.push({
        param,
        path,
      });
    }
  }
  return items;
};
const echoFormat = (param, path, len) => echo(padStart(padEnd(param, len + 2, ' '), len + 4, ' '), path);
module.exports = async value => {
  const data = await getMap();
  if (value[0] !== true) {
    const items = data.filter(({ param }) => value.indexOf(param) !== -1);
    if (items.length) {
      const len = data.reduce((len, { param: { length } }) => (length > len ? length : len), 0);
      items.forEach(({ param, path }) => {
        echoFormat(param, path, len);
      });
      return;
    }
    echo('!command not found:', value.join(', '));
  }
  const len = data.reduce((len, { param: { length } }) => (length > len ? length : len), 0);
  echo('list:');
  data.forEach(({ param, path }) => {
    echoFormat(param, path, len);
  });
};
