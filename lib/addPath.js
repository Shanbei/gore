const { count, insert, update } = require('./nedb');
const { toBase64 } = require('./tool');
const { echo } = require('shelljs');
const { catchNedb } = require('./tool');
const { random, floor } = Math;
async function forInsert(map, key) {
  let param;
  while ((param = map.shift())) {
    const res = await count({ param });
    if (res) {
      update({ param }, { param, key });
      continue;
    }

    await insert({ param, key });
  }
}
module.exports = async path => {
  const reg = /\{(.*?)\}/g;
  if (path.match(reg)) {
    const items = path.match(reg);
    let key = toBase64(`${Date.now()}${floor(random() * 10000)}`);
    await insert({ key, path });
    await forInsert(
      items.map(val => val.substring(1, val.length - 1)),
      key
    );
    echo('Added successfully');
  }
};
