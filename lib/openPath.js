const open = require('open');
const { find } = require('./nedb');
const { chunk } = require('lodash');
const yargs = require('yargs');
const { echo } = require('shelljs');

const nonEmptyReg = /(.+?)/;
module.exports = async function openPath() {
  const reg = /\{(.*?)\}/g;
  const { argv } = yargs;
  const [cmd, ...value] = argv._;
  const list = await find({ param: nonEmptyReg });
  const item = list.find(({ param }) => param === cmd);
  if (!item) {
    echo('Without this order');
    return;
  }
  const data = await find({ key: item.key, path: nonEmptyReg });
  if (!data[0]) {
    echo('Without this order');
    return;
  }

  if (!value.length) {
    //  打开无参数链接
    open(data[0].path.replace(reg, ''));
    return;
  }

  //  打开含参数链接
  const { path } = data[0];
  const { length } = path.match(reg); // 判断需要的参数个数
  chunk(value, length).forEach(item => {
    const url = path.replace(reg, () => item.shift() || '');
    open(url);
  });
};
