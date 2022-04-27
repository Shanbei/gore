const { find, remove } = require('./nedb');
const { catchNedb } = require('./tool');
module.exports = async items => {
  for (let i = 0; items[i]; i++) {
    const res = await find({
      param: items[i],
    });
    if (res.length) {
      await remove({
        param: items[i],
      });
      res.forEach(async ({ key }) => {
        await catchNedb(key);
      });
    }
  }
};
