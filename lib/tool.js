const nonEmptyReg = /(.+?)/;
const { echo } = require('shelljs');
const { find, remove, count } = require('./nedb');
module.exports.toBase64 = str => Buffer.from(str).toString('base64');
module.exports.toString = base64 => Buffer.from(base64, 'base64').toString();
module.exports.catchNedbAll = async () => {
  const list = await find({
    path: nonEmptyReg,
  });
  if (!list.length) {
    return 0;
  }
  let n = 0;
  for (let i = 0; list[i]; i++) {
    const { key, _id } = list[i];
    const total = await count({
      param: nonEmptyReg,
      key,
    });
    if (total) {
      continue;
    }
    n++;
    await remove({
      _id,
    });
  }
  return n;
};
module.exports.catchNedb = async key => {
  const total = await count({
    param: nonEmptyReg,
    key,
  });
  if (!total) {
    await remove({
      key,
    });
  }
};
